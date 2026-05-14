import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase/config";
import type { UserPreferences } from "../types/user";
import { DEFAULT_PREFERENCES } from "../types/user";

export const UserPreferencesService = {
  /**
   * Fetches user preferences from Firestore.
   */
  getPreferences: async (userId: string): Promise<UserPreferences> => {
    try {
      const docRef = doc(db, "users", userId);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        const data = snapshot.data();
        return { ...DEFAULT_PREFERENCES, ...data.preferences } as UserPreferences;
      }

      return DEFAULT_PREFERENCES;
    } catch (error) {
      console.error("Error fetching user preferences:", error);
      return DEFAULT_PREFERENCES;
    }
  },

  /**
   * Updates user preferences (merge strategy).
   */
  updatePreferences: async (userId: string, preferences: Partial<UserPreferences>) => {
    try {
      const docRef = doc(db, "users", userId);
      await setDoc(docRef, { preferences }, { merge: true });
    } catch (error) {
      console.error("Error updating user preferences:", error);
      throw error;
    }
  },

  /**
   * Real-time listener for user preferences.
   */
  subscribeToPreferences: (userId: string, callback: (prefs: UserPreferences) => void) => {
    const docRef = doc(db, "users", userId);

    return onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        callback({ ...DEFAULT_PREFERENCES, ...data.preferences } as UserPreferences);
      } else {
        callback(DEFAULT_PREFERENCES);
      }
    }, (error) => {
      console.error("Error subscribing to user preferences:", error);
    });
  },
};
