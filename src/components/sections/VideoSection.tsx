"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-[#1A1A18] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <span className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase block mb-6">Our Process In Action</span>
            <h2
              className="text-white font-light leading-tight mb-6"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              From Empty Room to<br />
              <em className="text-[#C9A96E] not-italic">Luxury Closet</em>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              Watch how our team transforms an ordinary space into a bespoke storage system — from initial measurement and design through precision craftsmanship and final installation.
            </p>
            <div className="flex flex-col gap-4">
              {["Precise measurement & 3D design", "Premium material selection", "Expert installation team", "Final detailing & handover"].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="w-6 h-px bg-[#C9A96E]" />
                  <span className="text-white/60 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Video Player */}
          <div className="relative">
            {!playing ? (
              <div
                className="relative aspect-video overflow-hidden cursor-pointer group"
                onClick={() => setPlaying(true)}
              >
                <Image
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=675&fit=crop"
                  alt="Closet installation process"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[#1A1A18]/40 group-hover:bg-[#1A1A18]/20 transition-all duration-300" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-20 h-20 border-2 border-white/60 flex items-center justify-center group-hover:border-[#C9A96E] transition-colors duration-300">
                      <Play size={28} className="text-white fill-white ml-1 group-hover:text-[#C9A96E] group-hover:fill-[#C9A96E] transition-colors duration-300" />
                    </div>
                    {/* Pulse animation */}
                    <div className="absolute inset-0 border border-white/20 animate-ping" />
                  </div>
                </div>

                <div className="absolute bottom-6 left-6">
                  <span className="text-white/70 text-xs tracking-[0.2em] uppercase">Watch: The Design & Supply Process</span>
                </div>
              </div>
            ) : (
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Design & Supply Process"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
