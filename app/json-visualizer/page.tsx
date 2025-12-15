
"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import ReactFlow, { 
  Background, 
  Controls, 
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  MarkerType,
  NodeChange, 
  EdgeChange
} from "reactflow";
import "reactflow/dist/style.css";

// Editor & Highlighting
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css"; 

import { Download, Play, Share2, Copy, FileJson, ArrowRightLeft } from "lucide-react";
import * as htmlToImage from 'html-to-image';

// --- SEO CONSTANTS ---
// We can't export 'metadata' from a "use client" file in Next.js 13+.
// Instead, we will wrap this content in the layout or use a separate server component wrapper.
// For now, ensure your Layout has the template, or use the Head component if needed.

// --- 1. Layout Algorithm (Styled for Paper Theme) ---
const layoutTree = (data: any, x = 0, y = 0, level = 0, index = 0): { nodes: Node[], edges: Edge[], nextY: number } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  let currentY = y;

  const createNode = (id: string, label: string, type: 'key' | 'value', xPos: number, yPos: number) => {
    const isKey = type === 'key';
    return {
      id,
      position: { x: xPos, y: yPos },
      data: { label },
      // PAPER CARD STYLE NODES
      style: { 
        background: isKey ? '#ffffff' : '#fefce8', // White for keys, light yellow for values
        border: '2px solid #1a1a1a',
        borderRadius: '0px', // Sharp corners
        padding: '12px',
        width: isKey ? 200 : 250,
        // Hard Shadow
        boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
        fontSize: '13px',
        fontFamily: 'var(--font-code)',
        fontWeight: isKey ? 700 : 400,
        color: '#1a1a1a',
      },
    };
  };

  if (typeof data === 'object' && data !== null) {
    let i = 0;
    Object.keys(data).forEach((key) => {
      const value = data[key];
      const nodeId = `n-${level}-${i}`;
      
      // 1. Create Key Node
      nodes.push(createNode(nodeId, key, 'key', x, currentY));
      
      // 2. Create Value Node
      if (typeof value !== 'object') {
         const valueId = `v-${level}-${i}`;
         // Truncate long strings for visualization
         let displayValue = String(value);
         if (displayValue.length > 30) displayValue = displayValue.substring(0, 30) + "...";
         
         nodes.push(createNode(valueId, displayValue, 'value', x + 250, currentY));
         
         edges.push({
           id: `e-${nodeId}-${valueId}`,
           source: nodeId,
           target: valueId,
           type: 'smoothstep',
           style: { stroke: '#1a1a1a', strokeWidth: 2 },
           markerEnd: { type: MarkerType.ArrowClosed, color: '#1a1a1a' },
         });
      } 
      // 3. Object Placeholder
      else if (value !== null) {
         const objectId = `o-${level}-${i}`;
         nodes.push(createNode(objectId, "{ Object/Array }", 'value', x + 250, currentY));
         edges.push({
           id: `e-${nodeId}-${objectId}`,
           source: nodeId,
           target: objectId,
           type: 'smoothstep',
           style: { stroke: '#1a1a1a', strokeWidth: 2, strokeDasharray: '5,5' }, // Dashed line for objects
           markerEnd: { type: MarkerType.ArrowClosed, color: '#1a1a1a' },
         });
      }

      currentY += 100; // Spacing
      i++;
    });
  }
  return { nodes, edges, nextY: currentY };
};

export default function JsonVisualizerPage() {
  const [code, setCode] = useState(`{\n  "tool": "JSON Visualizer",\n  "style": "Neo-Brutalist",\n  "fast": true,\n  "meta": {\n    "created": 2025,\n    "privacy": "local-only"\n  }\n}`);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [error, setError] = useState<string | null>(null);

  // --- Actions ---
  const handleVisualize = () => {
    try {
      setError(null);
      const parsed = JSON.parse(code);
      const { nodes: newNodes, edges: newEdges } = layoutTree(parsed, 50, 50);
      setNodes(newNodes);
      setEdges(newEdges);
    } catch (e) {
      setError("Invalid JSON: Please fix syntax errors.");
    }
  };

  const handleExport = useCallback(() => {
    const elem = document.querySelector('.react-flow') as HTMLElement;
    if (elem) {
      htmlToImage.toPng(elem, { backgroundColor: '#F9F7F1' }).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'json-kit-graph.png';
        link.href = dataUrl;
        link.click();
      });
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert("JSON copied to clipboard!");
  };

  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. TOP NAV & BREADCRUMBS */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <nav className="text-sm font-mono font-bold text-gray-500 mb-2">
            <Link href="/" className="hover:text-black hover:underline decoration-wavy">Tools</Link>
            <span className="mx-2">/</span>
            <span className="text-black bg-yellow-200 px-1 border border-black">JSON Visualizer</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif text-[#1a1a1a]">
            JSON Visualizer
          </h1>
          <p className="mt-2 text-gray-600 font-medium max-w-xl">
            Transform raw JSON text into an interactive node graph. 
            Debug structures instantly in your browser.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
           <button 
             onClick={handleExport}
             className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
           >
             <Download size={18} />
             <span className="hidden sm:inline">Save Image</span>
           </button>
           
           <button 
             onClick={handleVisualize}
             className="flex items-center gap-2 px-6 py-2 bg-[#2563EB] text-white border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-700 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
           >
             <Play size={18} fill="currentColor" />
             <span>Run Visualizer</span>
           </button>
        </div>
      </div>

      {/* 2. AD SPACE (Optional - Top Banner) */}
      {/* <div className="w-full h-[90px] mb-8 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-xs font-mono text-gray-400">
        ADVERTISEMENT SPACE
      </div> */}

      {/* 3. MAIN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Editor (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col h-150 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10">
          
          {/* Editor Header */}
          <div className="flex justify-between items-center bg-[#F1F1F1] border-b-2 border-black px-4 py-3">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-red-500 border border-black"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black"></div>
               <span className="font-mono text-xs font-bold ml-2">input.json</span>
             </div>
             <button onClick={handleCopy} title="Copy Code" className="hover:bg-gray-200 p-1 rounded">
               <Copy size={14} />
             </button>
          </div>

          {/* Editor Area */}
          <div className="flex-1 overflow-auto bg-white font-mono text-sm relative">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => highlight(code, languages.json, 'json')}
              padding={20}
              className="min-h-full"
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 13,
              }}
            />
          </div>

          {/* Error Message Footer */}
          {error && (
            <div className="bg-red-100 border-t-2 border-black p-2 text-xs text-red-700 font-bold flex items-center gap-2">
              <span>⚠</span> {error}
            </div>
          )}
        </div>

        {/* RIGHT: Visualizer (8 Cols) */}
        <div className="lg:col-span-8 h-150 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
           <div className="absolute top-0 left-0 z-10 bg-white border-b-2 border-r-2 border-black px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-sm">
            Graph Output
          </div>
          
          <div className="h-full w-full">
            {nodes.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-dot-pattern">
                  <Share2 size={64} strokeWidth={1} className="mb-4 text-gray-300" />
                  <p className="font-serif text-xl text-black">Ready to visualize.</p>
                  <p className="text-sm mt-2">Click the blue "Run Visualizer" button.</p>
               </div>
            ) : (
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                className="bg-[#F9F7F1]" // Matches site theme
                minZoom={0.1}
              >
                <Background color="#000" gap={25} size={1} style={{ opacity: 0.1 }} />
                <Controls showInteractive={false} />
              </ReactFlow>
            )}
          </div>
        </div>
      </div>

      {/* 4. CONTENT & SEO SECTION */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 border-t-2 border-black pt-12">
        
        {/* Article */}
        <div className="md:col-span-2 space-y-8">
           <section>
             <h2 className="text-2xl font-serif font-bold mb-4 flex items-center gap-2">
               <span className="w-6 h-6 bg-black text-white rounded-full text-sm flex items-center justify-center">1</span>
               How to use the JSON Visualizer
             </h2>
             <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
               <p className="mb-4">
                 Debugging large JSON files can be a headache when looking at raw text. Our visualizer tool parses your code and creates a <strong>Node-Link Diagram</strong>. 
               </p>
               <ul className="list-disc pl-5 space-y-2 font-medium">
                 <li>Paste your JSON into the left "Input" panel.</li>
                 <li>Click <strong>Run Visualizer</strong> to generate the graph.</li>
                 <li><strong>Zoom and Pan</strong> around the graph to explore deep nested objects.</li>
                 <li>Click <strong>Save Image</strong> to download a PNG for your technical documentation.</li>
               </ul>
             </div>
           </section>

           <section>
             <h2 className="text-2xl font-serif font-bold mb-4 flex items-center gap-2">
               <span className="w-6 h-6 bg-black text-white rounded-full text-sm flex items-center justify-center">2</span>
               Why use this tool?
             </h2>
             <p className="text-gray-700 leading-relaxed">
               Visualizing data helps identify structure errors, understand API responses, and explain data models to non-developers. Since this runs 100% in your browser, it is the safest way to visualize sensitive tokens or private user data without uploading it to a server.
             </p>
           </section>
        </div>

        {/* Sidebar / Related Tools */}
        <div className="md:col-span-1">
          <div className="border-2 border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sticky top-24">
            <h3 className="font-bold text-lg border-b-2 border-black pb-2 mb-4">
              Related Utilities
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/json-formatter" className="flex items-center gap-3 group">
                  <div className="bg-blue-100 p-2 rounded border border-black group-hover:bg-blue-200 transition-colors">
                    <FileJson size={16} />
                  </div>
                  <span className="text-sm font-bold group-hover:underline">JSON Formatter</span>
                </Link>
              </li>
              <li>
                <Link href="/json-diff" className="flex items-center gap-3 group">
                  <div className="bg-green-100 p-2 rounded border border-black group-hover:bg-green-200 transition-colors">
                    <ArrowRightLeft size={16} />
                  </div>
                  <span className="text-sm font-bold group-hover:underline">JSON Diff Checker</span>
                </Link>
              </li>
              {/* Ad Placeholder Small */}
              <li className="pt-4 mt-4 border-t border-dashed border-gray-300">
                 <div className="h-32 bg-gray-50 flex items-center justify-center text-xs text-gray-400 font-mono">
                   AD SLOT (300x250)
                 </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}