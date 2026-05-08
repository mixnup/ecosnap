import { Leaf } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-5 md:px-12 py-4 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 tracking-tight">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500 text-white">
            <Leaf size={18} />
          </span>
          EcoSnap
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors">How It Works</a>
          <a href="#pricing" className="text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors">Pricing</a>
        </div>

        <a
          href="#cta"
          className="inline-flex items-center px-5 py-2.5 rounded-full bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 hover:-translate-y-0.5 shadow-md shadow-emerald-500/20 transition-all duration-300"
        >
          Get Started
        </a>
      </div>
    </nav>
  );
}
