import MatrixRain from "@/components/animations/MatrixRain";
import CertificateList from "@/components/views/CertificateList"; // Import komponen baru tadi
import prisma from "@/lib/prisma"; // Import database

export default async function CertificatesPage() {
  // 1. Ambil data dari Database (Server Side)
  const certificates = await prisma.certificate.findMany({
    orderBy: {
      id: 'desc', // Urutkan dari data terakhir diinput
    },
  });

  return (
    <div className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <MatrixRain />
      
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 space-y-12">
        {/* Lempar data ke komponen Client */}
        <CertificateList certificates={certificates} />
      </div>
    </div>
  );
}