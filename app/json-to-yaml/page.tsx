"use client";

import { useState } from "react";
import ToolShell from "../components/ToolShell";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";
import "prismjs/themes/prism.css";
import yaml from "js-yaml";
import { 
  FileCode, 
  ArrowRight, 
  Copy, 
  Trash2, 
  Download,
  AlertTriangle 
} from "lucide-react";

export default function JsonToYamlPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    try {
      if (!input.trim()) return;
      setError(null);

      // 1. Parse JSON
      let parsed;
      try {
        parsed = JSON.parse(input);
      } catch (e) {
        throw new Error("Invalid JSON syntax.");
      }

      // 2. Dump to YAML
      const yamlResult = yaml.dump(parsed, {
        indent: 2,
        lineWidth: -1, // Don't wrap long lines
        noRefs: true   // Don't use aliases/anchors
      });

      setOutput(yamlResult);

    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    alert("YAML copied to clipboard!");
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'config.yaml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
  <ToolShell
  toolName="JSON to YAML Converter"
  title="JSON to YAML Converter – Generate Clean YAML for DevOps & Kubernetes"
  description="Convert JSON into clean, human-readable YAML instantly. Ideal for Kubernetes manifests, CI/CD pipelines, Docker Compose, and configuration management. Runs entirely in your browser."
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
      question: "What is a JSON to YAML converter?",
      answer:
        "A JSON to YAML converter transforms JSON data into YAML format. YAML is more human-readable and is widely used for configuration files in DevOps, cloud, and infrastructure tools."
    },
    {
      question: "Is YAML better than JSON?",
      answer:
        "For configuration files, YAML is often preferred because it supports comments, uses indentation instead of brackets, and is easier for humans to read. JSON is better suited for data transmission and APIs due to its strict syntax."
    },
    {
      question: "Can any JSON be converted to YAML?",
      answer:
        "Yes. JSON is a subset of YAML, which means any valid JSON structure can be represented in YAML. This tool automatically converts JSON objects and arrays into valid YAML syntax."
    },
    {
      question: "Is the generated YAML compatible with Kubernetes?",
      answer:
        "Yes. The YAML output follows standard formatting used by Kubernetes, Docker Compose, Helm, and Ansible, making it suitable for production DevOps workflows."
    },
    {
      question: "Should I format JSON before converting it to YAML?",
      answer:
        "Yes. Validating and formatting JSON before conversion helps avoid errors and ensures clean YAML output. You can use the JSON Formatter to clean your data first."
    },
    {
      question: "Does this tool support nested JSON objects and arrays?",
      answer:
        "Yes. Deeply nested JSON objects and arrays are fully supported and converted into properly indented YAML while preserving structure."
    },
    {
      question: "Is this JSON to YAML converter secure?",
      answer:
        "Yes. All conversion happens entirely in your browser. No data is uploaded, stored, or transmitted to any server."
    },
    {
      question: "Is this JSON to YAML converter free to use?",
      answer:
        "Yes. This tool is completely free with no sign-up, no usage limits, and no data tracking."
    }
  ]}
>

      <div className="flex flex-col gap-6">
        
        {/* --- WORKSPACE --- */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
          
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
                placeholder='{ "apiVersion": "v1", "kind": "Pod" }'
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
                 <div className="bg-purple-200 border border-black px-1 text-xs">YAML</div>
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
                    highlight={code => highlight(code, languages.yaml, 'yaml')}
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
                   title="Copy YAML"
                 >
                   <Copy size={18} />
                 </button>
                 <button 
                   onClick={handleDownload}
                   disabled={!output}
                   className="flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 text-sm font-bold border-2 border-black hover:bg-green-700 disabled:opacity-50 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-px hover:translate-y-px"
                 >
                   <Download size={16} /> Save .yaml
                 </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </ToolShell>
  );
}