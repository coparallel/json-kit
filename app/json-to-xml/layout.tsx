import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to YAML Converter | Kubernetes & DevOps Tool",
  description: "Convert JSON to YAML for Kubernetes, Docker Compose, and DevOps workflows. Clean, readable YAML generated instantly. Client-side only.",
  keywords: [
    "json to yaml",
    "convert json to yaml",
    "yaml generator",
    "kubernetes yaml",
    "devops json tools",
    "json vs yaml"
  ],
  openGraph: {
    title: "JSON to YAML Converter",
    description: "Generate clean YAML from JSON for DevOps and cloud configs.",
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