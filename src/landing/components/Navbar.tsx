import { Leaf, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-5 md:px-12 py-4 bg-white/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-text-heading tracking-tight">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-brand-primary text-white">
            <Leaf size={18} />
          </span>
          EcoSnap
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="/#features" className="text-sm font-medium text-text-body hover:text-brand-primary transition-colors">Features</a>
          <a href="/#how-it-works" className="text-sm font-medium text-text-body hover:text-brand-primary transition-colors">How It Works</a>
          <a href="/#pricing" className="text-sm font-medium text-text-body hover:text-brand-primary transition-colors">Pricing</a>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full bg-brand-primary text-white text-sm font-semibold hover:bg-emerald-600 hover:-translate-y-0.5 shadow-md shadow-brand-primary/20 transition-all duration-300"
              >
                Go to Dashboard
              </Link>
              <button
                onClick={logout}
                className="p-2.5 rounded-full border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all duration-300"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-brand-primary text-white text-sm font-semibold hover:bg-emerald-600 hover:-translate-y-0.5 shadow-md shadow-brand-primary/20 transition-all duration-300"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
