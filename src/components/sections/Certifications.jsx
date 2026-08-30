import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Award, FileText, ExternalLink } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import Modal from "../ui/Modal";
import { certifications } from "../../data/certifications";

const CARD_MAX_TILT = 5;

const ACCENTS = [
  { text: "text-accent-light", pill: "bg-accent/10 text-accent-light", ring: "hover:border-accent/50", line: "from-accent", rgb: "139,92,246" },
  { text: "text-mint", pill: "bg-mint/10 text-mint", ring: "hover:border-mint/50", line: "from-mint", rgb: "52,211,153" },
  { text: "text-amber", pill: "bg-amber/10 text-amber", ring: "hover:border-amber/50", line: "from-amber", rgb: "251,191,36" },
];

function groupByIssuer(list) {
  const order = [];
  const groups = {};
  list.forEach((cert) => {
    if (!groups[cert.issuer]) {
      groups[cert.issuer] = [];
      order.push(cert.issuer);
    }
    groups[cert.issuer].push(cert);
  });
  return order.map((issuer) => ({ issuer, items: groups[issuer] }));
}

function CertCard({ cert, accent, index, onOpen }) {
  const cardRef = useRef(null);

  const handleMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * CARD_MAX_TILT * 2;
    const rotateX = (0.5 - py) * CARD_MAX_TILT * 2;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  }, []);

  const handleLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  }, []);

  const handleClick = (e) => {
    if (cert.type === "credly") return;
    e.preventDefault();
    onOpen(cert);
  };

  return (
    <motion.a
      ref={cardRef}
      href={cert.file}
      target={cert.type === "credly" ? "_blank" : undefined}
      rel="noopener noreferrer"
      onClick={handleClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      title={cert.title}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex gap-3.5 items-start rounded-xl p-4 will-change-transform ${accent.ring}`}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 300ms cubic-bezier(0.22,1,0.36,1), border-color 300ms",
        background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 12px 28px -16px rgba(0,0,0,0.55)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(220px circle at var(--mx,50%) var(--my,50%), rgba(${accent.rgb},0.14), transparent 70%)`,
        }}
      />

      {cert.thumbnail ? (
        <img
          src={cert.thumbnail}
          alt=""
          style={{ transform: "translateZ(24px)" }}
          className="relative z-10 shrink-0 w-14 h-14 object-contain transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:z-30 hover:scale-[3] hover:-translate-y-4 hover:rotate-[-5deg] hover:drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)]"
        />
      ) : (
        <div
          style={{ transform: "translateZ(24px)" }}
          className={`relative z-10 shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-125 ${accent.pill}`}
        >
          {cert.type === "pdf" ? <FileText size={16} /> : <Award size={16} />}
        </div>
      )}
      <div className="relative z-10 min-w-0" style={{ transform: "translateZ(14px)" }}>
        <h4 className="font-display text-sm font-semibold text-paper mb-0.5 leading-snug line-clamp-2">
          {cert.title}
        </h4>
        <div className="text-xs text-muted mb-1.5 truncate">{cert.issuer}</div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-muted">{cert.date}</span>
          <span className={`font-mono text-[10.5px] flex items-center gap-1 ${accent.text}`}>
            {cert.type === "pdf" ? "Ver PDF" : cert.type === "credly" ? "Ver credencial" : "Ver imagen"}
            <ExternalLink size={10} />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function Certifications() {
  const [openCert, setOpenCert] = useState(null);
  const groups = groupByIssuer(certifications);

  return (
    <section
      id="certificaciones"
      className="relative max-w-360 mx-auto px-10 py-28"
      style={{ perspective: "1200px" }}
    >
      <div className="relative">
        <SectionHeader tag="SYS.04" title="Certificaciones" />

        <div className="flex flex-col gap-10">
          {groups.map((group, gi) => {
            const accent = ACCENTS[gi % ACCENTS.length];
            return (
              <div key={group.issuer}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-2.5 mb-4"
                >
                  <h3 className="font-display text-base font-semibold text-paper">{group.issuer}</h3>
                  <span className={`font-mono text-[10.5px] rounded-full px-2 py-0.5 ${accent.pill}`}>
                    {group.items.length}
                  </span>
                  <div className={`flex-1 h-px bg-gradient-to-r ${accent.line} via-white/10 to-transparent opacity-40`} />
                </motion.div>
                <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
                  {group.items.map((cert, i) => (
                    <CertCard key={cert.id} cert={cert} accent={accent} index={i} onOpen={setOpenCert} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
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