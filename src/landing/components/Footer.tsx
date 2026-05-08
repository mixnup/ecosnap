import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="px-5 md:px-12 py-12 bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-base font-bold text-gray-900">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500 text-white">
            <Leaf size={14} />
          </span>
          EcoSnap
        </div>

        <div className="flex flex-wrap justify-center gap-7">
          <a href="#features" className="text-sm text-gray-400 hover:text-emerald-600 transition-colors">Features</a>
          <a href="#pricing" className="text-sm text-gray-400 hover:text-emerald-600 transition-colors">Pricing</a>
          <a href="#" className="text-sm text-gray-400 hover:text-emerald-600 transition-colors">Privacy</a>
          <a href="#" className="text-sm text-gray-400 hover:text-emerald-600 transition-colors">Terms</a>
        </div>

        <p className="text-sm text-gray-400">&copy; 2026 EcoSnap. All rights reserved.</p>
      </div>
    </footer>
  );
}
