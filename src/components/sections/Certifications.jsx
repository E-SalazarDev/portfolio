import { Award } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import { certifications } from "../../data/certifications";

export default function Certifications() {
  return (
    <section id="certificaciones" className="max-w-[1180px] mx-auto px-10 py-28">
      <SectionHeader tag="SYS.04" title="Certificaciones" />
      <div className="grid gap-4.5 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="flex gap-4 items-start bg-panel border border-white/10 rounded-2xl p-5 transition-all hover:border-accent/50 hover:-translate-y-1"
          >
            <div className="flex-shrink-0 w-10.5 h-10.5 rounded-xl bg-accent/15 text-accent-light flex items-center justify-center">
              <Award size={18} />
            </div>
            <div>
              <h4 className="font-display text-[15.5px] font-semibold text-paper mb-1">{cert.title}</h4>
              <div className="text-[13px] text-muted mb-2">{cert.issuer}</div>
              <div className="flex justify-between items-center gap-3">
                <span className="font-mono text-[10.5px] text-muted">{cert.date}</span>
                <a href={cert.link} className="font-mono text-[11px] text-accent-light hover:underline">
                  Ver credencial →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
