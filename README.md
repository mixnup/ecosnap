# EcoSnap

**Expiry-First Dinner Triage**

EcoSnap is a high-urgency utility application designed to convert expiring household groceries into immediate dinner plans. Built to combat food waste and save money, EcoSnap skips the bloated "smart pantry" features and focuses strictly on what matters: telling you exactly what to cook tonight before your ingredients go bad.

## 🚀 Core Features

- **Expiry-First Triage**: Select items that are about to expire (e.g., within 48h) and instantly generate optimized recipes using what you have.
- **Cost Savings Impact**: Receive a calculated "Impact Receipt" with every meal, estimating the total value saved by not throwing food away.
- **Seasonal Context & Diet Awareness**: Recipes adapt to seasonal ingredients and strictly adhere to your dietary restrictions.
- **Sachet-Driven API Model**: Flexible micro-transaction system for high-friction premium AI requests like advanced receipt scanning.
- **Engineered Professionalism**: High-fidelity, minimalist design utilizing TailwindCSS for a premium user experience.

## 🛠️ Technical Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Lucide React (Icons)
- **State Management**: React Context API (`InventoryContext`, `PantryContext`, `UserPreferencesContext`)
- **Backend/API**: Python REST API (FastAPI) deployed on Render (handles AI synthesis)
- **Database / Auth**: Firebase (Authentication & Firestore)

## 💻 Code Snippets

### The Triage Engine API Call
EcoSnap takes selected expiring items, pantry staples, and user dietary restrictions to generate tailored dinner plans via the `RecipeService`.

```typescript
// src/services/RecipeService.ts
async triageDinner(data: RecipeTriageRequest): Promise<RecipeTriageResponse> {
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
}
```

### Context-Aware AI Generation
When the triage modal executes, it sends a highly contextualized request to the backend. It also surfaces metrics like cost savings and seasonal context.

```typescript
// src/dashboard/components/TriageModal.tsx
const response = await recipeService.triageDinner({
  expiring_items: selectedItems.map(({ name, quantity, unit, category }) => ({
    name, quantity, unit, category
  })),
  pantry_items: pantryItems.map(({ name, category, quantity, unit }) => ({
    name, category, quantity, unit
  })),
  dietary_restrictions:
    preferences.dietaryRestrictions.length > 0
      ? preferences.dietaryRestrictions
      : undefined,
});

if (response.success) {
  if (response.recipes && response.recipes.length > 0) {
    setRecipes(response.recipes);
    setCostSavings(response.cost_savings);
    setSeasonalContext(response.seasonal_context);
    toast.success(`${response.recipes.length} recipe variants generated!`);
  }
}
```

## 📦 Getting Started

### Prerequisites
- Node.js (v20+)
- Firebase Project configured
- EcoSnap Python Backend running

### Setup

1. **Clone & Install**
   ```bash
   git clone <repo-url>
   cd ecosnap
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file based on `.env.example`:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_API_BASE_URL=http://localhost:8000
   VITE_API_KEY=your_backend_api_key
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

## ⚖️ Disclaimer
*EcoSnap provides algorithmic estimates based on average shelf-life databases. These are not guarantees. Always inspect food, check packaging dates, and use your senses before consuming.*
