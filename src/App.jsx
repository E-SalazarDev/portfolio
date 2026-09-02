import AmbientBackground from "./components/layout/AmbientBackground";
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
    <div className="relative bg-ink min-h-screen">
      <AmbientBackground />
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