import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { InventoryService } from '../services/InventoryService';
import type { InventoryItem } from '../types/inventory';

interface InventoryContextType {
  items: InventoryItem[];
  loading: boolean;
  addItem: (item: Omit<InventoryItem, 'id' | 'userId' | 'createdAt'>) => Promise<string>;
  removeItem: (itemId: string) => Promise<void>;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = InventoryService.subscribeToInventory(user.uid, (fetchedItems) => {
      setItems(fetchedItems);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const addItem = async (item: Omit<InventoryItem, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) throw new Error("Must be logged in to add items");
    return await InventoryService.addItem(user.uid, item);
  };

  const removeItem = async (itemId: string) => {
    if (!user) return;
    await InventoryService.removeItem(user.uid, itemId);
  };

  return (
    <InventoryContext.Provider value={{ items, loading, addItem, removeItem }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
