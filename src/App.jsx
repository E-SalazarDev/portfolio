import Nav from "./components/layout/Nav";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Certifications from "./components/sections/Certifications";
import Stack from "./components/sections/Stack";
import Contact from "./components/sections/Contact";
import About from "./components/sections/About";

export default function App() {
  return (
    <div
      className="relative min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 50% -10%, #101A33 0%, #0A0F1C 35%, #080B14 70%, #06080F 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative z-10">
        <Nav />
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Certifications />
        <Stack />
        <Contact />
      </div>
    </div>
  );
}