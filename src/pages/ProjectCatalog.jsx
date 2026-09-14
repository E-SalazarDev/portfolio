import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { DEMO_PROJECTS, TECH_COLORS } from "../data/projectCatalogData";

function ProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      {/* Aura azul — capa interna */}
      <span
        aria-hidden
        className="absolute -inset-3 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none rounded-[28px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59,130,246,0.6) 0%, rgba(59,130,246,0.28) 40%, transparent 75%)",
          filter: "blur(30px)",
        }}
      />

      {/* Aura azul — capa externa */}
      <span
        aria-hidden
        className="absolute -inset-6 opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none rounded-[28px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(93,140,255,0.4) 0%, transparent 65%)",
          filter: "blur(45px)",
        }}
      />

      <Link
        to={`/proyectos/${project.id}`}
        className="relative block rounded-[22px] overflow-hidden transition-all duration-500 group-hover:-translate-y-2"
        style={{
          background: "#0E1219",
          border: "1px solid rgba(147,197,253,0.15)",
          boxShadow:
            "0 25px 50px -25px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.02), inset 0 1px 0 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Borde luminoso permanente */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-[22px] pointer-events-none z-30 transition-all duration-500"
          style={{
            boxShadow:
              "0 0 0 1px rgba(147,197,253,0.15) inset, 0 0 30px -15px rgba(59,130,246,0.3) inset",
          }}
        />

        {/* Borde azul luminoso intenso al hover */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-30"
          style={{
            boxShadow:
              "0 0 0 1px rgba(147,197,253,0.7) inset, 0 0 60px -10px rgba(59,130,246,0.6) inset, 0 0 40px -10px rgba(59,130,246,0.5)",
          }}
        />

        {/* Esquinas técnicas tipo HUD */}
        <span
          aria-hidden
          className="absolute top-0 left-0 w-6 h-6 pointer-events-none z-40"
          style={{
            borderTop: "2px solid rgba(147,197,253,0.6)",
            borderLeft: "2px solid rgba(147,197,253,0.6)",
            borderTopLeftRadius: "22px",
            boxShadow: "-2px -2px 12px -4px rgba(59,130,246,0.8)",
          }}
        />
        <span
          aria-hidden
          className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none z-40"
          style={{
            borderBottom: "2px solid rgba(147,197,253,0.6)",
            borderRight: "2px solid rgba(147,197,253,0.6)",
            borderBottomRightRadius: "22px",
            boxShadow: "2px 2px 12px -4px rgba(59,130,246,0.8)",
          }}
        />

        {/* === IMAGEN === */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {/* Fondo oscuro con glow azul */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(59,130,246,0.18) 0%, #0A0E16 60%, #080B14 100%)",
            }}
          />

          {/* Captura */}
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{
              objectPosition: project.imagePosition || "center 15%",
            }}
          />

          {/* Overlay oscuro arriba para el botón */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(8,9,12,0.5) 0%, transparent 35%)",
            }}
          />

          {/* Overlay oscuro abajo */}
          <div
            className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(14,18,25,0.7) 50%, rgba(14,18,25,0.98) 100%)",
            }}
          />

          {/* Botón "Ver características" */}
          <div className="absolute top-5 right-5 z-20">
            <span
              className="relative inline-flex items-center gap-2 h-9 px-4 rounded-full backdrop-blur-md transition-all duration-500 group-hover:gap-3"
              style={{
                background: "rgba(8,9,12,0.75)",
                border: "1px solid rgba(147,197,253,0.5)",
                boxShadow:
                  "0 0 0 1px rgba(59,130,246,0.25), 0 8px 24px -8px rgba(59,130,246,0.6)",
              }}
            >
              <span className="text-[11px] font-bold tracking-[0.08em] text-[#93C5FD] uppercase whitespace-nowrap">
                Ver características
              </span>
              <ArrowUpRight
                size={13}
                strokeWidth={3}
                className="text-[#93C5FD] transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>

          {/* Glow azul inferior al hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 100%, rgba(59,130,246,0.4) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* === CONTENIDO === */}
        <div className="relative px-6 pt-6 pb-6">
          {/* Título con barra vertical */}
          <div className="flex items-start gap-3 mb-4">
            <span
              className="shrink-0 w-[3px] h-7 rounded-full mt-1 transition-all duration-500 group-hover:h-8"
              style={{
                background: "linear-gradient(180deg, #3B82F6 0%, #93C5FD 100%)",
                boxShadow: "0 0 12px rgba(59,130,246,0.7)",
              }}
            />
            <h3 className="text-xl md:text-[22px] font-black tracking-[-0.02em] text-[#F5F6F7] leading-[1.1] uppercase">
              {project.title}
            </h3>
          </div>

          {/* Descripción */}
          <p className="text-[12.5px] text-[#A2AAB8] leading-relaxed mb-5 line-clamp-2 pl-[18px]">
            {project.description}
          </p>

          {/* Separador */}
          <div
            className="h-px mb-4 ml-[18px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(147,197,253,0.3) 0%, rgba(147,197,253,0.05) 60%, transparent 100%)",
            }}
          />

          {/* Tags */}
          <div className="flex items-center gap-3 pl-[18px]">
            <span className="text-[9.5px] font-bold tracking-[0.14em] uppercase text-[#5B6470] shrink-0">
              Stack
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag) => {
                const dotColor = TECH_COLORS[tag] || "#93C5FD";
                return (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold tracking-tight px-2.5 py-1 rounded-md text-[#E4E8EE] whitespace-nowrap transition-all duration-300 hover:scale-105"
                    style={{
                      background: "rgba(15,23,42,0.85)",
                      border: "1px solid rgba(147,197,253,0.25)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: dotColor,
                        boxShadow: `0 0 6px ${dotColor}CC`,
                      }}
                    />
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function ProjectCatalog() {
  return (
    <section
      id="proyectos"
      className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 max-w-3xl"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.035em] text-[#F5F6F7] leading-[1.05] mb-6">
          Catálogo de{" "}
          <span className="bg-gradient-to-r from-[#93C5FD] via-[#3B82F6] to-[#A78BFA] bg-clip-text text-transparent">
            proyectos
          </span>
        </h1>
        <p className="text-[15px] leading-7 text-[#A2AAB8] max-w-xl">
          Una selección de plataformas, APIs y sistemas backend que he
          desarrollado en sectores fintech, gobierno y e-commerce.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEMO_PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}