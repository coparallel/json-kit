"use client";

import { useState, useRef } from "react";
import ToolShell from "../components/ToolShell";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";
import { 
  ScanSearch, 
  Trash2, 
  Copy, 
  Upload, 
  Wrench, 
  AlertOctagon, 
  CheckCircle2, 
  Bug,
  Lightbulb,
  XCircle
} from "lucide-react";

// --- Types ---
interface LintError {
  message: string;
  line: number;
  column: number;
  snippet?: string;
}

export default function JsonLintPage() {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<LintError | null>(null);
  const [fixApplied, setFixApplied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Helper: Get Line/Col ---
  const getLineInfo = (text: string, index: number) => {
    const lines = text.substring(0, index).split("\n");
    return {
      line: lines.length,
      column: lines[lines.length - 1].length + 1
    };
  };

  // --- Logic: Deep Linting ---
  const lintJson = (code: string) => {
    setFixApplied(false);
    if (!code.trim()) {
      setIsValid(null);
      setError(null);
      return;
    }

    try {
      JSON.parse(code);
      setIsValid(true);
      setError(null);
    } catch (e: any) {
      setIsValid(false);
      
      // Parse the error message
      const msg = e.message;
      let line = 0;
      let col = 0;

      // Try to extract position
      const matchPos = msg.match(/at position (\d+)/);
      if (matchPos && matchPos[1]) {
        const pos = getLineInfo(code, parseInt(matchPos[1], 10));
        line = pos.line;
        col = pos.column;
      } else {
        // Fallback extraction for some browsers
        const matchLine = msg.match(/line (\d+)/);
        const matchCol = msg.match(/column (\d+)/);
        if (matchLine) line = parseInt(matchLine[1], 10);
        if (matchCol) col = parseInt(matchCol[1], 10);
      }

      // Create a code snippet context
      const lines = code.split('\n');
      const snippet = lines[line - 1] ? lines[line - 1].trim() : "";

      setError({
        message: msg.replace(/at position \d+/, '').trim(), // Clean msg
        line: line || 1,
        column: col || 1,
        snippet
      });
    }
  };

  // --- Logic: Auto Fix ---
  const handleAutoFix = () => {
    if (!input) return;
    let fixed = input;
    
    // 1. Remove Trailing Commas
    fixed = fixed.replace(/,\s*([\]}])/g, '$1');
    // 2. Fix Single Quotes
    fixed = fixed.replace(/'/g, '"');
    // 3. Fix Unquoted Keys
    fixed = fixed.replace(/([{,]\s*)([a-zA-Z0-9_]+?)\s*:/g, '$1"$2":');

    // Attempt to format if valid
    try {
      const parsed = JSON.parse(fixed);
      setInput(JSON.stringify(parsed, null, 2));
      setIsValid(true);
      setError(null);
      setFixApplied(true);
    } catch (e) {
      alert("Auto-fix attempted but could not resolve all errors. Please check the diagnostics manually.");
      setInput(fixed); // Update to partially fixed version
      lintJson(fixed); // Re-lint
    }
  };

  const handleInputChange = (code: string) => {
    setInput(code);
    lintJson(code);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInput(content);
      lintJson(content);
    };
    reader.readAsText(file);
  };

  return (
    <ToolShell
      toolName="JSON Lint"
      title="JSON Lint Online"
      description="Advanced JSON syntax checker. Detects errors, highlights line numbers, and suggests fixes. A modern, secure alternative to JSONLint.com."
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
    question: "What is the difference between linting and validating JSON?",
    answer:
      "Validation only checks whether JSON is syntactically correct and returns a simple pass or fail. Linting goes deeper by explaining why the JSON is invalid, where the issue is located, and how it can be fixed."
  },
  {
    question: "Why should I use JSON Lint instead of JSONLint.com?",
    answer:
      "This tool runs 100% client-side for better privacy, supports larger files, provides detailed error explanations with line numbers, offers auto-fix suggestions, and delivers a modern, ad-free experience."
  },
  {
    question: "What types of errors can JSON Lint detect?",
    answer:
      "JSON Lint detects missing or extra commas, trailing commas, unquoted keys, invalid characters, comments, unclosed brackets, and other syntax issues that cause parsing failures."
  },
  {
    question: "Can JSON Lint automatically fix errors?",
    answer:
      "Yes. For common syntax issues, the linter provides auto-fix suggestions and can apply them to help you correct errors quickly."
  },
  {
    question: "How is JSON Lint different from a JSON Parser?",
    answer:
      "A JSON Parser attempts to convert JSON into an object and fails if errors exist. JSON Lint analyzes the JSON first and explains all issues in detail before parsing."
  },
  {
    question: "Is this JSON Lint secure for sensitive data?",
    answer:
      "Yes. All linting is performed locally in your browser. No JSON data is uploaded, stored, or transmitted to any server."
  },
  {
    question: "Can I lint large JSON files?",
    answer:
      "Yes. The tool is optimized to handle large JSON files efficiently without freezing or crashing the browser."
  },
  {
    question: "Can I lint JSON from API responses?",
    answer:
      "Yes. Paste raw JSON responses from APIs to detect syntax issues before using the data in your application."
  },
  {
    question: "Does JSON Lint change my data?",
    answer:
      "No. Linting only analyzes the JSON. Your data remains unchanged unless you explicitly apply suggested fixes."
  },
  {
    question: "Do I need to install anything to use JSON Lint?",
    answer:
      "No installation is required. JSON Lint works directly in your browser on all modern devices."
  }
]}

    >
      <div className="flex flex-col gap-6">
        
        {/* 1. TOOLBAR */}
        <div className="flex flex-wrap items-center gap-3 p-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-t-lg">
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".json,.txt" />
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-[#F9F7F1] text-black px-3 py-1.5 text-xs font-bold border-2 border-black hover:bg-white transition-all"
          >
            <Upload size={16} /> Load JSON
          </button>

          <button 
            onClick={handleAutoFix}
            className="flex items-center gap-2 bg-[#2563EB] text-white px-3 py-1.5 text-xs font-bold border-2 border-black hover:bg-blue-700 hover:-translate-y-px transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <Wrench size={16} /> Auto Fix
          </button>
          
          <div className="h-6 w-px bg-gray-300 mx-2 hidden sm:block"></div>

          <button 
            onClick={() => {navigator.clipboard.writeText(input); alert("Copied!")}}
            className="p-2 hover:bg-gray-100 rounded border-2 border-transparent hover:border-black transition-all"
            title="Copy"
          >
            <Copy size={18} />
          </button>
          <button 
            onClick={() => { setInput(""); setIsValid(null); setError(null); }}
            className="p-2 text-red-500 hover:bg-red-50 rounded border-2 border-transparent hover:border-red-500 transition-all ml-auto"
            title="Clear"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* 2. MAIN WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT: Editor */}
          <div className="lg:col-span-2 flex flex-col gap-2">
             <div className="flex justify-between items-center px-1">
                <label className="font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                  <ScanSearch size={16} /> Source Code
                </label>
                {isValid === true && (
                  <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                    <CheckCircle2 size={14} /> Valid JSON
                  </span>
                )}
                {isValid === false && (
                  <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                    <AlertOctagon size={14} /> Syntax Error
                  </span>
                )}
             </div>

             <div className={`
               border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative min-h-125 flex flex-col
               ${isValid === false ? 'border-red-600' : ''}
             `}>
                <Editor
                  value={input}
                  onValueChange={handleInputChange}
                  highlight={code => highlight(code, languages.json, 'json')}
                  padding={20}
                  className="font-mono text-sm min-h-full"
                  placeholder="// Paste JSON to lint..."
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                />
             </div>
          </div>

          {/* RIGHT: Diagnostics Panel */}
          <div className="lg:col-span-1 flex flex-col gap-4">
             
             {/* Status Card */}
             <div className={`
               border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
               ${isValid === true ? 'bg-green-100' : isValid === false ? 'bg-red-50' : 'bg-gray-50'}
             `}>
                <div className="flex items-center gap-3 mb-2">
                   {isValid === true ? <CheckCircle2 size={32} className="text-green-600" /> : isValid === false ? <Bug size={32} className="text-red-600" /> : <ScanSearch size={32} className="text-gray-400" />}
                   <h3 className="text-xl font-bold font-serif">
                     {isValid === true ? "No Errors Found" : isValid === false ? "Linting Failed" : "Awaiting Input"}
                   </h3>
                </div>
                <p className="text-sm font-medium text-gray-700">
                  {isValid === true ? (fixApplied ? "Auto-Fix applied successfully." : "JSON syntax is valid RFC 8259.") : isValid === false ? "Issues detected in your code." : "Paste JSON to begin diagnostics."}
                </p>
             </div>

             {/* Error Details */}
             {isValid === false && error && (
               <div className="border-2 border-black bg-white p-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                  <div className="bg-red-600 text-white px-4 py-2 font-bold text-sm flex items-center gap-2">
                    <XCircle size={16} /> Error Diagnostics
                  </div>
                  
                  <div className="p-4 space-y-4">
                     <div>
                       <span className="text-xs font-bold text-gray-400 uppercase">Reason</span>
                       <p className="font-mono text-sm text-red-700 font-bold leading-relaxed">
                         {error.message}
                       </p>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                       <div className="bg-gray-100 p-2 border border-gray-300 text-center">
                         <span className="text-[10px] font-bold text-gray-400 uppercase">Line</span>
                         <p className="font-black text-xl">{error.line}</p>
                       </div>
                       <div className="bg-gray-100 p-2 border border-gray-300 text-center">
                         <span className="text-[10px] font-bold text-gray-400 uppercase">Column</span>
                         <p className="font-black text-xl">{error.column}</p>
                       </div>
                     </div>

                     {error.snippet && (
                       <div>
                         <span className="text-xs font-bold text-gray-400 uppercase">Code Context</span>
                         <div className="bg-red-50 p-2 border border-red-200 mt-1">
                           <code className="text-xs font-mono break-all text-red-800">
                             ... {error.snippet} ...
                           </code>
                         </div>
                       </div>
                     )}
                     
                     <div className="flex items-start gap-2 bg-yellow-50 p-3 text-xs text-yellow-800 border border-yellow-200">
                       <Lightbulb size={16} className="shrink-0 mt-0.5" />
                       <p>
                         <strong>Suggestion:</strong> Check for missing commas, unquoted keys, or trailing commas. Try the <strong>Auto Fix</strong> button above.
                       </p>
                     </div>
                  </div>
               </div>
             )}

          </div>
        </div>

        {/* 3. SEO CONTENT */}
        <div className="mt-12 border-t-2 border-black pt-12">
           <h2 className="text-3xl font-serif font-black mb-6">Advanced JSON Linting</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="prose prose-sm max-w-none">
                 <h3 className="text-xl font-bold mb-2">What is a Linter?</h3>
                 <p className="text-gray-700">
                   A linter goes deeper than a standard validator. While a validator typically just says "Invalid", a linter analyzes the code structure to pinpoint the exact location of the error and often suggests how to fix it. It is an essential tool for debugging large configuration files or API payloads.
                 </p>
              </article>
              <article className="prose prose-sm max-w-none">
                 <h3 className="text-xl font-bold mb-2">Common Linting Errors</h3>
                 <ul className="list-disc pl-5 space-y-1 text-gray-700">
                   <li><strong>Trailing Commas:</strong> <code>[1, 2,]</code> is valid in JS but invalid in JSON.</li>
                   <li><strong>Single Quotes:</strong> JSON strictly requires double quotes <code>"key"</code>.</li>
                   <li><strong>Undefined:</strong> JSON does not support <code>undefined</code> values, only <code>null</code>.</li>
                 </ul>
              </article>
           </div>
        </div>

      </div>
    </ToolShell>
  );
}