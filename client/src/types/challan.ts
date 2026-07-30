export type ChallanStatus =
  | "DRAFT"
  | "CONFIRMED"
  | "CANCELLED";

export interface ChallanCustomer {
  id: string;
  name: string;
  businessName: string;
}

export interface ChallanUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STAFF";
}

export interface ChallanItem {
  id: string;
  productId: string;
  quantity: number;
  productName: string;
  productSKU: string;
  unitPrice: string;
  createdAt: string;
}

export interface Challan {
  id: string;
  challanNumber: string;
  status: ChallanStatus;
  totalQuantity: number;
  challanDate: string;
  confirmedAt: string | null;
  cancelledAt: string | null;
  updatedAt: string;

  customer: ChallanCustomer;
  items: ChallanItem[];
  createdBy: ChallanUser;
}

export interface ChallanFormItem {
  productId: string;
  quantity: number;
}

export interface ChallanFormData {
  customerId: string;
  items: ChallanFormItem[];
}
