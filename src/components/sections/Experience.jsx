import { useState, useRef, useCallback } from "react";
import { Play, ImagePlus, Eye, Check } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import Chip from "../ui/Chip";
import Modal from "../ui/Modal";
import { experience } from "../../data/experience";

const MAX_TILT = 6; // grados — sutil, la imagen apenas debe notarse reaccionando

function ProjectMedia({ media, onOpen }) {
  const cover = media?.[0];
  const frameRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * MAX_TILT * 2;
    const rotateX = (0.5 - py) * MAX_TILT * 2;
    el.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = frameRef.current;
    if (!el) return;
    el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg)";
  }, []);

  if (!cover) {
    return (
      <div
        className="relative w-full aspect-[4/3] rounded-xl border border-dashed border-white/15 flex items-center justify-center text-muted shrink-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(199,184,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(199,184,255,0.05) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
        title="Captura pendiente"
      >
        <ImagePlus size={22} />
      </div>
    );
  }

  return (
    <div className="shrink-0 flex flex-col gap-2">
      <div
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative w-full aspect-[4/3] will-change-transform"
        style={{ transformStyle: "preserve-3d", transition: "transform 300ms cubic-bezier(0.22,1,0.36,1)" }}
      >
        <button
          onClick={() => onOpen(cover)}
          className="relative block w-full h-full rounded-xl overflow-hidden border border-white/10 group-hover:border-accent/50 transition-colors duration-300"
        >
          <img
            src={cover.type === "video" ? cover.poster : cover.src}
            alt={cover.label || ""}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "radial-gradient(120px circle at var(--mx,50%) var(--my,50%), rgba(139,92,246,0.28), transparent 70%)",
            }}
          />
          {cover.type === "video" ? (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <Play size={16} className="text-white ml-0.5" fill="currentColor" />
              </span>
            </span>
          ) : (
            <span className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 font-mono text-[10.5px] text-white/0 group-hover:text-white/90 transition-colors duration-300">
              <Eye size={12} />
              Ver captura
            </span>
          )}
        </button>
      </div>

      {media.length > 1 && (
        <div className="flex gap-2">
          {media.slice(1, 4).map((m, i) => (
            <button
              key={i}
              onClick={() => onOpen(m)}
              className="relative w-full aspect-square rounded-md overflow-hidden border border-white/10 hover:border-accent/50 transition-colors"
            >
              <img
                src={m.type === "video" ? m.poster : m.src}
                alt={m.label || ""}
                className="w-full h-full object-cover"
              />
              {m.type === "video" && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play size={10} className="text-white" fill="currentColor" />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, index, onOpen }) {
  return (
    <div className="group relative bg-panel border border-white/10 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:border-accent/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/5">
      <div className="grid sm:grid-cols-[200px_1fr] gap-6">
        <ProjectMedia media={project.media} onOpen={onOpen} />

        <div className="min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-[11px] tracking-widest text-accent-light">
              {String(index + 1).padStart(2, "0")}
            </span>
            {project.period && (
              <span className="font-mono text-[10.5px] text-muted px-2 py-0.5 rounded-full border border-white/10">
                {project.period}
              </span>
            )}
          </div>

          <h5 className="font-display text-base font-semibold text-paper mb-2.5">{project.title}</h5>

          <p className="text-sm text-muted leading-relaxed mb-4">{project.description}</p>

          <div className="h-px bg-white/[0.06] mb-4" />

          <ul className="relative mb-5">
            <div className="absolute left-[6px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/50 via-white/10 to-transparent" />
            {project.did.map((item, j) => (
              <li key={j} className="relative pb-3 last:pb-0 pl-6">
                <span className="absolute left-0 top-[3px] w-3.5 h-3.5 rounded-full bg-panel border-2 border-accent flex items-center justify-center shadow-[0_0_8px] shadow-accent/40 z-10">
                  <Check size={8} strokeWidth={3.5} className="text-accent-light" />
                </span>
                <span className="text-[13px] text-paper leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="font-mono text-[10.5px] text-muted px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.02] transition-colors duration-200 hover:border-accent/40 hover:text-accent-light"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const [openMedia, setOpenMedia] = useState(null);

  return (
    <section id="experiencia" className="relative max-w-360 mx-auto px-10 py-28 overflow-hidden">
      {/* Glow de fondo: mint + azul como dominantes, morado solo como eco residual del sistema */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(650px circle at 6% 10%, rgba(52,211,153,0.12), transparent 60%), " +
            "radial-gradient(700px circle at 94% 35%, rgba(96,165,250,0.09), transparent 60%), " +
            "radial-gradient(550px circle at 45% 100%, rgba(139,92,246,0.06), transparent 60%)",
        }}
      />
      {/* Patrón de grid tipo blueprint, muy tenue, se desvanece hacia los bordes */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          maskImage: "radial-gradient(ellipse 75% 55% at 50% 25%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 55% at 50% 25%, black, transparent 75%)",
        }}
      />

      <div className="relative">
        <SectionHeader tag="SYS.03" title="Experiencia en empresas" />
        <div className="relative">
          <div className="absolute left-1.75 top-2 bottom-2 w-px bg-white/10" />

          {experience.map((job) => (
            <div key={job.id} className="relative pl-10 pb-14 last:pb-0">
            <span className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-panel border-2 border-accent shadow-[0_0_10px] shadow-accent/60" />

            <div className="font-mono text-xs text-muted mb-2">{job.period}</div>
            <div className="flex items-baseline gap-2.5 flex-wrap mb-1">
              <h4 className="font-display text-lg font-semibold text-paper">{job.company}</h4>
              <span className="text-sm text-accent-light">{job.role}</span>
            </div>
            {job.location && (
              <div className="font-mono text-[11px] text-muted mb-5">{job.location}</div>
            )}

            <div className="flex flex-col gap-5">
              {job.projects.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} onOpen={setOpenMedia} />
              ))}
            </div>
            </div>
          ))}
        </div>
      </div>

      {openMedia && (
        <Modal onClose={() => setOpenMedia(null)}>
          {openMedia.type === "video" ? (
            <video
              src={openMedia.src}
              poster={openMedia.poster}
              controls
              className="max-h-[75vh] w-auto mx-auto rounded-lg"
            />
          ) : (
            <img
              src={openMedia.src}
              alt={openMedia.label || ""}
              className="max-h-[75vh] w-auto mx-auto rounded-lg"
            />
          )}
        </Modal>
      )}
    </section>
  );
}