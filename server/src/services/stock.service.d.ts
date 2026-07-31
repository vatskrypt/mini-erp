import { type AdjustStockInput } from "../validations/stock.validation.js";
declare class StockService {
    adjustStock(data: AdjustStockInput, createdById: string): Promise<{
        id: string;
        createdAt: Date;
        createdById: string;
        productId: string;
        quantity: number;
        movementType: import("@prisma/client").$Enums.StockMovementType;
        stockAfter: number;
        remarks: string | null;
    }>;
    getLogs(productId?: string): Promise<({
        product: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            createdById: string;
            sku: string;
            category: string;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            currentStock: number;
            minimumStock: number;
            warehouse: string | null;
        };
        createdBy: {
            name: string;
            id: string;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        createdById: string;
        productId: string;
        quantity: number;
        movementType: import("@prisma/client").$Enums.StockMovementType;
        stockAfter: number;
        remarks: string | null;
    })[]>;
}
declare const _default: StockService;
export default _default;
//# sourceMappingURL=stock.service.d.ts.map