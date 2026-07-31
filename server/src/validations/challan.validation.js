import { z } from "zod";
import { ChallanStatus } from "@prisma/client";
export const challanQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    search: z.string().trim().optional(),
    status: z.enum(ChallanStatus).optional(),
    customerId: z.string().cuid().optional(),
});
export const createChallanSchema = z
    .object({
    customerId: z.string().cuid(),
    items: z
        .array(z.object({
        productId: z.string().cuid(),
        quantity: z.coerce.number().int().positive(),
    }))
        .min(1, "At least one item is required"),
})
    .refine((data) => {
    const productIds = data.items.map((item) => item.productId);
    return productIds.length === new Set(productIds).size;
}, {
    message: "Duplicate products are not allowed.",
    path: ["items"],
});
export const challanIdSchema = z.object({
    id: z.string().cuid(),
});
export const updateChallanSchema = createChallanSchema;
//# sourceMappingURL=challan.validation.js.map