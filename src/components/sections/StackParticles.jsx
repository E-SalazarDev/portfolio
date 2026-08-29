import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

export default function StackParticles() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      className="absolute! inset-0"
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Sparkles count={120} scale={[16, 11, 6]} size={3.5} speed={0.25} color="#8B5CF6" opacity={0.6} />
      <Sparkles count={60} scale={[16, 11, 6]} size={6} speed={0.12} color="#C7B8FF" opacity={0.45} />
    </Canvas>
  );
}