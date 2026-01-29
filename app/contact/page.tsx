"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Github, Linkedin, Instagram, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import MatrixRain from "@/components/animations/MatrixRain";

export default function ContactPage() {
  // Tambahkan 'botField' di state (kosongkan defaultnya)
  const [formState, setFormState] = useState({ name: "", email: "", message: "", botField: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: any) => setFormState({ ...formState, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "", botField: "" }); // Reset form
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        // Tampilkan pesan error dari backend (misal: "Tunggu 40 detik lagi")
        setErrorMessage(data.error || "Gagal mengirim pesan.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Terjadi kesalahan sistem.");
    }
  };

  return (
    <div className="relative min-h-screen py-20 px-0">
      <MatrixRain />
      
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-start relative z-10">
        
        {/* KOLOM KIRI (Tetap Sama) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8"
        >
           <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono text-gray-100">
              Get in <span className="text-cyber-primary">Touch</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Tertarik kolaborasi atau sekadar ngobrol soal teknologi? Kirim pesan lewat form terenkripsi di samping.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-4 text-gray-300">
              <div className="p-3 bg-cyber-dark border border-cyber-primary/30 rounded-lg text-cyber-primary">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-mono">Email</p>
                <p className="font-bold text-sm sm:text-base">sleepercode@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-gray-300">
              <div className="p-3 bg-cyber-dark border border-cyber-primary/30 rounded-lg text-cyber-primary">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-mono">Base</p>
                <p className="font-bold text-sm sm:text-base">Yogyakarta, Indonesia</p>
              </div>
            </div>
          </div>
          
          <div className="pt-4 sm:pt-8 border-t border-gray-800">
             <p className="text-gray-500 font-mono text-sm mb-4">Connect on Socials:</p>
             <div className="flex gap-4">
                {[Github, Linkedin, Instagram].map((Icon, i) => (
                    <div key={i} className="p-2 sm:p-3 bg-cyber-dark border border-gray-700 rounded hover:border-cyber-primary hover:text-cyber-primary cursor-pointer transition-all">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                ))}
             </div>
          </div>
        </motion.div>

        {/* KOLOM KANAN: FORM */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-cyber-dark/50 backdrop-blur border border-cyber-primary/20 p-6 sm:p-8 rounded-xl shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            
            {/* --- JEBAKAN BOT (Hidden Input) --- */}
            {/* Manusia gak lihat ini, tapi bot biasanya otomatis ngisi semua input */}
            <input 
              type="text" 
              name="botField"
              value={formState.botField}
              onChange={handleChange}
              className="hidden" // Sembunyikan dari manusia
              autoComplete="off"
            />

            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-mono text-cyber-primary"> // NAME</label>
              <input 
                type="text" 
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full bg-black/40 border border-gray-700 rounded p-3 text-gray-200 focus:border-cyber-primary focus:outline-none transition-colors text-sm sm:text-base"
                placeholder="Enter your codename..."
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-mono text-cyber-primary"> // EMAIL</label>
              <input 
                type="email" 
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full bg-black/40 border border-gray-700 rounded p-3 text-gray-200 focus:border-cyber-primary focus:outline-none transition-colors text-sm sm:text-base"
                placeholder="email@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-mono text-cyber-primary"> // MESSAGE</label>
              <textarea 
                rows={4}
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                className="w-full bg-black/40 border border-gray-700 rounded p-3 text-gray-200 focus:border-cyber-primary focus:outline-none transition-colors text-sm sm:text-base"
                placeholder="Write your encrypted message here..."
              />
            </div>

            {/* Error Message Display */}
            {status === "error" && (
                <div className="p-3 bg-red-500/10 border border-red-500/50 rounded text-red-400 text-xs sm:text-sm font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errorMessage}
                </div>
            )}

            <button 
              type="submit" 
              disabled={status === "loading" || status === "success"}
              className={`w-full py-3 sm:py-4 font-bold rounded transition-all flex items-center justify-center gap-2 text-sm sm:text-base ${
                status === "success" 
                ? "bg-green-500/20 border border-green-500 text-green-500"
                : status === "error"
                ? "bg-red-500/20 border border-red-500 text-red-500"
                : "bg-cyber-primary/10 border border-cyber-primary text-cyber-primary hover:bg-cyber-primary hover:text-cyber-black"
              }`}
            >
              {status === "loading" ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Transmitting...</>
              ) : status === "success" ? (
                <><CheckCircle className="w-4 h-4" /> Message Sent!</>
              ) : status === "error" ? (
                "Failed. Try Again."
              ) : (
                <><Send className="w-4 h-4" /> Send Transmission</>
              )}
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  );
}