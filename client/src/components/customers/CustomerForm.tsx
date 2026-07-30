import {
  Button,
  Panel,
  Section,
  Select,
  Textarea,
} from "@/components/ui";
import Input from "../ui/Input";
import type { CreateCustomerFormData } from "@/types/customer";

interface CustomerFormProps {
  value: CreateCustomerFormData;
  onChange: React.Dispatch<
    React.SetStateAction<CreateCustomerFormData>
  >;
  onSubmit: () => void;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

export default function CustomerForm({
  value,
  onChange,
  onSubmit,
  isSubmitting,
  errors,
}: CustomerFormProps) {
  function updateField<K extends keyof CreateCustomerFormData>(
    field: K,
    fieldValue: CreateCustomerFormData[K]
  ) {
    onChange((prev) => ({
      ...prev,
      [field]: fieldValue,
    }));
  }

  return (
    <Panel>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-6"
      >
        <Section title="Basic Information">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
            disabled={isSubmitting}
              placeholder="Customer Name"
              value={value.name}
              error={ errors.name}
              onChange={(e) =>
                updateField("name", e.target.value)
              }
            />

            <Input
            disabled={isSubmitting}
              placeholder="Business Name"
              value={value.businessName}
              error={errors.businessName}
              onChange={(e) =>
                updateField(
                  "businessName",
                  e.target.value
                )
              }
            />

            <Input
            disabled={isSubmitting}
              placeholder="Mobile"
              value={value.mobile}
              error={errors.mobile}
              onChange={(e) =>
                updateField(
                  "mobile",
                  e.target.value
                )
              }
            />

            <Input
            disabled={isSubmitting}
              placeholder="Email"
              type="email"
              value={value.email}
              error={ errors.email}
              onChange={(e) =>
                updateField(
                  "email",
                  e.target.value
                )
              }
            />
          </div>
        </Section>

        <Section title="Additional Information">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
            disabled={isSubmitting}
              placeholder="GST Number"
              value={value.gstNumber}
              error={ errors.gstNumber}
              onChange={(e) =>
                updateField(
                  "gstNumber",
                  e.target.value
                )
              }
            />

            <Select
              value={value.customerType}
              onChange={(e) =>
                updateField(
                  "customerType",
                  e.target.value as CreateCustomerFormData["customerType"]
                )
              }
            >
              <option value="RETAIL">Retail</option>
              <option value="WHOLESALE">Wholesale</option>
            </Select>

            <Select
              value={value.status}
              onChange={(e) =>
                updateField(
                  "status",
                  e.target.value as CreateCustomerFormData["status"]
                )
              }
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </Select>
          </div>
        </Section>

        <Section title="Address">
          <Textarea
            placeholder="Address"
            rows={3}
            value={value.address}
            onChange={(e) =>
              updateField("address", e.target.value)
            }
          />
        </Section>

        <Section title="Notes">
          <Textarea
            placeholder="Notes"
            rows={3}
            value={value.notes}
            onChange={(e) =>
              updateField("notes", e.target.value)
            }
          />
        </Section>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting? "Saving...": "Create Customer"}
          </Button>
        </div>
      </form>
    </Panel>
  );
}
