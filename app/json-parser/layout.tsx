import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Parser Online | Parse String to JavaScript Object",
  description: "Free online JSON Parser. Convert JSON strings into JavaScript objects instantly. Test JSON.parse() behavior, inspect object types, and debug syntax errors. 100% Client-side.",
  keywords: [
    "json parser",
    "parse json",
    "json string parser",
    "json to object",
    "javascript json parser",
    "parse json online",
    "json parse tester"
  ],
  alternates: {
    canonical: "https://json-kit.com/json-parser",
  },
  openGraph: {
    title: "JSON Parser Online | String to Object Converter",
    description: "Safely parse JSON strings into JavaScript objects and inspect the result.",
    url: "https://json-kit.com/json-parser",
    type: "website",
  }
};

export default function JsonParserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "JSON Parser Online",
        "url": "https://json-kit.com/json-parser",
        "applicationCategory": "DeveloperTool",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": "A secure online JSON Parser that converts JSON strings into JavaScript objects and provides detailed error diagnostics.",
        "featureList": ["JSON.parse() Simulation", "Object Inspection", "Syntax Error Debugging", "Client-Side Processing"]
      },
      {
        "@type": "HowTo",
        "name": "How to Parse JSON Strings Online",
        "step": [
          { "@type": "HowToStep", "name": "Paste String", "text": "Paste your raw JSON string into the input field." },
          { "@type": "HowToStep", "name": "Parse", "text": "Click the Parse button to convert it to an object." },
          { "@type": "HowToStep", "name": "Inspect", "text": "Explore the resulting JavaScript object structure and data types." }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is JSON parsing?",
            "acceptedAnswer": { "@type": "Answer", "text": "JSON parsing is the process of converting a JSON string into a JavaScript object that can be accessed and manipulated in code." }
          },
          {
            "@type": "Question",
            "name": "Does this parser behave like JSON.parse()?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. The parser mirrors the standard JavaScript JSON.parse() behavior, making it ideal for testing real-world application logic." }
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