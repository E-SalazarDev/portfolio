import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <>
      <section
        id="contacto"
        className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 py-20"
      >
        <div
          className="relative rounded-3xl overflow-hidden px-6 sm:px-10 lg:px-16 py-16 sm:py-20 text-center"
          style={{
            background: "#0E1219",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow:
              "0 40px 80px -40px rgba(0,0,0,0.95), 0 0 80px -30px rgba(59,130,246,0.15)",
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(600px circle at 50% 0%, rgba(59,130,246,0.12), transparent 70%)",
            }}
          />

          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(147,197,253,0.5) 50%, transparent 100%)",
            }}
          />

          <div className="relative">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#93C5FD] mb-5">
              Contacto
            </p>

            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-[#F5F6F7] leading-[1.1] mb-5">
              ¿Construimos algo
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#93C5FD] via-[#3B82F6] to-[#A78BFA] bg-clip-text text-transparent">
                {" "}juntos?
              </span>
            </h2>

            <p className="max-w-xl mx-auto text-[15px] leading-7 text-[#A2AAB8] mb-10">
              Abierto a roles remotos, full stack o proyectos con foco en
              inteligencia artificial. Si tienes una idea o una posición en
              mente, escribeme.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:eduardosalazartecuapacho@gmail.com"
                className="group relative inline-flex items-center gap-2.5 h-12 px-6 rounded-full overflow-hidden bg-[#F5F6F7] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_36px_-8px_rgba(147,197,253,0.55)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#93C5FD] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Mail size={15} className="relative z-10 text-[#08090C]" />
                <span className="relative z-10 text-[13.5px] font-semibold tracking-[-0.01em] text-[#08090C]">
                  Escribir por correo
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/jos%C3%A9-eduardo-salazar-tecuapacho-a672791bb/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 h-12 px-6 rounded-full bg-white/[0.06] border border-white/[0.12] backdrop-blur-md transition-all duration-300 hover:bg-white/[0.1] hover:border-white/[0.2] hover:scale-[1.03]"
              >
                <FaLinkedin size={15} className="text-[#F5F6F7]" />
                <span className="text-[13.5px] font-semibold tracking-[-0.01em] text-[#F5F6F7]">
                  LinkedIn
                </span>
              </a>

              <a
                href="https://github.com/E-SalazarDev"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 h-12 px-6 rounded-full bg-white/[0.06] border border-white/[0.12] backdrop-blur-md transition-all duration-300 hover:bg-white/[0.1] hover:border-white/[0.2] hover:scale-[1.03]"
              >
                <FaGithub size={15} className="text-[#F5F6F7]" />
                <span className="text-[13.5px] font-semibold tracking-[-0.01em] text-[#F5F6F7]">
                  GitHub
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
{/* 
      <footer
        className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 pb-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="relative flex items-center justify-center w-6 h-6">
              <span className="absolute w-2 h-2 rounded-[3px] bg-gradient-to-br from-[#93C5FD] to-[#3B82F6] rotate-45" />
            </span>
            <span className="text-[13px] font-semibold tracking-tight text-[#F5F6F7]">
              EDUARDO
              <span className="text-[#93C5FD]">.DEV</span>
            </span>
          </div>

          <p className="text-[12px] text-[#8B93A1] tracking-tight">
            © 2026 J. Eduardo Salazar Tecuapacho — Tlaxcala, MX
          </p>
        </div>
      </footer> */}
    </>
  );
}