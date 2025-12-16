import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Visualizer | Interactive Graph View",
  description: "Visualize complex JSON as interactive graphs. Expand, collapse, and debug API responses instantly. The best way to understand nested data.",
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
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'JSON Visualizer Preview' }],
  },
  
};

export default function JsonVisualizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
