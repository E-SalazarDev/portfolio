import { Canvas } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";
import { Suspense, useMemo } from "react";

function LaptopModel({ media, mediaIndex }) {
  const current = media?.[mediaIndex];

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.08}
      floatIntensity={0.15}
    >
      <group rotation={[-0.08, -0.18, 0]}>
        {/* Pantalla */}
        <mesh position={[0, 1.35, 0]}>
          <boxGeometry args={[6.8, 4.25, 0.16]} />
          <meshStandardMaterial
            color="#16171d"
            roughness={0.45}
            metalness={0.65}
          />

          <Html
            transform
            distanceFactor={5}
            position={[0, 0, 0.11]}
            style={{
              width: "1280px",
              height: "800px",
              overflow: "hidden",
              borderRadius: "10px",
              background: "#08090d",
            }}
          >
            {current?.type === "video" ? (
              <video
                key={current.src}
                src={current.src}
                poster={current.poster}
                controls
                playsInline
                className="w-full h-full object-cover"
              />
            ) : current?.src ? (
              <img
                key={current.src}
                src={current.src}
                alt={current.label || "Project preview"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#0b0c11]">
                <div className="text-center">
                  <div className="font-mono text-[18px] text-white/40">
                    NO_PREVIEW
                  </div>

                  <div className="mt-2 font-mono text-[12px] text-white/20">
                    evidence unavailable
                  </div>
                </div>
              </div>
            )}
          </Html>
        </mesh>

        {/* Bisel de pantalla */}
        <mesh position={[0, 1.35, -0.11]}>
          <boxGeometry args={[7.05, 4.5, 0.08]} />
          <meshStandardMaterial
            color="#090a0f"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {/* Base */}
        <mesh position={[0, -0.92, 0.35]} rotation={[-0.12, 0, 0]}>
          <boxGeometry args={[7.4, 0.3, 4.7]} />
          <meshStandardMaterial
            color="#111218"
            roughness={0.35}
            metalness={0.7}
          />
        </mesh>

        {/* Trackpad */}
        <mesh position={[0, -0.72, 0.75]}>
          <boxGeometry args={[1.7, 0.035, 1.15]} />
          <meshStandardMaterial
            color="#1b1c22"
            roughness={0.5}
            metalness={0.4}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function ProjectDevicePreview({
  media = [],
  mediaIndex = 0,
}) {
  const hasMedia = media.length > 0;

  return (
    <div className="relative h-[480px] md:h-[540px] overflow-hidden rounded-[28px] bg-[#0b0c11] border border-white/[0.08]">
      {/* Luz ambiental MUY sutil */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(139,92,246,0.055), transparent 55%)",
        }}
      />

      <div className="absolute top-5 left-6 z-20">
        <span className="font-mono text-[12px] tracking-[0.18em] text-white/45 uppercase">
          Project Preview
        </span>
      </div>

      <div className="absolute top-5 right-6 z-20">
        <span className="font-mono text-[12px] text-white/35">
          {hasMedia
            ? `${String(mediaIndex + 1).padStart(2, "0")} / ${String(
                media.length
              ).padStart(2, "0")}`
            : "NO MEDIA"}
        </span>
      </div>

      <Canvas
        camera={{
          position: [0, 0.3, 11],
          fov: 34,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <ambientLight intensity={1.4} />

        <directionalLight
          position={[4, 6, 8]}
          intensity={2}
        />

        <directionalLight
          position={[-4, 2, 3]}
          intensity={0.7}
        />

        <Suspense fallback={null}>
          <LaptopModel
            media={media}
            mediaIndex={mediaIndex}
          />
        </Suspense>
      </Canvas>

      {/* Indicador de evidencia */}
      {media.length > 0 && (
        <div className="absolute bottom-5 left-6 right-6 z-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {media.map((item, index) => (
              <button
                key={`${item.src}-${index}`}
                type="button"
                aria-label={`Mostrar evidencia ${index + 1}`}
                className="w-9 h-9 rounded-md border border-white/10 bg-black/30 backdrop-blur-sm overflow-hidden hover:border-white/30 transition-colors"
              >
                {item.type === "video" ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-mono text-[10px] text-white/60">
                      ▶
                    </span>
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt=""
                    className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                  />
                )}
              </button>
            ))}
          </div>

          <span className="font-mono text-[11px] text-white/30">
            {media.length === 1
              ? "1 evidence"
              : `${media.length} evidences`}
          </span>
        </div>
      )}
    </div>
  );
}