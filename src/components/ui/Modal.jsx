import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-100 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* botón de cerrar fijo en la pantalla, siempre visible sin importar el contenido de atrás */}
      <button
        onClick={onClose}
        className="fixed top-5 right-5 z-110 w-11 h-11 rounded-full bg-ink border border-white/25 flex items-center justify-center text-paper shadow-xl transition-colors hover:bg-accent hover:border-accent hover:text-ink"
        aria-label="Cerrar"
      >
        <X size={20} />
      </button>

      <div className="flex items-center justify-center h-full p-6">
        <div
          className="relative max-w-3xl w-full max-h-[85vh] bg-panel border border-white/10 rounded-2xl p-4 overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
}