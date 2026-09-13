import { useState, useEffect } from "react";

export function useActiveSection(ids) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // 1. Si estamos en la portada (arriba del todo), no marcamos nada
      //    Calculamos si estamos dentro del Hero
      const hero = document.getElementById("inicio");
      if (hero) {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        // Si el scroll todavía no pasó del Hero, no marcamos nada
        if (scrollY < heroBottom - viewportHeight * 0.4) {
          setActive(null);
          return;
        }
      }

      // 2. Punto de referencia: el centro del viewport
      const referencePoint = scrollY + viewportHeight * 0.4;

      // 3. Encontrar la sección activa (la que contiene el punto de referencia)
      let currentSection = null;

      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;

        const sectionTop = element.offsetTop;
        const sectionBottom = sectionTop + element.offsetHeight;

        if (referencePoint >= sectionTop && referencePoint < sectionBottom) {
          currentSection = id;
          break;
        }
      }

      setActive(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ids]);

  return active;
}