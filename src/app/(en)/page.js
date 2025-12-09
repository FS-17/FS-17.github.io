import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import { getProjects } from "@/lib/projects";
import Link from "next/link";

export default function Home() {
  const projects = getProjects("en").filter((p) => !p.hidden);

  return (
    <div className="min-h-screen overflow-x-hidden noise-overlay">
      <Navbar lang="en" />

      <Hero lang="en" />

      {/* Logos Section */}
      <section
        id="logos"
        className="py-12 sm:py-16 md:py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent"></div>
        {/* Floating orb */}
        <div className="absolute top-1/2 left-1/4 w-[200px] h-[200px] rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/5 blur-[60px] bg-hero-anim3 pointer-events-none"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            {/* <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3 sm:mb-4">
              Trusted Partners
            </span> */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent px-2">
              Trusted by
            </h2>
          </div>
        </div>
        <div className="slider flex justify-center w-full overflow-hidden relative">
          {/* Left shadow gradient - responsive width */}
          <div className="slider-gradient-left absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none"></div>
          {/* Right shadow gradient - responsive width */}
          <div className="slider-gradient-right absolute right-0 top-0 bottom-0 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none"></div>
          <div id="logoSlider" className="slide-track">
            {[...Array(3)].map((_, setIndex) =>
              [
                "ar",
                "mo",
                "spl",
                "ms",
                "pbs",
                "yk",
                "aw",
                "mw",
                "me",
                "np",
              ].map((logo, logoIndex) => (
                <div
                  className="slide flex items-center justify-center"
                  key={`${logo}-${setIndex}-${logoIndex}`}
                >
                  <img
                    src={`/logo/${logo}.png`}
                    alt={`${logo.toUpperCase()} Company Logo`}
                    className="logoImg"
                    loading="lazy"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-blue-950/20"></div>
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-gradient-to-r from-cyan-600/15 to-blue-500/10 blur-[80px] bg-hero-anim1 pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/5 w-[250px] h-[250px] rounded-full bg-gradient-to-r from-purple-600/10 to-pink-500/5 blur-[70px] bg-hero-anim2 pointer-events-none"></div>
        {/* Grid mesh overlay */}
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
              Technical Skills
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Skills & Expertise
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              A comprehensive toolkit for building modern, scalable applications
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Development Card */}
            <div className="skill-card p-8 rounded-2xl glass-card border border-white/5 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                Development
              </h3>
              <p className="text-gray-400 mb-6">
                Building robust applications with modern languages and best
                practices.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Python",
                  "C++",
                  "JavaScript",
                  "Dart",
                  "TypeScript",
                  "SQL",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="tag px-4 py-2 rounded-xl text-sm bg-white/5 border border-white/10 text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Frameworks Card */}
            <div className="skill-card p-8 rounded-2xl glass-card border border-white/5 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Frameworks</h3>
              <p className="text-gray-400 mb-6">
                Leveraging powerful frameworks to accelerate development.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Flutter", "Next.js", "Flask", "Node.js", "React"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="tag px-4 py-2 rounded-xl text-sm bg-white/5 border border-white/10 text-gray-300"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Infrastructure Card */}
            <div className="skill-card p-8 rounded-2xl glass-card border border-white/5 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500/20 to-green-500/20 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-teal-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                Infrastructure
              </h3>
              <p className="text-gray-400 mb-6">
                Deploying and managing scalable cloud solutions.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "AWS",
                  "GCP",
                  "Azure",
                  "Docker",
                  "Cloudflare",
                  "MongoDB",
                  "MySQL",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="tag px-4 py-2 rounded-xl text-sm bg-white/5 border border-white/10 text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-blue-950/10"></div>
        {/* Animated gradient orbs */}
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-purple-600/15 to-blue-500/10 blur-[100px] bg-hero-anim2 pointer-events-none"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-pink-600/10 to-purple-500/5 blur-[80px] bg-hero-anim1 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              A selection of projects that showcase my skills and passion for
              development
            </p>
          </div>

          <div id="projectContainer" className="grid md:grid-cols-2 gap-8">
            {projects
              .filter((p) => p.showOnHome)
              .map((project, index) => (
                <ProjectCard key={index} project={project} lang="en" />
              ))}
          </div>

          <div className="flex justify-center mt-16">
            <Link
              href="/projects"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl glass-card text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                View All Projects
              </span>
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
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
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials lang="en" />

      {/* Contact Section */}
      <section id="contact" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/30 to-transparent"></div>
        {/* Animated gradient orbs */}
        <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] rounded-full bg-gradient-to-r from-teal-600/15 to-cyan-500/10 blur-[90px] bg-hero-anim3 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[280px] h-[280px] rounded-full bg-gradient-to-r from-blue-600/10 to-green-500/5 blur-[70px] bg-hero-anim1 pointer-events-none"></div>
        {/* Decorative radial gradient */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-blue-500/10 via-transparent to-transparent blur-[50px] pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-green-500/10 text-green-400 border border-green-500/20 mb-4">
              Contact
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Let's Work Together
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-12">
              Have a project in mind? Let's create something amazing together.
            </p>

            <div className="flex flex-wrap gap-6 justify-center">
              <a
                href="mailto:FaisalSaweed@gmail.com"
                className="group flex items-center gap-4 px-8 py-5 rounded-2xl glass-card hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-blue-400"
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
                <div className="text-left">
                  <span className="block text-sm text-gray-500">
                    Email me at
                  </span>
                  <span className="text-white font-medium">
                    FaisalSaweed@gmail.com
                  </span>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/faisalalsaweed/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 px-8 py-5 rounded-2xl glass-card hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-400/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-sm text-gray-500">
                    Connect on
                  </span>
                  <span className="text-white font-medium">LinkedIn</span>
                </div>
              </a>

              <a
                href="https://github.com/FS-17"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 px-8 py-5 rounded-2xl glass-card hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-400/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-sm text-gray-500">Follow on</span>
                  <span className="text-white font-medium">GitHub</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer lang="en" />
    </div>
  );
}
