import { useState } from "react";
import { Coffee, Globe, BrainCircuit, MessageSquareText, Eye, Database, Code2 } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import { stack } from "../../data/stack";

const LUCIDE_ICONS = {
  coffee: Coffee,
  globe: Globe,
  "brain-circuit": BrainCircuit,
  "message-square-text": MessageSquareText,
  eye: Eye,
  database: Database,
};

function BrandIcon({ slug }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <Code2 size={14} className="text-accent-light shrink-0" />;
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/C7B8FF`}
      alt=""
      className="w-3.5 h-3.5 shrink-0"
      onError={() => setFailed(true)}
    />
  );
}

export default function Stack() {
  return (
    <section id="stack" className="max-w-360 mx-auto px-10 py-28">
      <SectionHeader tag="SYS.05" title="Stack" />
      <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
        {stack.map((group) => (
          <div key={group.category} className="bg-panel2 border border-white/10 rounded-xl p-5.5">
            <div className="font-mono text-[11px] tracking-wide text-accent-light mb-3.5">
              {group.category}
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => {
                const LucideIcon = item.lucide ? LUCIDE_ICONS[item.lucide] : null;
                return (
                  <span
                    key={item.name}
                    className="flex items-center gap-1.5 text-sm text-paper bg-panel rounded-md px-2.5 py-1.5 border border-white/5 transition-colors hover:border-accent/40"
                  >
                    {item.brand ? (
                      <BrandIcon slug={item.brand} />
                    ) : LucideIcon ? (
                      <LucideIcon size={14} className="text-accent-light shrink-0" />
                    ) : null}
                    {item.name}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}