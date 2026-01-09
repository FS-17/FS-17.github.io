import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoTrio from "@/components/VideoTrio";
import { ProjectJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { getProjects, getProjectBySlug } from "@/lib/projects";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

const BASE_URL = "https://fs-17.github.io";

export async function generateStaticParams() {
  const projects = getProjects("en");
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "en");
  if (!project) return {};

  const title = project.metaTitle || `${project.title} | Project Details`;
  const description =
    project.metaDescription ||
    `Explore ${project.title} - A project by Faisal Alsaweed featuring ${
      project.categories?.join(", ") || "innovative solutions"
    }.`;
  const thumbnail = project.thumbnail || "/main.png";

  return {
    title,
    description,
    keywords: [
      project.title,
      ...(project.categories || []),
      "Faisal Alsaweed",
      "Portfolio Project",
      project.client || "",
    ].filter(Boolean),
    alternates: {
      canonical: `${BASE_URL}/projects/${slug}`,
      languages: {
        en: `${BASE_URL}/projects/${slug}`,
        ar: `${BASE_URL}/ar/projects/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/projects/${slug}`,
      type: "article",
      images: [
        {
          url: thumbnail,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [thumbnail],
    },
  };
}

function convertBoldText(text) {
  if (!text) return "";
  const parts = text.split("*");
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-bold text-blue-400">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

function sizeToColSpan(size) {
  if (!size) return "col-span-1 md:col-span-12";
  if (size == 3) return "col-span-1 md:col-span-3";
  if (size == 4) return "col-span-1 md:col-span-4";
  if (size == 6) return "col-span-1 md:col-span-6";
  if (size == 8) return "col-span-1 md:col-span-8";
  if (size == 9) return "col-span-1 md:col-span-9";
  return "col-span-1 md:col-span-12";
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "en");

  if (!project) {
    notFound();
  }

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
    { name: project.title, url: `/projects/${slug}` },
  ];

  return (
    <div className="min-h-screen font-sans bg-grid-white relative">
      {/* JSON-LD Structured Data */}
      <ProjectJsonLd project={project} lang="en" />
      <BreadcrumbJsonLd items={breadcrumbItems} lang="en" />

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gray-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none -z-10"></div>
      <Navbar lang="en" />

      <main className="pt-32 pb-20 container mx-auto px-6 relative">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/projects"
            className="text-blue-400 hover:text-blue-300 mb-6 inline-flex items-center transition-colors"
          >
            <i className="fas fa-arrow-left mr-2"></i> Back to Projects
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-gray-400 mb-8">
            {project.client && (
              <span className="flex items-center gap-2">
                <i className="fas fa-user text-blue-500"></i> {project.client}
              </span>
            )}
            {project.event && (
              <span className="flex items-center gap-2">
                <i className="fas fa-calendar-check text-blue-500"></i>{" "}
                {project.event}
              </span>
            )}
            {project.date && (
              <span className="flex items-center gap-2">
                <i className="fas fa-calendar text-blue-500"></i> {project.date}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.categories &&
              project.categories.map((cat, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300"
                >
                  {cat}
                </span>
              ))}
            {project.tags &&
              project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-gray-300"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>

        {/* Media Grid */}
        {project.media && project.media.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {project.media
              .filter((item) => item.type !== "logo" && item.type !== "preview")
              .map((item, index) => (
                <div
                  key={index}
                  className={`rounded-3xl overflow-hidden shadow-lg glass ${
                    item.type === "video" ||
                    item.type === "embedded" ||
                    item.type === "audio"
                      ? "col-span-1 md:col-span-2"
                      : ""
                  }`}
                >
                  {item.type === "video" ? (
                    <div className="relative pt-[56.25%]">
                      <video
                        controls
                        className="absolute inset-0 w-full h-full object-contain bg-black"
                      >
                        <source src={item.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : item.type === "audio" ? (
                    <div className="p-6 flex flex-col items-center justify-center bg-gray-800/50 h-full min-h-[150px]">
                      <div className="w-full mb-4 text-center">
                        <i className="fas fa-music text-3xl text-blue-400 mb-2"></i>
                      </div>
                      <audio controls className="w-full">
                        <source src={item.url} />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  ) : item.type === "embedded" ? (
                    <div
                      className="w-full"
                      dangerouslySetInnerHTML={{ __html: item.url }}
                    />
                  ) : (
                    <img
                      src={item.url}
                      alt={item.alt || item.caption || project.title}
                      className="w-full max-h-[800px] object-contain mx-auto"
                    />
                  )}
                  {item.caption && (
                    <p className="p-4 text-gray-400 text-center text-sm border-t border-white/5">
                      {item.caption}
                    </p>
                  )}
                </div>
              ))}
          </div>
        )}

        {/* Description */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-blue-400 border-b border-blue-500/20 pb-2 inline-block">
            Overview
          </h2>
          <div className="text-gray-300 leading-relaxed text-lg grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {Array.isArray(project.content || project.description) ? (
              (project.content || project.description).map((item, index) => {
                const colSpanClass = sizeToColSpan(item.grid);

                if (item.type === "text") {
                  return (
                    <div
                      key={index}
                      className={`prose prose-invert max-w-none ${colSpanClass}`}
                    >
                      {item.value.split("\n").map((line, lineIdx) => (
                        <p key={lineIdx} className="m-0">
                          {convertBoldText(line)}
                        </p>
                      ))}
                    </div>
                  );
                } else if (item.type === "md") {
                  return (
                    <div
                      key={index}
                      className={`prose prose-invert max-w-none p-6 bg-gray-800/50 rounded-xl border border-white/5 shadow-inner ${colSpanClass}`}
                    >
                      <ReactMarkdown>{item.value}</ReactMarkdown>
                    </div>
                  );
                } else if (item.type === "impact-cards") {
                  const cards = item.items || [];
                  const highlights = item.highlights || [];
                  return (
                    <div
                      key={index}
                      className={`glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden ${colSpanClass}`}
                    >
                      {/* Background gradient accent */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 pointer-events-none" />

                      <div className="relative flex flex-col gap-6">
                        {/* Header */}
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="px-4 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-300 uppercase tracking-[0.15em]">
                            <i className="fas fa-chart-line mr-2"></i>
                            {item.title || "Impact"}
                          </div>
                          <div className="h-px flex-1 bg-gradient-to-r from-blue-500/30 to-transparent" />
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {cards.map((card, i) => (
                            <div
                              key={i}
                              className="group rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 px-4 py-5 text-center transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
                            >
                              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                {card.value}
                              </div>
                              <div className="text-sm text-gray-400 mt-2 font-medium">
                                {card.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Highlights */}
                        {highlights.length > 0 && (
                          <div className="grid md:grid-cols-2 gap-3">
                            {highlights.map((h, idx) => (
                              <div
                                key={idx}
                                className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-4 py-3 text-sm text-gray-300 flex items-start gap-3 transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/10"
                              >
                                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 shadow-sm shadow-cyan-400/50"></span>
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Result */}
                        {item.result && (
                          <div className="rounded-xl border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-5 py-4 text-gray-200 text-sm flex items-start gap-3">
                            <i className="fas fa-trophy text-purple-400 mt-0.5"></i>
                            <span className="leading-relaxed">
                              {item.result}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                } else if (item.type === "tech-showcase") {
                  const specs = item.specs || [];
                  const capabilities = item.capabilities || [];
                  return (
                    <div
                      key={index}
                      className={`relative overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 p-6 md:p-10 ${colSpanClass}`}
                    >
                      {/* Animated background grid */}
                      <div className="absolute inset-0 opacity-20">
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage:
                              "linear-gradient(rgba(255, 111, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 111, 0, 0.1) 1px, transparent 1px)",
                            backgroundSize: "50px 50px",
                          }}
                        ></div>
                      </div>

                      {/* Corner accents */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full"></div>
                      <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-600/10 blur-3xl rounded-full"></div>

                      <div className="relative flex flex-col gap-8">
                        {/* Header */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-1 h-12 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                            <div>
                              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                                {item.title || "Technical Specifications"}
                              </h3>
                              {item.subtitle && (
                                <p className="text-sm text-gray-400 mt-1">
                                  {item.subtitle}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Specifications Grid */}
                        {specs.length > 0 && (
                          <div className="grid md:grid-cols-2 gap-6">
                            {specs.map((spec, i) => (
                              <div
                                key={i}
                                className="group relative overflow-hidden rounded-xl border border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-transparent p-5 transition-all duration-300 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <i
                                        className={`${
                                          spec.icon || "fas fa-microchip"
                                        } text-orange-400 text-lg`}
                                      ></i>
                                      <h4 className="font-semibold text-white">
                                        {spec.label}
                                      </h4>
                                    </div>
                                    <div className="text-3xl font-bold bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
                                      {spec.value}
                                    </div>
                                    {spec.description && (
                                      <p className="text-xs text-gray-400 mt-2">
                                        {spec.description}
                                      </p>
                                    )}
                                  </div>
                                  {spec.percentage && (
                                    <div className="relative w-16 h-16">
                                      <svg className="transform -rotate-90 w-16 h-16">
                                        <circle
                                          cx="32"
                                          cy="32"
                                          r="28"
                                          stroke="currentColor"
                                          strokeWidth="4"
                                          fill="none"
                                          className="text-gray-700"
                                        />
                                        <circle
                                          cx="32"
                                          cy="32"
                                          r="28"
                                          stroke="currentColor"
                                          strokeWidth="4"
                                          fill="none"
                                          strokeDasharray={`${
                                            2 * Math.PI * 28
                                          }`}
                                          strokeDashoffset={`${
                                            2 *
                                            Math.PI *
                                            28 *
                                            (1 - spec.percentage / 100)
                                          }`}
                                          className="text-orange-500 transition-all duration-1000"
                                          strokeLinecap="round"
                                        />
                                      </svg>
                                      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-orange-400">
                                        {spec.percentage}%
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Capabilities */}
                        {capabilities.length > 0 && (
                          <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-orange-400 uppercase tracking-wider flex items-center gap-2">
                              <i className="fas fa-bolt"></i>
                              Key Capabilities
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              {capabilities.map((cap, idx) => (
                                <div key={idx} className="relative">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-300">
                                      {cap.name}
                                    </span>
                                    <span className="text-sm font-bold text-orange-400">
                                      {cap.level}%
                                    </span>
                                  </div>
                                  <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-1000 ease-out"
                                      style={{ width: `${cap.level}%` }}
                                    >
                                      <div className="h-full w-full bg-white/20 animate-pulse"></div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Footer note */}
                        {item.note && (
                          <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20">
                            <i className="fas fa-info-circle text-orange-400 mt-0.5"></i>
                            <p className="text-sm text-gray-300 leading-relaxed">
                              {item.note}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                } else if (item.type === "embedded") {
                  return (
                    <div
                      key={index}
                      className={`rounded-xl overflow-hidden bg-gray-900/40 border border-white/5 shadow-lg ${colSpanClass}`}
                      dangerouslySetInnerHTML={{
                        __html: item.url || item.value,
                      }}
                    />
                  );
                } else if (item.type === "image" || item.type === "gif") {
                  const widthPercent =
                    typeof item.size === "number"
                      ? Math.min(Math.max(item.size, 0), 100)
                      : 100;
                  return (
                    <div key={index} className={colSpanClass}>
                      <img
                        src={item.value}
                        alt={item.caption || `Project detail ${index}`}
                        className="rounded-xl shadow-lg mx-auto"
                        style={{ width: `${widthPercent}%`, maxWidth: "100%" }}
                      />
                      {item.caption && (
                        <p className="text-center text-sm text-gray-400 mt-2">
                          {item.caption}
                        </p>
                      )}
                    </div>
                  );
                } else if (item.type === "mobile") {
                  return (
                    <div key={index} className={colSpanClass}>
                      <div className="bg-gray-900/60 border border-white/5 rounded-2xl shadow-2xl p-4 md:p-6 flex flex-col md:flex-row gap-6 items-center">
                        <div className="relative w-full md:w-80 lg:w-96">
                          <div
                            className="absolute -inset-[2px] rounded-[26px] bg-gradient-to-b from-white/20 via-white/5 to-transparent opacity-60 pointer-events-none"
                            aria-hidden="true"
                          ></div>
                          <div className="relative rounded-[24px] overflow-hidden shadow-xl border border-white/10 bg-gradient-to-b from-gray-900/60 via-gray-900/20 to-gray-800/10 backdrop-blur flex justify-center">
                            <video
                              controls
                              className="w-full h-auto max-h-[900px] object-contain bg-black rounded-[22px]"
                            >
                              <source src={item.value} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                          <div className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-white/10 text-white/80 backdrop-blur">
                            Mobile preview
                          </div>
                        </div>

                        <div className="w-full text-sm text-gray-300 space-y-3 md:text-left text-center">
                          <p className="text-gray-200 font-semibold">
                            How it looks on phone
                          </p>
                          {item.caption && (
                            <p className="leading-relaxed text-gray-300">
                              {item.caption}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 uppercase tracking-[0.12em]">
                            Tap to play / pause
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                } else if (item.type === "video") {
                  return (
                    <div key={index} className={colSpanClass}>
                      <div className="bg-gray-900/60 border border-white/5 rounded-2xl shadow-2xl p-4 md:p-6 flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-full md:w-1/2">
                          <div className="rounded-xl overflow-hidden shadow-lg bg-black border border-white/10">
                            <video
                              controls
                              className="w-full h-auto max-h-[600px] mx-auto"
                            >
                              <source src={item.value} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        </div>
                        {(item.caption || item.text) && (
                          <div className="w-full md:w-1/2 text-sm text-gray-300 space-y-3 md:text-left text-center">
                            {item.text && (
                              <p className="text-gray-200 font-semibold text-lg">
                                {item.text}
                              </p>
                            )}
                            {item.caption && (
                              <p className="leading-relaxed text-gray-300">
                                {item.caption}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                } else if (item.type === "video-trio") {
                  return <VideoTrio key={index} item={item} />;
                } else if (item.type === "feature-list") {
                  return (
                    <div key={index} className={colSpanClass}>
                      {item.title && (
                        <h3 className="text-2xl font-bold mb-6 text-blue-400 border-b border-blue-500/20 pb-2 inline-block">
                          {item.title}
                        </h3>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {item.items.map((feature, fIdx) => (
                          <div
                            key={fIdx}
                            className="glass-card p-6 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors group"
                          >
                            <div className="flex items-start gap-4">
                              {feature.icon && (
                                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all">
                                  <i className={`${feature.icon} text-xl`}></i>
                                </div>
                              )}
                              <div>
                                <h4 className="text-lg font-bold text-gray-200 mb-2 group-hover:text-blue-300 transition-colors">
                                  {feature.title}
                                </h4>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                  {convertBoldText(feature.description)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                } else if (item.type === "audio") {
                  return (
                    <div
                      key={index}
                      className={`p-4 bg-gray-800/50 rounded-xl ${colSpanClass}`}
                    >
                      <div className="flex flex-col gap-2">
                        {item.caption && (
                          <p className="text-sm text-gray-300 mb-2">
                            {item.caption}
                          </p>
                        )}
                        <audio controls className="w-full">
                          <source src={item.value} />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    </div>
                  );
                }
                return null;
              })
            ) : (
              <div className="col-span-1 md:col-span-2">
                {convertBoldText(project.description)}
              </div>
            )}
          </div>
        </div>

        {/* Objectives */}
        {project.objectives && project.objectives.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-blue-400 border-b border-blue-500/20 pb-2 inline-block">
              Objectives
            </h2>
            <ul className="list-disc list-inside space-y-3 text-gray-300">
              {project.objectives.map((obj, index) => (
                <li key={index} className="leading-relaxed">
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Functionality */}
        {project.functionality && project.functionality.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-blue-400 border-b border-blue-500/20 pb-2 inline-block">
              Key Features
            </h2>
            <div className="space-y-6">
              {project.functionality.map((func, index) => (
                <div key={index} className="pl-4 border-l-2 border-blue-500/30">
                  <h4 className="text-lg font-semibold text-blue-400 mb-2">
                    {func.featureName}
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {convertBoldText(func.description)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenges */}
        {project.challenges && project.challenges.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-blue-400 border-b border-blue-500/20 pb-2 inline-block">
              Challenges & Solutions
            </h2>
            <div className="space-y-6">
              {project.challenges.map((challenge, index) => (
                <div key={index} className="glass rounded-xl p-6">
                  {typeof challenge === "string" ? (
                    <div className="mb-4">
                      <span className="font-semibold text-red-400 block mb-1">
                        Challenge:
                      </span>
                      <p className="text-gray-300">{challenge}</p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4">
                        <span className="font-semibold text-red-400 block mb-1">
                          Challenge:
                        </span>
                        <p className="text-gray-300">{challenge.challenge}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-green-400 block mb-1">
                          Solution:
                        </span>
                        <p className="text-gray-300">{challenge.solution}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-4 pt-8 border-t border-white/10">
          {project.linkToProject && (
            <a
              href={project.linkToProject}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white text-gray-900 font-bold hover:scale-105 transition-transform flex items-center gap-2"
            >
              <i className="fas fa-external-link-alt"></i> Live Demo
            </a>
          )}
          {project.repository && (
            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full glass hover:bg-white/10 text-white font-semibold transition-all flex items-center gap-2"
            >
              <i className="fab fa-github"></i> View Code
            </a>
          )}
        </div>
      </main>

      <Footer lang="en" />
    </div>
  );
}
