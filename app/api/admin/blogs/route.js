import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// GET: AMBIL BLOG
export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: "Gagal ambil blog" }, { status: 500 });
  }
}

// POST: TAMBAH BLOG
export async function POST(request) {
  try {
    const body = await request.json();
    const { secret, title, slug, excerpt, content, category, tags } = body;

    if (secret !== process.env.ADMIN_SECRET) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const newBlog = await prisma.blog.create({
      data: { title, slug, excerpt, content, category, tags },
    });

    return NextResponse.json(newBlog);
  } catch (error) {
    return NextResponse.json({ error: "Gagal simpan blog: " + error.message }, { status: 500 });
  }
}

// DELETE: HAPUS BLOG
export async function DELETE(request) {
  try {
    const body = await request.json();
    if (body.secret !== process.env.ADMIN_SECRET) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await prisma.blog.delete({ where: { id: Number(body.id) } });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal hapus blog" }, { status: 500 });
  }
}