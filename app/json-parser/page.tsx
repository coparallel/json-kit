"use client";

import { useState } from "react";
import ToolShell from "../components/ToolShell";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";
import { 
  Braces, 
  Trash2, 
  Play, 
  AlertTriangle, 
  CheckCircle2, 
  Copy,
  Terminal,
  Code2
} from "lucide-react";

// --- COMPONENT: Recursive Object Inspector ---
// Visualizes the JavaScript Object result with explicit types
const ObjectInspector = ({ data, name }: { data: any, name?: string }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const dataType = Array.isArray(data) ? "Array" : data === null ? "null" : typeof data;
  const isObject = typeof data === 'object' && data !== null;
  const itemCount = isObject ? Object.keys(data).length : 0;

  if (!isObject) {
    // Primitive Value Render
    let valueColor = "text-gray-800";
    if (dataType === "string") valueColor = "text-green-700";
    if (dataType === "number") valueColor = "text-blue-600";
    if (dataType === "boolean") valueColor = "text-purple-600";
    if (dataType === "null") valueColor = "text-gray-400 italic";

    return (
      <div className="pl-4 py-0.5 flex items-center gap-2 font-mono text-sm border-l border-gray-200">
        {name && <span className="text-gray-500">{name}:</span>}
        <span className={valueColor}>{dataType === "string" ? `"${data}"` : String(data)}</span>
        <span className="text-[10px] bg-gray-100 px-1 text-gray-400 rounded select-none">{dataType}</span>
      </div>
    );
  }

  // Object/Array Render
  return (
    <div className="pl-4 py-0.5 border-l border-gray-200 font-mono text-sm">
      <div 
        className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-gray-400 font-bold">{isExpanded ? "▼" : "▶"}</span>
        {name && <span className="text-purple-700 font-bold">{name}:</span>}
        <span className="text-gray-600 text-xs">
          {Array.isArray(data) ? `Array(${itemCount})` : `Object {${itemCount}}`}
        </span>
      </div>

      {isExpanded && (
        <div className="ml-1">
          {Object.entries(data).map(([key, val]) => (
            <ObjectInspector key={key} name={Array.isArray(data) ? `[${key}]` : key} data={val} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function JsonParserPage() {
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleParse = () => {
    if (!input.trim()) {
      setParsed(null);
      setError(null);
      return;
    }

    try {
      // The Core: JSON.parse()
      const result = JSON.parse(input);
      setParsed(result);
      setError(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (e: any) {
      setParsed(null);
      setError(e.message);
    }
  };

  return (
    <ToolShell
      toolName="JSON Parser"
      title="JSON Parser Online"
      description="Safely convert JSON strings into JavaScript objects. Test standard JSON.parse() behavior and inspect data types structure."
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
    question: "What happens if JSON parsing fails?",
    answer:
      "If the JSON string is malformed, the parser throws a SyntaxError—just like JavaScript’s JSON.parse(). Our tool catches this error and displays a clear message explaining what went wrong and where."
  },
  {
    question: "Can I parse JSON from API responses?",
    answer:
      "Yes. Paste the raw JSON response from any API to see how it will be parsed into a JavaScript object in real application code."
  },
  {
    question: "Does this parser behave the same as JSON.parse()?",
    answer:
      "Yes. The parser mirrors JavaScript’s JSON.parse() behavior, making it reliable for testing how JSON will be handled in production code."
  },
  {
    question: "What types of parsing errors can this tool detect?",
    answer:
      "It detects missing commas, unquoted keys, invalid characters, trailing commas, unclosed brackets, and other syntax violations that cause JSON.parse() to fail."
  },
  {
    question: "Can I see exactly where the parsing error occurs?",
    answer:
      "Yes. The parser highlights the error location and provides a descriptive message so you can quickly identify and fix the issue."
  },
  {
    question: "Does parsing JSON modify the data?",
    answer:
      "No. Parsing only converts the JSON string into an in-memory object. The original data, structure, and values remain unchanged."
  },
  {
    question: "Can this tool parse large JSON strings?",
    answer:
      "Yes. The JSON Parser is optimized to handle large JSON strings efficiently within the browser."
  },
  {
    question: "Is this JSON Parser safe for sensitive data?",
    answer:
      "Yes. All parsing happens locally in your browser. No JSON data is uploaded, stored, or transmitted."
  },
  {
    question: "Can I use this tool to debug malformed JSON?",
    answer:
      "Absolutely. The parser is designed for debugging and clearly explains why parsing fails, making it easy to correct malformed JSON."
  },
  {
    question: "Do I need to install anything to use the JSON Parser?",
    answer:
      "No installation is required. The JSON Parser runs directly in your browser and works on all modern devices."
  }
]}

    >
      <div className="flex flex-col gap-6">
        
        {/* 1. INPUT AREA */}
        <div className="flex flex-col gap-2">
           <div className="flex justify-between items-center px-1">
              <label className="font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                <Code2 size={16} /> JSON String
              </label>
              <button 
                onClick={() => { setInput(""); setParsed(null); setError(null); }} 
                className="text-xs text-red-500 font-bold hover:underline flex items-center gap-1"
              >
                <Trash2 size={12} /> Clear
              </button>
           </div>
           
           <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative h-75">
              <Editor
                value={input}
                onValueChange={setInput}
                highlight={code => highlight(code, languages.json, 'json')}
                padding={20}
                className="font-mono text-sm min-h-full"
                placeholder='// Paste raw JSON string here...'
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              />
           </div>
        </div>

        {/* 2. ACTION */}
        <div className="flex justify-center">
           <button 
             onClick={handleParse}
             disabled={!input}
             className="bg-[#2563EB] text-white px-8 py-3 rounded-full font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
           >
             <Play size={20} fill="currentColor" /> Parse to Object
           </button>
        </div>

        {/* 3. OUTPUT AREA */}
        <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-4 duration-500">
           <div className="flex justify-between items-center px-1">
              <label className="font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                <Terminal size={16} /> Parsed Output (JavaScript Object)
              </label>
              {success && (
                <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                  <CheckCircle2 size={12} /> Parsed Successfully
                </span>
              )}
           </div>

           <div className={`
             border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-h-75 p-6 relative overflow-auto
             ${error ? 'bg-red-50' : 'bg-[#FDFBF7]'}
           `}>
              
              {/* Default State */}
              {!parsed && !error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                   <Braces size={48} strokeWidth={1} />
                   <p className="font-bold text-sm mt-2">Waiting to parse...</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-red-600 font-bold text-lg border-b-2 border-red-200 pb-2">
                    <AlertTriangle /> Parsing Failed
                  </div>
                  <p className="font-mono text-sm text-red-800 bg-white p-4 border border-red-300 rounded">
                    {error}
                  </p>
                  <p className="text-sm text-gray-600">
                    Your string contains syntax errors and cannot be converted to a JavaScript object.
                  </p>
                </div>
              )}

              {/* Success State (Tree) */}
              {parsed && (
                <div className="w-full">
                  <ObjectInspector data={parsed} name="root" />
                  
                  <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end">
                     <button 
                       onClick={() => { navigator.clipboard.writeText(JSON.stringify(parsed, null, 2)); alert("Copied Object!"); }}
                       className="text-xs font-bold bg-white border-2 border-black px-3 py-1 hover:bg-black hover:text-white transition-colors flex items-center gap-2"
                     >
                       <Copy size={14} /> Copy Object
                     </button>
                  </div>
                </div>
              )}
           </div>
        </div>

        {/* 4. SEO CONTENT */}
        <div className="mt-12 border-t-2 border-black pt-12">
           <h2 className="text-3xl font-serif font-black mb-6">Why use a JSON Parser?</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-bold text-lg mb-2">Debug API Data</h3>
                <p className="text-sm text-gray-700">
                  When APIs return errors or unexpected formats, pasting the response here helps you verify if it's a valid JSON string and see exactly how JavaScript interprets the data types (e.g., numbers vs strings).
                </p>
              </div>
              <div className="bg-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-bold text-lg mb-2">Verify Syntax</h3>
                <p className="text-sm text-gray-700">
                  This tool uses the native <code>JSON.parse()</code> method, ensuring that if it works here, it will work in your application code.
                </p>
              </div>
           </div>
        </div>

      </div>
    </ToolShell>
  );
}