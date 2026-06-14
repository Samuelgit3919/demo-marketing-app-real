import { Navigation } from "@/components/Navigation";
import FAQSection from "@/components/sections/FAQSection";
import CTABanner from "@/components/sections/CTABanner";
import Footer from "@/components/layout/Footer";

const Faq = () => {
  return (
    <div className="min-h-screen bg-brand-cream">
      <Navigation />
      <div className="pt-32 lg:pt-40 pb-4 text-center px-6">
        <span className="text-brand-copper text-xs tracking-[0.3em] uppercase block mb-4">Questions & Answers</span>
        <h1
          className="text-brand-espresso font-light"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
        >
          Frequently Asked Questions
        </h1>
      </div>
      <FAQSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Faq;
