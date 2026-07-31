import { z } from "zod";
export declare const challanQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    search: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        DRAFT: "DRAFT";
        CONFIRMED: "CONFIRMED";
        CANCELLED: "CANCELLED";
    }>>;
    customerId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const createChallanSchema: z.ZodObject<{
    customerId: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        productId: z.ZodString;
        quantity: z.ZodCoercedNumber<unknown>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const challanIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export type ChallanIdInput = z.infer<typeof challanIdSchema>;
export type CreateChallanInput = z.infer<typeof createChallanSchema>;
export type ChallanQueryInput = z.infer<typeof challanQuerySchema>;
export type UpdateChallanInput = CreateChallanInput;
export declare const updateChallanSchema: z.ZodObject<{
    customerId: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        productId: z.ZodString;
        quantity: z.ZodCoercedNumber<unknown>;
    }, z.core.$strip>>;
}, z.core.$strip>;
//# sourceMappingURL=challan.validation.d.ts.map