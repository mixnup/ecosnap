import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50/30 px-5">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/20">
              <Leaf className="text-white" size={24} />
            </div>
            <span className="text-2xl font-black text-text-heading tracking-tighter">
              EcoSnap
            </span>
          </Link>
          <h1 className="text-3xl font-extrabold text-text-heading tracking-tight mb-2">
            {title}
          </h1>
          <p className="text-text-muted">
            {subtitle}
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-100/50">
          {children}
        </div>

        <p className="text-center mt-8 text-sm text-text-muted">
          By continuing, you agree to our{' '}
          <a href="#" className="text-brand-primary font-medium hover:underline">Terms</a>
          {' '}and{' '}
          <a href="#" className="text-brand-primary font-medium hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
