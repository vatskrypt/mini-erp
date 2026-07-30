import { useEffect, useState } from "react";
import axios from "axios";
import CustomerForm from "@/components/customers/CustomerForm";
import type { CreateCustomerFormData } from "@/types/customer";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomer, updateCustomer } from "@/api/customers";
import { toast } from "sonner";

export default function EditCustomerPage() {
  const {id} = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState<CreateCustomerFormData>({
    name: "",
    businessName: "",
    mobile: "",
    email: "",
    gstNumber: "",
    customerType: "RETAIL",
    status: "ACTIVE",
    address: "",
    followUpDate: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      toast.error("Invalid customer id");
      navigate("/customers");
      return;
    }
    const fetchCustomer = async () => {
      try {
        const customer = await getCustomer(id);

        setForm({
          name: customer.name,
          businessName: customer.businessName,
          mobile: customer.mobile,
          email: customer.email,
          gstNumber: customer.gstNumber ?? "",
          customerType: customer.customerType,
          status: customer.status,
          address: customer.address ?? "",
          followUpDate: customer.followUpDate
            ? customer.followUpDate.split("T")[0]
            : "",
          notes: customer.notes ?? "",
        });
      } catch (error) {
        toast.error("Failed to load customer");
        navigate("/customers");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomer();
  }, [id, navigate]);


  const handleSubmit = async () => {
    setErrors({});

    if (!id) {
      toast.error("Customer ID is missing");
      return;
    }

    setIsSubmitting(true);

    try {
      await updateCustomer(id, form);

      toast.success("Customer details edited successfully");

      navigate("/customers");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiErrors = error.response?.data?.errors;

        if (Array.isArray(apiErrors) && apiErrors.length > 0) {
          const fieldErrors = Object.fromEntries(
            apiErrors.map(
              (e: { field: string; message: string }) => [
                e.field,
                e.message,
              ]
            )
          );

          setErrors(fieldErrors);

          toast.error(
            "Please fix the highlighted fields."
          );

          return;
        }

        toast.error("Failed to update customer details");
        return;
      }

      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };


  if (isLoading) {
  return <div>Loading...</div>
}
  return (
    <>
      <CustomerForm
        value={form}
        onChange={setForm}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        errors={errors}
      />


    </>
  );
}
