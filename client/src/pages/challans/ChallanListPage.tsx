import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChallans } from "../../api/challan";
import ChallanTable from "../../components/challans/ChallanTable";
import type { Challan } from "../../types/challan";
import { Button } from "@/components/ui/Button";

export default function ChallanListPage() {
  const [challans, setChallans] = useState<Challan[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchChallans() {
      try {
        const response = await getChallans();
        setChallans(response.data);
      } finally {
        setLoading(false);
      }
    }

    fetchChallans();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Challans
      </h1>
      <Button
          onClick={() => navigate("/challans/new")}
      >
          Create Challan
      </Button>

      <ChallanTable
        challans={challans}
        onView={(id) => navigate(`/challans/${id}`)}
        onEdit={(id) => navigate(`/challans/${id}/edit`)}
        onConfirm={(id) => console.log("Confirm", id)}
      />
    </div>
  );
}
