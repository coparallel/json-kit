import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | JSON-Kit",
  description: "Our strict zero-data policy. We do not store, track, or see your JSON data. Everything is processed locally in your browser.",
};

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
      
      <div className="paper-card p-8 space-y-8">
        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <p className="font-bold text-green-900">
            The Short Version: We do not see, store, or transmit your JSON data. It never leaves your browser.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-4">1. Data Processing</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            JSON-Kit operates as a <strong>Client-Side Application</strong>. When you paste JSON, CSV, or XML into our tools, the processing happens entirely within your device's memory (RAM) using JavaScript.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>We do not have a backend database.</li>
            <li>We do not transmit your code to any server.</li>
            <li>We do not save your files.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Analytics</h2>
          <p className="text-gray-700 leading-relaxed">
            We use anonymous analytics (like Cloudflare Web Analytics) to count how many people visit the site. This data does not contain any personal information, IP addresses, or the content of your JSON files.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Local Storage</h2>
          <p className="text-gray-700 leading-relaxed">
            Some tools may save your preferences (like "Dark Mode" or "Last Used Tool") in your browser's <code>localStorage</code>. You can clear this at any time by clearing your browser cache.
          </p>
        </section>

        <div className="border-t-2 border-black/10 pt-6 text-sm text-gray-500">
          Last Updated: December 2025
        </div>
      </div>
    </div>
  );
}