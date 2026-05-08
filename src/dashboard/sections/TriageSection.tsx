import { useState, useEffect } from 'react';
import { UtensilsCrossed, Loader2, Sparkles } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import { recipeService } from '../../services/RecipeService';
import type { Recipe } from '../../types/recipe';

export default function TriageSection() {
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  // Simulated animated loading sequence
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingStep(prev => (prev + 1) % 4);
    }, 800);
    return () => clearInterval(interval);
  }, [loading]);

  const loadingMessages = [
    "Analyzing expiring inventory...",
    "Cross-referencing recipes...",
    "Calculating optimal usage...",
    "Finalizing instructions..."
  ];

  const handleTriage = async () => {
    setLoading(true);
    setError(null);
    try {
      // MVP: Using mocked expiring items to test the service
      const response = await recipeService.triageDinner({
        expiring_items: [
          { name: 'Salmon Fillet', quantity: 0.5, unit: 'lbs', category: 'seafood' },
          { name: 'Baby Spinach', quantity: 1, unit: 'bag', category: 'vegetables' }
        ]
      });
      
      if (response.success && response.recipe) {
        setRecipe(response.recipe);
      } else {
        setError(response.message || 'Could not generate a recipe.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while generating your recipe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative group">
      {/* Signature Gradient Border Wrapper */}
      <div className="absolute -inset-[1px] bg-gradient-to-br from-emerald-300 via-emerald-100 to-teal-300 rounded-[24px] opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />
      
      <div className="relative bg-white rounded-[23px] p-8 lg:p-10 shadow-xl shadow-emerald-500/[0.04]">
        <div className="flex flex-col items-center text-center space-y-7">
          
          {!recipe && (
            <div className="animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 mx-auto rounded-[18px] bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center text-emerald-500 shadow-inner mb-6 relative">
                <div className="absolute inset-0 rounded-[18px] border border-emerald-200/50" />
                <Sparkles size={36} strokeWidth={1.5} />
              </div>
              
              <h2 className="text-[28px] font-extrabold tracking-tight text-text-heading leading-tight">Dinner Triage</h2>
              <p className="text-text-body mt-3 text-lg leading-relaxed max-w-sm mx-auto">
                Convert your most urgent ingredients into a zero-waste meal plan.
              </p>
            </div>
          )}

          {!recipe && !loading && (
            <button
              onClick={handleTriage}
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-emerald-500 text-white text-lg font-bold shadow-xl shadow-emerald-500/30 hover:bg-emerald-600 hover:shadow-2xl hover:shadow-emerald-500/40 hover:-translate-y-1 transition-all duration-300 group/btn mt-4"
            >
              <UtensilsCrossed size={22} className="group-hover/btn:rotate-12 transition-transform" />
              Triage Dinner Now
            </button>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-16 space-y-6 text-emerald-600 w-full animate-in fade-in duration-500">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-xl bg-emerald-400/20 animate-pulse" />
                <Loader2 size={48} className="animate-spin relative z-10" strokeWidth={1.5} />
              </div>
              <div className="h-6 overflow-hidden relative w-full flex justify-center">
                <p key={loadingStep} className="font-semibold tracking-wide animate-in slide-in-from-bottom-4 fade-in duration-300 absolute">
                  {loadingMessages[loadingStep]}
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="p-5 w-full rounded-2xl bg-danger-light/50 border border-red-200 text-danger text-sm font-semibold shadow-sm animate-in slide-in-from-top-2">
              {error}
            </div>
          )}

        </div>

        {recipe && !loading && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out mt-2">
            <RecipeCard recipe={recipe} />
            
            <button 
              onClick={() => setRecipe(null)}
              className="mt-8 w-full text-center text-sm font-bold text-text-muted hover:text-emerald-600 transition-colors uppercase tracking-[1px]"
            >
              Clear & Triage Again
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
