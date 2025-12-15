import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator | Free Online JSON Beautifier",
  description: "Instantly format, validate, and beautify JSON data. Fix messy JSON code with one click. 100% client-side privacy—your data never leaves the browser.",
  keywords: [
    "json formatter", 
    "json beautifier", 
    "format json online", 
    "validate json", 
    "json linter", 
    "json minifier"
  ],
  openGraph: {
    title: "JSON Formatter & Validator",
    description: "The fastest way to clean up JSON code. Private, free, and open-source.",
    type: "website",
  }
};

export default function JsonFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}