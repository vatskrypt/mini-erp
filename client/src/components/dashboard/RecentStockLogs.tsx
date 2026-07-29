import { Panel } from "@/components/ui";

interface StockLog {
  id: string;
  quantity: number;
  createdAt: string;
  product: {
    name: string;
    sku: string;
  };
  createdBy: {
    name: string;
  };
}

interface RecentStockLogsProps {
  logs: StockLog[];
}

export default function RecentStockLogs({
  logs,
}: RecentStockLogsProps) {
  return (
    <Panel>
      <h2 className="mb-4 text-lg font-semibold">
        Recent Stock Activity
      </h2>

      <div className="space-y-3">
        {logs.length === 0 ? (
          <p className="text-sm text-(--muted)">
            No recent stock activity.
          </p>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between border-b border-(--border) pb-2"
            >
              <div>
                <p className="font-medium">
                  {log.product.name}
                </p>

                <p className="text-sm text-(--muted)">
                  {log.createdBy.name}
                </p>
              </div>

              <div className="text-right">
                <p
                  className={`font-bold ${
                    log.quantity >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {log.quantity > 0 ? "+" : ""}
                  {log.quantity}
                </p>

                <p className="text-xs text-(--muted)">
                  {new Date(log.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </Panel>
  );
}
