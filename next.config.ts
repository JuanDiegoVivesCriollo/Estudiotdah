import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración para dominio personalizado
  trailingSlash: false,
  
  // Configuración para dominio sin www
  images: {
    unoptimized: true,
    domains: ['estudiarcontdha.site'],
  },
  
  // Variables de entorno actualizadas
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    NEXT_PUBLIC_SITE_URL: 'https://estudiarcontdha.site',
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
