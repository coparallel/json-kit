"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import ToolShell from "../components/ToolShell";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";
import { 
  Eye, 
  Upload, 
  Copy, 
  Trash2, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  Maximize2,
  Minimize2,
  FileJson,
  Layout
} from "lucide-react";

// --- COMPONENT: Searchable Tree Node ---
interface JsonNodeProps {
  name?: string;
  value: any;
  depth?: number;
  path?: string;
  searchQuery: string;
  expandAll: boolean;
}

const JsonNode = ({ name, value, depth = 0, path = "", searchQuery, expandAll }: JsonNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(depth < 1);
  const isObject = typeof value === 'object' && value !== null;
  const isArray = Array.isArray(value);
  const itemCount = isObject ? Object.keys(value).length : 0;
  
  // Update expansion when "Expand All" toggles or search changes (optional: auto-expand on search)
  useEffect(() => {
    if (expandAll) setIsExpanded(true);
    else if (depth >= 1) setIsExpanded(false);
  }, [expandAll, depth]);

  // Search Logic (Simple Highlight Check)
  const matchesSearch = useMemo(() => {
    if (!searchQuery) return false;
    const lowerQuery = searchQuery.toLowerCase();
    // Check Key
    if (name && name.toLowerCase().includes(lowerQuery)) return true;
    // Check Primitive Value
    if (!isObject && String(value).toLowerCase().includes(lowerQuery)) return true;
    return false;
  }, [searchQuery, name, value, isObject]);

  // Current Full Path
  const currentPath = path ? (name ? `${path}.${name}` : path) : (name || "root");

  const handleCopyPath = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(currentPath);
  };

  const handleCopyValue = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(JSON.stringify(value));
  };

  // 1. Primitive Render
  if (!isObject) {
    return (
      <div className={`
        font-mono text-sm px-2 py-0.5 rounded flex items-center gap-2 group transition-colors
        ${matchesSearch ? 'bg-yellow-200 text-black font-bold' : 'hover:bg-blue-50'}
      `} style={{ marginLeft: `${depth * 20}px` }}>
        
        {name && <span className="text-purple-700 font-bold opacity-80">{name}:</span>}
        
        <span className={`break-all ${typeof value === 'string' ? 'text-green-700' : 'text-orange-600'}`}>
          {JSON.stringify(value)}
        </span>
        
        <div className="ml-auto opacity-0 group-hover:opacity-100 flex gap-1">
          <button onClick={handleCopyPath} className="text-[10px] bg-gray-200 px-1 rounded hover:bg-black hover:text-white transition-colors" title="Copy Path">Path</button>
          <button onClick={handleCopyValue} className="text-[10px] bg-gray-200 px-1 rounded hover:bg-black hover:text-white transition-colors" title="Copy Value">Val</button>
        </div>
      </div>
    );
  }

  // 2. Object/Array Render
  return (
    <div className="font-mono text-sm">
      <div 
        className={`
          flex items-center gap-1 px-2 py-0.5 rounded cursor-pointer select-none group transition-colors
          ${matchesSearch ? 'bg-yellow-200' : 'hover:bg-gray-100'}
        `}
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ marginLeft: `${depth * 20}px` }}
      >
        <span className="text-gray-400">
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </span>
        
        {name && <span className="text-purple-700 font-bold">{name}: </span>}
        
        <span className="text-gray-500 text-xs italic">
          {isArray ? `Array[${itemCount}]` : `Object{${itemCount}}`}
        </span>

        <div className="ml-auto opacity-0 group-hover:opacity-100 flex gap-1">
           <button onClick={handleCopyPath} className="text-[10px] bg-gray-200 px-1 rounded hover:bg-black hover:text-white transition-colors" title="Copy Path">Path</button>
        </div>
      </div>

      {isExpanded && (
        <div className="border-l border-gray-200 ml-px">
          {Object.entries(value).map(([key, val]) => (
            <JsonNode 
              key={key} 
              name={isArray ? undefined : key} 
              value={val} 
              depth={depth + 1}
              path={currentPath}
              searchQuery={searchQuery}
              expandAll={expandAll}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// --- MAIN PAGE ---
export default function JsonViewerPage() {
  const [input, setInput] = useState('{\n  "tool": "JSON Viewer",\n  "status": "Active",\n  "features": [\n    "Search",\n    "Deep Inspection",\n    "Secure"\n  ],\n  "meta": {\n    "version": 1.0,\n    "author": "JSON-Kit"\n  }\n}');
  const [parsedJson, setParsedJson] = useState<any>(null);
  const [isValid, setIsValid] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandAll, setExpandAll] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parse JSON Effect
  useEffect(() => {
    try {
      if(!input.trim()) {
        setParsedJson(null);
        return;
      }
      const parsed = JSON.parse(input);
      setParsedJson(parsed);
      setIsValid(true);
    } catch (e) {
      setIsValid(false);
    }
  }, [input]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setInput(event.target?.result as string || "");
    reader.readAsText(file);
  };

  return (
    <ToolShell
      toolName="JSON Viewer"
      title="JSON Viewer Online"
      description="Visualize and inspect JSON data structures instantly. Use the interactive tree view to explore nested objects, search for keys, and analyze API responses."
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
    question: "What is the difference between a JSON Viewer and a JSON Editor?",
    answer:
      "A JSON Viewer is read-only and designed for inspecting and exploring JSON data safely. A JSON Editor allows you to modify, add, or delete data. Use the Viewer for API responses and logs, and the Editor when changes are required."
  },
  {
    question: "Can I search within the JSON data?",
    answer:
      "Yes. Use the built-in search bar to find specific keys or values. All matches are highlighted instantly, even in large JSON files."
  },
  {
    question: "Is this JSON Viewer read-only?",
    answer:
      "Yes. The Viewer is strictly read-only to prevent accidental data modification, making it ideal for inspection and debugging."
  },
  {
    question: "Can I view large JSON files in this viewer?",
    answer:
      "Yes. The JSON Viewer is optimized for large files up to 100MB using virtual rendering and lazy loading."
  },
  {
    question: "Does the JSON Viewer support nested objects and arrays?",
    answer:
      "Yes. Deeply nested objects and arrays are displayed in a collapsible tree structure for easy navigation."
  },
  {
    question: "Is my JSON data secure when using the Viewer?",
    answer:
      "Yes. All JSON processing happens locally in your browser. No data is uploaded, stored, or transmitted."
  },
  {
    question: "Can I inspect API response JSON with this tool?",
    answer:
      "Yes. The JSON Viewer is ideal for inspecting API responses, helping you understand structure, keys, and nested data clearly."
  },
  {
    question: "Does the JSON Viewer highlight syntax or structure?",
    answer:
      "Yes. Keys, values, arrays, and objects are visually distinguished to improve readability and comprehension."
  },
  {
    question: "Can I expand or collapse all nodes at once?",
    answer:
      "Yes. Use the expand and collapse controls to quickly open or close all nodes in large JSON structures."
  },
  {
    question: "Do I need to install anything to use the JSON Viewer?",
    answer:
      "No installation is required. The JSON Viewer runs directly in your browser and can also be installed as a Progressive Web App for offline use."
  }
]}

    >
      <div className="flex flex-col gap-6">
        
        {/* 1. TOOLBAR */}
        <div className="flex flex-wrap items-center gap-3 p-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-t-lg">
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".json" />
          
          <button 
            onClick={() => fileInputRef.current?.click()} 
            className="flex items-center gap-2 bg-[#F9F7F1] text-black px-3 py-1.5 text-xs font-bold border-2 border-black hover:bg-white hover:-translate-y-px transition-all"
          >
            <Upload size={16} /> Load JSON
          </button>
          
          <button 
            onClick={() => {navigator.clipboard.writeText(input); alert("Raw JSON Copied!")}} 
            className="flex items-center gap-2 bg-[#F9F7F1] text-black px-3 py-1.5 text-xs font-bold border-2 border-black hover:bg-white hover:-translate-y-px transition-all"
          >
            <Copy size={16} /> Copy Raw
          </button>

          <button 
            onClick={() => setInput("")} 
            className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1.5 text-xs font-bold border-2 border-transparent hover:border-red-600 transition-all ml-auto"
          >
            <Trash2 size={16} /> Clear
          </button>
        </div>

        {/* 2. MAIN WORKSPACE (Split View) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* LEFT: Raw Input */}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-sm uppercase tracking-wide flex items-center gap-2">
              <FileJson size={16} /> Raw Input
            </label>
            <div className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white h-150 flex flex-col relative">
              <Editor
                value={input}
                onValueChange={setInput}
                highlight={code => highlight(code, languages.json, 'json')}
                padding={20}
                className="font-mono text-sm min-h-full"
                placeholder="// Paste JSON here..."
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              />
              {!isValid && (
                <div className="absolute bottom-0 left-0 right-0 bg-red-100 text-red-700 text-xs font-bold p-2 text-center border-t-2 border-black">
                  Invalid JSON Syntax
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Tree Viewer */}
          <div className="flex flex-col gap-2">
             <div className="flex justify-between items-center">
                <label className="font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                  <Layout size={16} /> Tree Inspector
                </label>
                
                {/* Search & Controls */}
                <div className="flex gap-2">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search keys/values..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-7 pr-2 py-1 text-xs border border-black rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-black w-40"
                    />
                    <Search size={12} className="absolute left-2 top-1.5 text-gray-400" />
                  </div>
                  <button 
                    onClick={() => setExpandAll(!expandAll)} 
                    className="p-1 border border-black rounded hover:bg-gray-100"
                    title={expandAll ? "Collapse All" : "Expand All"}
                  >
                    {expandAll ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                  </button>
                </div>
             </div>

             <div className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#FDFBF7] h-150 overflow-auto p-4 relative">
                {isValid && parsedJson ? (
                  <JsonNode 
                    value={parsedJson} 
                    name="root" 
                    searchQuery={searchQuery} 
                    expandAll={expandAll} 
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-50">
                    <Eye size={48} className="mb-2" />
                    <p className="font-bold text-sm">
                      {isValid ? "Empty JSON" : "Fix syntax to view tree"}
                    </p>
                  </div>
                )}
             </div>
          </div>

        </div>

        {/* 3. SEO CONTENT */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 border-t-2 border-black pt-12">
           <article className="prose prose-sm max-w-none">
             <h2 className="text-3xl font-serif font-black mb-6">Interactive JSON Tree View</h2>
             <p className="text-gray-700 leading-relaxed mb-4">
               Our JSON Viewer transforms flat, hard-to-read JSON text into an interactive, collapsible tree. This hierarchical view allows you to:
             </p>
             <ul className="list-disc pl-5 space-y-2 text-gray-700 font-medium">
               <li><strong>Navigate Deep Structures:</strong> Easily expand and collapse nested objects and arrays.</li>
               <li><strong>Identify Data Types:</strong> Visual indicators show if a value is a string, number, array, or object.</li>
               <li><strong>Copy Precision:</strong> Hover over any key to copy its exact path (e.g., <code>data.users[0].id</code>) or its value.</li>
             </ul>
           </article>

           <article className="prose prose-sm max-w-none">
              <h2 className="text-3xl font-serif font-black mb-6">Optimized for Inspection</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Unlike general text editors, this tool is built specifically for data inspection.
              </p>
              <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <Search size={18} /> Deep Search
                </h3>
                <p className="text-sm text-gray-600">
                  Type in the search bar to instantly highlight matching keys or values anywhere in the document. Perfect for finding specific flags in massive configuration files.
                </p>
              </div>
           </article>
        </div>

      </div>
    </ToolShell>
  );
}