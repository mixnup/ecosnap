import { Clock, AlertTriangle } from 'lucide-react';
import type { ExpiringItem } from '../../types/recipe';

export type InventoryItem = ExpiringItem & {
  id: string;
  expiryHours: number;
};

interface InventoryCardProps {
  item: InventoryItem;
}

export default function InventoryCard({ item }: InventoryCardProps) {
  const isCritical = item.expiryHours <= 24;
  const isWarning = item.expiryHours > 24 && item.expiryHours <= 48;

  let dotClass = 'bg-emerald-500';
  let textClass = 'text-emerald-700';
  let bgClass = 'bg-emerald-50';
  let borderClass = 'border-emerald-100';

  if (isCritical) {
    dotClass = 'bg-red-500';
    textClass = 'text-red-700';
    bgClass = 'bg-red-50';
    borderClass = 'border-red-100';
  } else if (isWarning) {
    dotClass = 'bg-amber-500';
    textClass = 'text-amber-700';
    bgClass = 'bg-amber-50';
    borderClass = 'border-amber-100';
  }

  return (
    <div className="relative p-5 rounded-[20px] bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300 flex flex-col justify-between group h-full">
      
      <div className="flex items-start justify-between mb-5">
        <div className={`w-11 h-11 rounded-[12px] flex items-center justify-center ${bgClass} border ${borderClass} group-hover:scale-105 transition-transform duration-300`}>
           {isCritical ? <AlertTriangle size={20} className={textClass} strokeWidth={2.5} /> : <Clock size={20} className={textClass} strokeWidth={2.5} />}
        </div>
        
        {/* Modern sleek badge */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${bgClass} border ${borderClass}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${dotClass} ${isCritical ? 'animate-pulse' : ''}`} />
          <span className={`text-[10px] font-extrabold uppercase tracking-[1px] ${textClass}`}>{item.expiryHours}h left</span>
        </div>
      </div>
      
      <div>
        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1.5">{item.name}</h3>
        <p className="text-[13px] text-gray-500 font-medium flex items-center gap-1.5">
          <span>{item.quantity} {item.unit}</span>
          {item.category && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="capitalize">{item.category}</span>
            </>
          )}
        </p>
      </div>
      
    </div>
  );
}
