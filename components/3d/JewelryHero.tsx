"use client";
import { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ── Diamond geometry ─────────────────────────────────────────── */
function Diamond({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.35;
    if (mouse.current) {
      mesh.current.rotation.x = THREE.MathUtils.lerp(
        mesh.current.rotation.x,
        mouse.current.y * 0.3,
        0.05
      );
      mesh.current.position.x = THREE.MathUtils.lerp(
        mesh.current.position.x,
        mouse.current.x * 0.4,
        0.05
      );
    }
  });

  /* Octahedron = classic diamond silhouette */
  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={mesh} castShadow>
        <octahedronGeometry args={[1.6, 0]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={1}
          roughness={0.05}
          envMapIntensity={2.5}
        />
      </mesh>
    </Float>
  );
}

/* ── Ring geometry ────────────────────────────────────────────── */
function Ring({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.z += delta * 0.2;
    if (mouse.current) {
      mesh.current.rotation.x = THREE.MathUtils.lerp(
        mesh.current.rotation.x,
        mouse.current.y * 0.25,
        0.04
      );
      mesh.current.rotation.y = THREE.MathUtils.lerp(
        mesh.current.rotation.y,
        mouse.current.x * 0.25,
        0.04
      );
    }
  });

  return (
    <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.4}>
      <mesh ref={mesh} castShadow>
        <torusGeometry args={[1.1, 0.28, 64, 128]} />
        <meshStandardMaterial
          color="#C0C0C0"
          metalness={1}
          roughness={0.04}
          envMapIntensity={3}
        />
      </mesh>
    </Float>
  );
}

/* ── Scene ────────────────────────────────────────────────────── */
function Scene({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#fff8e7" castShadow />
      <directionalLight position={[-5, -3, -5]} intensity={0.4} color="#D4AF37" />
      <pointLight position={[0, 4, 2]} intensity={0.8} color="#ffffff" />
      <Environment preset="studio" />

      {/* Diamond slightly offset left, ring right */}
      <group position={[-0.8, 0, 0]}>
        <Diamond mouse={mouse} />
      </group>
      <group position={[1.2, -0.3, 0]}>
        <Ring mouse={mouse} />
      </group>
    </>
  );
}

/* ── Public component ─────────────────────────────────────────── */
export default function JewelryHero() {
  const mouseRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: -((e.clientY - rect.top) / rect.height - 0.5) * 2,
    };
  };

  return (
    <div
      className="w-full h-full"
      onMouseMove={handleMouseMove}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        shadows
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene mouse={mouseRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
