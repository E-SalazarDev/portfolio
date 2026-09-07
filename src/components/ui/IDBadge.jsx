import { useRef, useCallback } from "react";
import { PALETTE } from "../../theme/palette";


const BADGE_CONFIG = {

  backCardBg: "linear-gradient(145deg, #4F46E5 0%, #3B82F6 50%, #1E40AF 100%)",
  backCardBorder: "rgba(147, 197, 253, 0.4)",
  devTextColor: "#FFFFFF",
  devFontFamily: "'Space Grotesk', 'Inter', sans-serif",

  frontCardBg: "radial-gradient(ellipse at top, #2A140A 0%, #141011 70%, #0A0809 100%)",
  frontCardBorder: "rgba(255, 168, 104, 0.25)",
  frontCardGlow: "rgba(255, 107, 0, 0.35)",
  
  accentBright: "#FFA868",
  accentColor: "#FF6B00",
  textColorMain: "#FFF5EF",
};

const METAL_LIGHT = "#D6D8DE";
const METAL_MID = "#9AA0AC";
const METAL_DARK = "#4A4D57";

export default function IDBadge(props) {
  const photoSrc = props.photoSrc;
  const cardRef = useRef(null);

  const handleMouseMove = useCallback(function (e) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 18;
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
          "0% { transform: rotate3d(0,1,0,-6deg) rotate3d(1,0,0,2deg); }" +
          "50% { transform: rotate3d(0,1,0,6deg) rotate3d(1,0,0,-2deg); }" +
          "100% { transform: rotate3d(0,1,0,-6deg) rotate3d(1,0,0,2deg); }" +
          "}" +
          ".id-badge-swing {" +
          "animation: idBadgeSwing 5.5s ease-in-out infinite;" +
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
          maxWidth: "300px",
          margin: "0 auto",
          position: "relative",
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
            position: "relative",
          }}
        >
          {/* Correa / Lanyard */}
          <div
            style={{
              width: "48px",
              height: "90px",
              borderRadius: "6px 6px 0 0",
              background: `repeating-linear-gradient(115deg, ${PALETTE.panel2 || "#1E1E24"} 0px, ${PALETTE.panel2 || "#1E1E24"} 5px, ${PALETTE.surface || "#2D2D38"} 5px, ${PALETTE.surface || "#2D2D38"} 10px)`,
              boxShadow: "inset -6px 0 10px rgba(0,0,0,0.5), inset 6px 0 10px rgba(255,255,255,0.06)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, transparent 38%, rgba(255,255,255,0.14) 50%, transparent 62%)",
              }}
            />
          </div>

          {/* Clip Metálico */}
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: `linear-gradient(180deg, ${METAL_LIGHT}, ${METAL_MID} 55%, ${METAL_DARK})`,
              boxShadow: "0 3px 6px rgba(0,0,0,0.5)",
              position: "relative",
              zIndex: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: PALETTE.ink || "#0D0D11" }} />
          </div>

          <div
            style={{
              width: "15px",
              height: "26px",
              borderRadius: "7px",
              background: `linear-gradient(180deg, ${METAL_LIGHT}, ${BADGE_CONFIG.accentBright} 30%, ${METAL_MID} 70%, ${METAL_DARK})`,
              marginTop: "-2px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
              position: "relative",
              zIndex: 10,
            }}
          />

          {/* TARJETA TRASERA INCLINADA */}
     
          <div
            style={{
              position: "absolute",
              top: "80px",
              right: "-18px",
              width: "100%",
              maxWidth: "300px",
              aspectRatio: "3 / 4",
              borderRadius: "20px",
              background: BADGE_CONFIG.backCardBg,
              border: `1px solid ${BADGE_CONFIG.backCardBorder}`,
              transform: "rotate(20deg)",
              transformOrigin: "top left",
              zIndex: 1,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
              display: "flex",
              alignItems: "flex-start",     
              justifyContent: "flex-start",
              paddingTop: "40px",
              paddingLeft: "24px",
              overflow: "hidden",
            }}
          >

            <span
              style={{
         
                position: "absolute",
                top: "275px", 
                left: "-7px", 

                fontFamily: BADGE_CONFIG.devFontFamily,
                fontWeight: 800,
                fontSize: "38px",
                color: BADGE_CONFIG.devTextColor,
                transform: "rotate(-90deg)",
                transformOrigin: "center center",
                letterSpacing: "0.15em",
                textShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
                userSelect: "none",
                opacity: 0.95,
                whiteSpace: "nowrap",
              }}
            >
              DEV
            </span>
          </div>

          {/* TARJETA PRINCIPAL */}
          <div
            style={{
              width: "100%",
              aspectRatio: "3 / 4",
              borderRadius: "18px",
              padding: "16px",
              paddingTop: "24px",
              background: BADGE_CONFIG.frontCardBg,
              border: `1px solid ${BADGE_CONFIG.frontCardBorder}`,
              boxShadow: `0 35px 70px -15px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255, 255, 255, 0.15), 0 0 45px -10px ${BADGE_CONFIG.frontCardGlow}`,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              position: "relative",
              zIndex: 4,
              marginTop: "-4px",
              overflow: "hidden",
            }}
          >
            {/* Muesca superior */}
            <div
              style={{
                position: "absolute",
                top: "-1px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "22px",
                height: "12px",
                borderRadius: "0 0 10px 10px",
                background: PALETTE.ink || "#0D0D11",
                zIndex: 6,
              }}
            />

            {/* Logo o Marca en la parte superior */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", zIndex: 2 }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  background: BADGE_CONFIG.accentColor,
                  transform: "rotate(45deg)",
                  borderRadius: "2px",
                  flexShrink: 0,
                  boxShadow: `0 0 8px ${BADGE_CONFIG.accentColor}`,
                }}
              />
              <span style={{ fontFamily: "monospace", fontSize: "13px", fontWeight: 700, letterSpacing: "0.06em" }}>
                <span style={{ color: BADGE_CONFIG.textColorMain }}>EDUARDO</span>
                <span style={{ color: BADGE_CONFIG.accentBright }}>.DEV</span>
              </span>
            </div>

            {/* Fotografía */}
            <div
              style={{
                flex: "1 1 55%",
                borderRadius: "12px",
                overflow: "hidden",
                position: "relative",
                minHeight: 0,
                border: "1px solid rgba(255,255,255,0.1)",
                zIndex: 2,
              }}
            >
              <img
                src={photoSrc}
                alt="J. Eduardo Salazar Tecuapacho"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 20%",
                  display: "block",
                }}
              />
            </div>

            {/* Nombre y Cargo */}
            <div style={{ zIndex: 2, padding: "2px 4px 6px 4px" }}>
              <div
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: "17px",
                  fontWeight: 700,
                  color: BADGE_CONFIG.textColorMain,
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                }}
              >
                J. Eduardo Salazar Tecuapacho
              </div>
              <div
                style={{
                  marginTop: "4px",
                  fontFamily: "monospace",
                  fontSize: "11px",
                  color: BADGE_CONFIG.accentBright,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Full Stack Engineer
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}