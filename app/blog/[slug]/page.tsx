import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import MatrixRain from "@/components/animations/MatrixRain";
import Link from "next/link";
import { ArrowLeft, Calendar, Hash, Terminal, Clock, FolderOpen } from "lucide-react";

// UPDATE 1: params harus dibungkus Promise
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  // UPDATE 2: Kita harus await params sebelum mengambil isinya
  const { slug } = await params;

  // 1. Ambil data blog berdasarkan SLUG
  const post = await prisma.blog.findUnique({
    where: {
      slug: slug,
    },
  });

  // 2. Jika data tidak ditemukan, tampilkan halaman 404
  if (!post) {
    return notFound();
  }

  // Format tanggal biar rapi
  const formattedDate = new Date(post.createdAt).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Pecah tags dari string "Security, React" jadi array
  const tags = post.tags ? post.tags.split(",").map((t) => t.trim()) : [];

  return (
    <div className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <MatrixRain />

      {/* Container Artikel */}
      <article className="max-w-4xl mx-auto relative z-10">
        
        {/* Tombol Kembali */}
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-cyber-primary hover:text-white transition-colors font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            cd .. (Back to Logs)
          </Link>
        </div>

        {/* Header Artikel */}
        <header className="mb-10 space-y-6 border-b border-cyber-primary/20 pb-10">
          
          {/* Breadcrumb Terminal Style */}
          <div className="flex items-center gap-2 text-xs md:text-sm font-mono text-gray-500 bg-cyber-dark/50 w-fit px-3 py-1 rounded border border-gray-800">
            <Terminal className="w-3 h-3 text-cyber-primary" />
            <span>/var/log/thoughts/{post.slug}.txt</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-100 leading-tight">
            {post.title}
          </h1>

          {/* Metadata Bar */}
          <div className="flex flex-wrap gap-4 md:gap-8 text-sm font-mono text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyber-primary" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-cyber-primary" />
              <span className={post.category === "Islamic" ? "text-green-400" : "text-blue-400"}>
                {post.category}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyber-primary" />
              <span>Read Mode: TEXT</span>
            </div>
          </div>
        </header>

        {/* Isi Konten */}
        <div className="prose prose-invert prose-lg max-w-none">
          {/* whitespace-pre-wrap: Agar enter/paragraf dari database terbaca */}
          <div className="font-sans text-gray-300 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>

        {/* Footer / Tags */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-sm font-mono text-gray-500 mb-4">// Related_Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 text-xs font-mono rounded-full bg-cyber-primary/10 text-cyber-primary border border-cyber-primary/20"
              >
                <Hash className="w-3 h-3 inline mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>

      </article>
    </div>
  );
}