import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Gunakan global prisma client agar tidak error "Too many connections" saat development
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// 1. GET: AMBIL DATA
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("DATABASE ERROR (GET):", error); // Cek Terminal VS Code jika data kosong
    return NextResponse.json({ error: "Gagal mengambil data database" }, { status: 500 });
  }
}

// 2. POST: UPLOAD DATA
export async function POST(request) {
  try {
    const body = await request.json();
    const { secret, title, description, techStack, repoLink, demoLink } = body;

    // Cek Password lagi (Double Security)
    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized: Password Salah" }, { status: 401 });
    }

    // Cek Koneksi Database sebelum simpan
    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        techStack,
        repoLink,
        demoLink,
        // Pastikan di schema.prisma kamu tidak ada kolom 'image' yang wajib diisi (required)
        // Jika ada, harus diisi atau diubah jadi optional (?) di schema.prisma
      },
    });

    return NextResponse.json(newProject);
  } catch (error) {
    console.error("DATABASE ERROR (POST):", error); // <--- LIHAT INI DI TERMINAL
    return NextResponse.json({ error: "Gagal menyimpan ke Database: " + error.message }, { status: 500 });
  }
}

// 3. DELETE: HAPUS DATA
export async function DELETE(request) {
  try {
    const body = await request.json();
    const { secret, id } = body;

    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.project.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    console.error("DATABASE ERROR (DELETE):", error);
    return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 });
  }
}