import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to YAML | Converter for DevOps",
  description: "Convert JSON to clean YAML for Kubernetes, Docker, and config files. Validates syntax and handles nested structures perfectly. Client-side privacy.",
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
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'JSON to YAML Converter' }],
  }
};


export default function JsonToYamlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
