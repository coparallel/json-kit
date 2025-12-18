"use client";

import { useState } from "react";
import ToolShell from "../components/ToolShell";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";
import { 
  FileJson, 
  Minimize2, 
  Copy, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight 
} from "lucide-react";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // --- Core Logic ---
  const processJson = (spaces: number) => {
    try {
      if (!input.trim()) return;
      
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, spaces);
      
      setInput(formatted);
      setError(null);
      setSuccessMsg(spaces === 0 ? "JSON Minified!" : "JSON Beautified!");
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (e: any) {
      setSuccessMsg(null);
      // Extract a cleaner error message
      setError(e.message.replace("JSON.parse: ", ""));
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
    setSuccessMsg("Copied to clipboard!");
    setTimeout(() => setSuccessMsg(null), 2000);
  };

  const handleClear = () => {
    setInput("");
    setError(null);
    setSuccessMsg(null);
  };

  return (
    <ToolShell
    toolName="JSON Formatter & Validator"
    title="JSON Formatter, Validator and Beautifier"
    description="Format, validate, beautify, and minify JSON instantly. Fix invalid syntax, clean messy JSON, and prepare production-ready data — all processed securely in your browser."

      // --- Internal Links from your list ---
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
      // --- FAQs from your list ---
faqs={[
  {
    question: "What is a JSON formatter?",
    answer:
      "A JSON formatter is a developer tool that formats raw JSON data into a clean, readable structure using proper indentation and spacing. It makes JSON easier to read, debug, and maintain."
  },
  {
    question: "What causes JSON to be invalid?",
    answer:
      "JSON becomes invalid when strict syntax rules are broken. Common issues include using single quotes instead of double quotes, trailing commas, missing brackets, or incorrect nesting of objects and arrays."
  },
  {
    question: "How does a JSON formatter validate JSON?",
    answer:
      "A JSON formatter validates JSON by parsing the input and checking it against JSON syntax standards. If errors exist, the tool highlights them before formatting the data."
  },
  {
    question: "Can this tool fix invalid JSON?",
    answer:
      "This tool identifies syntax errors in invalid JSON and reports them clearly. After fixing the errors, it can instantly format and beautify the JSON into a valid structure."
  },
  {
    question: "What is the difference between JSON formatting and JSON minifying?",
    answer:
      "JSON formatting improves readability by adding indentation and line breaks, while JSON minifying removes unnecessary whitespace to reduce file size for production and API usage."
  },
  {
    question: "Is this JSON formatter secure for sensitive data?",
    answer:
      "Yes. All JSON formatting and validation happens entirely in your browser. Your data is never uploaded or stored on any server."
  },
  {
    question: "Can I format large or deeply nested JSON files?",
    answer:
      "Yes. The tool supports large JSON files and deeply nested objects or arrays. Performance depends on your device, but most complex JSON structures process instantly."
  },
  {
    question: "Does this JSON formatter support arrays and nested objects?",
    answer:
      "Yes. The formatter fully supports JSON arrays and deeply nested objects while preserving the original data structure."
  },
  {
    question: "How is a JSON formatter useful for API development?",
    answer:
      "JSON is the standard format for REST APIs. This tool helps developers validate API responses, debug payload issues, and prepare clean JSON for production systems."
  },
  {
    question: "Is this JSON formatter free to use?",
    answer:
      "Yes. This JSON formatter is completely free with no sign-up, no usage limits, and no data collection."
  }
]}

    >
      {/* --- TOOL INTERFACE --- */}
      <div className="flex flex-col gap-0">
        
        {/* 1. Action Toolbar */}
        <div className="flex flex-wrap items-center gap-3 p-3 bg-white border-2 border-black border-b-0 rounded-t-lg">
          
          <button 
            onClick={() => processJson(2)} 
            className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2 font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-px hover:translate-y-px hover:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <FileJson size={18} /> Beautify
          </button>

          <button 
            onClick={() => processJson(0)} 
            className="flex items-center gap-2 bg-white text-black px-4 py-2 font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-200 hover:translate-x-px hover:translate-y-px hover:shadow-none transition-all"
          >
            <Minimize2 size={18} /> Minify
          </button>

          <div className="h-6 w-px bg-gray-300 mx-2 hidden sm:block"></div>

          <button 
            onClick={handleCopy} 
            title="Copy to Clipboard"
            className="p-2 hover:bg-gray-100 rounded border-2 border-transparent hover:border-black transition-all"
          >
            <Copy size={20} />
          </button>
          
          <button 
            onClick={handleClear} 
            title="Clear Editor"
            className="p-2 text-red-500 hover:bg-red-50 rounded border-2 border-transparent hover:border-red-500 transition-all ml-auto"
          >
            <Trash2 size={20} />
          </button>
        </div>

        {/* 2. The Editor (Paper Card Style) */}
        <div className="relative border-2 border-black bg-[#FDFBF7] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-150 flex flex-col">
          
          {/* Editor Input */}
          <div className="flex-1 overflow-auto p-1 font-mono text-sm" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
            <Editor
              value={input}
              onValueChange={setInput}
              highlight={code => highlight(code, languages.json, 'json')}
              padding={24}
              placeholder="// Paste your messy JSON here..."
              className="min-h-full"
              textareaClassName="focus:outline-none"
            />
          </div>

          {/* 3. Status Footer */}
          <div className={`
            border-t-2 border-black p-3 flex items-center gap-3 font-bold font-mono text-sm transition-colors duration-300
            ${error ? 'bg-red-100 text-red-700' : successMsg ? 'bg-green-100 text-green-800' : 'bg-gray-50 text-gray-500'}
          `}>
            {error ? (
              <>
                <AlertTriangle size={16} strokeWidth={2.5} />
                <span>INVALID: {error}</span>
              </>
            ) : successMsg ? (
              <>
                <CheckCircle size={16} strokeWidth={2.5} />
                <span>{successMsg}</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                <span>Ready to process. Waiting for input...</span>
              </>
            )}
          </div>

        </div>

        {/* 4. Helper Text (Adjacency) */}
        <div className="mt-4 flex justify-between items-center text-xs font-mono text-gray-400">
          <span>Mode: JSON (Standard)</span>
          <span className="hidden sm:inline">Press Ctrl+V to paste</span>
        </div>

      </div>
    </ToolShell>
  );
}