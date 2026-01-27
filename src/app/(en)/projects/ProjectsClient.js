"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { getProjectCategories } from "@/lib/projectUtils";

export default function ProjectsClient({ projects }) {
  const [filter, setFilter] = useState("all");

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    return getProjectCategories(project).includes(filter);
  });

  const filterLabels = {
    all: { label: "All Projects", icon: "🚀" },
    web: { label: "Web", icon: "🌐" },
    mobile: { label: "Mobile", icon: "📱" },
    backend: { label: "Backend & AI", icon: "⚙️" },
  };

  return (
    <div className="min-h-screen overflow-x-hidden noise-overlay">
      <Navbar lang="en" />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute top-0 left-0 right-0 h-[800px] -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-500/10 blur-[100px] bg-hero-anim1"></div>
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-purple-600/15 to-pink-500/10 blur-[80px] bg-hero-anim2"></div>
        </div>

        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-6">
              Portfolio
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                My Projects
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Explore my projects and contributions
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="pb-20 relative">
        <div className="container mx-auto px-6">
          {/* Projects Filter */}
          <div className="mb-12 flex flex-wrap gap-3 justify-center">
            {Object.entries(filterLabels).map(([key, { label, icon }]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  filter === key
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25"
                    : "glass-card text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="text-lg">{icon}</span>
                <span>{label}</span>
                {filter === key && (
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-xs">
                    {filteredProjects.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} lang="en" />
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-800/50 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer lang="en" />
    </div>
  );
}
