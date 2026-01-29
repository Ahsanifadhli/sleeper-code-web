import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google"; 
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer"; 

// Konfigurasi Font Hacker (JetBrains Mono)
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono", 
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sleeper Code | Portfolio",
  description: "Dreaming in code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // TAMBAHAN: flex flex-col min-h-screen (agar footer selalu di bawah)
        className={`${jetbrainsMono.className} antialiased bg-cyber-black text-gray-200 flex flex-col min-h-screen`}
      >
        <Navbar />
        
        {/* TAMBAHAN: Main wrapper dengan pt-16 (agar konten tidak ketutupan navbar) */}
        <main className="flex-grow pt-16">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}