import ProjectsClient from "./ProjectsClient";
import { getProjects } from "@/lib/projects";

const BASE_URL = "https://fs-17.github.io";

export const metadata = {
  title: "المشاريع ومعرض الأعمال",
  description:
    "استكشف معرض أعمال فيصل السويد من المشاريع المبتكرة بما في ذلك تطبيقات الويب وتطبيقات الجوال وحلول الذكاء الاصطناعي والتجارب التفاعلية وبرمجيات المؤسسات.",
  keywords: [
    "مشاريع تطوير الويب",
    "معرض تطبيقات الجوال",
    "مشاريع الذكاء الاصطناعي",
    "تطبيقات React",
    "مشاريع Next.js",
    "حلول تفاعلية",
    "معرض برمجيات",
    "مشاريع فيصل السويد",
  ],
  alternates: {
    canonical: `${BASE_URL}/ar/projects`,
    languages: {
      en: `${BASE_URL}/projects`,
      ar: `${BASE_URL}/ar/projects`,
    },
  },
  openGraph: {
    title: "المشاريع ومعرض الأعمال | فيصل السويد",
    description:
      "استكشف تطبيقات الويب المبتكرة وتطبيقات الجوال وحلول الذكاء الاصطناعي والتجارب التفاعلية.",
    url: `${BASE_URL}/ar/projects`,
    images: [
      {
        url: "/main.png",
        width: 1200,
        height: 630,
        alt: "فيصل السويد - معرض المشاريع",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "المشاريع ومعرض الأعمال | فيصل السويد",
    description:
      "استكشف تطبيقات الويب المبتكرة وتطبيقات الجوال وحلول الذكاء الاصطناعي والتجارب التفاعلية.",
    images: ["/main.png"],
  },
};

export default function ProjectsPage() {
  const allProjects = getProjects("ar").filter((p) => !p.hidden);
  return <ProjectsClient projects={allProjects} />;
}
