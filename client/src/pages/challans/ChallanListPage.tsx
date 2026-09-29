import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { confirmChallan, getChallans } from "@/api/challan";
import ChallanTable from "@/components/challans/ChallanTable";
import { Button } from "@/components/ui";
import type { ChallanListItem } from "@/types/challan";

export default function ChallanListPage() {
  const [challans, setChallans] = useState<ChallanListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadChallans = useCallback(async () => {
    try {
      const response = await getChallans();
      setChallans(response.data);
    } catch {
      toast.error("Failed to load challans");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadChallans();
  }, [loadChallans]);

  async function handleConfirm(id: string) {
    setConfirmingId(id);
    try {
      await confirmChallan(id);
      toast.success("Challan confirmed");
      await loadChallans();
    } catch {
      toast.error("Could not confirm challan. Check available stock and try again.");
    } finally {
      setConfirmingId(null);
    }
  }

  if (loading) return <div>Loading challans…</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Challans</h1>
          <p className="mt-1 text-sm text-(--muted)">Create and track stock deliveries.</p>
        </div>
        <Button onClick={() => navigate("/challans/new")}>Create Challan</Button>
      </div>

      <ChallanTable
        challans={challans}
        confirmingId={confirmingId}
        onView={(id) => navigate(`/challans/${id}`)}
        onEdit={(id) => navigate(`/challans/${id}/edit`)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
