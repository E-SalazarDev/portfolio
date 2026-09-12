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
    <header className="sticky top-0 z-50">
      <div
        className={`relative transition-all duration-500 ${
          scrolled
            ? "bg-[#08090C]/70 backdrop-blur-2xl border-b border-white/[0.06]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 sm:px-8 lg:px-12 py-4">
          {/* LOGO + BRANDING */}
          <a href="#inicio" className="group flex items-center gap-3 shrink-0">
            {/* Contenedor del logo */}
            <span className="relative flex items-center justify-center shrink-0 w-11 h-11">
              {/* Halo exterior suave */}
              <span
                aria-hidden
                className="absolute inset-0 rounded-full transition-all duration-500 group-hover:scale-110"
                style={{
                  background:
                    "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)",
                  filter: "blur(8px)",
                }}
              />

              {/* Anillo giratorio al hover */}
              <span
                aria-hidden
                className="absolute inset-0 rounded-full transition-transform duration-1000 group-hover:rotate-[360deg]"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0%, rgba(147,197,253,0.5) 20%, transparent 40%, rgba(59,130,246,0.5) 60%, transparent 80%, rgba(147,197,253,0.5) 100%)",
                }}
              />

              {/* Disco interior oscuro */}
              <span
                aria-hidden
                className="absolute inset-[2px] rounded-full"
                style={{ background: "#08090C" }}
              />

              {/* Logo */}
              <img
                src="/brand/logo.svg"
                alt="Eduardo Salazar"
                className="relative w-9 h-9 object-contain z-10 rounded-full transition-transform duration-500 group-hover:scale-105"
                style={{
                  boxShadow: "0 0 0 1px rgba(147,197,253,0.4)",
                }}
              />

              {/* Punto verde online */}
              <span
                aria-hidden
                className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#08090C] z-20"
                style={{
                  background: "#34D399",
                  boxShadow: "0 0 6px rgba(52,211,153,0.9)",
                }}
              />
            </span>

            {/* Texto */}
            <span className="text-[15px] font-bold tracking-[-0.02em] text-[#F5F6F7] whitespace-nowrap">
              EDUARDO
              <span className="text-[#93C5FD]">.DEV</span>
            </span>
          </a>

          {/* NAV CENTRAL */}
          <nav className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 px-1.5 py-1.5 rounded-full bg-white/3 border border-white/6 backdrop-blur-md">
            {LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`relative px-4 py-2 text-[13.5px] font-medium tracking-[-0.01em] rounded-full transition-colors duration-200 ${
                    isActive
                      ? "text-[#08090C]"
                      : "text-[#8B93A1] hover:text-[#F5F6F7]"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-[#F5F6F7] shadow-[0_2px_12px_-2px_rgba(245,246,247,0.4)]" />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* ACCIONES DERECHA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="/cv.pdf"
              className="hidden sm:inline-flex items-center justify-center h-10 px-5 text-[13.5px] font-semibold tracking-[-0.01em] text-[#F5F6F7] rounded-full bg-white/6 border border-white/12 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.1] hover:border-white/[0.2]"
            >
              CV
            </a>

            <a
              href="#contacto"
              className="group relative inline-flex items-center justify-center h-10 px-5 rounded-full overflow-hidden bg-[#F5F6F7] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_10px_30px_-8px_rgba(147,197,253,0.5)]"
            >
              <span className="absolute inset-0 bg-linear-to-r from-[#3B82F6] to-[#93C5FD] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 text-[13.5px] font-semibold tracking-[-0.01em] text-[#08090C]">
                Contactar
              </span>
            </a>
          </div>
        </div>

        {/* BARRA DE PROGRESO */}
        <div className="relative h-px bg-white/4 overflow-hidden">
          <div
            className="absolute top-0 left-0 h-px bg-linear-to-r from-[#3B82F6] via-[#93C5FD] to-[#3B82F6] transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </header>
  );
}