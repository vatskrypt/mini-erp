import { z } from "zod";
export const createProductSchema = z.object({
    name: z.string().trim().min(2).max(100),
    sku: z.string().trim().min(2).max(50),
    unitPrice: z.coerce.number().positive(),
    currentStock: z.coerce.number().int().nonnegative(),
    minimumStock: z.coerce.number().int().nonnegative(),
    warehouse: z.string().trim().optional(),
    category: z.string().min(2).max(100),
});
export const updateProductSchema = createProductSchema.partial();
//# sourceMappingURL=product.validation.js.map