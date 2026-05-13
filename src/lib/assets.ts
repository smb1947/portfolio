const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "portfolio";

export const basePath = isGitHubPages ? `/${repoName}` : "";

export function publicAsset(path: `/${string}`) {
  return `${basePath}${path}`;
}
