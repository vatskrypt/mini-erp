import { Panel } from "@/components/ui";
import type { Product } from "@/types/product";
import ProductRow from "./ProductRow";

interface ProductTableProps {
  products: Product[];
  onDelete: (id: string) => void;
}

export default function ProductTable({
  products,
  onDelete,
}: ProductTableProps) {
  return (
    <Panel>
      <table className="w-full text-left">
        <thead className="border-b border-(--border)">
          <tr>
            <th className="py-3">Name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Min Stock</th>
            <th>Warehouse</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="py-6 text-center text-(--muted)"
              >
                No products found.
              </td>
            </tr>
          ) : (
            products.map(product => (
              <ProductRow
                key={product.id}
                product={product}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </Panel>
  );
}
