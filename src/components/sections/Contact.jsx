import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <>
      <section id="contacto" className="max-w-295 mx-auto px-10 py-28">
        <div className="text-center bg-linear-to-br from-panel to-panel2 border border-white/10 rounded-[20px] px-12 py-16">
          <span className="inline-flex items-center gap-2 text-xs tracking-widest text-accent-light border border-white/10 bg-accent/6 rounded-full px-4 py-1.5 mb-5">
            ◆ Transmisión abierta
          </span>
          <h2 className="font-display text-4xl font-semibold text-paper mb-4">
            ¿Construimos algo juntos?
          </h2>
          <p className="text-muted mb-8">
            Abierto a roles remotos, full stack o aplicados a IA.
          </p>
          <div className="flex gap-3.5 flex-wrap justify-center">
            <a
              href="mailto:tu@email.com"
              className="flex items-center gap-2 font-mono text-[13px] font-semibold text-ink bg-accent rounded-lg px-6 py-3.5 shadow-lg shadow-accent/30 transition-shadow hover:shadow-accent/50"
            >
              <Mail size={14} /> Escribir por correo
            </a>
            <a
              href="https://linkedin.com/in/tu-usuario"
              className="flex items-center gap-2 font-mono text-[13px] text-paper border border-white/10 rounded-lg px-6 py-3.5 transition-colors hover:border-accent-light hover:text-accent-light"
            >
              <FaLinkedin size={14} /> LinkedIn
            </a>
            <a
              href="https://github.com/E-SalazarDev"
              className="flex items-center gap-2 font-mono text-[13px] text-paper border border-white/10 rounded-lg px-6 py-3.5 transition-colors hover:border-accent-light hover:text-accent-light"
            >
              <FaGithub size={14} /> GitHub
            </a>
          </div>
        </div>
      </section>
      <footer className="text-center py-10 text-muted text-xs font-mono">
        © 2026 J. EDUARDO SALAZAR TECUAPACHO — TLAXCALA, MX
      </footer>
    </>
  );
}
