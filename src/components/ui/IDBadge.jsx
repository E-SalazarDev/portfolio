import { useRef, useCallback } from "react";
import { PALETTE } from "../../theme/palette";

const BADGE_CONFIG = {
  backCardBg: "linear-gradient(145deg, #3B82F6 0%, #2563EB 50%, #1E3A8A 100%)",
  backCardBorder: "rgba(147, 197, 253, 0.35)",
  devTextColor: "#FFFFFF",
  devFontFamily: "'Inter', system-ui, sans-serif",

  frontCardBg: "radial-gradient(ellipse at top, #1A1F2E 0%, #0F1320 70%, #08090C 100%)",
  frontCardBorder: "rgba(147, 197, 253, 0.18)",
  frontCardGlow: "rgba(59, 130, 246, 0.35)",

  accentBright: "#93C5FD",
  accentColor: "#3B82F6",
  textColorMain: "#F5F6F7",
};

const METAL_LIGHT = "#E8EAEF";
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
          "0% { transform: rotate3d(0,1,0,-6deg) rotate3d(1,0,0,2deg) translateY(0px); }" +
          "25% { transform: rotate3d(0,1,0,0deg) rotate3d(1,0,0,0deg) translateY(-5px); }" +
          "50% { transform: rotate3d(0,1,0,6deg) rotate3d(1,0,0,-2deg) translateY(0px); }" +
          "75% { transform: rotate3d(0,1,0,0deg) rotate3d(1,0,0,0deg) translateY(5px); }" +
          "100% { transform: rotate3d(0,1,0,-6deg) rotate3d(1,0,0,2deg) translateY(0px); }" +
          "}" +
          "@keyframes lanyardShine {" +
          "0% { background-position: 200% 50%; }" +
          "50% { background-position: -100% 50%; }" +
          "100% { background-position: 200% 50%; }" +
          "}" +
          ".id-badge-swing {" +
          "animation: idBadgeSwing 6.5s ease-in-out infinite;" +
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
          {/* CINTA — correa azul marino con textura y brillo */}
          <div
            style={{
              width: "50px",
              height: "100px",
              background: "linear-gradient(90deg, #0A1628 0%, #1B2A47 20%, #2D4370 50%, #1B2A47 80%, #0A1628 100%)",
              boxShadow: `
                inset -8px 0 14px rgba(0,0,0,0.9),
                inset 8px 0 14px rgba(0,0,0,0.9),
                inset 0 0 0 1px rgba(147,197,253,0.12),
                inset 0 1px 0 rgba(255,255,255,0.18),
                0 6px 20px rgba(0,0,0,0.7),
                0 0 24px -8px rgba(59,130,246,0.4)
              `,
              position: "relative",
              overflow: "hidden",
              borderRadius: "3px 3px 0 0",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  rgba(255,255,255,0.04) 0px,
                  rgba(255,255,255,0.04) 1px,
                  transparent 1px,
                  transparent 3px
                )`,
                mixBlendMode: "overlay",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  rgba(0,0,0,0.28) 0px,
                  rgba(0,0,0,0.28) 1px,
                  transparent 1px,
                  transparent 4px
                )`,
                mixBlendMode: "multiply",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(115deg, transparent 30%, rgba(147,197,253,0.28) 50%, transparent 70%)",
                backgroundSize: "300% 100%",
                animation: "lanyardShine 4s ease-in-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "35%",
                height: "100%",
                background: "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "35%",
                height: "100%",
                background: "linear-gradient(270deg, rgba(0,0,0,0.6) 0%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "42px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                background: `conic-gradient(from 210deg, ${METAL_DARK} 0%, ${METAL_MID} 25%, ${METAL_LIGHT} 45%, ${METAL_MID} 65%, ${METAL_DARK} 85%, ${METAL_MID} 100%)`,
                boxShadow: "0 2px 4px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.6), inset 0 -1px 1px rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 40% 35%, #0A0A0A 0%, #000 100%)",
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.9)",
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "30%",
                background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* ANILLA D — pequeña anilla metálica que une cinta con clip */}
          <div
            style={{
              position: "relative",
              zIndex: 5,
              marginTop: "-2px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "26px",
                height: "20px",
                border: `2px solid ${METAL_MID}`,
                borderTop: "none",
                borderRadius: "0 0 14px 14px",
                background: `linear-gradient(180deg, transparent 0%, transparent 100%)`,
                boxShadow: "0 2px 4px rgba(0,0,0,0.5), inset 0 -1px 1px rgba(255,255,255,0.3)",
                position: "relative",
              }}
            />

            {/* Clip / mosquetón */}
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: `conic-gradient(from 210deg, ${METAL_DARK} 0%, ${METAL_MID} 20%, ${METAL_LIGHT} 40%, ${METAL_MID} 60%, ${METAL_DARK} 80%, ${METAL_MID} 100%)`,
                boxShadow: "0 4px 12px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                marginTop: "-6px",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: `radial-gradient(circle at 40% 35%, #16181D 0%, #08090C 70%, #05060A 100%)`,
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.9), inset 0 -1px 2px rgba(255,255,255,0.06)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "4px",
                  left: "7px",
                  width: "7px",
                  height: "3px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.9)",
                  filter: "blur(1px)",
                  transform: "rotate(-25deg)",
                }}
              />
            </div>

            <div
              style={{
                width: "3px",
                height: "5px",
                background: `linear-gradient(180deg, ${METAL_MID}, ${METAL_DARK})`,
                marginTop: "-1px",
              }}
            />

            <div
              style={{
                width: "20px",
                height: "34px",
                borderRadius: "10px",
                background: `linear-gradient(180deg, ${METAL_LIGHT} 0%, ${METAL_MID} 45%, ${METAL_DARK} 100%)`,
                boxShadow: "0 5px 12px rgba(0,0,0,0.65), inset 0 1px 1px rgba(255,255,255,0.7), inset 0 -1px 2px rgba(0,0,0,0.4)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "50%",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.45) 0%, transparent 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "35%",
                  left: 0,
                  width: "100%",
                  height: "1px",
                  background: "rgba(0,0,0,0.45)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "60%",
                  left: 0,
                  width: "100%",
                  height: "1px",
                  background: "rgba(0,0,0,0.35)",
                }}
              />
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              top: "130px",
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
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 60px -20px rgba(59, 130, 246, 0.6)",
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

          <div
            style={{
              width: "100%",
              aspectRatio: "3 / 4",
              borderRadius: "18px",
              padding: "16px",
              paddingTop: "24px",
              background: BADGE_CONFIG.frontCardBg,
              border: `1px solid ${BADGE_CONFIG.frontCardBorder}`,
              boxShadow: `0 35px 70px -15px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255, 255, 255, 0.12), 0 0 45px -10px ${BADGE_CONFIG.frontCardGlow}`,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              position: "relative",
              zIndex: 4,
              marginTop: "-4px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-1px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "22px",
                height: "12px",
                borderRadius: "0 0 10px 10px",
                background: PALETTE.ink || "#08090C",
                zIndex: 6,
              }}
            />

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
              <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "13px", fontWeight: 700, letterSpacing: "0.02em" }}>
                <span style={{ color: BADGE_CONFIG.textColorMain }}>EDUARDO</span>
                <span style={{ color: BADGE_CONFIG.accentBright }}>.DEV</span>
              </span>
            </div>

            <div
              style={{
                flex: "1 1 55%",
                borderRadius: "12px",
                overflow: "hidden",
                position: "relative",
                minHeight: 0,
                border: "1px solid rgba(255,255,255,0.08)",
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

            <div style={{ zIndex: 2, padding: "2px 4px 6px 4px" }}>
              <div
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: BADGE_CONFIG.textColorMain,
                  lineHeight: 1.2,
                  letterSpacing: "-0.015em",
                }}
              >
                J. Eduardo Salazar Tecuapacho
              </div>
              <div
                style={{
                  marginTop: "4px",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "10.5px",
                  color: BADGE_CONFIG.accentBright,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
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