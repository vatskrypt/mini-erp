import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type prisma from "../config/prisma.js";
import { ChallanService } from "../services/challan.service.js";
import { StockService } from "../services/stock.service.js";

const asDatabase = (fake: object) => fake as unknown as typeof prisma;

describe("stock adjustment service", () => {
  it("updates stock and writes the matching audit log in one transaction", async () => {
    const product = { id: "product-1", currentStock: 10 };
    let updatedStock = -1;
    let stockLog: Record<string, unknown> | undefined;
    const tx = {
      product: {
        findUnique: async () => product,
        update: async ({ data }: { data: { currentStock: number } }) => {
          updatedStock = data.currentStock;
          return { ...product, currentStock: data.currentStock };
        },
      },
      stockLog: {
        create: async ({ data }: { data: Record<string, unknown> }) => {
          stockLog = data;
          return data;
        },
      },
    };
    const service = new StockService(asDatabase({
      $transaction: async (callback: (transaction: typeof tx) => unknown) => callback(tx),
      stockLog: { findMany: async () => [] },
    }));

    await service.adjustStock({
      productId: product.id,
      quantity: 3,
      movementType: "OUT",
      remarks: "Order dispatch",
    }, "user-1");

    assert.equal(updatedStock, 7);
    assert.equal(stockLog?.stockAfter, 7);
    assert.equal(stockLog?.quantity, 3);
    assert.equal(stockLog?.movementType, "OUT");
    assert.equal(stockLog?.createdById, "user-1");
  });

  it("rejects an adjustment that would make stock negative", async () => {
    let wroteLog = false;
    const tx = {
      product: {
        findUnique: async () => ({ id: "product-1", currentStock: 2 }),
        update: async () => assert.fail("must not update stock"),
      },
      stockLog: { create: async () => { wroteLog = true; } },
    };
    const service = new StockService(asDatabase({
      $transaction: async (callback: (transaction: typeof tx) => unknown) => callback(tx),
      stockLog: { findMany: async () => [] },
    }));

    await assert.rejects(service.adjustStock({
      productId: "product-1",
      quantity: 3,
      movementType: "OUT",
    }, "user-1"), /Insufficient stock/);
    assert.equal(wroteLog, false);
  });
});

describe("challan service", () => {
  it("creates a challan with product snapshot details", async () => {
    let createdItems: Array<Record<string, unknown>> = [];
    const product = {
      id: "product-1",
      name: "Steel Rod",
      sku: "SR-01",
      unitPrice: "12.50",
    };
    const tx = {
      customer: { findUniqueOrThrow: async () => ({ id: "customer-1" }) },
      product: { findMany: async () => [product] },
      counter: { upsert: async () => ({ value: 7 }) },
      challan: {
        create: async () => ({ id: "challan-1" }),
        findUniqueOrThrow: async () => ({ id: "challan-1", challanNumber: "CH-000007" }),
      },
      challanItem: {
        createMany: async ({ data }: { data: Array<Record<string, unknown>> }) => {
          createdItems = data;
        },
      },
    };
    const service = new ChallanService(asDatabase({
      $transaction: async (callback: (transaction: typeof tx) => unknown) => callback(tx),
    }));

    const result = await service.create({
      customerId: "customer-1",
      items: [{ productId: product.id, quantity: 4 }],
    }, "user-1");

    assert.equal(result.challanNumber, "CH-000007");
    assert.deepEqual(createdItems[0], {
      challanId: "challan-1",
      productId: "product-1",
      quantity: 4,
      productName: "Steel Rod",
      productSKU: "SR-01",
      unitPrice: "12.50",
    });
  });

  it("rejects duplicate products before creating a challan", async () => {
    let created = false;
    const tx = {
      customer: { findUniqueOrThrow: async () => ({ id: "customer-1" }) },
      product: { findMany: async () => [] },
      counter: { upsert: async () => ({ value: 1 }) },
      challan: { create: async () => { created = true; } },
      challanItem: { createMany: async () => undefined },
    };
    const service = new ChallanService(asDatabase({
      $transaction: async (callback: (transaction: typeof tx) => unknown) => callback(tx),
    }));

    await assert.rejects(service.create({
      customerId: "customer-1",
      items: [
        { productId: "product-1", quantity: 1 },
        { productId: "product-1", quantity: 2 },
      ],
    }, "user-1"), /Duplicate products/);
    assert.equal(created, false);
  });

  it("deducts stock, logs the movement, and marks a draft confirmed", async () => {
    let logged: Array<Record<string, unknown>> = [];
    let statusUpdate = "";
    let stockUpdate: Record<string, unknown> | undefined;
    const draft = {
      id: "challan-1",
      challanNumber: "CH-000001",
      status: "DRAFT",
      items: [{ productId: "product-1", quantity: 3, productName: "Steel Rod" }],
    };
    const product = { id: "product-1", name: "Steel Rod", currentStock: 8 };
    const tx = {
      challan: {
        findUniqueOrThrow: async () => draft,
        update: async ({ data }: { data: { status: string } }) => { statusUpdate = data.status; },
      },
      product: {
        findMany: async () => [product],
        updateMany: async ({ data }: { data: Record<string, unknown> }) => {
          stockUpdate = data;
          return { count: 1 };
        },
      },
      stockLog: {
        createMany: async ({ data }: { data: Array<Record<string, unknown>> }) => { logged = data; },
      },
    };
    const service = new ChallanService(asDatabase({
      $transaction: async (callback: (transaction: typeof tx) => unknown) => callback(tx),
    }));

    await service.confirm("challan-1", "user-1");

    assert.deepEqual(stockUpdate, { currentStock: { decrement: 3 } });
    assert.equal(logged[0].stockAfter, 5);
    assert.equal(logged[0].movementType, "OUT");
    assert.equal(statusUpdate, "CONFIRMED");
  });

  it("does not confirm a challan when inventory is insufficient", async () => {
    let wroteLog = false;
    let updatedChallan = false;
    const tx = {
      challan: {
        findUniqueOrThrow: async () => ({
          id: "challan-1",
          challanNumber: "CH-000001",
          status: "DRAFT",
          items: [{ productId: "product-1", quantity: 3, productName: "Steel Rod" }],
        }),
        update: async () => { updatedChallan = true; },
      },
      product: {
        findMany: async () => [{ id: "product-1", name: "Steel Rod", currentStock: 2 }],
        updateMany: async () => ({ count: 0 }),
      },
      stockLog: { createMany: async () => { wroteLog = true; } },
    };
    const service = new ChallanService(asDatabase({
      $transaction: async (callback: (transaction: typeof tx) => unknown) => callback(tx),
    }));

    await assert.rejects(service.confirm("challan-1", "user-1"), /Insufficient stock/);
    assert.equal(wroteLog, false);
    assert.equal(updatedChallan, false);
  });
});

