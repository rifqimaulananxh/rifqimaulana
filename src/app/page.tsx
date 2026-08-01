import { HomeProvider } from "@/context/HomeContext";
import { Loader } from "@/components/loader/Loader";
import { Hero } from "@/components/hero/Hero";
import { MovingText } from "@/components/hero/MovingText";
import { SelectedWork } from "@/components/work/SelectedWork";
import { Playground } from "@/components/work/Playground";
import { AboutMe } from "@/components/about/AboutMe";
import { Services } from "@/components/services/Services";
import { ExploreWork } from "@/components/work/ExploreWork";

export default function Home() {
  return (
    <HomeProvider>
      <Loader />
      <main>
        <Hero />
        <MovingText />
        <div className="blank-section-gap" />
        <div className="work-scroll-section">
          <SelectedWork />
        </div>
        <Playground />
        <ExploreWork />
        <AboutMe />
        <Services />
        <div className="blank-section-gap" />
      </main>
    </HomeProvider>
  );
}
