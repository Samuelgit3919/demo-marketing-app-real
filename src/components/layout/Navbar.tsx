// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Menu, X } from "lucide-react";

// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/how-it-works", label: "How It Works" },
//   { href: "/gallery", label: "Gallery" },
//   { href: "/about", label: "About Us" },
//   { href: "/pay-here", label: "Pay Here" },
// ];

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 30);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     setMobileOpen(false);
//   }, [pathname]);

//   const isHome = pathname === "/";

//   return (
//     <>
//       <header
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//           scrolled || !isHome
//             ? "bg-[#1A1A18]/95 backdrop-blur-md shadow-lg"
//             : "bg-transparent"
//         }`}
//       >
//         <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-3 group">
//             <div className="w-8 h-8 border border-[#C9A96E] flex items-center justify-center group-hover:bg-[#C9A96E] transition-colors duration-300">
//               <span className="text-[#C9A96E] group-hover:text-[#1A1A18] text-xs font-bold tracking-widest transition-colors duration-300">D</span>
//             </div>
//             <div>
//               <span className="text-white font-light tracking-[0.2em] text-sm uppercase">Design</span>
//               <span className="text-[#C9A96E] font-light tracking-[0.2em] text-sm uppercase"> & Supply</span>
//             </div>
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden lg:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`text-xs tracking-[0.15em] uppercase transition-all duration-300 relative group ${
//                   pathname === link.href
//                     ? "text-[#C9A96E]"
//                     : "text-white/70 hover:text-white"
//                 }`}
//               >
//                 {link.label}
//                 <span className={`absolute -bottom-1 left-0 h-px bg-[#C9A96E] transition-all duration-300 ${
//                   pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
//                 }`} />
//               </Link>
//             ))}
//           </div>

//           {/* CTA Button */}
//           <div className="hidden lg:block">
//             <Link
//               href="/get-started"
//               className="inline-flex items-center gap-2 bg-[#C9A96E] text-[#1A1A18] text-xs tracking-[0.2em] uppercase font-medium px-6 py-3 hover:bg-[#E8D5B0] transition-all duration-300"
//             >
//               Get Started
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="lg:hidden text-white p-2"
//             onClick={() => setMobileOpen(!mobileOpen)}
//             aria-label="Toggle menu"
//           >
//             {mobileOpen ? <X size={22} /> : <Menu size={22} />}
//           </button>
//         </nav>
//       </header>

//       {/* Mobile Menu */}
//       <div
//         className={`fixed inset-0 z-40 bg-[#1A1A18] transition-all duration-500 lg:hidden flex flex-col ${
//           mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
//         }`}
//         style={{ paddingTop: "5rem" }}
//       >
//         <div className="flex flex-col items-center justify-center flex-1 gap-8 px-6">
//           {navLinks.map((link, i) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={`text-2xl tracking-[0.2em] uppercase font-light transition-all duration-300 ${
//                 pathname === link.href ? "text-[#C9A96E]" : "text-white/70 hover:text-white"
//               }`}
//               style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms" }}
//             >
//               {link.label}
//             </Link>
//           ))}
//           <Link
//             href="/get-started"
//             className="mt-4 inline-flex items-center justify-center bg-[#C9A96E] text-[#1A1A18] text-sm tracking-[0.2em] uppercase font-medium px-8 py-4 w-full max-w-xs hover:bg-[#E8D5B0] transition-colors"
//           >
//             Get Started
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }
