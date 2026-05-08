import { Check } from 'lucide-react';

interface PricingCardProps {
  tier: string;
  price: string;
  unit?: string;
  description: string;
  features: string[];
  ctaText: string;
  featured?: boolean;
}

export default function PricingCard({ tier, price, unit, description, features, ctaText, featured = false }: PricingCardProps) {
  if (featured) {
    return (
      <div className="relative p-9 rounded-2xl flex flex-col h-full mt-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl bg-gradient-to-br from-emerald-500 via-emerald-500 to-teal-500 text-white shadow-xl shadow-emerald-500/25">
        <span className="absolute -top-3 left-9 px-3.5 py-1 rounded-full bg-white text-emerald-600 text-xs font-bold shadow-md shadow-emerald-500/10">
          Recommended
        </span>

        <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-emerald-100">{tier}</p>
        <p className="text-4xl font-extrabold tracking-tight mb-2 text-white">
          {price}
          {unit && <span className="text-base font-medium tracking-normal ml-1 text-emerald-100">{unit}</span>}
        </p>
        <p className="text-sm leading-relaxed mb-8 pb-8 border-b border-emerald-400/50 text-emerald-100">
          {description}
        </p>

        <ul className="flex flex-col gap-3.5 mb-8 flex-1">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-emerald-50">
              <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 bg-white/20 text-white">
                <Check size={12} />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <a
          href="#cta"
          className="w-full inline-flex items-center justify-center py-3.5 rounded-full font-semibold text-sm transition-all duration-300 bg-white text-emerald-600 hover:bg-emerald-50 hover:shadow-lg"
        >
          {ctaText}
        </a>
      </div>
    );
  }

  return (
    <div className="relative p-[1px] rounded-2xl mt-4 bg-gradient-to-br from-emerald-200 via-gray-100 to-teal-200 transition-all duration-300 hover:-translate-y-1.5 group">
      <div className="relative p-9 rounded-[15px] flex flex-col h-full bg-white">
        <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-gray-400">{tier}</p>
        <p className="text-4xl font-extrabold tracking-tight mb-2 text-gray-900">
          {price}
          {unit && <span className="text-base font-medium tracking-normal ml-1 text-gray-400">{unit}</span>}
        </p>
        <p className="text-sm leading-relaxed mb-8 pb-8 border-b border-gray-100 text-gray-500">
          {description}
        </p>

        <ul className="flex flex-col gap-3.5 mb-8 flex-1">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
              <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 bg-emerald-50 text-emerald-500">
                <Check size={12} />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <a
          href="#cta"
          className="w-full inline-flex items-center justify-center py-3.5 rounded-full font-semibold text-sm transition-all duration-300 bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-500/20"
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
}
