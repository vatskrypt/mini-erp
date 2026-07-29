console.log("Loaded challan.service", import.meta.url);
import prisma from "../config/prisma.js";
import type { CreateChallanInput } from "../validations/challan.validation.js";

class ChallanService {
  async create(
    data: CreateChallanInput,
    createdById: string
  ) {
    console.log("Service version: 1");
    const [customer] = await prisma.$transaction([
      prisma.customer.findUniqueOrThrow({
        where: {
          id: data.customerId,
        },
      }),
    ]);

    return customer;

    return prisma.$transaction(async (tx) => {
      // Check customer
      console.log(" (1) Transaction Entered");
      const customer = await tx.customer.findUnique({
        where: {
          id: data.customerId,
        },
      });

      if (!customer) {
        throw new Error("Customer not found");
      }

      console.log("2");
      // Fetch products
      const productIds = data.items.map((item) => item.productId);
      const uniqueProductIds = [...new Set(productIds)];
      console.log("3");
      const products = await tx.product.findMany({
        where: {
          id: {
            in: uniqueProductIds,
          },
        },
      });
      console.log("4");
      if (products.length !== uniqueProductIds.length) {
        throw new Error("One or more products not found");
      }

      // Calculate total quantity
      const totalQuantity = data.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      console.log("5");
      // Generate challan number
      const count = await tx.challan.count();

      const challanNumber = `CH-${String(count + 1).padStart(6, "0")}`;

      // Create challan
      const challan = await tx.challan.create({
        data: {
          challanNumber,
          customerId: customer.id,
          createdById,
          totalQuantity,
        },
      });
      console.log("6");
      // Product lookup
      const productMap = new Map(
        products.map((product) => [product.id, product])
      );
      console.log("7");
      // Create challan items
      await tx.challanItem.createMany({
        data: data.items.map((item) => {
          const product = productMap.get(item.productId)!;

          return {
            challanId: challan.id,
            productId: product.id,
            quantity: item.quantity,
            productName: product.name,
            productSKU: product.sku,
            unitPrice: product.unitPrice,
          };
        }),
      });
      console.log("8");
      // Return created challan
      return tx.challan.findUnique({
        where: {
          id: challan.id,
        },
        include: {
          customer: true,
          items: true,
          createdBy: true,
        },
      });
    });


  }
}

export default new ChallanService();
