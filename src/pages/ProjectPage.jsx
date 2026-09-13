import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Database,
  FileSearch,
  Brain,
  Server,
  Monitor,
  Smartphone,
  MapPin,
  Filter,
  LayoutDashboard,
  User,
  Briefcase,
  DollarSign,
  ShieldCheck,
  FileText,
  Globe,
  Search,
  ShoppingCart,
  CreditCard,
  Package,
  MessageCircle,
  ClipboardList,
  FileCheck,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { PROJECTS_DATA, PROJECT_ORDER } from "../data/projects-data";

const FLOW_ICONS = {
  database: Database,
  "file-search": FileSearch,
  brain: Brain,
  server: Server,
  monitor: Monitor,
  smartphone: Smartphone,
  "map-pin": MapPin,
  filter: Filter,
  "layout-dashboard": LayoutDashboard,
  user: User,
  briefcase: Briefcase,
  "dollar-sign": DollarSign,
  "shield-check": ShieldCheck,
  "file-text": FileText,
  globe: Globe,
  search: Search,
  "shopping-cart": ShoppingCart,
  "credit-card": CreditCard,
  package: Package,
  "message-circle": MessageCircle,
  "clipboard-list": ClipboardList,
  "file-check": FileCheck,
  sparkles: Sparkles,
};

const TECH_ICONS = {
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  Django: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  "Django REST Framework": "https://cdn.simpleicons.org/django/44B78B",
  PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  Pandas: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  NumPy: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  "Scikit-learn": "https://cdn.simpleicons.org/scikitlearn/F7931E",
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "Spring Boot": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  "Spring Security": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  Spring: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  Oracle: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
  Angular: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  spaCy: "https://cdn.simpleicons.org/spacy/09A3D5",
  Twilio: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twilio/twilio-original.svg",
  ML: "https://cdn.simpleicons.org/scikitlearn/F7931E",
};

const IMPACT_ACCENTS = [
  { color: "#3B82F6", glow: "rgba(59,130,246,0.35)", bg: "rgba(59,130,246,0.12)" },
  { color: "#8B5CF6", glow: "rgba(139,92,246,0.35)", bg: "rgba(139,92,246,0.12)" },
  { color: "#06B6D4", glow: "rgba(6,182,212,0.35)", bg: "rgba(6,182,212,0.12)" },
  { color: "#F59E0B", glow: "rgba(245,158,11,0.35)", bg: "rgba(245,158,11,0.12)" },
];

/* =========================================================
   SECTION HEADER
========================================================= */
function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <span
          className="w-[3px] h-6 rounded-full shrink-0"
          style={{
            background: "linear-gradient(180deg, #3B82F6 0%, #93C5FD 100%)",
            boxShadow: "0 0 12px rgba(59,130,246,0.8)",
          }}
        />
        <h2 className="text-2xl font-bold tracking-[-0.02em] text-[#F5F6F7]">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-[13.5px] text-[#8B93A1] pl-[15px] max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   SIDEBAR
========================================================= */
function Sidebar({ currentId }) {
  return (
    <aside className="hidden lg:block lg:sticky lg:top-24 self-start w-full">
      <div className="flex items-center gap-2.5 mb-5">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{
            background: "#60A5FA",
            boxShadow:
              "0 0 12px rgba(96,165,250,1), 0 0 24px rgba(59,130,246,0.7)",
          }}
        />
        <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-[#E5E7EB]">
          Proyectos
        </span>
        <span className="flex-1 h-px bg-gradient-to-r from-white/[0.15] to-transparent" />
        <span className="text-[10.5px] font-mono font-semibold text-[#93C5FD]">
          {String(PROJECT_ORDER.length).padStart(2, "0")}
        </span>
      </div>

      <div className="relative">
        <span
          className="absolute left-[7px] top-3 bottom-3 w-px"
          style={{
            background:
              "linear-gradient(180deg, rgba(59,130,246,0.4) 0%, rgba(59,130,246,0.1) 50%, rgba(59,130,246,0.4) 100%)",
          }}
        />

        <ul className="flex flex-col gap-0.5">
          {PROJECT_ORDER.map((projectId, index) => {
            const project = PROJECTS_DATA[projectId];
            const isActive = projectId === currentId;

            return (
              <li key={projectId}>
                <Link
                  to={`/proyectos/${projectId}`}
                  className="group relative flex items-center gap-3 py-2.5 pr-3 pl-6 rounded-lg transition-all duration-300 hover:bg-white/[0.03]"
                >
                  <span
                    className="absolute left-[3px] top-1/2 -translate-y-1/2 w-[9px] h-[9px] rounded-full transition-all duration-500"
                    style={
                      isActive
                        ? {
                            background: "#3B82F6",
                            boxShadow:
                              "0 0 0 3px rgba(59,130,246,0.2), 0 0 12px rgba(59,130,246,0.9)",
                          }
                        : {
                            background: "#0E1219",
                            border: "1px solid rgba(147,197,253,0.3)",
                          }
                    }
                  />

                  <div className="flex-1 min-w-0">
                    <span
                      className={`block truncate text-[13px] font-semibold leading-tight transition-colors duration-300 ${
                        isActive
                          ? "text-[#F5F6F7]"
                          : "text-[#8B93A1] group-hover:text-[#F5F6F7]"
                      }`}
                    >
                      {project.title}
                    </span>
                    <span
                      className={`block text-[10px] uppercase tracking-[0.12em] mt-0.5 transition-colors duration-300 ${
                        isActive ? "text-[#93C5FD]" : "text-[#4B5563]"
                      }`}
                    >
                      {project.domain}
                    </span>
                  </div>

                  <span
                    className={`shrink-0 text-[10px] font-mono font-bold tracking-wider transition-colors duration-300 ${
                      isActive ? "text-[#93C5FD]" : "text-[#3F4652] group-hover:text-[#8B93A1]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

/* =========================================================
   HERO
========================================================= */
function Hero({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-16"
    >
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: "#0E1219",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 40px 100px -40px rgba(0,0,0,0.95), 0 0 120px -50px rgba(59,130,246,0.3)",
        }}
      >
        <div className="relative aspect-[16/7] sm:aspect-[16/7] lg:aspect-[16/6.5] group">
          <img
            src={project.posterImage}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent 40%, rgba(8,9,12,0.5) 70%, rgba(8,9,12,0.95) 100%)",
            }}
          />

          <div className="absolute inset-0 flex flex-col justify-end px-8 sm:px-12 lg:px-14 pb-8 lg:pb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-[#F5F6F7] leading-[1.05] mb-2 drop-shadow-lg">
              {project.title}
            </h1>
            <p className="text-[14px] sm:text-[15px] lg:text-base text-[#93C5FD] font-medium drop-shadow-md">
              {project.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mt-6">
        <p className="text-[15px] sm:text-base leading-7 text-[#C4CAD4] max-w-3xl">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-3 shrink-0">
          {project.links.demo && project.links.demo !== "#" && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 h-11 px-5 rounded-full overflow-hidden bg-[#F5F6F7] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_36px_-8px_rgba(147,197,253,0.6)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#93C5FD] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ExternalLink size={14} className="relative z-10 text-[#08090C]" />
              <span className="relative z-10 text-[13px] font-semibold tracking-tight text-[#08090C]">
                Ver proyecto
              </span>
            </a>
          )}

          {project.links.code && project.links.code !== "#" && (
            <a
              href={project.links.code}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 h-11 px-5 rounded-full overflow-hidden bg-white/[0.06] border border-white/[0.12] backdrop-blur-md transition-all duration-300 hover:bg-white/[0.12] hover:border-white/[0.25] hover:scale-[1.03] hover:shadow-[0_12px_36px_-8px_rgba(147,197,253,0.4)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#3B82F6]/20 to-[#93C5FD]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <FaGithub size={15} className="relative z-10 text-[#F5F6F7]" />
              <span className="relative z-10 text-[13px] font-semibold tracking-tight text-[#F5F6F7]">
                Ver código en GitHub
              </span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   TECHNOLOGIES
========================================================= */
function Technologies({ project }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12"
    >
      <SectionHeader title="Tecnologías usadas" />

      <div className="flex flex-wrap gap-2.5">
        {project.technologies.map((tech, idx) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="group relative flex items-center gap-3 pl-3 pr-4 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-[#3B82F6]/40 hover:bg-white/[0.05]"
          >
            <span
              aria-hidden
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at left, rgba(59,130,246,0.15) 0%, transparent 70%)",
              }}
            />

            <div className="relative shrink-0 w-7 h-7 flex items-center justify-center">
              {TECH_ICONS[tech.name] ? (
                <img
                  src={TECH_ICONS[tech.name]}
                  alt={tech.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <span className="text-[#93C5FD] text-lg font-bold">⚡</span>
              )}
            </div>

            <div className="relative flex flex-col leading-tight">
              <span className="text-[13px] font-semibold text-[#F5F6F7] whitespace-nowrap">
                {tech.name}
              </span>
              <span className="text-[9.5px] uppercase tracking-[0.1em] text-[#8B93A1] whitespace-nowrap">
                {tech.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

/* =========================================================
   HOW IT WORKS
========================================================= */
function HowItWorks({ project }) {
  const steps = project.howItWorks;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12"
    >
      <SectionHeader
        title="Cómo funciona"
        subtitle={
          project.flowDescription ||
          "El flujo de datos desde el usuario hasta el resultado final."
        }
      />

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${
          steps.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
        } ${steps.length >= 5 ? "xl:grid-cols-5" : ""}`}
      >
        {steps.map((step, idx) => {
          const Icon = FLOW_ICONS[step.icon] || Server;
          const isLast = idx === steps.length - 1;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative flex flex-col items-center text-center gap-3 p-5 rounded-2xl transition-all duration-500 hover:-translate-y-1"
              style={{
                background:
                  "linear-gradient(135deg, rgba(20,26,42,0.7) 0%, rgba(15,20,35,0.7) 100%)",
                border: "1px solid rgba(147,197,253,0.15)",
              }}
            >
              <span
                className="absolute top-3 left-3 text-[10px] font-mono font-bold tracking-widest"
                style={{ color: "#93C5FD" }}
              >
                {step.number}
              </span>

              <span
                className="flex items-center justify-center w-12 h-12 rounded-xl mt-3"
                style={{
                  background: "rgba(59,130,246,0.15)",
                  border: "1px solid rgba(147,197,253,0.3)",
                  boxShadow: "0 0 20px -5px rgba(59,130,246,0.5)",
                }}
              >
                <Icon size={20} className="text-[#93C5FD]" strokeWidth={1.8} />
              </span>

              <span className="text-[13px] font-bold text-[#F5F6F7] leading-tight">
                {step.title}
              </span>

              <span className="text-[11.5px] text-[#8B93A1] leading-relaxed">
                {step.description}
              </span>

              {!isLast && (
                <ArrowRight
                  size={14}
                  className="hidden lg:block absolute -right-[10px] top-1/2 -translate-y-1/2 text-[#3B82F6]/40 z-10"
                  strokeWidth={2.5}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {project.flow && (
        <>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
            {project.flow.input && (
              <div
                className="relative flex items-center gap-4 p-5 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(20,26,42,0.7) 0%, rgba(15,20,35,0.7) 100%)",
                  border: "1px solid rgba(147,197,253,0.15)",
                }}
              >
                <span
                  className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl"
                  style={{
                    background: "rgba(59,130,246,0.15)",
                    border: "1px solid rgba(147,197,253,0.3)",
                  }}
                >
                  {(() => {
                    const Icon = FLOW_ICONS[project.flow.input.icon] || Database;
                    return <Icon size={20} className="text-[#93C5FD]" strokeWidth={1.8} />;
                  })()}
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-[#8B93A1] mb-1">
                    {project.flow.input.label}
                  </p>
                  <p className="text-[14px] font-bold text-[#F5F6F7]">
                    {project.flow.input.title}
                  </p>
                  {project.flow.input.description && (
                    <p className="text-[11.5px] text-[#8B93A1] mt-0.5">
                      {project.flow.input.description}
                    </p>
                  )}
                </div>
              </div>
            )}

            {project.flow.input && project.flow.model && (
              <div className="hidden lg:flex items-center justify-center">
                <div className="flex items-center gap-1">
                  <span className="w-8 h-px bg-gradient-to-r from-[#3B82F6]/0 to-[#3B82F6]/60" />
                  <ArrowRight size={18} className="text-[#3B82F6]" strokeWidth={2.5} />
                  <span className="w-8 h-px bg-gradient-to-r from-[#3B82F6]/60 to-[#3B82F6]/0" />
                </div>
              </div>
            )}

            {project.flow.model && (
              <div
                className="relative flex items-center gap-4 p-5 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(20,26,42,0.7) 0%, rgba(15,20,35,0.7) 100%)",
                  border: "1px solid rgba(147,197,253,0.15)",
                }}
              >
                <span
                  className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl"
                  style={{
                    background: "rgba(59,130,246,0.15)",
                    border: "1px solid rgba(147,197,253,0.3)",
                  }}
                >
                  {(() => {
                    const Icon = FLOW_ICONS[project.flow.model.icon] || Brain;
                    return <Icon size={20} className="text-[#93C5FD]" strokeWidth={1.8} />;
                  })()}
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-[#8B93A1] mb-1">
                    {project.flow.model.label}
                  </p>
                  <p className="text-[14px] font-bold text-[#F5F6F7]">
                    {project.flow.model.title}
                  </p>
                  {project.flow.model.description && (
                    <p className="text-[11.5px] text-[#8B93A1] mt-0.5">
                      {project.flow.model.description}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {project.flow.result && (
            <div
              className="mt-4 relative flex items-center gap-4 p-5 rounded-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.15) 100%)",
                border: "1px solid rgba(147,197,253,0.3)",
                boxShadow: "0 0 40px -10px rgba(59,130,246,0.4)",
              }}
            >
              <span
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at top right, rgba(139,92,246,0.2) 0%, transparent 60%)",
                }}
              />

              <span
                className="relative shrink-0 flex items-center justify-center w-12 h-12 rounded-xl"
                style={{
                  background: "rgba(139,92,246,0.2)",
                  border: "1px solid rgba(167,139,250,0.4)",
                }}
              >
                {(() => {
                  const Icon = FLOW_ICONS[project.flow.result.icon] || Sparkles;
                  return <Icon size={20} className="text-[#C4B5FD]" strokeWidth={1.8} />;
                })()}
              </span>

              <div className="relative min-w-0">
                <p className="text-[10px] uppercase tracking-[0.14em] text-[#C4B5FD] mb-1">
                  {project.flow.result.label || "Resultado"}
                </p>
                <p className="text-[14px] font-bold text-[#F5F6F7]">
                  {project.flow.result.title}
                </p>
                {project.flow.result.description && (
                  <p className="text-[11.5px] text-[#A2AAB8] mt-0.5">
                    {project.flow.result.description}
                  </p>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </motion.section>
  );
}

/* =========================================================
   VISTA DEL PROYECTO — Galería dinámica
========================================================= */
function ProjectGallery({ project }) {
  const images = project.gallery || [];
  if (images.length === 0) return null;

  // 1 imagen
  if (images.length === 1) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <SectionHeader title="Vista del proyecto" />
        <GalleryItem src={images[0]} aspect="video" />
      </motion.section>
    );
  }

  // 2 imágenes
  if (images.length === 2) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <SectionHeader title="Vista del proyecto" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((src, idx) => (
            <GalleryItem key={idx} src={src} aspect="video" />
          ))}
        </div>
      </motion.section>
    );
  }

  // 3 imágenes: 1 grande izquierda + 2 apiladas derecha
  // La izquierda usa aspect-video (marca la altura), la derecha se reparte con grid-rows-2
  if (images.length === 3) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <SectionHeader title="Vista del proyecto" />

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4">
          {/* Card grande: aspect-video define la altura de la fila */}
          <GalleryItem src={images[0]} aspect="video" />

          {/* Columna derecha: dividimos la altura en 2 filas iguales */}
          <div
            className="grid grid-cols-1 gap-4"
            style={{ gridTemplateRows: "1fr 1fr" }}
          >
            <GalleryItem src={images[1]} aspect="fill" />
            <GalleryItem src={images[2]} aspect="fill" />
          </div>
        </div>
      </motion.section>
    );
  }

  // 4 o más
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12"
    >
      <SectionHeader title="Vista del proyecto" />

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4">
        <GalleryItem src={images[0]} aspect="video" />
        <div
          className="grid grid-cols-1 gap-4"
          style={{ gridTemplateRows: "1fr 1fr" }}
        >
          <GalleryItem src={images[1]} aspect="fill" />
          {images[2] && <GalleryItem src={images[2]} aspect="fill" />}
        </div>
      </div>

      {images.length > 3 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {images.slice(3).map((src, idx) => (
            <GalleryItem key={idx} src={src} aspect="video" />
          ))}
        </div>
      )}
    </motion.section>
  );
}

/* =========================================================
   GALLERY ITEM
   aspect="video" → aspect 16/9 (para grids normales)
   aspect="fill"  → ocupa el 100% del contenedor padre
========================================================= */
function GalleryItem({ src, aspect = "video" }) {
  const isFill = aspect === "fill";
  const aspectClass = isFill
    ? "h-full w-full"
    : aspect === "square"
    ? "aspect-square"
    : aspect === "tall"
    ? "aspect-[4/5]"
    : "aspect-video";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative rounded-2xl overflow-hidden group cursor-pointer ${
        isFill ? "h-full" : ""
      }`}
      style={{
        background: "#0E1219",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className={`relative ${aspectClass} overflow-hidden`}>
        <img
          src={src}
          alt="Vista del proyecto"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 50%, rgba(59,130,246,0.25) 100%)",
          }}
        />
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(147,197,253,0.5)",
          }}
        />
      </div>
    </motion.div>
  );
}

/* =========================================================
   IMPACTO DEL PROYECTO
========================================================= */
function Impact({ project }) {
  const icons = [Zap, Target, TrendingUp, CheckCircle2];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <SectionHeader
        title="Lo más importante que construí"
        subtitle="Resultados tangibles y contribuciones clave del proyecto."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {project.impact.map((item, idx) => {
          const IconComponent = icons[idx % icons.length];
          const accent = IMPACT_ACCENTS[idx % IMPACT_ACCENTS.length];

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative flex items-center gap-5 p-5 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
              style={{
                background:
                  "linear-gradient(135deg, rgba(20,26,42,0.6) 0%, rgba(15,20,35,0.6) 100%)",
                border: `1px solid ${accent.color}25`,
              }}
            >
              <span
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top left, ${accent.glow} 0%, transparent 60%)`,
                }}
              />

              <span
                className="relative shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl transition-transform duration-500 group-hover:scale-110"
                style={{
                  background: accent.bg,
                  border: `1px solid ${accent.color}40`,
                  boxShadow: `0 0 24px -6px ${accent.glow}`,
                }}
              >
                <IconComponent
                  size={22}
                  style={{ color: accent.color }}
                  strokeWidth={2}
                />
              </span>

              <div className="relative min-w-0 flex-1">
                <p className="text-[14.5px] leading-snug text-[#E4E8EE] font-medium">
                  {item}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

/* =========================================================
   MAIN
========================================================= */
export default function ProjectPage() {
  const { projectId } = useParams();
  const project = PROJECTS_DATA[projectId];

  if (!project) {
    return <Navigate to="/proyectos" replace />;
  }

  return (
    <section className="relative w-full pt-6 pb-24">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 lg:gap-6">
          <div className="flex flex-col w-full">
            <Link
              to="/proyectos"
              className="group inline-flex items-center gap-2.5 self-start mb-6 px-3 py-2 rounded-lg bg-white/[0.06] border border-white/[0.12] text-[12.5px] font-semibold text-[#C4CAD4] hover:text-[#F5F6F7] hover:bg-[#3B82F6]/15 hover:border-[#3B82F6]/50 transition-all duration-300 backdrop-blur-sm"
            >
              <ArrowLeft
                size={14}
                className="text-[#93C5FD] transition-transform duration-300 group-hover:-translate-x-0.5"
              />
              <span>Volver a proyectos</span>
            </Link>

            <Sidebar currentId={projectId} />
          </div>

          <main className="min-w-0">
            <Hero project={project} />
            <Technologies project={project} />
            <HowItWorks project={project} />
            <ProjectGallery project={project} />
            <Impact project={project} />
          </main>
        </div>
      </div>
    </section>
  );
}