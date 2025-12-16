import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Read the Terms of Use for JSON-Kit. Understand our policies on privacy, liability, and acceptable use. Our tools are free, open.",
  openGraph: {
    title: "Terms of Use | JSON-Kit",
    description: "Usage terms and limitations of liability for JSON-Kit tools.",
    type: "website",
    url: "/terms", // Explicitly set this to be safe
  },
};

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-black mb-8">Terms of Use</h1>

      <div className="paper-card p-8 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Acceptance</h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing and using <strong>json-kit.com</strong> ("the Service"), you agree to the following terms. The Service is provided "as is" without warranty of any kind.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Usage Rights</h2>
          <p className="text-gray-700 leading-relaxed">
            You are free to use our tools for personal, educational, and commercial purposes. You may use the output (converted files, images, schemas) in your own commercial projects without attribution.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed">
            Since we do not store your data, we are not responsible for data loss. We are not liable for any damages arising from the use or inability to use our tools. Please always keep a backup of your original data.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">4. No Warranty</h2>
          <p className="text-gray-700 leading-relaxed">
            While we strive for accuracy, we do not guarantee that our converters, validators, or diff tools are 100% error-free. 
          </p>
        </section>
      </div>
    </div>
  );
}