import ProjectsClient from "./ProjectsClient";
import { getProjects } from "@/lib/projects";

const BASE_URL = "https://fs-17.github.io";

export const metadata = {
  title: "Projects & Portfolio",
  description:
    "Explore Faisal Alsaweed's portfolio of innovative projects including web applications, mobile apps, AI solutions, interactive experiences, and enterprise software. See my work with React, Next.js, Python, and more.",
  keywords: [
    "Web Development Projects",
    "Mobile App Portfolio",
    "AI Projects",
    "React Applications",
    "Next.js Projects",
    "Interactive Solutions",
    "Software Portfolio",
    "Faisal Alsaweed Projects",
  ],
  alternates: {
    canonical: `${BASE_URL}/projects`,
    languages: {
      en: `${BASE_URL}/projects`,
      ar: `${BASE_URL}/ar/projects`,
    },
  },
  openGraph: {
    title: "Projects & Portfolio | Faisal Alsaweed",
    description:
      "Explore innovative web applications, mobile apps, AI solutions, and interactive experiences built by Faisal Alsaweed.",
    url: `${BASE_URL}/projects`,
    images: [
      {
        url: "/main.png",
        width: 1200,
        height: 630,
        alt: "Faisal Alsaweed - Project Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects & Portfolio | Faisal Alsaweed",
    description:
      "Explore innovative web applications, mobile apps, AI solutions, and interactive experiences.",
    images: ["/main.png"],
  },
};

export default function ProjectsPage() {
  const allProjects = getProjects("en").filter((p) => !p.hidden);
  return <ProjectsClient projects={allProjects} />;
}
