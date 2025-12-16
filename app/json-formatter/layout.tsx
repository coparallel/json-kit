import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter | Validate & Beautify Online",
  description: "Format, validate, and beautify messy JSON data. Fix syntax errors and pretty-print your code with proper indentation. No server uploads.",
  keywords: [
    "json formatter",
    "json validator",
    "json beautifier",
    "format json online",
    "validate json",
    "json lint",
    "pretty print json",
    "online json tool"
  ],
  openGraph: {
    title: "JSON Formatter & Validator",
    description: "The fastest way to format, validate, and clean JSON data online.",
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