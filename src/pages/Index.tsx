import { SeoHead } from "@/components/seo/SeoHead";
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
import LatestPosts from "@/components/sections/LatestPosts";
import Footer from "@/components/layout/Footer";

const Index = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Design & Supply",
    url: "https://designandsupply.ca",
    email: "hello@designandsupply.com",
    telephone: "+1 (800) 555-0192",
    areaServed: "United States and Canada",
    description:
      "Online custom closet, kitchen, and garage design. Use our 3-Step Space Planner, meet a designer live in CAD, and get a same-day quote.",
  };

  return (
    <>
      <SeoHead
        title="Design & Supply | Online Custom Closet, Kitchen & Garage Design"
        description="Design your closet, kitchen, or garage online. Use our 3-Step Space Planner, meet a designer live in CAD, and get a same-day quote."
        jsonLd={localBusinessSchema}
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
        <LatestPosts />
        <CTABanner />
        <Footer />
      </div>
    </>
  );
};

export default Index;
