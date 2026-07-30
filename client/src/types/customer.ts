export type CustomerStatus = "ACTIVE" | "INACTIVE";
export type CustomerType = "RETAIL" | "WHOLESALE";

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  email: string | null;
  businessName: string;
  gstNumber: string | null;
  customerType: CustomerType;
  status: CustomerStatus;
  address: string | null;
  followUpDate: string | null;
  notes: string | null;
  createdById: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerFormData {
  name: string;
  mobile: string;
  email?: string;
  businessName: string;
  customerType: CustomerType;
  status: CustomerStatus;
  gstNumber?: string;
  address?: string;
  followUpDate?: string;
  notes?: string;
}
