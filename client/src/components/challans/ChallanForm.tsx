import { useState } from "react";

import {
  Button,
  Panel,
  Section,
  Select,
} from "@/components/ui";
import Input from "../ui/Input";
import type { Customer } from "@/types/customer";
import type { Product } from "@/types/product";
import type { ChallanFormData } from "@/types/challan";

interface ChallanFormProps {
  customers: Customer[];
  products: Product[];
  initialData?: ChallanFormData;
  onSubmit: (data: ChallanFormData) => Promise<void>;
}

interface ProductRowProps {
  item: ChallanFormData["items"][number];
  products: Product[];
  onChange: (
    updatedItem: ChallanFormData["items"][number]
  ) => void;
  onRemove: () => void;
}

function ProductRow({
  item,
  products,
  onChange,
  onRemove,
}: ProductRowProps) {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_150px_auto]">
      <Select
        value={item.productId}
        onChange={(e) =>
          onChange({
            ...item,
            productId: e.target.value,
          })
        }
      >
        <option value="">Select product</option>

        {products.map((product) => (
          <option
            key={product.id}
            value={product.id}
          >
            {product.name} ({product.sku})
          </option>
        ))}
      </Select>

      <Input
        type="number"
        min={1}
        value={item.quantity}
        onChange={(e) =>
          onChange({
            ...item,
            quantity: Number(e.target.value),
          })
        }
      />

      <Button
        type="button"
        onClick={onRemove}
      >
        Remove
      </Button>
    </div>
  );
}

export default function ChallanForm({
  customers,
  products,
  initialData,
  onSubmit,
}: ChallanFormProps) {
  const [customerId, setCustomerId] = useState(
    initialData?.customerId ?? ""
  );

  const [items, setItems] = useState<
    ChallanFormData["items"]
  >(
    initialData?.items ?? [
      {
        productId: "",
        quantity: 1,
      },
    ]
  );

  const [saving, setSaving] = useState(false);

  function addProduct() {
    setItems((prev) => [
      ...prev,
      {
        productId: "",
        quantity: 1,
      },
    ]);
  }

  function removeProduct(index: number) {
    setItems((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  function updateItem(
    index: number,
    updatedItem: ChallanFormData["items"][number]
  ) {
    setItems((prev) => {
      const nextItems = [...prev];

      nextItems[index] = updatedItem;

      return nextItems;
    });
  }

  const totalQuantity = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!customerId) {
      return;
    }

    if (items.length === 0) {
      return;
    }

    setSaving(true);

    try {
      await onSubmit({
        customerId,
        items,
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <Panel>
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <Section title="Customer">
          <Select
            value={customerId}
            onChange={(e) =>
              setCustomerId(e.target.value)
            }
            disabled={saving}
            required
          >
            <option value="">
              Select customer
            </option>

            {customers.map((customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.name}
              </option>
            ))}
          </Select>
        </Section>

        <Section title="Products">
          <div className="space-y-4">
            {items.map((item, index) => (
              <ProductRow
                key={index}
                item={item}
                products={products}
                onChange={(updatedItem) =>
                  updateItem(index, updatedItem)
                }
                onRemove={() =>
                  removeProduct(index)
                }
              />
            ))}
          </div>

          <div className="mt-4">
            <Button
              type="button"
              onClick={addProduct}
              disabled={saving}
            >
              + Add Product
            </Button>
          </div>
        </Section>

        <div className="flex items-center justify-between border-t border-(--border) pt-4">
          <div>
            <p className="text-sm uppercase text-(--muted)">
              Total Quantity
            </p>

            <p className="text-2xl font-bold">
              {totalQuantity}
            </p>
          </div>

          <Button
            type="submit"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save Challan"}
          </Button>
        </div>
      </form>
    </Panel>
  );
}
