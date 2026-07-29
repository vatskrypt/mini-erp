import { z } from "zod";

export const createChallanSchema = z
  .object({
    customerId: z.string().cuid(),

    items: z
      .array(
        z.object({
          productId: z.string().cuid(),
          quantity: z.coerce.number().int().positive(),
        })
      )
      .min(1, "At least one item is required"),
  })
  .refine(
    (data) => {
      const productIds = data.items.map((item) => item.productId);
      return productIds.length === new Set(productIds).size;
    },
    {
      message: "Duplicate products are not allowed.",
      path: ["items"],
    }
  );

export type CreateChallanInput = z.infer<typeof createChallanSchema>;
