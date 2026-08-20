import Nav from "./components/layout/Nav";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Certifications from "./components/sections/Certifications";
import Stack from "./components/sections/Stack";
import Contact from "./components/sections/Contact";

export default function App() {
  return (
    <div className="bg-ink min-h-screen">
      <Nav />
      <Hero />
      <Projects />
      <Experience />
      <Certifications />
      <Stack />
      <Contact />
    </div>
  );
}
