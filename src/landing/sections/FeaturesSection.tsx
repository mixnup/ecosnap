import { useReveal } from '../components/useReveal';
import FeatureCard from '../components/FeatureCard';
import { Timer, UtensilsCrossed, ScanLine, Leaf } from 'lucide-react';

const features = [
  { icon: Timer, title: 'Expiry-First Dashboard', description: "See what needs to be used NOW — not a cluttered pantry list. High-urgency items surface automatically so you never miss an expiry window." },
  { icon: UtensilsCrossed, title: 'Smart Dinner Triage', description: "One tap generates a recipe from your most urgent ingredients. No browsing, no searching — just tonight's dinner, decided." },
  { icon: ScanLine, title: 'Receipt Scanner', description: 'Skip the manual entry grind. Snap a photo of your grocery receipt and we parse, categorize, and timestamp every item instantly.', badge: 'Premium' },
  { icon: Leaf, title: 'Impact Receipts', description: 'After every meal, see exactly how much money you saved and the equivalent carbon offset. The feel-good loop that builds the daily habit.' },
];

export default function FeaturesSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="features" className="px-5 md:px-12 py-24 md:py-32 bg-surface-alt">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`}
        >
          <p className="text-xs font-semibold uppercase tracking-[1.5px] text-brand-primary mb-5">Features</p>
          <h2 className="text-3xl md:text-[42px] font-bold text-text-heading tracking-tight leading-tight mb-4">
            Why choose EcoSnap
          </h2>
          <p className="text-base md:text-lg text-text-body leading-relaxed">
            Purpose-built to solve one problem ruthlessly: stop wasting food.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
