import api from "./axios";
import type {
  Customer,
  CreateCustomerFormData,
} from "@/types/customer";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}
export async function getCustomers() {
  const response =
    await api.get<ApiResponse<Customer>>("/customers");

  return response.data.data;
}
export async function getCustomer(id: string) {
  const response =
    await api.get<ApiResponse<Customer>>(
      `/customers/${id}`
    );

  return response.data.data;
}
export async function createCustomer(
  customer: CreateCustomerFormData
) {
  const response =
    await api.post<ApiResponse<Customer>>(
      "/customers",
      customer
    );

  return response.data.data;
}
export async function updateCustomer(
  id: string,
  customer: Partial<CreateCustomerFormData>
) {
  const response =
    await api.put<ApiResponse<Customer>>(
      `/customers/${id}`,
      customer
    );

  return response.data.data;
}
export async function deleteCustomer(
  id: string
) {
  await api.delete(`/customers/${id}`);
}
