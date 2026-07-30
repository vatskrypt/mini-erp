import type { Customer } from "@/types/customer";

interface CustomerRowProps {
  customer: Customer;
  onDelete: (id: string) => void;
}
import { useNavigate } from "react-router-dom";

export default function CustomerRow({
  customer,
  onDelete,
}: CustomerRowProps) {
  const navigate = useNavigate();
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
        <button className="text-(--accent)" onClick={()=>navigate(`/customers/${customer.id}/edit`)}>
          Edit
        </button>

        <button className="text-red-500"

           onClick={() => onDelete(customer.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
