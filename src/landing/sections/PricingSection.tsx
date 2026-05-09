import { useReveal } from '../components/useReveal';
import PricingCard from '../components/PricingCard';

export default function PricingSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="pricing" className="px-5 md:px-12 py-24 md:py-32">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`}
        >
          <p className="text-xs font-semibold uppercase tracking-[1.5px] text-brand-primary mb-5">Pricing</p>
          <h2 className="text-3xl md:text-[42px] font-bold text-text-heading tracking-tight leading-tight mb-4">
            Pay for what you use
          </h2>
          <p className="text-base md:text-lg text-text-body leading-relaxed">
            No subscriptions. No lock-in. Buy Sachet credits when you need premium features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch pt-8">
          <PricingCard
            tier="Free"
            price="$0"
            description="Build the daily habit. Track expiring items, get standard recipe suggestions, and start saving tonight."
            features={['Expiry tracking (up to 15 items)', 'Standard recipe suggestions', 'Basic impact receipts', 'Single household profile']}
            ctaText="Get Started Free"
          />
          <PricingCard
            tier="Sachets"
            price="$2.99"
            unit="/ 5 credits"
            description="Unlock high-value actions exactly when you need them — at peak urgency, not on a monthly timer."
            features={['Everything in Free', 'Receipt scanning & auto-import', 'Dietary-restricted recipes', 'Multi-day family meal prep', 'Priority processing']}
            ctaText="Buy Sachets"
            featured
          />
        </div>
      </div>
    </section>
  );
}
