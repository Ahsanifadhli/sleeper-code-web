"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Clock, ChevronRight, Hash, BookOpen, Code2, Filter } from "lucide-react";
import Link from "next/link";

// Tipe Data yang diterima dari Server
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  category: string;
  slug: string;
}

export default function BlogList({ blogs }: { blogs: BlogPost[] }) {
  const [activeFilter, setActiveFilter] = useState<"All" | "Coding" | "Islamic">("All");

  const filteredBlogs = activeFilter === "All" 
    ? blogs 
    : blogs.filter(post => post.category === activeFilter);

  return (
    <div className="max-w-4xl mx-auto space-y-12 relative z-10">
      {/* HEADER & FILTER */}
      <div className="space-y-6 sm:space-y-8 text-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-primary/30 bg-cyber-primary/5 text-cyber-primary text-xs sm:text-sm font-mono">
            <Terminal className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>/var/log/thoughts</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100">
            Digital <span className="text-cyber-primary">Logs</span>
          </h1>
        </div>

        {/* FILTER BUTTONS */}
        <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
          {[
            { label: "All", value: "All", icon: Filter },
            { label: "Coding", value: "Coding", icon: Code2 },
            { label: "Islamic", value: "Islamic", icon: BookOpen },
          ].map((btn) => (
            <button
              key={btn.value}
              onClick={() => setActiveFilter(btn.value as any)}
              className={`flex items-center gap-2 px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-mono border transition-all duration-300 ${
                activeFilter === btn.value
                  ? "bg-cyber-primary text-cyber-black border-cyber-primary font-bold shadow-[0_0_15px_rgba(14,165,233,0.4)]"
                  : "bg-cyber-dark/40 text-gray-400 border-gray-700 hover:border-cyber-primary hover:text-white"
              }`}
            >
              <btn.icon className="w-3 h-3 sm:w-4 sm:h-4" />
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* LIST BLOG */}
      <motion.div layout className="space-y-4 sm:space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredBlogs.length === 0 && (
             <div className="text-center py-20 opacity-50">
                <p className="font-mono text-gray-400">// No logs found in this sector.</p>
             </div>
          )}

          {filteredBlogs.map((post) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/blog/${post.slug}`} className="block group">
                <article className="relative bg-cyber-dark/40 border-l-2 border-gray-700 p-4 sm:p-6 hover:border-cyber-primary hover:bg-cyber-dark/60 transition-all duration-300 rounded-r-xl overflow-hidden">
                  
                  {/* Background Glow */}
                  <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] -z-10 rounded-full opacity-0 group-hover:opacity-20 transition-opacity ${
                    post.category === "Islamic" ? "bg-green-500" : "bg-cyber-primary"
                  }`}></div>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3 text-[10px] sm:text-xs font-mono text-gray-500">
                      <span className={`flex items-center gap-1 px-2 py-1 rounded ${
                        post.category === "Islamic" 
                          ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                          : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      }`}>
                        {post.category === "Islamic" ? <BookOpen className="w-3 h-3"/> : <Code2 className="w-3 h-3"/>}
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-cyber-primary">
                        <Clock className="w-3 h-3" /> 
                        {new Date(post.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  {/* Judul & Isi */}
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-200 mb-2 group-hover:text-cyber-neon transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 leading-relaxed mb-4 text-xs sm:text-sm md:text-base line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800/50">
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                      {post.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] sm:text-xs font-mono text-gray-500 flex items-center gap-1 hover:text-white transition-colors whitespace-nowrap">
                          <Hash className="w-3 h-3" />{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-cyber-primary text-xs sm:text-sm font-mono opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0 pl-2">
                      Read <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}