import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración mínima para Vercel
  images: {
    unoptimized: true
  },
  
  // Variables de entorno
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
  
  // Configuración para pdf-parse y compatibilidad con Vercel (nueva sintaxis)
  serverExternalPackages: ['pdf-parse'],
  
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('pdf-parse');
    }
    return config;
  },
};

export default nextConfig;
