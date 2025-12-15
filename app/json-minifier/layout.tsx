import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Minifier | Compress & Optimize JSON for Production",
  description: "Minify JSON instantly by removing whitespace and comments. Reduce file size, speed up APIs, and optimize payloads. Client-side and secure.",
  keywords: [
    "json minifier",
    "minify json",
    "compress json",
    "json optimization",
    "reduce json size",
    "json stringify"
  ],
  openGraph: {
    title: "JSON Minifier",
    description: "Compress JSON data for faster APIs and smaller payloads.",
    type: "website",
  }
};

export default function JsonMinifierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}