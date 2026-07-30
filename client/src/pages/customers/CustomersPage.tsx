import { useEffect, useState } from "react";

import { getCustomers } from "@/api/customers";
import type { Customer } from "@/types/customer";
import CustomerTable from "@/components/customers/CustomerTable";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCustomers()
      .then(setCustomers)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading customers...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Customers
      </h1>

      <p className="mt-2 text-(--muted)">
        Manage your customers
      </p>

      <CustomerTable customers={customers} />
    </div>
  );
}
