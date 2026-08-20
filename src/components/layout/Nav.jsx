export default function Nav() {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-10 py-4.5 bg-ink/70 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center gap-2 font-display font-semibold text-sm">
        <span className="w-2 h-2 rounded-sm bg-accent rotate-45 shadow-[0_0_10px] shadow-accent" />
        EDUARDO.DEV
      </div>
      <nav className="hidden md:flex gap-8 text-muted text-xs">
        <a href="#proyectos" className="hover:text-paper transition-colors">Proyectos</a>
        <a href="#experiencia" className="hover:text-paper transition-colors">Experiencia</a>
        <a href="#certificaciones" className="hover:text-paper transition-colors">Certificaciones</a>
        <a href="#stack" className="hover:text-paper transition-colors">Stack</a>
        <a href="#contacto" className="hover:text-paper transition-colors">Contacto</a>
      </nav>
      <div className="flex items-center gap-2.5">
        <a href="/cv.pdf" className="font-body text-xs font-medium text-paper border border-white/10 rounded-full px-4.5 py-2 transition-colors hover:border-accent-light hover:text-accent-light">
          CV
        </a>
        <a href="#contacto" className="font-body text-xs font-semibold text-ink bg-paper rounded-full px-4.5 py-2 transition-colors hover:bg-accent-light">
          Contactar
        </a>
      </div>
    </div>
  );
}
