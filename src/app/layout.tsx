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
  title: "EstudioTDAH - Anclaje Visual para Estudiantes",
  description: "Convierte tus documentos Word y PDF en material de estudio optimizado con técnica de anclaje visual. Diseñado específicamente para estudiantes con TDAH.",
  keywords: ["TDAH", "estudio", "anclaje visual", "lectura", "estudiantes", "documentos", "PDF", "Word"],
  authors: [{ name: "EstudioTDAH" }],
  creator: "EstudioTDAH",
  publisher: "EstudioTDAH",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    title: 'EstudioTDAH - Anclaje Visual para Estudiantes',
    description: 'Convierte tus documentos en material de estudio optimizado con técnica de anclaje visual',
    siteName: 'EstudioTDAH',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EstudioTDAH - Anclaje Visual para Estudiantes',
    description: 'Convierte tus documentos en material de estudio optimizado con técnica de anclaje visual',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
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
