// NOTA: ajusta la ruta de GlobalScene si tu carpeta de escenas no es src/scene/.
// import GlobalScene from "./scene/GlobalScene";
// import GlobalScene from "./components/three/GlobalScene";
// import AmbientBackground from "./components/layout/AmbientBackground";
import Nav from "./components/layout/Nav";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Certifications from "./components/sections/Certifications";
import Stack from "./components/sections/Stack";
import Contact from "./components/sections/Contact";
import About from "./components/sections/About";
import { PALETTE } from "./theme/palette";
export default function App() {
  return (
    <div className="relative  min-h-screen" style={{ backgroundColor: PALETTE.ink }}>
    
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