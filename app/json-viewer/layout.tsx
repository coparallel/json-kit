import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Viewer Online – View, Explore & Inspect JSON with Tree View",
  description: "Free online JSON Viewer to explore and inspect JSON data using an interactive tree view. View large JSON files (100MB+), search keys and values, and analyze API responses securely.",
  keywords: [
    "json viewer",
    "json viewer online",
    "view json",
    "json tree viewer",
    "json data viewer",
    "json file viewer",
    "read only json viewer",
    "json inspector"
  ],
  alternates: {
    canonical: "https://json-kit.com/json-viewer",
  },
  openGraph: {
    title: "JSON Viewer Online | Visual Inspector",
    description: "Visualize, search, and inspect complex JSON data structures instantly.",
    url: "https://json-kit.com/json-viewer",
    type: "website",
  }
};

export default function JsonViewerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "JSON Viewer Online",
        "url": "https://json-kit.com/json-viewer",
        "applicationCategory": "DeveloperTool",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": "A fast, read-only JSON viewer with interactive tree view, search, and large file support.",
        "featureList": ["Interactive Tree View", "Search Keys & Values", "Large File Support", "Client-Side Processing"]
      },
      {
        "@type": "HowTo",
        "name": "How to View JSON Files Online",
        "step": [
          { "@type": "HowToStep", "name": "Import JSON", "text": "Paste JSON data or upload a JSON file into the viewer." },
          { "@type": "HowToStep", "name": "Explore Tree Structure", "text": "Navigate the JSON hierarchy using the interactive tree view." },
          { "@type": "HowToStep", "name": "Expand/Collapse", "text": "Expand nested objects or collapse sections to focus on relevant data." },
          { "@type": "HowToStep", "name": "Search JSON", "text": "Use the search box to find specific keys or values quickly." }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a JSON Viewer?",
            "acceptedAnswer": { "@type": "Answer", "text": "A JSON Viewer is a read-only tool that displays JSON data in a structured tree format. It helps developers explore nested objects without modifying the original data." }
          },
          {
            "@type": "Question",
            "name": "Can this JSON Viewer handle large files?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. The viewer is optimized for large JSON files up to 100MB using efficient rendering techniques." }
          },
          {
            "@type": "Question",
            "name": "Is this JSON Viewer secure?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. All processing happens entirely in your browser. Your JSON data is never uploaded to any server." }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}