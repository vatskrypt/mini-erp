import { Panel } from "@/components/ui";

interface Props {
  summary: {
    customers: number;
    products: number;
    draftChallans: number;
    confirmedChallans: number;
    inventoryUnits: number;
    lowStockProducts: number;
  };
}

export default function DashboardStats({
  summary,
}: Props) {
  const stats = [
    {
      title: "Customers",
      value: summary.customers,
    },
    {
      title: "Products",
      value: summary.products,
    },
    {
      title: "Draft Challans",
      value: summary.draftChallans,
    },
    {
      title: "Confirmed",
      value: summary.confirmedChallans,
    },
    {
      title: "Inventory",
      value: summary.inventoryUnits,
    },
    {
      title: "Low Stock",
      value: summary.lowStockProducts,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <Panel key={stat.title}>
          <div className="space-y-2">
            <p className="text-sm uppercase text-(--muted)">
              {stat.title}
            </p>

            <p className="text-4xl font-bold">
              {stat.value}
            </p>
          </div>
        </Panel>
      ))}
    </div>
  );
}
