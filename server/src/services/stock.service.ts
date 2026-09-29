import { StockMovementType } from "@prisma/client";
import  prisma  from "../config/prisma.js";
import { type AdjustStockInput } from "../validations/stock.validation.js";

export class StockService {
  constructor(private readonly db: typeof prisma = prisma) {}

  async adjustStock(
    data: AdjustStockInput,
    createdById: string
  ) {
    return this.db.$transaction(async (tx) => {

      const product = await tx.product.findUnique({
        where: {
          id: data.productId,
        },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      const newStock =
        data.movementType === StockMovementType.IN
          ? product.currentStock + data.quantity
          : product.currentStock - data.quantity;

      if (newStock < 0) {
        throw new Error("Insufficient stock");
      }

      await tx.product.update({
        where: {
          id: product.id,
        },
        data: {
          currentStock: newStock,
        },
      });

      const log = await tx.stockLog.create({
        data: {
          productId: product.id,
          createdById,
          quantity: data.quantity,
          movementType: data.movementType,
          stockAfter: newStock,
          remarks: data.remarks ?? null,
        },
      });

      return log;
    });
  }

  async getLogs(productId?: string) {
    return this.db.stockLog.findMany({
      ...(productId && {
        where: {
          productId,
        },
      }),

      include: {
        product: true,
        createdBy: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

export default new StockService();
