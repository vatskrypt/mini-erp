import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ChallanForm from "@/components/challans/ChallanForm";

import { getCustomers } from "@/api/customers";
import { getProducts } from "@/api/products";
import { createChallan } from "@/api/challan";

import type { Customer } from "@/types/customer";
import type { Product } from "@/types/product";
import type { ChallanFormData } from "@/types/challan";

export default function CreateChallanPage() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [customerRes, productRes] =
          await Promise.all([
            getCustomers(),
            getProducts(),
          ]);

        setCustomers(customerRes);
        setProducts(productRes);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  async function handleSubmit(
    data: ChallanFormData
  ) {
    await createChallan(data);

    navigate("/challans");
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Create Challan
      </h1>

      <ChallanForm
        customers={customers}
        products={products}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
