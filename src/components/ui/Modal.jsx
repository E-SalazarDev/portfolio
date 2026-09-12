import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function Modal({ onClose, children }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = scrollbarWidth + "px";
    }

    return function () {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [onClose]);

  const content = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      style={{
        background: "rgba(5,7,11,0.92)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{
          background: "rgba(245,246,247,0.95)",
          border: "1px solid rgba(255,255,255,0.3)",
          color: "#08090C",
          boxShadow: "0 8px 24px -6px rgba(0,0,0,0.7)",
        }}
      >
        <X size={20} strokeWidth={2.5} />
      </button>

      <div
        className="relative w-full flex flex-col rounded-2xl overflow-hidden"
        style={{
          maxWidth: "1280px",
          maxHeight: "92vh",
          background: "#0E1219",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 40px 80px -40px rgba(0,0,0,0.95)",
        }}
        onClick={function (e) {
          e.stopPropagation();
        }}
      >
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 sm:py-8">
          {children}
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;

  return createPortal(content, document.body);
}