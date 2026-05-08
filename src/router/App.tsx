import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../landing/pages/LandingPage';
import DashboardLayout from '../dashboard/layouts/DashboardLayout';
import DashboardPage from '../dashboard/pages/DashboardPage';
import NotFoundPage from '../landing/pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Dashboard Domain */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          {/* Future routes will go here, e.g. /dashboard/inventory */}
        </Route>

        {/* 404 Catch-All */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
