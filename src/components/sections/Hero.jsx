import CrystalField from "./CrystalField";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-ink">
      {/* fondo 3D — z-0, no bloquea clics gracias a pointer-events-none */}
      <div className="absolute inset-0 pointer-events-none">
        <CrystalField />
      </div>

      {/* contenido — z-10, encima de la escena */}
      <div className="relative z-10 max-w-3xl px-6">
        <span className="inline-flex items-center gap-2 text-xs tracking-widest text-accent-light border border-white/10 rounded-full px-4 py-2 mb-8">
          ◆ Full Stack Engineer · IA aplicada
        </span>
        <h1 className="font-display font-bold text-5xl md:text-7xl leading-tight text-paper">
          Construyo sistemas que{" "}
          <span className="font-accent italic text-accent-light">responden</span>{" "}
          cuando importa.
        </h1>
        <p className="mt-6 text-muted text-lg max-w-xl mx-auto">
          José Eduardo Salazar. Diseño y desarrollo software para dominios donde
          los errores cuestan caro: civic tech, fintech y protección civil.
        </p>
        <div className="mt-9 flex gap-4 justify-center">
          <a
            href="#proyectos"
            className="bg-accent text-ink font-mono text-sm font-semibold px-6 py-3.5 rounded-lg shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-shadow"
          >
            Ver proyectos →
          </a>
          <a
            href="#"
            className="border border-white/10 text-paper font-mono text-sm px-6 py-3.5 rounded-lg hover:border-accent-light hover:text-accent-light transition-colors"
          >
            Descargar CV
          </a>
        </div>
      </div>
    </section>
  );
}
