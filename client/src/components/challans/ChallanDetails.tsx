import type { ChallanDetails as ChallanDetailsType } from "@/types/challan";

import StatusBadge from "./StatusBadge";

import {
  Button,
  Panel,
  Section,
} from "@/components/ui";

interface ChallanDetailsProps {
  challan: ChallanDetailsType;
  onBack: () => void;
  onEdit: () => void;
}

export default function ChallanViewDetails({
  challan,
  onBack,
  onEdit,
}: ChallanDetailsProps) {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {challan.challanNumber}
          </h1>

          <p className="text-sm text-(--muted)">
            {new Date(
              challan.challanDate
            ).toLocaleDateString()}
          </p>
        </div>

        <StatusBadge status={challan.status} />
      </div>

      <Panel>
        {/* Customer */}
        <Section title="Customer">
          <p className="font-medium">
            {challan.customer.name}
          </p>

          {challan.customer.businessName && (
            <p className="text-sm text-(--muted)">
              {challan.customer.businessName}
            </p>
          )}
        </Section>

        {/* Products */}
        <Section title="Products">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-(--border)">
                <tr>
                  <th className="py-3">SKU</th>
                  <th>Product</th>
                  <th className="text-right">
                    Quantity
                  </th>
                  <th className="text-right">
                    Unit Price
                  </th>
                  <th className="text-right">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {challan.items.map((item) => {
                  const amount =
                    Number(item.unitPrice) *
                    item.quantity;

                  return (
                    <tr
                      key={item.id}
                      className="border-b border-(--border)"
                    >
                      <td className="py-3">
                        {item.productSKU}
                      </td>

                      <td>
                        {item.productName}
                      </td>

                      <td className="text-right">
                        {item.quantity}
                      </td>

                      <td className="text-right">
                        ₹
                        {Number(
                          item.unitPrice
                        ).toFixed(2)}
                      </td>

                      <td className="text-right">
                        ₹{amount.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Totals */}
        <div className="flex justify-end border-t border-(--border) pt-4">
          <div className="w-full max-w-xs space-y-2">

            <div className="flex justify-between">
              <span className="text-(--muted)">
                Total Quantity
              </span>

              <span>
                {challan.totalQuantity}
              </span>
            </div>

            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount</span>

              <span>
                ₹{challan.totalAmount.toFixed(2)}
              </span>
            </div>

          </div>
        </div>
      </Panel>

      {/* Additional Information */}
      <Panel>
        <Section title="Details">
          <div className="grid gap-4 md:grid-cols-2">

            <div>
              <p className="text-sm text-(--muted)">
                Created By
              </p>

              <p>
                {challan.createdBy.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-(--muted)">
                Last Updated
              </p>

              <p>
                {new Date(
                  challan.updatedAt
                ).toLocaleString()}
              </p>
            </div>

            {challan.confirmedAt && (
              <div>
                <p className="text-sm text-(--muted)">
                  Confirmed At
                </p>

                <p>
                  {new Date(
                    challan.confirmedAt
                  ).toLocaleString()}
                </p>
              </div>
            )}

            {challan.cancelledAt && (
              <div>
                <p className="text-sm text-(--muted)">
                  Cancelled At
                </p>

                <p>
                  {new Date(
                    challan.cancelledAt
                  ).toLocaleString()}
                </p>
              </div>
            )}

          </div>
        </Section>
      </Panel>

      {/* Actions */}
      <div className="flex justify-between">
        <Button
          type="button"
          onClick={onBack}
        >
          Back
        </Button>

        {challan.status === "DRAFT" && (
          <Button
            type="button"
            onClick={onEdit}
          >
            Edit Challan
          </Button>
        )}
      </div>

    </div>
  );
}
