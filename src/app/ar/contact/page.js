import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ContactPageJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

const BASE_URL = "https://fs-17.github.io";

export const metadata = {
  title: "تواصل معي",
  description:
    "تواصل مع فيصل السويد - مطور برمجيات متخصص. دعنا نناقش مشروعك في تطوير الويب أو تطبيقات الجوال أو الذكاء الاصطناعي. متاح للعمل الحر والتعاون.",
  keywords: [
    "تواصل مع فيصل السويد",
    "توظيف مطور برمجيات",
    "مطور حر",
    "خدمات تطوير الويب",
    "تطوير تطبيقات الجوال",
    "حلول الذكاء الاصطناعي",
    "مطور سعودي",
  ],
  alternates: {
    canonical: `${BASE_URL}/ar/contact`,
    languages: {
      en: `${BASE_URL}/contact`,
      ar: `${BASE_URL}/ar/contact`,
    },
  },
  openGraph: {
    title: "تواصل مع فيصل السويد | مطور برمجيات",
    description:
      "تواصل معي لمناقشة مشروعك القادم في الويب أو الجوال أو الذكاء الاصطناعي. متاح للعمل الحر والتعاون.",
    url: `${BASE_URL}/ar/contact`,
    images: [
      {
        url: "/main.png",
        width: 1200,
        height: 630,
        alt: "تواصل مع فيصل السويد",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "تواصل مع فيصل السويد | مطور برمجيات",
    description:
      "تواصل معي لمناقشة مشروعك القادم في الويب أو الجوال أو الذكاء الاصطناعي.",
    images: ["/main.png"],
  },
};

export default function Contact() {
  const breadcrumbItems = [
    { name: "الرئيسية", url: "/ar" },
    { name: "تواصل معي", url: "/ar/contact" },
  ];

  return (
    <div
      className="min-h-screen overflow-x-hidden font-tajawal noise-overlay"
      dir="rtl"
    >
      <ContactPageJsonLd lang="ar" />
      <BreadcrumbJsonLd items={breadcrumbItems} lang="ar" />
      <Navbar lang="ar" />

      {/* Contact Form Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden pt-32 pb-20 grid-pattern">
        {/* Animated background orbs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-500/10 blur-[100px] bg-hero-anim1"></div>
          <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-purple-600/15 to-pink-500/10 blur-[80px] bg-hero-anim2"></div>
          <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-cyan-500/15 to-teal-500/10 blur-[60px] bg-hero-anim3"></div>
        </div>

        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6">
                تواصل معي
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="block bg-gradient-to-l from-white via-blue-100 to-white bg-clip-text text-transparent">
                  لنبني
                </span>
                <span className="bg-gradient-to-l from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent animate-gradient">
                  شيئاً مذهلاً معاً
                </span>
              </h1>
              <p className="text-gray-400 text-lg max-w-xl mx-auto">
                لديك مشروع في ذهنك؟ أود أن أسمع عنه. أرسل لي رسالة ودعنا نحول
                أفكارك إلى واقع.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <form
                  action="https://formspree.io/f/meoqgndl"
                  method="POST"
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        الاسم
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="محمد أحمد"
                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-600 text-white input-glow"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        البريد أو الهاتف
                      </label>
                      <input
                        type="text"
                        name="contact"
                        required
                        placeholder="example@email.com"
                        pattern="^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|(\+?[0-9\s-]{10,})$"
                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-600 text-white input-glow"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      رسالتك
                    </label>
                    <textarea
                      name="message"
                      rows="6"
                      required
                      placeholder="أخبرني عن مشروعك..."
                      className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-600 text-white resize-none input-glow"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary group w-full px-8 py-4 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-3"
                  >
                    <span>إرسال الرسالة</span>
                    <svg
                      className="w-5 h-5 transition-transform group-hover:-translate-x-1 rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </form>
              </div>

              {/* Contact Info Cards */}
              <div className="lg:col-span-2 space-y-6">
                <a
                  href="mailto:FaisalSaweed@gmail.com"
                  className="group flex items-start gap-4 p-6 rounded-2xl glass-card hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 mb-1">
                      البريد الإلكتروني
                    </h3>
                    <p className="text-white font-medium" dir="ltr">
                      FaisalSaweed@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/faisalalsaweed/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-6 rounded-2xl glass-card hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-400/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 mb-1">لينكدإن</h3>
                    <p className="text-white font-medium">faisalalsaweed</p>
                  </div>
                </a>

                <a
                  href="https://github.com/FS-17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-6 rounded-2xl glass-card hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-400/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 mb-1">GitHub</h3>
                    <p className="text-white font-medium">FS-17</p>
                  </div>
                </a>

                {/* Response time badge */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </div>
                    <span className="text-green-400 font-medium text-sm">
                      متاح الآن
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    عادة ما أرد خلال 24 ساعة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer lang="ar" />
    </div>
  );
}
