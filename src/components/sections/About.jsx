import { MapPin, GraduationCap, Briefcase } from "lucide-react";

export default function About() {
  return (
    <section id="sobre-mi" className="max-w-[1440px] mx-auto px-10 py-24">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs tracking-widest text-accent-light border border-white/10 rounded-full px-4 py-2 mb-6 bg-accent/[0.06]">
            ◆ Sobre mí
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-paper leading-snug mb-5">
            Construyo software que digitaliza procesos reales.
          </h2>
          <p className="text-muted text-[15px] leading-relaxed max-w-xl">
            Soy José Eduardo Salazar — para los amigos, Eduardo. Ingeniero de software full
            stack en Tlaxcala, México. Construyo productos que hoy están en producción
            resolviendo problemas reales: desde reportar incidencias ciudadanas hasta
            gestionar inversiones fintech. Actualmente curso una maestría en Inteligencia
            Artificial, buscando llevar lo que construyo un paso más allá del código —
            sistemas que también piensan.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-3 mt-7">
            <div className="flex items-center gap-2 text-sm text-paper">
              <MapPin size={15} className="text-accent-light" />
              Tlaxcala, México · Remoto
            </div>
            <div className="flex items-center gap-2 text-sm text-paper">
              <GraduationCap size={15} className="text-accent-light" />
              Maestría en IA (en curso)
            </div>
            <div className="flex items-center gap-2 text-sm text-paper">
              <Briefcase size={15} className="text-accent-light" />
              Full Stack @ Inode Technology
            </div>
          </div>

          <a
            href="#proyectos"
            className="inline-flex items-center gap-2 font-mono text-[13px] font-semibold text-ink bg-accent rounded-lg px-6 py-3 mt-8 shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-shadow"
          >
            Ver proyectos →
          </a>
        </div>

        <div className="relative mx-auto w-56 md:w-full">
          <div className="absolute -inset-5 bg-accent/25 rounded-[36px] blur-2xl" />
          <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden border border-white/15 shadow-2xl">
            <img
              src="/eduardo.jpg"
              alt="José Eduardo Salazar Tecuapacho"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}