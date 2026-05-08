export interface ExpiringItem {
  name: string;
  quantity?: number;
  unit?: string;
  category?: string;
}

export interface RecipeTriageRequest {
  expiring_items: ExpiringItem[];
  dietary_restrictions?: string[];
}

export interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  cook_time_minutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
  estimated_cost_saved: number;
  expiring_items_used: ExpiringItem[];
  fallback?: boolean;
}

export interface RecipeTriageResponse {
  success: boolean;
  recipe: Recipe | null;
  message?: string;
}
