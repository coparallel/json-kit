"use client";

import { useState } from "react";
import ToolShell from "../components/ToolShell";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/components/prism-xml-doc";
import "prismjs/themes/prism.css";
import { 
  FileCode, 
  ArrowRight, 
  Copy, 
  Trash2, 
  Download,
  AlertTriangle
} from "lucide-react";

// --- ROBUST XML ENGINE ---

// 1. Sanitize JSON keys to be valid XML tags
// XML tags cannot contain spaces or start with numbers/special chars
const sanitizeTag = (key: string): string => {
  // Replace invalid characters with underscore
  let cleanKey = key.replace(/[^a-zA-Z0-9_.-]/g, '_');
  
  // XML tags cannot start with a number or dot or dash
  if (/^[^a-zA-Z_]/.test(cleanKey)) {
    cleanKey = '_' + cleanKey;
  }
  return cleanKey;
};

// 2. Escape special XML characters in values
const escapeXml = (unsafe: any): string => {
  if (unsafe === null || unsafe === undefined) return "";
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

// 3. Recursive Conversion Function
const jsonToXml = (json: any, tab = 0): string => {
  const indent = '  '.repeat(tab);
  let xml = '';

  for (const key in json) {
    if (Object.prototype.hasOwnProperty.call(json, key)) {
      const value = json[key];
      const tagName = sanitizeTag(key);
      
      // CASE A: Array (Repeat the tag for each item)
      if (Array.isArray(value)) {
        if (value.length === 0) {
          // Empty array: render empty tag pair or self-closing
          xml += `${indent}<${tagName}></${tagName}>\n`;
        } else {
          value.forEach((item) => {
            if (typeof item === 'object' && item !== null) {
               xml += `${indent}<${tagName}>\n${jsonToXml(item, tab + 1)}${indent}</${tagName}>\n`;
            } else {
               xml += `${indent}<${tagName}>${escapeXml(item)}</${tagName}>\n`;
            }
          });
        }
      } 
      // CASE B: Nested Object (Recurse)
      else if (typeof value === 'object' && value !== null) {
        // Check if object is empty
        if (Object.keys(value).length === 0) {
           xml += `${indent}<${tagName}></${tagName}>\n`;
        } else {
           xml += `${indent}<${tagName}>\n${jsonToXml(value, tab + 1)}${indent}</${tagName}>\n`;
        }
      } 
      // CASE C: Primitive Value (String/Number/Boolean/Null)
      else {
        xml += `${indent}<${tagName}>${escapeXml(value)}</${tagName}>\n`;
      }
    }
  }
  return xml;
};

export default function JsonToXmlPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    try {
      if (!input.trim()) return;
      setError(null);

      let parsed;
      try {
        parsed = JSON.parse(input);
      } catch (e) {
        throw new Error("Invalid JSON: Syntax error found.");
      }

      let xmlBody = "";

      // SCENARIO 1: Root is Array [ ... ]
      if (Array.isArray(parsed)) {
        // We wrap array items in a generic <item> tag if the root is an array
        const tempObj = { item: parsed };
        xmlBody = jsonToXml(tempObj, 1);
      } 
      // SCENARIO 2: Root is Object { ... }
      else if (typeof parsed === 'object' && parsed !== null) {
        xmlBody = jsonToXml(parsed, 1);
      }
      // SCENARIO 3: Root is Primitive (String/Number)
      else {
        // Wrap primitive root in a generic value tag
        xmlBody = `  <value>${escapeXml(parsed)}</value>\n`;
      }
      
      const finalXml = `<?xml version="1.0" encoding="UTF-8"?>\n<root>\n${xmlBody}</root>`;
      setOutput(finalXml);

    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    alert("Copied to clipboard!");
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'converted.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ToolShell
      toolName="JSON to XML"
      title="JSON to XML Converter"
      description="Transform JSON data structures into well-formed XML documents. Automatically handles arrays, nesting, and character escaping."
      relatedLinks={[
        { name: "XML to JSON", url: "/xml-to-json" },
        { name: "JSON to YAML", url: "/json-to-yaml" },
        { name: "JSON Formatter", url: "/json-formatter" }
      ]}
      faqs={[
        {
          question: "When should I use XML over JSON?",
          answer: "XML is standard for SOAP APIs, RSS feeds, and enterprise systems that require schema validation (XSD). JSON is faster and lighter, but XML is more verbose and descriptive."
        },
        {
          question: "How are invalid JSON keys handled?",
          answer: "XML tags cannot contain spaces or start with numbers (e.g., '1st Place'). Our tool automatically sanitizes these keys to valid XML tags (e.g., '_1st_Place') so your code doesn't break."
        }
      ]}
    >
      <div className="flex flex-col gap-6">
        
        {/* --- WORKSPACE --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* LEFT: Input */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center px-1">
              <label className="font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                 <div className="bg-yellow-200 border border-black px-1 text-xs">JSON</div>
                 Input
              </label>
              <button onClick={() => setInput("")} className="text-xs text-red-500 hover:underline flex items-center gap-1">
                <Trash2 size={12} /> Clear
              </button>
            </div>
            
            <div className="grow border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative min-h-100">
              <Editor 
                value={input} 
                onValueChange={setInput} 
                highlight={code => highlight(code, languages.json, 'json')}
                padding={20}
                className="font-mono text-sm min-h-full"
                placeholder='{ "user": { "id": 1, "name": "Alice" } }'
              />
            </div>
          </div>

          {/* MIDDLE: Action */}
          <div className="flex md:flex-col items-center justify-center gap-4">
             <button 
                onClick={handleConvert}
                className="bg-[#2563EB] text-white px-6 py-3 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-105 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 transition-all group flex items-center gap-2 font-bold"
             >
                <span className="md:hidden">Convert</span>
                <ArrowRight size={24} className="md:rotate-0 rotate-90 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>

          {/* RIGHT: Output */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center px-1">
               <label className="font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                 <div className="bg-blue-200 border border-black px-1 text-xs">XML</div>
                 Output
               </label>
               {error && (
                 <span className="flex items-center gap-1 text-[10px] text-red-600 font-bold bg-red-100 px-2 border border-red-200 rounded">
                   <AlertTriangle size={10} /> Syntax Error
                 </span>
               )}
            </div>

            <div className="grow border-2 border-black bg-[#FDFBF7] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-h-100 flex flex-col relative overflow-hidden">
               {/* Readonly Editor */}
               <div className="flex-1 overflow-auto bg-transparent">
                  <Editor 
                    value={output} 
                    onValueChange={() => {}} 
                    highlight={code => highlight(code, languages.xml, 'xml')}
                    padding={20}
                    className="font-mono text-sm min-h-full"
                    style={{ pointerEvents: output ? 'auto' : 'none' }}
                  />
                  {!output && !error && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300 pointer-events-none">
                      <FileCode size={48} />
                    </div>
                  )}
               </div>
              
              {/* Footer */}
              <div className="border-t-2 border-black bg-white p-2 flex justify-end items-center gap-2">
                 <button 
                   onClick={handleCopy}
                   disabled={!output}
                   className="p-2 hover:bg-gray-100 border-2 border-transparent hover:border-black rounded disabled:opacity-50 transition-all"
                   title="Copy XML"
                 >
                   <Copy size={18} />
                 </button>
                 <button 
                   onClick={handleDownload}
                   disabled={!output}
                   className="flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 text-sm font-bold border-2 border-black hover:bg-green-700 disabled:opacity-50 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-px hover:translate-y-px"
                 >
                   <Download size={16} /> Save .xml
                 </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </ToolShell>
  );
}