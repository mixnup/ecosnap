export interface ExpiringItem {
  name: string;
  quantity?: number;
  unit?: string;
  category?: string;
  hours_until_expiry?: number;
}

export interface PantryItemPayload {
  name: string;
  category?: string;
  quantity?: number;
  unit?: string;
}

export interface CategorizedItems {
  proteins: ExpiringItem[];
  vegetables: ExpiringItem[];
  starches: ExpiringItem[];
  dairy: ExpiringItem[];
  pantry: ExpiringItem[];
  misc?: ExpiringItem[];
}

export interface RecipeTriageRequest {
  expiring_items: ExpiringItem[];
  pantry_items?: PantryItemPayload[];
  dietary_restrictions?: string[];
  multi_recipe?: boolean;
}

export interface Recipe {
  type?: 'QUICK' | 'BALANCED' | 'CREATIVE' | string;
  title: string;
  ingredients: string[];
  instructions: string[];
  cook_time_minutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
  estimated_cost_saved: number;
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sodium: number;
    health_notes: string;
  };
  expiring_items_used: ExpiringItem[];
  categorized_items?: CategorizedItems;
  urgent_items?: ExpiringItem[];
  fallback?: boolean;
}

export interface RecipeTriageResponse {
  success: boolean;
  recipe: Recipe | null;
  recipes?: Recipe[];
  message?: string;
  cost_savings?: {
    items_used_cost: number;
    pantry_items_cost: number;
    total_saved: number;
  };
  monthly_savings?: {
    monthly_total: number;
  };
  seasonal_context?: {
    location: string;
    season: string;
    suggestions: string[];
    context: string;
  };
}
