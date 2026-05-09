import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import heroImage from '../../assets/pexels-justindoherty-4929671.jpg';

export default function HeroSection() {
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(true); }, []);

  const fade = (delay: string) =>
    `transition-all duration-700 ${delay} ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`;

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-5 md:px-12 overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <div className="text-left">
          <div className={`${fade('delay-0')} inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-sm font-medium text-brand-primary mb-10`}>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
            Expiry-First Dinner Engine
          </div>

          <h1 className={`${fade('delay-100')} text-4xl sm:text-5xl md:text-[56px] font-extrabold tracking-tight leading-[1.1] text-text-heading mb-6`}>
            Savor{' '}
            <span className="text-brand-primary">Freshness,</span>
            <br />
            Every Bite
          </h1>

          <p className={`${fade('delay-200')} text-base md:text-lg leading-relaxed text-text-body max-w-xl pb-8`}>
            EcoSnap turns your expiring groceries into tonight's dinner — saving
            you money, reducing waste, and ending the daily "what should I cook?" panic.
          </p>

          <div className={`${fade('delay-300')} flex flex-wrap gap-3`}>
            <a
              href="#cta"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-primary border border-transparent text-white text-base font-semibold shadow-lg shadow-brand-primary/20 hover:bg-emerald-600 hover:-translate-y-0.5 transition-all duration-300"
            >
              Start for Free
              <ArrowRight size={18} />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center px-7 py-3.5 rounded-full border border-gray-200 text-gray-600 text-base font-semibold hover:border-emerald-200 hover:text-brand-primary transition-all duration-300"
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* Hero image placeholder */}
        <div className={`${fade('delay-500')} relative flex items-center justify-center`}>
          <div className="absolute inset-0 bg-emerald-100/40 rounded-full blur-3xl scale-90" />
          <div className="relative w-full aspect-square max-w-xl mx-auto rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-100 flex items-center justify-center overflow-hidden shadow-2xl shadow-emerald-500/10">
            <img
              src={heroImage}
              alt="Fresh meal"
              className="w-[85%] h-[85%] object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className={`${fade('delay-700')} max-w-6xl mx-auto mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6`}>
        {[
          { value: '$1,500', label: 'avg. wasted per household / yr', highlight: true },
          { value: '219 lbs', label: 'of food thrown away per person' },
          { value: '40%', label: 'of US food supply is wasted' },
        ].map((stat, i) => (
          <div key={i} className="p-[1px] rounded-2xl bg-gradient-to-br from-emerald-200 via-gray-100 to-teal-200">
            <div className="text-center p-6 rounded-[15px] bg-white h-full">
              <span className={`block text-2xl md:text-3xl font-extrabold tracking-tight mb-1 ${stat.highlight ? 'text-brand-primary' : 'text-text-heading'}`}>
                {stat.value}
              </span>
              <span className="text-xs text-text-muted">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
