import MatrixRain from "@/components/animations/MatrixRain";
import BlogList from "@/components/views/BlogList"; 
import { PrismaClient } from "@prisma/client";

// 1. Fix TypeScript Error: Pakai (global as any)
const prisma = (global as any).prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  (global as any).prisma = prisma;
}

// 2. Fix Vercel Cache: Wajib ada biar data selalu update
export const dynamic = "force-dynamic"; 

export default async function BlogPage() {
  // 3. Ambil data dari Database
  const rawBlogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: 'desc', 
    },
  });

  // 4. Format Data agar sesuai dengan Interface di BlogList
  const formattedBlogs = rawBlogs.map((blog: any) => ({
    ...blog,
    // Ubah format tanggal ke String ISO
    date: blog.createdAt.toISOString(), 
    // Ubah string tags "React, JS" menjadi array ["React", "JS"]
    tags: blog.tags ? blog.tags.split(',').map((tag: string) => tag.trim()) : [],
  }));

  return (
    <div className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Matrix Rain */}
      <MatrixRain />
      
      {/* Panggil Tampilan Keren (List Style) */}
      <BlogList blogs={formattedBlogs} />
    </div>
  );
}