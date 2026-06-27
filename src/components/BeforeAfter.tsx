import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { type BeforeAfterItem, imageService } from "@/lib/imageService";
import before from "@/assets/beforeAfter/before1.jpg";
import after from "@/assets/beforeAfter/After1.jpg";
import before2 from "@/assets/beforeAfter/before2.jpg";
import after2 from "@/assets/beforeAfter/after2.jpg";
import before3 from "@/assets/beforeAfter/before3.jpeg";
import after3 from "@/assets/beforeAfter/after3.jpeg";

interface ProjectItem {
  id: string | number;
  before: string;
  after: string;
  thumbnail: string;
  title?: string;
  description?: string;
}

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 1,
    before: before,
    after: after,
    thumbnail: after,
  },
  {
    id: 2,
    before: before2,
    after: after2,
    thumbnail: after2,
  },
  {
    id: 3,
    before: before3,
    after: after3,
    thumbnail: after3,
  },
  {
    id: 4,
    before: before,
    after: after,
    thumbnail: after
  },
  {
    id: 5,
    before: before2,
    after: after2,
    thumbnail: after2,
  },
  {
    id: 6,
    before: before3,
    after: after3,
    thumbnail: after3,
  },
];

export const BeforeAfter = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      dragFree: true,
      loop: true,
      align: "start",
      containScroll: "trimSnaps"
    },
    [Autoplay({ delay: 3000, stopOnInteraction: true })]
  );

  const [projects, setProjects] = useState<ProjectItem[]>(DEFAULT_PROJECTS);
  const [activeProject, setActiveProject] = useState<ProjectItem>(DEFAULT_PROJECTS[0]);
  const [loading, setLoading] = useState(true);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({ before: false, after: false });
  const [selectedSlides, setSelectedSlides] = useState<number[]>([]);
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedSlides(emblaApi.selectedScrollSnap() ? [emblaApi.selectedScrollSnap()] : []);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition(prev => Math.max(prev - 5, 0));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition(prev => Math.min(prev + 5, 100));
    }
  };

  useEffect(() => {
    setImagesLoaded({ before: false, after: false });
    setSliderPosition(50);
  }, [activeProject]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await imageService.fetchBeforeAfter();
        if (data && data.length > 0) {
          const transformed = data.map(item => ({
            id: item.id,
            before: item.before_image_url,
            after: item.after_image_url,
            thumbnail: item.after_image_url,
            title: item.title,
            description: item.description
          }));
          setProjects(transformed);
          setActiveProject(transformed[0]);
        }
      } catch (error) {
        console.error("Failed to fetch transformations:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);


  return (
    <section
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`py-32 bg-brand-cream relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-copper/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-espresso/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          <div className="text-center mb-16">
          <span className="text-brand-copper text-xs tracking-[0.3em] uppercase block mb-4">TRANSFORMATIONS</span>
          <h2
            className="text-brand-espresso font-light leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Closet Transformations
          </h2>
          <p className="text-brand-muted max-w-2xl mx-auto leading-relaxed">
            Experience the dramatic difference our expert design brings to every project
          </p>
        </div>

        {/* Preview Panel */}
        <div className={`mb-16 flex justify-center items-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <div className="w-full max-w-5xl rounded-2xl overflow-hidden bg-white border border-brand-border shadow-[0_8px_30px_-12px_rgba(45,36,30,0.12)] p-2 transition-all duration-500">
            <div
              className="relative rounded-2xl overflow-hidden aspect-video cursor-ew-resize select-none group focus:outline-none focus:ring-4 focus:ring-brand-copper/50"
              tabIndex={0}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
              onKeyDown={handleKeyDown}
              role="slider"
              aria-label="Before and after comparison slider"
              aria-valuenow={sliderPosition}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {/* Loading State */}
              {(!imagesLoaded.before || !imagesLoaded.after) && (
                <div className="absolute inset-0 bg-brand-sand-light flex items-center justify-center z-10">
                  <Loader2 className="w-12 h-12 text-brand-copper animate-spin" />
                </div>
              )}

              {/* Before Image */}
              <img
                src={activeProject.after}
                alt="After transformation"
                className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300"
                style={{ opacity: imagesLoaded.after ? 1 : 0 }}
                onLoad={() => setImagesLoaded(prev => ({ ...prev, after: true }))}
              />

              {/* After Image with clip */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                  transition: isDragging ? 'none' : 'clip-path 0.1s ease-out'
                }}
              >

                <img
                  src={activeProject.before}
                  alt="Before transformation"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300"
                  style={{ opacity: imagesLoaded.before ? 1 : 0 }}
                  onLoad={() => setImagesLoaded(prev => ({ ...prev, before: true }))}
                />
              </div>

              {/* Slider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-white via-white to-white shadow-[0_0_20px_rgba(255,255,255,0.8)] backdrop-blur-sm z-20"
                style={{
                  left: `${sliderPosition}%`,
                  transition: isDragging ? 'none' : 'left 0.1s ease-out'
                }}
              >
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-white to-white/90 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.3)] flex items-center justify-center border-4 border-brand-copper/30 transition-all duration-300 ${isDragging ? 'scale-110' : ''}`}>
                  <div className="flex gap-1.5">
                    <ChevronLeft className="w-4 h-4 text-brand-espresso/60" strokeWidth={3} />
                    <ChevronRight className="w-4 h-4 text-brand-espresso/60" strokeWidth={3} />
                  </div>
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-6 left-6 bg-brand-espresso/80 text-white px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider shadow-[0_8px_30px_-12px_rgba(45,36,30,0.12)] z-10">
                Before
              </div>
              <div className="absolute top-6 right-6 bg-brand-copper text-white px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider shadow-[0_8px_30px_-12px_rgba(45,36,30,0.12)] z-10">
                After
              </div>

              {/* Instruction hint */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-brand-espresso/70 text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-lg">
                ← Drag or use arrow keys to compare →
              </div>
            </div>
          </div>
        </div>



        {/* Horizontal Slider with Navigation */}
        <div className={`relative transition-all  duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-gradient-to-br from-white via-white to-white/95 backdrop-blur-md rounded-full shadow-[0_8px_30px_-12px_rgba(45,36,30,0.12)] flex items-center justify-center transition-all duration-300 active:scale-95 disabled:opacity-0 disabled:pointer-events-none border-2 border-brand-copper/20"
            aria-label="Previous projects"
          >
            <ChevronLeft className="w-7 h-7 text-brand-espresso" strokeWidth={2.5} />
          </button>

          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-gradient-to-br from-white via-white to-white/95 backdrop-blur-md rounded-full shadow-[0_8px_30px_-12px_rgba(45,36,30,0.12)] flex items-center justify-center transition-all duration-300 active:scale-95 disabled:opacity-0 disabled:pointer-events-none border-2 border-brand-copper/20"
            aria-label="Next projects"
          >
            <ChevronRight className="w-7 h-7 text-brand-espresso" strokeWidth={2.5} />
          </button>

          <div className="overflow-hidden mx-4" ref={emblaRef}>
            <div className="flex gap-6 py-6 px-3 cursor-grab active:cursor-grabbing touch-pan-x">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  onClick={() => {
                    setActiveProject(project);
                    emblaApi?.scrollTo(index);
                  }}
                  className={`
                    min-w-[200px] cursor-pointer rounded-2xl overflow-hidden 
                    transition-all duration-500 ease-smooth
                    ${activeProject?.id === project.id
                      ? "ring-2 ring-brand-copper shadow-[0_8px_30px_-12px_rgba(45,36,30,0.12)]"
                      : "shadow-[0_8px_30px_-12px_rgba(45,36,30,0.12)] opacity-100"
                    }
                  `}
                >
                  <div className="relative group/card">
                    <div className="aspect-[4/3] overflow-hidden bg-brand-sand-light">
                      <img
                        src={project.thumbnail}
                        className="w-full h-full object-cover transition-all duration-700 ease-smooth"
                        alt={`Project ${project.id} thumbnail`}
                        loading="lazy"
                      />
                    </div>
                    {activeProject?.id === project.id && (
                      <div className="absolute top-4 right-4 bg-brand-copper text-white px-4 py-2 text-xs font-bold shadow-[0_8px_30px_-12px_rgba(45,36,30,0.12)] animate-fade-in border border-white/20">
                        ACTIVE
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
