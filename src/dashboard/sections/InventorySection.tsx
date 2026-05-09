import { useState, useMemo, useEffect } from 'react';
import { useInventory } from '../../context/InventoryContext';
import InventoryCard from '../components/InventoryCard';
import AddItemModal from '../components/AddItemModal';
import TriageModal from '../components/TriageModal';
import { Leaf, Loader2, Plus, UtensilsCrossed, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

export default function InventorySection() {
  const { items, loading } = useInventory();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTriageModalOpen, setIsTriageModalOpen] = useState(false);
  
  // Search & Pagination State
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Sorting logic (Urgency first)
  const allSortedItems = useMemo(() => {
    return [...items].sort((a, b) => a.expiryHours - b.expiryHours);
  }, [items]);

  // Filtering logic
  const filteredItems = useMemo(() => {
    return allSortedItems.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [allSortedItems, search]);

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, page]);

  // Reset page when search changes
  useEffect(() => { setPage(1); }, [search]);

  const expiringCount = items.filter(item => item.expiryHours <= 48).length;

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-gray-200/60">
        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-tight text-text-heading flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm border border-emerald-100">
              <Leaf size={18} strokeWidth={2.5} />
            </div>
            Active Inventory
          </h2>
          <p className="text-text-muted mt-1.5 text-sm font-medium">Prioritized by expiration risk.</p>
          
          {/* Search Bar - Integrated */}
          <div className="relative mt-6 group max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={16} />
            <input 
              type="text"
              placeholder="Filter ingredients..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-emerald-200 transition-all outline-none font-medium text-sm text-text-heading"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3 self-end">
          <button 
            onClick={() => setIsTriageModalOpen(true)}
            disabled={expiringCount === 0 || loading}
            className="hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-40 disabled:translate-y-0 disabled:shadow-none"
          >
            <UtensilsCrossed size={16} strokeWidth={2.5} />
            Triage Dinner
          </button>

          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-500 flex items-center justify-center shadow-sm hover:border-emerald-200 hover:text-emerald-600 transition-all duration-300"
            title="Add Item"
          >
            <Plus size={24} strokeWidth={2.5} />
          </button>

          <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-emerald-50/50 border border-emerald-100/50 text-emerald-700 text-[10px] font-bold tracking-widest uppercase shadow-sm">
            {items.length} items
          </span>
        </div>
      </div>
      
      {/* Grid Layout */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-emerald-600/50">
          <Loader2 size={32} className="animate-spin mb-4" />
          <p className="text-sm font-medium">Syncing with pantry...</p>
        </div>
      ) : paginatedItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedItems.map((item) => (
              <InventoryCard key={item.id} item={item} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
              <p className="text-sm font-medium text-text-muted">
                Showing {ITEMS_PER_PAGE * (page - 1) + 1} to {Math.min(ITEMS_PER_PAGE * page, filteredItems.length)} of {filteredItems.length}
              </p>
              <div className="flex items-center gap-2">
                <button 
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-emerald-600 hover:border-emerald-200 disabled:opacity-30 disabled:hover:text-gray-400 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex items-center px-4 font-bold text-sm text-text-heading">
                  Page {page} of {totalPages}
                </div>
                <button 
                  disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-emerald-600 hover:border-emerald-200 disabled:opacity-30 disabled:hover:text-gray-400 transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-gray-50/30 border-2 border-dashed border-gray-200 rounded-[32px] p-20 text-center animate-in fade-in duration-500">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
            <Search size={32} />
          </div>
          <p className="text-gray-500 font-bold text-lg">
            {search ? `No items matching "${search}"` : "Your inventory is empty"}
          </p>
          <p className="text-gray-400 text-sm mt-2 max-w-xs mx-auto">
            {search ? "Try a different keyword or clear the filter." : "Add items to start tracking your food waste."}
          </p>
          {!search && (
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="mt-8 px-8 py-3 rounded-full bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all"
            >
              Add Your First Item
            </button>
          )}
        </div>
      )}

      <AddItemModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

      <TriageModal
        isOpen={isTriageModalOpen}
        onClose={() => setIsTriageModalOpen(false)}
      />
    </section>
  );
}
