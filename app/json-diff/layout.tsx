import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Diff | Compare Two Files Instantly",
  description: "Visual JSON comparison tool. Detect additions, removals, and value changes side-by-side. Semantic diff ignores key order. Free & Private.",

  keywords: [
    "json diff",
    "compare json",
    "json comparison tool",
    "json difference checker",
    "compare json online",
    "json diff viewer"
  ],
  openGraph: {
    title: "JSON Diff Checker",
    description: "Visually compare JSON objects and find differences instantly.",
    type: "website",
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'JSON Diff Tool' }],
  }
};


export default function JsonDiffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}