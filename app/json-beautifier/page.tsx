"use client";

import { useState, useRef } from "react";
import ToolShell from "../components/ToolShell";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";
import { 
  Wand2, 
  Copy, 
  Trash2, 
  Upload, 
  Download, 
  ArrowRight,
  Indent,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

type IndentOption = 2 | 4 | 'tab';

export default function JsonBeautifierPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState<IndentOption>(2);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Logic ---
  const handleBeautify = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const space = indent === 'tab' ? '\t' : indent;
      const formatted = JSON.stringify(parsed, null, space);
      setOutput(formatted);
      setError(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (e: any) {
      setError("Invalid JSON: " + e.message);
      setOutput("");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setInput(event.target?.result as string || "");
    reader.readAsText(file);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'beautified.json';
    link.click();
  };

  return (
    <ToolShell
      toolName="JSON Beautifier"
      title="JSON Beautifier Online"
      description="Make minified JSON clean and readable instantly. Transform ugly data into a structured format with syntax highlighting and custom indentation."
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
    question: "Is JSON Beautifier different from a JSON Formatter?",
    answer:
      "Functionally, they perform the same operation. A JSON Beautifier is typically used to convert minified or compressed JSON into a readable format, while a JSON Formatter refers to general formatting or style normalization. Both rely on pretty-print logic and do not change the underlying data."
  },
  {
    question: "How do I beautify minified JSON?",
    answer:
      "Paste your one-line or compressed JSON into the input panel and click 'Beautify'. The tool automatically inserts proper indentation, spacing, and line breaks."
  },
  {
    question: "Will beautifying JSON change my data?",
    answer:
      "No. Beautifying only affects whitespace and formatting. Keys, values, data types, and structure remain exactly the same."
  },
  {
    question: "Can I beautify JSON from an API response?",
    answer:
      "Yes. Copy the raw JSON response from any API and paste it into the beautifier to instantly make it readable."
  },
  {
    question: "Does the JSON Beautifier support large files?",
    answer:
      "Yes. The tool efficiently handles large JSON files without freezing the browser by using optimized client-side processing."
  },
  {
    question: "Is this JSON Beautifier secure?",
    answer:
      "Yes. All beautification happens locally in your browser. No JSON data is uploaded, stored, or sent to any server."
  },
  {
    question: "Can I choose the indentation level?",
    answer:
      "Yes. You can select common indentation styles such as 2 spaces or 4 spaces to match your coding standards."
  },
  {
    question: "Does the JSON Beautifier work offline?",
    answer:
      "Yes. The tool can be installed as a Progressive Web App and used offline once loaded."
  },
  {
    question: "What happens if my JSON is invalid?",
    answer:
      "If the JSON contains syntax errors, the tool will highlight the issue so you can correct it before beautifying."
  },
  {
    question: "Do I need to install anything to use the JSON Beautifier?",
    answer:
      "No installation is required. The JSON Beautifier runs directly in your browser and works on all modern devices."
  }
]}

    >
      <div className="flex flex-col gap-6">
        
        {/* 1. CONTROL BAR */}
        <div className="flex flex-wrap items-center gap-4 p-4 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg">
          
          <div className="flex items-center gap-2 mr-auto">
            <span className="text-sm font-bold uppercase tracking-wider flex items-center gap-1">
              <Indent size={16} /> Indentation:
            </span>
            <div className="flex border border-black rounded-sm overflow-hidden">
               <button 
                 onClick={() => setIndent(2)} 
                 className={`px-3 py-1 text-xs font-bold transition-colors ${indent === 2 ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
               >
                 2 Spaces
               </button>
               <button 
                 onClick={() => setIndent(4)} 
                 className={`px-3 py-1 text-xs font-bold border-l border-black transition-colors ${indent === 4 ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
               >
                 4 Spaces
               </button>
               <button 
                 onClick={() => setIndent('tab')} 
                 className={`px-3 py-1 text-xs font-bold border-l border-black transition-colors ${indent === 'tab' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
               >
                 Tab
               </button>
            </div>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".json" />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#F9F7F1] text-black px-4 py-2 text-xs font-bold border-2 border-black hover:bg-white transition-all"
            >
              <Upload size={16} /> Upload
            </button>
            
            <button 
              onClick={handleBeautify}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#2563EB] text-white px-6 py-2 text-sm font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-px hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <Wand2 size={16} /> Beautify JSON
            </button>
          </div>
        </div>

        {/* 2. WORKSPACE (Split View) */}
         <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
          
          {/* LEFT: Input (Ugly) */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center px-1">
              <label className="font-bold text-sm uppercase tracking-wide text-gray-500">
                Minified / Ugly JSON
              </label>
              <button 
                onClick={() => setInput("")} 
                className="text-xs text-red-500 font-bold hover:underline flex items-center gap-1"
              >
                <Trash2 size={12} /> Clear
              </button>
            </div>
            
            <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-125 flex flex-col relative">
              <Editor
                value={input}
                onValueChange={setInput}
                highlight={code => highlight(code, languages.json, 'json')}
                padding={20}
                className="font-mono text-sm min-h-full"
                placeholder='{"id":1,"name":"Paste Minified JSON Here..."}'
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              />
              {error && (
                 <div className="absolute bottom-4 left-4 right-4 bg-red-100 border-2 border-red-500 text-red-700 text-xs font-bold p-2 flex items-center gap-2 animate-in slide-in-from-bottom-2">
                   <AlertTriangle size={14} /> {error}
                 </div>
              )}
            </div>
          </div>

          {/* ARROW (Desktop only) */}
          <div className="hidden md:flex flex-col justify-center items-center text-gray-400">
             <ArrowRight size={32} strokeWidth={1.5} />
          </div>

          {/* RIGHT: Output (Pretty) */}
          <div className="flex flex-col gap-2">
             <div className="flex justify-between items-center px-1">
                <label className="font-bold text-sm uppercase tracking-wide text-green-700">
                  Beautified Result
                </label>
                {success && (
                  <span className="text-xs text-green-600 font-bold flex items-center gap-1 animate-pulse">
                    <CheckCircle2 size={12} /> Beautified!
                  </span>
                )}
             </div>

             <div className="border-2 border-black bg-[#FDFBF7] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-125 flex flex-col relative">
                <div className="flex-1 overflow-auto">
                   <Editor
                     value={output}
                     onValueChange={() => {}} // Read only
                     highlight={code => highlight(code, languages.json, 'json')}
                     padding={20}
                     className="font-mono text-sm min-h-full"
                     style={{ fontFamily: '"JetBrains Mono", monospace' }}
                   />
                </div>
                
                {/* Actions Footer */}
                <div className="border-t-2 border-black bg-white p-2 flex justify-end gap-2">
                   <button 
                     onClick={() => {navigator.clipboard.writeText(output); alert("Copied!")}}
                     disabled={!output}
                     className="p-2 hover:bg-gray-100 border-2 border-transparent hover:border-black rounded disabled:opacity-50 transition-all"
                     title="Copy"
                   >
                     <Copy size={16} />
                   </button>
                   <button 
                     onClick={handleDownload}
                     disabled={!output}
                     className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 text-xs font-bold border-2 border-black hover:bg-green-700 disabled:opacity-50 transition-all"
                   >
                     <Download size={14} /> Download
                   </button>
                </div>
             </div>
          </div>

        </div>

        {/* 3. SEO CONTENT SECTION */}
        <div className="mt-16 border-t-2 border-black pt-12">
           <h2 className="text-3xl font-serif font-black mb-8 text-center">Why use a JSON Beautifier?</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                 <h3 className="font-bold text-lg mb-2">Readable Data</h3>
                 <p className="text-sm text-gray-600 leading-relaxed">
                   APIs often return minified JSON to save bandwidth. This is impossible for humans to read. Beautifying it restores the structure so you can understand the data hierarchy.
                 </p>
              </div>

              <div className="bg-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                 <h3 className="font-bold text-lg mb-2">Syntax Highlighting</h3>
                 <p className="text-sm text-gray-600 leading-relaxed">
                   Our tool colors keys, strings, numbers, and booleans differently. This makes it much easier to spot incorrect data types or missing values at a glance.
                 </p>
              </div>

              <div className="bg-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                 <h3 className="font-bold text-lg mb-2">Safe & Private</h3>
                 <p className="text-sm text-gray-600 leading-relaxed">
                   Sensitive configuration files or user data should never leave your computer. Our client-side processing ensures zero data leakage.
                 </p>
              </div>
           </div>

           <div className="mt-12 bg-gray-100 border-2 border-black p-8 rounded-lg">
              <h3 className="font-serif font-bold text-2xl mb-4">How to Beautify JSON</h3>
              <ol className="list-decimal pl-5 space-y-3 font-medium text-gray-700">
                <li>Copy your raw, minified JSON string.</li>
                <li>Paste it into the left-hand editor panel above.</li>
                <li>Select your indentation preference (2 Spaces is standard).</li>
                <li>Click the blue <strong>Beautify JSON</strong> button.</li>
                <li>Copy the result or download the <code>.json</code> file.</li>
              </ol>
           </div>
        </div>

      </div>
    </ToolShell>
  );
}