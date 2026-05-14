import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { UserPreferencesService } from '../services/UserPreferencesService';
import type { UserPreferences } from '../types/user';
import { DEFAULT_PREFERENCES } from '../types/user';

interface UserPreferencesContextType {
  preferences: UserPreferences;
  loading: boolean;
  updatePreferences: (prefs: Partial<UserPreferences>) => Promise<void>;
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export const UserPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setPreferences(DEFAULT_PREFERENCES);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = UserPreferencesService.subscribeToPreferences(user.uid, (prefs) => {
      setPreferences(prefs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const updatePreferences = async (prefs: Partial<UserPreferences>) => {
    if (!user) throw new Error("Must be logged in to update preferences");
    await UserPreferencesService.updatePreferences(user.uid, prefs);
  };

  return (
    <UserPreferencesContext.Provider value={{ preferences, loading, updatePreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
};
