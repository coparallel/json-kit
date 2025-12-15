"use client";

import { useState } from "react";
import ToolShell from "../components/ToolShell";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";
import { 
  FileSpreadsheet, 
  ArrowRight, 
  Download, 
  Copy, 
  Trash2, 
  AlertCircle 
} from "lucide-react";

// --- 1. Helper: Recursive Flattening (Critical for Nested JSON) ---
const flattenObject = (obj: any, prefix = '', res: any = {}) => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const val = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
        flattenObject(val, newKey, res);
      } else {
        // Convert arrays/nulls to string representation for CSV cell
        res[newKey] = val === null ? '' : (Array.isArray(val) ? JSON.stringify(val) : val);
      }
    }
  }
  return res;
};

export default function JsonToCsvPage() {
  const [jsonInput, setJsonInput] = useState("");
  const [csvOutput, setCsvOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{ rows: number; cols: number } | null>(null);

  // --- 2. Conversion Logic ---
  const handleConvert = () => {
    try {
      if (!jsonInput.trim()) return;
      setError(null);

      // 1. Parse JSON
      let data;
      try {
        data = JSON.parse(jsonInput);
      } catch (e) {
        throw new Error("Invalid JSON format. Please check your syntax.");
      }

      // Ensure array
      const arrayData = Array.isArray(data) ? data : [data];
      if (arrayData.length === 0) throw new Error("JSON is empty.");

      // 2. Flatten Data
      const flatData = arrayData.map(item => flattenObject(item));

      // 3. Extract Headers (Union of all keys)
      const headers = Array.from(new Set(flatData.flatMap(Object.keys)));
      setStats({ rows: flatData.length, cols: headers.length });

      // 4. Generate CSV
      const csvContent = [
        headers.join(","), // Header Row
        ...flatData.map(row => 
          headers.map(fieldName => {
            // Handle undefined/null
            let val = row[fieldName] ?? "";
            
            // Handle quotes and commas within data
            const stringVal = String(val);
            if (stringVal.includes(",") || stringVal.includes('"') || stringVal.includes("\n")) {
              return `"${stringVal.replace(/"/g, '""')}"`; // Escape double quotes
            }
            return stringVal;
          }).join(",")
        )
      ].join("\n");

      setCsvOutput(csvContent);

    } catch (e: any) {
      setError(e.message);
      setCsvOutput("");
      setStats(null);
    }
  };

  const handleDownload = () => {
    if (!csvOutput) return;
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(csvOutput);
    alert("CSV copied to clipboard!");
  };

  return (
    <ToolShell
      toolName="JSON to CSV"
      title="JSON to CSV Converter"
      description="Transform nested JSON objects into flat CSV spreadsheets. Perfect for importing data into Microsoft Excel, Google Sheets, or databases."
      // --- SEO Internal Links ---
      relatedLinks={[
        { name: "CSV to JSON", url: "/csv-to-json" },
        { name: "JSON Formatter", url: "/json-formatter" },
        { name: "JSON to SQL", url: "/json-to-sql" }
      ]}
      // --- Schema Markup FAQs ---
      faqs={[
        {
          question: "Can I convert nested JSON to CSV?",
          answer: "Yes. Our tool uses a recursive flattening algorithm. If you have an object like { \"user\": { \"name\": \"John\" } }, it becomes a CSV column header named \"user.name\"."
        },
        {
          question: "How to open JSON in Excel?",
          answer: "Excel cannot open JSON files natively with good formatting. The best way is to use this tool to convert your JSON to CSV (Comma Separated Values), download the file, and then double-click to open it in Excel."
        },
        {
          question: "Is there a limit on file size?",
          answer: "Since this tool runs in your browser, it depends on your computer's RAM. Files up to 50MB usually process instantly."
        }
      ]}
    >
      <div className="flex flex-col gap-6">
        
        {/* --- WORKSPACE --- */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">

          
          {/* LEFT: Input */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center px-1">
              <label className="font-bold text-sm uppercase tracking-wide">Input JSON</label>
              <button onClick={() => setJsonInput("")} className="text-xs text-red-500 hover:underline flex items-center gap-1">
                <Trash2 size={12} /> Clear
              </button>
            </div>
            
            <div className="grow border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative h-125">
              <Editor 
                value={jsonInput} 
                onValueChange={setJsonInput} 
                highlight={code => highlight(code, languages.json, 'json')}
                padding={20}
                className="font-mono text-sm min-h-full"
                placeholder='[ { "id": 1, "name": "Alice" }, ... ]'
              />
              {error && (
                <div className="absolute bottom-4 left-4 right-4 bg-red-100 border border-black p-2 text-red-700 text-xs font-bold flex items-center gap-2">
                  <AlertCircle size={14} /> {error}
                </div>
              )}
            </div>
          </div>

          {/* MIDDLE: Action (Desktop: Arrow, Mobile: Button) */}
          <div className="flex md:flex-col items-center justify-center gap-4">
             <button 
                onClick={handleConvert}
                className="bg-[#2563EB] text-white p-4 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-110 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 transition-all group"
                title="Convert to CSV"
             >
                <ArrowRight size={24} className="md:rotate-0 rotate-90 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>

          {/* RIGHT: Output */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center px-1">
               <label className="font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                 Output CSV
                 {stats && <span className="text-[10px] bg-yellow-200 border border-black px-1 rounded-full">{stats.rows} Rows</span>}
               </label>
               <div className="flex gap-2">
                 <button onClick={handleCopy} title="Copy" className="text-xs font-bold hover:bg-gray-200 p-1 rounded border border-transparent hover:border-black transition-all">
                   <Copy size={14} />
                 </button>
               </div>
            </div>

            <div className="grow border-2 border-black bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-125 flex flex-col">
              <textarea 
                readOnly 
                value={csvOutput}
                className="grow w-full p-4 font-mono text-xs md:text-sm bg-transparent resize-none focus:outline-none whitespace-pre"
                placeholder="Resulting CSV will appear here..."
              />
              
              {/* Footer Actions */}
              <div className="border-t-2 border-black bg-white p-3 flex justify-between items-center">
                 <span className="text-xs text-gray-500 font-mono hidden sm:block">Delimeter: Comma (,)</span>
                 <button 
                   onClick={handleDownload}
                   disabled={!csvOutput}
                   className="flex items-center gap-2 bg-green-600 text-white px-4 py-1.5 text-sm font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-green-700 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all w-full sm:w-auto justify-center"
                 >
                   <Download size={16} /> Download CSV
                 </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </ToolShell>
  );
}