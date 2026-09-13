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

/**
 * ScrollToHash
 * - Si la URL tiene hash (#seccion), hace scroll suave a ese id cuando cambia la ruta.
 * - Si no hay hash, sube al top de la página.
 * - Esto es lo que permite que "Volver a proyectos" o los links del Nav
 *   funcionen desde /proyectos/:id hacia /#proyectos, /#contacto, etc.
 */
function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      // Esperamos un tick para que el DOM de la nueva ruta esté montado
      const timeout = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      // Sin hash → al top
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
            <Route path="/proyectos" element={<ProjectCatalog />} />
            <Route path="/proyectos/:projectId" element={<ProjectPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}