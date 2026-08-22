import SectionHeader from "../ui/SectionHeader";
import Chip from "../ui/Chip";
import { experience } from "../../data/experience";

export default function Experience() {
  return (
    <section id="experiencia" className="max-w-295 mx-auto px-10 py-28">
      <SectionHeader tag="SYS.03" title="Experiencia en empresas" />
      <div className="relative">
        <div className="absolute left-1.75 top-2 bottom-2 w-px bg-white/10" />

        {experience.map((job, i) => (
          <div key={job.id} className="relative pl-10 pb-12 last:pb-0">
            <span className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-panel border-2 border-accent shadow-[0_0_10px] shadow-accent/60" />

            <div className="font-mono text-xs text-muted mb-2">
              {job.period === "—" ? (
                <span className="italic text-muted/70">Fechas por confirmar</span>
              ) : (
                job.period
              )}
            </div>
            <div className="flex items-baseline gap-2.5 flex-wrap mb-2">
              <h4 className="font-display text-lg font-semibold text-paper">{job.company}</h4>
              <span className="text-sm text-accent-light">{job.role}</span>
            </div>
            <ul className="my-3 space-y-1.5">
              {job.did.map((item, j) => (
                <li key={j} className="relative pl-4 text-sm text-paper leading-relaxed">
                  <span className="absolute left-0 top-[7px] w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px] shadow-accent" />
                  {item}
                </li>
              ))}
            </ul>
            {job.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <Chip key={tag}>{tag}</Chip>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}