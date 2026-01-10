"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ lang = "en" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isAr = lang === "ar";
  const isHome =
    pathname === (isAr ? "/ar" : "/") || pathname === (isAr ? "/ar/" : "/");

  const switchLangUrl = () => {
    if (isAr) {
      const newPath = pathname.replace(/^\/ar/, "");
      return newPath === "" ? "/" : newPath;
    } else {
      return `/ar${pathname === "/" ? "" : pathname}`;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const getLink = (hash) => {
    if (isHome) return hash;
    return (isAr ? "/ar" : "/") + hash;
  };

  // Handle language switch with full page reload to prevent white screen
  // This is necessary because switching between /ar and / routes involves
  // different root layouts with different html lang and dir attributes
  const handleLangSwitch = (e) => {
    e.preventDefault();
    const newUrl = switchLangUrl();
    window.location.href = newUrl;
  };

  // Handle hash link navigation to prevent white screen on static export
  const handleHashClick = (e, href) => {
    // Only handle hash links that point to home page sections
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      const targetPath = path || (isAr ? "/ar" : "/");
      const normalizedTarget = targetPath.replace(/\/$/, "") || "/";
      const normalizedCurrent = pathname.replace(/\/$/, "") || "/";

      if (normalizedTarget === normalizedCurrent) {
        // Same page, just scroll to element
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Different page - let Next.js handle navigation normally
        // The hash will be handled after page load
        // Store the hash in sessionStorage to scroll after navigation
        if (hash) {
          sessionStorage.setItem("scrollToHash", hash);
        }
      }
    }
  };

  // Handle scroll to hash after navigation
  useEffect(() => {
    const hash = sessionStorage.getItem("scrollToHash");
    if (hash) {
      sessionStorage.removeItem("scrollToHash");
      // Wait for page to be fully rendered
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled || isOpen
          ? "bg-gray-900/80 backdrop-blur-xl border-b border-blue-900/50 py-3"
          : "bg-transparent py-6"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link
          href={isAr ? "/ar" : "/"}
          className="relative group z-50"
          aria-label="Go to homepage"
        >
          <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
          <div className="relative flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-lg">
                {isAr ? "ف" : "F"}
              </span>
            </div>
            <span className="hidden sm:block text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
              {isAr ? "فيصل" : "Faisal"}
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          {[
            {
              href: isAr ? "/ar/#projects" : "/#projects",
              label: isAr ? "المشاريع" : "Projects",
            },
            { href: getLink("#skills"), label: isAr ? "المهارات" : "Skills" },
            {
              href: isAr ? "/ar/contact" : "/contact",
              label: isAr ? "تواصل معي" : "Contact",
            },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleHashClick(e, link.href)}
              className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/5 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300 group-hover:w-1/2" />
            </Link>
          ))}

          <div className="w-px h-6 bg-white/10 mx-2" />

          <a
            href={switchLangUrl()}
            onClick={handleLangSwitch}
            className="relative px-4 py-2 text-sm font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 hover:border-blue-500/30 hover:scale-105 overflow-hidden group"
          >
            <span className="relative z-10">{isAr ? "EN" : "عربي"}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative z-50 w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none hover:bg-white/10 transition-all duration-300"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col justify-center items-center w-6 h-5">
            <span
              className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-1" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white rounded-full my-1 transition-all duration-300 ${
                isOpen ? "opacity-0 scale-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`absolute top-full left-0 w-full h-screen bg-gray-950/98 backdrop-blur-2xl z-40 transition-all duration-500 md:hidden -mt-20 ${
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }`}
        >
          <div className="relative z-10 flex flex-col justify-center items-center h-full gap-2 px-6">
            {[
              {
                href: getLink("#projects"),
                label: isAr ? "المشاريع" : "Projects",
                icon: "📁",
              },
              {
                href: getLink("#skills"),
                label: isAr ? "المهارات" : "Skills",
                icon: "⚡",
              },
              {
                href: isAr ? "/ar/contact" : "/contact",
                label: isAr ? "تواصل معي" : "Contact",
                icon: "✉️",
              },
            ].map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  handleHashClick(e, link.href);
                  setIsOpen(false);
                }}
                className={`w-full max-w-sm flex items-center gap-4 px-6 py-5 rounded-2xl text-xl font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform ${
                  isOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 75 + 100}ms` }}
              >
                <span className="text-2xl">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
            {/* Language switch link - uses full page reload */}
            <a
              href={switchLangUrl()}
              onClick={(e) => {
                handleLangSwitch(e);
                setIsOpen(false);
              }}
              className={`w-full max-w-sm flex items-center gap-4 px-6 py-5 rounded-2xl text-xl font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${3 * 75 + 100}ms` }}
            >
              <span className="text-2xl">🌐</span>
              <span>{isAr ? "English" : "عربي"}</span>
            </a>
          </div>

          {/* Animated background elements in mobile menu */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl animate-pulse pointer-events-none" />
          <div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl animate-pulse pointer-events-none"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </div>
    </nav>
  );
}
