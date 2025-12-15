


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
export const metadata: Metadata = {
  metadataBase: new URL('https://json-kit.com'),
  title: {
    default: "JSON-Kit | The Developer's Paper Workspace",
    template: "%s | JSON-Kit"
  },
  description: "A lightweight, privacy-focused collection of JSON tools. Visualize, validate, and convert data locally in your browser. No servers.",
  keywords: ["json visualizer", "json formatter", "json to csv", "developer tools", "offline json tools"],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://json-kit.com',
    siteName: 'JSON-Kit',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  }
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${codeFont.variable} ${serifFont.variable} font-sans antialiased min-h-screen flex flex-col bg-[#F9F7F1]`}>
        
        {/* --- TOP STRIP (Like a binding) --- */}
        <div className="h-2 w-full bg-black"></div>

        {/* --- HEADER --- */}
        <header className="border-b-2 border-black bg-[#F9F7F1] sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
            
           {/* Logo area */}
            <Link href="/" className="flex items-center gap-2 group">
              <img src="/logo.svg" alt="Logo" className="h-75 w-30 group-hover:rotate-3 transition-transform" />
            </Link>

            {/* Nav Links */}
            <nav className="flex items-center gap-6 text-sm font-bold text-black/80">
              <Link href="/" className="hover:underline decoration-2 underline-offset-4">Tools</Link>
              <Link href="/about" className="hidden sm:block hover:underline decoration-2 underline-offset-4">Manifesto</Link>
              <a 
                href="https://github.com" 
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
                 <h3 className="font-serif text-2xl mb-4">JSON-Kit</h3>
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
                  <li><Link href="/json-diff" className="hover:text-black hover:translate-x-1 transition-transform inline-block">JSON Diff</Link></li>
                  <li><Link href="/json-to-csv" className="hover:text-black hover:translate-x-1 transition-transform inline-block">JSON to CSV</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider mb-4 border-b-2 border-black inline-block pb-1">Legal</h4>
                 <ul className="space-y-2 text-sm font-medium text-gray-600">
                  <li><Link href="/privacy" className="hover:text-black">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-black">Terms of Service</Link></li>
                  <li><a href="mailto:hello@json-kit.com" className="hover:text-black">Contact</a></li>
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