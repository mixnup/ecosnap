import { useReveal } from '../components/useReveal';
import { AlertTriangle, CalendarClock, Trash2 } from 'lucide-react';

const wasteCards = [
  { icon: AlertTriangle, title: 'You buy fresh produce', desc: 'Full of good intentions on grocery day.', color: 'bg-amber-50 text-amber-500' },
  { icon: CalendarClock, title: 'It sits in the fridge', desc: 'Days pass. Life gets busy. Expiry dates creep closer.', color: 'bg-orange-50 text-orange-500' },
  { icon: Trash2, title: 'You throw it away', desc: '$1,500 a year, straight into the bin.', color: 'bg-red-50 text-red-500' },
];

export default function ProblemSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section className="px-5 md:px-12 py-24 md:py-32 bg-surface-alt">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
        }`}
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[1.5px] text-brand-primary mb-5">The Problem</p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading tracking-tight leading-tight mb-5">
            You buy.<br />
            You forget.<br />
            <span className="text-brand-primary">You throw away.</span><br />
            Repeat.
          </h2>
          <p className="text-base leading-relaxed text-text-body mb-4">
            The average household wastes <span className="text-text-heading font-semibold">$1,500 in groceries</span> every
            year. Cluttered pantry trackers and generic recipe apps ignore the one thing that matters:
          </p>
          <p className="text-lg font-semibold text-text-heading italic">
            "What's about to expire, and what can I cook with it <span className="text-brand-primary">tonight</span>?"
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {wasteCards.map((card, i) => (
            <div key={i} className="p-[1px] rounded-xl bg-gradient-to-br from-emerald-200 via-gray-100 to-teal-200 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4 p-5 rounded-[11px] bg-white h-full">
                <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                  <card.icon size={22} />
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-text-heading mb-1">{card.title}</h4>
                  <p className="text-sm text-text-muted">{card.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
