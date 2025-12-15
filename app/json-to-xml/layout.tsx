import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to XML Converter | Convert API Data Online",
  description: "Convert JSON objects to XML format instantly. Free developer tool for transforming API responses and data structures. Client-side processing ensures 100% privacy.",
  keywords: [
    "json to xml", 
    "convert json to xml", 
    "json vs xml", 
    "json to xml converter", 
    "data serialization tool"
  ],
  openGraph: {
    title: "JSON to XML Converter",
    description: "Transform JSON data into well-formed XML instantly.",
    type: "website",
  }
};

export default function JsonToXmlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}