"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ArrowRight, Github, Linkedin, X, Code } from "lucide-react"; // Tambah icon X dan Code
import Typewriter from "@/components/animations/Typewriter";
import Link from "next/link";
import MysteryChallenge from "@/components/animations/MysteryChallenge";
import HackerTerminal from "../HackerTerminal";

export default function Hero() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false); // State untuk buka/tutup terminal

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden">
      
      {/* --- BAGIAN UTAMA (LAYOUT TIDAK BERUBAH) --- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
        
        {/* KOLOM KIRI */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 sm:space-y-6 order-1 md:order-1"
        >
          {/* Badge Status */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-primary/30 bg-cyber-primary/5 text-cyber-primary text-[10px] sm:text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-primary"></span>
            </span>
            {isRevealed ? "Identity Verified" : "Available for Freelance"}
          </div>

          {/* Judul Utama */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold font-mono tracking-tighter leading-tight">
            <span className="text-gray-100">Hi, I'm </span>
            <br />
            {/* LOGIKA GANTI NAMA (STYLE TETAP SAMA 100%) */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-neon animate-pulse">
              {isRevealed ? "Ahsani Fadhli Ilahi" : "Sleeper Code"}
            </span>
          </h1>

          {/* Subtitle */}
          <div className="text-base sm:text-xl md:text-2xl text-gray-400 font-mono h-[24px] sm:h-[32px]">
            <span>I build </span>
            <span className="text-cyber-primary">
              <Typewriter 
                words={["Modern Webs", "Fullstack Apps", "Secure Systems"]} 
              />
            </span>
          </div>

          <p className="max-w-md text-gray-400 leading-relaxed text-xs sm:text-sm md:text-base">
            {isRevealed 
              ? "Halooo, kenalin aku mahasiswa TRPL UGM semester 4. Aku senang untuk eksplorasi sesuatu yang belum pernah aku coba >_<"
              : "Selamat datang di sebuah eksperimen sebuah kode dengan ribuan dan jutaan mimpi. Dreaming in Code."
            }
          </p>

          {/* Tombol-tombol */}
          <div className="flex flex-wrap gap-3 pt-2 sm:pt-4">
            <Link href="/projects" className="group relative px-4 sm:px-6 py-2 sm:py-3 bg-cyber-primary/10 border border-cyber-primary text-cyber-primary font-mono text-xs sm:text-sm font-bold overflow-hidden hover:bg-cyber-primary hover:text-cyber-black transition-all duration-300 rounded w-full sm:w-auto text-center">
              <span className="relative z-10 flex items-center justify-center gap-2">
                View Projects <Terminal className="w-3 h-3 sm:w-4 sm:h-4" />
              </span>
              <div className="absolute inset-0 bg-cyber-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </Link>

            <Link href="/contact" className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-700 text-gray-300 font-mono text-xs sm:text-sm hover:border-gray-500 hover:text-white transition-colors rounded flex items-center justify-center gap-2 w-full sm:w-auto">
              Contact <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
          </div>
          
          <div className="flex gap-4 sm:gap-6 pt-4 text-gray-500 justify-center sm:justify-start">
            <Github className="w-5 h-5 sm:w-6 sm:h-6 hover:text-white cursor-pointer transition-colors" />
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 hover:text-white cursor-pointer transition-colors" />
          </div>
        </motion.div>

        {/* KOLOM KANAN */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center items-center w-full order-2 md:order-2 mt-4 md:mt-0"
        >
          <div className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-cyber-primary/20 rounded-full blur-[60px] md:blur-[100px] -z-10"></div>
          <div className="w-full max-w-[280px] sm:max-w-sm">
             <MysteryChallenge />
          </div>
        </motion.div>
      </div>


      {/* --- FITUR BARU: FLOATING TERMINAL BUTTON --- */}
      {/* Tombol Melayang di Pojok Kanan Bawah */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowTerminal(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-black border border-green-500 text-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:bg-green-900/20 transition-all group"
      >
        <Code className="w-6 h-6 animate-pulse" />
        <span className="absolute -top-10 right-0 bg-green-900/80 text-green-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Open System Terminal
        </span>
      </motion.button>


      {/* --- MODAL POPUP TERMINAL (Melayang) --- */}
      <AnimatePresence>
        {showTerminal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            {/* Container Terminal */}
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="relative w-full max-w-2xl bg-black border border-green-500 rounded-lg shadow-[0_0_50px_rgba(34,197,94,0.2)] overflow-hidden"
            >
              {/* Header Modal */}
              <div className="flex items-center justify-between px-4 py-2 bg-green-900/20 border-b border-green-500/30">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-green-500" />
                  <span className="text-xs font-mono text-green-400">root@sleeper-code:~</span>
                </div>
                <button 
                  onClick={() => setShowTerminal(false)}
                  className="text-green-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Isi Terminal */}
              <div className="p-2">
                 <HackerTerminal onUnlock={() => {
                    setIsRevealed(true);
                    // Opsional: Tutup terminal otomatis setelah unlock, atau biarkan terbuka
                    // setShowTerminal(false); 
                 }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}