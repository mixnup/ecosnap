import { useState, useEffect, useMemo } from 'react';
import { useInventory } from '../../context/InventoryContext';
import { usePantry } from '../../context/PantryContext';
import { useUserPreferences } from '../../context/UserPreferencesContext';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import { UtensilsCrossed, Loader2, X, Search, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import SelectionItem from '../components/SelectionItem';
import { recipeService } from '../../services/RecipeService';
import { RecipeHistoryService } from '../../services/RecipeHistoryService';
import type { Recipe } from '../../types/recipe';

interface TriageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ITEMS_PER_PAGE = 8;

export default function TriageModal({ isOpen, onClose }: TriageModalProps) {
  const { user } = useAuth();
  const { items } = useInventory();
  const { pantryItems } = usePantry();
  const { preferences } = useUserPreferences();
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [isWakingUp, setIsWakingUp] = useState(false);

  // Selection & Search State
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [costSavings, setCostSavings] = useState<{ items_used_cost: number; pantry_items_cost: number; total_saved: number; } | undefined>();
  const [seasonalContext, setSeasonalContext] = useState<{ location: string; season: string; context: string; } | undefined>();

  // Wake up the server on open & Initialize state
  useEffect(() => {
    if (isOpen) {
      // 1. Reset states
      setRecipe(null);
      setRecipes([]);
      setSelectedRecipeIndex(0);
      setError(null);
      setSearch('');
      setPage(1);
      setIsGenerating(false);

      // 2. Pre-select expiring items
      const expiringIds = items
        .filter(item => item.expiryHours <= 48)
        .map(item => item.id);
      setSelectedIds(new Set(expiringIds));

      // 3. Ping health to wake up Render (Cold Start handling)
      const wakeUp = async () => {
        setIsWakingUp(true);
        await recipeService.checkHealth();
        setIsWakingUp(false);
      };
      wakeUp();
    }
  }, [isOpen, items]);

  // Filtering & Pagination Logic
  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, page]);

  // Reset page when search changes
  useEffect(() => { setPage(1); }, [search]);

  const toggleItem = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const selectedItems = items.filter(item => selectedIds.has(item.id));

  // The currently displayed recipe (single or from multi-select)
  const displayedRecipe = recipes.length > 0 ? recipes[selectedRecipeIndex] : recipe;

  // Simulated animated loading sequence
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingStep(prev => (prev + 1) % 4);
    }, 800);
    return () => clearInterval(interval);
  }, [loading]);

  const loadingMessages = [
    "Analyzing selected ingredients...",
    "Cross-referencing recipes...",
    "Calculating optimal usage...",
    "Finalizing instructions..."
  ];

  const handleTriage = async () => {
    if (selectedIds.size === 0) {
      toast.error("Please select at least one item to triage.");
      return;
    }

    setLoading(true);
    setIsGenerating(true);
    setError(null);
    try {
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
          setSelectedRecipeIndex(0);
          toast.success(`${response.recipes.length} recipe variants generated!`);
        } else if (response.recipe) {
          setRecipe(response.recipe);
          setCostSavings(response.cost_savings);
          setSeasonalContext(response.seasonal_context);
          toast.success("Dinner plan generated!");
        } else {
          const msg = response.message || 'Could not generate a recipe.';
          setError(msg);
          toast.error(msg);
        }
      } else {
        const msg = response.message || 'Could not generate a recipe.';
        setError(msg);
        toast.error(msg);
      }
    } catch (err: any) {
      const msg = err.message || 'An error occurred while generating your recipe.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = async () => {
    if (!user || !displayedRecipe || isSaving) return;
    setIsSaving(true);
    try {
      await RecipeHistoryService.saveToHistory(user.uid, displayedRecipe, true);
      toast.success("Recipe saved to history!");
      onClose();
    } catch {
      toast.error("Failed to save recipe.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-500"
        onClick={!loading ? onClose : undefined}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white rounded-[32px] shadow-2xl shadow-emerald-900/20 border border-emerald-100/50 animate-in zoom-in-95 fade-in duration-500 flex flex-col">

        {/* Header Actions */}
        <div className="p-8 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-text-heading">
              {displayedRecipe ? "Tonight's Masterpiece" : isGenerating ? "Generating..." : "Triage Selection"}
            </h2>
            <p className="text-sm text-text-muted mt-1">
              {displayedRecipe ? "Triage successful" : isGenerating ? "AI is cooking up a plan" : `${selectedIds.size} items selected for triage`}
            </p>
          </div>
          {!loading && (
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-gray-50 text-gray-400 hover:text-text-heading hover:bg-gray-100 transition-all"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 pt-4 scrollbar-hide">
          {isWakingUp ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-8 animate-in fade-in duration-500">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-2xl bg-amber-400/20 animate-pulse" />
                <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 relative z-10 border border-amber-100">
                  <UtensilsCrossed size={32} className="animate-bounce" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-text-heading">Waking up the Chef...</h3>
                <p className="text-text-muted mt-2 text-sm max-w-[240px] mx-auto">
                  Our AI kitchen takes a nap when it's quiet. Just a few seconds while we heat the pans!
                </p>
              </div>
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          ) : !isGenerating && !displayedRecipe ? (
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input
                  type="text"
                  placeholder="Search your inventory..."
                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-emerald-200 transition-all outline-none font-medium text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Items List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {paginatedItems.map((item) => (
                  <SelectionItem
                    key={item.id}
                    item={item}
                    isSelected={selectedIds.has(item.id)}
                    onToggle={() => toggleItem(item.id)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 pt-4">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-emerald-600 disabled:opacity-30 disabled:hover:text-gray-400 transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-sm font-bold text-gray-500">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(p => p + 1)}
                    className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-emerald-600 disabled:opacity-30 disabled:hover:text-gray-400 transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}

              {filteredItems.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-gray-400 font-medium italic">No items matching "{search}"</p>
                </div>
              )}
            </div>
          ) : null}

          {loading && (
            <div className="flex flex-col items-center justify-center py-20 space-y-8 text-emerald-600 w-full animate-in fade-in duration-500">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-2xl bg-emerald-400/30 animate-pulse" />
                <Loader2 size={64} className="animate-spin relative z-10" strokeWidth={1.5} />
              </div>
              <div className="h-8 overflow-hidden relative w-full flex justify-center">
                <p key={loadingStep} className="text-xl font-bold tracking-tight animate-in slide-in-from-bottom-4 fade-in duration-300 absolute">
                  {loadingMessages[loadingStep]}
                </p>
              </div>
            </div>
          )}

          {/* Multi-Recipe Selector */}
          {recipes.length > 1 && !loading && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              {/* Seasonal & Savings Context */}
              {(seasonalContext || costSavings) && (
                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {seasonalContext && (
                    <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex flex-col justify-center">
                      <h4 className="text-[10px] font-extrabold text-blue-600 uppercase tracking-[2px] mb-2 flex items-center gap-1.5">
                        <Sparkles size={12} /> Seasonal: {seasonalContext.season}
                      </h4>
                      <p className="text-sm text-blue-900 leading-relaxed font-medium">{seasonalContext.context}</p>
                    </div>
                  )}
                  {costSavings && (
                    <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex flex-col justify-center">
                      <h4 className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-[2px] mb-2">
                        Total Value Saved
                      </h4>
                      <p className="text-3xl font-black text-emerald-600 tracking-tight">
                        ${costSavings.total_saved.toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Recipe Tab Selector */}
              <div className="flex items-center gap-2 mb-6">
                {recipes.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedRecipeIndex(i)}
                    className={`flex-1 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 border ${selectedRecipeIndex === i
                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20'
                        : 'bg-white text-text-muted border-gray-200 hover:border-emerald-200 hover:text-emerald-600'
                      }`}
                  >
                    {r.type || `Option ${i + 1}`}
                  </button>
                ))}
              </div>
              <RecipeCard recipe={recipes[selectedRecipeIndex]} />
            </div>
          )}

          {/* Single Recipe Display */}
          {recipe && !loading && recipes.length === 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
              <RecipeCard recipe={recipe} />
            </div>
          )}

          {error && !loading && (
            <div className="p-5 w-full rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-semibold shadow-sm animate-in slide-in-from-top-2">
              {error}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-gray-100 bg-gray-50/30">
          {!displayedRecipe && !loading && (
            <button
              onClick={handleTriage}
              disabled={selectedIds.size === 0}
              className="w-full flex items-center justify-center gap-3 py-5 rounded-full bg-emerald-500 text-white text-lg font-bold shadow-xl shadow-emerald-500/30 hover:bg-emerald-600 hover:shadow-2xl hover:shadow-emerald-500/40 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
            >
              <UtensilsCrossed size={22} className="group-hover:rotate-12 transition-transform" />
              Triage {selectedIds.size} Selected Items
            </button>
          )}

          {displayedRecipe && !loading && (
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSaveRecipe}
                disabled={isSaving}
                className="flex-1 py-5 flex items-center justify-center gap-2 rounded-full bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all disabled:opacity-50"
              >
                {isSaving ? <Loader2 size={20} className="animate-spin" /> : "Save & Let's Cook!"}
              </button>
              <button
                onClick={() => { setRecipe(null); setRecipes([]); setSelectedRecipeIndex(0); setIsGenerating(false); setCostSavings(undefined); setSeasonalContext(undefined); }}
                className="flex-1 py-5 rounded-full bg-white border border-gray-200 text-text-heading font-bold hover:bg-gray-50 transition-all"
              >
                Change Ingredients
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
