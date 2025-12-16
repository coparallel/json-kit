import type { Metadata } from "next";
import { Github } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet the team behind JSON-Kit. We built the fastest, 100% private client-side JSON workspace because we were tired of slow, ad-filled tools. Built for devs, by devs.",
  openGraph: {
    title: "About Us | JSON-Kit",
    description: "Why we built the fastest, most private JSON workspace on the web.",
    type: "website",
    url: "/about",
  },
};

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
          BUILT FOR <span className="text-blue-600">SPEED</span>.
        </h1>
        <p className="text-xl text-gray-600 font-medium">
          No ads. No logins. No servers. Just code.
        </p>
      </div>

      <div className="paper-card p-8 space-y-8 text-lg text-gray-800 leading-relaxed">
        <p>
          <strong>The Problem:</strong> Most JSON tools today are bloated. They are covered in ads, require you to sign up, or worse—they send your private API keys and customer data to a random server to be "processed."
        </p>
        
        <p>
          <strong>The JSON-Kit Solution:</strong> We believe developer tools should be:
        </p>
        
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <li className="bg-gray-50 p-4 border-2 border-black rounded-xl font-bold">
            ⚡ Instant (0ms Latency)
          </li>
          <li className="bg-gray-50 p-4 border-2 border-black rounded-xl font-bold">
            🔒 100% Private (Client-Side)
          </li>
          <li className="bg-gray-50 p-4 border-2 border-black rounded-xl font-bold">
            🎨 Visual (Not just text)
          </li>
          <li className="bg-gray-50 p-4 border-2 border-black rounded-xl font-bold">
             💸 Free Forever
          </li>
        </ul>

        <p>
          We built <strong>JSON-Kit</strong> to be the "Best Free Online JSON editor tool" we always wanted. A single, beautiful workspace where you can visualize a complex API response one second, and diff a config file the next.
        </p>

        <div className="border-t-2 border-black/10 pt-8 mt-8">
          <h3 className="font-bold text-xl mb-4">Open Source</h3>
          <p className="mb-4 text-base text-gray-600">
            We believe in transparency. If you are curious how our visualization engine works, check out our code.
          </p>
          <a href="https://github.com/coparallel/json-kit" target="_blank" className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
            <Github size={20} /> View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}