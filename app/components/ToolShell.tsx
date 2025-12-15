"use client";

import Link from "next/link";
import { ArrowLeft, Share2 } from "lucide-react";
import RelatedTools from "./RelatedTools"; // Your sidebar component

interface FaqItem {
  question: string;
  answer: string;
}

interface ToolShellProps {
  title: string;
  description: string;
  toolName: string; // For Breadcrumb
  children: React.ReactNode;
  faqs: FaqItem[];
  relatedLinks: { name: string; url: string }[];
}

export default function ToolShell({ 
  title, 
  description, 
  toolName, 
  children, 
  faqs,
  relatedLinks 
}: ToolShellProps) {
  
  return (
    <div className="animate-in fade-in duration-500">
      
      {/* 1. SEO Header & Breadcrumbs */}
<div className="mb-8 border-b-2 border-black/10 pb-8">
        
        {/* Breadcrumb: Kept Mono to look like a file path (Developer friendly) */}
        <nav className="text-xs md:text-sm font-mono font-bold text-gray-500 mb-6 flex items-center gap-2 uppercase tracking-wider">
           <Link href="/" className="hover:text-black hover:underline decoration-2 underline-offset-4 transition-all">
             JSON-KIT
           </Link> 
           <span className="text-gray-300">/</span>
           <span className="bg-yellow-300 text-black px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-sm">
             {toolName}
           </span>
        </nav>
        
        {/* Title: Heavy Sans-Serif (Matches Homepage Hero) */}
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[#1a1a1a] mb-6 leading-[0.95]">
          {title}
        </h1>

        {/* Description: Clean, highly legible Sans-Serif (Better for SEO/Readability) */}
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed font-medium antialiased">
          {description}
        </p>
        
      </div>

      {/* 2. AD SLOT (Top) */}
      {/* <div className="w-full h-[90px] bg-gray-100 border-2 border-dashed border-gray-300 mb-8 flex items-center justify-center text-xs font-mono text-gray-400">
         ADVERTISEMENT (728x90)
      </div> */}

      {/* 3. The Tool Workspace (Injected) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        <div className="lg:col-span-12">
           {children}
        </div>
      </div>

      {/* 4. SEO Content & FAQs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-t-2 border-black pt-12">
        
        {/* Left: FAQs (Schema Markup ready content) */}
        <div className="lg:col-span-2 space-y-8">
           <h2 className="text-3xl font-serif font-bold">Frequently Asked Questions</h2>
           <div className="space-y-6">
             {faqs.map((faq, i) => (
               <details key={i} className="group border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] open:bg-blue-50 transition-colors">
                 <summary className="flex justify-between items-center p-4 font-bold cursor-pointer list-none select-none">
                   {faq.question}
                   <span className="transform group-open:rotate-180 transition-transform">▼</span>
                 </summary>
                 <div className="p-4 pt-0 text-gray-700 leading-relaxed border-t-2 border-black/5 mt-2">
                   {faq.answer}
                 </div>
               </details>
             ))}
           </div>
        </div>

        {/* Right: Internal Linking (Sidebar) */}
        <div className="lg:col-span-1">
           <div className="sticky top-24 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-bold text-lg border-b-2 border-black pb-2 mb-4 uppercase tracking-widest">
                Related Tools
              </h3>
              <ul className="space-y-3 font-mono text-sm">
                {relatedLinks.map((link) => (
                  <li key={link.url}>
                    <Link href={link.url} className="block p-2 hover:bg-blue-600 hover:text-white transition-colors border border-transparent hover:border-black rounded-sm">
                      → {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Sidebar Ad */}
              <div className="mt-8 h-62.5 bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400">
                AD SLOT (300x250)
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}