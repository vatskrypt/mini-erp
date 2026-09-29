import type { ChallanListItem } from "../../types/challan";
import StatusBadge from "./StatusBadge";
import { Button } from "@/components/ui";
interface ChallanTableProps {
  challans: ChallanListItem[];
  confirmingId?: string | null;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onConfirm?: (id: string) => void;
}

export default function ChallanTable({
  challans,
  onView,
  onEdit,
  onConfirm,
  confirmingId,
}: ChallanTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-(--border) bg-(--surface)">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left">Challan No.</th>
            <th className="px-4 py-3 text-left">Customer</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-right">Quantity</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {challans.map((challan) => (
            <tr
              key={challan.id}
              className="transition-colors hover:bg-(--surface-raised)"
            >
              <td className="px-4 py-3 font-medium">
                {challan.challanNumber}
              </td>

              <td className="px-4 py-3">
                {challan.customer.name}
              </td>

              <td className="px-4 py-3">
                <StatusBadge status={challan.status} />
              </td>

              <td className="px-4 py-3 text-right">
                {challan.totalQuantity}
              </td>

              <td className="px-4 py-3">
                {new Date(
                  challan.challanDate
                ).toLocaleDateString()}
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">
                  <Button onClick={() => onView?.(challan.id)} className="px-3 py-1 text-sm">
                    View
                  </Button>

                  {challan.status === "DRAFT" && (
                    <>
                      <Button onClick={() => onEdit?.(challan.id)} className="px-3 py-1 text-sm">
                        Edit
                      </Button>

                      <button
                        onClick={() => onConfirm?.(challan.id)}
                        disabled={confirmingId === challan.id}
                        className="rounded-md border border-(--success) bg-(--success)/10 px-3 py-1 text-sm text-(--success) disabled:opacity-60"
                      >
                        {confirmingId === challan.id ? "Confirming…" : "Confirm"}
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}

          {challans.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="py-8 text-center text-gray-500"
              >
                No challans found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
