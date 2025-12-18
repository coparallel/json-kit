import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://json-kit.com";
  const lastModified = new Date("2025-01-01"); // update only when content actually changes

  const routes = [
    "",
    "/json-formatter",
    "/json-visualizer",
    "/json-minifier",
    "/json-diff",
    "/json-to-csv",
    "/json-to-xml",
    "/json-to-yaml",
    "/json-validator",
    "/json-compressor",
    "/json-beautifier",
    "/json-editor",
    "/json-viewer",
    "/json-parser",
    "/json-lint",

    '/privacy',
    '/terms',
    '/about',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
