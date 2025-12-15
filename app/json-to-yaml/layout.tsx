import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to YAML Converter | Optimize for Kubernetes",
  description: "Convert JSON to YAML instantly. The perfect tool for generating Kubernetes manifests, Docker Compose files, and Ansible configurations. 100% Client-side.",
  keywords: [
    "json to yaml", 
    "convert json to yaml", 
    "kubernetes yaml generator", 
    "json vs yaml", 
    "devops tools"
  ],
  openGraph: {
    title: "JSON to YAML Converter",
    description: "Transform JSON data into clean YAML for DevOps configuration.",
    type: "website",
  }
};

export default function JsonToYamlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
