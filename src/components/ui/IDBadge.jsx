import { useRef, useCallback } from "react";

export default function IDBadge(props) {
  const photoSrc = props.photoSrc;
  const cardRef = useRef(null);

  const handleMouseMove = useCallback(function (e) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 16;
    const rotateX = (0.5 - py) * 12;
    el.style.setProperty("--mrx", rotateX + "deg");
    el.style.setProperty("--mry", rotateY + "deg");
  }, []);

  const handleMouseLeave = useCallback(function () {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--mrx", "0deg");
    el.style.setProperty("--mry", "0deg");
  }, []);

  return (
    <div style={{ perspective: "1400px", width: "100%" }}>
      <style>
        {"@keyframes idBadgeSwing {" +
          "0% { transform: rotate3d(0,1,0,-4deg) rotate3d(1,0,0,1deg); }" +
          "50% { transform: rotate3d(0,1,0,4deg) rotate3d(1,0,0,-1deg); }" +
          "100% { transform: rotate3d(0,1,0,-4deg) rotate3d(1,0,0,1deg); }" +
          "}" +
          ".id-badge-swing {" +
          "animation: idBadgeSwing 7s ease-in-out infinite;" +
          "transform-style: preserve-3d;" +
          "transform-origin: top center;" +
          "}" +
          ".id-badge-swing:hover { animation-play-state: paused; }"}
      </style>

      <div
        ref={cardRef}
        className="id-badge-swing"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: "100%",
          maxWidth: "320px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            transform: "rotate3d(1,0,0, var(--mrx, 0deg)) rotate3d(0,1,0, var(--mry, 0deg))",
            transformStyle: "preserve-3d",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* cinta: cuerpo tejido con volumen cilindrico y pespuntes,
              en vez de una barra plana de un solo color */}
          <div style={{ position: "relative", width: "28px", height: "130px" }}>
            {/* cuerpo tejido bicolor (violeta + hilo azul) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "14px 14px 0 0",
                background:
                  "repeating-linear-gradient(45deg, #7C4FE0 0px, #7C4FE0 5px, #8B5CF6 5px, #8B5CF6 9px, #5EA8FF 9px, #5EA8FF 10px)",
              }}
            />
            {/* sombreado lateral, simula volumen cilindrico de la tela */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "14px 14px 0 0",
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.4), transparent 18%, transparent 82%, rgba(0,0,0,0.4))",
                pointerEvents: "none",
              }}
            />
            {/* brillo central */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "40%",
                width: "20%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
                pointerEvents: "none",
              }}
            />
            {/* pespuntes (costura) en los bordes */}
            <div
              style={{
                position: "absolute",
                top: "6px",
                bottom: "6px",
                left: "5px",
                borderLeft: "1px dashed rgba(255,255,255,0.4)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "6px",
                bottom: "6px",
                right: "5px",
                borderRight: "1px dashed rgba(255,255,255,0.4)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* remate metalico donde la cinta se une al clip */}
          <div
            style={{
              width: "34px",
              height: "14px",
              borderRadius: "4px",
              background: "linear-gradient(180deg, #EAF0FF, #98A2C4 55%, #4A4D57)",
              boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
              marginTop: "-1px",
              position: "relative",
              zIndex: 1,
            }}
          />

          {/* clip metalico */}
          <div
            style={{
              width: "92px",
              height: "30px",
              background: "linear-gradient(180deg, #EAF0FF, #C7B8FF 40%, #8B5CF6)",
              borderRadius: "6px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.45)",
              position: "relative",
              zIndex: 2,
              marginTop: "-2px",
            }}
          />

          {/* argolla */}
          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "#12162A",
              border: "3px solid #C7B8FF",
              marginTop: "-9px",
              marginBottom: "10px",
              position: "relative",
              zIndex: 3,
              boxShadow: "0 3px 5px rgba(0,0,0,0.4)",
            }}
          />

          {/* funda de plastico */}
          <div
            style={{
              width: "100%",
              aspectRatio: "3 / 4",
              borderRadius: "26px",
              padding: "13px",
              background: "linear-gradient(135deg, rgba(234,240,255,0.16), rgba(139,92,246,0.06))",
              border: "1px solid rgba(199,184,255,0.45)",
              boxShadow: "0 40px 80px -20px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.2)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "-45%",
                width: "55%",
                height: "140%",
                background: "linear-gradient(115deg, rgba(255,255,255,0.22), transparent 65%)",
                transform: "skewX(-14deg)",
                pointerEvents: "none",
                zIndex: 4,
              }}
            />

            <div style={{ width: "100%", height: "100%", borderRadius: "18px", overflow: "hidden", position: "relative" }}>
              <img src={photoSrc} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(5,7,15,0.65), transparent 45%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 18,
                  left: 20,
                  right: 20,
                  color: "#EAF0FF",
                  fontFamily: "monospace",
                  fontSize: "14px",
                  letterSpacing: "0.08em",
                }}
              >
                EDUARDO.DEV
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}