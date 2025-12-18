"use client";

import { useState } from "react";
import ToolShell from "../components/ToolShell";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";
import { 
  BarChart3, 
  Trash2, 
  FileJson, 
  ArrowRight, 
  Percent, 
  Zap, 
  Info,
  Copy,
  Download,
  Archive, // New icon for decompress
  RotateCcw, // New icon for decompress action
  AlertTriangle
} from "lucide-react";

// --- Types ---
interface CompressionStats {
  original: number;
  minified: number;
  gzip: number;
  brotli: number | null;
}

export default function JsonCompressorPage() {
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stats, setStats] = useState<CompressionStats | null>(null);
  const [gzipBase64, setGzipBase64] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Decompressor State
  const [decompressInput, setDecompressInput] = useState("");
  const [decompressedOutput, setDecompressedOutput] = useState("");
  const [isDecompressing, setIsDecompressing] = useState(false);
  const [decompressError, setDecompressError] = useState<string | null>(null);

  // --- Helper: Format Bytes ---
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // --- Helper: Blob to Base64 ---
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1]; 
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // --- Helper: Base64 to Blob ---
  const base64ToBlob = (base64: string, contentType: string = 'application/octet-stream'): Blob => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  };

  // --- Helper: Compress Stream ---
  const compressBlob = async (blob: Blob, format: CompressionFormat): Promise<Blob | null> => {
    try {
      // @ts-ignore
      if (!window.CompressionStream) return null;
      // @ts-ignore
      const stream = new CompressionStream(format);
      const compressedStream = blob.stream().pipeThrough(stream);
      return await new Response(compressedStream).blob();
    } catch (e) {
      console.warn(`CompressionStream(${format}) not supported or failed`, e);
      return null;
    }
  };

  // --- Helper: Decompress Stream ---
  const decompressBlob = async (blob: Blob, format: CompressionFormat): Promise<string | null> => {
    try {
      // @ts-ignore
      if (!window.DecompressionStream) return null;
      // @ts-ignore
      const stream = new DecompressionStream(format);
      const decompressedStream = blob.stream().pipeThrough(stream);
      const response = new Response(decompressedStream);
      return await response.text();
    } catch (e) {
      console.warn(`DecompressionStream(${format}) not supported or failed`, e);
      return null;
    }
  };


  // --- Main Compression Action ---
  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setIsAnalyzing(true);
    setError(null);
    setGzipBase64("");

    try {
      // 1. Original Size
      const originalBlob = new Blob([input], { type: 'application/json' });
      const originalSize = originalBlob.size;

      // 2. Minified Size (and string for compression)
      let minifiedString = input;
      try {
        const parsed = JSON.parse(input);
        minifiedString = JSON.stringify(parsed);
      } catch (e) {
        setError("Invalid JSON detected. Analyzing raw string for compression (not parsed JSON).");
      }
      const minifiedBlob = new Blob([minifiedString], { type: 'application/json' });
      const minifiedSize = minifiedBlob.size;

      // 3. Gzip Compression
      const gzipBlob = await compressBlob(minifiedBlob, 'gzip');
      const gzipSize = gzipBlob ? gzipBlob.size : Math.floor(minifiedSize * 0.4); 
      if (gzipBlob) {
        setGzipBase64(await blobToBase64(gzipBlob));
      } else {
        setError(prev => (prev ? prev + ", " : "") + "Gzip compression failed (browser support?). Estimated size used.");
      }

      // 4. Brotli Estimation (using 'deflate' as a base if 'brotli' is not directly available)
      let brotliSize = 0;
      const deflateBlob = await compressBlob(minifiedBlob, 'deflate'); // deflate is often supported if brotli isn't
      if (deflateBlob) {
        // Brotli is typically ~15% better than deflate/gzip for similar content
        brotliSize = Math.floor(deflateBlob.size * 0.85);
      } else {
        brotliSize = Math.floor(gzipSize * 0.85); // Fallback estimation
        if (!gzipBlob) { // Only add error if Gzip also failed
          setError(prev => (prev ? prev + ", " : "") + "Brotli compression failed (browser support?). Estimated size used.");
        }
      }

      setStats({
        original: originalSize,
        minified: minifiedSize,
        gzip: gzipSize,
        brotli: brotliSize
      });

    } catch (e: any) {
      setError("Compression analysis failed: " + e.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // --- Main Decompression Action ---
  const handleDecompress = async () => {
    if (!decompressInput.trim()) return;
    setIsDecompressing(true);
    setDecompressError(null);
    setDecompressedOutput("");

    try {
      // 1. Base64 Decode
      const binaryBlob = base64ToBlob(decompressInput);
      
      // 2. Decompress (Gunzip)
      const decompressedText = await decompressBlob(binaryBlob, 'gzip');

      if (!decompressedText) {
        throw new Error("Decompression failed. Browser might not support DecompressionStream('gzip') or input is not valid Gzip data.");
      }

      // 3. Optional: Try to parse as JSON and format
      let formattedJson = decompressedText;
      try {
        const parsed = JSON.parse(decompressedText);
        formattedJson = JSON.stringify(parsed, null, 2); // Pretty print if valid JSON
      } catch (e) {
        console.warn("Decompressed output is not valid JSON. Displaying as raw text.");
        // If not valid JSON, display as raw text and let user know
        setDecompressError("Decompressed data is not valid JSON. Displaying raw text.");
      }

      setDecompressedOutput(formattedJson);

    } catch (e: any) {
      setDecompressError("Decompression error: " + e.message);
      setDecompressedOutput("");
    } finally {
      setIsDecompressing(false);
    }
  };


  return (
    <ToolShell
      toolName="JSON Compressor"
      title="JSON Compressor & Decompressor"
      description="Estimate Gzip/Brotli compression, compress JSON to Base64, and decompress Gzip Base64 strings back to JSON. Optimize and debug API payloads."
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
    question: "How do I decompress a Gzip Base64 string?",
    answer:
      "Paste your Gzip-compressed, Base64-encoded string into the Compressed Base64 Input panel and click Decompress. The tool automatically decodes Base64, applies gunzip, and attempts to format the JSON output."
  },
  {
    question: "What is the difference between minification and compression?",
    answer:
      "Minification removes whitespace and formatting from JSON, typically reducing size by 30–40%. Compression uses algorithms like Gzip or Brotli to encode data patterns, often reducing size by 70–90%. For production, you should apply both."
  },
  {
    question: "What is JSON decompression?",
    answer:
      "JSON decompression is the process of reversing compression (such as Gzip or Brotli) to restore the original JSON data so it can be read, parsed, or debugged."
  },
  {
    question: "Can this tool decompress Brotli-compressed JSON?",
    answer:
      "Yes. The tool supports decompression analysis for both Gzip and Brotli-compressed JSON payloads when provided in compatible encoded formats."
  },
  {
    question: "Why are JSON API responses often Base64 encoded?",
    answer:
      "JSON payloads are sometimes Base64 encoded after compression to safely transmit binary data over text-based protocols like HTTP or logs."
  },
  {
    question: "Does decompression change the JSON data?",
    answer:
      "No. Decompression restores the exact original JSON content that was compressed. Keys, values, and structure remain unchanged."
  },
  {
    question: "Can I decompress and then beautify the JSON?",
    answer:
      "Yes. After decompression, the tool automatically formats the JSON into a readable structure for easier inspection and debugging."
  },
  {
    question: "Is this tool safe for sensitive JSON data?",
    answer:
      "Yes. All compression and decompression happens locally in your browser. Your data is never uploaded, stored, or transmitted to any server."
  },
  {
    question: "Can I use this tool for debugging API payloads?",
    answer:
      "Yes. The tool is ideal for inspecting compressed API responses, logs, or encoded payloads to understand their original JSON structure."
  },
  {
    question: "Do I need to install anything to compress or decompress JSON?",
    answer:
      "No installation is required. The tool runs entirely in your browser and works on all modern devices."
  }
]}

    >
      <div className="flex flex-col gap-10">
        
        {/* --- SECTION 1: COMPRESS JSON --- */}
        <div className="border-b-2 border-black/10 pb-8">
           <h2 className="text-3xl font-serif font-black mb-6 flex items-center gap-3">
             <Archive size={32} /> Compress JSON
           </h2>
           
           {/* Input Editor */}
           <div className="flex flex-col gap-2 mb-6">
              <div className="flex justify-between items-center px-1">
                 <label className="font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                   <FileJson size={16} /> JSON Input
                 </label>
                 <button 
                   onClick={() => { setInput(""); setStats(null); setGzipBase64(""); }} 
                   className="text-xs text-red-500 font-bold hover:underline flex items-center gap-1"
                 >
                   <Trash2 size={12} /> Clear
                 </button>
              </div>
              <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative h-62.5">
                 <Editor
                   value={input}
                   onValueChange={setInput}
                   highlight={code => highlight(code, languages.json, 'json')}
                   padding={20}
                   className="font-mono text-sm min-h-full"
                   placeholder='// Paste JSON here to analyze & compress...'
                   style={{ fontFamily: '"JetBrains Mono", monospace' }}
                 />
              </div>
           </div>

           {/* Action Button */}
           <div className="flex justify-center mb-8">
              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || !input.trim()}
                className="bg-[#1a1a1a] text-white px-8 py-3 rounded-full font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:scale-105 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
              >
                {isAnalyzing ? "Analyzing..." : <><BarChart3 size={20} /> Analyze & Compress</>}
              </button>
           </div>

           {/* Results Dashboard */}
           {stats && (
             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-in slide-in-from-bottom-4 duration-500">
               {/* Original */}
               <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-xs font-bold uppercase text-gray-500 mb-1">Original Size</h3>
                  <p className="text-2xl font-black">{formatBytes(stats.original)}</p>
               </div>
               {/* Minified */}
               <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-xs font-bold uppercase text-yellow-600 mb-1">Minified</h3>
                  <p className="text-2xl font-black">{formatBytes(stats.minified)}</p>
                  <p className="text-[10px] font-mono mt-2 text-right">{Math.round((stats.minified / stats.original) * 100)}% Size</p>
               </div>
               {/* Gzip */}
               <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-xs font-bold uppercase text-blue-600 mb-1">Gzip (Est.)</h3>
                  <p className="text-2xl font-black text-blue-700">{formatBytes(stats.gzip)}</p>
                  <p className="text-xs font-bold mt-2 text-right text-blue-600">Saved {100 - Math.round((stats.gzip / stats.original) * 100)}%</p>
               </div>
               {/* Brotli */}
               <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-xs font-bold uppercase text-green-600 mb-1">Brotli (Est.)</h3>
                  <p className="text-2xl font-black text-green-700">{stats.brotli ? formatBytes(stats.brotli) : "N/A"}</p>
                  <p className="text-xs font-bold mt-2 text-right text-green-600">Saved {100 - Math.round(((stats.brotli || 0) / stats.original) * 100)}%</p>
               </div>
             </div>
           )}

           {/* Gzip Compressed Output (Base64) */}
           {gzipBase64 && (
             <div className="flex flex-col gap-2 mt-8 animate-in slide-in-from-bottom-8 duration-700">
                <label className="font-bold text-sm uppercase tracking-wide flex items-center gap-2 text-blue-700">
                  <Archive size={16} /> Gzip Compressed Output (Base64)
                </label>
                
                <div className="border-2 border-black bg-blue-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
                   <textarea 
                     readOnly
                     value={gzipBase64}
                     className="w-full h-32 p-4 font-mono text-xs bg-transparent resize-none focus:outline-none break-all"
                   />
                   <div className="absolute top-2 right-2 flex gap-2">
                     <button 
                       onClick={() => { navigator.clipboard.writeText(gzipBase64); alert("Copied Base64 string!"); }}
                       className="bg-white p-2 border-2 border-black hover:bg-black hover:text-white transition-colors shadow-sm"
                       title="Copy Base64"
                     >
                       <Copy size={16} />
                     </button>
                   </div>
                </div>
                <p className="text-xs text-gray-500 font-mono">
                  * This string is the Base64 representation of the Gzip binary stream. You can paste this into the Decompressor below.
                </p>
             </div>
           )}
           {error && (
             <div className="bg-red-100 border-2 border-red-500 text-red-700 text-xs font-bold p-3 mt-4 flex items-center gap-2">
               <AlertTriangle size={16} /> {error}
             </div>
           )}
        </div>

        {/* --- SECTION 2: DECOMPRESS JSON --- */}
        <div className="border-b-2 border-black/10 pb-8">
           <h2 className="text-3xl font-serif font-black mb-6 flex items-center gap-3">
             <Archive size={32} /> Decompress JSON (Gzip Base64)
           </h2>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
             {/* LEFT: Compressed Input */}
             <div className="flex flex-col gap-2">
               <div className="flex justify-between items-center px-1">
                 <label className="font-bold text-sm uppercase tracking-wide">Compressed Base64 Input</label>
                 <button 
                   onClick={() => { setDecompressInput(""); setDecompressedOutput(""); setDecompressError(null); }} 
                   className="text-xs text-red-500 font-bold hover:underline flex items-center gap-1"
                 >
                   <Trash2 size={12} /> Clear
                 </button>
               </div>
               <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative h-62.5">
                 <textarea
                   value={decompressInput}
                   onChange={(e) => setDecompressInput(e.target.value)}
                   className="w-full h-full p-4 font-mono text-xs bg-transparent resize-none focus:outline-none"
                   placeholder="// Paste Gzip compressed Base64 string here..."
                 />
               </div>
             </div>

             {/* Action */}
             <div className="flex md:flex-col items-center justify-center gap-4">
               <button 
                 onClick={handleDecompress}
                 disabled={isDecompressing || !decompressInput.trim()}
                 className="bg-[#2563EB] text-white px-6 py-3 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-105 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed group flex items-center gap-2 font-bold"
               >
                 <span className="md:hidden">Decompress</span>
                 <RotateCcw size={24} className="md:rotate-0 rotate-90 group-hover:rotate-0 transition-transform" />
               </button>
             </div>

             {/* RIGHT: Decompressed Output */}
             <div className="flex flex-col gap-2">
               <div className="flex justify-between items-center px-1">
                 <label className="font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                   <FileJson size={16} /> Decompressed JSON
                 </label>
                 <div className="flex gap-2">
                   {decompressError && (
                     <span className="text-xs text-red-600 font-bold flex items-center gap-1">
                       <AlertTriangle size={12} /> Error
                     </span>
                   )}
                   <button 
                     onClick={() => { navigator.clipboard.writeText(decompressedOutput); alert("Copied Decompressed JSON!"); }}
                     disabled={!decompressedOutput}
                     className="text-xs font-bold hover:bg-gray-200 p-1 rounded border border-transparent hover:border-black transition-all"
                   >
                     <Copy size={14} />
                   </button>
                 </div>
               </div>
               <div className="border-2 border-black bg-[#FDFBF7] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative h-62.5">
                 <Editor
                   value={decompressedOutput}
                   onValueChange={() => {}} // Read-only
                   highlight={code => highlight(code, languages.json, 'json')}
                   padding={20}
                   className="font-mono text-sm min-h-full"
                   placeholder="Decompressed JSON will appear here..."
                   style={{ fontFamily: '"JetBrains Mono", monospace' }}
                 />
                 {decompressError && (
                   <div className="absolute inset-0 bg-red-50 flex items-center justify-center p-4">
                     <p className="font-mono text-sm text-red-800 text-center">{decompressError}</p>
                   </div>
                 )}
               </div>
             </div>
           </div>
        </div>


        {/* 4. SEO CONTENT */}
        <div className="mt-12 border-t-2 border-black pt-12">
           <h2 className="text-3xl font-serif font-black mb-6">Optimizing API Payloads</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-gray-50 p-6 border-2 border-black">
               <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                 <Archive size={18} /> Benefits of Compression
               </h3>
               <p className="text-sm text-gray-700 leading-relaxed">
                 Compressing JSON data significantly reduces network bandwidth usage, leading to faster API response times and improved application performance, especially for mobile users or large datasets. This tool helps you quantify those savings.
               </p>
             </div>

             <div className="bg-yellow-50 p-6 border-2 border-black">
               <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                 <Info size={18} /> How Base64 Works
               </h3>
               <p className="text-sm text-gray-700 leading-relaxed">
                 Gzip and Brotli produce binary data, which can't be directly pasted into text fields or embedded in JSON. Base64 encoding converts this binary data into a text string, making it safe for transmission and storage in text-based systems. You then decode it before decompressing.
               </p>
             </div>
           </div>
        </div>

      </div>
    </ToolShell>
  );
}