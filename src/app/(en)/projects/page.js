import ProjectsClient from "./ProjectsClient";
import { getProjects } from "@/lib/projects";

export default function ProjectsPage() {
  const allProjects = getProjects("en").filter((p) => !p.hidden);
  return <ProjectsClient projects={allProjects} />;
}
