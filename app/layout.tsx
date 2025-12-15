


import type { Metadata } from "next";
import { Inter, JetBrains_Mono, DM_Serif_Display } from "next/font/google"; // Added Serif
import "./globals.css";
import Link from "next/link";
import { Github } from "lucide-react";

// 1. FONTS
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const codeFont = JetBrains_Mono({ subsets: ["latin"], variable: "--font-code" });
const serifFont = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-serif" });

// 2. SEO METADATA
// import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://json-kit.com"),

  title: {
    default: "JSON Formatter & Validator | Free Online JSON Tools",
    template: "%s | JSON-Kit | Professional JSON Tools",
  },

  description:
    "100% Client-side JSON Formatter, Validator & Viewer. Format, diff, and convert JSON to CSV/XML/SQL instantly in your browser. No servers, 100% Privacy. Works offline.",

  keywords: [
    "json formatter",
    "json validator",
    "json viewer",
    "json beautifier",
    "json editor",
    "json parser",
    "json tools",
    "json utilities",
    "json formatter online",
    "json validator online",
    "json viewer online",
    "json editor online",
    "online json tools",
    "format json",
    "validate json",
    "beautify json",
    "pretty print json",
    "minify json",
    "json minifier",
    "json tree viewer",
    "json visualizer",
    "visualize json",
    "json structure viewer",
    "json converter",
    "json to csv",
    "csv to json",
    "json to xml",
    "xml to json",
    "json to excel",
    "excel to json",
    "json diff",
    "compare json",
    "json compare",
    "developer json tools",
    "browser json formatter",
    "client side json formatter",
    "offline json formatter",
    "free json formatter",
    "secure json tools",
    "private json formatter"
  ],

  authors: [{ name: "JSON-Kit Team", url: "https://json-kit.com" }],
  creator: "JSON-Kit",
  publisher: "JSON-Kit",

  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://json-kit.com",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://json-kit.com",
    siteName: "JSON-Kit",
    title: "JSON-Kit | Fast, Private JSON Formatter & Tools",
    description:
      "Free professional JSON toolkit: Format & validate JSON instantly with interactive tree view. Convert to CSV/Excel/XML. Compare files. 100% client-side processing ensures complete privacy. No signup required.",
    images: [
      {
        url: "https://json-kit.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "JSON-Kit JSON formatter showing tree view and validation",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@jsonkit",
    creator: "@jsonkit",
    title: "JSON-Kit | Free JSON Formatter & Validator",
    description:
      "Free professional JSON toolkit: Format & validate JSON instantly with interactive tree view. Convert to CSV/Excel/XML. Compare files. 100% client-side processing ensures complete privacy. No signup required.",
    images: ["https://json-kit.com/og-image.png"],
  },

  category: "technology",
  applicationName: "JSON-Kit",

  referrer: "origin-when-cross-origin",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  other: {
    "application-name": "JSON-Kit",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "JSON-Kit",
  },
};



export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // The "Rich Snippet" Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "JSON-Kit",
    "url": "https://json-kit.com",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Visualize, Validate, and Convert JSON data instantly in your browser.",
    "featureList": "JSON Visualizer, JSON Formatter, JSON Minifier, JSON Diff, JSON to CSV, JSON to YAML, JSON to XML"
  }
  return (
   
    
    <html lang="en">
      <body className={`${inter.variable} ${codeFont.variable} ${serifFont.variable} font-sans antialiased min-h-screen flex flex-col bg-[#F9F7F1]`}>

         {/* Inject JSON-LD Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>
        
        {/* --- TOP STRIP (Like a binding) --- */}
        <div className="h-2 w-full bg-black"></div>

        {/* --- HEADER --- */}
        <header className="border-b-2 border-black bg-[#F9F7F1] sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
            
           {/* Logo area */}
            {/* <Link href="/" className="flex items-center gap-2 group">
              <img src="/logo.svg" alt="Logo" className="h-75 w-30 group-hover:rotate-3 transition-transform" />
            </Link> */}
<a href="/" className="inline-block">
  <h1 className="text-2xl md:text-4xl font-black tracking-tighter text-[#1a1a1a]">
    THE{" "}
    <span className="text-blue-600 relative inline-block">
      JSON
      <svg
        className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 -z-10"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
      >
        <path
          d="M0 5 Q 50 10 100 5"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
        />
      </svg>
    </span>{" "}
    KIT
  </h1>
</a>



            {/* Nav Links */}
            <nav className="flex items-center gap-6 text-sm font-bold text-black/80">
              <Link href="/" className="hover:underline decoration-2 underline-offset-4">Tools</Link>
              <Link href="/about" className="hidden sm:block hover:underline decoration-2 underline-offset-4">Manifesto</Link>
              <a 
                href="https://github.com/coparallel/json-kit" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 border-2 border-black px-3 py-1.5 rounded-sm hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
              >
                <Github size={16} />
                <span className="hidden sm:inline">Star</span>
              </a>
            </nav>
          </div>
        </header>

        {/* --- MAIN CONTENT --- */}
        <main className="grow w-full max-w-6xl mx-auto px-4 py-8">
           {/* Ad Placeholder (Top Banner) - Hidden if no ad, doesn't shift layout significantly */}
           {/* <div className="w-full h-[90px] bg-gray-100 border-2 border-dashed border-gray-300 mb-8 flex items-center justify-center text-gray-400 text-xs">
              AD SPACE (728x90)
           </div> */}
           
           {children}
        </main>

        {/* --- FOOTER --- */}
        <footer className="border-t-2 border-black bg-white mt-auto">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              
              <div className="col-span-1 md:col-span-2 pr-8">
                 <a href="/" className="inline-block">
  <h1 className="text-2xl md:text-4xl font-black tracking-tighter text-[#1a1a1a]">
    THE{" "}
    <span className="text-blue-600 relative inline-block">
      JSON
      <svg
        className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 -z-10"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
      >
        <path
          d="M0 5 Q 50 10 100 5"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
        />
      </svg>
    </span>{" "}
    KIT
  </h1>
</a>
                 <p className="text-sm text-gray-600 leading-relaxed font-medium max-w-md">
                   Constructed for developers who value speed and privacy. 
                   Data is processed entirely in your browser memory. 
                   <br/>No database. No tracking. Just raw utility.
                 </p>
              </div>

              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider mb-4 border-b-2 border-black inline-block pb-1">Tools</h4>
                <ul className="space-y-2 text-sm font-medium text-gray-600">
                  <li><Link href="/json-visualizer" className="hover:text-black hover:translate-x-1 transition-transform inline-block">JSON Visualizer</Link></li>
                  <li><Link href="/json-formatter" className="hover:text-black hover:translate-x-1 transition-transform inline-block">JSON Formatter</Link></li>
                  <li><Link href="/json-minifier" className="hover:text-black hover:translate-x-1 transition-transform inline-block">JSON Minifier</Link></li>
                  <li><Link href="/json-diff" className="hover:text-black hover:translate-x-1 transition-transform inline-block">JSON Difference</Link></li>
                  <li><Link href="/json-csv" className="hover:text-black hover:translate-x-1 transition-transform inline-block">JSON to CSV</Link></li>
                  <li><Link href="/json-to-xml" className="hover:text-black hover:translate-x-1 transition-transform inline-block">JSON to XML</Link></li>
                  <li><Link href="/json-to-yaml" className="hover:text-black hover:translate-x-1 transition-transform inline-block">JSON to YAML</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider mb-4 border-b-2 border-black inline-block pb-1">Legal</h4>
                 <ul className="space-y-2 text-sm font-medium text-gray-600">
                  <li><Link href="/privacy" className="hover:text-black">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-black">Terms of Service</Link></li>
                  <li><Link href="/about" className="hover:text-black">About Us</Link></li>
                  <li><a href="mailto:ai@coparallel.com" className="hover:text-black">Contact to mail</a></li>
                </ul>
              </div>
            </div> 
            
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-dashed border-gray-300 text-xs font-mono text-gray-500">
               <span>© 2025 JSON-Kit. Open Source.</span>
               <span className="mt-2 md:mt-0">Serverless Architecture</span>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}