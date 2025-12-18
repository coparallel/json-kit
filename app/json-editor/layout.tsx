import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Editor Online – Tree View, Code Editor & Schema Validation",
  description:
    "Professional JSON Editor online with interactive tree view and real-time code editor. Edit nested JSON, fix syntax errors, validate with JSON Schema, and handle large files up to 100MB securely in your browser.",
  keywords: [
    "json editor online",
    "online json editor",
    "json tree editor",
    "visual json editor",
    "edit json online",
    "fix invalid json",
    "json editor tree view",
    "large json editor",
    "json editor for developers",
    "json schema validator editor",
    "secure json editor",
    "json editor client side",
    "json configuration editor",
    "json api response editor"
  ],
  alternates: {
    canonical: "https://json-kit.com/json-editor"
  },
  openGraph: {
    title: "JSON Editor Online – Visual Tree & Real-Time Code View",
    description:
      "Edit, validate, and visualize JSON data using a fast, secure, browser-based JSON editor with tree and code views.",
    url: "https://json-kit.com/json-editor",
    siteName: "JSON-Kit",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Editor Online – Tree & Code View",
    description:
      "Free professional JSON Editor with tree view, validation, and large file support."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function JsonEditorLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "JSON Editor Online",
        "url": "https://json-kit.com/json-editor",
        "applicationCategory": "DeveloperTool",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description":
          "A high-performance JSON editor with interactive tree view, real-time validation, JSON Schema support, and large file handling.",
        "featureList": [
          "Visual Tree View Editor",
          "Code Editor with Syntax Highlighting",
          "Real-Time JSON Validation",
          "JSON Schema Support",
          "Large File Support (100MB+)",
          "Client-Side Processing",
          "Dark Mode"
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Edit JSON Online",
        "description":
          "Step-by-step guide to editing, validating, and formatting JSON using an online JSON editor.",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Import JSON",
            "text": "Paste raw JSON, upload a .json file, or load data from an API."
          },
          {
            "@type": "HowToStep",
            "name": "Explore Tree View",
            "text": "Use the interactive tree to navigate nested objects visually."
          },
          {
            "@type": "HowToStep",
            "name": "Edit JSON",
            "text": "Modify values in tree view or switch to code view for bulk editing."
          },
          {
            "@type": "HowToStep",
            "name": "Validate & Format",
            "text": "Fix syntax errors and beautify or minify JSON instantly."
          },
          {
            "@type": "HowToStep",
            "name": "Export",
            "text": "Download the cleaned and validated JSON file."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this JSON Editor secure?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Yes. All processing is performed locally in your browser. No data is uploaded or stored on servers."
            }
          },
          {
            "@type": "Question",
            "name": "Can this JSON Editor handle large files?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Yes. The editor is optimized to handle large JSON files up to 100MB using efficient rendering."
            }
          },
          {
            "@type": "Question",
            "name": "Does it support JSON Schema validation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Yes. You can validate JSON data against a JSON Schema to ensure structural and type correctness."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://json-kit.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "JSON Tools",
            "item": "https://json-kit.com"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "JSON Editor",
            "item": "https://json-kit.com/json-editor"
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
