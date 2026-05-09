import type { RecipeTriageRequest, RecipeTriageResponse } from "../types/recipe";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

class RecipeService {
  /**
   * Generates a dinner recipe based on expiring items.
   * @param data - The list of expiring items and dietary restrictions.
   * @returns A promise that resolves to the recipe response.
   */
  async triageDinner(data: RecipeTriageRequest): Promise<RecipeTriageResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/recipes/triage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": API_KEY,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Recipe generation failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Error in RecipeService.triageDinner:", error);
      throw error;
    }
  }

  /**
   * Pings the health check endpoint to wake up the server.
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch (error) {
      console.error("Health check failed:", error);
      return false;
    }
  }
}

export const recipeService = new RecipeService();
export default RecipeService;
