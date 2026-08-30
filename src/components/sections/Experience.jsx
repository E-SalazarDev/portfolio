import { useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Play,
  ImagePlus,
  Maximize2,
  Check,
  Building2,
  MapPin,
  CalendarDays,
  ExternalLink,
} from "lucide-react";

import SectionHeader from "../ui/SectionHeader";
import Chip from "../ui/Chip";
import Modal from "../ui/Modal";
import { experience } from "../../data/experience";

/* =========================================================
   VISUAL SYSTEM
========================================================= */

const ACCENTS = [
  {
    rgb: "139,92,246",
    text: "text-accent-light",
    border: "border-accent/50",
    soft: "rgba(139,92,246,0.10)",
    line: "from-accent/70",
  },
  {
    rgb: "52,211,153",
    text: "text-mint",
    border: "border-mint/50",
    soft: "rgba(52,211,153,0.08)",
    line: "from-mint/70",
  },
  {
    rgb: "251,191,36",
    text: "text-amber",
    border: "border-amber/50",
    soft: "rgba(251,191,36,0.08)",
    line: "from-amber/70",
  },
];

/* =========================================================
   MEDIA VIEWER
========================================================= */

function ProjectMedia({ media, accent, onOpen }) {
  const [selected, setSelected] = useState(0);

  const current = media?.[selected];

  const frameRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = frameRef.current;

    if (!el) return;

    const rect = el.getBoundingClientRect();

    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * 3;
    const rotateX = (0.5 - py) * 3;

    el.style.transform = `
      perspective(1100px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;

    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = frameRef.current;

    if (!el) return;

    el.style.transform = `
      perspective(1100px)
      rotateX(0deg)
      rotateY(0deg)
    `;
  }, []);

  /* -----------------------------------------
     NO MEDIA
  ----------------------------------------- */

  if (!media || media.length === 0) {
    return (
      <div className="relative aspect-16/10 rounded-xl overflow-hidden border border-white/8 bg-white/[0.018]">
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

          <span className="mt-3 font-mono text-xs">
            Sin evidencia visual
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* MAIN MEDIA */}

      <div
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-16/10 will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          transition:
            "transform 450ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <button
          type="button"
          onClick={() => onOpen(current, media, selected)}
          className="group relative block w-full h-full overflow-hidden rounded-xl border border-white/10 bg-black text-left"
        >
          {/* MEDIA */}

          {current.type === "video" ? (
            <video
              key={current.src}
              src={current.src}
              poster={current.poster}
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              key={current.src}
              src={current.src}
              alt={current.label || ""}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
            />
          )}

          {/* SUBTLE CONTRAST */}

          <span className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* HOVER LIGHT */}

          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(
                300px circle at var(--mx,50%) var(--my,50%),
                rgba(${accent.rgb},0.08),
                transparent 70%
              )`,
            }}
          />

          {/* VIDEO PLAY */}

          {current.type === "video" && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span
                className="w-14 h-14 rounded-full flex items-center justify-center border border-white/20 bg-black/45 backdrop-blur-md transition-transform duration-300 group-hover:scale-105"
              >
                <Play
                  size={18}
                  fill="currentColor"
                  className="text-white ml-0.5"
                />
              </span>
            </span>
          )}

          {/* OPEN */}

          <span className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-md bg-black/55 backdrop-blur-md border border-white/10 text-white/80 font-mono text-[11px] opacity-0 group-hover:opacity-100 transition-opacity">
            <Maximize2 size={12} />
            Abrir
          </span>
        </button>
      </div>

      {/* MEDIA INDEX */}

      {media.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
          {media.map((item, index) => {
            const active = index === selected;

            return (
              <button
                key={`${item.src}-${index}`}
                type="button"
                onClick={() => setSelected(index)}
                className={`relative shrink-0 w-20 h-14 overflow-hidden rounded-lg border transition-all duration-300 ${
                  active
                    ? "border-white/50 scale-[1.02]"
                    : "border-white/8 opacity-55 hover:opacity-100"
                }`}
                style={{
                  boxShadow: active
                    ? `0 0 0 1px rgba(${accent.rgb},0.35)`
                    : "none",
                }}
              >
                <img
                  src={
                    item.type === "video"
                      ? item.poster
                      : item.src
                  }
                  alt={item.label || ""}
                  className="w-full h-full object-cover"
                />

                {item.type === "video" && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <Play
                      size={14}
                      fill="currentColor"
                      className="text-white"
                    />
                  </span>
                )}

                {active && (
                  <span
                    className="absolute left-0 right-0 bottom-0 h-0.5"
                    style={{
                      background: `rgb(${accent.rgb})`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* MEDIA DESCRIPTION */}

      {current.label && (
        <div className="flex items-center justify-between gap-4 px-1">
          <span className="font-mono text-[11px] text-muted truncate">
            {current.label}
          </span>

          {media.length > 1 && (
            <span className="font-mono text-[11px] text-white/45 shrink-0">
              {String(selected + 1).padStart(2, "0")} /{" "}
              {String(media.length).padStart(2, "0")}
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

function ProjectBlock({
  project,
  index,
  accent,
  onOpen,
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      {/* PROJECT NUMBER */}

      <div className="grid grid-cols-[52px_1fr] gap-5">
        <div className="relative">
          <div
            className="sticky top-32 flex flex-col items-center"
          >
            <span
              className={`font-mono text-sm font-medium ${accent.text}`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="mt-3 w-px h-12 bg-white/10" />
          </div>
        </div>

        {/* PROJECT BODY */}

        <div
          className="rounded-2xl border border-white/8 bg-white/[0.018] overflow-hidden"
        >
          {/* PROJECT HEADER */}

          <div className="px-5 sm:px-7 pt-6 pb-5">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {project.period && (
                <span className="font-mono text-[11px] text-muted">
                  {project.period}
                </span>
              )}

              {project.statusLabel && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white/20" />

                  <span
                    className={`font-mono text-[11px] ${accent.text}`}
                  >
                    {project.statusLabel}
                  </span>
                </>
              )}
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <h4 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-paper">
                  {project.title}
                </h4>

                {project.description && (
                  <p className="mt-2 max-w-2xl text-sm text-muted leading-relaxed">
                    {project.description}
                  </p>
                )}
              </div>

              {project.domain && (
                <span className="font-mono text-[11px] text-white/40 uppercase tracking-wider shrink-0">
                  {project.domain}
                </span>
              )}
            </div>
          </div>

          {/* CONTENT */}

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-0 border-t border-white/[0.07]">
            {/* MEDIA */}

            <div className="p-5 sm:p-7 border-b lg:border-b-0 lg:border-r border-white/[0.07]">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/65">
                  Evidence
                </span>

                {project.media?.length > 0 && (
                  <span className="font-mono text-[10px] text-white/35">
                    {project.media.length}{" "}
                    {project.media.length === 1
                      ? "asset"
                      : "assets"}
                  </span>
                )}
              </div>

              <ProjectMedia
                media={project.media}
                accent={accent}
                onOpen={onOpen}
              />
            </div>

            {/* DETAILS */}

            <div className="p-5 sm:p-7">
              <div className="mb-7">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/65">
                  Contribution
                </span>

                <ul className="mt-5 space-y-4">
                  {project.did?.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex gap-3"
                    >
                      <span
                        className="mt-1.5 shrink-0 w-4 h-4 rounded-full border flex items-center justify-center"
                        style={{
                          borderColor: `rgba(${accent.rgb},0.35)`,
                          background: `rgba(${accent.rgb},0.06)`,
                        }}
                      >
                        <Check
                          size={9}
                          strokeWidth={3}
                          className={accent.text}
                        />
                      </span>

                      <span className="text-[13px] leading-relaxed text-white/72">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* STACK */}

              {project.stack?.length > 0 && (
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/65">
                    Built with
                  </span>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.stack.map((tech) => (
                      <Chip key={tech}>{tech}</Chip>
                    ))}
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      {/* COMPANY HEADER */}

      <div className="grid lg:grid-cols-[250px_1fr] gap-10 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center border"
              style={{
                borderColor: `rgba(${accent.rgb},0.25)`,
                background: `rgba(${accent.rgb},0.06)`,
              }}
            >
              <Building2
                size={17}
                className={accent.text}
                strokeWidth={1.6}
              />
            </div>

            <span className="font-mono text-[11px] text-white/35">
              EXPERIENCE {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="font-display text-2xl font-semibold text-paper tracking-tight">
            {job.company}
          </h3>

          <div className="mt-3 font-mono text-xs text-white/55">
            {job.role}
          </div>

          <div className="mt-5 space-y-2.5">
            {job.period && (
              <div className="flex items-center gap-2 text-white/40">
                <CalendarDays size={13} />

                <span className="font-mono text-[11px]">
                  {job.period}
                </span>
              </div>
            )}

            {job.location && (
              <div className="flex items-center gap-2 text-white/40">
                <MapPin size={13} />

                <span className="font-mono text-[11px]">
                  {job.location}
                </span>
              </div>
            )}
          </div>

          {/* PROJECT COUNT */}

          <div className="mt-7 pt-5 border-t border-white/[0.07]">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
              Systems / projects
            </span>

            <div className="mt-2 flex items-baseline gap-2">
              <span
                className={`font-display text-3xl font-semibold ${accent.text}`}
              >
                {String(job.projects?.length || 0).padStart(
                  2,
                  "0"
                )}
              </span>

              <span className="font-mono text-[10px] text-white/35">
                documented
              </span>
            </div>
          </div>
        </div>

        {/* PROJECTS */}

        <div className="min-w-0">
          {/* COMPANY CONTEXT */}

          {job.description && (
            <div className="mb-10 max-w-3xl">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
                Context
              </span>

              <p className="mt-4 text-[15px] leading-7 text-white/68">
                {job.description}
              </p>
            </div>
          )}

          {/* PROJECT LIST */}

          <div className="space-y-8">
            {job.projects?.map((project, projectIndex) => (
              <ProjectBlock
                key={project.id || projectIndex}
                project={project}
                index={projectIndex}
                accent={accent}
                onOpen={(media, allMedia, selectedIndex) =>
                  setOpenMedia({
                    media,
                    allMedia,
                    selectedIndex,
                    project,
                  })
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}

      {openMedia && (
        <ExperienceMediaModal
          data={openMedia}
          onClose={() => setOpenMedia(null)}
        />
      )}
    </motion.div>
  );
}

/* =========================================================
   MEDIA MODAL
========================================================= */

function ExperienceMediaModal({ data, onClose }) {
  const { media, selectedIndex, project } = data;

  const [currentIndex, setCurrentIndex] =
    useState(selectedIndex || 0);

  const current = media?.[currentIndex];

  if (!current) return null;

  return (
    <Modal onClose={onClose}>
      <div className="w-[min(1100px,92vw)]">
        {/* HEADER */}

        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
              Project evidence
            </div>

            <h3 className="mt-1 font-display text-lg font-semibold text-white">
              {project?.title}
            </h3>
          </div>

          <div className="font-mono text-xs text-white/45">
            {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(media.length).padStart(2, "0")}
          </div>
        </div>

        {/* MEDIA */}

        <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black">
          {current.type === "video" ? (
            <video
              key={`${current.src}-${currentIndex}`}
              src={current.src}
              poster={current.poster}
              controls
              autoPlay
              playsInline
              className="block w-full max-h-[75vh] object-contain"
            />
          ) : (
            <img
              key={`${current.src}-${currentIndex}`}
              src={current.src}
              alt={current.label || project?.title || ""}
              className="block w-full max-h-[75vh] object-contain"
            />
          )}
        </div>

        {/* GALLERY */}

        {media.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
            {media.map((item, index) => (
              <button
                key={`${item.src}-modal-${index}`}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`relative shrink-0 w-24 h-16 rounded-lg overflow-hidden border transition-all ${
                  index === currentIndex
                    ? "border-white/60"
                    : "border-white/10 opacity-50 hover:opacity-100"
                }`}
              >
                <img
                  src={
                    item.type === "video"
                      ? item.poster
                      : item.src
                  }
                  alt={item.label || ""}
                  className="w-full h-full object-cover"
                />

                {item.type === "video" && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <Play
                      size={14}
                      fill="currentColor"
                      className="text-white"
                    />
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {current.label && (
          <p className="mt-3 font-mono text-[11px] text-white/40">
            {current.label}
          </p>
        )}
      </div>
    </Modal>
  );
}

/* =========================================================
   MAIN EXPERIENCE
========================================================= */

export default function Experience() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.35"],
  });

  const lineScale = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 1]
  );

  return (
    <section
      id="experiencia"
      ref={sectionRef}
      className="relative max-w-360 mx-auto px-6 sm:px-10 py-32"
    >
      <div className="relative">
        {/* SECTION HEADER */}

        <div className="mb-20">
          <SectionHeader
            tag="SYS.03"
            title="Experiencia"
          />

          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/55">
            Experiencia construyendo sistemas reales,
            trabajando desde la arquitectura y el backend hasta
            las interfaces y la integración de servicios.
          </p>
        </div>

        {/* TIMELINE */}

        <div className="relative">
          {/* BASE LINE */}

          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.07] hidden xl:block" />

          {/* PROGRESS */}

          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-px hidden xl:block origin-top"
            style={{
              scaleY: lineScale,
              background:
                "linear-gradient(to bottom, rgba(139,92,246,0.75), rgba(52,211,153,0.55), rgba(251,191,36,0.45), transparent)",
            }}
          />

          <div className="space-y-28">
            {experience.map((job, index) => (
              <CompanyBlock
                key={job.id || index}
                job={job}
                index={index}
                accent={ACCENTS[index % ACCENTS.length]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}