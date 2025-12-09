import fs from "fs";
import path from "path";

const projectsDirectory = path.join(process.cwd(), "src/data/projects");

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

    // Use filename as slug
    const slug = filename.replace(/\.json$/, "");

    return {
      ...project,
      slug,
    };
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
