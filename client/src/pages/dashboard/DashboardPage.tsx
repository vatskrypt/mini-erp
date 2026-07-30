import { getUser } from "@/lib/auth";
import { getDashboard, type DashboardData } from "@/api/dashboard";
import { useEffect, useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentChallans from "@/components/dashboard/RecentChallans";
import LowStockList from "@/components/dashboard/LowStockList";
import RecentStockLogs from "@/components/dashboard/RecentStockLogs";


export default function DashboardPage() {
  const user = getUser();

  const [dashboard, setDashboard] =
      useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
      getDashboard()
          .then(setDashboard)
          .finally(() => setLoading(false));
  }, []);
  if (loading) {
      return <p>Loading dashboard...</p>;
  }

  if (!dashboard) {
      return <p>Failed to load dashboard.</p>;
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        name={user ?? "User"}
      />

      <DashboardStats
        summary={dashboard.summary}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentChallans
          challans={dashboard.recentChallans}
        />

        <LowStockList
          products={dashboard.lowStock}
        />
      </div>
      <RecentStockLogs
            logs={dashboard.recentStockLogs}
          />

    </div>
  );
}
