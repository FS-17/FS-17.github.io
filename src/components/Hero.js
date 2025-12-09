"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Hero({ lang = "en" }) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles =
    lang === "ar"
      ? ["مطور برمجيات", "مهندس واجهات", "محب للتقنية", "مطور ذكاء اصطناعي"]
      : [
          "Software Developer",
          "Full Stack Engineer",
          "UI/UX Enthusiast",
          "Problem Solver",
          "AI Developer",
        ];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 100);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, roles]);

  const isAr = lang === "ar";

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden grid-pattern"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-600/30 to-cyan-500/20 blur-[100px] bg-hero-anim1"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-purple-600/25 to-pink-500/15 blur-[80px] bg-hero-anim2"></div>
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-cyan-500/20 to-teal-500/15 blur-[60px] bg-hero-anim3"></div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="relative z-10 max-w-4xl">
          {/* Status badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-card mb-4 text-reveal hover:scale-105 transition-transform duration-300 cursor-default border border-green-500/20 hover:border-green-500/40">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <span className="text-sm font-medium text-gray-300">
              {isAr ? "متاح لمشاريع جديدة" : "Available for new projects"}
            </span>
          </div>

          {/* Main heading */}
          <h1
            className={`text-6xl md:text-8xl lg:text-9xl font-black mb-6 text-reveal text-reveal-delay-1 ${
              isAr ? "" : "tracking-tight"
            }`}
          >
            <span className="block bg-gradient-to-r from-white via-blue-200 to-white bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient py-2">
              {isAr ? "فيصل" : "FAISAL"}
            </span>
          </h1>

          {/* Role with animated gradient and typing effect */}
          <div className="text-2xl md:text-3xl lg:text-4xl font-light mb-8 text-reveal text-reveal-delay-2 h-12 flex items-center gap-1">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent animate-gradient">
              {text}
            </span>
            <span className="w-1 h-8 bg-blue-400 animate-pulse"></span>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed text-reveal text-reveal-delay-3">
            {isAr
              ? "بناء تجارب رقمية استثنائية بكود نظيف وحلول إبداعية."
              : "Building exceptional digital experiences with clean code and creative solutions."}

            <span className="block mt-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] transition-all duration-300 transform hover:-translate-y-0.5">
                <span className="text-xl">🏆</span>
                <span className="font-bold bg-gradient-to-r from-blue-200 via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                  {isAr
                    ? "المركز 6 عالمياً في منصة سطر"
                    : "Ranked 6th Worldwide on SATR"}
                </span>
              </span>
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 text-reveal text-reveal-delay-4">
            <Link
              href="/contact"
              className="btn-primary group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white font-semibold text-lg overflow-hidden"
            >
              <span>{isAr ? "تواصل معي" : "Let's Talk"}</span>
              <svg
                className={`w-5 h-5 transition-transform ${
                  isAr
                    ? "group-hover:-translate-x-1 rotate-180"
                    : "group-hover:translate-x-1"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="projects"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl glass-card text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300"
            >
              <span>{isAr ? "عرض المشاريع" : "View Projects"}</span>
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-gray-500 animate-bounce">
          <span className="text-xs uppercase tracking-widest">
            {isAr ? "تمرير" : "Scroll"}
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
