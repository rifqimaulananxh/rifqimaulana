import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/hero/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f2f2f2] text-black antialiased selection:bg-black selection:text-white">
      <Navbar />
      <Hero />
    </main>
  );
}
