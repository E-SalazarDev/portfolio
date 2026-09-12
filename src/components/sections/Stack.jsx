import { useState, useMemo, useRef, useCallback } from "react";
import { Database } from "lucide-react";
import { stack } from "../../data/stack";

const INLINE_ICONS = {
  oracle: Database,
};

const MAX_TILT = 10;

const CATEGORY_ACCENTS = [
  { text: "#93C5FD", bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.3)", rgb: "59,130,246" },
  { text: "#34D399", bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.3)", rgb: "52,211,153" },
  { text: "#FBBF24", bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.3)", rgb: "251,191,36" },
  { text: "#A78BFA", bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.3)", rgb: "167,139,250" },
  { text: "#F472B6", bg: "rgba(244,114,182,0.12)", border: "rgba(244,114,182,0.3)", rgb: "244,114,182" },
];

function buildSources(item) {
  const sources = [];
  if (item.devicon) {
    sources.push(
      `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item.devicon}/${item.devicon}-original.svg`
    );
  }
  if (item.brand) {
    sources.push(
      `https://cdn.simpleicons.org/${item.brand}/${item.color || "ffffff"}`
    );
  }
  return sources;
}

function StackItem({ item }) {
  const sources = useMemo(() => buildSources(item), [item]);
  const [attempt, setAttempt] = useState(0);
  const src = sources[attempt];
  const InlineIcon = item.inline ? INLINE_ICONS[item.inline] : null;
  const cardRef = useRef(null);

  const handleError = () => {
    if (attempt < sources.length - 1) setAttempt((a) => a + 1);
    else setAttempt(sources.length);
  };

  const exhausted = attempt >= sources.length;
  const color = `#${item.color || "8B5CF6"}`;

  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * MAX_TILT * 2;
    const rotateX = (0.5 - py) * MAX_TILT * 2;
    el.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) translateZ(6px)`;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform =
      "perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0) translateZ(0)";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col items-center justify-center gap-4 w-full aspect-square rounded-2xl border border-white/10 bg-white/6 backdrop-blur-sm shadow-[0_2px_10px_rgba(0,0,0,0.25)] px-3 py-4 will-change-transform hover:border-white/20 hover:bg-white/10"
      style={{
        transformStyle: "preserve-3d",
        transition:
          "transform 300ms cubic-bezier(0.22, 1, 0.36, 1), border-color 300ms ease, background-color 300ms ease",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(140px circle at var(--mx, 50%) var(--my, 50%), ${color}55, transparent 70%)`,
          boxShadow: `0 0 30px -6px ${color}80, inset 0 0 24px -8px ${color}40`,
        }}
      />

      <div
        className="relative z-10 w-16 h-16 flex items-center justify-center"
        style={{ transform: "translateZ(20px)" }}
      >
        {InlineIcon ? (
          <InlineIcon size={40 * (item.scale || 1)} style={{ color }} />
        ) : src && !exhausted ? (
          <img
            key={src}
            src={src}
            alt=""
            className="object-contain"
            style={{
              width: `${2.75 * (item.scale || 1)}rem`,
              height: `${2.75 * (item.scale || 1)}rem`,
            }}
            onError={handleError}
          />
        ) : (
          <span
            className="w-5 h-5 rounded-full"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 10px ${color}99`,
            }}
          />
        )}
      </div>

      <span
        className="relative z-10 text-sm font-medium text-muted text-center leading-tight transition-colors duration-300 group-hover:text-paper whitespace-nowrap"
        style={{ transform: "translateZ(14px)" }}
      >
        {item.name}
      </span>
    </div>
  );
}

function CategoryHeader({ category, index, count }) {
  const accent = CATEGORY_ACCENTS[index % CATEGORY_ACCENTS.length];

  return (
    <div className="flex items-center gap-4 mb-6">
      <span
        className="text-[11px] font-black tracking-[0.14em] shrink-0"
        style={{ color: accent.text }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="min-w-0">
        <h3 className="text-[15px] font-bold tracking-[-0.01em] text-[#F5F6F7]">
          {category}
        </h3>
      </div>

      <span
        className="shrink-0 text-[10.5px] font-semibold tracking-tight px-2 py-0.5 rounded-md"
        style={{
          color: accent.text,
          background: accent.bg,
          border: `1px solid ${accent.border}`,
        }}
      >
        {count}
      </span>

      <span
        className="h-px flex-1 opacity-40"
        style={{
          background: `linear-gradient(90deg, ${accent.text} 0%, transparent 100%)`,
        }}
      />
    </div>
  );
}

export default function Stack() {
  return (
    <section
      id="stack"
      className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 py-20"
    >
      <div className="relative">
        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.025em] text-[#F5F6F7]">
            Stack
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#A2AAB8]">
            Tecnologías y herramientas que uso para construir productos
            backend, frontend y sistemas de inteligencia artificial.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {stack.map((group, groupIndex) => (
            <div key={group.category}>
              <CategoryHeader
                category={group.category}
                index={groupIndex}
                count={group.items.length}
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                {group.items.map((item) => (
                  <StackItem key={item.name} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}