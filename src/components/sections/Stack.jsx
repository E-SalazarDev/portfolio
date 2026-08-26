import { useState } from "react";
import SectionHeader from "../ui/SectionHeader";
import { stack } from "../../data/stack";

function StackItem({ item }) {
  const [failed, setFailed] = useState(false);

  const src = item.brand
    ? `https://cdn.simpleicons.org/${item.brand}/${item.color}`
    : item.devicon
    ? `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item.devicon}/${item.devicon}-original.svg`
    : null;

  return (
    <div className="group flex flex-col items-center gap-2.5 w-[72px] cursor-default">
      <div className="w-9 h-9 flex items-center justify-center">
        {src && !failed ? (
          <img
            src={src}
            alt=""
            className="w-full h-full object-contain transition-transform duration-300 ease-out group-hover:scale-125 group-hover:-translate-y-1"
            style={{ filter: `drop-shadow(0 0 0 transparent)` }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = `drop-shadow(0 6px 14px #${item.color}88)`)}
            onMouseLeave={(e) => (e.currentTarget.style.filter = `drop-shadow(0 0 0 transparent)`)}
            onError={() => setFailed(true)}
          />
        ) : (
          <span
            className="w-3 h-3 rounded-full transition-transform duration-300 group-hover:scale-150"
            style={{ backgroundColor: `#${item.color}`, boxShadow: `0 0 8px #${item.color}99` }}
          />
        )}
      </div>
      <span className="text-[10.5px] text-muted text-center leading-tight transition-colors duration-300 group-hover:text-paper">
        {item.name}
      </span>
    </div>
  );
}

export default function Stack() {
  return (
    <section id="stack" className="max-w-[1440px] mx-auto px-10 py-28">
      <SectionHeader tag="SYS.05" title="Stack" />
      <div className="flex flex-col gap-10">
        {stack.map((group) => (
          <div key={group.category}>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] tracking-widest text-accent-light whitespace-nowrap">
                {group.category}
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <div className="flex flex-wrap gap-x-2 gap-y-6">
              {group.items.map((item) => (
                <StackItem key={item.name} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}