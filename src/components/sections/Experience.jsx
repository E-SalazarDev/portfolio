import { useState } from "react";
import { Play, ImagePlus } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import Chip from "../ui/Chip";
import Modal from "../ui/Modal";
import { experience } from "../../data/experience";

export default function Experience() {
  const [openMedia, setOpenMedia] = useState(null);

  return (
    <section id="experiencia" className="max-w-360 mx-auto px-10 py-28">
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

            <div className="flex flex-col gap-4">
              {job.projects.map((p) => (
                <div
                  key={p.id}
                  className="bg-panel border border-white/10 rounded-xl p-5 transition-colors hover:border-accent/30"
                >
                  <div className="flex items-baseline gap-2.5 flex-wrap mb-2">
                    <h5 className="font-display text-[15px] font-semibold text-paper">{p.title}</h5>
                    {p.period && <span className="font-mono text-[10.5px] text-muted">{p.period}</span>}
                  </div>

                  <p className="text-sm text-muted leading-relaxed mb-3">{p.description}</p>

                  <ul className="mb-3 space-y-1.5">
                    {p.did.map((item, j) => (
                      <li key={j} className="relative pl-4 text-[13.5px] text-paper leading-relaxed">
                        <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px] shadow-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-2 mb-3">
                    {p.media && p.media.length > 0 ? (
                      p.media.map((m, i) => (
                        <button
                          key={i}
                          onClick={() => setOpenMedia(m)}
                          className="relative w-20 h-14 rounded-lg overflow-hidden border border-white/10 hover:border-accent/50 transition-colors"
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
                      ))
                    ) : (
                      <div
                        className="relative w-20 h-14 rounded-lg border border-dashed border-white/15 flex items-center justify-center text-muted"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(199,184,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(199,184,255,0.05) 1px, transparent 1px)",
                          backgroundSize: "10px 10px",
                        }}
                        title="Captura pendiente"
                      >
                        <ImagePlus size={16} />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
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