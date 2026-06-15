import { Navigation } from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import ProcessSteps from "@/components/sections/ProcessSteps";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyDifferent from "@/components/sections/WhyDifferent";
import HomeGallery from "@/components/sections/HomeGallery";
import SpacePlannerPreview from "@/components/sections/SpacePlannerPreview";
import CTABanner from "@/components/sections/CTABanner";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <>
      <div className="min-h-screen">
        <Navigation />
        <HeroSection />
        <ProcessSteps />
        <ServicesSection />
        <WhyDifferent />
        <HomeGallery />
        <SpacePlannerPreview />
        <FAQSection limit={5} showViewAllButton />
        <CTABanner />
        <Footer />
      </div>
    </>
  );
};

export default Index;
