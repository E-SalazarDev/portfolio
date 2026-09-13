import React from "react";
import { Link, useLocation } from "react-router-dom";
import HeroBackground3D from "./HeroBackground3D";

export default function Hero() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Navegación suave cuando ya estamos en el home
  const handleAnchorClick = (e, id) => {
    if (isHome) {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden bg-[#050810] text-white"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <HeroBackground3D />
      </div>

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 40% 50%, transparent 40%, rgba(5,8,16,0.55) 100%)",
        }}
      />

      <div className="relative z-10 min-h-screen max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-start pt-16 lg:pt-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 xl:col-span-6">
            <div className="inline-flex items-center gap-3 mb-6 px-3.5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.9)]" />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/70">
                Ingeniero en TI · Backend Engineer
              </span>
            </div>

            <h1 className="max-w-3xl font-extrabold text-[2.5rem] sm:text-[3rem] lg:text-[3.4rem] xl:text-[3.9rem] leading-[1.05] tracking-[-0.035em]">
              Backend Engineering
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 bg-clip-text text-transparent">
                con Java &amp; Python
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/60">
              Diseño y construyo{" "}
              <strong className="text-white/90 font-semibold">APIs</strong>,{" "}
              <strong className="text-white/90 font-semibold">
                servicios
              </strong>{" "}
              y{" "}
              <strong className="text-white/90 font-semibold">
                sistemas backend
              </strong>{" "}
              con{" "}
              <strong className="text-white/90 font-semibold">Java</strong> y{" "}
              <strong className="text-white/90 font-semibold">Python</strong>,
              complementando mi especialización con{" "}
              <strong className="text-white/90 font-semibold">
                Machine Learning
              </strong>{" "}
              y{" "}
              <strong className="text-white/90 font-semibold">
                Deep Learning
              </strong>{" "}
              para integrar capacidades de IA en sistemas reales.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              {/* Ver proyectos → navega a /#proyectos */}
              <Link
                to="/#proyectos"
                onClick={(e) => handleAnchorClick(e, "proyectos")}
                className="group relative inline-flex items-center justify-center h-12 px-6 rounded-full overflow-hidden bg-[#F5F6F7] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_36px_-8px_rgba(147,197,253,0.55)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#93C5FD] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 text-[14px] font-semibold tracking-[-0.01em] text-[#08090C]">
                  Ver proyectos
                </span>
              </Link>

              {/* Descargar CV → link real al PDF */}
              <a
                href="/cv.pdf"
                download
                className="group relative inline-flex items-center justify-center h-12 px-6 rounded-full bg-white/[0.06] border border-white/[0.12] backdrop-blur-md transition-all duration-300 hover:bg-white/[0.1] hover:border-white/[0.2] hover:scale-[1.03]"
              >
                <span className="text-[14px] font-semibold tracking-[-0.01em] text-[#F5F6F7]">
                  Descargar CV
                </span>
              </a>
            </div>

            <div className="mt-10">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/40 mb-3.5">
                Stack principal
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { name: "Java",        color: "#F89820" },
                  { name: "Spring Boot", color: "#6DB33F" },
                  { name: "Python",      color: "#3776AB" },
                  { name: "FastAPI",     color: "#05998B" },
                  { name: "PostgreSQL",  color: "#4169E1" },
                  { name: "Docker",      color: "#2496ED" },
                ].map((tech) => (
                  <span
                    key={tech.name}
                    className="
                      group inline-flex items-center gap-2
                      text-[13px] font-medium tracking-tight
                      px-3.5 py-2 rounded-xl
                      text-white/80
                      bg-white/[0.04]
                      border border-white/[0.08]
                      backdrop-blur-sm
                      transition-all duration-300
                      hover:bg-white/[0.08] hover:border-white/[0.2] hover:text-white
                      hover:-translate-y-0.5
                      cursor-default
                    "
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: tech.color,
                        boxShadow: `0 0 10px ${tech.color}CC`,
                      }}
                    />
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-5 xl:col-span-6 min-h-[520px]" />
        </div>
      </div>
    </section>
  );
}