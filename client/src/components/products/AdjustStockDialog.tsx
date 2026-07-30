import { useState } from "react";
import { adjustStock } from "@/api/products";
import { Button} from "@/components/ui";
import { toast } from "sonner";
import axios from "axios";
import Input from "../ui/Input";
import { Modal } from "@/components/ui";

interface AdjustStockDialogProps {
  productId: string;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdjustStockDialog({
  productId,
  open,
  onClose,
  onSuccess,
}: AdjustStockDialogProps) {
  const [movementType, setMovementType] = useState<"IN" | "OUT">("IN");
  const [quantity, setQuantity] = useState(1);
  const [remarks, setRemarks] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    setIsSubmitting(true);

    try {
      await adjustStock(productId, {
        movementType,
        quantity,
        remarks,
      });

      toast.success("Stock updated successfully");

      onSuccess();
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiErrors = error.response?.data?.errors;

        if (Array.isArray(apiErrors)) {
          setErrors(
            Object.fromEntries(
              apiErrors.map((err) => [
                err.field,
                err.message,
              ])
            )
          );
        }

        toast.error(
          error.response?.data?.message ??
            "Failed to update stock."
        );
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={open}>
      <h2 className="mb-6 text-2xl font-bold">
        Adjust Stock
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="mb-2 block font-medium">
            Movement
          </label>

          <select
            value={movementType}
            onChange={(e) =>
              setMovementType(
                e.target.value as "IN" | "OUT"
              )
            }
            className="w-full rounded-lg border border-(--border) bg-(--surface) p-3"
          >
            <option value="IN">Stock In</option>
            <option value="OUT">Stock Out</option>
          </select>
        </div>

        <Input
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) =>
            setQuantity(Number(e.target.value))
          }
          error={errors.quantity}
        />

        <Input
          label="Remarks"
          value={remarks}
          onChange={(e) =>
            setRemarks(e.target.value)
          }
          error={errors.remarks}
        />

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
