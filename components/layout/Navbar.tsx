"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Terminal, ChevronDown, Award, FolderGit2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "// home", href: "/" },
  { 
    name: "// My World", 
    href: "#", 
    children: [
      { name: "Certificates", href: "/certificates", icon: Award },
      { name: "Projects", href: "/projects", icon: FolderGit2 },
    ]
  },
  { name: "// blog", href: "/blog" },
  { name: "// contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-cyber-primary/20 bg-cyber-black/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="p-1 bg-cyber-primary/10 rounded border border-cyber-primary/50 group-hover:bg-cyber-primary/20 transition-colors">
              <Terminal className="w-5 h-5 text-cyber-primary" />
            </div>
            <span className="font-mono font-bold text-lg tracking-tight text-gray-100 group-hover:text-cyber-primary transition-colors">
              ~/sleeper-code
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:block">
            {/* Menggunakan gap-8 dan items-center agar sejajar presisi */}
            <div className="ml-10 flex items-center gap-8">
              {navItems.map((item) => (
                <div 
                  key={item.name} 
                  className="relative group h-full flex items-center"
                  onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                  onMouseLeave={() => item.children && setActiveDropdown(null)}
                >
                  {item.children ? (
                    // MENU DENGAN DROPDOWN
                    <button className={`flex items-center gap-1.5 font-mono text-sm transition-all duration-300 focus:outline-none ${
                       // Highlight jika sedang berada di salah satu halaman anaknya
                       pathname.startsWith('/certificates') || pathname.startsWith('/projects')
                       ? "text-cyber-primary"
                       : "text-gray-400 hover:text-cyber-primary"
                    }`}>
                      {item.name}
                      <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === item.name ? "rotate-180" : ""}`} />
                    </button>
                  ) : (
                    // MENU BIASA
                    <Link
                      href={item.href}
                      className={`font-mono text-sm transition-all duration-300 relative py-1 ${
                        pathname === item.href 
                        ? "text-cyber-primary" 
                        : "text-gray-400 hover:text-cyber-primary"
                      }`}
                    >
                      {item.name}
                      {/* Garis bawah glow saat aktif */}
                      {pathname === item.href && (
                        <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-cyber-primary shadow-[0_0_8px_#0ea5e9]"></span>
                      )}
                    </Link>
                  )}

                  {/* DROPDOWN CONTENT (DESKTOP) */}
                  {item.children && (
                    <div className={`absolute left-0 top-full mt-2 w-48 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] bg-cyber-dark border border-cyber-primary/20 overflow-hidden transition-all duration-200 origin-top-left ${
                      activeDropdown === item.name 
                      ? "opacity-100 scale-100 translate-y-0 visible" 
                      : "opacity-0 scale-95 -translate-y-2 invisible"
                    }`}>
                      <div className="py-2 bg-cyber-black/95 backdrop-blur-xl">
                        {item.children.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-mono transition-colors ${
                              pathname === subItem.href 
                              ? "text-cyber-primary bg-cyber-primary/10" 
                              : "text-gray-300 hover:bg-cyber-primary/5 hover:text-cyber-primary"
                            }`}
                          >
                            <subItem.icon className="w-4 h-4 opacity-70" />
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-cyber-primary/10 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-cyber-primary/20 bg-cyber-black/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    // MOBILE DROPDOWN GROUP
                    <div className="space-y-2 pt-2">
                      <div className="text-sm font-mono font-bold text-gray-500 uppercase tracking-wider px-2">
                        {item.name}
                      </div>
                      <div className="space-y-1">
                        {item.children.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-mono border border-transparent transition-all ${
                                pathname === subItem.href
                                ? "bg-cyber-primary/10 text-cyber-primary border-cyber-primary/20"
                                : "text-gray-300 hover:bg-cyber-primary/5 hover:text-cyber-primary"
                            }`}
                          >
                            <subItem.icon className="w-4 h-4" />
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // MOBILE NORMAL LINK
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-3 rounded-lg text-base font-mono font-medium border border-transparent transition-all ${
                         pathname === item.href
                         ? "bg-cyber-primary/10 text-cyber-primary border-cyber-primary/20"
                         : "text-gray-300 hover:bg-cyber-primary/5 hover:text-cyber-primary"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}