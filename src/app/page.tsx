import { HomeProvider } from "@/context/HomeContext";
import { Loader } from "@/components/loader/Loader";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/hero/Hero";
import { SelectedWork } from "@/components/work/SelectedWork";
import { Playground } from "@/components/work/Playground";
import { AboutMe } from "@/components/about/AboutMe";
import { Services } from "@/components/services/Services";
import { ExploreWork } from "@/components/work/ExploreWork";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <HomeProvider>
      <Loader />
      <Navbar />
      <main>
        <Hero />
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
      <Footer />
    </HomeProvider>
  );
}
