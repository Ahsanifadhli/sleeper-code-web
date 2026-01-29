"use client";
import { motion } from "framer-motion";
import { Terminal, ArrowRight, Github, Linkedin } from "lucide-react";
import Typewriter from "@/components/animations/Typewriter";
import Link from "next/link";
import MysteryChallenge from "@/components/animations/MysteryChallenge";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden">
      
      {/* UBAH: px-4 (lebih kecil) untuk layar HP, agar konten lebih lega */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
        
        {/* KOLOM KIRI: TEKS */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 sm:space-y-6 order-1 md:order-1"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-primary/30 bg-cyber-primary/5 text-cyber-primary text-[10px] sm:text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-primary"></span>
            </span>
            Available for Freelance
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold font-mono tracking-tighter leading-tight">
            <span className="text-gray-100">Hi, I'm </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-neon animate-pulse">
              Sleeper Code
            </span>
          </h1>

          <div className="text-base sm:text-xl md:text-2xl text-gray-400 font-mono h-[24px] sm:h-[32px]">
            <span>I build </span>
            <span className="text-cyber-primary">
              <Typewriter 
                words={[
                  "Modern Webs", 
                  "Fullstack Apps", 
                  "Secure Systems"
                ]} 
              />
            </span>
          </div>

          <p className="max-w-md text-gray-400 leading-relaxed text-xs sm:text-sm md:text-base">
            Dreaming in code. Mahasiswa TRPL UGM yang fokus menciptakan solusi digital interaktif.
          </p>

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

        {/* KOLOM KANAN: CHALLENGE BOX */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center items-center w-full order-2 md:order-2 mt-4 md:mt-0"
        >
          <div className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-cyber-primary/20 rounded-full blur-[60px] md:blur-[100px] -z-10"></div>
          
          {/* UBAH: w-full agar mengikuti lebar container orang tua */}
          <div className="w-full max-w-[280px] sm:max-w-sm">
             <MysteryChallenge />
          </div>
          
        </motion.div>

      </div>
    </section>
  );
}