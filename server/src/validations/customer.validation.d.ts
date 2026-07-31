import { z } from "zod";
export declare const createCustomerSchema: z.ZodObject<{
    name: z.ZodString;
    mobile: z.ZodString;
    email: z.ZodEmail;
    businessName: z.ZodString;
    gstNumber: z.ZodOptional<z.ZodString>;
    customerType: z.ZodEnum<{
        RETAIL: "RETAIL";
        WHOLESALE: "WHOLESALE";
        DISTRIBUTOR: "DISTRIBUTOR";
    }>;
    status: z.ZodEnum<{
        LEAD: "LEAD";
        ACTIVE: "ACTIVE";
        INACTIVE: "INACTIVE";
    }>;
    address: z.ZodOptional<z.ZodString>;
    followUpDate: z.ZodPreprocess<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateCustomerSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    mobile: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodEmail>;
    businessName: z.ZodOptional<z.ZodString>;
    gstNumber: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    customerType: z.ZodOptional<z.ZodEnum<{
        RETAIL: "RETAIL";
        WHOLESALE: "WHOLESALE";
        DISTRIBUTOR: "DISTRIBUTOR";
    }>>;
    status: z.ZodOptional<z.ZodEnum<{
        LEAD: "LEAD";
        ACTIVE: "ACTIVE";
        INACTIVE: "INACTIVE";
    }>>;
    address: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    followUpDate: z.ZodOptional<z.ZodPreprocess<z.ZodOptional<z.ZodCoercedDate<unknown>>>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type createCustomerInput = z.infer<typeof createCustomerSchema>;
export type updateCustomerInput = z.infer<typeof updateCustomerSchema>;
//# sourceMappingURL=customer.validation.d.ts.map