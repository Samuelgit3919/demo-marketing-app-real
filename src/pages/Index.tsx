import { Navigation } from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import ProcessSteps from "@/components/sections/ProcessSteps";
import ServicesSection from "@/components/sections/ServicesSection";
import TransformationsSection from "@/components/sections/TransformationsSection";
import VideoSection from "@/components/sections/VideoSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
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
        <TransformationsSection />
        <VideoSection />
        <TestimonialsSection />
        <CTABanner />
        <FAQSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
