import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import SignatureDishes from "@/components/home/SignatureDishes";
import Cta from "@/components/home/Cta";

export default function Home() {
  return (
    <main className="min-h-screen bg-rexos-primary">
      <Hero />
      <About />
      <SignatureDishes />
      <Cta />
    </main>
  );
}