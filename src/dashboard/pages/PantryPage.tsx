import { useState, useMemo, useEffect } from 'react';
import { usePantry } from '../../context/PantryContext';
import { toast } from 'sonner';
import {
  ShoppingBasket,
  Loader2,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Trash2,
  X,
} from 'lucide-react';

const ITEMS_PER_PAGE = 12;

const PANTRY_CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'oil', label: 'Oils' },
  { key: 'spice', label: 'Spices' },
  { key: 'sauce', label: 'Sauces' },
  { key: 'grain', label: 'Grains' },
  { key: 'canned', label: 'Canned' },
  { key: 'condiment', label: 'Condiments' },
  { key: 'other', label: 'Other' },
];

export default function PantryPage() {
  const { pantryItems, loading, addItem, removeItem } = usePantry();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [page, setPage] = useState(1);

  // Add form state
  const [formData, setFormData] = useState({ name: '', category: 'other', quantity: '', unit: '' });
  const [adding, setAdding] = useState(false);

  const filteredItems = useMemo(() => {
    return pantryItems.filter(item => {
      if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
      return true;
    });
  }, [pantryItems, search, categoryFilter]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, page]);

  useEffect(() => { setPage(1); }, [search, categoryFilter]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    setAdding(true);
    try {
      await addItem({
        name: formData.name,
        category: formData.category || 'other',
        quantity: Number(formData.quantity) || 1,
        unit: formData.unit || 'item',
      });
      toast.success(`${formData.name} added to pantry`);
      setFormData({ name: '', category: 'other', quantity: '', unit: '' });
      setIsAddModalOpen(false);
    } catch {
      toast.error('Failed to add item.');
    } finally {
      setAdding(false);
    }
  };

  const handleRemove = async (id: string, name: string) => {
    try {
      await removeItem(id);
      toast.success(`${name} removed`);
    } catch {
      toast.error('Failed to remove item.');
    }
  };

  return (
    <div className="p-8 md:p-12 lg:p-16 max-w-[1200px] mx-auto space-y-10">
      {/* Header */}
      <header>
        <p className="text-[11px] font-bold uppercase tracking-[3px] text-emerald-600 mb-3">
          Staples
        </p>
        <h1 className="text-4xl md:text-[56px] font-extrabold tracking-tight text-text-heading leading-[1.1]">
          Pantry.
        </h1>
        <p className="text-text-body mt-5 text-xl max-w-2xl leading-relaxed">
          Your persistent kitchen staples. These are automatically included when generating recipes.
        </p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="relative p-5 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-3">
            <ShoppingBasket size={18} className="text-orange-600" strokeWidth={2.5} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-text-muted mb-0.5">Total Staples</p>
          <p className="text-3xl font-extrabold tracking-tight text-text-heading">{pantryItems.length}</p>
        </div>
        <div className="relative p-5 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-3">
            <ShoppingBasket size={18} className="text-emerald-600" strokeWidth={2.5} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-text-muted mb-0.5">Categories</p>
          <p className="text-3xl font-extrabold tracking-tight text-text-heading">
            {new Set(pantryItems.map(i => i.category)).size}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-600">
        <div className="relative group flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={16} />
          <input
            type="text"
            placeholder="Search staples..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-emerald-200 transition-all outline-none font-medium text-sm text-text-heading"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {PANTRY_CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setCategoryFilter(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-all duration-300 border ${
                categoryFilter === cat.key
                  ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20'
                  : 'bg-white text-text-muted border-gray-200 hover:border-orange-200 hover:text-orange-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
        >
          <Plus size={18} strokeWidth={2.5} />
          Add Staple
        </button>
      </div>

      {/* Grid */}
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-emerald-600/50">
            <Loader2 size={32} className="animate-spin mb-4" />
            <p className="text-sm font-medium">Loading pantry...</p>
          </div>
        ) : paginatedItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {paginatedItems.map(item => (
                <div
                  key={item.id}
                  className="relative p-5 rounded-[20px] bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-[12px] flex items-center justify-center bg-orange-50 border border-orange-100 group-hover:scale-105 transition-transform duration-300">
                      <ShoppingBasket size={20} className="text-orange-600" strokeWidth={2.5} />
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRemove(item.id, item.name)}
                        className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100">
                        <span className="text-[10px] font-extrabold uppercase tracking-[1px] text-orange-700 capitalize">{item.category}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1.5">{item.name}</h3>
                    <p className="text-[13px] text-gray-500 font-medium">
                      {item.quantity} {item.unit}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
                <p className="text-sm font-medium text-text-muted">
                  Showing {ITEMS_PER_PAGE * (page - 1) + 1} to {Math.min(ITEMS_PER_PAGE * page, filteredItems.length)} of {filteredItems.length}
                </p>
                <div className="flex items-center gap-2">
                  <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-emerald-600 hover:border-emerald-200 disabled:opacity-30 transition-all">
                    <ChevronLeft size={20} />
                  </button>
                  <div className="flex items-center px-4 font-bold text-sm text-text-heading">Page {page} of {totalPages}</div>
                  <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-emerald-600 hover:border-emerald-200 disabled:opacity-30 transition-all">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-gray-50/30 border-2 border-dashed border-gray-200 rounded-[32px] p-20 text-center animate-in fade-in duration-500">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
              <ShoppingBasket size={32} />
            </div>
            <p className="text-gray-500 font-bold text-lg">
              {search || categoryFilter !== 'all' ? 'No staples match your filters' : 'Your pantry is empty'}
            </p>
            <p className="text-gray-400 text-sm mt-2 max-w-xs mx-auto">
              {search || categoryFilter !== 'all' ? 'Try adjusting your filters.' : 'Add kitchen staples like oils, spices, and sauces.'}
            </p>
            {!search && categoryFilter === 'all' && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="mt-8 px-8 py-3 rounded-full bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all"
              >
                Add Your First Staple
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add Pantry Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white rounded-[28px] shadow-2xl shadow-emerald-900/10 border border-gray-100 overflow-hidden animate-in zoom-in-95 fade-in duration-300">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-text-heading">Add to Pantry</h2>
                  <p className="text-sm text-text-muted mt-1">Add a kitchen staple</p>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 rounded-full hover:bg-gray-50 text-gray-400 hover:text-text-heading transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAdd} className="space-y-5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[1.5px] text-emerald-600 mb-2 ml-1">Item Name</label>
                  <input required type="text" placeholder="e.g. Olive Oil" className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-emerald-200 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-text-heading font-medium" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[1.5px] text-emerald-600 mb-2 ml-1">Quantity</label>
                    <input type="number" step="0.1" placeholder="1" className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-emerald-200 transition-all outline-none text-text-heading font-medium" value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[1.5px] text-emerald-600 mb-2 ml-1">Unit</label>
                    <input type="text" placeholder="ml / pcs" className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-emerald-200 transition-all outline-none text-text-heading font-medium" value={formData.unit} onChange={e => setFormData({ ...formData, unit: e.target.value })} />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[1.5px] text-emerald-600 mb-2 ml-1">Category</label>
                  <select className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-emerald-200 transition-all outline-none text-text-heading font-medium appearance-none cursor-pointer" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                    <option value="oil">Oil</option>
                    <option value="spice">Spice</option>
                    <option value="sauce">Sauce</option>
                    <option value="grain">Grain</option>
                    <option value="canned">Canned</option>
                    <option value="condiment">Condiment</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button disabled={adding} type="submit" className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0">
                    {adding ? <Loader2 size={20} className="animate-spin" /> : <><Plus size={20} strokeWidth={2.5} />Add to Pantry</>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
