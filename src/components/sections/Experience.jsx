import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Play,
  ImagePlus,
  Maximize2,
  Building2,
  MapPin,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Video,
  Image as ImageIcon,
} from "lucide-react";

import TechChip from "../ui/Techchip";
import Modal from "../ui/Modal";
import { experience } from "../../data/experience";
import { ROTATION, accentAlpha } from "../../theme/tokens";

function NavArrow({ direction, onClick, large }) {
  const size = large ? "w-12 h-12" : "w-11 h-11";
  const iconSize = large ? 20 : 18;
  return (
    <button
      type="button"
      onClick={function (e) {
        e.stopPropagation();
        onClick();
      }}
      aria-label={direction === "prev" ? "Anterior" : "Siguiente"}
      className={
        "absolute top-1/2 -translate-y-1/2 z-20 " +
        size +
        " rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 " +
        (direction === "prev" ? "left-3" : "right-3")
      }
      style={{
        background: "rgba(245,246,247,0.95)",
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow: "0 8px 24px -6px rgba(0,0,0,0.7)",
      }}
    >
      {direction === "prev" ? (
        <ChevronLeft size={iconSize} className="text-[#08090C]" strokeWidth={2.5} />
      ) : (
        <ChevronRight size={iconSize} className="text-[#08090C]" strokeWidth={2.5} />
      )}
    </button>
  );
}

function SignalRail({ progress, accent }) {
  const glowY = useTransform(progress, [0, 1], ["-60%", "160%"]);

  return (
    <div className="mt-6 flex justify-start">
      <div
        className="relative w-[3px] h-16 overflow-hidden rounded-full"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        <motion.div
          className="absolute inset-x-0 top-0 rounded-full"
          style={{
            height: "45%",
            y: glowY,
            background:
              "linear-gradient(to bottom, transparent, rgb(" +
              accent.rgb +
              "), transparent)",
            boxShadow: "0 0 10px " + accentAlpha(accent, 0.7),
          }}
        />
      </div>
    </div>
  );
}

function SectionLabel({ title }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C4CAD4] mb-5">
      {title}
    </p>
  );
}

function ProjectMedia({ media, accent, onOpen }) {
  const [selected, setSelected] = useState(0);
  const current = media && media[selected];

  if (!media || media.length === 0) {
    return (
      <div
        className="rounded-xl flex items-center gap-4 px-5 py-5"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span
          className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg"
          style={{
            background: accentAlpha(accent, 0.12),
            border: "1px solid " + accentAlpha(accent, 0.25),
          }}
        >
          <ImagePlus
            size={16}
            strokeWidth={1.8}
            style={{ color: "rgb(" + accent.rgb + ")" }}
          />
        </span>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-[#F5F6F7] leading-tight">
            Sin evidencia visual
          </p>
          <p className="text-[12px] text-[#A2AAB8] mt-0.5">
            Documentado en código y pruebas.
          </p>
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
    <div>
      <div
        className="relative w-full aspect-video rounded-xl overflow-hidden flex items-center justify-center"
        style={{
          background: "#05070B",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
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
          </button>
        )}

        <button
          type="button"
          onClick={function () {
            onOpen(current, media, selected);
          }}
          className="absolute top-3 left-3 z-20 flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-semibold tracking-tight transition-all duration-300 hover:scale-[1.03]"
          style={{
            background: "rgba(245,246,247,0.95)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#08090C",
            boxShadow: "0 8px 24px -6px rgba(0,0,0,0.7)",
          }}
        >
          <Maximize2 size={13} />
          Abrir
        </button>

        {hasMultiple && (
          <>
            <NavArrow direction="prev" onClick={goPrev} />
            <NavArrow direction="next" onClick={goNext} />
          </>
        )}
      </div>

      {(media.length > 1 || current.label) && (
        <div>
          {media.length > 1 && (
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {media.map(function (item, index) {
                const active = index === selected;
                const isVideo = item.type === "video";
                return (
                  <button
                    key={item.src + "-" + index}
                    type="button"
                    onClick={function () {
                      setSelected(index);
                    }}
                    className="group relative overflow-hidden rounded-lg transition-all duration-300 text-left w-full"
                    style={{
                      aspectRatio: "16 / 10",
                      outline: active
                        ? "2px solid rgb(" + accent.rgb + ")"
                        : "1px solid rgba(255,255,255,0.08)",
                      outlineOffset: active ? "2px" : "0px",
                      transform: active ? "translateY(-2px)" : "translateY(0)",
                    }}
                  >
                    <img
                      src={isVideo ? item.poster : item.src}
                      alt={item.label || ""}
                      className="w-full h-full object-cover transition-all duration-500"
                      style={{
                        opacity: active ? 1 : 0.55,
                        filter: active ? "brightness(1.05)" : "brightness(0.75)",
                      }}
                    />

                    <span
                      className="absolute top-2 left-2 w-7 h-7 rounded-md flex items-center justify-center backdrop-blur-md"
                      style={{
                        background: "rgba(8,9,12,0.8)",
                        border: "1px solid rgba(255,255,255,0.15)",
                      }}
                    >
                      {isVideo ? (
                        <Video size={13} className="text-[#93C5FD]" />
                      ) : (
                        <ImageIcon size={13} className="text-[#93C5FD]" />
                      )}
                    </span>

                    {active && (
                      <span
                        className="absolute inset-x-0 bottom-0 h-1"
                        style={{
                          background: "rgb(" + accent.rgb + ")",
                          boxShadow: "0 -4px 12px " + accentAlpha(accent, 0.9),
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {current.label && (
            <p className="text-[11.5px] text-[#A2AAB8] mt-3">
              {current.label}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function ProjectBlock({ project, accent, onOpen }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "#0E1219",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="px-6 sm:px-8 pt-7 pb-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div className="min-w-0">
              <h4 className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-[#F5F6F7]">
                {project.title}
              </h4>
              {project.description && (
                <p className="mt-2.5 max-w-2xl text-[14px] text-[#A2AAB8] leading-relaxed">
                  {project.description}
                </p>
              )}
            </div>
            {project.domain && (
              <span
                className="text-[10.5px] font-semibold uppercase tracking-[0.14em] shrink-0 px-2.5 py-1 rounded-md"
                style={{
                  color: "rgb(" + accent.rgb + ")",
                  background: accentAlpha(accent, 0.12),
                  border: "1px solid " + accentAlpha(accent, 0.28),
                }}
              >
                {project.domain}
              </span>
            )}
          </div>
        </div>

        <div
          className="p-6 sm:p-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <SectionLabel title="Evidencia" />
          <ProjectMedia media={project.media} accent={accent} onOpen={onOpen} />
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="p-6 sm:p-8"
            style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
          >
            <SectionLabel title="Aportación" />
            <ul className="flex flex-col gap-4">
              {project.did &&
                project.did.map(function (item, itemIndex) {
                  return (
                    <li key={itemIndex} className="flex items-start gap-3.5">
                      <span
                        className="shrink-0 text-[13px] font-bold pt-0.5 w-6"
                        style={{ color: "rgb(" + accent.rgb + ")" }}
                      >
                        {String(itemIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[13.5px] text-[#D0D6E0] leading-relaxed">
                        {item}
                      </span>
                    </li>
                  );
                })}
            </ul>
          </div>

          <div className="p-6 sm:p-8">
            {project.stack && project.stack.length > 0 && (
              <div>
                <SectionLabel title="Tecnologías" />
                <div className="flex flex-wrap gap-2">
                  {project.stack.map(function (tech) {
                    return <TechChip key={tech} name={tech} />;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function CompanyBlock({ job, index, accent }) {
  const [openMedia, setOpenMedia] = useState(null);
  const blockRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start 0.85", "end 0.4"],
  });

  const projectsCount = (job.projects && job.projects.length) || 0;

  return (
    <motion.div
      ref={blockRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="grid lg:grid-cols-[260px_1fr] gap-10 lg:gap-14 items-start">
        <div className="lg:sticky lg:top-28">
          <div
            className="rounded-2xl p-5"
            style={{
              background: "#0E1219",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: accentAlpha(accent, 0.12),
                  border: "1px solid " + accentAlpha(accent, 0.28),
                }}
              >
                <Building2
                  size={16}
                  strokeWidth={1.8}
                  style={{ color: "rgb(" + accent.rgb + ")" }}
                />
              </div>
              <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#C4CAD4]">
                Empresa {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="text-[20px] font-bold tracking-[-0.02em] text-[#F5F6F7] leading-tight">
              {job.company}
            </h3>
            <p className="mt-1.5 text-[12.5px] text-[#A2AAB8] font-medium">
              {job.role}
            </p>

            <SignalRail progress={scrollYProgress} accent={accent} />

            <div className="mt-5 space-y-3">
              {job.period && (
                <div className="flex items-center gap-2.5">
                  <span
                    className="shrink-0 flex items-center justify-center w-6 h-6 rounded-md"
                    style={{
                      background: accentAlpha(accent, 0.12),
                      border: "1px solid " + accentAlpha(accent, 0.25),
                    }}
                  >
                    <CalendarDays
                      size={11}
                      style={{ color: "rgb(" + accent.rgb + ")" }}
                    />
                  </span>
                  <span className="text-[12.5px] text-[#E4E8EE] font-medium">
                    {job.period}
                  </span>
                </div>
              )}
              {job.location && (
                <div className="flex items-center gap-2.5">
                  <span
                    className="shrink-0 flex items-center justify-center w-6 h-6 rounded-md"
                    style={{
                      background: accentAlpha(accent, 0.12),
                      border: "1px solid " + accentAlpha(accent, 0.25),
                    }}
                  >
                    <MapPin
                      size={11}
                      style={{ color: "rgb(" + accent.rgb + ")" }}
                    />
                  </span>
                  <span className="text-[12.5px] text-[#E4E8EE] font-medium">
                    {job.location}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-5 pt-4">
              <div className="flex items-baseline gap-2">
                <span
                  className="text-[32px] font-black leading-none tracking-[-0.04em]"
                  style={{ color: "rgb(" + accent.rgb + ")" }}
                >
                  {String(projectsCount).padStart(2, "0")}
                </span>
                <span className="text-[11px] text-[#A2AAB8] font-medium uppercase tracking-[0.12em]">
                  {projectsCount === 1 ? "proyecto" : "proyectos"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0">
          {job.description && (
            <div className="mb-8 max-w-3xl">
              <p className="text-[15px] leading-7 text-[#D0D6E0]">
                {job.description}
              </p>
            </div>
          )}

          <div className="space-y-6">
            {job.projects &&
              job.projects.map(function (project, projectIndex) {
                return (
                  <ProjectBlock
                    key={project.id || projectIndex}
                    project={project}
                    accent={accent}
                    onOpen={function (media, allMedia, selectedIndex) {
                      setOpenMedia({
                        media: allMedia,
                        selectedIndex: selectedIndex,
                        project: project,
                      });
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
        <div className="mb-5">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#C4CAD4]">
            Evidencia del proyecto
          </p>
          <h3 className="mt-1.5 text-lg font-bold tracking-[-0.02em] text-[#F5F6F7]">
            {project && project.title}
          </h3>
        </div>

        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            background: "#05070B",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
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

          {hasMultiple && (
            <>
              <NavArrow direction="prev" onClick={goPrev} large />
              <NavArrow direction="next" onClick={goNext} large />
            </>
          )}
        </div>

        {media.length > 1 && (
          <div className="mt-5 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-2.5">
            {media.map(function (item, index) {
              const active = index === currentIndex;
              const isVideo = item.type === "video";
              return (
                <button
                  key={item.src + "-modal-" + index}
                  type="button"
                  onClick={function () {
                    setCurrentIndex(index);
                  }}
                  className="group relative overflow-hidden rounded-lg transition-all duration-300 text-left w-full"
                  style={{
                    aspectRatio: "16 / 10",
                    outline: active
                      ? "2px solid rgb(59,130,246)"
                      : "1px solid rgba(255,255,255,0.08)",
                    outlineOffset: active ? "2px" : "0px",
                    transform: active ? "translateY(-2px)" : "translateY(0)",
                  }}
                >
                  <img
                    src={isVideo ? item.poster : item.src}
                    alt={item.label || ""}
                    className="w-full h-full object-cover transition-all duration-500"
                    style={{
                      opacity: active ? 1 : 0.55,
                      filter: active ? "brightness(1.05)" : "brightness(0.75)",
                    }}
                  />

                  <span
                    className="absolute top-1.5 left-1.5 w-6 h-6 rounded-md flex items-center justify-center backdrop-blur-md"
                    style={{
                      background: "rgba(8,9,12,0.8)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    {isVideo ? (
                      <Video size={11} className="text-[#93C5FD]" />
                    ) : (
                      <ImageIcon size={11} className="text-[#93C5FD]" />
                    )}
                  </span>

                  {active && (
                    <span
                      className="absolute inset-x-0 bottom-0 h-1"
                      style={{
                        background: "rgb(59,130,246)",
                        boxShadow: "0 -4px 12px rgba(59,130,246,0.9)",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {current.label && (
          <p className="mt-3 text-[11.5px] text-[#A2AAB8]">{current.label}</p>
        )}
      </div>
    </Modal>
  );
}

export default function Experience() {
  return (
    <section
      id="experiencia"
      className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 py-20"
    >
      <div className="relative">
        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.025em] text-[#F5F6F7]">
            Experiencia
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#A2AAB8]">
            Trayectoria construyendo sistemas reales, desde la arquitectura y
            el backend hasta las interfaces y la integración de servicios.
          </p>
        </div>

        <div className="space-y-24">
          {experience.map(function (job, index) {
            return (
              <CompanyBlock
                key={job.id || index}
                job={job}
                index={index}
                accent={ROTATION[index % ROTATION.length]}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}