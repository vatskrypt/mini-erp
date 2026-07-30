

import prisma from "../config/prisma.js";
import type { CreateProductInput, UpdateProductInput } from "../validations/product.validation.js";
import type { AdjustStockInput } from "../validations/stock.validation.js";


// create()
// getAll()
// getById()
// update()
// delete()

// function to clean data from partial update
function removeUndefined<T extends object>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined)
  );
}

class ProductService {
  async create(
    data: CreateProductInput,
    createdById: string
  ) {
    return prisma?.product.create({
      data: {
        ...data,
        warehouse: data.warehouse ?? null,
        createdBy: {
          connect: {
            id: createdById,
          },
        },
      },
    });
  }
  async getAll() {
    return prisma?.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  async getById(id: string) {
    return prisma?.product.findUnique({
      where: {
        id,
      },
    });
  }
  async update(id: string, data: UpdateProductInput) {
    const cleanedData = removeUndefined({
      ...data,
      warehouse: data.warehouse ?? null,
    });
    return prisma?.product.update({
      where: {
        id,
      },
      data: cleanedData,
    });
  }
  async updateStock(productId: string,
    data: AdjustStockInput,
    userId:string) {
    const product = await prisma.product.findUniqueOrThrow({
      where: {
        id: productId,
      },
    });
    let newStock = product.currentStock;

    if (data.movementType === "IN") {
      newStock += data.quantity;
    } else {
      newStock -= data.quantity;
    }
    if (newStock < 0) {
      throw new Error("Insufficient Stock");
    }
    return prisma.$transaction(async(tx) => {
      const updatedProduct = await tx.product.update({
        where: {
          id: productId,
        },
        data: {
          currentStock: newStock,
        },
      });

      await tx.stockLog.create({
        data: {
          productId,
          quantity: data.quantity,
          movementType: data.movementType,
          stockAfter: newStock,
          remarks: data.remarks ?? null,
          createdById: userId,
        },
      });
      return updatedProduct;
    });
  }
  async delete(id: string) {
    return prisma?.product.delete({
      where: {
        id,
      },
    });
  };
}

export default new ProductService();
