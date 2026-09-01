import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ onClose, children }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return function () {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-100 bg-ink/85 backdrop-blur-sm" onClick={onClose}>
      <button
        onClick={onClose}
        className="fixed top-5 right-5 z-110 w-11 h-11 rounded-full bg-panel border border-panel2 flex items-center justify-center text-paper shadow-xl transition-colors hover:bg-accent hover:border-accent hover:text-ink"
        aria-label="Cerrar"
      >
        <X size={20} />
      </button>

      <div className="flex items-center justify-center h-full p-4 sm:p-6">
        <div
          className="relative w-full max-w-[1200px] max-h-[92vh] bg-panel border border-panel2 rounded-2xl p-4 overflow-auto"
          onClick={function (e) {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}