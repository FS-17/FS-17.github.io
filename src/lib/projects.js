import fs from "fs";
import path from "path";

const projectsDirectory = path.join(process.cwd(), "src/data/projects");

// Define project priority/order here (based on slug/filename without .json)
const PROJECT_PRIORITY = [
  "focus-consultancy",
  "nupco-interactive-hub",
  "mewa-gamification",
  "dronehunter-systems",
  "spl-values-challenge",

  // Add other project slugs here to control their order
];

export function getProjects(lang = "en") {
  const dir = path.join(projectsDirectory, lang);

  // Check if directory exists
  if (!fs.existsSync(dir)) {
    console.warn(`Projects directory not found: ${dir}`);
    return [];
  }

  const filenames = fs.readdirSync(dir);

  const projects = filenames.map((filename) => {
    const filePath = path.join(dir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const project = JSON.parse(fileContents);

    // Sync categories from English version if lang is not 'en'
    if (lang !== "en") {
      try {
        const enFilePath = path.join(projectsDirectory, "en", filename);
        if (fs.existsSync(enFilePath)) {
          const enFileContents = fs.readFileSync(enFilePath, "utf8");
          const enProject = JSON.parse(enFileContents);
          if (enProject.categories) {
            project.categories = enProject.categories;
          }
        }
      } catch (e) {
        console.warn(`Failed to sync categories for ${filename}`, e);
      }
    }

    // Use filename as slug
    const slug = filename.replace(/\.json$/, "");

    return {
      ...project,
      slug,
    };
  });

  // Sort projects based on priority
  projects.sort((a, b) => {
    const indexA = PROJECT_PRIORITY.indexOf(a.slug);
    const indexB = PROJECT_PRIORITY.indexOf(b.slug);

    // If both are in the list, sort by their order in PROJECT_PRIORITY
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }

    // If only 'a' is in the list, it comes first
    if (indexA !== -1) return -1;

    // If only 'b' is in the list, it comes first
    if (indexB !== -1) return 1;

    // For items not in the list, sort alphabetically by slug
    return a.slug.localeCompare(b.slug);
  });

  return projects;
}

export function getProjectBySlug(slug, lang = "en") {
  const dir = path.join(projectsDirectory, lang);
  const filePath = path.join(dir, `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const project = JSON.parse(fileContents);

  return {
    ...project,
    slug,
  };
}
