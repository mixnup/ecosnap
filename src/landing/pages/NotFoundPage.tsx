import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-brand-surface flex flex-col items-center justify-center p-5 text-center">
      <div className="max-w-md w-full">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-8 shadow-inner">
          <FileQuestion size={40} strokeWidth={1.5} />
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text-heading mb-4">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold text-text-heading mb-4">
          Page not found
        </h2>
        <p className="text-base sm:text-lg text-text-body pb-10">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-500 text-white text-base font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 hover:-translate-y-0.5 transition-all duration-300"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
