// src/components/sections/Experience.jsx
import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Play,
  ImagePlus,
  Maximize2,
  Check,
  Building2,
  MapPin,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import SectionHeader from "../ui/SectionHeader";
import TechChip from "../ui/Techchip";
import Modal from "../ui/Modal";
import { experience } from "../../data/experience";
import { ROTATION, accentAlpha } from "../../theme/tokens";

function SignalRail({ progress, accent }) {
  const glowY = useTransform(progress, [0, 1], ["-60%", "160%"]);

  return (
    <div className="relative w-px h-16 mt-5 overflow-hidden rounded-full bg-panel2">
      <motion.div
        className="absolute inset-x-0 top-0 rounded-full"
        style={{
          height: "45%",
          y: glowY,
          background:
            "linear-gradient(to bottom, transparent, rgb(" + accent.rgb + "), transparent)",
        }}
      />
    </div>
  );
}

/* Botón de flecha compartido — igual estilo que ya usamos en Proyectos */
function NavArrow({ direction, onClick }) {
  return (
    <button
      type="button"
      onClick={function (e) {
        e.stopPropagation();
        onClick();
      }}
      aria-label={direction === "prev" ? "Media anterior" : "Siguiente media"}
      className={
        "absolute top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center border backdrop-blur-md opacity-60 hover:opacity-100 transition-opacity duration-200 bg-ink/55 border-panel2 " +
        (direction === "prev" ? "left-3" : "right-3")
      }
    >
      {direction === "prev" ? <ChevronLeft size={16} className="text-paper" /> : <ChevronRight size={16} className="text-paper" />}
    </button>
  );
}

/* =========================================================
   MEDIA VIEWER
========================================================= */

function ProjectMedia({ media, accent, onOpen }) {
  const [selected, setSelected] = useState(0);
  const current = media && media[selected];
  const frameRef = useRef(null);

  const handleMouseMove = useCallback(function (e) {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 3;
    const rotateX = (0.5 - py) * 3;
    el.style.transform = "perspective(1100px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
    el.style.setProperty("--mx", px * 100 + "%");
    el.style.setProperty("--my", py * 100 + "%");
  }, []);

  const handleMouseLeave = useCallback(function () {
    const el = frameRef.current;
    if (!el) return;
    el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
  }, []);

  if (!media || media.length === 0) {
    return (
      <div className="relative aspect-16/10 rounded-xl overflow-hidden border border-panel2 bg-panel">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative h-full flex flex-col items-center justify-center text-muted">
          <ImagePlus size={24} strokeWidth={1.5} />
          <span className="mt-3 font-mono text-xs">Sin evidencia visual</span>
        </div>
      </div>
    );
  }

  const hasMultiple = media.length > 1;
  const goPrev = function () {
    setSelected(function (i) {
      return (i - 1 + media.length) % media.length;
    });
  };
  const goNext = function () {
    setSelected(function (i) {
      return (i + 1) % media.length;
    });
  };

  return (
    <div className="space-y-3">
      <div
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full aspect-video rounded-xl overflow-hidden border border-panel2 bg-ink flex items-center justify-center will-change-transform"
        style={{ transformStyle: "preserve-3d", transition: "transform 450ms cubic-bezier(0.22,1,0.36,1)" }}
      >
        {current.type === "video" ? (
          <video
            key={current.src}
            src={current.src}
            poster={current.poster}
            controls
            playsInline
            className="w-full h-full object-contain"
          />
        ) : (
          <button
            type="button"
            onClick={function () {
              onOpen(current, media, selected);
            }}
            className="group relative flex items-center justify-center w-full h-full"
          >
            <img
              key={current.src}
              src={current.src}
              alt={current.label || ""}
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "radial-gradient(300px circle at var(--mx,50%) var(--my,50%), " +
                  accentAlpha(accent, 0.08) +
                  ", transparent 70%)",
              }}
            />
          </button>
        )}

        {/* Botón Abrir — independiente del video, siempre visible (no
            solo en hover). Antes vivía DENTRO del mismo botón que
            capturaba el clic del video, así que reproducir y abrir el
            modal quedaban mezclados. Ahora el video tiene sus propios
            controles nativos (se reproduce ahí mismo, sin abrir nada),
            y este botón es la única forma de abrir el modal. */}
        <button
          type="button"
          onClick={function () {
            onOpen(current, media, selected);
          }}
          className="absolute top-3 left-3 z-20 flex items-center gap-2 px-3 py-2 rounded-md bg-ink/80 backdrop-blur-md border border-panel2 text-paper font-mono text-[12px] hover:border-accent-light/40 hover:bg-ink transition-colors"
        >
          <Maximize2 size={13} />
          Abrir
        </button>

        {hasMultiple && (
          <>
            <NavArrow direction="prev" onClick={goPrev} />
            <NavArrow direction="next" onClick={goNext} />
            <div className="absolute top-3 right-3 z-20 pointer-events-none">
              <span className="font-mono text-[11px] px-2 py-1 rounded-md bg-ink/60 border border-panel2 text-paper/80">
                {String(selected + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}
              </span>
            </div>
          </>
        )}
      </div>

      {media.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
          {media.map(function (item, index) {
            const active = index === selected;
            return (
              <button
                key={item.src + "-" + index}
                type="button"
                onClick={function () {
                  setSelected(index);
                }}
                className={
                  "relative shrink-0 w-20 h-14 overflow-hidden rounded-lg border transition-all duration-300 " +
                  (active ? "border-paper/50 scale-[1.02]" : "border-panel2 opacity-55 hover:opacity-100")
                }
                style={{ boxShadow: active ? "0 0 0 1px " + accentAlpha(accent, 0.35) : "none" }}
              >
                <img src={item.type === "video" ? item.poster : item.src} alt={item.label || ""} className="w-full h-full object-cover" />
                {item.type === "video" && (
                  <span className="absolute inset-0 flex items-center justify-center bg-ink/40">
                    <Play size={14} fill="currentColor" className="text-white" />
                  </span>
                )}
                {active && (
                  <span className="absolute left-0 right-0 bottom-0 h-0.5" style={{ background: "rgb(" + accent.rgb + ")" }} />
                )}
              </button>
            );
          })}
        </div>
      )}

      {current.label && (
        <div className="flex items-center justify-between gap-4 px-1">
          <span className="font-mono text-[11px] text-muted truncate">{current.label}</span>
          {media.length > 1 && (
            <span className="font-mono text-[11px] text-muted shrink-0">
              {String(selected + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   PROJECT
========================================================= */

function ProjectBlock({ project, index, accent, onOpen }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="grid grid-cols-[52px_1fr] gap-5">
        <div className="relative">
          <div className="sticky top-32 flex flex-col items-center">
            <span className={"font-mono text-sm font-medium " + accent.text}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mt-3 w-px h-12 bg-panel2" />
          </div>
        </div>

        <div className="rounded-2xl border border-panel2 bg-panel overflow-hidden">
          <div className="px-5 sm:px-7 pt-6 pb-5">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {project.period && <span className="font-mono text-[11px] text-muted">{project.period}</span>}
              {project.statusLabel && (
                <>
                  <span className="w-1 h-1 rounded-full bg-panel2" />
                  <span className={"font-mono text-[11px] " + accent.text}>{project.statusLabel}</span>
                </>
              )}
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <h4 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-paper">
                  {project.title}
                </h4>
                {project.description && (
                  <p className="mt-2 max-w-2xl text-sm text-muted leading-relaxed">{project.description}</p>
                )}
              </div>
              {project.domain && (
                <span className="font-mono text-[11px] text-muted uppercase tracking-wider shrink-0">
                  {project.domain}
                </span>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-0 border-t border-panel2">
            <div className="p-5 sm:p-7 border-b lg:border-b-0 lg:border-r border-panel2">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/65">Evidence</span>
                {project.media && project.media.length > 0 && (
                  <span className="font-mono text-[10px] text-muted">
                    {project.media.length} {project.media.length === 1 ? "asset" : "assets"}
                  </span>
                )}
              </div>
              <ProjectMedia media={project.media} accent={accent} onOpen={onOpen} />
            </div>

            <div className="p-5 sm:p-7">
              <div className="mb-7">
                <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-paper/85 font-medium">Contribution</span>
                <ul className="mt-5 space-y-4">
                  {project.did &&
                    project.did.map(function (item, itemIndex) {
                      return (
                        <li key={itemIndex} className="flex gap-3">
                          <span
                            className="mt-1.5 shrink-0 w-4 h-4 rounded-full border flex items-center justify-center"
                            style={{ borderColor: accentAlpha(accent, 0.35), background: accentAlpha(accent, 0.06) }}
                          >
                            <Check size={9} strokeWidth={3} className={accent.text} />
                          </span>
                          <span className="text-[15px] leading-relaxed text-paper/85">{item}</span>
                        </li>
                      );
                    })}
                </ul>
              </div>

              {project.stack && project.stack.length > 0 && (
                <div>
                  <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-paper/85 font-medium">Built with</span>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.stack.map(function (tech) {
                      return <TechChip key={tech} name={tech} />;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================
   COMPANY BLOCK
========================================================= */

function CompanyBlock({ job, index, accent }) {
  const [openMedia, setOpenMedia] = useState(null);
  const blockRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start 0.85", "end 0.4"],
  });

  return (
    <motion.div
      ref={blockRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="grid lg:grid-cols-[250px_1fr] gap-10 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center border"
              style={{ borderColor: accentAlpha(accent, 0.25), background: accentAlpha(accent, 0.06) }}
            >
              <Building2 size={17} className={accent.text} strokeWidth={1.6} />
            </div>
            <span className="font-mono text-[11px] text-muted">EXPERIENCE {String(index + 1).padStart(2, "0")}</span>
          </div>

          <h3 className="font-display text-2xl font-semibold text-paper tracking-tight">{job.company}</h3>
          <div className="mt-3 font-mono text-xs text-muted">{job.role}</div>

          <SignalRail progress={scrollYProgress} accent={accent} />

          <div className="mt-5 space-y-2.5">
            {job.period && (
              <div className="flex items-center gap-2 text-muted">
                <CalendarDays size={13} />
                <span className="font-mono text-[11px]">{job.period}</span>
              </div>
            )}
            {job.location && (
              <div className="flex items-center gap-2 text-muted">
                <MapPin size={13} />
                <span className="font-mono text-[11px]">{job.location}</span>
              </div>
            )}
          </div>

          <div className="mt-7 pt-5 border-t border-panel2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Systems / projects</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className={"font-display text-3xl font-semibold " + accent.text}>
                {String((job.projects && job.projects.length) || 0).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] text-muted">documented</span>
            </div>
          </div>
        </div>

        <div className="min-w-0">
          {job.description && (
            <div className="mb-10 max-w-3xl">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Context</span>
              <p className="mt-4 text-[15px] leading-7 text-paper/68">{job.description}</p>
            </div>
          )}

          <div className="space-y-8">
            {job.projects &&
              job.projects.map(function (project, projectIndex) {
                return (
                  <ProjectBlock
                    key={project.id || projectIndex}
                    project={project}
                    index={projectIndex}
                    accent={accent}
                    onOpen={function (media, allMedia, selectedIndex) {
                      setOpenMedia({ media: allMedia, selectedIndex: selectedIndex, project: project });
                    }}
                  />
                );
              })}
          </div>
        </div>
      </div>

      {openMedia && (
        <ExperienceMediaModal
          data={openMedia}
          onClose={function () {
            setOpenMedia(null);
          }}
        />
      )}
    </motion.div>
  );
}

/* =========================================================
   MEDIA MODAL
========================================================= */

function ExperienceMediaModal({ data, onClose }) {
  const media = data.media;
  const project = data.project;
  const [currentIndex, setCurrentIndex] = useState(data.selectedIndex || 0);
  const current = media && media[currentIndex];

  if (!current) return null;

  const hasMultiple = media.length > 1;
  const goPrev = function () {
    setCurrentIndex(function (i) {
      return (i - 1 + media.length) % media.length;
    });
  };
  const goNext = function () {
    setCurrentIndex(function (i) {
      return (i + 1) % media.length;
    });
  };

  return (
    <Modal onClose={onClose}>
      <div className="w-full">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Project evidence</div>
            <h3 className="mt-1 font-display text-lg font-semibold text-paper">{project && project.title}</h3>
          </div>
          <div className="font-mono text-xs text-muted">
            {String(currentIndex + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}
          </div>
        </div>

        <div className="relative rounded-xl overflow-hidden border border-panel2 bg-ink">
          {current.type === "video" ? (
            <video
              key={current.src + "-" + currentIndex}
              src={current.src}
              poster={current.poster}
              controls
              autoPlay
              playsInline
              className="block w-full max-h-[75vh] object-contain"
            />
          ) : (
            <img
              key={current.src + "-" + currentIndex}
              src={current.src}
              alt={current.label || (project && project.title) || ""}
              className="block w-full max-h-[75vh] object-contain"
            />
          )}

          {/* Flechas para pasar a la siguiente imagen sin cerrar el modal
              ni tener que usar solo las miniaturas de abajo. */}
          {hasMultiple && (
            <>
              <NavArrow direction="prev" onClick={goPrev} />
              <NavArrow direction="next" onClick={goNext} />
            </>
          )}
        </div>

        {media.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
            {media.map(function (item, index) {
              return (
                <button
                  key={item.src + "-modal-" + index}
                  type="button"
                  onClick={function () {
                    setCurrentIndex(index);
                  }}
                  className={
                    "relative shrink-0 w-24 h-16 rounded-lg overflow-hidden border transition-all " +
                    (index === currentIndex ? "border-paper/60" : "border-panel2 opacity-50 hover:opacity-100")
                  }
                >
                  <img src={item.type === "video" ? item.poster : item.src} alt={item.label || ""} className="w-full h-full object-cover" />
                  {item.type === "video" && (
                    <span className="absolute inset-0 flex items-center justify-center bg-ink/40">
                      <Play size={14} fill="currentColor" className="text-white" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {current.label && <p className="mt-3 font-mono text-[11px] text-muted">{current.label}</p>}
      </div>
    </Modal>
  );
}

/* =========================================================
   MAIN EXPERIENCE
========================================================= */

export default function Experience() {
  return (
    <section id="experiencia" className="relative max-w-360 mx-auto px-6 sm:px-10 py-32">
      <div className="relative">
        <div className="mb-20">
          <SectionHeader tag="SYS.03" title="Experiencia" />
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-muted">
            Experiencia construyendo sistemas reales, trabajando desde la arquitectura y el backend hasta las
            interfaces y la integracion de servicios.
          </p>
        </div>

        <div className="space-y-28">
          {experience.map(function (job, index) {
            return <CompanyBlock key={job.id || index} job={job} index={index} accent={ROTATION[index % ROTATION.length]} />;
          })}
        </div>
      </div>
    </section>
  );
}