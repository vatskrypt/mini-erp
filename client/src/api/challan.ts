import api from "./axios";
import type { Challan, ChallanListResponse, CreateChallanInput } from "../types/challan";

export async function getChallans(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: "DRAFT" | "CONFIRMED" | "CANCELLED";
  customerId?: string;
}) {
  const { data } = await api.get<ChallanListResponse>(
    "/challans",
    {
      params,
    }
  );

  return data;
}

export async function getChallan(id: string) {
  const { data } = await api.get<{
    success: boolean;
    data: Challan;
  }>(`/challans/${id}`);

  return data;
}

export async function createChallan(
  payload: CreateChallanInput
) {
  const { data } = await api.post<{
    success: boolean;
    message: string;
    data: Challan;
  }>("/challans", payload);

  return data;
}

export async function updateChallan(
  id: string,
  payload: CreateChallanInput
) {
  const { data } = await api.put<{
    success: boolean;
    message: string;
    data: Challan;
  }>(`/challans/${id}`, payload);

  return data;
}

export async function confirmChallan(id: string) {
  const { data } = await api.patch<{
    success: boolean;
    message: string;
    data: Challan;
  }>(`/challans/${id}/confirm`);

  return data;
}

// export async function cancelChallan(id: string) {
//   const { data } = await api.patch<{
//     success: boolean;
//     message: string;
//     data: Challan;
//   }>(`/challans/${id}/cancel`);

//   return data;
// }

// export async function deleteChallan(id: string) {
//   const { data } = await api.delete<{
//     success: boolean;
//     message: string;
//   }>(`/challans/${id}`);

// return data;
//}
