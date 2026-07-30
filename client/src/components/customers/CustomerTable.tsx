import { Panel } from "@/components/ui";
import type { Customer } from "@/types/customer";
import CustomerRow from "./CustomerRow";

interface CustomerTableProps {
  customers: Customer[];
}

export default function CustomerTable({
  customers,
}: CustomerTableProps) {
  return (
    <Panel>
      <table className="w-full text-left">
        <thead className="border-b border-(--border)">
          <tr>
            <th className="py-3">Name</th>
            <th>Business</th>
            <th>Mobile</th>
            <th>Status</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-6 text-center text-(--muted)"
              >
                No customers found.
              </td>
            </tr>
          ) : (
            customers.map((customer) => (
              <CustomerRow
                key={customer.id}
                customer={customer}
              />
            ))
          )}
        </tbody>
      </table>
    </Panel>
  );
}
