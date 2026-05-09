import React, { useState } from 'react';
import { X, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useInventory } from '../../context/InventoryContext';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddItemModal({ isOpen, onClose }: AddItemModalProps) {
  const { addItem } = useInventory();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: '',
    expiryHours: '',
    category: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.expiryHours) return;

    setLoading(true);
    try {
      await addItem({
        name: formData.name,
        quantity: Number(formData.quantity) || 1,
        unit: formData.unit || 'item',
        expiryHours: Number(formData.expiryHours),
        category: formData.category || 'general'
      });
      toast.success(`${formData.name} added to inventory`);
      onClose();
      setFormData({ name: '', quantity: '', unit: '', expiryHours: '', category: '' });
    } catch (error) {
      toast.error("Failed to add item. Please try again.");
      console.error("Failed to add item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-[28px] shadow-2xl shadow-emerald-900/10 border border-gray-100 overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-text-heading">Add to Inventory</h2>
              <p className="text-sm text-text-muted mt-1">What are we saving from the bin today?</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-50 text-gray-400 hover:text-text-heading transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[1.5px] text-emerald-600 mb-2 ml-1">Item Name</label>
              <input
                required
                type="text"
                placeholder="e.g. Avocado"
                className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-emerald-200 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-text-heading font-medium"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[1.5px] text-emerald-600 mb-2 ml-1">Quantity</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="1"
                  className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-emerald-200 transition-all outline-none text-text-heading font-medium"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[1.5px] text-emerald-600 mb-2 ml-1">Unit</label>
                <input
                  type="text"
                  placeholder="pcs / lbs"
                  className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-emerald-200 transition-all outline-none text-text-heading font-medium"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[1.5px] text-emerald-600 mb-2 ml-1">Expires in (Hours)</label>
              <input
                required
                type="number"
                placeholder="48"
                className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-emerald-200 transition-all outline-none text-text-heading font-medium"
                value={formData.expiryHours}
                onChange={(e) => setFormData({ ...formData, expiryHours: e.target.value })}
              />
              <p className="text-[10px] text-text-muted mt-2 ml-1">We use hours for precision triage.</p>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[1.5px] text-emerald-600 mb-2 ml-1">Category</label>
              <select
                className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-emerald-200 transition-all outline-none text-text-heading font-medium appearance-none cursor-pointer"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="general">General</option>
                <option value="produce">Produce (Fruits & Veggies)</option>
                <option value="poultry">Poultry</option>
                <option value="meat">Meat</option>
                <option value="seafood">Seafood</option>
                <option value="dairy">Dairy</option>
                <option value="pantry">Pantry & Grains</option>
                <option value="bakery">Bakery</option>
              </select>
            </div>

            <div className="pt-4">
              <button
                disabled={loading}
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0"
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <>
                    <Plus size={20} strokeWidth={2.5} />
                    Add to Triage
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
