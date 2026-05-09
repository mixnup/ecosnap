import type { ExpiringItem } from "./recipe";

export interface InventoryItem extends ExpiringItem {
  id: string;
  userId: string;
  expiryHours: number;
  createdAt: number;
}
