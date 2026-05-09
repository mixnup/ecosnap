import { useReveal } from '../components/useReveal';
import { ArrowRight } from 'lucide-react';
import ctaImage from '../../assets/pexels-chixpix-26041803-27857668.jpg';

export default function CTASection() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="cta" className="relative px-5 md:px-12 py-24 md:py-32 bg-brand-primary overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-emerald-400/30 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-emerald-600/30 blur-3xl" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div
          ref={ref}
          className={`relative z-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">
            Stop wasting food.
            <br />
            Start tonight.
          </h2>
          <p className="text-base md:text-lg text-emerald-100 leading-relaxed max-w-xl pb-8">
            Join thousands of households saving money and reducing waste — one dinner at a time.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-brand-primary text-base font-bold shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
          >
            Get Started — It's Free
            <ArrowRight size={18} />
          </a>
        </div>

        {/* CTA image placeholder */}
        <div className="relative flex items-center justify-center">
          <img
            src={ctaImage}
            alt="Dinner ready"
            className="w-full max-w-md rounded-2xl shadow-2xl shadow-emerald-900/20"
          />
        </div>
      </div>
    </section>
  );
}
