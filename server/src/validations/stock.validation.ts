import { z } from "zod";
import { StockMovementType } from "@prisma/client";

export const adjustStockSchema = z.object({
  productId: z.string().cuid(),
  quantity: z.coerce.number().int().positive(),
  type: z.enum(StockMovementType),
  remarks: z.string().trim().max(255).optional(),
});

export type AdjustStockInput = z.infer<typeof adjustStockSchema>;
