import { useEffect, useState } from "react";

import { deleteCustomer, getCustomers } from "@/api/customers";
import type { Customer } from "@/types/customer";
import CustomerTable from "@/components/customers/CustomerTable";
import { toast } from "sonner";

import { useNavigate } from "react-router-dom";

export default function CustomersPage() {
  const navigate = useNavigate();
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
  const handleAddCustomer = () => {
    navigate("/customers/new");
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmed) return;

    try {
      await deleteCustomer(id);
      toast.success("Customer deleted successfully");
      setCustomers(prev => prev.filter(customer => customer.id !== id));

      // refresh list
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete customer");
    }
  };


  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Customers
          </h1>

          <p className="mt-2 text-(--muted)">
            Manage your customers
          </p>
        </div>

        <button
          className="rounded-lg bg-(--accent) px-4 py-2 text-white"
          onClick={handleAddCustomer}
        >
          + Add Customer
        </button>
      </div>

      <CustomerTable
        customers={customers}
        onDelete={handleDelete}
      />
    </div>
  );
}
