import ProjectCard from "@/components/ui/ProjectCard";
import MatrixRain from "@/components/animations/MatrixRain";
import { PrismaClient } from "@prisma/client";

// --- 1. Fix TypeScript Error ---
const prisma = (global as any).prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") {
  (global as any).prisma = prisma;
}

// --- 2. Fix Vercel Cache (WAJIB ADA) ---
export const dynamic = "force-dynamic"; 

export default async function ProjectsPage() {
  // 3. Ambil data Project Terbaru
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="relative min-h-screen py-20 px-0"> {/* Hapus padding bawaan */}
      <MatrixRain />
      
      {/* WRAPPER STANDAR BARU (UI SESUAI REQUEST) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 space-y-8 sm:space-y-12">
        
        {/* Header Section */}
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-neon leading-tight">
            // My_Projects
          </h1>
          <p className="text-gray-400 max-w-2xl text-sm sm:text-base md:text-lg">
            Kumpulan eksperimen kode, website profesional, dan sistem keamanan yang tersimpan di database. <span className="text-cyber-primary animate-pulse">_</span>
          </p>
        </div>

        {/* Grid Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project: any, index: number) => (
            <ProjectCard
              key={project.id}
              index={index}
              title={project.title}
              description={project.description}
              // Amanin split tags biar gak error kalau kosong
              tags={project.techStack ? project.techStack.split(',').map((tag: string) => tag.trim()) : []} 
              image={project.image || undefined}
              demoLink={project.demoLink || "#"}
              repoLink={project.repoLink || "#"}
            />
          ))}

          {projects.length === 0 && (
             <p className="text-gray-500 font-mono text-sm">Belum ada data project di database.</p>
          )}
        </div>
      </div>
    </div>
  );
}