export default function SectionHeader({ tag, title }) {
  return (
    <div className="flex items-baseline gap-4 mb-12">
      <span className="font-mono text-xs tracking-widest text-mint">{tag}</span>
      <h2 className="font-display text-3xl font-semibold text-paper">{title}</h2>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
}
