import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter, Validator & Beautifier | Format JSON Online Free",
  description: "Format, validate, beautify, and lint JSON instantly. Fix invalid JSON, prettify messy data, and minify when needed. 100% client-side. No uploads.",
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