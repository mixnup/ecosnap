import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { RecipeHistoryService, type RecipeHistoryEntry } from '../../services/RecipeHistoryService';
import { History, Loader2, ChefHat, DollarSign, Search } from 'lucide-react';

export default function RecipeHistoryPage() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<(RecipeHistoryEntry & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [lifetimeSavings, setLifetimeSavings] = useState(0);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);
      const [history, savings] = await Promise.all([
        RecipeHistoryService.getRecentRecipes(user.uid, 50),
        RecipeHistoryService.getLifetimeSavings(user.uid),
      ]);
      setRecipes(history);
      setLifetimeSavings(savings);
      setLoading(false);
    };

    fetchData();
  }, [user]);

  const filteredRecipes = recipes.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-8 md:p-12 lg:p-16 max-w-[1200px] mx-auto space-y-10">
      {/* Header */}
      <header>
        <p className="text-[11px] font-bold uppercase tracking-[3px] text-emerald-600 mb-3">
          Archive
        </p>
        <h1 className="text-4xl md:text-[56px] font-extrabold tracking-tight text-text-heading leading-[1.1]">
          Recipe History.
        </h1>
        <p className="text-text-body mt-5 text-xl max-w-2xl leading-relaxed">
          Every recipe you've triaged, all in one place.
        </p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="relative p-5 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center mb-3">
            <History size={18} className="text-violet-600" strokeWidth={2.5} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-text-muted mb-0.5">Recipes Generated</p>
          <p className="text-3xl font-extrabold tracking-tight text-text-heading">{recipes.length}</p>
        </div>

        <div className="relative p-5 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-3">
            <DollarSign size={18} className="text-emerald-600" strokeWidth={2.5} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-text-muted mb-0.5">Lifetime Savings</p>
          <p className="text-3xl font-extrabold tracking-tight text-emerald-600">${lifetimeSavings.toFixed(2)}</p>
        </div>

        <div className="relative p-5 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center mb-3">
            <ChefHat size={18} className="text-teal-600" strokeWidth={2.5} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-text-muted mb-0.5">Items Saved</p>
          <p className="text-3xl font-extrabold tracking-tight text-text-heading">
            {recipes.reduce((acc, r) => acc + (r.expiring_items_used?.length || 0), 0)}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative group max-w-md animate-in fade-in slide-in-from-bottom-6 duration-600">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={16} />
        <input
          type="text"
          placeholder="Search recipes..."
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-emerald-200 transition-all outline-none font-medium text-sm text-text-heading"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Recipe List */}
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-emerald-600/50">
            <Loader2 size={32} className="animate-spin mb-4" />
            <p className="text-sm font-medium">Loading history...</p>
          </div>
        ) : filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <div
              key={recipe.id}
              className="rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300 overflow-hidden"
            >
              {/* Collapsed Header */}
              <button
                onClick={() => setExpandedId(expandedId === recipe.id ? null : recipe.id)}
                className="w-full p-5 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 shrink-0 rounded-[12px] bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center shadow-sm">
                    <ChefHat size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-heading text-lg leading-tight">{recipe.title}</h3>
                    <p className="text-xs text-text-muted mt-0.5">{formatDate(recipe.generated_at)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {recipe.estimated_cost_saved && (
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
                      <DollarSign size={12} className="text-emerald-600" />
                      <span className="text-xs font-extrabold text-emerald-700">{recipe.estimated_cost_saved.toFixed(2)}</span>
                    </div>
                  )}
                  <div className={`w-6 h-6 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 transition-transform ${expandedId === recipe.id ? 'rotate-180' : ''}`}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </button>

              {/* Expanded Content */}
              {expandedId === recipe.id && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-4 animate-in fade-in duration-300">
                  {/* Items Used */}
                  {recipe.expiring_items_used?.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[2px] text-text-muted mb-2">Expiring Items Used</p>
                      <div className="flex flex-wrap gap-2">
                        {recipe.expiring_items_used.map((item, i) => (
                          <span key={i} className="px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs font-medium text-text-heading">
                            {item.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ingredients Preview */}
                  {recipe.ingredients?.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[2px] text-text-muted mb-2">Ingredients</p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
                        {recipe.ingredients.map((ing, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-text-body font-medium">
                            <span className="w-4 h-4 shrink-0 rounded flex items-center justify-center bg-gray-50 border border-gray-200 text-[9px] font-bold text-gray-400 mt-0.5">{i + 1}</span>
                            <span className="leading-snug">{ing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-gray-50/30 border-2 border-dashed border-gray-200 rounded-[32px] p-20 text-center animate-in fade-in duration-500">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
              <History size={32} />
            </div>
            <p className="text-gray-500 font-bold text-lg">
              {search ? `No recipes matching "${search}"` : 'No recipe history yet'}
            </p>
            <p className="text-gray-400 text-sm mt-2 max-w-xs mx-auto">
              {search ? 'Try a different keyword.' : 'Triage some ingredients to get started!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
