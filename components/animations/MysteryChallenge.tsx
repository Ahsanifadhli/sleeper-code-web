"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, ArrowRight, HelpCircle } from "lucide-react";
import Image from "next/image";

// --- KONFIGURASI CHALLENGE ---
const CORRECT_FLAG = "DREAM"; 
const CHALLENGE_TEXT = "Decode Base64 / see slogan:";
const CHALLENGE_CODE = "RFJFQU0="; 
const IMAGE_PATH = "/profile.png"; 
// -----------------------------

export default function MysteryChallenge() {
  const [isLocked, setIsLocked] = useState(true);
  const [input, setInput] = useState("");
  const [isError, setIsError] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    console.log(
      "%c[SYSTEM] Challenge Active:", 
      "color: #0ea5e9; font-weight: bold; font-size: 14px;"
    );
    console.log("Hint: The secret key is hidden in the slogan 'Dreaming in code'.");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (input.trim().toUpperCase() === CORRECT_FLAG) {
      setIsLocked(false);
      setIsError(false);
    } else {
      setIsError(true);
      setInput("");
      setTimeout(() => setIsError(false), 500);
    }
  };

  return (
    <div className="relative w-full max-w-sm aspect-square rounded-lg shadow-2xl overflow-hidden border border-cyber-primary/30 bg-cyber-black">
      <AnimatePresence mode="wait">
        {isLocked ? (
          // --- TERMINAL TERKUNCI ---
          <motion.div
            key="locked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            // UBAH: p-4 untuk layar kecil, p-6 untuk layar > sm
            className={`h-full bg-cyber-dark/90 backdrop-blur p-4 sm:p-6 flex flex-col justify-between relative ${isError ? 'animate-shake' : ''}`}
          >
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('/grid.svg')] bg-center"></div>
            
            <div className="w-full">
               {/* Traffic Lights (Mengecil di layar kecil) */}
               <div className="flex gap-2 mb-3 sm:mb-4">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
              </div>

              {/* Status Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2 text-red-400 font-mono text-[10px] sm:text-sm animate-pulse">
                    <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>LOCKED</span>
                </div>
                <button 
                    onClick={() => setShowHint(!showHint)}
                    className="text-gray-500 hover:text-cyber-primary transition-colors"
                >
                    <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Soal Challenge */}
              <div className="space-y-2 sm:space-y-3 font-mono">
                <p className="text-gray-300 text-[10px] sm:text-sm leading-tight">
                    {showHint ? (
                        <span className="text-cyber-neon typing-effect">
                            HINT: Decode Base64 string below.
                        </span>
                    ) : (
                        CHALLENGE_TEXT
                    )}
                </p>
                {/* UBAH: break-all agar kode turun ke bawah jika layar sempit */}
                <code className="block bg-black/50 p-2 sm:p-3 rounded border border-cyber-primary/50 text-cyber-neon text-center font-bold tracking-widest break-all text-xs sm:text-sm">
                  {CHALLENGE_CODE}
                </code>
              </div>
            </div>

            {/* Form Input */}
            <form onSubmit={handleSubmit} className="mt-2 sm:mt-6 w-full">
              <div className={`flex items-center gap-2 border-b ${isError ? 'border-red-500' : 'border-cyber-primary/50'} py-1 sm:py-2 transition-colors duration-300`}>
                <span className="text-cyber-primary text-xs sm:text-sm">{`>`}</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isError ? "DENIED" : "Enter key..."}
                  // UBAH: Ukuran font input menyesuaikan layar
                  className={`bg-transparent border-none focus:ring-0 w-full font-mono text-xs sm:text-sm outline-none ${isError ? 'text-red-400 placeholder:text-red-400/50' : 'text-white placeholder:text-gray-600'}`}
                  autoComplete="off"
                />
                <button type="submit" className="text-cyber-primary hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </form>

            <div className="mt-2 text-[8px] sm:text-[10px] text-gray-600 font-mono text-center">
                F12 for logs
            </div>

          </motion.div>
        ) : (
          // --- FOTO TERBUKA ---
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="h-full relative group"
          >
             <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col justify-end p-4 sm:p-6">
                <div className="flex items-center gap-2 text-cyber-neon mb-1 sm:mb-2">
                   <Unlock className="w-3 h-3 sm:w-4 sm:h-4" />
                   <span className="font-mono text-[10px] sm:text-xs">VERIFIED</span>
                </div>
                <h3 className="text-white font-bold text-lg sm:text-xl font-mono">Sleeper Code</h3>
                <p className="text-cyber-primary text-xs sm:text-sm font-mono">Fullstack Dev</p>
             </div>

            <Image 
              src={IMAGE_PATH}
              alt="Profile"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(14,165,233,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}