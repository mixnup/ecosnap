import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '../context/AuthContext';
import { InventoryProvider } from '../context/InventoryContext';
import { PantryProvider } from '../context/PantryContext';
import { UserPreferencesProvider } from '../context/UserPreferencesContext';
import LandingPage from '../landing/pages/LandingPage';
import DashboardLayout from '../dashboard/layouts/DashboardLayout';
import DashboardPage from '../dashboard/pages/DashboardPage';
import InventoryPage from '../dashboard/pages/InventoryPage';
import PantryPage from '../dashboard/pages/PantryPage';
import SettingsPage from '../dashboard/pages/SettingsPage';
import RecipeHistoryPage from '../dashboard/pages/RecipeHistoryPage';
import NotFoundPage from '../landing/pages/NotFoundPage';
import LoginPage from '../auth/pages/LoginPage';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors />
      <InventoryProvider>
        <PantryProvider>
          <UserPreferencesProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                
                {/* Dashboard Domain - Protected */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="inventory" element={<InventoryPage />} />
                    <Route path="pantry" element={<PantryPage />} />
                    <Route path="history" element={<RecipeHistoryPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                  </Route>
                </Route>
      
                {/* 404 Catch-All */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </UserPreferencesProvider>
        </PantryProvider>
      </InventoryProvider>
    </AuthProvider>
  );
}

export default App;
