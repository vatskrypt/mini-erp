import { z } from "zod";
import { StockMovementType } from "@prisma/client";

export const adjustStockSchema = z.object({
  productId: z.string().cuid(),
  quantity: z.coerce
    .number()
    .int()
    .positive("Quantity must be greater than 0"),

  movementType: z.enum(StockMovementType),

  remarks: z
    .string()
    .trim()
    .max(255)
    .optional(),
});

export type AdjustStockInput = z.infer<typeof adjustStockSchema>;
