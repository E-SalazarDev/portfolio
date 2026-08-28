import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";


function Crystal({ position, scale, speed }) {
  return (
    <Float speed={speed} rotationIntensity={0.8} floatIntensity={1.8}>
      <mesh position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#8B5CF6"
          transparent
          opacity={0.4}
          roughness={0.05}
          metalness={0.3}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          flatShading
        />
      </mesh>
    </Float>
  );
}

export default function StackCrystals() {
  const crystals = useMemo(
    () =>
      Array.from({ length: 8 }, () => ({
        position: [
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6 - 1,
        ],
        scale: 0.45 + Math.random() * 0.9,
        speed: 0.6 + Math.random() * 1.2,
      })),
    []
  );

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      className="absolute! inset-0"
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.35} />
     
      <pointLight position={[6, 6, 6]} intensity={60} color="#E3C2FF" />
      <pointLight position={[-6, -4, 3]} intensity={45} color="#8B5CF6" />
      <pointLight position={[0, -6, -4]} intensity={25} color="#4C1D95" />
      {crystals.map((c, i) => (
        <Crystal key={i} {...c} />
      ))}
    </Canvas>
  );
}