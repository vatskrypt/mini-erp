import { useNavigate } from "react-router-dom";
import type { Product } from "@/types/product";

interface ProductRowProps {
  product: Product;
  onDelete: (id: string) => void;
}

export default function ProductRow({
  product,
  onDelete,
}: ProductRowProps) {
  const navigate = useNavigate();

  const lowStock =
    product.currentStock <= product.minimumStock;

  return (
    <tr className="border-b border-(--border)">
      <td className="py-3">{product.name}</td>

      <td>{product.sku}</td>

      <td>{product.category}</td>

      <td>₹{product.unitPrice}</td>

      <td
        className={
          lowStock
            ? "font-semibold text-red-500"
            : ""
        }
      >
        {product.currentStock}
      </td>

      <td>{product.minimumStock}</td>

      <td>{product.warehouse ?? "-"}</td>

      <td className="space-x-3">
        <button
          className="text-(--accent)"
          onClick={() =>
            navigate(`/products/${product.id}/edit`)
          }
        >
          Edit
        </button>

        <button
          className="text-red-500"
          onClick={() => onDelete(product.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
