// File: app/page.tsx
import MatrixRain from "@/components/animations/MatrixRain";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Background (Fixed) */}
      <MatrixRain />
      
      {/* Konten Utama */}
      <Hero />
      
      {/* Space ini opsional, boleh dihapus kalau tidak butuh scroll kosong */}
      {/* <div className="h-screen"></div>  */}
    </main>
  );
}