import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
}

export default function FeatureCard({ icon: Icon, title, description, badge }: FeatureCardProps) {
  return (
    <div className="p-[1px] rounded-2xl bg-gradient-to-br from-emerald-200 via-gray-100 to-teal-200 transition-all duration-300 hover:-translate-y-1.5 group">
      <div className="p-8 rounded-[15px] bg-white h-full text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5 group-hover:bg-emerald-100 transition-colors">
          <Icon size={26} className="text-emerald-500" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-500">{description}</p>
        {badge && (
          <span className="inline-block mt-4 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold uppercase tracking-wider">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
