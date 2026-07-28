import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().trim().min(2).max(100),
  sku: z.string().trim().min(2).max(50),
  unit: z.string().trim(),
  sellingPrice: z.number().positive(),
  currentStock: z.number().int().nonnegative(),
})

export const updateProductSchema = createProductSchema.partial();

export type CreateProductSchema = z.infer<typeof createProductSchema>;

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
