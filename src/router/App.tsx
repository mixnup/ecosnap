import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '../context/AuthContext';
import { InventoryProvider } from '../context/InventoryContext';
import LandingPage from '../landing/pages/LandingPage';
import DashboardLayout from '../dashboard/layouts/DashboardLayout';
import DashboardPage from '../dashboard/pages/DashboardPage';
import NotFoundPage from '../landing/pages/NotFoundPage';
import LoginPage from '../auth/pages/LoginPage';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors />
      <InventoryProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Dashboard Domain - Protected */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardPage />} />
                {/* Future routes will go here, e.g. /dashboard/inventory */}
              </Route>
            </Route>
  
            {/* 404 Catch-All */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </InventoryProvider>
    </AuthProvider>
  );
}

export default App;
