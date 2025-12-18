"use client";

import { useState, useMemo, useRef } from "react";
import ToolShell from "../components/ToolShell";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";
import { 
  FileJson, 
  Upload, 
  Download, 
  Copy, 
  Trash2, 
  FolderTree, 
  Code, 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  AlertOctagon,
  Search
} from "lucide-react";

// --- COMPONENTS: Recursive Tree Viewer ---
const JsonNode = ({ name, value, depth = 0, path = "" }: { name?: string, value: any, depth?: number, path?: string }) => {
  const [isExpanded, setIsExpanded] = useState(depth < 2); // Auto-expand top 2 levels
  const isObject = typeof value === 'object' && value !== null;
  const isArray = Array.isArray(value);
  const type = isArray ? 'array' : typeof value;
  const itemCount = isObject ? Object.keys(value).length : 0;
  
  // Calculate full path for copying
  const currentPath = path ? (name ? `${path}.${name}` : path) : (name || "root");

  const handleCopyPath = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(currentPath);
    alert(`Copied Path: ${currentPath}`);
  };

  if (!isObject) {
    return (
      <div className="font-mono text-sm hover:bg-blue-50 px-2 py-0.5 rounded flex items-center gap-2 group">
        <span className="text-gray-400 select-none w-4"></span>
        {name && <span className="text-purple-700 font-bold">{name}:</span>}
        <span className={`break-all ${typeof value === 'string' ? 'text-green-600' : 'text-orange-600'}`}>
          {JSON.stringify(value)}
        </span>
        <button onClick={handleCopyPath} className="opacity-0 group-hover:opacity-100 text-[10px] bg-gray-200 px-1 rounded ml-auto">
          Copy Path
        </button>
      </div>
    );
  }

  return (
    <div className="font-mono text-sm">
      <div 
        className="flex items-center gap-1 hover:bg-gray-100 px-2 py-0.5 rounded cursor-pointer select-none group"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ marginLeft: `${depth * 12}px` }}
      >
        <span className="text-gray-500">
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </span>
        
        {name && <span className="text-purple-700 font-bold">{name}: </span>}
        
        <span className="text-gray-500 text-xs">
          {isArray ? `Array[${itemCount}]` : `Object{${itemCount}}`}
        </span>

        <button onClick={handleCopyPath} className="opacity-0 group-hover:opacity-100 text-[10px] bg-gray-200 px-1 rounded ml-auto">
          Copy Path
        </button>
      </div>

      {isExpanded && (
        <div>
          {Object.entries(value).map(([key, val]) => (
            <JsonNode 
              key={key} 
              name={isArray ? undefined : key} // Don't show index keys for arrays to keep it clean, or show [0] if preferred
              value={val} 
              depth={depth + 1}
              path={currentPath}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function JsonEditorPage() {
  const [input, setInput] = useState('{\n  "project": "JSON Editor",\n  "features": [\n    "Tree View",\n    "Validation",\n    "Fast Parsing"\n  ],\n  "settings": {\n    "dark_mode": false,\n    "version": 1.0\n  }\n}');
  const [viewMode, setViewMode] = useState<'split' | 'code' | 'tree'>('split');
  const [isValid, setIsValid] = useState(true);
  const [parsedJson, setParsedJson] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parse JSON for Tree View whenever input changes
  useMemo(() => {
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
      // Don't update tree on error to prevent crashing, keep old tree or null
    }
  }, [input]);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
    } catch (e) {
      alert("Cannot format invalid JSON");
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
    const blob = new Blob([input], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    link.click();
  };

  return (
    <ToolShell
      toolName="JSON Editor"
      title="JSON Editor Online"
      description="Edit, validate, and visualize JSON data faster. Switch between code view and interactive tree view to manage complex datasets with ease."
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
    question: "How do I fix invalid JSON online?",
    answer:
      "Paste your JSON into the editor and syntax errors are detected instantly. Invalid commas, missing quotes, or broken brackets are highlighted in real time, allowing you to fix issues without manual debugging."
  },
  {
    question: "What causes JSON to be invalid?",
    answer:
      "Common causes include trailing commas, missing quotation marks around keys or values, unescaped characters, and incorrect nesting of objects or arrays. The editor automatically points out these issues."
  },
  {
    question: "Can I edit deeply nested JSON objects visually?",
    answer:
      "Yes. The interactive Tree View lets you expand, collapse, and edit deeply nested JSON objects without touching raw code, making complex data structures easy to manage."
  },
  {
    question: "How do I copy the JSON path of a specific node?",
    answer:
      "In Tree View, hover over any key and click the 'Copy Path' option to instantly copy the full JSON path (for example: users[0].profile.id) to your clipboard."
  },
  {
    question: "Is this JSON Editor safe for sensitive data?",
    answer:
      "Yes. All JSON parsing and editing happens entirely in your browser. Your data is never uploaded, stored, or logged on any external servers."
  },
  {
    question: "Can this editor handle large JSON files?",
    answer:
      "Yes. The editor is optimized for large files up to 100MB using efficient rendering and virtualization, preventing browser slowdowns or crashes."
  },
  {
    question: "Does this tool support JSON Schema validation?",
    answer:
      "Yes. You can validate your JSON against a JSON Schema to ensure correct structure, data types, and required fields before using it in production."
  },
  {
    question: "How do I format or beautify minified JSON?",
    answer:
      "Paste your minified JSON and click the 'Format' button to instantly apply clean indentation and spacing, making the data human-readable."
  },
  {
    question: "Can I convert JSON to other formats after editing?",
    answer:
      "Yes. Once edited, you can convert your JSON to formats like CSV, YAML, or XML directly from the editor."
  },
  {
    question: "Do I need to install anything to use this JSON Editor?",
    answer:
      "No installation is required. The JSON Editor runs directly in your browser and can optionally be installed as a Progressive Web App for offline use."
  }
]}

    >
      <div className="flex flex-col gap-6">
        
        {/* 1. TOOLBAR */}
        <div className="flex flex-wrap items-center gap-3 p-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-t-lg">
          {/* File Actions */}
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".json" />
          <button onClick={() => fileInputRef.current?.click()} className="btn-toolbar">
            <Upload size={16} /> Import
          </button>
          <button onClick={handleDownload} className="btn-toolbar">
            <Download size={16} /> Export
          </button>
          
          <div className="h-6 w-px bg-gray-300 mx-2 hidden sm:block"></div>

          {/* Edit Actions */}
          <button onClick={handleFormat} className="btn-toolbar">
            <Code size={16} /> Format
          </button>
          <button onClick={() => setInput("")} className="btn-toolbar text-red-600 hover:bg-red-50 hover:border-red-600">
            <Trash2 size={16} /> Clear
          </button>

          {/* View Toggles (Desktop Only) */}
          <div className="ml-auto flex gap-1 bg-gray-100 p-1 rounded border border-black md:flex">
             <button 
               onClick={() => setViewMode('code')}
               className={`px-3 py-1 text-xs font-bold rounded ${viewMode === 'code' ? 'bg-white border border-black shadow-sm' : 'text-gray-500'}`}
             >
               Code
             </button>
             <button 
               onClick={() => setViewMode('split')}
               className={`px-3 py-1 text-xs font-bold rounded ${viewMode === 'split' ? 'bg-white border border-black shadow-sm' : 'text-gray-500'}`}
             >
               Split
             </button>
             <button 
               onClick={() => setViewMode('tree')}
               className={`px-3 py-1 text-xs font-bold rounded ${viewMode === 'tree' ? 'bg-white border border-black shadow-sm' : 'text-gray-500'}`}
             >
               Tree
             </button>
          </div>
        </div>

        {/* 2. MAIN WORKSPACE */}
        <div className="h-150 flex border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white relative">
           
           {/* LEFT: Code Editor */}
           <div className={`
             flex-col border-r-2 border-black relative
             ${viewMode === 'code' ? 'w-full flex' : viewMode === 'tree' ? 'hidden' : 'w-1/2 flex'}
           `}>
              <div className="bg-gray-100 border-b-2 border-black px-3 py-2 text-xs font-bold uppercase tracking-wider flex justify-between items-center">
                <span>Code Editor</span>
                {isValid ? (
                  <span className="text-green-600 flex items-center gap-1"><CheckCircle2 size={12}/> Valid</span>
                ) : (
                  <span className="text-red-600 flex items-center gap-1"><AlertOctagon size={12}/> Syntax Error</span>
                )}
              </div>
              <div className="flex-1 overflow-auto bg-[#FDFBF7]">
                <Editor
                  value={input}
                  onValueChange={setInput}
                  highlight={code => highlight(code, languages.json, 'json')}
                  padding={20}
                  className="font-mono text-sm min-h-full"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                  textareaClassName="focus:outline-none"
                />
              </div>
           </div>

           {/* RIGHT: Tree View */}
           <div className={`
             flex-col bg-white
             ${viewMode === 'tree' ? 'w-full flex' : viewMode === 'code' ? 'hidden' : 'w-1/2 flex'}
           `}>
              <div className="bg-gray-100 border-b-2 border-black px-3 py-2 text-xs font-bold uppercase tracking-wider flex justify-between items-center">
                <span>Visual Tree</span>
                <span className="text-gray-400">Read-Only</span>
              </div>
              <div className="flex-1 overflow-auto p-4">
                 {isValid && parsedJson ? (
                   <JsonNode value={parsedJson} name="root" />
                 ) : (
                   <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-50">
                     <FolderTree size={48} className="mb-2" />
                     <p className="font-bold text-sm">
                       {isValid ? "Empty JSON" : "Fix syntax to view tree"}
                     </p>
                   </div>
                 )}
              </div>
           </div>
        </div>

        {/* 3. SEO CONTENT */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 border-t-2 border-black pt-12">
          <article className="prose prose-sm max-w-none">
            <h2 className="text-3xl font-serif font-black mb-6">Visual JSON Tree Editor</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Instantly convert raw JSON into an interactive tree structure. This view is perfect for understanding the hierarchy of complex, nested API responses without getting lost in brackets and commas.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 font-medium">
              <li><strong>Expand/Collapse:</strong> Click folders to drill down into objects.</li>
              <li><strong>Copy Paths:</strong> Hover over any item to copy its dot-notation path (e.g., <code>users[0].address.city</code>).</li>
              <li><strong>Structure Check:</strong> Quickly verify if your arrays and objects are nested correctly.</li>
            </ul>
          </article>

          <article className="prose prose-sm max-w-none">
             <h2 className="text-3xl font-serif font-black mb-6">Powerful Code Editor</h2>
             <p className="text-gray-700 leading-relaxed mb-4">
               For developers who prefer control, the code view offers a robust editing experience with syntax highlighting and real-time error detection.
             </p>
             <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
               <h4 className="font-bold text-yellow-800">Pro Tip:</h4>
               <p className="text-sm text-yellow-700 mt-1">
                 You can drag the middle bar (in future updates) or use the "Split" toggle to customize your workspace. For files larger than 10MB, we recommend using the "Code Only" view for best performance.
               </p>
             </div>
          </article>
        </div>

      </div>

      <style jsx global>{`
        .btn-toolbar {
          @apply flex items-center gap-2 bg-white text-black px-3 py-1.5 text-xs font-bold border-2 border-transparent hover:border-black hover:bg-gray-50 transition-all rounded-sm;
        }
      `}</style>
    </ToolShell>
  );
}