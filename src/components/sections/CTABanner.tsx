import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden h-[500px] flex items-center">
      <Image
        src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1920&h=600&fit=crop"
        alt="Custom designed storage space"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-brand-espresso/80" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 text-center">
        <span className="text-brand-copper-light text-xs tracking-[0.3em] uppercase block mb-6">Start From Home</span>
        <h2
          className="text-white font-light mb-8"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
        >
          Ready to design your<br />
          <em className="text-brand-copper-light not-italic">space from home?</em>
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/space-planner"
            className="group inline-flex items-center justify-center gap-3 bg-brand-copper text-white text-sm tracking-[0.2em] uppercase font-medium px-10 py-4 rounded-full hover:bg-brand-copper-dark transition-all duration-300 shadow-lg"
          >
            Start 3-Step Space Planner
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
