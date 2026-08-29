import { useState, useEffect, useCallback } from "react";
import { Folder, Play, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import SectionHeader from "../ui/SectionHeader";
import Chip from "../ui/Chip";
import { projects } from "../../data/projects";

const STATUS_STYLES = {
  live: "bg-mint/10 text-mint",
  build: "bg-amber/10 text-amber",
  academic: "bg-mint/10 text-mint",
};

const STATUS_DOT = {
  live: "bg-mint shadow-[0_0_6px] shadow-mint",
  build: "bg-amber shadow-[0_0_6px] shadow-amber",
  academic: "bg-mint shadow-[0_0_6px] shadow-mint",
};

// Tilt 3D reutilizable: rota la tarjeta según la posición del cursor y
// mueve la sombra en dirección contraria, para reforzar la sensación de
// profundidad (punto 10 del brief: "sombras dinámicas"). Sutil a propósito.
function makeTiltHandlers(maxTilt, shadowStrength = 1) {
  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - py) * maxTilt * 2;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    el.style.boxShadow = `${-rotateY * shadowStrength}px ${rotateX * shadowStrength + 4}px ${28 + Math.abs(rotateX) * 2}px rgba(0,0,0,0.45)`;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const handleMouseLeave = (e) => {
    const el = e.currentTarget;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
    el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
  };
  return { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
}

function BlueprintPlaceholder({ label }) {
  return (
    <div
      className="relative aspect-video flex items-center justify-center bg-linear-to-br from-accent/35 via-panel2 to-ink"
      style={{
        backgroundImage:
          "linear-gradient(rgba(199,184,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(199,184,255,0.06) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <button className="w-14 h-14 rounded-full bg-black/40 border border-white/25 flex items-center justify-center hover:bg-accent transition-colors">
        <Play size={18} className="text-paper ml-0.5" fill="currentColor" />
      </button>
      <span className="absolute bottom-3 left-4 font-mono text-[11px] text-paper bg-black/50 px-2 py-0.5 rounded">
        {label}
      </span>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState(0);
  const [mediaIndex, setMediaIndex] = useState(0);
  const project = projects[active];
  const media = project.media || []; // [] mientras no subas capturas/video reales
  const current = media[mediaIndex];

  // al cambiar de proyecto, vuelve siempre al primer elemento (el video, por defecto)
  useEffect(() => setMediaIndex(0), [active]);

  const listTilt = makeTiltHandlers(6, 0.6);
  const panelTilt = makeTiltHandlers(4, 1.4);

  return (
    <section id="proyectos" className="max-w-360 mx-auto px-10 py-28">
      <SectionHeader tag="SYS.02" title="Proyectos" />

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        {/* índice de proyectos */}
        <div className="bg-panel border border-white/10 rounded-2xl p-2 h-fit">
          <div className="flex items-center gap-2 px-4 py-3 font-mono text-[11px] text-muted border-b border-white/10 mb-1">
            <Folder size={13} /> proyectos/
          </div>
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              onMouseMove={listTilt.onMouseMove}
              onMouseLeave={listTilt.onMouseLeave}
              className={`relative w-full text-left flex items-start gap-3.5 px-3 py-4 rounded-xl will-change-transform transition-colors duration-300 ${
                i === active ? "bg-accent/10" : "hover:bg-white/5"
              }`}
              style={{ transformStyle: "preserve-3d", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(110px circle at var(--mx,50%) var(--my,50%), rgba(139,92,246,0.14), transparent 70%)",
                }}
              />
              <span
                className={`relative z-10 font-mono text-xs mt-0.5 shrink-0 ${
                  i === active ? "text-accent-light" : "text-white/25"
                }`}
              >
                0{i + 1}
              </span>
              <div className="relative z-10 min-w-0">
                <div
                  className={`font-display text-[15px] font-semibold leading-snug ${
                    i === active ? "text-paper" : "text-muted"
                  }`}
                >
                  {p.title}
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      i === active ? STATUS_DOT[p.status] : "bg-white/20"
                    }`}
                  />
                  <span className="font-mono text-[10.5px] text-muted">{p.domain}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* panel de detalle */}
        <div className="bg-panel border border-white/10 rounded-2xl p-7">
          <div className="flex justify-between items-start mb-4">
            <span className={`font-mono text-[11px] tracking-wide rounded-full px-2.5 py-1 ${STATUS_STYLES[project.status]}`}>
              {project.statusLabel}
            </span>
            <span className="font-mono text-[11px] text-muted">{project.domain}</span>
          </div>

          <h3 className="font-display text-3xl font-semibold text-paper mb-5">{project.title}</h3>

          {/* pantalla grande: video o imagen seleccionada — con tilt 3D al mover el mouse */}
          <div
            onMouseMove={panelTilt.onMouseMove}
            onMouseLeave={panelTilt.onMouseLeave}
            className="relative rounded-xl overflow-hidden border border-white/10 mb-3 will-change-transform"
            style={{ transformStyle: "preserve-3d", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
          >
            <div
              className="flex items-center gap-1.5 bg-panel2 px-3 py-2 border-b border-white/10 relative z-10"
              style={{ transform: "translateZ(24px)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
              <div className="flex-1 h-4 rounded bg-white/5 ml-2" />
            </div>

            {current ? (
              current.type === "video" ? (
                <video
                  key={current.src}
                  src={current.src}
                  poster={current.poster}
                  controls
                  className="w-full aspect-video bg-ink"
                />
              ) : (
                <img
                  key={current.src}
                  src={current.src}
                  alt={current.label || project.title}
                  className="w-full aspect-video object-cover bg-ink"
                />
              )
            ) : (
              <BlueprintPlaceholder label={project.demoLabel} />
            )}

            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "radial-gradient(280px circle at var(--mx,50%) var(--my,50%), rgba(139,92,246,0.10), transparent 70%)",
              }}
            />
          </div>

          {/* catálogo de miniaturas — solo aparece si el proyecto ya tiene media[] cargado */}
          {media.length > 1 && (
            <div className="flex gap-2 mb-6 overflow-x-auto">
              {media.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setMediaIndex(i)}
                  className={`relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                    i === mediaIndex ? "border-accent" : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <img
                    src={m.type === "video" ? m.poster : m.src}
                    alt={m.label || ""}
                    className="w-full h-full object-cover"
                  />
                  {m.type === "video" && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play size={12} className="text-white" fill="currentColor" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
          {media.length <= 1 && <div className="mb-6" />}

          <ul className="mb-6 space-y-2.5">
            {project.did.map((item, i) => (
              <li key={i} className="relative pl-5 text-sm text-paper leading-relaxed">
                <span className="absolute left-0 top-1.75 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px] shadow-accent" />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap">
            <a href={project.links.code} className="flex items-center gap-2 font-mono text-[12px] text-paper border border-white/10 bg-white/3 rounded-lg px-5 py-2.5 hover:border-accent hover:text-accent-light transition-colors">
              <FaGithub size={13} /> Código
            </a>
            {project.links.demo && (
              <a href={project.links.demo} className="flex items-center gap-2 font-mono text-[12px] text-paper border border-white/10 bg-white/3 rounded-lg px-5 py-2.5 hover:border-accent hover:text-accent-light transition-colors">
                <ExternalLink size={13} /> Ver demo en vivo
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}