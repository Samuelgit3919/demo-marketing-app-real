import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden h-[500px] flex items-center">
      <Image
        src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1920&h=600&fit=crop"
        alt="Luxury closet"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#1A1A18]/75" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 text-center">
        <span className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase block mb-6">Ready to Begin?</span>
        <h2
          className="text-white font-light mb-6"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
        >
          Your Dream Closet<br />
          <em className="text-[#C9A96E] not-italic">Starts Here</em>
        </h2>
        <p className="text-white/60 mb-10 max-w-lg mx-auto text-sm">
          Join over 1,200 homeowners who have transformed their spaces with Design & Supply. Your consultation is free, and your satisfaction is guaranteed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/wizard"
            className="group inline-flex items-center justify-center gap-3 bg-[#C9A96E] text-[#1A1A18] text-sm tracking-[0.2em] uppercase font-medium px-10 py-4 hover:bg-[#E8D5B0] transition-all duration-300"
          >
            Start Your Transformation
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center gap-3 border border-white/30 text-white text-sm tracking-[0.2em] uppercase font-light px-10 py-4 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300"
          >
            View Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
