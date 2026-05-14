import {
  collection,
  query,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase/config";
import type { PantryItem } from "../types/pantry";

const COLLECTION_NAME = "pantry";

export const PantryService = {
  /**
   * Listens to real-time updates for a user's pantry.
   */
  subscribeToPantry: (userId: string, callback: (items: PantryItem[]) => void) => {
    const q = query(
      collection(db, "users", userId, COLLECTION_NAME),
      orderBy("name", "asc")
    );

    return onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as PantryItem[];
      callback(items);
    }, (error) => {
      console.error("Error subscribing to pantry:", error);
    });
  },

  /**
   * Adds a new item to the pantry.
   */
  addItem: async (userId: string, item: Omit<PantryItem, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, "users", userId, COLLECTION_NAME), {
        ...item,
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding pantry item:", error);
      throw error;
    }
  },

  /**
   * Removes an item from the pantry.
   */
  removeItem: async (userId: string, itemId: string) => {
    try {
      await deleteDoc(doc(db, "users", userId, COLLECTION_NAME, itemId));
    } catch (error) {
      console.error("Error removing pantry item:", error);
      throw error;
    }
  },

  /**
   * Updates an existing pantry item.
   */
  updateItem: async (userId: string, itemId: string, updates: Partial<PantryItem>) => {
    try {
      await updateDoc(doc(db, "users", userId, COLLECTION_NAME, itemId), updates);
    } catch (error) {
      console.error("Error updating pantry item:", error);
      throw error;
    }
  },
};
