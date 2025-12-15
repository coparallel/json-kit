import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to CSV Converter | Convert JSON to Excel & Sheets",
  description: "Convert JSON to CSV instantly. Flatten nested JSON into Excel-ready spreadsheets for data analysis, reporting, and imports. 100% client-side.",
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