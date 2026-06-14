import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
];

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  // The header shows light mode if we scrolled OR if we are on any page other than home
  const isLightState = scrolled || !isHome;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isLightState
            ? "bg-brand-cream/95 backdrop-blur-md border-brand-border shadow-sm"
            : "bg-transparent border-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex lg:grid lg:grid-cols-3 items-center justify-between h-20">
          {/* Column 1: Logo */}
          <div className="flex justify-start">
            <Link href="/" className="flex items-center gap-3 group">
              <div
                className={`w-9 h-9 rounded-[10px] flex items-center justify-center font-serif font-bold text-base transition-all duration-500 ${
                  isLightState
                    ? "bg-brand-espresso text-white"
                    : "border border-white/20 text-white bg-white/5"
                }`}
              >
                D
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className={`font-serif text-[19px] font-bold tracking-tight transition-colors duration-500 ${
                    isLightState ? "text-brand-espresso" : "text-white"
                  }`}
                >
                  Design
                </span>
                <span className="text-brand-copper-light font-sans text-[9px] tracking-[0.18em] uppercase font-semibold mt-0.5">
                  & Supply
                </span>
              </div>
            </Link>
          </div>

          {/* Column 2: Center Navigation Links (desktop) */}
          <div className="hidden lg:flex justify-center items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs tracking-[0.15em] uppercase transition-all duration-300 relative py-1.5 group ${
                    isActive
                      ? isLightState
                        ? "text-brand-espresso font-medium"
                        : "text-white font-medium"
                      : isLightState
                        ? "text-brand-espresso/70 hover:text-brand-espresso"
                        : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-brand-copper transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Column 3: Right Action Buttons (desktop) */}
          <div className="hidden lg:flex justify-end items-center gap-8">
            <Link
              href="/space-planner"
              className="inline-flex items-center justify-center bg-brand-copper hover:bg-brand-copper-dark text-white text-xs tracking-[0.15em] uppercase font-sans font-medium px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm"
            >
              Start Planner
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              className={`p-2 transition-colors duration-300 ${
                isLightState ? "text-brand-espresso" : "text-white"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-brand-ink transition-all duration-500 lg:hidden flex flex-col ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "5rem" }}
      >
        <div className="flex flex-col items-center justify-center flex-1 gap-8 px-6">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-2xl tracking-[0.2em] uppercase font-light transition-all duration-300 ${
                  isActive ? "text-brand-copper" : "text-white/70 hover:text-white"
                }`}
                style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms" }}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/space-planner"
            className="mt-4 inline-flex items-center justify-center bg-brand-copper hover:bg-brand-copper-dark text-white text-sm tracking-[0.2em] uppercase font-medium px-8 py-4 w-full max-w-xs rounded-full transition-colors"
          >
            Start Planner
          </Link>
        </div>
      </div>
    </>
  );
};
