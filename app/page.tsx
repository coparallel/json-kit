

"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  Network, 
  FileJson, 
  FileSpreadsheet, 
  ArrowRightLeft, 
  Sparkles, 
  Code2, 
  Database,
  Terminal
} from "lucide-react";
import React from 'react';

// --- Tool Data ---
const tools = [
  {
    category: "Essentials",
    items: [
      { name: "JSON Formatter", url: "/json-formatter", icon: FileJson, desc: "Validate, minify, and beautify code." },
      { name: "JSON Visualizer", url: "/json-visualizer", icon: Network, desc: "Interactive graph view of your data nodes." },
      { name: "JSON Diff", url: "/json-diff", icon: ArrowRightLeft, desc: "Compare two JSON files side-by-side." },
      { name: "JSON Minifier", url: "/json-minifier", icon: ArrowRightLeft, desc: "Compress JSON by removing whitespace and indentation." }
    ]
  },
  {
    category: "Converters",
    items: [
      { name: "JSON to CSV", url: "/json-to-csv", icon: FileSpreadsheet, desc: "Export deep objects to spreadsheets."},
      { name: "JSON to SQL", url: "/json-to-sql", icon: Database, desc: "Generate CREATE TABLE queries.", status: "Coming Soon" },
      { name: "CSV to JSON", url: "/csv-to-json", icon: FileSpreadsheet, desc: "Parse Excel data back into JSON.", status: "Coming Soon" },
      { name: "JSON to XML", url: "/json-to-xml", icon: ArrowRightLeft, desc: "Compress JSON by removing whitespace and indentation." },
      { name: "JSON to YAML", url: "/json-to-yaml", icon: ArrowRightLeft, desc: "Convert JSON to YAML instantly."}
    ]
  },
  {
    category: "Generators",
    items: [
      { name: "Text to Schema", url: "/text-to-schema", icon: Sparkles, desc: "AI-powered JSON Schema generation.", status: "Coming Soon" },
      { name: "JSON to Types", url: "/json-to-types", icon: Code2, desc: "TypeScript, Go, and Python interfaces.", status: "Coming Soon" }
    ]
  }
];


export default function Dashboard() {
  const [query, setQuery] = useState("");

  const filteredCategories = tools.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) || 
      item.desc.toLowerCase().includes(query.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is my JSON data secure and private?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, absolutely. JSON-Kit runs entirely client-side in your browser. All formatting, validation, visualization, and conversion happens locally on your device. Your JSON data is never uploaded, transmitted, stored, or logged on any server. This makes JSON-Kit completely safe for API responses, configuration files, authentication tokens, and sensitive payloads. Your privacy is guaranteed."
      }
    },
    {
      "@type": "Question",
      "name": "What is the maximum JSON file size limit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSON-Kit uses your device's memory, so limits depend on your system specifications. Most JSON files under 50MB process instantly for formatting, validation, and conversion. Visual tools like the JSON Tree Visualizer may experience slower performance on files larger than 10MB due to rendering complexity. For very large JSON files (100MB+), we recommend using the JSON Minifier or JSON Formatter tools which are optimized for performance."
      }
    },
    {
      "@type": "Question",
      "name": "What JSON tools does JSON-Kit provide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSON-Kit offers a complete suite of free online JSON tools for developers including: JSON Formatter & Beautifier, JSON Validator & Syntax Checker, JSON Tree Visualizer, JSON Diff & Compare Tool, JSON Minifier & Compressor, JSON to CSV Converter, JSON to Excel/XLSX Converter, JSON to XML Converter, JSON to YAML Converter, JSON to SQL Converter, CSV to JSON Converter, XML to JSON Converter, YAML to JSON Converter, JSON Escape/Unescape, JSON Schema Generator, and JSON Path Finder. All tools work offline in your browser."
      }
    },
    {
      "@type": "Question",
      "name": "Who uses JSON-Kit and what are common use cases?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSON-Kit is used by software developers, DevOps engineers, data analysts, QA testers, API developers, data scientists, and computer science students. Common use cases include: debugging REST API responses, formatting JSON for readability, validating JSON syntax errors, comparing JSON configuration files, converting JSON data to CSV for Excel analysis, preparing production-ready minified JSON, generating JSON schemas, testing API endpoints, visualizing complex nested JSON structures, and creating configuration files for Docker, Kubernetes, and cloud deployments."
      }
    },
    {
      "@type": "Question",
      "name": "Is JSON-Kit free to use? Are there any limitations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, JSON-Kit is completely free to use with no sign-ups, registrations, or usage limits. All core tools including JSON formatting, validation, visualization, comparison, and conversion are available at no cost. There are no file size restrictions, no daily usage caps, and no premium tiers. The platform is supported through minimal, non-intrusive advertising that doesn't interfere with functionality. You can use JSON-Kit unlimited times, process unlimited files, and access all features forever free."
      }
    },
    {
      "@type": "Question",
      "name": "Does JSON-Kit provide an API or developer access?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Currently, JSON-Kit focuses on providing fast, client-side browser tools rather than a hosted API service. This ensures maximum privacy and performance. However, we're exploring API options for developers who need programmatic access to JSON formatting, validation, and conversion. Parts of our code logic are open-source. For integration needs, you can embed our tools or use our planned developer API for CI/CD pipelines, automated testing, and workflow automation."
      }
    },
    {
      "@type": "Question",
      "name": "How is JSON-Kit better than other JSON formatters like JSONLint?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSON-Kit offers several advantages over alternatives like JSONLint and JSONFormatter.org: 100% client-side processing for complete privacy, interactive tree view visualization, built-in diff comparison tool, multiple export formats (CSV, Excel, XML, YAML, SQL), modern user interface, faster performance, works completely offline, no server uploads, integrated validation with helpful error messages, JSON schema generation, and a comprehensive suite of tools in one place. Plus, JSON-Kit is actively maintained with regular updates and new features."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use JSON-Kit offline without an internet connection?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Once you load JSON-Kit in your browser, all tools work completely offline. Since everything runs client-side with no server communication, you can format, validate, visualize, and convert JSON without any internet connection. This makes JSON-Kit perfect for working with sensitive data in air-gapped environments, during flights, or in locations with poor connectivity. Simply load the page once, and you can use it offline indefinitely."
      }
    },
    {
      "@type": "Question",
      "name": "How do I validate and fix invalid JSON syntax errors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSON-Kit's validator automatically detects JSON syntax errors and provides detailed error messages with line numbers and error descriptions. Common errors include missing commas, unclosed brackets, trailing commas, unquoted keys, and invalid escape sequences. The validator highlights the exact location of errors, making them easy to fix. Simply paste your JSON, and any syntax errors will be immediately displayed with suggestions for correction. The formatter also auto-fixes many common formatting issues."
      }
    },
    {
      "@type": "Question",
      "name": "What JSON file formats can I convert to?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSON-Kit supports conversion to multiple formats: CSV (Comma-Separated Values) for Excel and spreadsheet analysis, XLSX/XLS (Microsoft Excel format) with proper formatting, XML for legacy systems and SOAP APIs, YAML/YML for configuration files and Kubernetes, SQL INSERT statements for database imports, TSV (Tab-Separated Values), plain text, and HTML tables. You can also convert from these formats back to JSON, including CSV to JSON, XML to JSON, YAML to JSON, and Excel to JSON conversions."
      }
    }
  ]
};

  return (
    <div className="space-y-16 animate-in fade-in duration-500">
      
      {/* 1. HERO SECTION */}
      <section className="text-center py-12 md:py-20 space-y-6 relative">
        {/* Decorative elements behind */}
{/* 1. TOP LEFT: Visualizer */}
        <Link href="/json-visualizer" className="group absolute top-0 left-10 hidden lg:flex flex-col items-center justify-center z-0 hover:z-20">
          {/* The Icon */}
          <div className="opacity-10 -rotate-12 group-hover:opacity-100 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300 text-blue-600">
             <FileJson size={100} />
          </div>
          {/* The Funky Yellow Pop-up */}
          <div className="absolute top-full mt-2 opacity-0 group-hover:opacity-100 group-hover:-rotate-2 transition-all duration-300 bg-yellow-300 border-2 border-black px-4 py-1 rounded-full font-black text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap">
             JSON VISUALIZER
          </div>
        </Link>

        {/* 2. TOP RIGHT: CSV Converter */}
        <Link href="/json-to-csv" className="group absolute top-10 right-10 hidden lg:flex flex-col items-center justify-center z-0 hover:z-20">
          <div className="opacity-10 rotate-6 group-hover:opacity-100 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300 text-green-600">
             <FileSpreadsheet size={90} />
          </div>
          <div className="absolute top-full mt-2 opacity-0 group-hover:opacity-100 group-hover:rotate-2 transition-all duration-300 bg-yellow-300 border-2 border-black px-4 py-1 rounded-full font-black text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap">
             JSON TO CSV
          </div>
        </Link>

        {/* 3. BOTTOM LEFT: AI Schema */}
        <Link href="/text-to-schema" className="group absolute bottom-0 left-20 hidden lg:flex flex-col items-center justify-center z-0 hover:z-20">
           {/* Pop-up appears ABOVE here because it's at the bottom of screen */}
          <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 group-hover:-rotate-3 transition-all duration-300 bg-yellow-300 border-2 border-black px-4 py-1 rounded-full font-black text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap">
             AI SCHEMA GEN
          </div>
          <div className="opacity-10 rotate-15 group-hover:opacity-100 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300 text-purple-600">
             <Sparkles size={80} />
          </div>
        </Link>

        {/* 4. BOTTOM RIGHT: Diff Tool */}
        <Link href="/json-diff" className="group absolute bottom-10 right-20 hidden lg:flex flex-col items-center justify-center z-0 hover:z-20">
          <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 group-hover:rotate-3 transition-all duration-300 bg-yellow-300 border-2 border-black px-4 py-1 rounded-full font-black text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap">
             JSON DIFF
          </div>
          <div className="opacity-10 -rotate-12 group-hover:opacity-100 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300 text-black">
             <Terminal size={100} />
          </div>
        </Link>
        <div className="inline-block border-2 border-black bg-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
          v1.0.0 Public Live
        </div>
        
        {/* Updated Hero Typography */}
        <h1 className="text-5xl md:text-7xl font-black text-[#1a1a1a] leading-[1.05] tracking-tighter mb-6">
          THE <span className="relative inline-block text-blue-600">
            UNIVERSAL
            {/* Hand-drawn underline effect */}
            <svg className="absolute w-full h-3 -bottom-2 left-0 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
               <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span>
          <br/> JSON WORKBENCH
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-mono opacity-80">
          // A precise collection of tools for data manipulation. <br className="hidden md:block"/>
          // Client-side execution ensuring maximum privacy.
        </p>
        
        {/* Search Input */}
        <div className="relative max-w-lg mx-auto mt-10 group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-black rounded-lg text-lg font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:translate-y-0.5 focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-300 font-mono"
            placeholder="Search functionality..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </section>

      {/* 2. AD SPACE (Future Proofing) */}
      {/* <div className="w-full h-24 bg-[#EAE8E0] border-2 border-black/5 flex items-center justify-center text-black/20 font-bold tracking-widest">
        SPONSORED SLOT
      </div> */}

      {/* 3. TOOLS GRID */}
      <section className="space-y-12">
        {filteredCategories.map((category) => (
          <div key={category.category} className="bg-white/50 p-6 rounded-xl border border-black/5">
            <h2 className="text-2xl font-serif mb-6 items-center gap-3 border-b-2 border-black pb-2 inline-block">
              {category.category}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((tool) => (
                <Link 
                  key={tool.name} 
                  href={tool.status === "Coming Soon" ? "#" : tool.url}
                  className={`
                    group relative flex flex-col justify-between
                    bg-white border-2 border-black p-5 rounded-lg
                    ${tool.status === "Coming Soon" 
                      ? "opacity-70 cursor-not-allowed bg-gray-50 border-dashed" 
                      : "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                    }
                  `}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-2 rounded border border-black ${tool.status === "Coming Soon" ? "bg-gray-100" : "bg-blue-50 group-hover:bg-blue-100"}`}>
                        <tool.icon size={22} strokeWidth={2} />
                      </div>
                      {tool.status === "Coming Soon" && (
                        <span className="text-[10px] font-bold border border-black px-2 py-0.5 rounded-full bg-yellow-200 uppercase tracking-wide">
                          Soon
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 font-mono group-hover:text-blue-700">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-snug">
                      {tool.desc}
                    </p>
                  </div>

                  {tool.status !== "Coming Soon" && (
                    <div className="mt-4 flex justify-end">
                      <span className="text-xs font-bold underline decoration-wavy decoration-blue-400">
                        Launch Tool &rarr;
                      </span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}

        {filteredCategories.length === 0 && (
            <div className="text-center py-20 bg-white border-2 border-dashed border-gray-300 rounded-xl">
              <p className="text-xl font-bold text-gray-400">No tools found matching "{query}"</p>
              <button 
                onClick={() => setQuery("")}
                className="mt-4 text-blue-600 underline"
              >
                Clear Search
              </button>
            </div>
        )}
      </section>

      {/* 4. SEO CONTENT & FAQ */}
<section 
        className="bg-white border-2 border-black p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-sm"
        itemScope 
        itemType="https://schema.org/FAQPage"
      >
        <h2 className="text-3xl font-serif mb-4 text-center">
          Frequently Asked Questions About JSON-Kit
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
          Everything you need to know about using our free online JSON formatter, 
          validator, converter, and visualization tools
        </p>

        <div className="grid md:grid-cols-2 gap-10">

          {/* FAQ 1: Privacy & Security */}
          <article 
            className="space-y-2"
            itemScope 
            itemProp="mainEntity" 
            itemType="https://schema.org/Question"
          >
            <h3 className="font-bold text-lg flex items-center gap-2" itemProp="name">
              <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">?</span>
              Is my JSON data secure and private?
            </h3>
            <div 
              className="text-gray-600 text-sm leading-relaxed pl-8"
              itemScope 
              itemProp="acceptedAnswer" 
              itemType="https://schema.org/Answer"
            >
              <div itemProp="text">
                <p className="mb-2">
                  <strong>Yes, absolutely.</strong> JSON-Kit runs entirely <strong>client-side</strong> in your browser. 
                  All formatting, validation, visualization, and conversion happens locally on your device.
                </p>
                <p>
                  Your JSON data is <strong>never uploaded, transmitted, stored, or logged</strong> on any server. 
                  This makes JSON-Kit completely safe for API responses, configuration files, authentication tokens, 
                  and sensitive payloads. Your privacy is guaranteed.
                </p>
              </div>
            </div>
          </article>

          {/* FAQ 2: File Size */}
          <article 
            className="space-y-2"
            itemScope 
            itemProp="mainEntity" 
            itemType="https://schema.org/Question"
          >
            <h3 className="font-bold text-lg flex items-center gap-2" itemProp="name">
              <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">?</span>
              What is the maximum JSON file size limit?
            </h3>
            <div 
              className="text-gray-600 text-sm leading-relaxed pl-8"
              itemScope 
              itemProp="acceptedAnswer" 
              itemType="https://schema.org/Answer"
            >
              <div itemProp="text">
                <p className="mb-2">
                  JSON-Kit uses your device's memory, so limits depend on your system. Most JSON files 
                  under <strong>50MB</strong> process instantly for formatting, validation, and conversion.
                </p>
                <p>
                  Visual tools like the <a href="/json-visualizer" className="underline font-semibold hover:text-blue-600">JSON Tree Visualizer</a> may 
                  experience slower performance on files larger than 10MB due to rendering complexity. For very large files, 
                  use our <a href="/json-minifier" className="underline font-semibold hover:text-blue-600">JSON Minifier</a> or 
                  <a href="/json-formatter" className="underline font-semibold hover:text-blue-600 ml-1">JSON Formatter</a> optimized for performance.
                </p>
              </div>
            </div>
          </article>

          {/* FAQ 3: Tools Coverage */}
          <article 
            className="space-y-2"
            itemScope 
            itemProp="mainEntity" 
            itemType="https://schema.org/Question"
          >
            <h3 className="font-bold text-lg flex items-center gap-2" itemProp="name">
              <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">?</span>
              What JSON tools does JSON-Kit provide?
            </h3>
            <div 
              className="text-gray-600 text-sm leading-relaxed pl-8"
              itemScope 
              itemProp="acceptedAnswer" 
              itemType="https://schema.org/Answer"
            >
              <div itemProp="text">
                <p className="mb-2">
                  JSON-Kit offers a complete suite of <strong>free online JSON tools</strong> for developers:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><a href="/json-formatter" className="underline font-semibold hover:text-blue-600">JSON Formatter</a> & Beautifier</li>
                  <li><a href="/json-validator" className="underline font-semibold hover:text-blue-600">JSON Validator</a> & Syntax Checker</li>
                  <li><a href="/json-visualizer" className="underline font-semibold hover:text-blue-600">JSON Tree Visualizer</a></li>
                  <li><a href="/json-diff" className="underline font-semibold hover:text-blue-600">JSON Diff</a> & Compare Tool</li>
                  <li><a href="/json-minifier" className="underline font-semibold hover:text-blue-600">JSON Minifier</a> & Compressor</li>
                  <li><a href="/json-to-csv" className="underline font-semibold hover:text-blue-600">JSON to CSV</a>, 
                      <a href="/json-to-excel" className="underline font-semibold hover:text-blue-600 ml-1">Excel</a>, 
                      <a href="/json-to-xml" className="underline font-semibold hover:text-blue-600 ml-1">XML</a>, 
                      <a href="/json-to-yaml" className="underline font-semibold hover:text-blue-600 ml-1">YAML</a>, 
                      <a href="/json-to-sql" className="underline font-semibold hover:text-blue-600 ml-1">SQL</a> Converters</li>
                  <li><a href="/csv-to-json" className="underline font-semibold hover:text-blue-600">CSV to JSON</a>, 
                      <a href="/xml-to-json" className="underline font-semibold hover:text-blue-600 ml-1">XML to JSON</a>, 
                      <a href="/yaml-to-json" className="underline font-semibold hover:text-blue-600 ml-1">YAML to JSON</a></li>
                </ul>
                <p className="mt-2">All tools work <strong>offline</strong> in your browser with no server uploads.</p>
              </div>
            </div>
          </article>

          {/* FAQ 4: Use Cases */}
          <article 
            className="space-y-2"
            itemScope 
            itemProp="mainEntity" 
            itemType="https://schema.org/Question"
          >
            <h3 className="font-bold text-lg flex items-center gap-2" itemProp="name">
              <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">?</span>
              Who uses JSON-Kit and what are common use cases?
            </h3>
            <div 
              className="text-gray-600 text-sm leading-relaxed pl-8"
              itemScope 
              itemProp="acceptedAnswer" 
              itemType="https://schema.org/Answer"
            >
              <div itemProp="text">
                <p className="mb-2">
                  JSON-Kit is used by <strong>software developers, DevOps engineers, data analysts, 
                  QA testers, API developers, data scientists,</strong> and students.
                </p>
                <p className="mb-2"><strong>Common use cases include:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Debugging <strong>REST API responses</strong> and GraphQL queries</li>
                  <li>Formatting JSON for code readability and documentation</li>
                  <li>Validating <strong>JSON syntax errors</strong> before deployment</li>
                  <li>Comparing JSON configuration files for differences</li>
                  <li>Converting JSON data to <strong>CSV for Excel analysis</strong></li>
                  <li>Preparing production-ready <strong>minified JSON</strong></li>
                  <li>Testing API endpoints during development</li>
                  <li>Visualizing complex nested JSON structures</li>
                  <li>Creating config files for <strong>Docker, Kubernetes, and cloud deployments</strong></li>
                </ul>
              </div>
            </div>
          </article>

          {/* FAQ 5: Pricing */}
          <article 
            className="space-y-2"
            itemScope 
            itemProp="mainEntity" 
            itemType="https://schema.org/Question"
          >
            <h3 className="font-bold text-lg flex items-center gap-2" itemProp="name">
              <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">?</span>
              Is JSON-Kit free to use? Are there any limitations?
            </h3>
            <div 
              className="text-gray-600 text-sm leading-relaxed pl-8"
              itemScope 
              itemProp="acceptedAnswer" 
              itemType="https://schema.org/Answer"
            >
              <div itemProp="text">
                <p className="mb-2">
                  <strong>Yes, JSON-Kit is completely free</strong> to use with <strong>no sign-ups, 
                  registrations, or usage limits.</strong> All core tools including JSON formatting, 
                  validation, visualization, comparison, and conversion are available at no cost.
                </p>
                <p>
                  There are <strong>no file size restrictions, no daily usage caps, and no premium tiers.</strong> The 
                  platform is supported through minimal, non-intrusive advertising. You can use JSON-Kit 
                  unlimited times, process unlimited files, and access all features forever free.
                </p>
              </div>
            </div>
          </article>

          {/* FAQ 6: API Access */}
          <article 
            className="space-y-2"
            itemScope 
            itemProp="mainEntity" 
            itemType="https://schema.org/Question"
          >
            <h3 className="font-bold text-lg flex items-center gap-2" itemProp="name">
              <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">?</span>
              Does JSON-Kit provide an API or developer access?
            </h3>
            <div 
              className="text-gray-600 text-sm leading-relaxed pl-8"
              itemScope 
              itemProp="acceptedAnswer" 
              itemType="https://schema.org/Answer"
            >
              <div itemProp="text">
                <p className="mb-2">
                  Currently, JSON-Kit focuses on providing fast, <strong>client-side browser tools</strong> rather 
                  than a hosted API service. This ensures maximum privacy and performance.
                </p>
                <p>
                  However, we're exploring API options for developers who need <strong>programmatic access</strong> to 
                  JSON formatting, validation, and conversion. Parts of our code logic are open-source. For integration 
                  needs, you can embed our tools or use our planned developer API for <strong>CI/CD pipelines, automated 
                  testing, and workflow automation.</strong>
                </p>
              </div>
            </div>
          </article>

          {/* FAQ 7: Comparison with competitors */}
          <article 
            className="space-y-2"
            itemScope 
            itemProp="mainEntity" 
            itemType="https://schema.org/Question"
          >
            <h3 className="font-bold text-lg flex items-center gap-2" itemProp="name">
              <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">?</span>
              How is JSON-Kit better than JSONLint or JSONFormatter.org?
            </h3>
            <div 
              className="text-gray-600 text-sm leading-relaxed pl-8"
              itemScope 
              itemProp="acceptedAnswer" 
              itemType="https://schema.org/Answer"
            >
              <div itemProp="text">
                <p className="mb-2">
                  JSON-Kit offers several advantages over alternatives like <strong>JSONLint and JSONFormatter.org:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><strong>100% client-side processing</strong> for complete privacy (no server uploads)</li>
                  <li><strong>Interactive tree view</strong> visualization of nested JSON structures</li>
                  <li>Built-in <strong>diff comparison tool</strong> for comparing JSON files</li>
                  <li>Multiple export formats: <strong>CSV, Excel, XML, YAML, SQL</strong></li>
                  <li><strong>Modern user interface</strong> with dark mode support</li>
                  <li><strong>Faster performance</strong> with optimized parsing</li>
                  <li>Works <strong>completely offline</strong> after initial load</li>
                  <li>Comprehensive <strong>suite of tools in one place</strong></li>
                  <li>Actively maintained with <strong>regular updates</strong> and new features</li>
                </ul>
              </div>
            </div>
          </article>

          {/* FAQ 8: Offline usage */}
          <article 
            className="space-y-2"
            itemScope 
            itemProp="mainEntity" 
            itemType="https://schema.org/Question"
          >
            <h3 className="font-bold text-lg flex items-center gap-2" itemProp="name">
              <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">?</span>
              Can I use JSON-Kit offline without an internet connection?
            </h3>
            <div 
              className="text-gray-600 text-sm leading-relaxed pl-8"
              itemScope 
              itemProp="acceptedAnswer" 
              itemType="https://schema.org/Answer"
            >
              <div itemProp="text">
                <p className="mb-2">
                  <strong>Yes!</strong> Once you load JSON-Kit in your browser, all tools work <strong>completely offline.</strong> Since 
                  everything runs client-side with no server communication, you can format, validate, visualize, and 
                  convert JSON without any internet connection.
                </p>
                <p>
                  This makes JSON-Kit perfect for working with <strong>sensitive data in air-gapped environments</strong>, during 
                  flights, or in locations with poor connectivity. Simply load the page once, and you can use it offline indefinitely.
                </p>
              </div>
            </div>
          </article>

          {/* FAQ 9: Error fixing */}
          <article 
            className="space-y-2"
            itemScope 
            itemProp="mainEntity" 
            itemType="https://schema.org/Question"
          >
            <h3 className="font-bold text-lg flex items-center gap-2" itemProp="name">
              <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">?</span>
              How do I validate and fix invalid JSON syntax errors?
            </h3>
            <div 
              className="text-gray-600 text-sm leading-relaxed pl-8"
              itemScope 
              itemProp="acceptedAnswer" 
              itemType="https://schema.org/Answer"
            >
              <div itemProp="text">
                <p className="mb-2">
                  JSON-Kit's <a href="/json-validator" className="underline font-semibold hover:text-blue-600">validator</a> automatically 
                  detects <strong>JSON syntax errors</strong> and provides detailed error messages with line numbers and descriptions.
                </p>
                <p className="mb-2">
                  Common errors include: missing commas, unclosed brackets, trailing commas, unquoted keys, and invalid escape sequences. 
                  The validator <strong>highlights the exact location</strong> of errors, making them easy to fix.
                </p>
                <p>
                  Simply paste your JSON, and any syntax errors will be immediately displayed with suggestions for correction. 
                  The formatter also <strong>auto-fixes many common formatting issues.</strong>
                </p>
              </div>
            </div>
          </article>

          {/* FAQ 10: Conversion formats */}
          <article 
            className="space-y-2"
            itemScope 
            itemProp="mainEntity" 
            itemType="https://schema.org/Question"
          >
            <h3 className="font-bold text-lg flex items-center gap-2" itemProp="name">
              <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">?</span>
              What JSON file formats can I convert to?
            </h3>
            <div 
              className="text-gray-600 text-sm leading-relaxed pl-8"
              itemScope 
              itemProp="acceptedAnswer" 
              itemType="https://schema.org/Answer"
            >
              <div itemProp="text">
                <p className="mb-2">JSON-Kit supports <strong>conversion to multiple formats:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><strong>CSV</strong> (Comma-Separated Values) for Excel and spreadsheet analysis</li>
                  <li><strong>XLSX/XLS</strong> (Microsoft Excel format) with proper formatting</li>
                  <li><strong>XML</strong> for legacy systems and SOAP APIs</li>
                  <li><strong>YAML/YML</strong> for configuration files and Kubernetes</li>
                  <li><strong>SQL INSERT statements</strong> for database imports</li>
                  <li><strong>TSV</strong> (Tab-Separated Values)</li>
                  <li>Plain text and HTML tables</li>
                </ul>
                <p className="mt-2">
                  You can also convert <strong>from these formats back to JSON</strong>, including 
                  <a href="/csv-to-json" className="underline font-semibold hover:text-blue-600 ml-1">CSV to JSON</a>, 
                  <a href="/xml-to-json" className="underline font-semibold hover:text-blue-600 ml-1">XML to JSON</a>, 
                  <a href="/yaml-to-json" className="underline font-semibold hover:text-blue-600 ml-1">YAML to JSON</a>, and 
                  <a href="/excel-to-json" className="underline font-semibold hover:text-blue-600 ml-1">Excel to JSON</a>.
                </p>
              </div>
            </div>
          </article>

        </div>

        {/* Additional CTA */}
        <div className="mt-12 text-center p-6 bg-gray-50 rounded-lg border-2 border-black">
          <h3 className="font-bold text-xl mb-2">Still have questions about JSON formatting?</h3>
          <p className="text-gray-600 mb-4">
            Try our free <a href="/json-formatter" className="underline font-semibold hover:text-blue-600">JSON Formatter</a> now 
            or explore our complete suite of <a href="/tools" className="underline font-semibold hover:text-blue-600">JSON tools</a>.
          </p>
          <a 
            href="/json-formatter" 
            className="inline-block bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
          >
            Start Formatting JSON Free
          </a>
        </div>

      </section>

    </div>
  );
}