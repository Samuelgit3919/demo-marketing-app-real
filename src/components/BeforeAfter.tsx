import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import {
  ChevronLeft, ChevronRight, Loader2, MapPin, Calendar,
  GripVertical, Maximize2, X, ArrowRight,
} from "lucide-react";
import { imageService } from "@/lib/imageService";
import before1 from "@/assets/beforeAfter/before1.jpg";
import after1 from "@/assets/beforeAfter/After1.jpg";
import before2 from "@/assets/beforeAfter/before2.jpg";
import after2 from "@/assets/beforeAfter/after2.jpg";
import before3 from "@/assets/beforeAfter/before3.jpeg";
import after3 from "@/assets/beforeAfter/after3.jpeg";

interface ProjectItem {
  id: string | number;
  before: string;
  after: string;
  title: string;
  tagline: string;
  beforeLabel: string;
  afterLabel: string;
  location: string;
  date: string;
  statValue: string;
  statLabel: string;
}

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 1, before: before1, after: after1,
    title: "Master Walk-in Closet", tagline: "Cluttered Before → Transformed After",
    beforeLabel: "Dead Space", afterLabel: "Smart Storage",
    location: "Sarbet, Addis Ababa", date: "April 2025",
    statValue: "3x", statLabel: "more storage",
  },
  {
    id: 2, before: before2, after: after2,
    title: "Reach-in Bedroom Closet", tagline: "Disorganised → Perfectly Fitted",
    beforeLabel: "Cluttered Before", afterLabel: "Transformed After",
    location: "Kazanchis, Addis Ababa", date: "January 2025",
    statValue: "1 Day", statLabel: "install time",
  },
  {
    id: 3, before: before3, after: after3,
    title: "Spare Room → Dressing Suite", tagline: "Empty Spare Room → Dream Dressing Room",
    beforeLabel: "Before", afterLabel: "After",
    location: "Bole, Addis Ababa", date: "March 2025",
    statValue: "Full", statLabel: "room consultation",
  },
  {
    id: 4, before: before1, after: after2,
    title: "Awkward Alcove Wardrobe", tagline: "Dead Space → Smart Storage",
    beforeLabel: "Dead Space", afterLabel: "Smart Storage",
    location: "CMC, Addis Ababa", date: "February 2025",
    statValue: "100%", statLabel: "space utilised",
  },
];

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

/* -------- Draggable before/after comparison slider -------- */
function CompareSlider({
  project,
  large = false,
}: {
  project: ProjectItem;
  large?: boolean;
}) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [loaded, setLoaded] = useState({ before: false, after: false });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPos(50);
    setLoaded({ before: false, after: false });
  }, [project.id]);

  const updateFromX = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(clamp(((clientX - rect.left) / rect.width) * 100, 0, 100));
  };

  return (
    <div
      ref={ref}
      className={`relative ${large ? "aspect-video max-h-[80vh]" : "aspect-[4/3]"} w-full overflow-hidden rounded-2xl select-none cursor-ew-resize group focus:outline-none focus:ring-4 focus:ring-brand-copper/40 bg-brand-espresso`}
      style={{ touchAction: "none" }}
      tabIndex={0}
      role="slider"
      aria-label="Before and after comparison slider"
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      onPointerDown={(e) => { setDragging(true); updateFromX(e.clientX); }}
      onPointerMove={(e) => { if (dragging) updateFromX(e.clientX); }}
      onPointerUp={() => setDragging(false)}
      onPointerLeave={() => setDragging(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => clamp(p - 4, 0, 100));
        if (e.key === "ArrowRight") setPos((p) => clamp(p + 4, 0, 100));
      }}
    >
      {(!loaded.before || !loaded.after) && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-brand-espresso">
          <Loader2 className="w-8 h-8 text-brand-copper animate-spin" />
        </div>
      )}

      {/* After (base, right side) */}
      <img
        src={project.after}
        alt={`${project.title} — after`}
        draggable={false}
        onLoad={() => setLoaded((s) => ({ ...s, after: true }))}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Before (clipped to the left of the handle) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)`, transition: dragging ? "none" : "clip-path 0.1s ease-out" }}
      >
        <img
          src={project.before}
          alt={`${project.title} — before`}
          draggable={false}
          onLoad={() => setLoaded((s) => ({ ...s, before: true }))}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-md bg-brand-espresso/85 backdrop-blur px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white border-l-2 border-brand-copper">
        {project.beforeLabel}
      </div>
      <div className="absolute top-4 right-4 z-20 rounded-md bg-brand-copper px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white shadow-lg">
        {project.afterLabel}
      </div>

      {/* Divider + handle */}
      <div
        className="absolute top-0 bottom-0 z-20 w-0.5 bg-white/90 shadow-[0_0_18px_rgba(255,255,255,0.7)]"
        style={{ left: `${pos}%`, transition: dragging ? "none" : "left 0.1s ease-out" }}
      >
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-lg bg-white shadow-xl border border-brand-border ${large ? "w-12 h-12" : "w-10 h-10"} ${dragging ? "scale-110" : ""} transition-transform`}>
          <GripVertical className="w-5 h-5 text-brand-espresso/70" />
        </div>
      </div>
    </div>
  );
}

export const BeforeAfter = () => {
  const [projects, setProjects] = useState<ProjectItem[]>(DEFAULT_PROJECTS);
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.15 });

  useEffect(() => {
    imageService
      .fetchBeforeAfter()
      .then((data) => {
        if (data && data.length > 0) {
          setProjects(
            data.map((item) => ({
              id: item.id,
              before: item.before_image_url,
              after: item.after_image_url,
              title: item.title,
              tagline: item.tagline || item.description || "",
              beforeLabel: item.before_label || "Before",
              afterLabel: item.after_label || "After",
              location: item.location || "",
              date: item.project_date || "",
              statValue: item.stat_value || "",
              statLabel: item.stat_label || "",
            })),
          );
          setActive(0);
        }
      })
      .catch((e) => console.error("Failed to fetch transformations:", e));
  }, []);

  const current = projects[active];
  const go = (dir: number) => setActive((a) => (a + dir + projects.length) % projects.length);

  if (!current) return null;

  return (
    <section
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`relative overflow-hidden bg-brand-espresso py-24 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-copper/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-brand-cream font-light leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Closet Transformations
          </h2>
          <p className="text-brand-cream/60 max-w-2xl mx-auto mt-3 leading-relaxed">
            Drag the handle to reveal the before and after. Every space is real — no staging, no tricks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          {/* Left — slider + meta */}
          <div>
            <div className="relative">
              <CompareSlider project={current} />
              <button
                onClick={() => setFullscreen(true)}
                className="absolute bottom-4 right-4 z-20 w-9 h-9 rounded-lg bg-brand-espresso/80 backdrop-blur border border-white/15 flex items-center justify-center text-white/90 hover:bg-brand-espresso transition-colors"
                aria-label="View fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Meta row */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-brand-cream/70">
                {current.location && (
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-brand-copper" />{current.location}</span>
                )}
                {current.date && (
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-brand-copper" />{current.date}</span>
                )}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button onClick={() => go(-1)} aria-label="Previous project"
                  className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center text-brand-cream/80 hover:border-brand-copper hover:text-brand-copper transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm text-brand-cream/60 tabular-nums">{active + 1} / {projects.length}</span>
                <button onClick={() => go(1)} aria-label="Next project"
                  className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center text-brand-cream/80 hover:border-brand-copper hover:text-brand-copper transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="mt-3 text-center text-[11px] uppercase tracking-[0.25em] text-brand-cream/40">
              ← Drag the handle to compare →
            </p>
          </div>

          {/* Right — project list + CTA */}
          <div className="space-y-3">
            {projects.map((p, i) => {
              const isActive = i === active;
              return (
                <button
                  key={p.id}
                  onClick={() => setActive(i)}
                  className={`w-full text-left rounded-xl border px-4 py-3.5 transition-all ${
                    isActive
                      ? "bg-white/[0.06] border-brand-copper/60 shadow-lg"
                      : "bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-brand-cream font-semibold leading-snug" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.05rem" }}>
                        {p.title}
                      </h3>
                      {p.tagline && <p className="text-brand-cream/50 text-xs mt-0.5 truncate">{p.tagline}</p>}
                    </div>
                    {p.statValue && (
                      <div className={`shrink-0 text-center rounded-md px-3 py-1.5 leading-tight ${isActive ? "bg-brand-copper text-white" : "bg-white/[0.06] text-brand-cream/70"}`}>
                        <div className="text-sm font-bold">{p.statValue}</div>
                        {p.statLabel && <div className="text-[9px] uppercase tracking-wide opacity-90">{p.statLabel}</div>}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}

            {/* CTA */}
            <div className="rounded-xl border border-brand-copper/30 bg-brand-copper/10 px-5 py-5 mt-2">
              <h3 className="text-brand-cream font-semibold" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.2rem" }}>
                Your home could be next
              </h3>
              <p className="text-brand-cream/60 text-sm mt-1">
                Every project begins with a free in-home consultation.
              </p>
              <a href="/space-planner" className="inline-flex items-center gap-1.5 mt-3 text-brand-copper font-medium text-sm hover:gap-2.5 transition-all">
                Book yours free <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen overlay */}
      {fullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 sm:p-10" onClick={() => setFullscreen(false)}>
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-lg border border-white/25 flex items-center justify-center text-white hover:border-brand-copper hover:text-brand-copper transition-colors"
            onClick={() => setFullscreen(false)}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <CompareSlider project={current} large />
            <p className="text-center text-white/60 text-sm mt-4">{current.title}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default BeforeAfter;
