// src/components/sections/Stack.jsx
import { useState, useMemo, useRef, useCallback } from "react";
import { Database } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import { stack } from "../../data/stack";

const INLINE_ICONS = {
  oracle: Database,
};

const MAX_TILT = 10; // grados — mantenerlo sutil, no una tarjeta girando 30°

function buildSources(item) {
  const sources = [];
  if (item.devicon) {
    sources.push(`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item.devicon}/${item.devicon}-original.svg`);
  }
  if (item.brand) {
    sources.push(`https://cdn.simpleicons.org/${item.brand}/${item.color || "ffffff"}`);
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
    el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0) translateZ(0)";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col items-center justify-center gap-4 w-full aspect-square rounded-2xl border border-white/10 bg-white/6 backdrop-blur-sm shadow-[0_2px_10px_rgba(0,0,0,0.25)] px-3 py-4 will-change-transform hover:border-white/20 hover:bg-white/10"
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 300ms cubic-bezier(0.22, 1, 0.36, 1), border-color 300ms ease, background-color 300ms ease",
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
            style={{ width: `${2.75 * (item.scale || 1)}rem`, height: `${2.75 * (item.scale || 1)}rem` }}
            onError={handleError}
          />
        ) : (
          <span
            className="w-5 h-5 rounded-full"
            style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}99` }}
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

export default function Stack() {
  return (
    <section id="stack" className="relative max-w-360 mx-auto px-10 py-28">
      <div className="relative">
        <SectionHeader tag="SYS.05" title="Stack" />
        <div className="flex flex-col gap-14">
          {stack.map((group, groupIndex) => (
            <div key={group.category}>
              <div className="flex items-baseline gap-4 mb-7">
                <span className="font-mono text-sm font-semibold tracking-widest text-accent-light whitespace-nowrap">
                  {String(groupIndex + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-sm font-semibold tracking-widest text-paper whitespace-nowrap">
                  {group.category}
                </span>
                <div className="flex-1 h-px bg-linear-to-r from-white/10 to-transparent" />
                <span className="font-mono text-xs text-muted whitespace-nowrap">
                  {group.items.length} {group.items.length === 1 ? "tech" : "techs"}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
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