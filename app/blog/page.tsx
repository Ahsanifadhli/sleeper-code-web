import MatrixRain from "@/components/animations/MatrixRain";
import BlogList from "@/components/views/BlogList"; // Import komponen client
import prisma from "@/lib/prisma";

export default async function BlogPage() {
  // 1. Ambil data dari Database
  const rawBlogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: 'desc', // Artikel terbaru di atas
    },
  });

  // 2. Format Data (Terutama Tags dan Tanggal)
  const formattedBlogs = rawBlogs.map((blog) => ({
    ...blog,
    // Mengubah tanggal Date object jadi String ISO biar aman dikirim ke Client Component
    date: blog.createdAt.toISOString(), 
    // Mengubah string "Security, Database" menjadi array ["Security", "Database"]
    tags: blog.tags ? blog.tags.split(',').map(tag => tag.trim()) : [],
  }));

  return (
    <div className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <MatrixRain />
      
      {/* Lempar data yang sudah diformat ke Client Component */}
      <BlogList blogs={formattedBlogs} />
    </div>
  );
}