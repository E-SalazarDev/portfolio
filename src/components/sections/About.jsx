import { MapPin, GraduationCap, Briefcase } from "lucide-react";
import IDBadge from "../ui/IDBadge";

export default function About() {
  return (
    <section id="sobre-mi" className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-24">

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14 items-start">
        <div>

          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#93C5FD] mb-5">
            Sobre mí
          </p>

          <h2 className="font-extrabold text-3xl md:text-[2.5rem] lg:text-[2.9rem] tracking-[-0.03em] leading-[1.1] text-[#F5F6F7] max-w-2xl mb-8">
            Construyo sistemas Backend para{" "}
            <span className="bg-gradient-to-r from-[#93C5FD] via-[#3B82F6] to-[#A78BFA] bg-clip-text text-transparent">
              resolver problemas reales
            </span>
            .
          </h2>
          <div className="flex flex-wrap items-center gap-2 mb-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
              <MapPin size={13} className="text-[#93C5FD] shrink-0" />
              <span className="text-[12px] font-medium tracking-tight text-[#F5F6F7]/85">
                Tlaxcala, México
              </span>
              <span className="text-[12px] text-[#8B93A1]">·</span>
              <span className="text-[12px] text-[#8B93A1]">Remoto</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
              <GraduationCap size={13} className="text-[#A78BFA] shrink-0" />
              <span className="text-[12px] font-medium tracking-tight text-[#F5F6F7]/85">
                Ing. en TI
              </span>
              <span className="text-[12px] text-[#8B93A1]">·</span>
              <span className="text-[12px] text-[#8B93A1]">Maestría en IA</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
              <Briefcase size={13} className="text-[#34D399] shrink-0" />
              <span className="text-[12px] font-medium tracking-tight text-[#F5F6F7]/85">
                Backend Engineer
              </span>
              <span className="text-[12px] text-[#8B93A1]">·</span>
              <span className="text-[12px] text-[#8B93A1]">Java &amp; Python</span>
            </div>
          </div>

          <div className="space-y-5 max-w-xl text-[15px] leading-7 text-[#8B93A1]">
            <p>
              Soy{" "}
              <strong className="text-[#F5F6F7] font-semibold">
                José Eduardo Salazar
              </strong>
              , Ingeniero en Tecnologías de la Información, enfocado en
              desarrollo Backend y actualmente cursando una Maestría en
              Inteligencia Artificial.
            </p>

            <p>
              Diseño y construyo{" "}
              <strong className="text-[#F5F6F7] font-semibold">APIs</strong>,{" "}
              <strong className="text-[#F5F6F7] font-semibold">
                servicios
              </strong>{" "}
              y{" "}
              <strong className="text-[#F5F6F7] font-semibold">
                sistemas backend
              </strong>{" "}
              con{" "}
              <strong className="text-[#F5F6F7] font-semibold">Java</strong>,{" "}
              <strong className="text-[#F5F6F7] font-semibold">
                Spring Boot
              </strong>{" "}
              y{" "}
              <strong className="text-[#F5F6F7] font-semibold">Python</strong>,
              considerando arquitectura, datos y mantenibilidad. Complemento mi
              especialización con{" "}
              <strong className="text-[#F5F6F7] font-semibold">
                Machine Learning
              </strong>{" "}
              y{" "}
              <strong className="text-[#F5F6F7] font-semibold">
                Deep Learning
              </strong>{" "}
              para integrar IA en sistemas reales cuando aporta valor.
            </p>
          </div>

          <div className="mt-10">
            <a
              href="#proyectos"
              className="
                group relative inline-flex items-center justify-center
                h-12 px-7 rounded-full overflow-hidden
                bg-gradient-to-b from-white to-[#E8EBEF]
                ring-1 ring-white/60
                shadow-[0_8px_24px_-6px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.05)]
                transition-all duration-300
                hover:scale-[1.03]
                hover:shadow-[0_16px_40px_-8px_rgba(147,197,253,0.55)]
              "
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#93C5FD] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 text-[14px] font-semibold tracking-[-0.01em] text-[#08090C]">
                Ver proyectos
              </span>
            </a>
          </div>
        </div>

        <IDBadge photoSrc="/eduardo.jpg" />
      </div>
    </section>
  );
}