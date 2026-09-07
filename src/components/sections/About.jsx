import { MapPin, GraduationCap, Briefcase } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import IDBadge from "../ui/IDBadge";

export default function About() {
  return (
    <section id="sobre-mi" className="max-w-360 mx-auto px-10 py-24">
      <SectionHeader tag="SYS.00" title="Sobre mi" />

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-14 items-start">
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-paper leading-snug mb-5">
            Construyo software que digitaliza procesos reales.
          </h2>
         <p className="text-muted text-[15px] leading-relaxed max-w-xl"> 
          Soy José Eduardo Salazar, Ingeniero en Tecnologías de la Información, 
          especializado en desarrollo Backend y actualmente cursando una Maestría en Inteligencia Artificial. 
          <br /> <br /> 
          Construyo sistemas que van más allá de una API: me interesa diseñar soluciones escalables, 
          trabajar con datos, arquitectura y procesos, e integrar Inteligencia Artificial cuando 
          realmente aporta valor. Trabajo principalmente con Java y Spring Boot para Backend, y con Python 
          para servicios, Machine Learning y sistemas de IA. 
          <br /> <br /> 
          He participado en proyectos orientados a resolver problemas reales, desde plataformas para reportar
          incidencias ciudadanas hasta sistemas fintech. Actualmente estoy enfocando mi formación 
          en la convergencia entre Backend e Inteligencia Artificial, con el objetivo de construir sistemas 
          capaces de procesar información, tomar decisiones y resolver problemas complejos. 
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