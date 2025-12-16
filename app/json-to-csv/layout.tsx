import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to CSV | Convert to Excel & Sheets",
  description: "Convert JSON to CSV instantly. Flatten nested objects into Excel-ready spreadsheets for analysis. Download results directly. 100% Private.",
  keywords: [
    "json to csv",
    "convert json to excel",
    "json to csv converter",
    "flatten json",
    "json to sheets",
    "export json data"
  ],
  openGraph: {
    title: "JSON to CSV Converter",
    description: "Convert complex JSON into clean CSV files instantly.",
    type: "website",
  }
};


export default function JsonToCsvLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}