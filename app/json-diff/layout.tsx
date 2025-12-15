import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Diff Checker | Compare JSON Files Side by Side",
  description: "Compare two JSON files and highlight differences instantly. Detect additions, deletions, and value changes with a visual JSON diff tool.",
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
  }
};


export default function JsonDiffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}