import type { Recipe } from '../../types/recipe';
import { ChefHat, Clock, Leaf, DollarSign } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="bg-gray-50/50 rounded-2xl border border-gray-100 overflow-hidden">
      
      {/* Header Area */}
      <div className="p-6 bg-white border-b border-gray-100 relative overflow-hidden">
        {/* Subtle decorative background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-60" />
        
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-14 h-14 shrink-0 rounded-[14px] bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
            <ChefHat size={28} strokeWidth={1.5} />
          </div>
          <div className="flex-1 pt-1">
            <h3 className="text-[22px] font-extrabold tracking-tight text-text-heading leading-tight">{recipe.title}</h3>
            {recipe.fallback && (
              <span className="inline-flex items-center px-2.5 py-1 mt-2 rounded-md bg-warning-light text-warning text-[10px] font-bold uppercase tracking-wider">
                Fallback Recipe
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Meta Stats Bar */}
      <div className="flex bg-white/50 border-b border-gray-100 divide-x divide-gray-100">
        <div className="flex-1 p-4 flex flex-col items-center justify-center">
          <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400 mb-1">Time</p>
          <div className="flex items-center gap-1.5 font-bold text-text-heading">
            <Clock size={14} className="text-emerald-500" />
            {recipe.cook_time_minutes}m
          </div>
        </div>
        <div className="flex-1 p-4 flex flex-col items-center justify-center">
          <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400 mb-1">Level</p>
          <div className="flex items-center gap-1.5 font-bold text-text-heading capitalize">
            <Leaf size={14} className="text-emerald-500" />
            {recipe.difficulty}
          </div>
        </div>
        {recipe.estimated_cost_saved !== undefined && (
          <div className="flex-1 p-4 flex flex-col items-center justify-center bg-emerald-50/30">
            <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-emerald-600 mb-1">Saved</p>
            <div className="flex items-center gap-0.5 font-extrabold text-emerald-700">
              <DollarSign size={14} strokeWidth={2.5} />
              {recipe.estimated_cost_saved.toFixed(2)}
            </div>
          </div>
        )}
      </div>

      <div className="p-6 md:p-8 space-y-8 bg-white">
        {/* Ingredients */}
        <div>
          <h4 className="flex items-center gap-2 font-bold text-text-heading mb-4 text-xs uppercase tracking-[2px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Ingredients
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-text-body font-medium">
                <span className="w-5 h-5 shrink-0 rounded flex items-center justify-center bg-gray-50 border border-gray-200 text-[10px] font-bold text-gray-400 mt-0.5">
                  {i + 1}
                </span>
                <span className="pt-0.5 leading-snug">{ing}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div>
          <h4 className="flex items-center gap-2 font-bold text-text-heading mb-5 text-xs uppercase tracking-[2px]">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            Instructions
          </h4>
          <ol className="space-y-5">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="relative flex items-start gap-4 text-sm text-text-body group">
                {/* Visual connecting line for steps */}
                {i !== recipe.instructions.length - 1 && (
                  <div className="absolute left-[13px] top-8 bottom-[-16px] w-[2px] bg-gray-100 group-hover:bg-emerald-100 transition-colors" />
                )}
                <span className="relative z-10 flex items-center justify-center w-7 h-7 shrink-0 rounded-full bg-white border-2 border-emerald-100 text-emerald-600 text-xs font-extrabold mt-0.5 group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  {i + 1}
                </span>
                <span className="pt-1.5 leading-relaxed font-medium">{step}</span>
              </li>
            ))}
          </ol>
        </div>
        
        {/* Actions */}
        <div className="pt-4 border-t border-gray-100">
          <button className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gray-900 text-white text-base font-bold shadow-lg hover:bg-black hover:-translate-y-0.5 transition-all duration-300">
            Complete & Log Savings
          </button>
        </div>
      </div>
    </div>
  );
}
