import type { CreateProductInput, UpdateProductInput } from "../validations/product.validation.js";
import type { AdjustStockInput } from "../validations/stock.validation.js";
declare class ProductService {
    create(data: CreateProductInput, createdById: string): Promise<{
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
    }>;
    getAll(): Promise<{
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
    }[]>;
    getById(id: string): Promise<{
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
    } | null>;
    update(id: string, data: UpdateProductInput): Promise<{
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
    }>;
    updateStock(productId: string, data: AdjustStockInput, userId: string): Promise<{
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
    }>;
    delete(id: string): Promise<{
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
    }>;
}
declare const _default: ProductService;
export default _default;
//# sourceMappingURL=product.service.d.ts.map