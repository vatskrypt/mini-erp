import { useState } from "react";
import axios from "axios";
import CustomerForm from "@/components/customers/CustomerForm";
import type { CreateCustomerFormData } from "@/types/customer";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "@/api/customers";

export default function CreateCustomerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  const handleSubmit = async () => {

    try {
      setIsSubmitting(true);
      await createCustomer(form);
      alert("Customer created successfully");
      navigate("/customers");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiErrors = error.response?.data?.errors;

        if (apiErrors?.length) {
          const fieldErrors = Object.fromEntries(
            apiErrors.map((e: { field: string; message: string }) => [
              e.field,
              e.message,
            ])
          );
          setErrors(fieldErrors);
        } else {
          alert("Failed to create customer");
        }
      } else {
        console.error(error);
        alert("Something went wrong");
      }



    } finally {
      setIsSubmitting(false);
    }
  };

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
