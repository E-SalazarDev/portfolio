export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1400px] h-[900px] opacity-[0.12] blur-3xl"
        style={{ background: "radial-gradient(circle, #8B5CF6, transparent 65%)" }}
      />
     
      <div
        className="absolute bottom-[-200px] right-[-150px] w-[900px] h-[700px] opacity-[0.08] blur-3xl"
        style={{ background: "radial-gradient(circle, #5EA8FF, transparent 65%)" }}
      />
    
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}