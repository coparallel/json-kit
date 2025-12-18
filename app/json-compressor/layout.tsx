import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Compressor & Decompressor | Gzip & Brotli Analysis",
  description: "Analyze JSON compression with Gzip/Brotli, then compress to Base64. Decompress Gzip Base64 strings back to JSON. Free, client-side tool for API payload optimization.",
  keywords: [
    "json compressor", "json compression", "gzip json", "brotli json", "json size calculator",
    "json decompressor", "ungzip json", "decode base64 gzip", "base64 to json", "json payload optimizer"
  ],
  alternates: {
    canonical: "https://json-kit.com/json-compressor",
  },
  openGraph: {
    title: "JSON Compressor/Decompressor | Gzip & Brotli Tools",
    description: "Optimize API payloads and decompress Gzip Base64 strings to JSON instantly.",
    url: "https://json-kit.com/json-compressor",
    type: "website",
  }
};

export default function JsonCompressorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "JSON Compressor & Decompressor Online",
        "url": "https://json-kit.com/json-compressor",
        "applicationCategory": "DeveloperTool",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": "A versatile tool to estimate JSON compression (Gzip/Brotli) and decompress Gzip Base64 strings.",
        "featureList": ["Gzip Compression Estimation", "Brotli Estimation", "Decompress Gzip Base64", "Client-Side Processing", "Privacy Safe"]
      },
      {
        "@type": "HowTo",
        "name": "How to Use the JSON Compressor & Decompressor",
        "step": [
          { "@type": "HowToStep", "name": "Compress JSON", "text": "Paste JSON to estimate compression and get Gzip Base64 output." },
          { "@type": "HowToStep", "name": "Decompress Gzip Base64", "text": "Paste a Gzip Base64 string into the decompressor to get original JSON." },
          { "@type": "HowToStep", "name": "Analyze Savings", "text": "Compare original, minified, Gzip, and Brotli sizes." }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I decompress a Gzip Base64 string?",
            "acceptedAnswer": { "@type": "Answer", "text": "Paste your Gzip-compressed, Base64-encoded string into the 'Compressed Base64 Input' panel of this tool, then click 'Decompress'." }
          },
          {
            "@type": "Question",
            "name": "What is the difference between Minification and Compression?",
            "acceptedAnswer": { "@type": "Answer", "text": "Minification removes whitespace (e.g., ~30% reduction). Compression (Gzip/Brotli) uses algorithms to encode data (e.g., ~80% reduction). You should use both." }
          },
          {
            "@type": "Question",
            "name": "Is my JSON data secure?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. All compression and decompression happens locally in your browser. Your data is never uploaded or stored on any server." }
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