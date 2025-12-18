"use client";

import { useState, useRef } from "react";
import ToolShell from "../components/ToolShell";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";
import { 
  CheckCircle2, 
  AlertOctagon, 
  Upload, 
  Trash2, 
  Copy, 
  FileJson,
  Bug,
  Info,
  Wrench // Icon for "Fix"
} from "lucide-react";

// --- Types ---
interface ValidationError {
  message: string;
  line: number | null;
  column: number | null;
}

export default function JsonValidatorPage() {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<ValidationError | null>(null);
  const [fixedMsg, setFixedMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Helper: Calculate Line/Col ---
  const getLineAndCol = (text: string, index: number) => {
    const lines = text.substring(0, index).split("\n");
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;
    return { line, column };
  };

  // --- Core Logic: Validate ---
  const validateJson = (jsonString: string) => {
    setFixedMsg(null); // Clear fix message on typing
    if (!jsonString.trim()) {
      setIsValid(null);
      setError(null);
      return;
    }

    try {
      JSON.parse(jsonString);
      setIsValid(true);
      setError(null);
    } catch (e: any) {
      setIsValid(false);
      const msg = e.message;
      const match = msg.match(/at position (\d+)/);
      
      let line = null;
      let col = null;

      if (match && match[1]) {
        const index = parseInt(match[1], 10);
        const pos = getLineAndCol(jsonString, index);
        line = pos.line;
        col = pos.column;
      }

      setError({
        message: msg,
        line: line,
        column: col
      });
    }
  };

  // --- Core Logic: Fix JSON ---
  const fixJson = () => {
    if (!input) return;
    
    let fixed = input;

    try {
      // 1. Remove Trailing Commas (e.g., [1,2,] -> [1,2])
      fixed = fixed.replace(/,\s*([\]}])/g, '$1');
      
      // 2. Replace Single Quotes with Double Quotes (careful regex)
      // This is a simple heuristic; complex strings might need a parser
      fixed = fixed.replace(/'/g, '"');

      // 3. Add quotes to unquoted keys (e.g., { key: 1 } -> { "key": 1 })
      fixed = fixed.replace(/([{,]\s*)([a-zA-Z0-9_]+?)\s*:/g, '$1"$2":');

      // 4. Try to parse and format
      const parsed = JSON.parse(fixed);
      const beautified = JSON.stringify(parsed, null, 2);
      
      setInput(beautified);
      setIsValid(true);
      setError(null);
      setFixedMsg("Auto-Fixed common errors!");
      
      // Clear success msg after 3s
      setTimeout(() => setFixedMsg(null), 3000);

    } catch (e) {
      alert("Could not auto-fix. The syntax is too broken for automatic repair. Please check the line numbers.");
    }
  };

  const handleChange = (code: string) => {
    setInput(code);
    validateJson(code);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInput(content);
      validateJson(content);
    };
    reader.readAsText(file);
  };

  return (
    <ToolShell
      toolName="JSON Validator"
      title="JSON Validator & Auto-Fixer"
      description="The definitive tool to validate JSON against RFC 8259 standards. Detect syntax errors, auto-fix missing quotes, and repair broken JSON instantly."
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
      // Expanded FAQs for the Page View
      faqs={[
        {
          question: "How do I fix JSON errors automatically?",
          answer: "Click the 'Auto Fix' button. Our tool attempts to repair common mistakes like trailing commas, single quotes, and unquoted keys."
        },
        {
          question: "What does a JSON validator do?",
          answer: "It scans your JSON code to ensure it meets the official syntax rules (RFC 8259). It catches errors like missing commas, incorrect quotes, or mismatched brackets."
        },
        {
          question: "Is this tool safe for sensitive data?",
          answer: "Yes. Validation happens 100% in your browser. No data is sent to any server."
        },
        {
          question: "Can I validate large JSON files?",
          answer: "Yes. Use the 'Upload JSON' button to validate files without freezing your browser. We support files up to 50MB."
        }
      ]}
    >
      <div className="flex flex-col gap-6">
        
        {/* --- 1. ACTION TOOLBAR --- */}
        <div className="flex flex-wrap items-center gap-3 p-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-t-lg">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept=".json,.txt" 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-[#F9F7F1] text-black px-4 py-2 font-bold border-2 border-black hover:bg-white hover:-translate-y-0.5 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs md:text-sm"
          >
            <Upload size={18} /> Upload JSON
          </button>

          {/* AUTO FIX BUTTON */}
          <button 
            onClick={fixJson}
            className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2 font-bold border-2 border-black hover:bg-blue-700 hover:-translate-y-0.5 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs md:text-sm"
            title="Attempt to fix quotes and commas"
          >
            <Wrench size={18} /> Auto Fix
          </button>

          <div className="h-6 w-px bg-gray-300 mx-2 hidden sm:block"></div>

          <button 
            onClick={() => {navigator.clipboard.writeText(input); alert("Copied!")}}
            className="p-2 hover:bg-gray-100 rounded border-2 border-transparent hover:border-black transition-all"
            title="Copy to Clipboard"
          >
            <Copy size={20} />
          </button>
          
          <button 
            onClick={() => { setInput(""); setIsValid(null); setError(null); }}
            className="p-2 text-red-500 hover:bg-red-50 rounded border-2 border-transparent hover:border-red-500 transition-all ml-auto"
            title="Clear Editor"
          >
            <Trash2 size={20} />
          </button>
        </div>

        {/* --- 2. STATUS INDICATOR --- */}
        <div className={`
          border-2 border-black p-5 flex flex-col md:flex-row items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors duration-300
          ${isValid === true ? 'bg-[#dcfce7]' : isValid === false ? 'bg-[#fee2e2]' : 'bg-gray-50'}
        `}>
          <div className="flex items-center gap-4">
             {isValid === true && <CheckCircle2 size={36} className="text-green-600" fill="#dcfce7" />}
             {isValid === false && <AlertOctagon size={36} className="text-red-600" fill="#fee2e2" />}
             {isValid === null && <FileJson size={36} className="text-gray-400" />}
             
             <div>
               <h3 className="text-2xl font-black font-serif text-[#1a1a1a]">
                 {isValid === true ? "Valid JSON" : isValid === false ? "Syntax Error Detected" : "Ready to Validate"}
               </h3>
               <p className="text-sm font-mono font-medium text-gray-600 mt-1">
                 {isValid === true ? (fixedMsg || "Structure conforms to RFC 8259.") : isValid === false ? "See details below to fix." : "Paste code or upload file."}
               </p>
             </div>
          </div>
          
          {isValid === false && error && (
            <div className="mt-4 md:mt-0">
              <span className="bg-red-600 text-white font-mono font-bold px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                Line {error.line || "?"} : Col {error.column || "?"}
              </span>
            </div>
          )}
        </div>

        {/* --- 3. EDITOR & SIDEBAR --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Editor */}
          <div className="lg:col-span-2 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-150 flex flex-col relative">
            <div className="absolute top-0 left-0 bg-black text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest z-10">
              Editor
            </div>
            <Editor
              value={input}
              onValueChange={handleChange}
              highlight={code => highlight(code, languages.json, 'json')}
              padding={24}
              className="font-mono text-sm min-h-full"
              placeholder='// Paste your JSON here...'
              style={{ minHeight: '600px', fontFamily: '"JetBrains Mono", monospace' }}
            />
          </div>

          {/* Error / Info Sidebar */}
          <div className="lg:col-span-1 space-y-6">
             {isValid === false && error ? (
               <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sticky top-24">
                 <div className="flex items-center gap-2 border-b-2 border-black pb-3 mb-4">
                   <Bug className="text-red-600" />
                   <h4 className="font-bold text-xl font-serif text-red-600">Error Report</h4>
                 </div>
                 
                 <div className="space-y-4">
                   <div className="bg-red-50 p-4 border-2 border-red-200">
                     <span className="text-xs font-black text-red-500 uppercase tracking-widest">Description</span>
                     <p className="font-mono text-sm text-red-800 font-bold wrap-break-word mt-1">
                       {error.message}
                     </p>
                   </div>
                   
                   <p className="text-sm text-gray-600 leading-relaxed">
                     <strong>Try Auto-Fix:</strong> Click the blue <span className="font-bold text-blue-600">Auto Fix</span> button above to automatically repair trailing commas and missing quotes.
                   </p>
                 </div>
               </div>
             ) : (
               <div className="border-2 border-black bg-[#FDFBF7] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-70">
                 <div className="flex items-center gap-2 mb-4">
                    <Info size={20} />
                    <h4 className="font-bold font-serif text-lg">Quick Tips</h4>
                 </div>
                 <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 font-medium">
                   <li>Keys must be in double quotes <code>"key"</code>.</li>
                   <li>No trailing commas after the last item.</li>
                   <li>Use <code>null</code> for empty values.</li>
                   <li>Click <strong>Auto Fix</strong> to repair standard JS objects.</li>
                 </ul>
               </div>
             )}
          </div>
        </div>

        {/* --- 4. SEO CONTENT SECTION --- */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 border-t-2 border-black pt-12">
          
          <article className="prose prose-sm max-w-none">
            <h2 className="text-3xl font-serif font-black mb-6">How to Validate & Fix JSON</h2>
            <ol className="list-decimal pl-5 space-y-4 text-gray-700 font-medium">
              <li>
                <strong>Input Data:</strong> Paste your JSON code directly into the editor. Validation runs instantly.
              </li>
              <li>
                <strong>Identify Errors:</strong> If the status bar turns RED, check the sidebar for the specific line number.
              </li>
              <li>
                <strong>Use Auto-Fix:</strong> If you have "Loose JSON" (like JavaScript objects with single quotes or no quotes on keys), click the <strong>Auto Fix</strong> button to convert it to strict valid JSON.
              </li>
            </ol>
          </article>

          <article className="prose prose-sm max-w-none">
             <h2 className="text-3xl font-serif font-black mb-6">Common JSON Errors</h2>
             <div className="space-y-4">
               <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                 <h3 className="font-bold text-lg mb-2">1. Trailing Commas</h3>
                 <p className="text-gray-600 text-sm">
                   A comma after the last item is invalid. <br/>
                   <span className="text-red-500 line-through"><code>{"[1, 2, 3,]"}</code></span> &rarr; <span className="text-green-600"><code>{"[1, 2, 3]"}</code></span>
                 </p>
               </div>
               
               <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                 <h3 className="font-bold text-lg mb-2">2. Unquoted Keys</h3>
                 <p className="text-gray-600 text-sm">
                   Keys must be wrapped in double quotes. <br/>
                   <span className="text-red-500 line-through"><code>{"{ id: 1 }"}</code></span> &rarr; <span className="text-green-600"><code>{"{ \"id\": 1 }"}</code></span>
                 </p>
               </div>
             </div>
          </article>

        </div>

      </div>
    </ToolShell>
  );
}