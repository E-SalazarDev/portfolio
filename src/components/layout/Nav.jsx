import { useActiveSection } from "../../hooks/useActiveSection";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { useState, useEffect, useRef, useMemo } from "react";
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

function smoothClosedPath(pts) {
  const n = pts.length;
  let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)} `;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += `C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} `;
  }
  return d + "Z";
}

function organicBlobPath(cx, cy, r, points = 6, irregularity = 0.4) {
  const step = (Math.PI * 2) / points;
  const pts = [];
  for (let i = 0; i < points; i++) {
    const angle = i * step;
    const radius = r * (1 + (Math.random() - 0.5) * irregularity);
    pts.push({
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius * 0.7,
    });
  }
  return smoothClosedPath(pts);
}

function makeMorphFrames(cx, cy, r, frames = 5, points = 6, irregularity = 0.42) {
  const shapes = [];
  for (let i = 0; i < frames; i++) shapes.push(organicBlobPath(cx, cy, r, points, irregularity));
  shapes.push(shapes[0]);
  return shapes;
}

function LiquidDrop({ cx, cy, r, morphDuration, driftDuration, driftRx, driftRy, direction, delay, seed, color1, color2 }) {
  const shapes = useMemo(() => makeMorphFrames(cx, cy, r, 5, 6, 0.42), [cx, cy, r, seed]);

  const drift = useMemo(() => {
    const steps = 8;
    const xs = [];
    const ys = [];
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * Math.PI * 2 * direction;
      xs.push(Math.cos(angle) * driftRx);
      ys.push(Math.sin(angle) * driftRy);
    }
    return { xs, ys };
  }, [driftRx, driftRy, direction]);

  return (
    <motion.g
      animate={{ x: drift.xs, y: drift.ys }}
      transition={{ duration: driftDuration, repeat: Infinity, ease: "linear", delay }}
    >
      <motion.path
        d={shapes[0]}
        animate={{ d: shapes }}
        transition={{ duration: morphDuration, repeat: Infinity, ease: "linear", delay }}
        fill={`url(#dropGrad-${seed})`}
      />
    </motion.g>
  );
}

function LiquidMetalBackground() {
  const drops = useMemo(
    () => [
      { cx: 140, cy: 32, r: 30, morph: 13, drift: 24, rx: 26, ry: 9, dir: 1, delay: 0, seed: "d1", c1: "#7DD3FC", c2: "#1D4ED8" },
      { cx: 380, cy: 22, r: 22, morph: 10, drift: 29, rx: 22, ry: 7, dir: -1, delay: 1.4, seed: "d2", c1: "#67E8F9", c2: "#0E7490" },
      { cx: 600, cy: 40, r: 27, morph: 14.5, drift: 26, rx: 24, ry: 8, dir: 1, delay: 2.6, seed: "d3", c1: "#C4B5FD", c2: "#6D28D9" },
      { cx: 830, cy: 18, r: 19, morph: 9, drift: 21, rx: 20, ry: 6, dir: -1, delay: 0.8, seed: "d4", c1: "#93C5FD", c2: "#1E40AF" },
      { cx: 1020, cy: 36, r: 25, morph: 12, drift: 27, rx: 23, ry: 8, dir: 1, delay: 3.4, seed: "d5", c1: "#5EEAD4", c2: "#0F766E" },
      { cx: 1170, cy: 24, r: 16, morph: 8.5, drift: 19, rx: 18, ry: 6, dir: -1, delay: 1.9, seed: "d6", c1: "#A5B4FC", c2: "#3730A3" },
    ],
    []
  );

  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(115deg, #070A12 0%, #0B0F1C 45%, #070A12 100%)",
            "linear-gradient(115deg, #080B14 0%, #0D1122 45%, #080B14 100%)",
            "linear-gradient(115deg, #070A12 0%, #0B0F1C 45%, #070A12 100%)",
          ],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1200 80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="liquidGoo" x="-50%" y="-80%" width="200%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5.5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -11"
              result="goo"
            />
          </filter>

          {drops.map((d) => (
            <radialGradient key={d.seed} id={`dropGrad-${d.seed}`} cx="32%" cy="26%" r="80%">
              <stop offset="0%" stopColor={d.c1} stopOpacity="1" />
              <stop offset="50%" stopColor={d.c1} stopOpacity="0.9" />
              <stop offset="100%" stopColor={d.c2} stopOpacity="0.8" />
            </radialGradient>
          ))}
        </defs>

        <g filter="url(#liquidGoo)" style={{ opacity: 0.9 }}>
          {drops.map((d) => (
            <LiquidDrop
              key={d.seed}
              cx={d.cx}
              cy={d.cy}
              r={d.r}
              morphDuration={d.morph}
              driftDuration={d.drift}
              driftRx={d.rx}
              driftRy={d.ry}
              direction={d.dir}
              delay={d.delay}
              seed={d.seed}
              color1={d.c1}
              color2={d.c2}
            />
          ))}
        </g>

        <g style={{ mixBlendMode: "screen", opacity: 0.65 }}>
          {drops.map((d) => (
            <motion.circle
              key={`shine-${d.seed}`}
              r={d.r * 0.2}
              fill="#FFFFFF"
              animate={{
                cx: [d.cx - d.r * 0.3, d.cx + d.r * 0.2, d.cx - d.r * 0.3],
                cy: [d.cy - d.r * 0.35, d.cy - d.r * 0.1, d.cy - d.r * 0.35],
                opacity: [0.4, 0.85, 0.4],
              }}
              transition={{ duration: d.morph * 1.6, repeat: Infinity, ease: "linear", delay: d.delay }}
            />
          ))}
        </g>
      </svg>

      <motion.div
        className="absolute inset-y-0 w-1/3"
        style={{
          background:
            "linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.05) 55%, transparent 100%)",
        }}
        animate={{ left: ["-40%", "120%"] }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(6,7,11,0.18) 0%, rgba(6,7,11,0.55) 100%)",
        }}
      />
    </div>
  );
}

export default function Nav() {
  const active = useActiveSection(LINKS.map((l) => l.id));
  const progress = useScrollProgress();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);
  const location = useLocation();

  const linkRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  // ¿Estamos en el home?
  const isHome = location.pathname === "/";

  // Ruta activa forzada (para rutas tipo /proyectos/:id)
  // Si estamos dentro de /proyectos/* → forzamos "proyectos" como activo
  const routeActive = useMemo(() => {
    if (location.pathname.startsWith("/proyectos")) return "proyectos";
    return null;
  }, [location.pathname]);

  // Sección activa: si estamos en el home, usamos la del scroll.
  // Si no, usamos la que corresponde a la ruta.
  const activeSection = isHome ? active : routeActive;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
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

  // Navegación suave cuando ya estamos en el home
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
        }}
      >
        <LiquidMetalBackground />

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
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
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
                }}
              />
            )}

            {activeSection && (
              <motion.span
                aria-hidden
                className="absolute top-1.5 h-1/2 rounded-full pointer-events-none z-[2] overflow-hidden"
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
              >
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)",
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
                  left: linkRefs.current[hovered]?.offsetLeft || 0,
                  width: linkRefs.current[hovered]?.offsetWidth || 0,
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

        <div className="relative h-[2px] overflow-hidden z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)",
            }}
          />

          <div
            className="absolute top-0 left-0 h-full transition-[width] duration-200 ease-out"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, #3B82F6 0%, #93C5FD 50%, #3B82F6 100%)",
              boxShadow:
                "0 0 12px rgba(59,130,246,0.7), 0 0 4px rgba(147,197,253,0.9)",
            }}
          />
        </div>
      </div>
    </header>
  );
}