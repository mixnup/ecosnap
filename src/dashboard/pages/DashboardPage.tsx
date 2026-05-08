import InventorySection from '../sections/InventorySection';
import TriageSection from '../sections/TriageSection';

export default function DashboardPage() {
  return (
    <div className="p-8 md:p-10 max-w-[1200px] mx-auto space-y-10">
      <header className="mb-12">
        <p className="text-xs font-bold uppercase tracking-[2px] text-emerald-600 mb-2">Overview</p>
        <h1 className="text-4xl md:text-[42px] font-extrabold tracking-tight text-text-heading leading-tight">
          Good evening.
        </h1>
        <p className="text-text-body mt-3 text-lg max-w-2xl">
          Here is your high-urgency inventory triage.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 xl:col-span-8">
           <InventorySection />
        </div>
        <div className="lg:col-span-5 xl:col-span-4 sticky top-10">
           <TriageSection />
        </div>
      </div>
    </div>
  );
}
