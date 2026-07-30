import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import ProductForm from "@/components/products/ProductForm";
import { createProduct } from "@/api/products";
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

export default function CreateProductPage() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState<ProductFormData>(EMPTY_PRODUCT);

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setErrors({});
    setIsSubmitting(true);

    try {
      await createProduct(form);

      toast.success(
        "Product created successfully"
      );

      navigate("/products");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiErrors =
          error.response?.data?.errors;

        if (
          Array.isArray(apiErrors) &&
          apiErrors.length > 0
        ) {
          const fieldErrors =
            Object.fromEntries(
              apiErrors.map((err) => [
                err.field,
                err.message,
              ])
            );

          setErrors(fieldErrors);

          toast.error(
            "Please fix the highlighted fields."
          );

          return;
        }

        toast.error(
          "Failed to create product."
        );

        return;
      }

      console.error(error);

      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Add Product
        </h1>

        <p className="mt-2 text-(--muted)">
          Create a new product.
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
