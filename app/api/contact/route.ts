import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Penyimpanan sementara untuk mencatat IP (In-Memory Store)
// Di production yang serius biasanya pakai Redis, tapi ini cukup untuk portofolio.
const rateLimitMap = new Map<string, number>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, botField } = body; // botField adalah jebakan

    // --- SECURITY 1: HONEYPOT (Jebakan Bot) ---
    // Jika 'botField' terisi, berarti yang ngisi bukan manusia (karena field ini hidden)
    if (botField) {
      console.warn("Bot detected!");
      return NextResponse.json({ success: false }, { status: 400 });
    }

    // --- SECURITY 2: RATE LIMITING (Batasan Waktu) ---
    // Ambil IP Address pengirim
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    
    // Cek kapan terakhir kali IP ini kirim pesan
    const lastRequestTime = rateLimitMap.get(ip);
    const now = Date.now();
    const cooldown = 60 * 1000; // 60 detik (1 menit)

    if (lastRequestTime && now - lastRequestTime < cooldown) {
      const sisaWaktu = Math.ceil((cooldown - (now - lastRequestTime)) / 1000);
      return NextResponse.json(
        { error: `Terlalu cepat! Tunggu ${sisaWaktu} detik lagi.` },
        { status: 429 } // 429 = Too Many Requests
      );
    }

    // Update waktu terakhir request IP ini
    rateLimitMap.set(ip, now);

    // --- VALIDASI NORMAL ---
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Semua field harus diisi!" },
        { status: 400 }
      );
    }

    // --- SIMPAN KE DATABASE ---
    const savedMessage = await prisma.message.create({
      data: {
        name,
        email,
        message,
      },
    });

    return NextResponse.json({ success: true, data: savedMessage });

  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json(
      { error: "Gagal mengirim pesan." },
      { status: 500 }
    );
  }
}