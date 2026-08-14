import { Hero } from "@/components/hero/Hero";
import { Manifesto } from "@/components/hero/Manifesto";
import { ClientsMarquee } from "@/components/hero/ClientsMarquee";
import { ArtLab } from "@/components/hero/ArtLab";
import { StackSection } from "@/components/hero/StackSection";
import { SelectedWork } from "@/components/work/SelectedWork";
import { Playground } from "@/components/work/Playground";
import { AboutMe } from "@/components/about/AboutMe";
import { Services } from "@/components/services/Services";
import { ContactHome } from "@/components/contact/ContactHome";

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <SelectedWork />
      <ClientsMarquee />
      <ArtLab />
      <StackSection />
      <Playground limit={3} />
      <AboutMe />
      <Services />
      <ContactHome />
    </main>
  );
}
