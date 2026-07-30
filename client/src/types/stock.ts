export interface AdjustStockData {
  movementType: "IN" | "OUT";
  quantity: number;
  remarks?: string;
}
