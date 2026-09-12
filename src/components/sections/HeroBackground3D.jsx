import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COLORS = {
  cyan: "#22D3EE",
  cyanPale: "#A5F3FC",
  indigo: "#818CF8",
  amber: "#F59E0B",
  amberPale: "#FCD34D",
  violet: "#A78BFA",
  slate: "#334155",
  white: "#E0F2FE",
  bg: "#07090F",
};

/* =========================================================
   CURL NOISE
   ========================================================= */

function hash(x, y, z) {
  let n = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return n - Math.floor(n);
}

function smoothNoise(x, y, z) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fy = y - iy;
  const fz = z - iz;

  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const uz = fz * fz * (3 - 2 * fz);

  const n000 = hash(ix, iy, iz);
  const n100 = hash(ix + 1, iy, iz);
  const n010 = hash(ix, iy + 1, iz);
  const n110 = hash(ix + 1, iy + 1, iz);
  const n001 = hash(ix, iy, iz + 1);
  const n101 = hash(ix + 1, iy, iz + 1);
  const n011 = hash(ix + 1, iy + 1, iz + 1);
  const n111 = hash(ix + 1, iy + 1, iz + 1);

  const nx00 = n000 * (1 - ux) + n100 * ux;
  const nx10 = n010 * (1 - ux) + n110 * ux;
  const nx01 = n001 * (1 - ux) + n101 * ux;
  const nx11 = n011 * (1 - ux) + n111 * ux;

  const nxy0 = nx00 * (1 - uy) + nx10 * uy;
  const nxy1 = nx01 * (1 - uy) + nx11 * uy;

  return nxy0 * (1 - uz) + nxy1 * uz;
}

function potential(x, y, z, time) {
  return {
    px: smoothNoise(x * 0.35 + time * 0.05, y * 0.35, z * 0.35),
    py: smoothNoise(x * 0.35 + 100, y * 0.35 + time * 0.05, z * 0.35),
    pz: smoothNoise(x * 0.35, y * 0.35 + 200, z * 0.35 + time * 0.05),
  };
}

function curl(pot, x, y, z, time, eps = 0.15) {
  const p1 = potential(x, y + eps, z, time);
  const p2 = potential(x, y - eps, z, time);
  const p3 = potential(x, y, z + eps, time);
  const p4 = potential(x, y, z - eps, time);
  const p5 = potential(x + eps, y, z, time);
  const p6 = potential(x - eps, y, z, time);

  const cx = ((p3.py - p4.py) - (p1.pz - p2.pz)) / (2 * eps);
  const cy = ((p1.px - p2.px) - (p5.pz - p6.pz)) / (2 * eps);
  const cz = ((p5.py - p6.py) - (p1.px - p2.px)) / (2 * eps);

  return { x: cx, y: cy, z: cz };
}

/* =========================================================
   FLOW PARTICLES
   ========================================================= */

function FlowParticles() {
  const COUNT = 750;
  const TRAIL_LENGTH = 4;
  const geometryRef = useRef();

  const { initialPositions, initialColors, initialSizes } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 18;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 8 - 1;

      const r = Math.random();
      let cr, cg, cb;
      if (r < 0.75) {
        cr = 0.13; cg = 0.83; cb = 0.93;
      } else if (r < 0.95) {
        cr = 0.51; cg = 0.55; cb = 0.97;
      } else {
        cr = 0.96; cg = 0.62; cb = 0.04;
      }
      colors[i3] = cr;
      colors[i3 + 1] = cg;
      colors[i3 + 2] = cb;

      sizes[i] = 0.3 + Math.pow(Math.random(), 3) * 1.2;
    }
    return { initialPositions: positions, initialColors: colors, initialSizes: sizes };
  }, []);

  const RENDER_COUNT = COUNT * TRAIL_LENGTH;

  const renderPositions = useMemo(() => new Float32Array(RENDER_COUNT * 3), [RENDER_COUNT]);
  const renderColors = useMemo(() => new Float32Array(RENDER_COUNT * 3), [RENDER_COUNT]);
  const renderAlphas = useMemo(() => new Float32Array(RENDER_COUNT), [RENDER_COUNT]);
  const renderSizes = useMemo(() => new Float32Array(RENDER_COUNT), [RENDER_COUNT]);

  const stateRef = useRef(null);
  if (!stateRef.current) {
    const state = [];
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      state.push({
        x: initialPositions[i3],
        y: initialPositions[i3 + 1],
        z: initialPositions[i3 + 2],
        colorR: initialColors[i3],
        colorG: initialColors[i3 + 1],
        colorB: initialColors[i3 + 2],
        baseSize: initialSizes[i],
        trail: [],
      });
    }
    stateRef.current = state;
  }

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const particles = stateRef.current;

    for (let i = 0; i < COUNT; i++) {
      const p = particles[i];
      const pot = potential(p.x, p.y, p.z, t);
      const c = curl(pot, p.x, p.y, p.z, t);

      const speed = 0.022;
      p.x += c.x * speed;
      p.y += c.y * speed;
      p.z += c.z * speed;

      if (p.x < -10 || p.x > 10 || p.y < -6 || p.y > 6 || p.z < -6 || p.z > 4) {
        const r = 3 + Math.random() * 5;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI;
        p.x = Math.cos(theta) * Math.cos(phi) * r;
        p.y = Math.sin(phi) * r * 0.7;
        p.z = Math.sin(theta) * Math.cos(phi) * r * 0.6 - 1;
        p.trail = [];
      }

      p.trail.unshift({ x: p.x, y: p.y, z: p.z });
      if (p.trail.length > TRAIL_LENGTH) p.trail.pop();

      for (let j = 0; j < TRAIL_LENGTH; j++) {
        const idx = i * TRAIL_LENGTH + j;
        const idx3 = idx * 3;
        const point = p.trail[j] || p.trail[p.trail.length - 1] || p;
        renderPositions[idx3] = point.x;
        renderPositions[idx3 + 1] = point.y;
        renderPositions[idx3 + 2] = point.z;

        renderColors[idx3] = p.colorR;
        renderColors[idx3 + 1] = p.colorG;
        renderColors[idx3 + 2] = p.colorB;

        const decay = 1 - j / TRAIL_LENGTH;
        renderAlphas[idx] = decay * decay;
        renderSizes[idx] = p.baseSize;
      }
    }

    if (geometryRef.current) {
      ["position", "aColor", "aAlpha", "aSize"].forEach((attr) => {
        const a = geometryRef.current.attributes[attr];
        if (a) a.needsUpdate = true;
      });
    }
  });

  return (
    <points>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" count={RENDER_COUNT} array={renderPositions} itemSize={3} />
        <bufferAttribute attach="attributes-aColor" count={RENDER_COUNT} array={renderColors} itemSize={3} />
        <bufferAttribute attach="attributes-aAlpha" count={RENDER_COUNT} array={renderAlphas} itemSize={1} />
        <bufferAttribute attach="attributes-aSize" count={RENDER_COUNT} array={renderSizes} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          attribute vec3 aColor;
          attribute float aAlpha;
          attribute float aSize;
          varying vec3 vColor;
          varying float vAlpha;
          void main() {
            vColor = aColor;
            vAlpha = aAlpha;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = (1.2 + aAlpha * 2.0) * aSize * (95.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          varying float vAlpha;
          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            float glow = 1.0 - smoothstep(0.0, 0.5, d);
            gl_FragColor = vec4(vColor, glow * vAlpha * 0.35);
          }
        `}
      />
    </points>
  );
}

/* =========================================================
   AMBIENT DUST
   ========================================================= */

function AmbientDust() {
  const ref = useRef();
  const COUNT = 220;

  const { positions, sizes, phases, seeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const phases = new Float32Array(COUNT);
    const seeds = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const r = 3 + Math.pow(Math.random(), 0.7) * 11;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      positions[i3] = Math.cos(theta) * Math.cos(phi) * r * 1.5;
      positions[i3 + 1] = Math.sin(phi) * r * 0.6;
      positions[i3 + 2] = Math.sin(theta) * Math.cos(phi) * r * 0.7 - 2;

      sizes[i] = 0.25 + Math.pow(Math.random(), 2.5) * 1.1;
      phases[i] = Math.random() * Math.PI * 2;
      seeds[i] = Math.random();
    }
    return { positions, sizes, phases, seeds };
  }, []);

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    uniforms.uTime.value = t;
    if (ref.current) {
      ref.current.rotation.y = t * 0.004;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aSize" count={COUNT} array={sizes} itemSize={1} />
        <bufferAttribute attach="attributes-aPhase" count={COUNT} array={phases} itemSize={1} />
        <bufferAttribute attach="attributes-aSeed" count={COUNT} array={seeds} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          attribute float aSize;
          attribute float aPhase;
          attribute float aSeed;
          varying float vAlpha;
          varying float vSeed;
          void main() {
            vec3 pos = position;
            pos.y += sin(uTime * 0.18 + aPhase) * 0.22;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = aSize * (100.0 / -mvPosition.z);
            float distFade = 1.0 - smoothstep(4.0, 13.0, length(pos.xyz));
            vAlpha = (0.02 + 0.09 * (sin(uTime * 0.35 + aPhase) * 0.5 + 0.5)) * (0.3 + distFade * 0.7);
            vSeed = aSeed;
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying float vAlpha;
          varying float vSeed;
          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            float glow = 1.0 - smoothstep(0.0, 0.5, d);
            vec3 slate  = vec3(0.20, 0.25, 0.33);
            vec3 cyan   = vec3(0.13, 0.83, 0.93);
            vec3 amber  = vec3(0.96, 0.62, 0.04);
            vec3 c1 = mix(slate, cyan, smoothstep(0.0, 0.75, vSeed));
            vec3 c2 = mix(c1, amber, smoothstep(0.95, 1.0, vSeed));
            gl_FragColor = vec4(c2, glow * vAlpha * 0.4);
          }
        `}
      />
    </points>
  );
}

/* =========================================================
   NEURAL GRAPH — Red Neuronal (1-3-5-2) Totalmente Conectada
   ========================================================= */

function buildGraph() {
  const layers = [
    { id: "input",  x: -3.8, count: 1, color: "#A3E635", ySpread: 0.0 }, // lima
    { id: "layer2", x: -1.6, count: 3, color: "#22D3EE", ySpread: 3.2 }, // cyan
    { id: "layer3", x:  1.0, count: 5, color: "#818CF8", ySpread: 5.0 }, // indigo
    { id: "output", x:  3.6, count: 2, color: "#C084FC", ySpread: 2.2 }, // violeta
  ];

  const allNodes = [];
  const layersWithNodes = layers.map((layer, layerIdx) => {
    const nodes = [];
    for (let i = 0; i < layer.count; i++) {
      const t = layer.count === 1 ? 0.5 : i / (layer.count - 1);
      const y = -layer.ySpread / 2 + t * layer.ySpread;

      const node = {
        id: `${layer.id}-${i}`,
        layerId: layer.id,
        layerIdx,
        x: layer.x,
        y: y,
        z: 0,
        color: layer.color,
        size: layer.id === "input" ? 0.26 : 0.20,
        phase: layerIdx * 0.7 + i * 0.31,
      };
      nodes.push(node);
      allNodes.push(node);
    }
    return { ...layer, nodes };
  });

  const edges = [];
  for (let l = 0; l < layersWithNodes.length - 1; l++) {
    const fromNodes = layersWithNodes[l].nodes;
    const toNodes = layersWithNodes[l + 1].nodes;

    fromNodes.forEach((from) => {
      toNodes.forEach((to) => {
        edges.push({
          id: `${from.id}->${to.id}`,
          from,
          to,
          color: from.color,
          phase: (from.phase + to.phase) * 0.5,
        });
      });
    });
  }

  return { layers: layersWithNodes, allNodes, edges };
}

/* =========================================================
   GRAPH NODE — Esferas sólidas que tapan las líneas
   ========================================================= */

function GraphNode({ node }) {
  const groupRef = useRef();
  const haloRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      const s = 1 + Math.sin(t * 0.8 + node.phase) * 0.035;
      groupRef.current.scale.setScalar(s);
    }
    if (haloRef.current) {
      haloRef.current.material.opacity = 0.35 + Math.sin(t * 1.0 + node.phase) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[node.x, node.y, node.z]}>
      {/* Halo exterior: tenue, escribe depth para tapar las líneas de su zona */}
      <mesh ref={haloRef} renderOrder={1}>
        <sphereGeometry args={[node.size * 1.45, 32, 32]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={0.15}
          depthWrite={true}
          depthTest={true}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Esfera central: sólida, densa y opaca. Tapa TODO lo que queda detrás */}
      <mesh renderOrder={2}>
        <sphereGeometry args={[node.size, 48, 48]} />
                  <meshPhysicalMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={0.75}
          roughness={0.3}
          metalness={0.1}
          clearcoat={0.4}
          clearcoatRoughness={0.4}
          transparent={false}
          depthWrite={true}
          depthTest={true}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   GRAPH EDGE — Líneas marcadas, curvas, empujadas detrás
   ========================================================= */

function GraphEdge({ edge }) {
  const meshRef = useRef();

  const curve = useMemo(() => {
    // Empujamos las líneas -0.15 en Z para que queden detrás de las esferas
    const start = new THREE.Vector3(edge.from.x, edge.from.y, edge.from.z - 0.15);
    const end = new THREE.Vector3(edge.to.x, edge.to.y, edge.to.z - 0.15);
    const mid = start.clone().lerp(end, 0.5);

    const avgY = (edge.from.y + edge.to.y) / 2;
    mid.y += avgY * 0.6;
    mid.z += Math.abs(avgY) * 0.15 + 0.4;

    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [edge]);

  const geometry = useMemo(
    () => new THREE.TubeGeometry(curve, 40, 0.010, 6, false),
    [curve]
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.material.opacity = 0.55 + Math.sin(t * 0.5 + edge.phase) * 0.1;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} renderOrder={0}>
      <meshBasicMaterial
        color={edge.color}
        transparent
        opacity={0.6}
        depthWrite={false}
        depthTest={true}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* =========================================================
   GRAPH PULSE — Fotón brillante con halo y estela
   ========================================================= */

function GraphPulse({ edge, offset, speed }) {
  const groupRef = useRef();
  const coreRef = useRef();
  const haloRef = useRef();
  const trailRef = useRef([]);
  const TRAIL = 3;

  const curve = useMemo(() => {
    // Igual que GraphEdge: empujado -0.15 en Z
    const start = new THREE.Vector3(edge.from.x, edge.from.y, edge.from.z - 0.15);
    const end = new THREE.Vector3(edge.to.x, edge.to.y, edge.to.z - 0.15);
    const mid = start.clone().lerp(end, 0.5);

    const avgY = (edge.from.y + edge.to.y) / 2;
    mid.y += avgY * 0.6;
    mid.z += Math.abs(avgY) * 0.15 + 0.4;

    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [edge]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const p = ((t * speed + offset) % 1 + 1) % 1;
    const pt = curve.getPointAt(p);

    if (groupRef.current) {
      groupRef.current.position.copy(pt);
    }

    if (coreRef.current) {
      const s = 1 + Math.sin(t * 6 + offset * 10) * 0.25;
      coreRef.current.scale.setScalar(s);
    }

    if (haloRef.current) {
      const hs = 1 + Math.sin(t * 3 + offset * 5) * 0.15;
      haloRef.current.scale.setScalar(hs);
      haloRef.current.material.opacity = 0.45 + Math.sin(t * 4 + offset * 3) * 0.15;
    }

    for (let i = 0; i < TRAIL; i++) {
      const pp = ((t * speed + offset - (i + 1) * 0.015) % 1 + 1) % 1;
      const pt2 = curve.getPointAt(pp);
      const m = trailRef.current[i];
      if (m) {
        m.position.copy(pt2);
        m.material.opacity = 0.5 * (1 - i / TRAIL);
      }
    }
  });

  const pulseColor = edge.color;
  const glowColor = "#00E5FF";

  return (
    <group ref={groupRef} renderOrder={3}>
      {/* Halo exterior brillante */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0.5}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Núcleo blanco puro */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.032, 12, 12]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Estela */}
      {Array.from({ length: TRAIL }).map((_, i) => (
        <mesh key={i} ref={(el) => (trailRef.current[i] = el)}>
          <sphereGeometry args={[0.018, 8, 8]} />
          <meshBasicMaterial
            color={pulseColor}
            transparent
            opacity={0.5}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

/* =========================================================
   NEURAL GRAPH SYSTEM
   ========================================================= */

function NeuralGraphSystem() {
  const groupRef = useRef();
  const graph = useMemo(() => buildGraph(), []);

  const pulseStates = useMemo(
    () =>
      graph.edges.map((_, i) => ({
        offset: Math.random(),
        speed: 0.12 + Math.random() * 0.1,
      })),
    [graph.edges]
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.05) * 0.03;
    groupRef.current.position.y = Math.sin(t * 0.25) * 0.04;
  });

  return (
    <group ref={groupRef} position={[3.8, 0, 0]} scale={0.95}>
      {graph.edges.map((edge) => (
        <GraphEdge key={edge.id} edge={edge} />
      ))}

      {graph.allNodes.map((node) => (
        <GraphNode key={node.id} node={node} />
      ))}

      {graph.edges.map((edge, i) => (
        <GraphPulse
          key={`pulse-${edge.id}`}
          edge={edge}
          offset={pulseStates[i].offset}
          speed={pulseStates[i].speed}
        />
      ))}
    </group>
  );
}

/* =========================================================
   SCENE & HERO BACKGROUND
   ========================================================= */

function Scene() {
  return (
    <>
      <AmbientDust />
      <FlowParticles />
      <NeuralGraphSystem />
    </>
  );
}

export default function HeroBackground3D() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#07090F]">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        dpr={[1, 1.2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        frameloop="always"
      >
        <Scene />
      </Canvas>

      {/* Gradientes sutiles que no tapan la red neural */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 75% 50%, rgba(56,189,248,0.06), transparent 50%),
            linear-gradient(90deg, #07090F 0%, rgba(7,9,15,0.7) 35%, transparent 65%)
          `,
        }}
      />
    </div>
  );
}