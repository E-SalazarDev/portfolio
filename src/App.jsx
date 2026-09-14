import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/layout/Nav";
import Hero from "./components/sections/Hero";
import Experience from "./components/sections/Experience";
import Certifications from "./components/sections/Certifications";
import Stack from "./components/sections/Stack";
import Contact from "./components/sections/Contact";
import About from "./components/sections/About";
import ProjectCatalog from "./pages/ProjectCatalog";
import ProjectPage from "./pages/ProjectPage";


function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      
      const timeout = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 80);
      return () => clearTimeout(timeout);
    } else {
   
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hash, pathname]);

  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ProjectCatalog />
      <Experience />
      <Certifications />
      <Stack />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
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
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/proyectos" element={<ProjectCatalog />} /> */}
            <Route path="/proyectos/:projectId" element={<ProjectPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}