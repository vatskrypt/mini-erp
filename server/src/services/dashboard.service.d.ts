declare class DashboardService {
    getDashboard(): Promise<{
        summary: {
            customers: number;
            products: number;
            draftChallans: number;
            confirmedChallans: number;
            inventoryUnits: number;
            lowStockProducts: number;
        };
        recentChallans: ({
            customer: {
                name: string;
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
        lowStock: {
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
        }[];
        recentStockLogs: ({
            product: {
                name: string;
                sku: string;
            };
            createdBy: {
                name: string;
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
        })[];
    }>;
}
declare const _default: DashboardService;
export default _default;
//# sourceMappingURL=dashboard.service.d.ts.map