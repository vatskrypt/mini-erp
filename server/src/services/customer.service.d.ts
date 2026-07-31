import type { Prisma } from "@prisma/client";
import type { createCustomerInput } from "../validations/customer.validation.js";
declare class CustomerService {
    getAll(): Promise<({
        createdBy: {
            name: string;
            id: string;
            email: string;
        };
    } & {
        name: string;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        mobile: string;
        businessName: string;
        gstNumber: string | null;
        customerType: import("@prisma/client").$Enums.CustomerType;
        status: import("@prisma/client").$Enums.CustomerStatus;
        address: string | null;
        followUpDate: Date | null;
        notes: string | null;
        createdById: string;
    })[]>;
    getById(id: string): Promise<({
        createdBy: {
            name: string;
            id: string;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
        followUps: {
            id: string;
            createdAt: Date;
            createdById: string;
            customerId: string;
            note: string;
        }[];
        challans: {
            id: string;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.ChallanStatus;
            createdById: string;
            challanNumber: string;
            customerId: string;
            totalQuantity: number;
            challanDate: Date;
            confirmedAt: Date | null;
            cancelledAt: Date | null;
        }[];
    } & {
        name: string;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        mobile: string;
        businessName: string;
        gstNumber: string | null;
        customerType: import("@prisma/client").$Enums.CustomerType;
        status: import("@prisma/client").$Enums.CustomerStatus;
        address: string | null;
        followUpDate: Date | null;
        notes: string | null;
        createdById: string;
    }) | null>;
    create(data: createCustomerInput & {
        createdBy: {
            connect: {
                id: string;
            };
        };
    }): Promise<{
        name: string;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        mobile: string;
        businessName: string;
        gstNumber: string | null;
        customerType: import("@prisma/client").$Enums.CustomerType;
        status: import("@prisma/client").$Enums.CustomerStatus;
        address: string | null;
        followUpDate: Date | null;
        notes: string | null;
        createdById: string;
    }>;
    update(id: string, data: Prisma.CustomerUpdateInput): Promise<{
        name: string;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        mobile: string;
        businessName: string;
        gstNumber: string | null;
        customerType: import("@prisma/client").$Enums.CustomerType;
        status: import("@prisma/client").$Enums.CustomerStatus;
        address: string | null;
        followUpDate: Date | null;
        notes: string | null;
        createdById: string;
    }>;
    delete(id: string): Promise<{
        name: string;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        mobile: string;
        businessName: string;
        gstNumber: string | null;
        customerType: import("@prisma/client").$Enums.CustomerType;
        status: import("@prisma/client").$Enums.CustomerStatus;
        address: string | null;
        followUpDate: Date | null;
        notes: string | null;
        createdById: string;
    }>;
}
declare const _default: CustomerService;
export default _default;
//# sourceMappingURL=customer.service.d.ts.map