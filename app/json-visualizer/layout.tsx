import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Visualizer",
  description: "Visualize JSON data as an interactive tree. Expand, collapse, and explore complex JSON structures instantly. Perfect for debugging APIs.",
  keywords: [
    "json visualizer",
    "json viewer",
    "json tree viewer",
    "visualize json",
    "json explorer",
    "json structure viewer"
  ],
  openGraph: {
    title: "JSON Visualizer",
    description: "Explore and understand JSON data visually with an interactive tree.",
    type: "website",
  }
};

export default function JsonVisualizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
