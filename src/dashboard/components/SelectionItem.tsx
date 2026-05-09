import { Check } from 'lucide-react';
import type { InventoryItem } from '../../types/inventory';

interface SelectionItemProps {
  item: InventoryItem;
  isSelected: boolean;
  onToggle: () => void;
}

export default function SelectionItem({ item, isSelected, onToggle }: SelectionItemProps) {
  const isCritical = item.expiryHours <= 24;

  return (
    <div 
      onClick={onToggle}
      className={`group flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
        isSelected 
          ? 'bg-emerald-50 border-emerald-200 shadow-sm' 
          : 'bg-white border-gray-100 hover:border-emerald-100 hover:bg-emerald-50/30'
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Checkbox */}
        <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
          isSelected 
            ? 'bg-emerald-500 border-emerald-500 text-white scale-110' 
            : 'bg-gray-50 border-gray-200 text-transparent'
        }`}>
          <Check size={14} strokeWidth={4} />
        </div>

        <div>
          <h4 className={`font-bold text-sm transition-colors ${isSelected ? 'text-emerald-900' : 'text-text-heading'}`}>
            {item.name}
          </h4>
          <p className="text-[11px] text-text-muted font-medium">
            {item.quantity} {item.unit}
          </p>
        </div>
      </div>

      <div className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
        isCritical ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
      }`}>
        {item.expiryHours}h left
      </div>
    </div>
  );
}
