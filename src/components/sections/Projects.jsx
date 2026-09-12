import { useState, useEffect } from "react";
import {
  Play,
  ExternalLink,
  Image as ImageIcon,
  Video,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import TechChip from "../ui/Techchip";
import { projects } from "../../data/projects";
import { ROTATION, accentAlpha } from "../../theme/tokens";

function SectionLabel({ title }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C4CAD4] mb-5">
      {title}
    </p>
  );
}

function ProjectItem({ project, index, active, onClick }) {
  const accent = ROTATION[index % ROTATION.length];

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full text-left transition-all duration-300 overflow-hidden"
      style={{
        background: active
          ? "linear-gradient(135deg, rgba(37,99,235,0.2) 0%, rgba(30,58,138,0.06) 100%)"
          : "linear-gradient(135deg, #1A1F2E 0%, #12161F 100%)",
        border: active
          ? "1px solid rgba(59,130,246,0.5)"
          : "1px solid rgba(255,255,255,0.1)",
        borderRadius: "16px",
        padding: "16px 18px",
        boxShadow: active
          ? "0 20px 40px -20px rgba(59,130,246,0.65), inset 0 1px 0 0 rgba(255,255,255,0.1)"
          : "0 4px 14px -8px rgba(0,0,0,0.6), inset 0 1px 0 0 rgba(255,255,255,0.04)",
        transform: active ? "translateX(4px)" : "translateX(0)",
      }}
    >
      {active && (
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 90% -20%, rgba(59,130,246,0.3) 0%, transparent 55%)",
          }}
        />
      )}

      <div className="relative flex items-center gap-4">
        <span
          className="shrink-0 text-[34px] leading-none font-black tracking-[-0.05em] transition-all duration-300"
          style={{
            color: active ? "rgb(" + accent.rgb + ")" : "transparent",
            WebkitTextStroke: active ? "0px" : "1.5px rgba(147,197,253,0.35)",
            WebkitTextFillColor: active
              ? "rgb(" + accent.rgb + ")"
              : "transparent",
            textShadow: active ? "0 0 20px " + accentAlpha(accent, 0.6) : "none",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span
          className="shrink-0 self-stretch w-px transition-colors duration-300"
          style={{
            background: active
              ? accentAlpha(accent, 0.4)
              : "rgba(255,255,255,0.08)",
          }}
        />

        <div className="min-w-0 flex-1">
          <div
            className={
              "text-[13.5px] font-semibold leading-tight tracking-[-0.01em] transition-colors duration-300 mb-1.5 " +
              (active
                ? "text-[#F5F6F7]"
                : "text-[#C4CAD4] group-hover:text-[#F5F6F7]")
            }
          >
            {project.title}
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className="w-1 h-1 rounded-full shrink-0 transition-all duration-300"
              style={{
                background: active
                  ? "rgb(" + accent.rgb + ")"
                  : "rgba(139,147,161,0.55)",
                boxShadow: active
                  ? "0 0 6px " + accentAlpha(accent, 0.9)
                  : "none",
              }}
            />
            <span
              className={
                "text-[9.5px] uppercase font-semibold tracking-[0.14em] truncate transition-colors duration-300 " +
                (active ? "text-[#93C5FD]" : "text-[#8B93A1]")
              }
            >
              {project.domain}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

function MediaThumb({ item, index, isActive, accent, onClick }) {
  const isVideo = item.type === "video";

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative rounded-lg overflow-hidden transition-all duration-300 text-left w-full"
      style={{
        outline: isActive
          ? "2px solid rgb(" + accent.rgb + ")"
          : "1px solid rgba(255,255,255,0.08)",
        outlineOffset: isActive ? "2px" : "0px",
        transform: isActive ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#08090C]">
        <img
          src={isVideo ? item.poster : item.src}
          alt={item.label || "Media " + (index + 1)}
          className="w-full h-full object-cover transition-all duration-500"
          style={{
            opacity: isActive ? 1 : 0.6,
            filter: isActive ? "brightness(1.05)" : "brightness(0.8)",
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

        {isActive && (
          <span
            className="absolute inset-x-0 bottom-0 h-1 transition-all duration-300"
            style={{
              background: "rgb(" + accent.rgb + ")",
              boxShadow: "0 -4px 12px " + accentAlpha(accent, 0.9),
            }}
          />
        )}
      </div>
    </button>
  );
}

function ProjectPreview({ project, current, media, mediaIndex, onPrev, onNext }) {
  const hasMultiple = media && media.length > 1;

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: "#0E1219",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow:
          "0 40px 80px -40px rgba(0,0,0,0.95), 0 0 80px -30px rgba(59,130,246,0.25)",
      }}
    >
      <div className="relative bg-[#08090C]">
        {current ? (
          current.type === "video" ? (
            <video
              key={current.src}
              src={current.src}
              poster={current.poster}
              controls
              playsInline
              className="block w-full aspect-video object-cover"
            />
          ) : (
            <img
              key={current.src}
              src={current.src}
              alt={current.label || project.title}
              className="block w-full aspect-video object-cover"
            />
          )
        ) : (
          <div className="aspect-video flex items-center justify-center">
            <div className="text-center">
              <Play size={28} className="mx-auto mb-3 text-[#8B93A1]" />
              <span className="text-xs text-[#8B93A1]">
                {project.demoLabel}
              </span>
            </div>
          </div>
        )}

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={onPrev}
              aria-label="Media anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: "rgba(245,246,247,0.95)",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 8px 24px -6px rgba(0,0,0,0.7)",
              }}
            >
              <ChevronLeft
                size={18}
                className="text-[#08090C]"
                strokeWidth={2.5}
              />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Siguiente media"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: "rgba(245,246,247,0.95)",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 8px 24px -6px rgba(0,0,0,0.7)",
              }}
            >
              <ChevronRight
                size={18}
                className="text-[#08090C]"
                strokeWidth={2.5}
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState(0);
  const [mediaIndex, setMediaIndex] = useState(0);

  const project = projects[active];
  const media = (project && project.media) || [];
  const current = media[mediaIndex];
  const accent = ROTATION[active % ROTATION.length];

  useEffect(
    function () {
      setMediaIndex(0);
    },
    [active]
  );

  if (!project) {
    return null;
  }

  const hasCode = project.links && project.links.code;
  const hasDemo = project.links && project.links.demo;
  const hasAnyLink = hasCode || hasDemo;

  const goPrev = function () {
    setMediaIndex(function (i) {
      return (i - 1 + media.length) % media.length;
    });
  };
  const goNext = function () {
    setMediaIndex(function (i) {
      return (i + 1) % media.length;
    });
  };

  return (
    <section
      id="proyectos"
      className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 py-16"
    >
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.025em] text-[#F5F6F7]">
          Proyectos
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[290px_minmax(0,1fr)] gap-6 lg:gap-7 items-start">
        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="flex flex-col gap-2.5">
            {projects.map(function (p, index) {
              return (
                <ProjectItem
                  key={p.id}
                  project={p}
                  index={index}
                  active={index === active}
                  onClick={function () {
                    setActive(index);
                  }}
                />
              );
            })}
          </div>
        </aside>

        <article className="min-w-0">
          <div className="mb-7 flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
            <div className="min-w-0">
              <h3 className="text-2xl md:text-[32px] font-bold tracking-[-0.025em] text-[#F5F6F7] leading-[1.1] mb-3">
                {project.title}
              </h3>
              <span
                className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold tracking-[0.1em] uppercase px-2.5 py-1 rounded-md"
                style={{
                  color: "rgb(" + accent.rgb + ")",
                  background: accentAlpha(accent, 0.12),
                  border: "1px solid " + accentAlpha(accent, 0.28),
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "rgb(" + accent.rgb + ")",
                    boxShadow: "0 0 6px " + accentAlpha(accent, 0.9),
                  }}
                />
                {project.domain}
              </span>
            </div>

            {hasAnyLink && (
              <div className="flex flex-wrap gap-2.5 shrink-0">
                {hasCode && (
                  <a
                    href={project.links.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 h-10 px-4 rounded-full overflow-hidden bg-[#F5F6F7] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_36px_-8px_rgba(147,197,253,0.55)]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#93C5FD] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <FaGithub size={13} className="relative z-10 text-[#08090C]" />
                    <span className="relative z-10 text-[12.5px] font-semibold tracking-[-0.01em] text-[#08090C]">
                      Código
                    </span>
                  </a>
                )}

                {hasDemo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 h-10 px-4 rounded-full bg-white/[0.06] border border-white/[0.12] backdrop-blur-md transition-all duration-300 hover:bg-white/[0.1] hover:border-white/[0.2] hover:scale-[1.03]"
                  >
                    <ExternalLink size={13} className="text-[#F5F6F7]" />
                    <span className="text-[12.5px] font-semibold tracking-[-0.01em] text-[#F5F6F7]">
                      Ver demo
                    </span>
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="mb-8">
            <div className="mb-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C4CAD4] whitespace-nowrap">
                Vista previa
              </span>
            </div>

            <ProjectPreview
              project={project}
              current={current}
              media={media}
              mediaIndex={mediaIndex}
              onPrev={goPrev}
              onNext={goNext}
            />

            {media.length > 1 && (
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5">
                {media.map(function (item, index) {
                  return (
                    <MediaThumb
                      key={(item.src || item.poster) + "-" + index}
                      item={item}
                      index={index}
                      isActive={index === mediaIndex}
                      accent={accent}
                      onClick={function () {
                        setMediaIndex(index);
                      }}
                    />
                  );
                })}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-8 pb-6">
            <div>
              <SectionLabel title="Aportes clave" />

              <ul className="flex flex-col gap-4">
                {project.did.map(function (item, index) {
                  return (
                    <li key={index} className="flex items-start gap-3.5">
                      <span
                        className="shrink-0 text-[13px] font-bold pt-0.5 w-6"
                        style={{ color: "rgb(" + accent.rgb + ")" }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[13.5px] text-[#D0D6E0] leading-relaxed">
                        {item}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <SectionLabel title="Tecnologías" />

              <div className="flex flex-wrap gap-2">
                {project.stack.map(function (stackItem) {
                  return <TechChip key={stackItem} name={stackItem} />;
                })}
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}