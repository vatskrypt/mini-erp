import type { Challan } from "../../types/challan";
import StatusBadge from "./StatusBadge";
interface ChallanTableProps {
  challans: Challan[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onConfirm?: (id: string) => void;
}

export default function ChallanTable({
  challans,
  onView,
  onEdit,
  onConfirm,
}: ChallanTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-amber-900">
      <table className="min-w-full">
        <thead className="bg-amber-950">
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
              className="border-t hover:bg-gray-700"
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
                  <button
                    onClick={() => onView?.(challan.id)}
                    className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
                  >
                    View
                  </button>

                  {challan.status === "DRAFT" && (
                    <>
                      <button
                        onClick={() => onEdit?.(challan.id)}
                        className="rounded bg-yellow-500 px-3 py-1 text-sm text-white"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onConfirm?.(challan.id)}
                        className="rounded bg-green-600 px-3 py-1 text-sm text-white"
                      >
                        Confirm
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
