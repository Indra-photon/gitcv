import Image from "next/image";
import HeroComponent from "./home/HeroComponent";
import StepsSection from "./home/StepsSection";
import BentoSection from "./home/BentoSection";
import PricingSection from "./home/PricingSection";
import Footer from "@/components/Footer";
import FAQSection from "./home/FAQSection";
import FeaturesComponent from "./home/FeaturesComponent";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroComponent />
      <StepsSection />
      <FeaturesComponent />
      <BentoSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
