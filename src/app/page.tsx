import { Hero } from "@/components/hero/Hero";
import { Manifesto } from "@/components/hero/Manifesto";
import { StackSection } from "@/components/hero/StackSection";
import { SelectedWork } from "@/components/work/SelectedWork";
import { Playground } from "@/components/work/Playground";
import { AboutMe } from "@/components/about/AboutMe";
import { Services } from "@/components/services/Services";

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <SelectedWork />
      <StackSection />
      <Playground limit={3} />
      <AboutMe />
      <Services />
    </main>
  );
}
