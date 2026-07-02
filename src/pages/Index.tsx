import { Navigation } from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import ProcessSteps from "@/components/sections/ProcessSteps";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyDifferent from "@/components/sections/WhyDifferent";
import HomeGallery from "@/components/sections/HomeGallery";
import { BeforeAfter } from "@/components/BeforeAfter";
import SpacePlannerPreview from "@/components/sections/SpacePlannerPreview";
import CTABanner from "@/components/sections/CTABanner";
import FAQSection from "@/components/sections/FAQSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import Footer from "@/components/layout/Footer";
import { Seo } from "@/components/Seo";

const Index = () => {
  return (
    <>
      <Seo
        title="Closet Design Wizard | Custom Closets, Kitchens & Garages in Montreal"
        description="Design custom closets, kitchens, and garages online. Measure your space with our free 3-step planner, meet a designer live, and get a same-day quote."
        path="/"
      />
      <div className="min-h-screen">
        <Navigation />
        <HeroSection />
        <ProcessSteps />
        <ServicesSection />
        <WhyDifferent />
        <HomeGallery />
        <BeforeAfter />
        <SpacePlannerPreview />
        <FAQSection limit={5} showViewAllButton />
        <TestimonialsSection />
        <CTABanner />
        <Footer />
      </div>
    </>
  );
};

export default Index;
