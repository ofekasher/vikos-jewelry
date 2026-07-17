"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ── Gold ring ── */
function Ring({ position, rotation, scale = 1 }: { position: [number,number,number]; rotation: [number,number,number]; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.18;
    ref.current.rotation.y += delta * 0.12;
  });
  return (
    <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
      <torusGeometry args={[1, 0.08, 32, 100]} />
      <meshStandardMaterial color="#8B7355" metalness={1} roughness={0.08} />
    </mesh>
  );
}

/* ── Diamond gem ── */
function Diamond({ position, scale = 1 }: { position: [number,number,number]; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.25;
    ref.current.rotation.z += delta * 0.1;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color="#E8D5B0" metalness={1} roughness={0.0} envMapIntensity={3} />
    </mesh>
  );
}

/* ── Floating pearl ── */
function Pearl({ position }: { position: [number,number,number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + position[0]) * 0.15;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.22, 32, 32]} />
      <MeshDistortMaterial color="#F0EAE0" metalness={0.4} roughness={0.1} distort={0.08} speed={2} />
    </mesh>
  );
}

/* ── Particle dust ── */
function Particles() {
  const count = 120;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null!);
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.028} color="#8B7355" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

/* ── Scene ── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#fff8e7" />
      <directionalLight position={[-5, -3, -5]} intensity={0.4} color="#8B7355" />
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#E8D5B0" />

      <Environment preset="studio" />

      <Particles />
      <Sparkles count={60} scale={10} size={1.2} speed={0.3} color="#8B7355" opacity={0.5} />

      {/* Rings */}
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        <Ring position={[-3.2, 0.8, -1]} rotation={[0.5, 0.3, 0.1]} scale={1.1} />
      </Float>
      <Float speed={0.9} rotationIntensity={0.3} floatIntensity={0.5}>
        <Ring position={[3.0, -0.5, -2]} rotation={[0.2, 0.8, 0.4]} scale={0.85} />
      </Float>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
        <Ring position={[0.5, 2.2, -3]} rotation={[1.1, 0.2, 0.6]} scale={0.7} />
      </Float>

      {/* Diamonds */}
      <Float speed={1.1} floatIntensity={0.7}>
        <Diamond position={[2.2, 1.4, 0]} scale={1.0} />
      </Float>
      <Float speed={0.8} floatIntensity={0.5}>
        <Diamond position={[-2.0, -1.2, -1]} scale={0.7} />
      </Float>
      <Float speed={1.4} floatIntensity={0.9}>
        <Diamond position={[-0.8, -2.0, 0.5]} scale={0.5} />
      </Float>

      {/* Pearls */}
      <Pearl position={[1.2, -1.8, 0.5]} />
      <Pearl position={[-3.5, 1.5, -0.5]} />
      <Pearl position={[3.8, 1.0, -1]} />
      <Pearl position={[-1.5, 2.5, -1.5]} />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Scene />
    </Canvas>
  );
}
