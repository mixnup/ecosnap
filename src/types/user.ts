export interface UserPreferences {
  cuisineTypes: string[];
  spiceLevel: 'mild' | 'medium' | 'spicy';
  cookingSkill: 'beginner' | 'intermediate' | 'advanced';
  dietaryRestrictions: string[];
  servingSize: number;
  maxCookTime: number;
  location: string;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  cuisineTypes: [],
  spiceLevel: 'medium',
  cookingSkill: 'beginner',
  dietaryRestrictions: [],
  servingSize: 2,
  maxCookTime: 60,
  location: 'default',
};
