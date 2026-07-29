import { z } from "zod";
import { CustomerStatus, CustomerType } from "@prisma/client";


export const createCustomerSchema = z.object({
  name: z.string().trim().min(3).max(100),
  mobile: z.string().trim().min(10).max(15),
  email: z.email(),
  businessName: z.string().trim().min(3).max(150),
  gstNumber: z.string().trim().optional(),
  customerType: z.enum(CustomerType),

  status: z.enum(CustomerStatus),

  address: z.string().trim().optional(),

  followUpDate: z.coerce.date().optional(),

  notes: z.string().trim().optional(),

});

export const updateCustomerSchema = createCustomerSchema.partial();

export type createCustomerInput = z.infer<typeof createCustomerSchema>;

export type updateCustomerInput = z.infer<typeof updateCustomerSchema>;
