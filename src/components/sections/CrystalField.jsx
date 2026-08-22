import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// Un cristal individual: geometría de octaedro con material tipo vidrio
function Crystal({ position, scale, speed }) {
  const ref = useRef();
  useFrame((state) => {
    // rotación lenta continua, propia de cada cristal
    ref.current.rotation.x += 0.0015 * speed;
    ref.current.rotation.y += 0.002 * speed;
  });
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          thickness={0.5}
          roughness={0.05}
          transmission={1}
          ior={1.4}
          chromaticAberration={0.03}
          color="#8B5CF6"
        />
      </mesh>
    </Float>
  );
}

// La cámara se inclina levemente hacia donde está el mouse — el "parallax"
function CameraRig() {
  useFrame((state) => {
    const { mouse } = state;
    state.camera.position.x += (mouse.x * 1.2 - state.camera.position.x) * 0.03;
    state.camera.position.y += (mouse.y * 0.8 - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function CrystalField() {
  // posiciones generadas una sola vez, no en cada render
  const crystals = useMemo(
    () =>
      Array.from({ length: 9 }, () => ({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4,
        ],
        scale: 0.4 + Math.random() * 0.9,
        speed: 0.5 + Math.random() * 1.5,
      })),
    []
  );

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      className="absolute! inset-0"
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={40} color="#C7B8FF" />
      <pointLight position={[-5, -3, 2]} intensity={20} color="#8B5CF6" />
      <Environment preset="city" />

      {crystals.map((c, i) => (
        <Crystal key={i} {...c} />
      ))}

      <CameraRig />

      {/* el glow real: post-procesado, no box-shadow */}
      <EffectComposer>
        <Bloom intensity={0.9} luminanceThreshold={0.15} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
