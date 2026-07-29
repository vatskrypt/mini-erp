console.log("Loaded challan.service", import.meta.url);
import prisma from "../config/prisma.js";
import type { ChallanQueryInput, CreateChallanInput } from "../validations/challan.validation.js";
import { ChallanStatus, Prisma } from "@prisma/client";
import { StockMovementType } from "@prisma/client";
class ChallanService {
  async create(
    data: CreateChallanInput,
    createdById: string
  ) {
    // fix prevent duplicate productIds from being added to a challan in challan.service.ts
    console.log("Service version: 1");


    return prisma.$transaction(async (tx) => {
      // Check customer
      console.log(" (1) Transaction Entered");
      const customer = await tx.customer.findUniqueOrThrow({
        where: {
          id: data.customerId,
        },
      });

      console.log("2");
      // Fetch products
      const productIds = data.items.map((item) => item.productId);
      const uniqueProductIds = [...new Set(productIds)];
      if (productIds.length !== uniqueProductIds.length) {
        throw new Error("Duplicate products are not allowed in a challan");
      }
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
      const counter = await tx.counter.update({
        where: {
          name:"challan",
        }, data: {
          value: {
            increment:1,
          },
        },
      });

      const challanNumber = `CH-${counter.value.toString().padStart(6, "0")}`;

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
      return tx.challan.findUniqueOrThrow({
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
  async confirm(challanId: string, userId: string) {
    return prisma.$transaction(async (tx) => {
      const challan = await tx.challan.findUnique({
        where: {
          id: challanId,
        },
        include: {
          items: true,
          customer: true,
          createdBy: true,
        },
      });

      if (!challan) {
        throw new Error("Challan not found");
      }

      if (challan.status !== ChallanStatus.DRAFT) {
        throw new Error("Only draft challans can be confirmed");
      }

      const productIds = [
        ...new Set(challan.items.map((item) => item.productId)),
      ];

      const products = await tx.product.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
      });

      const productMap = new Map(
        products.map((product) => [product.id, product])
      );

      const productQuantities = new Map<
        string,
        {
          product: (typeof products)[number];
          quantity: number;
        }
      >();

      for (const item of challan.items) {
        const product = productMap.get(item.productId);

        if (!product) {
          throw new Error(`${item.productName} no longer exists`);
        }

        const existing = productQuantities.get(product.id);

        if (existing) {
          existing.quantity += item.quantity;
        } else {
          productQuantities.set(product.id, {
            product,
            quantity: item.quantity,
          });
        }
      }

      const stockLogs = [];

      for (const { product, quantity } of productQuantities.values()) {
        const result = await tx.product.updateMany({
          where: {
            id: product.id,
            currentStock: {
              gte: quantity,
            },
          },
          data: {
            currentStock: {
              decrement: quantity,
            },
          },
        });

        if (result.count === 0) {
          throw new Error(`Insufficient stock for ${product.name}`);
        }

        stockLogs.push({
          productId: product.id,
          quantity,
          movementType: StockMovementType.OUT,
          stockAfter: product.currentStock - quantity,
          remarks: `Confirmed challan ${challan.challanNumber}`,
          createdById: userId,
        });
      }

      await tx.stockLog.createMany({
        data: stockLogs,
      });

      await tx.challan.update({
        where: {
          id: challan.id,
        },
        data: {
          status: ChallanStatus.CONFIRMED,
        },
      });

      return tx.challan.findUniqueOrThrow({
        where: {
          id: challan.id,
        },
        include: {
          customer: true,
          createdBy: true,
          items: true,
        },
      });
    });
  }
  async getAll(query: ChallanQueryInput) {
    const {
      page,
      limit,
      search,
      status,
      customerId,
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.ChallanWhereInput = {};

    if (status) {
      where.status = status;
    }

    if (customerId) {
      where.customerId = customerId;
    }

    if (search) {
      where.OR = [
        {
          challanNumber: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          customer: {
            name: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        },
      ];
    }

    const [challans, total] = await prisma.$transaction([
      prisma.challan.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          challanDate: "desc",
        },
        include: {
          customer: {
            select: {
              id: true,
              name: true,
            },
          },
          createdBy: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: {
              items: true,
            },
          },
        },
      }),
      prisma.challan.count({
        where,
      }),
    ]);

    return {
      data: challans,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }
  async getById(challanId: string) {
    const challan = await prisma.challan.findUniqueOrThrow({
      where: {
     id: challanId,
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            mobile: true,
            email: true,
            address: true,
            gstNumber: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
        items: {
          orderBy: {
            createdAt: "asc",
          },
        },
      }
    })

    const totalAmount = challan.items.reduce((sum, item) => sum + Number(item.unitPrice) * item.quantity, 0);
    return {...challan, totalAmount};
  }

}

export default new ChallanService();
