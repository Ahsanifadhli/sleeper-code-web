import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { password } = body;

    // --- CCTV DEBUGGING (HAPUS NANTI KALAU SUDAH BISA) ---
    console.log("========================================");
    console.log("1. Password yang kamu ketik:", `"${password}"`); // Pakai kutip biar spasi kelihatan
    console.log("2. Password di Server (.env):", `"${process.env.ADMIN_SECRET}"`);
    console.log("3. Apakah undefined?", process.env.ADMIN_SECRET === undefined);
    console.log("4. Apakah sama persis?", password === process.env.ADMIN_SECRET);
    console.log("========================================");
    // -----------------------------------------------------

    if (password === process.env.ADMIN_SECRET) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Salah woi" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error Auth:", error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}