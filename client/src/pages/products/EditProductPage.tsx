import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import ProductForm from "@/components/products/ProductForm";
import { getProduct, updateProduct } from "@/api/products";
import type { ProductFormData } from "@/types/product";

const EMPTY_PRODUCT: ProductFormData = {
  name: "",
  sku: "",
  category: "",
  unitPrice: "",
  currentStock: 0,
  minimumStock: 0,
  warehouse: "",
};

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<ProductFormData>(EMPTY_PRODUCT);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;

        const product = await getProduct(id);

        setForm({
          name: product.name,
          sku: product.sku,
          category: product.category,
          unitPrice: product.unitPrice,
          currentStock: product.currentStock,
          minimumStock: product.minimumStock,
          warehouse: product.warehouse ?? "",
        });
      } catch {
        toast.error("Failed to load product");
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!id) return;

    setErrors({});
    setIsSubmitting(true);

    try {
      await updateProduct(id, form);

      toast.success("Product updated successfully");

      navigate("/products");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiErrors = error.response?.data?.errors;

        if (Array.isArray(apiErrors)) {
          setErrors(
            Object.fromEntries(
              apiErrors.map(err => [
                err.field,
                err.message,
              ])
            )
          );

          toast.error("Please fix the highlighted fields.");
        } else {
          toast.error("Failed to update product.");
        }
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading product...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Product
        </h1>

        <p className="mt-2 text-(--muted)">
          Update product details.
        </p>
      </div>

      <ProductForm
        form={form}
        setForm={setForm}
        errors={errors}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
