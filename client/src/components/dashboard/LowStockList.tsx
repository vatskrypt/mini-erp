import { Panel } from "@/components/ui";

interface Product {
  id: string;
  name: string;
  sku: string;
  currentStock: number;
  minimumStock: number;
}

interface LowStockListProps {
  products: Product[];
}

export default function LowStockList({
  products,
}: LowStockListProps) {
  return (
    <Panel>
      <h2 className="mb-4 text-lg font-semibold">
        Low Stock Products
      </h2>

      <div className="space-y-3">
        {products.length === 0 ? (
          <p className="text-sm text-(--muted)">
            No low stock products.
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between border-b border-(--border) pb-2"
            >
              <div>
                <p className="font-medium">
                  {product.name}
                </p>

                <p className="text-sm text-(--muted)">
                  SKU: {product.sku}
                </p>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-red-500">
                  {product.currentStock}
                </p>

                <p className="text-xs text-(--muted)">
                  Min: {product.minimumStock}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </Panel>
  );
}
