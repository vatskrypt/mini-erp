import { Panel } from "@/components/ui";

interface Challan {
  id: string;
  challanNumber: string;
  challanDate: string;
  status: string;
  customer: {
    name: string;
  };
}

interface RecentChallansProps {
  challans: Challan[];
}

export default function RecentChallans({
  challans,
}: RecentChallansProps) {
  return (
    <Panel>
      <h2 className="mb-4 text-lg font-semibold">
        Recent Challans
      </h2>

      <div className="space-y-3">
        {challans.length === 0 ? (
          <p className="text-sm text-(--muted)">
            No challans found.
          </p>
        ) : (
          challans.map((challan) => (
            <div
              key={challan.id}
              className="flex items-center justify-between border-b border-(--border) pb-2"
            >
              <div>
                <p className="font-medium">
                  {challan.challanNumber}
                </p>

                <p className="text-sm text-(--muted)">
                  {challan.customer.name}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm">
                  {challan.status}
                </p>

                <p className="text-xs text-(--muted)">
                  {new Date(challan.challanDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </Panel>
  );
}
