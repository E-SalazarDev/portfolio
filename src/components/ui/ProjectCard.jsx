import { Play, ExternalLink, Video } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Chip from "./Chip";

const STATUS_STYLES = {
  live: "bg-mint/10 text-mint",
  build: "bg-amber/10 text-amber",
  academic: "bg-mint/10 text-mint",
};

export default function ProjectCard({ project }) {
  const { statusLabel, status, domain, title, demoLabel, did, stack, links } = project;

  return (
    <div className="group relative rounded-[18px] border border-white/10 bg-linear-to-br from-accent/[0.07] to-white/1.5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/20">
      <div className="absolute top-0 inset-x-0 h-0.75 bg-linear-to-r from-accent to-transparent" />

      <div className="px-6 pt-6">
        <div className="flex justify-between items-start mb-4">
          <span className={`font-mono text-[11px] tracking-wide rounded-full px-2.5 py-1 ${STATUS_STYLES[status]}`}>
            {statusLabel}
          </span>
          <span className="font-mono text-[11px] text-muted">{domain}</span>
        </div>
        <h3 className="font-display text-2xl font-semibold text-paper mb-4">{title}</h3>
      </div>

      <div className="mx-6 mb-5 rounded-xl overflow-hidden border border-white/10 shadow-lg">
        <div className="flex items-center gap-1.5 bg-panel2 px-3 py-2 border-b border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
          <div className="flex-1 h-4 rounded bg-white/5 ml-2" />
        </div>
        <div
          className="relative aspect-video flex items-center justify-center bg-linear-to-br from-accent/35 via-panel2 to-ink overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(199,184,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(199,184,255,0.06) 1px, transparent 1px), radial-gradient(circle at 30% 25%, rgba(139,92,246,0.35), transparent 55%)",
            backgroundSize: "28px 28px, 28px 28px, 100% 100%",
          }}
        >
          <button
            className="relative z-10 w-12 h-12 rounded-full bg-black/40 border border-white/25 backdrop-blur-sm flex items-center justify-center transition-all group-hover:bg-accent group-hover:scale-110"
            aria-label={`Ver demo de ${title}`}
          >
            <Play size={16} className="text-paper ml-0.5" fill="currentColor" />
          </button>
          <span className="absolute bottom-2.5 left-3 font-mono text-[10.5px] text-paper bg-black/50 px-2 py-0.5 rounded">
            {demoLabel}
          </span>
        </div>
      </div>

      <ul className="mx-6 mb-5 space-y-2">
        {did.map((item, i) => (
          <li key={i} className="relative pl-4 text-sm text-paper leading-relaxed">
            <span className="absolute left-0 top-1.75 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_var(--tw-shadow-color)] shadow-accent" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mx-6 mb-6 flex flex-wrap gap-2">
        {stack.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>

      <div className="mx-6 mb-6 flex gap-2.5">
        <a href={links.code} className="flex-1 flex items-center justify-center gap-1.5 font-mono text-[11.5px] text-paper border border-white/10 bg-white/3 rounded-lg py-2.5 transition-colors hover:text-accent-light hover:border-accent hover:bg-accent/10">
          <FaGithub size={13} /> Código
        </a>
        <a href={links.demo} className="flex-1 flex items-center justify-center gap-1.5 font-mono text-[11.5px] text-paper border border-white/10 bg-white/3 rounded-lg py-2.5 transition-colors hover:text-accent-light hover:border-accent hover:bg-accent/10">
          <ExternalLink size={13} /> Demo
        </a>
        <a href={links.video} className="flex-1 flex items-center justify-center gap-1.5 font-mono text-[11.5px] text-paper border border-white/10 bg-white/3 rounded-lg py-2.5 transition-colors hover:text-accent-light hover:border-accent hover:bg-accent/10">
          <Video size={13} /> Video
        </a>
      </div>
    </div>
  );
}