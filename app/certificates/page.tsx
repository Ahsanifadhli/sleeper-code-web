import MatrixRain from "@/components/animations/MatrixRain";
// Pastikan path ini mengarah ke file CertificateList yang kamu kirim tadi
import CertificateList from "@/components/views/CertificateList"; 
import { PrismaClient } from "@prisma/client";

// --- 1. Fix TypeScript Error ---
const prisma = (global as any).prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") {
  (global as any).prisma = prisma;
}

// --- 2. Fix Vercel Cache (WAJIB ADA) ---
export const dynamic = "force-dynamic"; 

export default async function CertificatesPage() {
  // 3. Ambil data Sertifikat Terbaru
  const rawCertificates = await prisma.certificate.findMany({
    orderBy: {
      date: 'desc', 
    },
  });

  // 4. Format Data (Date object -> String)
  const formattedCertificates = rawCertificates.map((cert: any) => ({
    ...cert,
    description: cert.description || "", 
  }));

  return (
    <div className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <MatrixRain />
      
      {/* Wrapper agar rapi seperti halaman lain */}
      <div className="max-w-6xl mx-auto relative z-10">
        <CertificateList certificates={formattedCertificates} />
      </div>
    </div>
  );
}