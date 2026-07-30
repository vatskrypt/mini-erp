
import {
  Button,

  Panel,
  Section,
} from "@/components/ui";
import Input from "../ui/Input";

import type { ProductFormData } from "@/types/product";

interface ProductFormProps {
  form: ProductFormData;
  setForm: React.Dispatch<
    React.SetStateAction<ProductFormData>
  >;
  errors: Record<string, string>;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export default function ProductForm({
  form,
  setForm,
  errors,
  onSubmit,
  isSubmitting,
}: ProductFormProps) {
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "currentStock" ||
        name === "minimumStock"
          ? Number(value)
          : value,
    }));
  }

  return (
    <Panel>
      <form
        onSubmit={onSubmit}
        className="space-y-6"
      >
        <Section title="Product Information">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              id="product-name"
              label="Product Name"
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              disabled={isSubmitting}
              error={errors.name}

            />

            <Input
              id="product-sku"
              label="SKU"
              name="sku"
              placeholder="SKU"
              value={form.sku}
              onChange={handleChange}
              disabled={isSubmitting}
              error={errors.sku}

            />

            <Input
              id="product-category"
              label="Category"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              disabled={isSubmitting}
              error={errors.category}

            />

            <Input
              id="unit-price"
              label="Unit Price"
              name="unitPrice"
              type="number"
              min="0"
              step="0.01"
              placeholder="Unit Price"
              value={form.unitPrice}
              onChange={handleChange}
              disabled={isSubmitting}
              error={errors.unitPrice}

            />
          </div>
        </Section>

        <Section title="Inventory">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              id="current-stock"
              label="Current Stock"
              name="currentStock"
              type="number"
              min="0"
              placeholder="Current Stock"
              value={form.currentStock}
              onChange={handleChange}
              disabled={isSubmitting}
              error={errors.currentStock}
            />

            <Input
              id="minimum-stock"
              label="Minimum Stock"
              name="minimumStock"
              type="number"
              min="0"
              placeholder="Minimum Stock"
              value={form.minimumStock}
              onChange={handleChange}
              disabled={isSubmitting}
              error={errors.minimumStock}

            />

            <Input
              id="warehouse"
              label="Warehouse"
              name="warehouse"
              placeholder="Warehouse"
              value={form.warehouse}
              onChange={handleChange}
              disabled={isSubmitting}
              error={errors.warehouse}
            />
          </div>
        </Section>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Saving..."
              : "Save Product"}
          </Button>
        </div>
      </form>
    </Panel>
  );
}
