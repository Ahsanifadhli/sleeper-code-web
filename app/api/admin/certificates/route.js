import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// GET
export async function GET() {
  try {
    const certs = await prisma.certificate.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(certs);
  } catch (error) {
    return NextResponse.json({ error: "Gagal ambil sertifikat" }, { status: 500 });
  }
}

// POST
export async function POST(request) {
  try {
    const body = await request.json();
    const { secret, title, issuer, date, category, credentialLink } = body;

    if (secret !== process.env.ADMIN_SECRET) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const newCert = await prisma.certificate.create({
      data: { title, issuer, date, category, credentialLink },
    });

    return NextResponse.json(newCert);
  } catch (error) {
    return NextResponse.json({ error: "Gagal simpan sertifikat: " + error.message }, { status: 500 });
  }
}

// DELETE
export async function DELETE(request) {
  try {
    const body = await request.json();
    if (body.secret !== process.env.ADMIN_SECRET) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await prisma.certificate.delete({ where: { id: Number(body.id) } });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal hapus sertifikat" }, { status: 500 });
  }
}