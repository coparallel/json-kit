"use client";

import { useState } from "react";
import ToolShell from "../components/ToolShell";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";
import { 
  Minimize2, 
  Copy, 
  Trash2, 
  Download, 
  ArrowDown, 
  Zap 
} from "lucide-react";

export default function JsonMinifierPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [stats, setStats] = useState<{ original: number; minified: number; saved: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // --- Helper: Format Bytes ---
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // --- Logic: Minify ---
  const handleMinify = () => {
    try {
      if (!input.trim()) return;
      
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed, null, 0);
      
      const originalSize = new Blob([input]).size;
      const minifiedSize = new Blob([minified]).size;
      const savedPercent = ((originalSize - minifiedSize) / originalSize) * 100;

      setOutput(minified);
      setStats({
        original: originalSize,
        minified: minifiedSize,
        saved: Math.max(0, parseFloat(savedPercent.toFixed(1)))
      });
      setError(null);

    } catch (e: any) {
      setError("Invalid JSON: " + e.message);
      setOutput("");
      setStats(null);
    }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'minified.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
<ToolShell
  toolName="JSON Minifier"
  title="JSON Minifier – Compress & Optimize JSON for Production"
  description="Minify JSON instantly by removing unnecessary whitespace and formatting. Reduce file size, optimize API payloads, and improve performance. 100% client-side and secure."
  relatedLinks={[
    { name: "JSON Formatter", url: "/json-formatter" },
    { name: "JSON Visualizer", url: "/json-visualizer" },
    { name: "JSON Validator", url: "/json-validator" },
    { name: "JSON Diff", url: "/json-diff" },
    { name: "JSON Minifier", url: "/json-minifier" },
    { name: "JSON Beautifier", url: "/json-beautifier" },
    { name: "JSON Compressor & Decompressor", url: "/json-compressor" },
    { name: "JSON Editor", url: "/json-editor" },
    { name: "JSON viewer", url: "/json-viewer" },
    { name: "JSON to XML", url: "/json-to-xml" },
    { name: "JSON to YAML", url: "/json-to-yaml" },
    { name: "JSON to CSV", url: "/json-to-csv" },
    { name: "JSON Lint", url: "/json-lint" },
    { name: "JSON Parser", url: "/json-parser" }
  ]}
  faqs={[
    {
      question: "What is a JSON minifier?",
      answer:
        "A JSON minifier is a tool that compresses JSON data by removing unnecessary whitespace, line breaks, and indentation. This reduces file size without changing the actual data or structure."
    },
    {
      question: "How does JSON minification reduce file size?",
      answer:
        "JSON minification removes formatting characters that are only useful for human readability. By eliminating spaces and newlines, JSON file size can often be reduced by 30–60%."
    },
    {
      question: "Does minifying JSON change the data?",
      answer:
        "No. JSON minification does not modify keys, values, or structure. The data remains exactly the same, only the formatting is removed."
    },
    {
      question: "When should I minify JSON?",
      answer:
        "JSON should be minified before sending data over networks, deploying APIs, or serving JSON files in production environments to reduce bandwidth usage and improve performance."
    },
    {
      question: "Should I format JSON before minifying it?",
      answer:
        "Yes. Formatting and validating JSON first helps ensure the data is valid and readable. You can use the JSON Formatter to clean the data before minifying it."
    },
    {
      question: "Is this JSON minifier safe for sensitive data?",
      answer:
        "Yes. All JSON minification happens entirely in your browser. No data is uploaded, stored, or transmitted to any server."
    },
    {
      question: "Can this tool handle large JSON files?",
      answer:
        "Yes. The JSON minifier supports large files and deeply nested structures. Performance depends on your device, but most files are processed instantly."
    },
    {
      question: "Is this JSON minifier free to use?",
      answer:
        "Yes. This JSON minifier is completely free, with no sign-up, no usage limits, and no data tracking."
    }
  ]}
>

      <div className="flex flex-col gap-8">
        
        {/* --- 1. INPUT SECTION --- */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center px-1">
             <label className="font-bold text-sm uppercase tracking-wide">Input JSON (Prettified)</label>
             <button onClick={() => { setInput(""); setStats(null); setOutput(""); }} className="text-red-500 text-xs font-bold hover:underline flex items-center gap-1">
               <Trash2 size={12} /> Clear
             </button>
          </div>
          <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-h-62.5 relative">
            <Editor
              value={input}
              onValueChange={setInput}
              highlight={code => highlight(code, languages.json, 'json')}
              padding={20}
              className="font-mono text-sm min-h-full"
              placeholder="// Paste large JSON here..."
            />
          </div>
        </div>

        {/* --- 2. ACTION BAR --- */}
        <div className="flex flex-col items-center justify-center gap-4 py-2">
           <button 
             onClick={handleMinify}
             className="bg-[#2563EB] text-white px-8 py-3 rounded-full font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all flex items-center gap-2 text-lg"
           >
             <Minimize2 size={24} /> Compress JSON
           </button>
           
           {error && <span className="text-red-600 font-bold bg-red-100 px-2 py-1 border border-red-500 text-sm">{error}</span>}
        </div>

        {/* --- 3. OUTPUT & STATS --- */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-sm uppercase tracking-wide">Minified Output</label>
          
          <div className="border-2 border-black bg-[#FDFBF7] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
             
             {/* Stats Header */}
             {stats && (
               <div className="bg-yellow-200 border-b-2 border-black p-4 flex flex-wrap gap-4 items-center justify-between">
                 <div className="flex items-center gap-6 text-sm font-mono font-bold">
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-xs uppercase">Original</span>
                      <span>{formatBytes(stats.original)}</span>
                    </div>
                    <ArrowDown size={20} className="text-gray-400" />
                    <div className="flex flex-col">
                      <span className="text-blue-600 text-xs uppercase">Minified</span>
                      <span>{formatBytes(stats.minified)}</span>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-2 bg-black text-white px-3 py-1 rounded-full text-xs font-bold">
                   <Zap size={14} className="fill-yellow-400 text-yellow-400" />
                   Saved {stats.saved}%
                 </div>
               </div>
             )}

             {/* Output Textarea */}
             <div className="relative">
               <textarea
                 readOnly
                 value={output}
                 className="w-full h-50 p-4 font-mono text-sm bg-transparent resize-y focus:outline-none break-all text-gray-600"
                 placeholder="Minified result string..."
               />
               
               {/* Overlay Copy/Download Buttons */}
               <div className="absolute bottom-4 right-4 flex gap-2">
                  <button 
                    onClick={() => { navigator.clipboard.writeText(output); alert("Copied!"); }} 
                    disabled={!output}
                    className="bg-white text-black p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Copy to Clipboard"
                  >
                    <Copy size={18} />
                  </button>
                  <button 
                    onClick={handleDownload}
                    disabled={!output} 
                    className="bg-green-600 text-white p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Download .json file"
                  >
                    <Download size={18} />
                  </button>
               </div>
             </div>
          </div>
        </div>

      </div>
    </ToolShell>
  );
}