import InventorySection from '../sections/InventorySection';

export default function DashboardPage() {
  const hour = new Date().getHours();

  let greeting = "Good evening";

  if (hour >= 5 && hour < 12) {
    greeting = "Good morning";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  return (
    <div className="p-8 md:p-12 lg:p-16 max-w-[1000px] mx-auto space-y-12">
      <header className="mb-12">
        <p className="text-[11px] font-bold uppercase tracking-[3px] text-emerald-600 mb-3">
          Overview
        </p>

        <h1 className="text-4xl md:text-[56px] font-extrabold tracking-tight text-text-heading leading-[1.1]">
          {greeting}.
        </h1>

        <p className="text-text-body mt-5 text-xl max-w-2xl leading-relaxed">
          Your inventory triage is ready. We've identified{" "}
          <span className="text-emerald-600 font-bold underline decoration-emerald-100 underline-offset-8">
            high-urgency
          </span>{" "}
          items that need your attention.
        </p>
      </header>

      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
        <InventorySection />
      </div>
    </div>
  );
}