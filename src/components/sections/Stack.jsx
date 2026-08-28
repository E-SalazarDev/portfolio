import { useState, useMemo } from "react";
import { Database } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import StackCrystals from "./StackCrystals";
import { stack } from "../../data/stack";


const INLINE_ICONS = {
  oracle: Database,
};

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

  const handleError = () => {
    if (attempt < sources.length - 1) setAttempt((a) => a + 1);
    else setAttempt(sources.length);
  };

  const exhausted = attempt >= sources.length;

  return (
    <div className="group flex flex-col items-center gap-3 cursor-default perspective-[600px]">
      <div className="w-16 h-16 rounded-full bg-white/3 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-colors duration-300 group-hover:border-white/25 group-hover:bg-white/6">
        {InlineIcon ? (
          <InlineIcon
            size={30}
            style={{ color: `#${item.color}` }}
            className="transition-transform duration-300 ease-out group-hover:transform-[rotateY(-18deg)_rotateX(10deg)_scale(1.25)]"
          />
        ) : src && !exhausted ? (
          <img
            key={src}
            src={src}
            alt=""
            className="w-8 h-8 object-contain transition-transform duration-300 ease-out group-hover:transform-[rotateY(-18deg)_rotateX(10deg)_scale(1.25)]"
            style={{ filter: "drop-shadow(0 0 0 transparent)" }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = `drop-shadow(0 6px 12px #${item.color || "8B5CF6"}90)`)}
            onMouseLeave={(e) => (e.currentTarget.style.filter = "drop-shadow(0 0 0 transparent)")}
            onError={handleError}
          />
        ) : (
          <span
            className="w-4 h-4 rounded-full transition-transform duration-300 group-hover:scale-150"
            style={{ backgroundColor: `#${item.color}`, boxShadow: `0 0 10px #${item.color}99` }}
          />
        )}
      </div>
      <span className="text-[11.5px] text-muted text-center leading-tight transition-colors duration-300 group-hover:text-paper whitespace-nowrap">
        {item.name}
      </span>
    </div>
  );
}

export default function Stack() {
  return (
    <section id="stack" className="relative max-w-360 mx-auto px-10 py-28 overflow-hidden">

      <div className="absolute inset-0 pointer-events-none opacity-70">
        <StackCrystals />
      </div>

      <div className="relative">
        <SectionHeader tag="SYS.05" title="Stack" />
        <div className="flex flex-col gap-12">
          {stack.map((group) => (
            <div key={group.category}>
              <div className="flex items-center gap-3 mb-7">
                <span className="font-mono text-[11px] tracking-widest text-accent-light whitespace-nowrap">
                  {group.category}
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 xl:grid-cols-8 gap-y-10 justify-items-center">
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