import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { PantryService } from '../services/PantryService';
import type { PantryItem } from '../types/pantry';

interface PantryContextType {
  pantryItems: PantryItem[];
  loading: boolean;
  addItem: (item: Omit<PantryItem, 'id'>) => Promise<string>;
  removeItem: (itemId: string) => Promise<void>;
  updateItem: (itemId: string, updates: Partial<PantryItem>) => Promise<void>;
}

const PantryContext = createContext<PantryContextType | undefined>(undefined);

export const PantryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setPantryItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = PantryService.subscribeToPantry(user.uid, (fetchedItems) => {
      setPantryItems(fetchedItems);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const addItem = async (item: Omit<PantryItem, 'id'>) => {
    if (!user) throw new Error("Must be logged in to add pantry items");
    return await PantryService.addItem(user.uid, item);
  };

  const removeItem = async (itemId: string) => {
    if (!user) return;
    await PantryService.removeItem(user.uid, itemId);
  };

  const updateItem = async (itemId: string, updates: Partial<PantryItem>) => {
    if (!user) return;
    await PantryService.updateItem(user.uid, itemId, updates);
  };

  return (
    <PantryContext.Provider value={{ pantryItems, loading, addItem, removeItem, updateItem }}>
      {children}
    </PantryContext.Provider>
  );
};

export const usePantry = () => {
  const context = useContext(PantryContext);
  if (context === undefined) {
    throw new Error('usePantry must be used within a PantryProvider');
  }
  return context;
};
