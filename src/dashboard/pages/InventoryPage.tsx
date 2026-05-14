import { useState, useMemo, useEffect } from 'react';
import { useInventory } from '../../context/InventoryContext';
import InventoryCard from '../components/InventoryCard';
import AddItemModal from '../components/AddItemModal';
import {
  Package,
  Loader2,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Clock,
  Leaf,
  LayoutGrid,
  List as ListIcon,
} from 'lucide-react';

const ITEMS_PER_PAGE = 12;

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'produce', label: 'Produce' },
  { key: 'poultry', label: 'Poultry' },
  { key: 'meat', label: 'Meat' },
  { key: 'seafood', label: 'Seafood' },
  { key: 'dairy', label: 'Dairy' },
  { key: 'pantry', label: 'Pantry' },
  { key: 'bakery', label: 'Bakery' },
  { key: 'general', label: 'General' },
];

const STATUS_FILTERS = [
  { key: 'all', label: 'All Status' },
  { key: 'critical', label: 'Critical (<24h)' },
  { key: 'warning', label: 'Warning (<48h)' },
  { key: 'stable', label: 'Stable' },
];

export default function InventoryPage() {
  const { items, loading } = useInventory();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filters
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);

  // Stats
  const stats = useMemo(() => {
    const total = items.length;
    const critical = items.filter((i) => i.expiryHours <= 24).length;
    const warning = items.filter(
      (i) => i.expiryHours > 24 && i.expiryHours <= 48
    ).length;
    const stable = items.filter((i) => i.expiryHours > 48).length;
    const categories = new Set(items.map((i) => i.category || 'general')).size;
    return { total, critical, warning, stable, categories };
  }, [items]);

  // Sorted, filtered items
  const filteredItems = useMemo(() => {
    return [...items]
      .sort((a, b) => a.expiryHours - b.expiryHours)
      .filter((item) => {
        // Text search
        if (
          search &&
          !item.name.toLowerCase().includes(search.toLowerCase())
        ) {
          return false;
        }
        // Category filter
        if (
          categoryFilter !== 'all' &&
          (item.category || 'general') !== categoryFilter
        ) {
          return false;
        }
        // Status filter
        if (statusFilter === 'critical' && item.expiryHours > 24) return false;
        if (
          statusFilter === 'warning' &&
          (item.expiryHours <= 24 || item.expiryHours > 48)
        )
          return false;
        if (statusFilter === 'stable' && item.expiryHours <= 48) return false;
        return true;
      });
  }, [items, search, categoryFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, page]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, categoryFilter, statusFilter]);

  return (
    <div className="p-8 md:p-12 lg:p-16 max-w-[1200px] mx-auto space-y-10">
      {/* Page Header */}
      <header>
        <p className="text-[11px] font-bold uppercase tracking-[3px] text-emerald-600 mb-3">
          Manage
        </p>
        <h1 className="text-4xl md:text-[56px] font-extrabold tracking-tight text-text-heading leading-[1.1]">
          Inventory.
        </h1>
        <p className="text-text-body mt-5 text-xl max-w-2xl leading-relaxed">
          Full view of everything in your kitchen. Filter, search, and manage
          your items.
        </p>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Total Items */}
        <div className="relative p-5 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50 rounded-full -translate-x-4 -translate-y-4 opacity-60 group-hover:scale-125 transition-transform duration-500" />
          <div className="relative z-10">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-3">
              <Package size={18} className="text-emerald-600" strokeWidth={2.5} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-text-muted mb-0.5">
              Total Items
            </p>
            <p className="text-3xl font-extrabold tracking-tight text-text-heading">
              {stats.total}
            </p>
          </div>
        </div>

        {/* Critical */}
        <div className="relative p-5 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-red-50 rounded-full -translate-x-4 -translate-y-4 opacity-60 group-hover:scale-125 transition-transform duration-500" />
          <div className="relative z-10">
            <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-3">
              <AlertTriangle size={18} className="text-red-500" strokeWidth={2.5} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-text-muted mb-0.5">
              Critical
            </p>
            <p className="text-3xl font-extrabold tracking-tight text-red-600">
              {stats.critical}
            </p>
          </div>
        </div>

        {/* Warning */}
        <div className="relative p-5 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-50 rounded-full -translate-x-4 -translate-y-4 opacity-60 group-hover:scale-125 transition-transform duration-500" />
          <div className="relative z-10">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-3">
              <Clock size={18} className="text-amber-500" strokeWidth={2.5} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-text-muted mb-0.5">
              Warning
            </p>
            <p className="text-3xl font-extrabold tracking-tight text-amber-600">
              {stats.warning}
            </p>
          </div>
        </div>

        {/* Stable */}
        <div className="relative p-5 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50 rounded-full -translate-x-4 -translate-y-4 opacity-60 group-hover:scale-125 transition-transform duration-500" />
          <div className="relative z-10">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-3">
              <Leaf size={18} className="text-emerald-500" strokeWidth={2.5} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-text-muted mb-0.5">
              Stable
            </p>
            <p className="text-3xl font-extrabold tracking-tight text-emerald-600">
              {stats.stable}
            </p>
          </div>
        </div>
      </div>

      {/* Toolbar: Search + Filters + Add */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-600">
        {/* Search */}
        <div className="relative group flex-1 max-w-md">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors"
            size={16}
          />
          <input
            type="text"
            placeholder="Search items..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-emerald-200 transition-all outline-none font-medium text-sm text-text-heading"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setCategoryFilter(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-all duration-300 border ${
                categoryFilter === cat.key
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20'
                  : 'bg-white text-text-muted border-gray-200 hover:border-emerald-200 hover:text-emerald-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm font-medium text-text-heading appearance-none cursor-pointer focus:border-emerald-200 outline-none transition-all"
        >
          {STATUS_FILTERS.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>

        {/* Add Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
        >
          <Plus size={18} strokeWidth={2.5} />
          Add Item
        </button>
      </div>

      {/* Active Filter Summary */}
      {(categoryFilter !== 'all' || statusFilter !== 'all' || search) && (
        <div className="flex items-center gap-3 text-sm animate-in fade-in duration-300">
          <span className="text-text-muted font-medium">
            {filteredItems.length} result{filteredItems.length !== 1 && 's'}
          </span>
          <button
            onClick={() => {
              setCategoryFilter('all');
              setStatusFilter('all');
              setSearch('');
            }}
            className="text-emerald-600 font-bold hover:underline underline-offset-4 transition-all"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Inventory Grid */}
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-emerald-600/50">
            <Loader2 size={32} className="animate-spin mb-4" />
            <p className="text-sm font-medium">Syncing inventory...</p>
          </div>
        ) : paginatedItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {paginatedItems.map((item) => (
                <InventoryCard key={item.id} item={item} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
                <p className="text-sm font-medium text-text-muted">
                  Showing {ITEMS_PER_PAGE * (page - 1) + 1} to{' '}
                  {Math.min(ITEMS_PER_PAGE * page, filteredItems.length)} of{' '}
                  {filteredItems.length}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-emerald-600 hover:border-emerald-200 disabled:opacity-30 disabled:hover:text-gray-400 transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <div className="flex items-center px-4 font-bold text-sm text-text-heading">
                    Page {page} of {totalPages}
                  </div>
                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
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
              {search || categoryFilter !== 'all' || statusFilter !== 'all'
                ? 'No items match your filters'
                : 'Your inventory is empty'}
            </p>
            <p className="text-gray-400 text-sm mt-2 max-w-xs mx-auto">
              {search || categoryFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your filters or clearing them.'
                : 'Add items to start tracking your food waste.'}
            </p>
            {!search && categoryFilter === 'all' && statusFilter === 'all' && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="mt-8 px-8 py-3 rounded-full bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all"
              >
                Add Your First Item
              </button>
            )}
          </div>
        )}
      </div>

      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
