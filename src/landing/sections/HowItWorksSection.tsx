import { useReveal } from '../components/useReveal';
import { ScanLine, ChefHat, Sparkles } from 'lucide-react';

const steps = [
  { num: '1', icon: ScanLine, title: 'Scan & Track', desc: 'Snap your grocery receipt or add items manually. We catalog everything with estimated expiry dates.' },
  { num: '2', icon: ChefHat, title: 'Get Triaged', desc: "At dinner time, we isolate what's about to expire and match it to recipes you can cook tonight." },
  { num: '3', icon: Sparkles, title: 'Cook & Save', desc: 'Follow the recipe, tap "Cooked." See exactly how much you saved in dollars and carbon.' },
];

export default function HowItWorksSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="how-it-works" className="px-5 md:px-12 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`}
        >
          <p className="text-xs font-semibold uppercase tracking-[1.5px] text-brand-primary mb-5">How It Works</p>
          <h2 className="text-3xl md:text-[42px] font-bold text-text-heading tracking-tight leading-tight mb-4">
            Three steps to zero waste
          </h2>
          <p className="text-base md:text-lg text-text-body leading-relaxed">
            From grocery bag to dinner plate — in under a minute.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {steps.map((step) => (
            <div key={step.num} className="p-[1px] rounded-2xl bg-gradient-to-br from-emerald-200 via-gray-100 to-teal-200 transition-all duration-300 hover:-translate-y-1.5">
              <div className="relative p-10 rounded-[15px] bg-white h-full text-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                  <step.icon size={26} className="text-brand-primary" />
                </div>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-primary text-white text-xs font-bold mb-4">
                  {step.num}
                </span>
                <h3 className="text-xl font-bold text-text-heading tracking-tight mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed text-text-body">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
