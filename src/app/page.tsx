import { HomeProvider } from "@/context/HomeContext";
import { Hero } from "@/components/hero/Hero";
import { SelectedWork } from "@/components/work/SelectedWork";
import { Playground } from "@/components/work/Playground";
import { AboutMe } from "@/components/about/AboutMe";
import { Services } from "@/components/services/Services";

export default function Home() {
  return (
    <HomeProvider>
      <main>
        <Hero />
        <div className="work-scroll-section">
          <SelectedWork />
        </div>
        <Playground limit={3} />
        <AboutMe />
        <Services />
      </main>
    </HomeProvider>
  );
}
