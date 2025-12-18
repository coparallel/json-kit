import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Validator Online | Free Json Validator",
  description: "Free JSON Validator & Linter. Paste your JSON to instantly check for syntax errors. Use the Auto-Fix tool to repair missing quotes and trailing commas automatically.",
  keywords: [
    "json validator", "validate json", "json syntax checker", "auto fix json", 
    "repair json online", "json linter", "fix json errors", "json formatter",
    "validate json file", "rfc 8259 validator", "debug json"
  ],
  openGraph: {
    title: "JSON Validator | Validate & Fix JSON Online",
    description: "Instant syntax checking with Auto-Fix for common errors.",
    url: "https://json-kit.com/json-validator",
    siteName: "JSON-Kit",
    type: "website",
  },
};

export default function JsonValidatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "JSON Validator & Fixer",
        "applicationCategory": "DeveloperTool",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0" },
        "description": "Validate JSON syntax and automatically fix common errors like trailing commas and missing quotes.",
        "featureList": ["Real-time Validation", "Auto-Fix JSON", "Error Line Reporting", "File Upload"]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How to fix JSON syntax errors automatically?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use the 'Auto Fix' button in our JSON Validator. It automatically removes trailing commas, converts single quotes to double quotes, and adds missing quotes to keys."
            }
          },
          {
            "@type": "Question",
            "name": "Why is my JSON invalid?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Common reasons include: missing quotes around keys, trailing commas after the last item, using single quotes, or unclosed brackets. Our tool highlights the exact line number of the error."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between JSON Validator and Formatter?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A Validator checks if the code follows the rules (syntax). A Formatter beautifies the code to make it readable (indentation). Our tool does both."
            }
          },
          {
            "@type": "Question",
            "name": "Can I validate JSON files offline?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. This tool runs entirely in your browser using JavaScript. Once the page loads, you can disconnect from the internet and still validate files securely."
            }
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