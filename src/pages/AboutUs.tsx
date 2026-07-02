import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Users, Home, Star } from "lucide-react";
import { team } from "@/data/team";
import CTABanner from "@/components/sections/CTABanner";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import { SeoHead } from "@/components/seo/SeoHead";

const values = [
  { icon: Award, title: "Uncompromising Quality", description: "Only premium materials pass our selection. Every component is sourced from the world's finest suppliers." },
  { icon: Users, title: "Client Partnership", description: "Your vision drives everything. We design with you, not for you — every decision is collaborative." },
  { icon: Home, title: "Space Intelligence", description: "We see potential where others see limitation. Every awkward corner, low ceiling, and narrow corridor is an opportunity." },
  { icon: Star, title: "Lasting Excellence", description: "Our 10-year warranty isn't a promise — it's a certainty. We build to last decades, not seasons." },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <SeoHead
        title="About Design & Supply"
        description="Learn about Design & Supply and our online design and supply model for custom storage projects."
      />
      <Navigation />
      <div className="flex-grow">
        {/* Hero */}
        <div className="relative bg-[#1A1A18] pt-32 pb-0 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-0 items-end">
            <div className="pb-24">
              <span className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase block mb-4">Our Story</span>
              <h1
                className="text-white font-light leading-tight mb-6"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
              >
                We Believe Your<br />
                <em className="text-[#C9A96E] not-italic">Closet Should Be</em><br />
                Beautiful
              </h1>
              <p className="text-white/50 text-sm leading-relaxed max-w-md">
                Founded in 2015, Design & Supply was born from a simple conviction: that the spaces where we store our lives should be as considered and beautiful as the lives themselves.
              </p>
            </div>
            <div className="relative h-64 lg:h-full min-h-[400px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=700&fit=crop"
                alt="Luxury walk-in closet"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A18]/50 to-transparent" />
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="bg-[#FAFAF7] py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4">
                <span className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase block mb-4">The Beginning</span>
                <div className="space-y-6">
                  {[
                    ["2015", "Founded in Los Angeles by Alexandra Morse after a decade in luxury interior design."],
                    ["2018", "Expanded nationally. Over 500 projects completed across 12 states."],
                    ["2021", "Launched our proprietary 3D design visualization platform."],
                    ["2024", "Over 1,200 projects. Ranked #1 custom closet brand on Houzz for 3 consecutive years."]
                  ].map(([year, text]) => (
                    <div key={year} className="flex gap-4">
                      <span className="text-[#C9A96E] text-sm font-medium w-10 flex-shrink-0 mt-0.5">{year}</span>
                      <p className="text-[#6B6B65] text-sm leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-8">
                <h2
                  className="text-[#1A1A18] font-light text-3xl mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Design at the Intersection of<br />Beauty and Function
                </h2>
                <div className="space-y-4 text-[#6B6B65] text-sm leading-relaxed">
                  <p>Design & Supply was built on the belief that premium storage design shouldn't be reserved for those with unlimited budgets — but that quality, craftsmanship, and thoughtful design should be accessible to every discerning homeowner.</p>
                  <p>Every project we undertake is treated as a unique collaboration. We don't manufacture standard closet kits and call them custom. Every panel, every shelf, every piece of hardware is selected specifically for your space, your wardrobe, and your lifestyle.</p>
                  <p>Our team of dedicated designers, project managers, and master craftsmen share one obsession: delivering a finished product that makes you feel something the moment you open the door.</p>
                </div>

                <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-[#EBEBDF]">
                  {[["1,200+", "Projects"], ["98%", "Satisfaction Rate"], ["10yr", "Warranty"]].map(([val, label]) => (
                    <div key={label}>
                      <span className="text-[#1A1A18] text-4xl font-light block mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{val}</span>
                      <span className="text-[#6B6B65] text-xs tracking-[0.15em] uppercase">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="bg-[#1A1A18] py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="p-12 border border-white/10">
              <span className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase block mb-6">Our Mission</span>
              <p
                className="text-white font-light text-2xl leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                "To transform every storage space into a reflection of the person who inhabits it — with precision, artistry, and enduring quality."
              </p>
            </div>
            <div className="p-12 bg-[#C9A96E]">
              <span className="text-[#1A1A18]/60 text-xs tracking-[0.3em] uppercase block mb-6">Our Vision</span>
              <p
                className="text-[#1A1A18] font-light text-2xl leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                "A world where every home has a closet that brings genuine joy — not just storage, but sanctuary."
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-[#F5F0E8] py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="text-center mb-16">
              <span className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase block mb-4">Why Choose Us</span>
              <h2
                className="text-[#1A1A18] font-light"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 3vw, 3rem)" }}
              >
                Our Core Values
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map(({ icon: Icon, title, description }) => (
                <div key={title} className="bg-white p-8 group hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 border border-[#C9A96E] flex items-center justify-center mb-6 group-hover:bg-[#C9A96E] transition-colors duration-300">
                    <Icon size={20} className="text-[#C9A96E] group-hover:text-[#1A1A18] transition-colors duration-300" />
                  </div>
                  <h3 className="text-[#1A1A18] font-medium text-base mb-3">{title}</h3>
                  <p className="text-[#6B6B65] text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="bg-[#FAFAF7] py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="text-center mb-16">
              <span className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase block mb-4">The People</span>
              <h2
                className="text-[#1A1A18] font-light"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 3vw, 3rem)" }}
              >
                Meet Our Team
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map(member => (
                <div key={member.id} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden mb-5">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#C9A96E] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </div>
                  <h3 className="text-[#1A1A18] font-medium text-base">{member.name}</h3>
                  <p className="text-[#C9A96E] text-xs tracking-[0.15em] uppercase mt-1 mb-3">{member.role}</p>
                  <p className="text-[#6B6B65] text-sm leading-relaxed line-clamp-3">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <CTABanner />
      </div>
      <Footer />
    </div>
  );
}