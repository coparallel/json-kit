import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to CSV Converter | Convert JSON to Excel Online",
  description: "Free online JSON to CSV converter. Transform nested JSON data into flat CSV spreadsheets for Microsoft Excel and Google Sheets. 100% Client-side privacy.",
  keywords: [
    "json to csv", 
    "convert json to excel", 
    "json to csv converter", 
    "json to sheets", 
    "flatten json to csv"
  ],
  openGraph: {
    title: "JSON to CSV Converter",
    description: "Convert complex JSON objects into Excel-ready CSV files instantly.",
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