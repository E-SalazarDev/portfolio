import SectionHeader from "../ui/SectionHeader";
import Chip from "../ui/Chip";
import { experience } from "../../data/experience";

export default function Experience() {
  return (
    <section id="experiencia" className="max-w-[1180px] mx-auto px-10 py-28">
      <SectionHeader tag="SYS.03" title="Experiencia en empresas" />
      <div className="flex flex-col">
        {experience.map((job, i) => (
          <div
            key={job.id}
            className={`grid grid-cols-[180px_1fr] gap-7 py-8 ${
              i !== experience.length - 1 ? "border-b border-white/10" : ""
            } ${i === 0 ? "pt-0" : ""}`}
          >
            <div className="font-mono text-xs text-muted pt-1">{job.period}</div>
            <div>
              <div className="flex items-baseline gap-2.5 flex-wrap mb-1.5">
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
          </div>
        ))}
      </div>
    </section>
  );
}
