import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const DEMO_PROJECTS = [
  {
    id: "smarthouse-ai",
    title: "SmartHouse AI",
    category: "PropTech · ML",
    description:
      "Plataforma de valuación inmobiliaria con Machine Learning para estimar precios de propiedades.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    tags: ["Python", "Django", "ML"],
  },
  {
    id: "reportes-ciudadanos",
    title: "Reportes Ciudadanos",
    category: "GovTech · Full Stack",
    description:
      "Plataforma web y móvil para gestión de reportes ciudadanos con geolocalización en tiempo real.",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80",
    tags: ["Django", "React Native", "spaCy"],
  },
  {
    id: "profunding",
    title: "Profunding",
    category: "Fintech · Backend",
    description:
      "Plataforma de inversiones y crowdfunding inmobiliario con módulos administrativos y financieros.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    tags: ["Django", "PostgreSQL", "Docker"],
  },
  {
    id: "proteccion-civil",
    title: "Protección Civil",
    category: "GovTech · IA",
    description:
      "Sistema de monitoreo de incidencias con chatbot inteligente NLP y panel administrativo.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
    tags: ["Python", "Twilio", "spaCy"],
  },
  {
    id: "mexicanfy",
    title: "Mexicanfy",
    category: "E-commerce",
    description:
      "Marketplace internacional para comercialización de productos mexicanos hacia Europa.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
    tags: ["Spring Boot", "PostgreSQL"],
  },
  {
    id: "merma",
    title: "Merma",
    category: "Enterprise · MVC",
    description:
      "Sistema empresarial de control de procesos internos bajo arquitectura MVC con Oracle.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    tags: ["Java", "Spring", "Oracle"],
  },
];

const TRAPEZOID_CLIP = "polygon(12% 0, 100% 0, 88% 100%, 0 100%)";

const TECH_COLORS = {
  Python: "#3776AB",
  Django: "#44B78B",
  ML: "#A78BFA",
  "React Native": "#61DAFB",
  spaCy: "#09A3D5",
  Twilio: "#F22F46",
  PostgreSQL: "#4169E1",
  Docker: "#2496ED",
  "Spring Boot": "#6DB33F",
  Spring: "#6DB33F",
  Java: "#F89820",
  Oracle: "#F80000",
};

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
      <span
        aria-hidden
        className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59,130,246,0.55) 0%, rgba(59,130,246,0.25) 35%, rgba(59,130,246,0.08) 60%, transparent 80%)",
          filter: "blur(28px)",
          clipPath: TRAPEZOID_CLIP,
        }}
      />

      <span
        aria-hidden
        className="absolute -inset-8 opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(93,140,255,0.35) 0%, transparent 60%)",
          filter: "blur(40px)",
          clipPath: TRAPEZOID_CLIP,
        }}
      />

      <Link
        to={`/proyectos/${project.id}`}
        className="relative block transition-all duration-500 group-hover:-translate-y-1.5"
      >
        <div
          className="relative overflow-hidden"
          style={{
            background: "#0E1219",
            clipPath: TRAPEZOID_CLIP,
          }}
        >
          <span
            aria-hidden
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
            style={{
              boxShadow:
                "0 0 0 1px rgba(147,197,253,0.6) inset, 0 0 60px -10px rgba(59,130,246,0.5) inset",
              clipPath: TRAPEZOID_CLIP,
            }}
          />

          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ clipPath: TRAPEZOID_CLIP }}
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(8,9,12,0.15) 0%, rgba(8,9,12,0.2) 35%, rgba(8,9,12,0.85) 68%, rgba(8,9,12,1) 100%)",
                clipPath: TRAPEZOID_CLIP,
              }}
            />

            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 100%, rgba(59,130,246,0.4) 0%, transparent 60%)",
                clipPath: TRAPEZOID_CLIP,
              }}
            />

            <div className="absolute top-5 right-5 z-20">
              <span
                className="relative inline-flex items-center gap-2 h-9 px-4 rounded-full backdrop-blur-md transition-all duration-500 group-hover:gap-3"
                style={{
                  background: "rgba(8,9,12,0.75)",
                  border: "1px solid rgba(147,197,253,0.5)",
                  boxShadow:
                    "0 0 0 1px rgba(59,130,246,0.2), 0 8px 24px -8px rgba(59,130,246,0.5)",
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

            <div className="absolute bottom-0 left-0 right-0 p-6 pl-[14%] pr-[14%] pb-7 z-10">
              <div className="mb-3">
                <span
                  className="inline-flex items-center gap-1.5 text-[9.5px] font-semibold tracking-[0.16em] uppercase px-2 py-0.5 rounded-md"
                  style={{
                    color: "#93C5FD",
                    background: "rgba(59,130,246,0.12)",
                    border: "1px solid rgba(147,197,253,0.25)",
                  }}
                >
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{
                      background: "#3B82F6",
                      boxShadow: "0 0 5px rgba(59,130,246,0.9)",
                    }}
                  />
                  {project.category}
                </span>
              </div>

              <h3 className="text-2xl md:text-[28px] font-black tracking-[-0.03em] text-[#F5F6F7] mb-3 leading-[1.05] uppercase">
                {project.title}
              </h3>

              <p className="text-[12.5px] text-[#C4CAD4] leading-relaxed mb-5 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 3).map((tag) => {
                  const dotColor = TECH_COLORS[tag] || "#93C5FD";
                  return (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold tracking-tight px-2.5 py-1 rounded-md text-[#E4E8EE] whitespace-nowrap transition-all duration-300"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-12">
        {DEMO_PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}