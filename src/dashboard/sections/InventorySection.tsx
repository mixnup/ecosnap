import { useState } from 'react';
import InventoryCard, { type InventoryItem } from '../components/InventoryCard';
import { Leaf } from 'lucide-react';

// Mock data for MVP testing
const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: '1',
    name: 'Salmon Fillet',
    quantity: 0.5,
    unit: 'lbs',
    category: 'seafood',
    expiryHours: 8,
  },
  {
    id: '2',
    name: 'Baby Spinach',
    quantity: 1,
    unit: 'bag',
    category: 'vegetables',
    expiryHours: 12,
  },
  {
    id: '3',
    name: 'Chicken Breast',
    quantity: 2,
    unit: 'lbs',
    category: 'poultry',
    expiryHours: 24,
  },
  {
    id: '4',
    name: 'Greek Yogurt',
    quantity: 1,
    unit: 'tub',
    category: 'dairy',
    expiryHours: 48,
  }
];

export default function InventorySection() {
  const [items] = useState<InventoryItem[]>(MOCK_INVENTORY);
  
  // Sort by urgency (ascending)
  const sortedItems = [...items].sort((a, b) => a.expiryHours - b.expiryHours);

  return (
    <section>
      <div className="flex items-end justify-between mb-6 pb-4 border-b border-gray-200/60">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-text-heading flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm border border-emerald-100">
              <Leaf size={18} strokeWidth={2.5} />
            </div>
            Active Inventory
          </h2>
          <p className="text-text-muted mt-1.5 text-sm font-medium">Prioritized by expiration risk.</p>
        </div>
        <span className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 text-xs font-bold tracking-widest uppercase shadow-sm">
          {items.length} items
        </span>
      </div>
      
      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {sortedItems.map((item) => (
          <InventoryCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
