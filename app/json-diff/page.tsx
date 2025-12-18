"use client";

import { useState } from "react";
import ToolShell from "../components/ToolShell";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";
import { diffJson, Change } from "diff";
import { ArrowRightLeft, Trash2, FileJson, AlertTriangle } from "lucide-react";

export default function JsonDiffPage() {
  const [oldJson, setOldJson] = useState("");
  const [newJson, setNewJson] = useState("");
  const [diffResult, setDiffResult] = useState<Change[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // --- Comparison Logic ---
  const handleCompare = () => {
    try {
      if (!oldJson.trim() || !newJson.trim()) {
        setError("Please enter JSON in both panels.");
        return;
      }
      
      let oldObj, newObj;
      
      try {
        oldObj = JSON.parse(oldJson);
      } catch (e) {
        throw new Error("Left Panel: Invalid JSON syntax.");
      }

      try {
        newObj = JSON.parse(newJson);
      } catch (e) {
        throw new Error("Right Panel: Invalid JSON syntax.");
      }

      // Calculate Diff
      const changes = diffJson(oldObj, newObj);
      setDiffResult(changes);
      setError(null);

    } catch (e: any) {
      setError(e.message);
      setDiffResult(null);
    }
  };

  const clearAll = () => {
    setOldJson("");
    setNewJson("");
    setDiffResult(null);
    setError(null);
  };

  return (
<ToolShell
  toolName="JSON Difference Checker"
  title="JSON Difference Checker | Compare JSON Files, Objects & API Responses"
  description="Compare two JSON files or objects and detect differences instantly. Identify added, removed, and modified fields using a structural JSON diff algorithm built for developers. Runs 100% client-side."
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
      question: "What is a JSON diff checker?",
      answer:
        "A JSON diff checker is a tool that compares two JSON files or objects and highlights the differences between them. It detects added, removed, and modified fields by analyzing the JSON structure instead of raw text."
    },
    {
      question: "How do I compare two JSON files online?",
      answer:
        "Paste the original JSON into the left editor and the updated JSON into the right editor, then run the comparison. The tool performs a structural JSON diff and visually highlights all changes."
    },
    {
      question: "How is JSON diff different from text or Git diff?",
      answer:
        "Unlike text-based or Git diff tools, a JSON diff checker ignores formatting, whitespace, and key order. It compares actual JSON values and structure, ensuring only meaningful data changes are shown."
    },
    {
      question: "Does this JSON diff tool support nested objects and arrays?",
      answer:
        "Yes. The tool fully supports deeply nested JSON objects and arrays, making it suitable for comparing complex API responses and hierarchical data structures."
    },
    {
      question: "Can I use JSON diff to compare API responses?",
      answer:
        "Yes. This tool is ideal for comparing API responses across environments, validating payload changes, and debugging data mismatches during development and testing."
    },
    {
      question: "Should I format JSON before comparing it?",
      answer:
        "Yes. Formatting JSON before comparison improves readability and reduces noise. You can use the JSON Formatter to validate and clean both files before running the diff."
    },
    {
      question: "Is this JSON diff checker secure for sensitive data?",
      answer:
        "Yes. All comparisons happen entirely in your browser. No JSON data is uploaded, logged, or stored on any server."
    },
    {
      question: "Can this tool handle large JSON files?",
      answer:
        "Yes. The JSON diff checker supports large files and complex structures. Performance depends on your device, but most files up to several megabytes are processed quickly."
    },
    {
      question: "Is this JSON diff checker free to use?",
      answer:
        "Yes. This tool is completely free with no sign-up, no usage limits, and no data tracking."
    }
  ]}
>

      <div className="flex flex-col gap-8">
        
        {/* --- INPUT AREA (Dual Column) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          
          {/* Left Input */}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 border border-black"></span>
              Original JSON
            </label>
            <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-75 overflow-hidden">
               <Editor
                 value={oldJson}
                 onValueChange={setOldJson}
                 highlight={code => highlight(code, languages.json, 'json')}
                 padding={15}
                 className="font-mono text-xs min-h-full"
                 placeholder='{ "version": 1.0, "data": "old" }'
               />
            </div>
          </div>

          {/* Right Input */}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-sm uppercase tracking-wider flex items-center gap-2">
               <span className="w-3 h-3 rounded-full bg-green-500 border border-black"></span>
               New JSON
            </label>
            <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-75 overflow-hidden">
               <Editor
                 value={newJson}
                 onValueChange={setNewJson}
                 highlight={code => highlight(code, languages.json, 'json')}
                 padding={15}
                 className="font-mono text-xs min-h-full"
                 placeholder='{ "version": 1.1, "data": "new" }'
               />
            </div>
          </div>

          {/* Center Action Button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block z-10">
             <button 
               onClick={handleCompare}
               className="bg-[#1a1a1a] text-white p-3 rounded-full border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:scale-110 transition-transform"
             >
               <ArrowRightLeft size={24} />
             </button>
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="flex gap-4 md:justify-center">
           <button 
             onClick={handleCompare}
             className="flex-1 md:flex-none bg-[#2563EB] text-white px-8 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2"
           >
             <ArrowRightLeft size={20} /> Compare JSON
           </button>
           <button 
             onClick={clearAll}
             className="px-4 py-3 bg-red-100 text-red-600 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-red-200 transition-colors"
           >
             <Trash2 size={20} />
           </button>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-2 border-black p-4 flex items-center gap-3 text-red-800 font-bold animate-in fade-in slide-in-from-top-2">
            <AlertTriangle /> {error}
          </div>
        )}

        {/* --- DIFF OUTPUT AREA --- */}
        {diffResult && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-end mb-2">
               <h3 className="text-2xl font-serif font-bold">Comparison Result</h3>
               <div className="flex gap-4 text-xs font-bold font-mono">
                 <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-200 border border-red-500"></div> Removed</span>
                 <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-200 border border-green-500"></div> Added</span>
               </div>
            </div>

            <div className="border-2 border-black bg-[#FDFBF7] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 overflow-x-auto">
               <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
                 {diffResult.map((part, index) => {
                   // Style based on Diff type
                   const colorClass = part.added 
                      ? 'bg-green-200 text-green-900 border-y border-green-300' 
                      : part.removed 
                        ? 'bg-red-200 text-red-900 border-y border-red-300 opacity-80' 
                        : 'text-gray-600';
                   
                   const prefix = part.added ? '+ ' : part.removed ? '- ' : '  ';

                   return (
                     <span key={index} className={`${colorClass} block px-1`}>
                       {part.value}
                     </span>
                   );
                 })}
               </pre>
            </div>
          </div>
        )}

      </div>
    </ToolShell>
  );
}