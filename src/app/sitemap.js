import { getProjects } from "@/lib/projects";

// Required for static export
export const dynamic = "force-static";

const BASE_URL = "https://fs-17.github.io";

export default function sitemap() {
  // Get all projects for both languages
  const enProjects = getProjects("en").filter((p) => !p.hidden);
  const arProjects = getProjects("ar").filter((p) => !p.hidden);

  // Static pages
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: BASE_URL,
          ar: `${BASE_URL}/ar`,
        },
      },
    },
    {
      url: `${BASE_URL}/ar`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: BASE_URL,
          ar: `${BASE_URL}/ar`,
        },
      },
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${BASE_URL}/projects`,
          ar: `${BASE_URL}/ar/projects`,
        },
      },
    },
    {
      url: `${BASE_URL}/ar/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${BASE_URL}/projects`,
          ar: `${BASE_URL}/ar/projects`,
        },
      },
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${BASE_URL}/contact`,
          ar: `${BASE_URL}/ar/contact`,
        },
      },
    },
    {
      url: `${BASE_URL}/ar/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${BASE_URL}/contact`,
          ar: `${BASE_URL}/ar/contact`,
        },
      },
    },
  ];

  // English project pages
  const enProjectPages = enProjects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
    alternates: {
      languages: {
        en: `${BASE_URL}/projects/${project.slug}`,
        ar: `${BASE_URL}/ar/projects/${project.slug}`,
      },
    },
  }));

  // Arabic project pages
  const arProjectPages = arProjects.map((project) => ({
    url: `${BASE_URL}/ar/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
    alternates: {
      languages: {
        en: `${BASE_URL}/projects/${project.slug}`,
        ar: `${BASE_URL}/ar/projects/${project.slug}`,
      },
    },
  }));

  return [...staticPages, ...enProjectPages, ...arProjectPages];
}
