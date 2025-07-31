import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://estudiarcontdha.site'),
  title: {
    default: "EstudioTDAH - Herramienta de Estudio para TDAH",
    template: "%s | EstudioTDAH"
  },
  description: "Convierte tus documentos Word y PDF en material de estudio optimizado con anclaje visual e IA. Diseñado específicamente para estudiantes con TDAH. Mejora tu concentración y rendimiento académico.",
  keywords: [
    "TDAH", "estudio", "anclaje visual", "lectura", "estudiantes", 
    "documentos", "PDF", "Word", "concentración", "IA educativa",
    "técnicas de estudio", "ADHD", "material educativo"
  ],
  authors: [{ name: "EstudioTDAH", url: "https://estudiarcontdha.site" }],
  creator: "EstudioTDAH",
  publisher: "EstudioTDAH",
  
  // Open Graph para redes sociales
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://estudiarcontdha.site',
    title: 'EstudioTDAH - Herramienta de Estudio para TDAH',
    description: 'Convierte documentos en material optimizado para estudiantes con TDAH usando anclaje visual e IA',
    siteName: 'EstudioTDAH',
  },
  
  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: 'EstudioTDAH - Herramienta de Estudio para TDAH',
    description: 'Convierte documentos en material optimizado para estudiantes con TDAH',
  },
  
  // Robots y SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Canonical URL
  alternates: {
    canonical: 'https://estudiarcontdha.site',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5308599041082289"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <ThemeProvider>
          {children}
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
