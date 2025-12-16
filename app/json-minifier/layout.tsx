import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Minifier | Compress & Optimize Code",
  description: "Minify JSON by removing whitespace. Reduce API payload size and improve application speed instantly. Safe, offline, and secure processing.",
  
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