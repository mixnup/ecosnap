import LandingLayout from '../layouts/LandingLayout';
import HeroSection from '../sections/HeroSection';
import ProblemSection from '../sections/ProblemSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import FeaturesSection from '../sections/FeaturesSection';
import PricingSection from '../sections/PricingSection';
import CTASection from '../sections/CTASection';

export default function LandingPage() {
  return (
    <LandingLayout>
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
    </LandingLayout>
  );
}
