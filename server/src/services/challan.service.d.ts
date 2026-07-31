import type { ChallanQueryInput, CreateChallanInput, UpdateChallanInput } from "../validations/challan.validation.js";
import { Prisma } from "@prisma/client";
declare class ChallanService {
    create(data: CreateChallanInput, createdById: string): Promise<{
        customer: {
            name: string;
            id: string;
            businessName: string;
        };
        id: string;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.ChallanStatus;
        challanNumber: string;
        totalQuantity: number;
        challanDate: Date;
        confirmedAt: Date | null;
        cancelledAt: Date | null;
        createdBy: {
            name: string;
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        };
        items: {
            id: string;
            createdAt: Date;
            unitPrice: Prisma.Decimal;
            productId: string;
            quantity: number;
            productName: string;
            productSKU: string;
        }[];
    }>;
    update(id: string, data: UpdateChallanInput): Promise<{
        customer: {
            name: string;
            id: string;
            businessName: string;
        };
        id: string;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.ChallanStatus;
        challanNumber: string;
        totalQuantity: number;
        challanDate: Date;
        confirmedAt: Date | null;
        cancelledAt: Date | null;
        createdBy: {
            name: string;
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        };
        items: {
            id: string;
            createdAt: Date;
            unitPrice: Prisma.Decimal;
            productId: string;
            quantity: number;
            productName: string;
            productSKU: string;
        }[];
    }>;
    confirm(challanId: string, userId: string): Promise<{
        customer: {
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
        };
        createdBy: {
            name: string;
        };
        items: {
            id: string;
            createdAt: Date;
            unitPrice: Prisma.Decimal;
            productId: string;
            quantity: number;
            challanId: string;
            productName: string;
            productSKU: string;
        }[];
    } & {
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
    }>;
    getAll(query: ChallanQueryInput): Promise<{
        data: ({
            customer: {
                name: string;
                id: string;
            };
            createdBy: {
                name: string;
            };
            _count: {
                items: number;
            };
        } & {
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
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getById(challanId: string): Promise<{
        totalAmount: number;
        customer: {
            name: string;
            id: string;
            email: string;
            mobile: string;
            gstNumber: string | null;
            address: string | null;
        };
        createdBy: {
            name: string;
            id: string;
        };
        items: {
            id: string;
            createdAt: Date;
            unitPrice: Prisma.Decimal;
            productId: string;
            quantity: number;
            challanId: string;
            productName: string;
            productSKU: string;
        }[];
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
    }>;
    delete(id: string): Promise<void>;
}
declare const _default: ChallanService;
export default _default;
//# sourceMappingURL=challan.service.d.ts.map