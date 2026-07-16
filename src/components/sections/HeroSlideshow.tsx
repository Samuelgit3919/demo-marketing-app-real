"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface SlideImage {
  src: string;
  title: string;
}

interface HeroSlideshowProps {
  images: SlideImage[];
  fallback: string;
  alt?: string;
}

export default function HeroSlideshow({ images, fallback, alt = "Project photo" }: HeroSlideshowProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSlideCount(emblaApi.scrollSnapList().length);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  // If no real images, show fallback
  const displayImages: SlideImage[] = images.length > 0 ? images : [{ src: fallback, title: "" }];

  return (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-brand-border shadow-[0_16px_40px_-12px_rgba(45,36,30,0.2)] group">
      <div ref={emblaRef} className="h-full">
        <div className="flex h-full">
          {displayImages.map((img, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0 relative h-full">
              <Image
                src={img.src}
                alt={img.title || alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows — only show when more than 1 image */}
      {slideCount > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-brand-border flex items-center justify-center text-brand-espresso opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:border-brand-copper"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-brand-border flex items-center justify-center text-brand-espresso opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:border-brand-copper"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {slideCount > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: slideCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === selectedIndex
                  ? "bg-brand-copper scale-110 shadow-sm"
                  : "bg-white/70 hover:bg-white backdrop-blur-sm"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}