import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import LandingPage from '../landing/pages/LandingPage';
import DashboardLayout from '../dashboard/layouts/DashboardLayout';
import DashboardPage from '../dashboard/pages/DashboardPage';
import NotFoundPage from '../landing/pages/NotFoundPage';
import LoginPage from '../auth/pages/LoginPage';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
