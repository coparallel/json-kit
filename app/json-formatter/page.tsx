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
      toolName="JSON Formatter"
      title="JSON Formatter & Validator"
      description="The ultimate workspace to clean up messy data. Paste your JSON to validate syntax, prettify the structure, or minify it for production."
      // --- Internal Links from your list ---
      relatedLinks={[
        { name: "JSON Minifier", url: "/json-formatter" }, // Self-ref (feature exists here) or separate if you build it
        { name: "JSON Diff", url: "/json-diff" },
        { name: "JSON to CSV", url: "/json-to-csv" }
      ]}
      // --- FAQs from your list ---
      faqs={[
        { 
          question: "Why is my JSON invalid?", 
          answer: "JSON is strict. Common errors include: 1) Using single quotes (') instead of double quotes (\"). 2) Trailing commas after the last item. 3) Missing curly braces. Our tool highlights these syntax errors instantly." 
        },
        { 
          question: "How to format JSON automatically?", 
          answer: "Simply paste your raw text into the editor above. Click 'Beautify (2 Spaces)' for standard reading, or '4 Spaces' for deep indentation." 
        },
        {
          question: "Is my data safe?",
          answer: "Yes. This tool runs entirely in your browser using JavaScript. No data is sent to any server."
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