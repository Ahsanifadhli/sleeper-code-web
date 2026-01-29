"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Calendar, ShieldCheck, ExternalLink, Filter } from "lucide-react";

// (Interface Certificate tetap sama...)
interface Certificate {
    id: number;
    title: string;
    issuer: string;
    date: string;
    category: string;
    credentialLink: string | null;
    description: string | null;
  }

export default function CertificateList({ certificates }: { certificates: Certificate[] }) {
  const [activeFilter, setActiveFilter] = useState<"All" | "Akademik" | "Non Akademik">("All");

  const filteredCertificates = activeFilter === "All" 
    ? certificates 
    : certificates.filter(cert => cert.category === activeFilter);

  return (
    <>
      {/* HEADER & FILTER */}
      <div className="space-y-6 text-center md:text-left border-b border-cyber-primary/20 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          {/* Font Responsif */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-neon leading-tight">
            // Credentials
          </h1>
          <p className="text-gray-400 mt-2 font-mono text-xs sm:text-sm md:text-base">
            Verifikasi kompetensi Akademik & Profesional.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center md:justify-end gap-2">
          {["All", "Akademik", "Non Akademik"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as any)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-mono border transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-cyber-primary text-cyber-black border-cyber-primary font-bold shadow-[0_0_15px_rgba(14,165,233,0.5)]"
                  : "bg-cyber-dark/30 text-gray-400 border-gray-700 hover:border-cyber-primary hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* GRID KARTU */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCertificates.map((cert) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              key={cert.id}
              className="group relative bg-cyber-dark/40 border border-cyber-primary/20 rounded-xl p-5 sm:p-6 hover:bg-cyber-dark/60 hover:border-cyber-primary transition-all duration-300 overflow-hidden flex flex-col h-full"
            >
              {/* Efek Garis Scan */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-cyber-primary/50 shadow-[0_0_10px_#0ea5e9] translate-y-[-100%] group-hover:translate-y-[400px] transition-transform duration-1000"></div>

              <div className="flex items-start justify-between mb-4">
                <div className="p-2 sm:p-3 bg-cyber-primary/10 rounded-lg text-cyber-primary group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <span className={`px-2 py-1 text-[10px] sm:text-xs font-mono border rounded ${
                  cert.category === "Akademik" 
                    ? "border-green-500/30 text-green-400 bg-green-500/10"
                    : "border-purple-500/30 text-purple-400 bg-purple-500/10"
                }`}>
                  {cert.category}
                </span>
              </div>

              <div className="flex-grow">
                <h3 className="text-lg sm:text-xl font-bold text-gray-100 mb-2 group-hover:text-cyber-neon transition-colors line-clamp-2">
                  {cert.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-3">
                  {cert.description}
                </p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-800 space-y-3">
                <div className="flex flex-col gap-2 text-[10px] sm:text-xs text-gray-500 font-mono">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyber-primary" />
                    <span className="truncate">{cert.issuer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{cert.date}</span>
                  </div>
                </div>

                <a href={cert.credentialLink || "#"} target="_blank" className="flex items-center justify-center w-full py-2 mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-cyber-primary border border-cyber-primary/30 rounded hover:bg-cyber-primary hover:text-cyber-black transition-colors">
                  Verify Credential <ExternalLink className="w-3 h-3 ml-2" />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Pesan Kosong */}
      {filteredCertificates.length === 0 && (
        <div className="text-center py-20 opacity-50">
           <Filter className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-gray-600" />
           <p className="font-mono text-gray-400 text-sm">No data found in this category.</p>
        </div>
      )}
    </>
  );
}