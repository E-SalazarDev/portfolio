export default function Chip({ children }) {
  return (
    <span className="font-mono text-[11px] text-paper border border-white/10 bg-white/[0.02] rounded-md px-2.5 py-1">
      {children}
    </span>
  );
}
