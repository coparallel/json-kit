import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to XML Converter | Format & Validate XML",
  description: "Convert JSON to XML instantly. Perfect for SOAP APIs, enterprise data migration, and legacy systems. Validates structure automatically. 100% Client-side.",
  keywords: [
    "json to xml",
    "convert json to xml",
    "xml converter",
    "json to soap",
    "xml formatter",
    "enterprise data tools"
  ],
  openGraph: {
    title: "JSON to XML Converter",
    description: "Convert JSON arrays and objects to clean XML/SOAP formats instantly.",
    type: "website",
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'JSON to XML Converter' }],
  }
};


export default function JsonToXmlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}