import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, List, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-brand-surface flex relative">
      {/* Mobile backdrop overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar - Elevated with subtle depth and clean borders */}
      <aside className={`fixed lg:sticky lg:top-0 inset-y-0 left-0 z-30 w-64 bg-white/80 backdrop-blur-xl border-r border-gray-100 flex flex-col h-screen shadow-[4px_0_24px_rgba(0,0,0,0.02)] transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-8 pb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/20">
              <span className="text-white font-bold text-xl leading-none">E</span>
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-text-heading">EcoSnap</span>
          </div>
          {/* Mobile close button */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 mt-2">
          {[
            { to: "/dashboard", icon: Home, label: "Triage", end: true },
            { to: "/dashboard/inventory", icon: List, label: "Inventory" }
          ].map(({ to, icon: Icon, label, end }) => (
            <NavLink 
              key={to}
              to={to} 
              end={end}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-semibold text-sm relative overflow-hidden group ${
                  isActive 
                    ? 'text-emerald-700 bg-emerald-50 shadow-sm' 
                    : 'text-text-muted hover:bg-gray-50 hover:text-text-heading'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active Indicator Bar */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-500 rounded-r-full" />
                  )}
                  
                  <div className={`relative z-10 flex items-center justify-center ${isActive ? 'text-emerald-600' : 'text-gray-400 group-hover:text-emerald-500 transition-colors'}`}>
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span className="relative z-10 tracking-wide">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-6 space-y-4">
           <div className="flex items-center justify-between px-2 py-3 border-t border-gray-100">
             <div className="flex items-center gap-3 min-w-0">
               {user?.photoURL ? (
                 <img src={user.photoURL} alt={user.displayName || 'User'} className="w-9 h-9 rounded-full border-2 border-emerald-50" />
               ) : (
                 <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-brand-primary font-bold">
                   {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                 </div>
               )}
               <div className="min-w-0">
                 <p className="text-xs font-bold text-text-heading truncate">{user?.displayName || 'Eco Warrior'}</p>
                 <p className="text-[10px] text-text-muted truncate">{user?.email}</p>
               </div>
             </div>
             <button 
              onClick={handleLogout}
              className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300 group"
              title="Logout"
             >
               <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
             </button>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50/50">
        {/* Mobile header with hamburger menu */}
        <div className="lg:hidden sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Menu size={24} />
          </button>
          <span className="font-extrabold text-xl tracking-tight text-text-heading">EcoSnap</span>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
