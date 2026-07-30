import api from "./axios";
import type {
  Product,
  ProductFormData,
} from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  const res = await api.get("/products");
  return res.data.data;
}

export async function getProduct(
  id: string
): Promise<Product> {
  const res = await api.get(`/products/${id}`);
  return res.data.data;
}

export async function createProduct(
  data: ProductFormData
) {
  const res = await api.post("/products", data);
  return res.data.data;
}

export async function updateProduct(
  id: string,
  data: ProductFormData
) {
  const res = await api.put(`/products/${id}`, data);
  return res.data.data;
}

export async function deleteProduct(id: string) {
  await api.delete(`/products/${id}`);
}
