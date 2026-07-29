import api from "./axios";

export interface DashboardData {
  summary: {
    customers: number;
    products: number;
    draftChallans: number;
    confirmedChallans: number;
    inventoryUnits: number;
    lowStockProducts: number;
  };

  recentChallans: any[];
  lowStock: any[];
  recentStockLogs: any[];
}

interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}

export async function getDashboard() {
  const response =
    await api.get<DashboardResponse>("/dashboard");

  return response.data.data;
}
