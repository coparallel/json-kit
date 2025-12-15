import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Minifier | Compress JSON & Reduce File Size",
  description: "Free online JSON Minifier. Compress JSON by removing whitespace and indentation. Reduce API payload size instantly. 100% Client-side processing.",
  keywords: [
    "minify json", 
    "compress json", 
    "json stringify", 
    "reduce json size", 
    "json minification"
  ],
  openGraph: {
    title: "JSON Minifier Tool",
    description: "Compress your JSON data for production. Save bandwidth instantly.",
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