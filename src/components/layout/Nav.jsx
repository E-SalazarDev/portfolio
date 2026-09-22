import { useActiveSection } from "../../hooks/useActiveSection";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { useState, useEffect, useRef, useMemo, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const LINKS = [
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "proyectos", label: "Proyectos" },
  { id: "experiencia", label: "Experiencia" },
  { id: "certificaciones", label: "Certificaciones" },
  { id: "stack", label: "Stack" },
  { id: "contacto", label: "Contacto" },
];

/**
 * Fondo estático del Nav — sin animaciones ni SVG pesados.
 * Memoizado: no depende de props/estado, así que no debe re-renderizarse
 * cada vez que el Nav padre lo hace (hover, scroll, etc.).
 */
const NavBackground = memo(function NavBackground() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, #070A12 0%, #0B0F1C 45%, #070A12 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 15% 50%, rgba(59,130,246,0.10) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 100% at 85% 50%, rgba(139,92,246,0.08) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(147,197,253,0.15) 50%, transparent 100%)",
        }}
      />
    </div>
  );
});

/**
 * Barra de progreso de scroll, aislada en su propio componente.
 * useScrollProgress() se actualiza en casi cada frame de scroll — si viviera
 * dentro de Nav(), forzaría un re-render de TODO el nav (links, indicador,
 * refs) en cada tick. Aislada aquí, solo esta franja de 2px se re-renderiza.
 */
function ScrollProgressBar() {
  const progress = useScrollProgress();
  return (
    <div className="relative h-[2px] overflow-hidden z-10">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)",
        }}
      />
      <div
        className="absolute top-0 left-0 h-full"
        style={{
          width: `${progress}%`,
          background:
            "linear-gradient(90deg, #3B82F6 0%, #93C5FD 50%, #3B82F6 100%)",
          boxShadow:
            "0 0 12px rgba(59,130,246,0.7), 0 0 4px rgba(147,197,253,0.9)",
        }}
      />
    </div>
  );
}

export default function Nav() {
  const active = useActiveSection(LINKS.map((l) => l.id));
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);
  const location = useLocation();

  const linkRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [hoveredStyle, setHoveredStyle] = useState({ left: 0, width: 0 });

  const isHome = location.pathname === "/";

  const routeActive = useMemo(() => {
    if (location.pathname.startsWith("/proyectos")) return "proyectos";
    return null;
  }, [location.pathname]);

  const activeSection = isHome ? active : routeActive;

  // Scroll listener con passive + rAF: no bloquea el hilo de scroll del
  // navegador y evita disparar setState más de una vez por frame.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!activeSection) return;
    const el = linkRefs.current[activeSection];
    if (!el) return;
    setIndicatorStyle({
      left: el.offsetLeft,
      width: el.offsetWidth,
    });
  }, [activeSection]);

  // Antes esto se leía inline en el JSX (linkRefs.current[hovered]?.offsetLeft)
  // en CADA render del componente. Ahora se calcula solo cuando cambia
  // `hovered`, y se guarda en estado — nada de lecturas de layout en render.
  useEffect(() => {
    if (!hovered) return;
    const el = linkRefs.current[hovered];
    if (!el) return;
    setHoveredStyle({
      left: el.offsetLeft,
      width: el.offsetWidth,
    });
  }, [hovered]);

  const handleNavClick = (e, id) => {
    if (isHome) {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`relative transition-all duration-500 overflow-hidden ${
          scrolled
            ? "border-b border-white/[0.06]"
            : "border-b border-transparent"
        }`}
        style={{
          background: scrolled ? "rgba(8,9,12,0.9)" : "rgba(8,9,12,0.7)",
          minHeight: "72px",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <NavBackground />

        <div className="relative max-w-[1400px] mx-auto flex items-center justify-between px-6 sm:px-8 lg:px-12 py-4">
          <Link to="/" className="group flex items-center gap-3 shrink-0">
            <span className="relative flex items-center justify-center shrink-0 w-11 h-11">
              <span
                aria-hidden
                className="absolute inset-0 rounded-full transition-all duration-500 group-hover:scale-110"
                style={{
                  background:
                    "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)",
                  filter: "blur(8px)",
                }}
              />
              <span
                aria-hidden
                className="absolute inset-0 rounded-full transition-transform duration-1000 group-hover:rotate-[360deg]"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0%, rgba(147,197,253,0.5) 20%, transparent 40%, rgba(59,130,246,0.5) 60%, transparent 80%, rgba(147,197,253,0.5) 100%)",
                }}
              />
              <span
                aria-hidden
                className="absolute inset-[2px] rounded-full"
                style={{ background: "#08090C" }}
              />
              <img
                src="/brand/logo.svg"
                alt="Eduardo Salazar"
                className="relative w-9 h-9 object-contain z-10 rounded-full transition-transform duration-500 group-hover:scale-105"
                style={{
                  boxShadow: "0 0 0 1px rgba(147,197,253,0.4)",
                }}
              />
              <span
                aria-hidden
                className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#08090C] z-20"
                style={{
                  background: "#34D399",
                  boxShadow: "0 0 6px rgba(52,211,153,0.9)",
                }}
              />
            </span>

            <span className="text-[15px] font-bold tracking-[-0.02em] text-[#F5F6F7] whitespace-nowrap">
              EDUARDO
              <span className="text-[#93C5FD]">.DEV</span>
            </span>
          </Link>

          <nav
            className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 px-2 py-2 rounded-full"
            onMouseLeave={() => setHovered(null)}
            style={{
              background: "rgba(14,18,25,0.75)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow:
                "0 8px 32px -12px rgba(0,0,0,0.8), inset 0 1px 0 0 rgba(255,255,255,0.06)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
          >
            {activeSection && (
              <motion.span
                aria-hidden
                className="absolute top-1 bottom-1 rounded-full pointer-events-none z-0"
                initial={false}
                animate={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 25,
                  mass: 1.2,
                }}
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(147,197,253,0.35) 0%, rgba(59,130,246,0.15) 40%, transparent 75%)",
                  filter: "blur(8px)",
                  willChange: "left, width",
                }}
              />
            )}

            {activeSection && (
              <motion.span
                aria-hidden
                className="absolute top-1.5 bottom-1.5 rounded-full pointer-events-none z-[1]"
                initial={false}
                animate={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 28,
                  mass: 1,
                }}
                style={{
                  background:
                    "linear-gradient(135deg, #F5F6F7 0%, #E8EBEF 60%, #DDE3EC 100%)",
                  boxShadow:
                    "0 4px 16px -4px rgba(245,246,247,0.5), 0 0 0 1px rgba(147,197,253,0.3), inset 0 1px 0 0 rgba(255,255,255,0.9)",
                  willChange: "left, width",
                }}
              >
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)",
                    opacity: 0.5,
                  }}
                />
              </motion.span>
            )}

            {hovered && hovered !== activeSection && (
              <motion.span
                aria-hidden
                className="absolute top-1.5 bottom-1.5 rounded-full pointer-events-none z-0"
                initial={false}
                animate={{
                  left: hoveredStyle.left,
                  width: hoveredStyle.width,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 28,
                  mass: 0.9,
                }}
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(147,197,253,0.25) 0%, rgba(59,130,246,0.1) 50%, transparent 80%)",
                  filter: "blur(6px)",
                  willChange: "left, width",
                }}
              />
            )}

            {LINKS.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <Link
                  key={link.id}
                  ref={(el) => (linkRefs.current[link.id] = el)}
                  to={`/#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  onMouseEnter={() => setHovered(link.id)}
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 z-10 ${
                    isActive
                      ? "text-[#08090C]"
                      : "text-[#C4CAD4] hover:text-[#F5F6F7]"
                  }`}
                  style={{
                    fontSize: "13.5px",
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: "-0.015em",
                    fontFeatureSettings: "'cv02', 'cv03', 'cv04', 'cv11'",
                  }}
                >
                  <span className="relative z-10 whitespace-nowrap">
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="/cv.pdf"
              className="hidden sm:inline-flex items-center justify-center h-10 px-5 text-[13.5px] font-semibold tracking-[-0.01em] text-[#F5F6F7] rounded-full bg-white/6 border border-white/12 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.1] hover:border-white/[0.2]"
            >
              CV
            </a>

            <Link
              to="/#contacto"
              onClick={(e) => handleNavClick(e, "contacto")}
              className="group relative inline-flex items-center justify-center h-10 px-5 rounded-full overflow-hidden bg-[#F5F6F7] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_10px_30px_-8px_rgba(147,197,253,0.5)]"
            >
              <span className="absolute inset-0 bg-linear-to-r from-[#3B82F6] to-[#93C5FD] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 text-[13.5px] font-semibold tracking-[-0.01em] text-[#08090C]">
                Contactar
              </span>
            </Link>
          </div>
        </div>

        <ScrollProgressBar />
      </div>
    </header>
  );
}