import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createChallanSchema, challanQuerySchema } from "../validations/challan.validation.js";
import { createCustomerSchema, customerQuerySchema } from "../validations/customer.validation.js";
import { createProductSchema } from "../validations/product.validation.js";
import { adjustStockSchema } from "../validations/stock.validation.js";

const cuid = "c123456789012345678901234";

describe("challan validation", () => {
  it("accepts a challan and coerces quantities to integers", () => {
    const result = createChallanSchema.parse({
      customerId: cuid,
      items: [{ productId: "c223456789012345678901234", quantity: "3" }],
    });

    assert.equal(result.items[0].quantity, 3);
  });

  it("rejects duplicate products and empty item lists", () => {
    const duplicate = createChallanSchema.safeParse({
      customerId: cuid,
      items: [
        { productId: "c223456789012345678901234", quantity: 1 },
        { productId: "c223456789012345678901234", quantity: 2 },
      ],
    });
    const empty = createChallanSchema.safeParse({ customerId: cuid, items: [] });

    assert.equal(duplicate.success, false);
    assert.equal(empty.success, false);
  });

  it("applies pagination defaults and rejects limits above 100", () => {
    assert.deepEqual(challanQuerySchema.parse({}), { page: 1, limit: 10 });
    assert.equal(challanQuerySchema.safeParse({ limit: 101 }).success, false);
  });
});

describe("customer validation", () => {
  it("normalizes customer text and accepts valid contact information", () => {
    const result = createCustomerSchema.parse({
      name: "  Ada Lovelace  ",
      mobile: "1234567890",
      email: "ada@example.com",
      businessName: "Analytical Engines",
      customerType: "WHOLESALE",
      status: "ACTIVE",
      followUpDate: "",
    });

    assert.equal(result.name, "Ada Lovelace");
    assert.equal(result.followUpDate, undefined);
  });

  it("rejects invalid email and applies list query defaults", () => {
    const invalid = createCustomerSchema.safeParse({
      name: "Ada Lovelace",
      mobile: "1234567890",
      email: "not-an-email",
      businessName: "Analytical Engines",
      customerType: "WHOLESALE",
      status: "ACTIVE",
    });

    assert.equal(invalid.success, false);
    assert.deepEqual(customerQuerySchema.parse({}), { page: 1, limit: 20 });
  });
});

describe("product and inventory validation", () => {
  it("coerces form price strings and validates nonnegative stock", () => {
    const product = createProductSchema.parse({
      name: "Steel Rod",
      sku: "SR-01",
      category: "Building",
      unitPrice: "12.50",
      currentStock: "4",
      minimumStock: 1,
    });

    assert.equal(product.unitPrice, 12.5);
    assert.equal(product.currentStock, 4);
  });

  it("accepts positive stock movements and rejects zero quantities", () => {
    assert.equal(adjustStockSchema.parse({
      productId: cuid,
      quantity: "2",
      movementType: "IN",
    }).quantity, 2);
    assert.equal(adjustStockSchema.safeParse({
      productId: cuid,
      quantity: 0,
      movementType: "OUT",
    }).success, false);
  });
});

