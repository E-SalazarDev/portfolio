import { useState } from "react";
import { Award, FileText, ExternalLink } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import Modal from "../ui/Modal";
import { certifications } from "../../data/certifications";

export default function Certifications() {
  const [openCert, setOpenCert] = useState(null);

  const handleClick = (e, cert) => {
    if (cert.type === "credly") return;
    e.preventDefault();
    setOpenCert(cert);
  };

  return (
    <section id="certificaciones" className="max-w-295 mx-auto px-10 py-28">
      <SectionHeader tag="SYS.04" title="Certificaciones" />

      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
        {certifications.map((cert) => (
          <a
            key={cert.id}
            href={cert.file}
            target={cert.type === "credly" ? "_blank" : undefined}
            rel="noopener noreferrer"
            onClick={(e) => handleClick(e, cert)}
            className="group relative flex gap-3.5 items-start bg-panel border border-white/10 rounded-xl p-4 transition-all duration-300 hover:z-30 hover:border-accent/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10 cursor-pointer"
          >
            {cert.thumbnail ? (
              <img
                src={cert.thumbnail}
                alt=""
                className="relative z-10 shrink-0 w-14 h-14 object-contain transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[3] group-hover:-translate-y-4 group-hover:rotate-[-5deg] group-hover:drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)]"
              />
            ) : (
              <div className="shrink-0 w-9 h-9 rounded-lg bg-accent/15 text-accent-light flex items-center justify-center">
                {cert.type === "pdf" ? <FileText size={16} /> : <Award size={16} />}
              </div>
            )}
            <div className="min-w-0">
              <h4 className="font-display text-sm font-semibold text-paper mb-0.5 truncate">{cert.title}</h4>
              <div className="text-xs text-muted mb-1.5 truncate">{cert.issuer}</div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-muted">{cert.date}</span>
                <span className="font-mono text-[10.5px] text-accent-light flex items-center gap-1">
                  {cert.type === "pdf" ? "Ver PDF" : cert.type === "credly" ? "Ver credencial" : "Ver imagen"}
                  <ExternalLink size={10} />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {openCert && (
        <Modal onClose={() => setOpenCert(null)}>
          {openCert.type === "image" ? (
            <img
              src={openCert.file}
              alt={openCert.title}
              className="max-h-[75vh] w-auto mx-auto rounded-lg"
            />
          ) : (
            <iframe
              src={openCert.file}
              title={openCert.title}
              className="w-full h-[75vh] rounded-lg"
            />
          )}
        </Modal>
      )}
    </section>
  );
}