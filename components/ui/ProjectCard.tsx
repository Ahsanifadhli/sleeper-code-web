"use client";
import { motion } from "framer-motion";
import { Github, ExternalLink, Code2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  demoLink?: string;
  repoLink?: string;
  index: number;
}

export default function ProjectCard({ title, description, tags, image, demoLink, repoLink, index }: ProjectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-cyber-dark/50 border border-cyber-primary/20 rounded-xl overflow-hidden hover:border-cyber-primary/80 transition-all duration-300 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)]"
    >
      {/* Gambar Project (Placeholder Pattern kalau tidak ada gambar) */}
      <div className="h-48 w-full bg-cyber-black/50 relative overflow-hidden border-b border-cyber-primary/10">
        {image ? (
          <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
             <Code2 className="w-16 h-16 text-cyber-primary" />
          </div>
        )}
        
        {/* Overlay saat hover */}
        <div className="absolute inset-0 bg-cyber-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
          {repoLink && (
            <Link href={repoLink} target="_blank" className="p-2 bg-cyber-black border border-cyber-primary text-cyber-primary rounded-full hover:bg-cyber-primary hover:text-cyber-black transition-colors">
              <Github className="w-5 h-5" />
            </Link>
          )}
          {demoLink && (
            <Link href={demoLink} target="_blank" className="p-2 bg-cyber-black border border-cyber-primary text-cyber-primary rounded-full hover:bg-cyber-primary hover:text-cyber-black transition-colors">
              <ExternalLink className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>

      {/* Konten Text */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold font-mono text-gray-100 group-hover:text-cyber-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-3">
          {description}
        </p>
        
        {/* Tags / Tech Stack */}
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag, i) => (
            <span key={i} className="px-2 py-1 text-xs font-mono rounded bg-cyber-primary/10 text-cyber-primary border border-cyber-primary/20">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}