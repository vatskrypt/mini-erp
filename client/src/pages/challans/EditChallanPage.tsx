import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { getCustomers } from "@/api/customers";
import { getChallan, updateChallan } from "@/api/challan";
import { getProducts } from "@/api/products";
import ChallanForm from "@/components/challans/ChallanForm";
import type { Customer } from "@/types/customer";
import type { Product } from "@/types/product";
import type { ChallanFormData } from "@/types/challan";

export default function EditChallanPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [initialData, setInitialData] = useState<ChallanFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      toast.error("Invalid challan ID");
      navigate("/challans", { replace: true });
      return;
    }

    async function loadForm() {
      try {
        const [customerResponse, productList, challan] = await Promise.all([
          getCustomers(),
          getProducts(),
          getChallan(id!),
        ]);

        if (challan.status !== "DRAFT") {
          toast.error("Only draft challans can be edited");
          navigate(`/challans/${id}`, { replace: true });
          return;
        }

        setCustomers(customerResponse.data);
        setProducts(productList);
        setInitialData({
          customerId: challan.customer.id,
          items: challan.items.map(({ productId, quantity }) => ({ productId, quantity })),
        });
      } catch {
        toast.error("Failed to load challan for editing");
        navigate("/challans", { replace: true });
      } finally {
        setLoading(false);
      }
    }

    void loadForm();
  }, [id, navigate]);

  async function handleSubmit(data: ChallanFormData) {
    if (!id) return;
    try {
      await updateChallan(id, data);
      toast.success("Challan updated");
      navigate(`/challans/${id}`);
    } catch {
      toast.error("Could not update challan. Check the form and try again.");
    }
  }

  if (loading || !initialData) return <div>Loading challan…</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Challan</h1>
        <p className="mt-1 text-sm text-(--muted)">Update the customer or items on this draft.</p>
      </div>
      <ChallanForm
        customers={customers}
        products={products}
        initialData={initialData}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
