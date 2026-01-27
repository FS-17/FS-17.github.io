export function getProjectCategories(project) {
  const categories = project.categories || [];
  const cats = categories.map((c) => c.toLowerCase());
  const matched = [];

  if (
    cats.some(
      (c) =>
        c.includes("web") || c.includes("website") || c.includes("interactive"),
    )
  )
    matched.push("web");

  if (
    cats.some(
      (c) =>
        c.includes("mobile") ||
        c.includes("app") ||
        c.includes("android") ||
        c.includes("flutter"),
    )
  )
    matched.push("mobile");

  if (
    cats.some(
      (c) =>
        c.includes("bot") ||
        c.includes("backend") ||
        c.includes("ai") ||
        c.includes("python"),
    )
  )
    matched.push("backend");

  return matched.length > 0 ? matched : ["other"];
}
