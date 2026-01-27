"use client";

import { useState, useEffect, useRef } from "react";

const testimonialData = {
  ar: [
    {
      id: 1,
      name: "ندى احمد",
      role: "CEO of Focus Consultancy",
      content:
        "احترافية ومرونه في التعامل الموقع جميل جدا والتسليم بالوقت وقبل الوقت التواصل فوق الممتاز الاستجابة للتعديلات فورية",
      avatar: "ن",
      rating: 5,
      date: "21.11.2025",
    },
    {
      id: 2,
      name: "عبدالرحمن الغالبي",
      role: "مؤسس مكتب الغالبي للمحاماة",
      content:
        "تنفيذ احترافي عالي المستوى. قام بتحويل هوية مكتب المحاماة الخاص بنا إلى موقع ويب سريع وآمن ونفذ أفضل استراتيجيات تحسين محركات البحث لضمان تصدرنا في الترتيب. قدم دعمًا استثنائيًا في الإعداد الفني.",
      avatar: "A",
      rating: 5,
      date: "07.06.2025",
    },
  ],
  en: [
    {
      id: 1,
      name: "Nada Ahmed",
      role: "CEO of Focus Consultancy",
      content:
        "Professionalism and flexibility in dealing with the project. The website is very beautiful, delivered on time and even earlier. Communication is excellent, and responses to modifications are immediate.",
      avatar: "N",
      rating: 5,
      date: "21.11.2025",
    },
    {
      id: 2,
      name: "Abdulrhman Alghalbi",
      role: "Founder of Alghalbi Law Firm",
      content:
        "Highly professional execution. He transformed our law firm's identity into a fast, secure website and implemented the best SEO strategies to ensure we rank high. He provided exceptional support with the technical setup.",
      avatar: "A",
      rating: 5,
      date: "07.06.2025",
    },
  ],
};

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-400" : "text-gray-600"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, isAr }) {
  return (
    <div className="testimonial-card group relative p-8 rounded-2xl glass-card border border-white/5 flex flex-col h-full overflow-hidden transition-all duration-500 hover:border-blue-500/30 hover:-translate-y-2 hover:shadow-">
      {/* Hover gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset- rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-sm" />
      </div>

      {/* Quote icon */}
      <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
        <svg
          className="w-12 h-12 text-blue-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      <div className="relative z-10 flex-grow">
        {/* Rating and Date */}
        <div className="flex justify-between items-start mb-4">
          <StarRating rating={testimonial.rating} />
          {testimonial.date && (
            <span className="text-sm text-gray-500 font-mono">
              {testimonial.date}
            </span>
          )}
        </div>

        {/* Content */}
        <p className="text-gray-300 leading-relaxed mb-6 text-base">
          &ldquo;{testimonial.content}&rdquo;
        </p>
      </div>

      {/* Author */}
      <div
        className={`relative z-10 flex items-center gap-4 pt-6 border-t border-white/5 ${
          isAr ? "flex-row-reverse" : ""
        }`}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-blue-500/20">
          <span className="text-blue-400 font-bold text-lg">
            {testimonial.avatar}
          </span>
        </div>
        <div className={isAr ? "text-right" : "text-left"}>
          <h4 className="text-white font-semibold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
            {testimonial.name}
          </h4>
          <p className="text-gray-500 text-sm">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials({ lang = "en" }) {
  const isAr = lang === "ar";
  const testimonials = testimonialData[lang] || testimonialData.en;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef(null);

  // Auto-rotate testimonials on mobile
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  return (
    <section
      id="testimonials"
      className="py-32 relative overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Background gradient - seamless transition from Projects (blue-950/10) to Contact (transparent) */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 via-transparent to-transparent" />

      {/* Animated decorative orbs - matching site theme */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-blue-600/10 to-purple-500/5 blur-[80px] bg-hero-anim2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-gradient-to-r from-cyan-600/10 to-blue-500/5 blur-[60px] bg-hero-anim3 pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-[200px] h-[200px] rounded-full bg-gradient-to-r from-purple-500/8 to-pink-500/5 blur-[70px] bg-hero-anim1 pointer-events-none" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            {isAr ? "آراء العملاء" : "Testimonials"}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span
              className={`bg-gradient-to-${
                isAr ? "l" : "r"
              } from-blue-400  to-cyan-400 bg-clip-text text-transparent`}
            >
              {isAr ? "ماذا يقول العملاء" : "What Clients Say"}
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {isAr
              ? "آراء وتجارب العملاء الذين تشرفت بالعمل معهم"
              : "Feedback and experiences from clients I've had the pleasure of working with"}
          </p>
        </div>

        {/* Desktop Grid */}
        <div
          ref={containerRef}
          className="hidden md:grid md:grid-cols-2 gap-8"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              isAr={isAr}
            />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div
          className="md:hidden"
          onTouchStart={() => setIsAutoPlaying(false)}
          onTouchEnd={() => setIsAutoPlaying(true)}
        >
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-1">
                  <TestimonialCard testimonial={testimonial} isAr={isAr} />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-gradient-to-r from-blue-400 to-purple-400"
                    : "bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              value: isAr ? "+50" : "50+",
              label: isAr ? "مشروع مكتمل" : "Projects Completed",
            },
            {
              value: isAr ? "+30" : "30+",
              label: isAr ? "عميل سعيد" : "Happy Clients",
            },
            {
              value: isAr ? "+6" : "6+",
              label: isAr ? "سنوات خبرة" : "Years Experience",
            },
            {
              value: "100%",
              label: isAr ? "رضا العملاء" : "Client Satisfaction",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl glass-card border border-white/5 group hover:border-blue-500/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
