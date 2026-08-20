import SectionHeader from "../ui/SectionHeader";
import { stack } from "../../data/stack";

export default function Stack() {
  return (
    <section id="stack" className="max-w-[1180px] mx-auto px-10 py-28">
      <SectionHeader tag="SYS.05" title="Stack" />
      <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
        {stack.map((group) => (
          <div key={group.category} className="bg-panel2 border border-white/10 rounded-xl p-5.5">
            <div className="font-mono text-[11px] tracking-wide text-accent-light mb-3.5">
              {group.category}
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="text-sm text-paper bg-panel rounded-md px-2.5 py-1">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
