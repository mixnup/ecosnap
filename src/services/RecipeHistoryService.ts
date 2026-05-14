import {
  collection,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase/config";
import type { Recipe, ExpiringItem, CategorizedItems } from "../types/recipe";

export interface RecipeHistoryEntry {
  user_id: string;
  title: string;
  ingredients: string[];
  generated_at: Timestamp;
  chosen: boolean;
  expiring_items_used: ExpiringItem[];
  categorized_items?: CategorizedItems;
  urgent_items?: ExpiringItem[];
  estimated_cost_saved?: number;
}

const COLLECTION_NAME = "recipe_history";

export const RecipeHistoryService = {
  /**
   * Saves a recipe to the history collection.
   */
  saveToHistory: async (
    userId: string,
    recipe: Recipe,
    chosen: boolean = true
  ): Promise<string> => {
    try {
      const entry: Omit<RecipeHistoryEntry, 'generated_at'> & { generated_at: Timestamp } = {
        user_id: userId,
        title: recipe.title,
        ingredients: recipe.ingredients,
        generated_at: Timestamp.now(),
        chosen,
        expiring_items_used: recipe.expiring_items_used || [],
        categorized_items: recipe.categorized_items,
        urgent_items: recipe.urgent_items,
        estimated_cost_saved: recipe.estimated_cost_saved,
      };

      const docRef = await addDoc(collection(db, COLLECTION_NAME), entry);
      return docRef.id;
    } catch (error) {
      console.error("Error saving recipe to history:", error);
      throw error;
    }
  },

  /**
   * Fetches recent recipes for a user, ordered by generated_at DESC.
   * Requires composite index: user_id (==) + generated_at (DESC).
   */
  getRecentRecipes: async (
    userId: string,
    maxResults: number = 20
  ): Promise<(RecipeHistoryEntry & { id: string })[]> => {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("user_id", "==", userId),
        orderBy("generated_at", "desc"),
        limit(maxResults)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as (RecipeHistoryEntry & { id: string })[];
    } catch (error) {
      console.error("Error fetching recipe history:", error);
      return [];
    }
  },

  /**
   * Calculates the total lifetime cost savings for a user.
   */
  getLifetimeSavings: async (userId: string): Promise<number> => {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("user_id", "==", userId),
        where("chosen", "==", true)
      );

      const snapshot = await getDocs(q);
      let total = 0;
      snapshot.forEach(doc => {
        const data = doc.data();
        total += data.estimated_cost_saved || 0;
      });
      return total;
    } catch (error) {
      console.error("Error calculating lifetime savings:", error);
      return 0;
    }
  },
};
