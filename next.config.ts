import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const isCloudflarePages = process.env.CLOUDFLARE_PAGES === "true" || process.env.CF_PAGES === "1";
const isStaticExport = isGitHubPages || isCloudflarePages;
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "portfolio";
const basePath = isGitHubPages ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true
  },
  trailingSlash: isStaticExport
};

export default nextConfig;
