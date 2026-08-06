import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { getChallan } from "@/api/challan";
import type { ChallanDetails as ChallanDetailsType } from "@/types/challan";

import ChallanDetails from "@/components/challans/ChallanDetails";

export default function ChallanViewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [challan, setChallan] =
    useState<ChallanDetailsType | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      toast.error("Invalid challan ID");
      navigate("/challans");
      return;
    }

    async function fetchChallan() {
      try {
        const data = await getChallan(id!);

        setChallan(data);
      } catch (error) {
        console.error(error);

        toast.error("Failed to load challan");
        navigate("/challans");
      } finally {
        setLoading(false);
      }
    }

    fetchChallan();
  }, [id, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!challan) {
    return null;
  }

  return (
    <ChallanDetails
      challan={challan}
      onBack={() => navigate("/challans")}
      onEdit={() =>
        navigate(`/challans/${challan.id}/edit`)
      }
    />
  );
}
