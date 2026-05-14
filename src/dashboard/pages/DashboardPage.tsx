import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useInventory } from '../../context/InventoryContext';
import { RecipeHistoryService } from '../../services/RecipeHistoryService';
import InventorySection from '../sections/InventorySection';
import { DollarSign, AlertTriangle, ChefHat } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { items } = useInventory();
  const [lifetimeSavings, setLifetimeSavings] = useState(0);
  const [recipesCooked, setRecipesCooked] = useState(0);

  const hour = new Date().getHours();

  let greeting = "Good evening";

  if (hour >= 5 && hour < 12) {
    greeting = "Good morning";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  const expiringCount = items.filter(item => item.expiryHours <= 48).length;

  useEffect(() => {
    if (!user) return;
    const fetchStats = async () => {
      const [savings, history] = await Promise.all([
        RecipeHistoryService.getLifetimeSavings(user.uid),
        RecipeHistoryService.getRecentRecipes(user.uid, 1000),
      ]);
      setLifetimeSavings(savings);
      setRecipesCooked(history.length);
    };
    fetchStats();
  }, [user]);

  return (
    <div className="p-8 md:p-12 lg:p-16 max-w-[1000px] mx-auto space-y-12">
      <header className="mb-4">
        <p className="text-[11px] font-bold uppercase tracking-[3px] text-emerald-600 mb-3">
          Overview
        </p>

        <h1 className="text-4xl md:text-[56px] font-extrabold tracking-tight text-text-heading leading-[1.1]">
          {greeting}.
        </h1>

        <p className="text-text-body mt-5 text-xl max-w-2xl leading-relaxed">
          Your inventory triage is ready. We've identified{" "}
          <span className="text-emerald-600 font-bold underline decoration-emerald-100 underline-offset-8">
            high-urgency
          </span>{" "}
          items that need your attention.
        </p>
      </header>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="relative p-5 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300">
          <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-3">
            <AlertTriangle size={18} className="text-red-500" strokeWidth={2.5} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-text-muted mb-0.5">Expiring Soon</p>
          <p className="text-3xl font-extrabold tracking-tight text-red-600">{expiringCount}</p>
        </div>

        <div className="relative p-5 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-3">
            <DollarSign size={18} className="text-emerald-600" strokeWidth={2.5} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-text-muted mb-0.5">Lifetime Savings</p>
          <p className="text-3xl font-extrabold tracking-tight text-emerald-600">${lifetimeSavings.toFixed(2)}</p>
        </div>

        <div className="relative p-5 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300">
          <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center mb-3">
            <ChefHat size={18} className="text-violet-600" strokeWidth={2.5} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-text-muted mb-0.5">Recipes Cooked</p>
          <p className="text-3xl font-extrabold tracking-tight text-text-heading">{recipesCooked}</p>
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
        <InventorySection />
      </div>
    </div>
  );
}