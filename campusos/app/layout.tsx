import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

export const metadata: Metadata = {
  title: "CampusOS — Digital Campus Operating System",
  description:
    "The complete enterprise-grade SaaS platform for managing every operation of schools, colleges, universities, and educational institutions. Zero paper. Zero manual registers.",
  keywords: "campus management, school ERP, college management, education SaaS, digital campus",
  openGraph: {
    title: "CampusOS — Digital Campus Operating System",
    description: "Complete Digital Campus Operating System for enterprise education management.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
