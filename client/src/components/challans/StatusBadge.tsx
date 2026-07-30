import type { ChallanStatus } from "../../types/challan";

interface StatusBadgeProps {
  status: ChallanStatus;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  switch (status) {
    case "DRAFT":
      return (
        <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
          Draft
        </span>
      );

    case "CONFIRMED":
      return (
        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
          Confirmed
        </span>
      );

    case "CANCELLED":
      return (
        <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
          Cancelled
        </span>
      );

    default:
      return null;
  }
}
