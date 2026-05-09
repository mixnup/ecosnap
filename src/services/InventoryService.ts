import { 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc,
  orderBy
} from "firebase/firestore";
import { db } from "./firebase/config";
import type { InventoryItem } from "../types/inventory";

const COLLECTION_NAME = "inventory";

export const InventoryService = {
  /**
   * Listens to real-time updates for a user's inventory.
   */
  subscribeToInventory: (userId: string, callback: (items: InventoryItem[]) => void) => {
    // Nested collection: users/{userId}/inventory
    const q = query(
      collection(db, "users", userId, COLLECTION_NAME),
      orderBy("expiryHours", "asc")
    );

    return onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as InventoryItem[];
      callback(items);
    }, (error) => {
      console.error("Error subscribing to inventory:", error);
    });
  },

  /**
   * Adds a new item to the inventory.
   */
  addItem: async (userId: string, item: Omit<InventoryItem, 'id' | 'userId' | 'createdAt'>) => {
    try {
      const docRef = await addDoc(collection(db, "users", userId, COLLECTION_NAME), {
        ...item,
        userId, // Kept for metadata/convenience
        createdAt: Date.now()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding inventory item:", error);
      throw error;
    }
  },

  /**
   * Removes an item from the inventory.
   */
  removeItem: async (userId: string, itemId: string) => {
    try {
      await deleteDoc(doc(db, "users", userId, COLLECTION_NAME, itemId));
    } catch (error) {
      console.error("Error removing inventory item:", error);
      throw error;
    }
  },

  /**
   * Updates an existing item.
   */
  updateItem: async (userId: string, itemId: string, updates: Partial<InventoryItem>) => {
    try {
      await updateDoc(doc(db, "users", userId, COLLECTION_NAME, itemId), updates);
    } catch (error) {
      console.error("Error updating inventory item:", error);
      throw error;
    }
  }
};
