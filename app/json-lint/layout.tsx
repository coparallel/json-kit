import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Lint Online | Advanced Error Detection & Auto Fix",
  description: "Advanced JSON Lint tool. Detect syntax errors, validate structure, and fix issues with line-number precision. A modern, secure alternative to JSONLint.com.",
  keywords: [
    "json lint",
    "jsonlint",
    "json linter",
    "json syntax checker",
    "json error detector",
    "debug json online",
    "fix malformed json"
  ],
  alternates: {
    canonical: "https://json-kit.com/json-lint",
  },
  openGraph: {
    title: "JSON Lint Online | Deep Syntax Checking",
    description: "Debug complex JSON with precision. Detailed error reporting and auto-fixes.",
    url: "https://json-kit.com/json-lint",
    type: "website",
  }
};

export default function JsonLintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "JSON Lint Online",
        "url": "https://json-kit.com/json-lint",
        "applicationCategory": "DeveloperTool",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": "An advanced JSON linting tool that detects syntax errors and suggests fixes.",
        "featureList": ["Deep Syntax Linting", "Line Number Reporting", "Auto-Fix", "Client-Side Processing"]
      },
      {
        "@type": "HowTo",
        "name": "How to Lint JSON Online",
        "step": [
          { "@type": "HowToStep", "name": "Paste Code", "text": "Paste your JSON data into the linter input." },
          { "@type": "HowToStep", "name": "Review Errors", "text": "Check the diagnostics panel for specific line numbers and error descriptions." },
          { "@type": "HowToStep", "name": "Apply Fixes", "text": "Use the Auto-Fix button to resolve common syntax issues automatically." }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is JSON Lint?",
            "acceptedAnswer": { "@type": "Answer", "text": "JSON Lint is a tool that performs deep syntax checking on JSON data, explaining exactly where and why an error occurred." }
          },
          {
            "@type": "Question",
            "name": "How is this different from JSONLint.com?",
            "acceptedAnswer": { "@type": "Answer", "text": "This tool is a modern alternative that runs entirely in your browser (faster & private), supports dark mode themes, and offers auto-fix capabilities." }
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