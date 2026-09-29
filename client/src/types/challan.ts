export type ChallanStatus =
  | "DRAFT"
  | "CONFIRMED"
  | "CANCELLED";

export type UserRole =
  | "ADMIN"
  | "SALES"
  | "WAREHOUSE"
  | "ACCOUNTS";


export interface ChallanCustomer {
  id: string;
  name: string;
  businessName?: string;
}

export interface ChallanUser {
  id: string;
  name: string;
  role: UserRole;
}

export interface ChallanItem {
  id: string;
  productId: string;
  productName: string;
  productSKU: string;
  quantity: number;
  unitPrice: string;
}


/*
 * GET /challans
 */
export interface ChallanListItem {
  id: string;
  challanNumber: string;
  challanDate: string;
  status: ChallanStatus;
  totalQuantity: number;

  customer: {
    id: string;
    name: string;
  };
}


/*
 * GET /challans/:id
 */
export interface ChallanDetails {
  id: string;
  challanNumber: string;
  challanDate: string;
  status: ChallanStatus;
  totalQuantity: number;

  customer: ChallanCustomer;

  items: ChallanItem[];

  createdBy: ChallanUser;

  confirmedAt: string | null;
  cancelledAt: string | null;
  updatedAt: string;

  totalAmount: number;
}


/*
 * POST /challans
 * PATCH /challans/:id
 */
export interface ChallanFormItem {
  productId: string;
  quantity: number;
}

export interface ChallanFormData {
  customerId: string;
  items: ChallanFormItem[];
}

export type CreateChallanInput = ChallanFormData;


/*
 * GET /challans response
 */
export interface ChallanListResponse {
  data: ChallanListItem[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
