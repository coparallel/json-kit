import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* =========================
     STATIC EXPORT
     ========================= */
  output: "export",

  /* =========================
     IMAGES
     ========================= */
  images: {
    unoptimized: true,
  },

  /* =========================
     PERFORMANCE
     ========================= */
  reactCompiler: true,

  /* =========================
     TURBOPACK (EXPLICIT)
     ========================= */
  turbopack: {},
};

export default nextConfig;
