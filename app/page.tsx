

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

// --- Tool Data ---
const tools = [
  {
    category: "Essentials",
    items: [
      { name: "JSON Visualizer", url: "/json-visualizer", icon: Network, desc: "Interactive graph view of your data nodes." },
      { name: "JSON Formatter", url: "/json-formatter", icon: FileJson, desc: "Validate, minify, and beautify code." },
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

  return (
    <div className="space-y-16 animate-in fade-in duration-500">
      
      {/* 1. HERO SECTION */}
      <section className="text-center py-12 md:py-20 space-y-6 relative">
        {/* Decorative elements behind */}
        <div className="absolute top-0 left-10 opacity-10 -rotate-12 hidden lg:block">
          <FileJson size={120} />
        </div>
        <div className="absolute bottom-0 right-10 opacity-10 rotate-12 hidden lg:block">
          <Terminal size={120} />
        </div>

        <div className="inline-block border-2 border-black bg-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
          v1.0.0 Public Beta
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif text-[#1a1a1a] leading-[1.1]">
          The <span className="italic text-blue-700">Universal</span> <br/>
          JSON Workbench
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed font-serif italic">
          "A precise collection of tools for data manipulation. <br className="hidden md:block"/>
          Client-side execution ensuring maximum privacy."
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
      <section className="bg-white border-2 border-black p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-sm">
        <h2 className="text-3xl font-serif mb-8 text-center">Frequently Asked Questions</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <article className="space-y-2">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">?</span>
              Is my JSON data safe?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed pl-8">
              Yes. <strong>JSON-Kit is purely client-side.</strong> Your data is processed using JavaScript in your own browser memory. It never touches a server, making it safe for sensitive configurations or API keys (though we always recommend sanitizing sensitive data first).
            </p>
          </article>

          <article className="space-y-2">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">?</span>
              Is there a file size limit?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed pl-8">
              Since we use your browser's resources, the limit depends on your computer's RAM. Generally, text files up to 50MB render instantly. Visualization graphs may perform slower on files larger than 10MB.
            </p>
          </article>

          <article className="space-y-2">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">?</span>
              Is this completely free?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed pl-8">
              Yes, JSON-Kit is free and open-source. We cover costs via non-intrusive advertising. There are no paywalls for standard utilities like formatting, validating, or converting.
            </p>
          </article>

           <article className="space-y-2">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">?</span>
              Do you have an API?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed pl-8">
              Currently, we do not offer a public API as all logic is contained within the frontend application. However, you can check our GitHub repository to see how the transformation logic works.
            </p>
          </article>
        </div>
      </section>

    </div>
  );
}