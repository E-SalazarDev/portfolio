import { MapPin, GraduationCap, Briefcase } from "lucide-react";
import IDBadge from "../ui/IDBadge";

export default function About() {
  return (
    <section id="sobre-mi" className="max-w-360 mx-auto px-10 py-24">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs tracking-widest text-accent-light border border-panel2 rounded-full px-4 py-2 mb-6 bg-accent/6">
            ◆ Sobre mi
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-paper leading-snug mb-5">
            Construyo software que digitaliza procesos reales.
          </h2>
          <p className="text-muted text-[15px] leading-relaxed max-w-xl">
            Soy José Eduardo Salazar. Ingeniero en TI (Tecnologias
            de la Informacion), enfocado en desarrollo full stack, en Tlaxcala, Mexico.
            Actualmente curso una maestria en Inteligencia Artificial, buscando llevar lo
            que construyo un paso mas alla del codigo, sistemas que tambien piensan.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-3 mt-7">
            <div className="flex items-center gap-2 text-sm text-paper">
              <MapPin size={15} className="text-accent-light" />
              Tlaxcala, Mexico - Remoto
            </div>
            <div className="flex items-center gap-2 text-sm text-paper">
              <GraduationCap size={15} className="text-accent-light" />
              Ingenieria en TI - Maestria en IA (en curso)
            </div>
            <div className="flex items-center gap-2 text-sm text-paper">
              <Briefcase size={15} className="text-accent-light" />
              Full Stack en Inode Technology
            </div>
          </div>

          <a
            href="#proyectos"
            className="inline-flex items-center gap-2 font-mono text-[13px] font-semibold text-ink bg-accent rounded-lg px-6 py-3 mt-8 shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-shadow"
          >
            Ver proyectos -&gt;
          </a>
        </div>

        <IDBadge photoSrc="/eduardo.jpg" />
      </div>
    </section>
  );
}