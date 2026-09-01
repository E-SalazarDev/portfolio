import { useState, useEffect } from "react";
import {
  Folder,
  Play,
  ExternalLink,
  Image as ImageIcon,
  Video,
  ArrowUpRight,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

import SectionHeader from "../ui/SectionHeader";
import Chip from "../ui/Chip";
import { projects } from "../../data/projects";
import { ROTATION, accentAlpha } from "../../theme/tokens";

const STATUS_STYLES = {
  live: "bg-mint/10 text-mint",
  build: "bg-amber/10 text-amber",
  academic: "bg-mint/10 text-mint",
};

const STATUS_DOT = {
  live: "bg-mint",
  build: "bg-amber",
  academic: "bg-mint",
};

function ProjectItem({ project, index, active, onClick }) {
  const accent = ROTATION[index % ROTATION.length];

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full text-left px-5 py-5 transition-all duration-300"
      style={{
        background: active
          ? "linear-gradient(90deg, " + accentAlpha(accent, 0.09) + ", " + accentAlpha(accent, 0.02) + ")"
          : "transparent",
      }}
    >
      <span
        aria-hidden
        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full transition-all duration-300"
        style={{
          background: active ? "rgb(" + accent.rgb + ")" : "transparent",
          boxShadow: active ? "0 0 12px " + accentAlpha(accent, 0.35) : "none",
        }}
      />

      <div className="flex items-start gap-4">
        <span
          className="font-mono text-sm pt-0.5 shrink-0 transition-colors duration-300"
          style={{ color: active ? "rgb(" + accent.rgb + ")" : "#4A4D57" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <div
            className={
              "font-display text-[16px] font-semibold leading-snug transition-colors duration-300 " +
              (active ? "text-paper" : "text-muted group-hover:text-paper")
            }
          >
            {project.title}
          </div>

          <div className="flex items-center gap-2 mt-2.5">
            <span
              className={
                "w-1.5 h-1.5 rounded-full shrink-0 " +
                (active ? STATUS_DOT[project.status] : "bg-panel2")
              }
            />
            <span className="font-mono text-[11px] tracking-wide text-muted">{project.domain}</span>
          </div>
        </div>

        <ArrowUpRight
          size={16}
          className={
            "shrink-0 mt-1 transition-all duration-300 " +
            (active
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0")
          }
          style={{ color: active ? "rgb(" + accent.rgb + ")" : undefined }}
        />
      </div>
    </button>
  );
}

function MediaSelector({ media, mediaIndex, setMediaIndex, accent }) {
  if (!media || media.length <= 1) {
    return null;
  }

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[13px] tracking-[0.16em] uppercase text-paper">Media</span>
        <span className="font-mono text-[13px] tracking-wide" style={{ color: accentAlpha(accent, 0.9) }}>
          {String(mediaIndex + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-panel2">
        {media.map(function (item, index) {
          const isActive = index === mediaIndex;
          const isVideo = item.type === "video";

          return (
            <button
              key={item.src + "-" + index}
              type="button"
              onClick={function () {
                setMediaIndex(index);
              }}
              className="group relative shrink-0 w-32 sm:w-40 md:w-44 lg:w-48 rounded-xl overflow-hidden border transition-all duration-300 snap-start"
              style={{
                borderColor: isActive ? accentAlpha(accent, 0.25) : "#1C2140",
                background: isActive ? accentAlpha(accent, 0.08) : "#12162A",
                transform: isActive ? "translateY(-2px)" : "translateY(0)",
              }}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                <img
                  src={isVideo ? item.poster : item.src}
                  alt={item.label || "Media " + (index + 1)}
                  className="w-full h-full object-cover opacity-65 group-hover:opacity-100 group-hover:scale-[1.025] transition-all duration-500"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{ background: isActive ? accentAlpha(accent, 0.08) : "rgba(5,7,15,0.45)" }}
                />
                <span className="absolute top-2.5 left-2.5 w-8 h-8 rounded-lg bg-ink/70 backdrop-blur-md border border-panel2 flex items-center justify-center">
                  {isVideo ? <Video size={14} className="text-paper" /> : <ImageIcon size={14} className="text-paper" />}
                </span>
                {isActive && (
                  <span
                    className="absolute right-2.5 top-2.5 w-2 h-2 rounded-full"
                    style={{ background: "rgb(" + accent.rgb + ")", boxShadow: "0 0 7px " + accentAlpha(accent, 0.45) }}
                  />
                )}
              </div>

              <div className="px-3 py-2.5 text-left">
                <span
                  className="font-mono text-[12px] font-medium"
                  style={{ color: isActive ? "rgb(" + accent.rgb + ")" : "#98A2C4" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProjectPreview({ project, current, accent }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden border"
      style={{ borderColor: "#1C2140", background: "rgba(5,7,15,0.5)", boxShadow: "0 25px 70px -40px rgba(0,0,0,0.9)" }}
    >
      <div className="relative z-10 flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: "#1C2140", background: "#12162A" }}>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-panel2" />
          <span className="w-2 h-2 rounded-full bg-panel2" />
          <span className="w-2 h-2 rounded-full bg-panel2" />
        </div>
        <div className="flex-1 h-6 rounded-md bg-panel2/40 border border-panel2" />
        <span className="hidden sm:block font-mono text-[11px] tracking-wide" style={{ color: accentAlpha(accent, 0.8) }}>
          {project.domain}
        </span>
      </div>

      <div className="relative bg-ink">
        {current ? (
          current.type === "video" ? (
            <video key={current.src} src={current.src} poster={current.poster} controls playsInline className="block w-full aspect-video object-cover" />
          ) : (
            <img key={current.src} src={current.src} alt={current.label || project.title} className="block w-full aspect-video object-cover" />
          )
        ) : (
          <div className="aspect-video flex items-center justify-center">
            <div className="text-center">
              <Play size={28} className="mx-auto mb-3 text-muted" />
              <span className="font-mono text-xs text-muted">{project.demoLabel}</span>
            </div>
          </div>
        )}

        {project.media && project.media.length > 1 && (
          <div className="absolute top-4 right-4 pointer-events-none">
            <div className="px-3 py-1.5 rounded-lg bg-ink/70 backdrop-blur-md border border-panel2">
              <span className="font-mono text-[13px] tracking-wide" style={{ color: accentAlpha(accent, 0.95) }}>
                {String(project.media.indexOf(current) + 1).padStart(2, "0")} / {String(project.media.length).padStart(2, "0")}
              </span>
            </div>
          </div>
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

  useEffect(function () {
    setMediaIndex(0);
  }, [active]);

  if (!project) {
    return null;
  }

  return (
    <section id="proyectos" className="relative max-w-360 mx-auto px-6 md:px-10 py-28 md:py-32">
      <div className="relative">
        <SectionHeader tag="SYS.02" title="Proyectos" />

        <div className="grid grid-cols-1 lg:grid-cols-[290px_minmax(0,1fr)] gap-8 lg:gap-12 items-start">
          <aside className="lg:sticky lg:top-28 h-fit">
            <div
              className="border border-panel2 rounded-2xl overflow-hidden"
              style={{ background: "linear-gradient(180deg, rgba(28,33,64,0.6), rgba(18,22,42,0.4))" }}
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b border-panel2">
                <Folder size={18} strokeWidth={1.7} className="text-paper" />
                <span className="font-mono text-[14px] tracking-wide text-paper">proyectos/</span>
              </div>
              <div>
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
            </div>

            <div className="hidden lg:flex items-center gap-3 mt-5 px-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "rgb(" + accent.rgb + ")" }} />
              <span className="font-mono text-[11px] tracking-wide text-muted">Selected project</span>
            </div>
          </aside>

          <article className="min-w-0 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-5 overscroll-contain scrollbar-thin scrollbar-thumb-panel2 scrollbar-track-transparent">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-5">
              <span className={"font-mono text-[12px] tracking-wide rounded-full px-3 py-1.5 " + STATUS_STYLES[project.status]}>
                {project.statusLabel}
              </span>
              <span className="font-mono text-[12px] tracking-wide text-muted">{project.domain}</span>
            </div>

            <div className="mb-8">
              <h3 className="font-display text-2xl md:text-[30px] font-semibold tracking-tight text-paper">{project.title}</h3>
              <p className="mt-2 font-mono text-[12px] text-muted">{project.domain}</p>
            </div>

            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[14px] tracking-[0.16em] uppercase text-paper">Project preview</span>
                {media.length > 1 && <span className="font-mono text-[12px] text-muted">{media.length} media</span>}
              </div>
              <ProjectPreview project={project} current={current} accent={accent} />
              <MediaSelector media={media} mediaIndex={mediaIndex} setMediaIndex={setMediaIndex} accent={accent} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_250px] gap-10 pb-8">
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-mono text-[14px] tracking-[0.18em] uppercase text-paper whitespace-nowrap">Overview</span>
                  <span className="h-px flex-1 bg-panel2" />
                </div>
                <ul className="space-y-4">
                  {project.did.map(function (item, index) {
                    return (
                      <li key={index} className="flex gap-4 text-[14px] md:text-[15px] text-paper/80 leading-relaxed">
                        <span className="font-mono text-[12px] pt-1.5 shrink-0" style={{ color: "rgb(" + accent.rgb + ")" }}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-mono text-[14px] tracking-[0.18em] uppercase text-paper whitespace-nowrap">Built with</span>
                  <span className="h-px flex-1 bg-panel2" />
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {project.stack.map(function (stackItem) {
                    return <Chip key={stackItem}>{stackItem}</Chip>;
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-2 pt-7 border-t border-panel2 pb-4">
              <a
                href={project.links.code}
                className="group flex items-center gap-2.5 font-mono text-[12px] text-paper border border-panel2 bg-panel rounded-lg px-5 py-3 transition-all duration-300 hover:bg-surface hover:border-accent-light/40"
              >
                <FaGithub size={14} />
                <span>Codigo</span>
                <ArrowUpRight size={13} className="opacity-40 group-hover:opacity-100 transition-opacity" />
              </a>

              {project.links.demo && (
                <a
                  href={project.links.demo}
                  className="group flex items-center gap-2.5 font-mono text-[12px] text-paper border border-panel2 bg-panel rounded-lg px-5 py-3 transition-all duration-300 hover:bg-surface hover:border-accent-light/40"
                >
                  <ExternalLink size={14} />
                  <span>Ver demo</span>
                  <ArrowUpRight size={13} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}