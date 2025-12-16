import Link from "next/link";
import { ArrowRight, ArrowRightLeft, FileSpreadsheet, Sparkles } from "lucide-react";

export default function RelatedTools() {
  return (
    <section className="mt-16 border-t-2 border-black pt-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-sm font-serif font-bold text-xl">
          R
        </div>
        <h3 className="text-3xl font-serif font-bold text-[#1a1a1a]">
          Explore Other Tools
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Tool 1: JSON Diff */}
        <Link 
          href="/json-diff" 
          className="group block bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="bg-blue-100 p-2 border-2 border-black rounded-sm">
              <ArrowRightLeft size={20} className="text-black" />
            </div>
            <ArrowRight size={20} className="text-gray-400 group-hover:text-black group-hover:-rotate-45 transition-all duration-300" />
          </div>
          <h4 className="font-bold text-lg font-mono group-hover:text-blue-700 transition-colors">
            JSON Diff
          </h4>
          <p className="text-sm text-gray-600 mt-1 font-medium">
            Compare differences between two JSON files.
          </p>
        </Link>

        {/* Tool 2: JSON to CSV */}
        <Link 
          href="/json-to-csv" 
          className="group block bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="bg-green-100 p-2 border-2 border-black rounded-sm">
              <FileSpreadsheet size={20} className="text-black" />
            </div>
            <ArrowRight size={20} className="text-gray-400 group-hover:text-black group-hover:-rotate-45 transition-all duration-300" />
          </div>
          <h4 className="font-bold text-lg font-mono group-hover:text-blue-700 transition-colors">
            JSON to CSV
          </h4>
          <p className="text-sm text-gray-600 mt-1 font-medium">
            Convert complex data for Excel & Sheets.
          </p>
        </Link>

         {/* Tool 3: Text to Schema */}
         <Link 
          href="#" 
          className="group block bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="bg-purple-100 p-2 border-2 border-black rounded-sm">
              <Sparkles size={20} className="text-black" />
            </div>
            <ArrowRight size={20} className="text-gray-400 group-hover:text-black group-hover:-rotate-45 transition-all duration-300" />
          </div>
          <h4 className="font-bold text-lg font-mono group-hover:text-blue-700 transition-colors">
            AI Schema Gen
          </h4>
          <p className="text-sm text-gray-600 mt-1 font-medium">
            Generate JSON Schemas from raw text.
          </p>
        </Link>

      </div>
    </section>
  );
}