import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Diff | Compare JSON Files Online",
  description: "Free online JSON Diff tool. Compare two JSON files side-by-side and highlight differences instantly. Visualize changes, additions, and deletions.",
  keywords: [
    "json diff", 
    "compare json", 
    "json difference checker", 
    "json compare online", 
    "diff checker json"
  ],
  openGraph: {
    title: "JSON Diff Tool",
    description: "Find differences between two JSON objects instantly.",
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