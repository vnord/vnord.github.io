"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense, useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Galaxy } from "./Galaxy";

function CosmicDust() {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 1000;
    const pos = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 15 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = (radius * Math.sin(phi) * Math.sin(theta)) * 0.4;
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        colors[i * 3] = 0.4; colors[i * 3 + 1] = 0.9; colors[i * 3 + 2] = 0.7;
      } else if (colorChoice < 0.6) {
        colors[i * 3] = 0.6; colors[i * 3 + 1] = 0.7; colors[i * 3 + 2] = 1.0;
      } else if (colorChoice < 0.8) {
        colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.8; colors[i * 3 + 2] = 0.4;
      } else {
        colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.5; colors[i * 3 + 2] = 0.7;
      }

      sizes[i] = 0.5 + Math.random() * 1.5;
    }
    return { positions: pos, colors, sizes };
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.015;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[particles.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function NebulaCloud({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.02;
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
      ref.current.scale.setScalar(scale * pulse);
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[8, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.03}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

function AmbientStars() {
  return (
    <>
      <Stars
        radius={200}
        depth={100}
        count={10000}
        factor={5}
        saturation={0.3}
        fade
        speed={0.2}
      />
      <Stars
        radius={150}
        depth={80}
        count={3000}
        factor={3}
        saturation={0.5}
        fade
        speed={0.3}
      />
    </>
  );
}

function GalaxyLighting() {
  return (
    <>
      <ambientLight intensity={0.4} color="#e0e7ff" />
      <directionalLight position={[20, 15, 20]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-15, 10, -15]} intensity={0.8} color="#a5b4fc" />
      <directionalLight position={[0, -20, 0]} intensity={0.3} color="#6ee7b7" />
      <pointLight position={[0, 0, 0]} intensity={50} color="#fef3c7" distance={100} decay={2} />
      <pointLight position={[30, 10, 20]} intensity={20} color="#f472b6" distance={60} decay={2} />
      <pointLight position={[-25, -5, -15]} intensity={15} color="#22d3ee" distance={50} decay={2} />
    </>
  );
}

interface SceneContentProps {
  onPlanetClick: (id: string) => void;
  onPlanetHover: (id: string | null, screenPos: { x: number; y: number } | null) => void;
  activePlanet: string | null;
}

function SceneContent({ onPlanetClick, onPlanetHover, activePlanet }: SceneContentProps) {
  return (
    <>
      <GalaxyLighting />
      <AmbientStars />
      <CosmicDust />
      
      <NebulaCloud position={[30, 5, -20]} color="#7c3aed" scale={1.5} />
      <NebulaCloud position={[-25, -8, 15]} color="#ec4899" scale={1.2} />
      <NebulaCloud position={[0, 15, 30]} color="#3b82f6" scale={1.0} />

      <Galaxy
        onPlanetClick={onPlanetClick}
        onPlanetHover={onPlanetHover}
        activePlanet={activePlanet}
      />

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={true}
        minDistance={12}
        maxDistance={50}
        autoRotate
        autoRotateSpeed={0.15}
        dampingFactor={0.05}
        maxPolarAngle={Math.PI * 0.75}
        minPolarAngle={Math.PI * 0.25}
        rotateSpeed={0.5}
      />
    </>
  );
}

interface SceneProps {
  onHotspotClickAction: (id: string) => void;
  onHotspotHoverAction: (id: string | null, screenPos: { x: number; y: number } | null) => void;
  activeHotspot: string | null;
}

export function Scene({
  onHotspotClickAction,
  onHotspotHoverAction,
  activeHotspot,
}: SceneProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ 
          position: isMobile ? [18, 10, 25] : [15, 8, 20], 
          fov: isMobile ? 50 : 45 
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        style={{ touchAction: "none" }}
      >
        <Suspense fallback={null}>
          <SceneContent
            onPlanetClick={onHotspotClickAction}
            onPlanetHover={onHotspotHoverAction}
            activePlanet={activeHotspot}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
