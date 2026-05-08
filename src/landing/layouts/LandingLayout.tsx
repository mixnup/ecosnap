import type { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-gray-600 font-['Inter',system-ui,-apple-system,sans-serif]">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
