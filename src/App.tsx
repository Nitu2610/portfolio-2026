import { useState } from "react";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Experience } from "./sections/Experience";
import { Footer } from "./sections/Footer";
import { Hero } from "./sections/Hero";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { IntroPageLoader } from "./components/IntroPageLoader";

function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <IntroPageLoader onFinish={() => setIntroDone(true)} />}

      {introDone && (
        <div className="relative gradient text-white">
          <CustomCursor />

          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
