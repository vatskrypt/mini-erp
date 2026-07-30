import type { Customer } from "@/types/customer";

interface CustomerRowProps {
  customer: Customer;
}

export default function CustomerRow({
  customer,
}: CustomerRowProps) {
  return (
    <tr className="border-b border-(--border)">
      <td className="py-3">
        {customer.name}
      </td>

      <td>
        {customer.businessName}
      </td>

      <td>
        {customer.mobile}
      </td>

      <td>
        {customer.status}
      </td>

      <td>
        {customer.customerType}
      </td>

      <td className="space-x-3">
        <button className="text-(--accent)">
          Edit
        </button>

        <button className="text-red-500">
          Delete
        </button>
      </td>
    </tr>
  );
}
