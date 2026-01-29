"use client";
import { Github, Linkedin, Twitter, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-cyber-primary/20 bg-cyber-black/80 backdrop-blur-md mt-auto">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Copyright Kiri */}
          <div className="text-gray-400 font-mono text-sm text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} <span className="text-cyber-primary">Sleeper Code</span>. All systems operational.</p>
          </div>

          {/* Social Icons Tengah/Kanan */}
          <div className="flex items-center gap-6">
            <Link href="#" className="text-gray-400 hover:text-cyber-primary transition-colors">
              <Github className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-cyber-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-cyber-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Baris Bawah Tambahan */}
        <div className="mt-8 pt-4 border-t border-cyber-dark text-center">
          <p className="text-xs text-gray-600 font-mono flex items-center justify-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> using Next.js & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}