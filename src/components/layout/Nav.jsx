import { useActiveSection } from "../../hooks/useActiveSection";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { useState, useEffect } from "react";

const LINKS = [
  { id: "proyectos", label: "Proyectos" },
  { id: "experiencia", label: "Experiencia" },
  { id: "certificaciones", label: "Certificaciones" },
  { id: "stack", label: "Stack" },
  { id: "contacto", label: "Contacto" },
];

export default function Nav() {
  const active = useActiveSection(LINKS.map((l) => l.id));
  const progress = useScrollProgress();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink/70 backdrop-blur-xl border-b border-white/6 shadow-[0_1px_0_0_rgba(255,255,255,0.04)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-10 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5 font-display font-semibold text-sm tracking-wide text-paper">
          <span className="relative flex items-center justify-center w-6 h-6">
            <span className="absolute w-2 h-2 rounded-[3px] bg-accent rotate-45 shadow-[0_0_12px_2px] shadow-accent/60" />
          </span>
          <span>
            EDUARDO<span className="text-accent-light">.DEV</span>
          </span>
        </div>

        {/* Links centrados, en cápsula translúcida */}
        <nav className="hidden md:flex items-center gap-0.5 text-[13px] p-1 rounded-full border border-white/6 bg-white/3">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`relative px-4 py-1.5 rounded-full font-medium transition-all duration-200 ${
                active === link.id
                  ? "text-ink bg-paper shadow-sm"
                  : "text-muted hover:text-paper"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          <a
            href="/cv.pdf"
            className="hidden sm:inline-flex items-center gap-1.5 font-body text-xs font-medium text-muted hover:text-paper rounded-full px-4 py-2.5 transition-colors"
          >
            CV
          </a>
          <a
            href="#contacto"
            className="group relative font-body text-xs font-semibold text-ink bg-linear-to-r from-paper to-white rounded-full px-5 py-2.5 overflow-hidden transition-transform hover:scale-[1.03]"
          >
            <span className="relative z-10 group-hover:opacity-0 transition-opacity">
              Contactar
            </span>
            <span className="absolute inset-0 bg-linear-to-r from-accent-light to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute inset-0 flex items-center justify-center text-ink opacity-0 group-hover:opacity-100 transition-opacity z-10">
              Contactar
            </span>
          </a>
        </div>
      </div>

      {/* barra de progreso de scroll */}
      <div className="h-px bg-white/4 relative">
        <div
          className="absolute top-0 left-0 h-px bg-linear-to-r from-accent to-accent-light transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}