import { z } from "zod";
export declare const adjustStockSchema: z.ZodObject<{
    productId: z.ZodString;
    quantity: z.ZodCoercedNumber<unknown>;
    movementType: z.ZodEnum<{
        IN: "IN";
        OUT: "OUT";
    }>;
    remarks: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type AdjustStockInput = z.infer<typeof adjustStockSchema>;
//# sourceMappingURL=stock.validation.d.ts.map