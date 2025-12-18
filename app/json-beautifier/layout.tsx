import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Beautifier Online | Pretty Print & Format JSON Instantly",
  description: "Free JSON Beautifier to convert minified JSON into a clean, readable format. Instantly pretty print with proper indentation and syntax highlighting. 100% Client-side.",
  keywords: [
    "json beautifier",
    "json pretty print",
    "beautify json",
    "json beautifier online",
    "make json readable",
    "json formatter",
    "beautify minified json"
  ],
  alternates: {
    canonical: "https://json-kit.com/json-beautifier",
  },
  openGraph: {
    title: "JSON Beautifier | Make Minified JSON Readable",
    description: "Instantly transform ugly, minified JSON into beautifully formatted code.",
    url: "https://json-kit.com/json-beautifier",
    type: "website",
  }
};

export default function JsonBeautifierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "JSON Beautifier Online",
        "url": "https://json-kit.com/json-beautifier",
        "applicationCategory": "DeveloperTool",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": "A fast JSON beautifier that pretty prints minified JSON into a readable format with syntax highlighting.",
        "featureList": ["JSON Pretty Print", "Custom Indentation", "Syntax Highlighting", "Offline Support"]
      },
      {
        "@type": "HowTo",
        "name": "How to Beautify JSON Online",
        "step": [
          { "@type": "HowToStep", "name": "Paste JSON", "text": "Paste your minified or compact JSON into the input area." },
          { "@type": "HowToStep", "name": "Select Indentation", "text": "Choose your preferred indentation level (2 or 4 spaces)." },
          { "@type": "HowToStep", "name": "Beautify", "text": "Click the Beautify button to format the JSON instantly." }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What does beautifying JSON mean?",
            "acceptedAnswer": { "@type": "Answer", "text": "Beautifying JSON means converting compact or minified JSON into a human-readable format by adding indentation, line breaks, and spacing." }
          },
          {
            "@type": "Question",
            "name": "Will beautifying JSON change my data?",
            "acceptedAnswer": { "@type": "Answer", "text": "No. Beautifying only affects whitespace and formatting. The data structure, keys, and values remain exactly the same." }
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