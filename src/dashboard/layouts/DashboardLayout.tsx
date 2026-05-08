import { Outlet, NavLink } from 'react-router-dom';
import { Home, List, Receipt, Plus } from 'lucide-react';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-brand-surface flex">
      {/* Sidebar - Elevated with subtle depth and clean borders */}
      <aside className="w-64 bg-white/80 backdrop-blur-xl border-r border-gray-100 flex flex-col sticky top-0 h-screen shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
        <div className="p-8 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/20">
              <span className="text-white font-bold text-xl leading-none">E</span>
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-text-heading">EcoSnap</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 mt-2">
          {[
            { to: "/dashboard", icon: Home, label: "Triage", end: true },
            { to: "/dashboard/inventory", icon: List, label: "Inventory" },
            { to: "/dashboard/receipts", icon: Receipt, label: "Scan Receipt" }
          ].map(({ to, icon: Icon, label, end }) => (
            <NavLink 
              key={to}
              to={to} 
              end={end}
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

        {/* User / Sachet Balance - Premium Card Look */}
        <div className="p-6">
           <div className="relative p-5 rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white shadow-xl shadow-emerald-500/25 overflow-hidden group">
             {/* Decorative background element */}
             <div className="absolute -top-12 -right-12 w-24 h-24 bg-white opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
             
             <div className="relative z-10">
               <p className="text-[10px] font-bold uppercase tracking-[2px] text-emerald-100 mb-1">Sachets</p>
               <div className="flex items-end justify-between">
                 <span className="text-3xl font-extrabold tracking-tight">3</span>
                 <button className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm">
                   <Plus size={16} strokeWidth={3} className="text-white" />
                 </button>
               </div>
             </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50/50">
        <Outlet />
      </main>
    </div>
  );
}
