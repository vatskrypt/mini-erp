import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProducts, deleteProduct } from "@/api/products";
import type { Product } from "@/types/product";
import ProductTable from "@/components/products/ProductTable";
import AdjustStockDialog from "@/components/products/AdjustStockDialog";
import { toast } from "sonner";

export default function ProductsPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [stockDialogOpen, setStockDialogOpen] =
    useState(false);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      await deleteProduct(id);

      setProducts(prev =>
        prev.filter(product => product.id !== id)
      );

      toast.success("Product deleted successfully");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="mt-2 text-(--muted)">
            Manage your products
          </p>
        </div>

        <button
          className="rounded-lg bg-(--accent) px-4 py-2 text-white"
          onClick={() => navigate("/products/new")}
        >
          + Add Product
        </button>
      </div>

      <ProductTable
        products={products}
        onDelete={handleDelete}
        onAdjustStock={(product) => {
          setSelectedProduct(product);
          setStockDialogOpen(true);
        }}
      />
      {selectedProduct && (
        <AdjustStockDialog
          productId={selectedProduct.id}
          open={stockDialogOpen}
          onClose={() => setStockDialogOpen(false)}
          onSuccess={fetchProducts}
        />
      )}
    </div>
  );
}
