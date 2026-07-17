"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense, useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Galaxy } from "./Galaxy";

function CosmicDust({ count = 1000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

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

    }
    return { positions: pos, colors };
  }, [count]);

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

function AmbientStars({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <Stars
        radius={200}
        depth={100}
        count={compact ? 2600 : 10000}
        factor={5}
        saturation={0.3}
        fade
        speed={0.2}
      />
      <Stars
        radius={150}
        depth={80}
        count={compact ? 700 : 3000}
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
  viewportMode: ViewportMode;
}

type ViewportMode = "desktop" | "compact-landscape" | "phone-portrait";

interface CameraConfig {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  minDistance: number;
  maxDistance: number;
}

const cameraConfigs: Record<ViewportMode, CameraConfig> = {
  desktop: {
    position: [15, 8, 20],
    target: [0, 0, 0],
    fov: 45,
    minDistance: 12,
    maxDistance: 50,
  },
  "compact-landscape": {
    position: [23, 14, 35],
    target: [0, -1, 0],
    fov: 52,
    minDistance: 20,
    maxDistance: 64,
  },
  "phone-portrait": {
    position: [32, 20, 51],
    target: [0, -2.4, 0],
    fov: 58,
    minDistance: 34,
    maxDistance: 90,
  },
};

function ResponsiveCamera({ config }: { config: CameraConfig }) {
  const { camera } = useThree();

  useEffect(() => {
    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    perspectiveCamera.position.set(...config.position);
    perspectiveCamera.fov = config.fov;
    perspectiveCamera.lookAt(...config.target);
    perspectiveCamera.updateProjectionMatrix();
  }, [camera, config]);

  return null;
}

function SceneContent({ onPlanetClick, onPlanetHover, activePlanet, viewportMode }: SceneContentProps) {
  const cameraConfig = cameraConfigs[viewportMode];
  const isCompact = viewportMode !== "desktop";

  return (
    <>
      <ResponsiveCamera config={cameraConfig} />
      <GalaxyLighting />
      <AmbientStars compact={isCompact} />
      <CosmicDust count={isCompact ? 280 : 1000} />
      
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
        target={cameraConfig.target}
        enablePan={false}
        enableZoom={true}
        minDistance={cameraConfig.minDistance}
        maxDistance={cameraConfig.maxDistance}
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
  const [viewportMode, setViewportMode] = useState<ViewportMode>("desktop");

  useEffect(() => {
    const checkViewport = () => {
      const { innerWidth: width, innerHeight: height } = window;

      if (width <= 768 && height > width) {
        setViewportMode("phone-portrait");
      } else if (width <= 900 || height <= 600) {
        setViewportMode("compact-landscape");
      } else {
        setViewportMode("desktop");
      }
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const cameraConfig = cameraConfigs[viewportMode];
  const isCompact = viewportMode !== "desktop";
  
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ 
          position: cameraConfig.position,
          fov: cameraConfig.fov,
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={isCompact ? [1, 1.35] : [1, 2]}
        style={{ touchAction: "none" }}
      >
        <Suspense fallback={null}>
          <SceneContent
            onPlanetClick={onHotspotClickAction}
            onPlanetHover={onHotspotHoverAction}
            activePlanet={activeHotspot}
            viewportMode={viewportMode}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
