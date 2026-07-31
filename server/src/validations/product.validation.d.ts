import { z } from "zod";
export declare const createProductSchema: z.ZodObject<{
    name: z.ZodString;
    sku: z.ZodString;
    unitPrice: z.ZodCoercedNumber<unknown>;
    currentStock: z.ZodCoercedNumber<unknown>;
    minimumStock: z.ZodCoercedNumber<unknown>;
    warehouse: z.ZodOptional<z.ZodString>;
    category: z.ZodString;
}, z.core.$strip>;
export declare const updateProductSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    sku: z.ZodOptional<z.ZodString>;
    unitPrice: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    currentStock: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    minimumStock: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    warehouse: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    category: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
//# sourceMappingURL=product.validation.d.ts.map