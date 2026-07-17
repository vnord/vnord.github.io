"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitalArtifact } from "./OrbitalArtifact";
import { ORBIT_META, type OrbitId } from "./orbitSystem";

interface PlanetData {
  id: OrbitId;
  name: string;
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
  size: number;
  color: string;
  glowColor: string;
  emissiveIntensity: number;
}

interface PlanetProps {
  data: PlanetData;
  onClick: () => void;
  onHover: (id: string | null, screenPos: { x: number; y: number } | null) => void;
  isActive: boolean;
}

function SpiralArm({ color, count = 150, armOffset = 0 }: { color: string; count?: number; armOffset?: number }) {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = (i / count) * 3;
      const angle = t * Math.PI * 2 + armOffset;
      const r = 3 + t * 4;
      const spread = 0.8 + t * 0.5;
      
      pos[i * 3] = Math.cos(angle) * r + (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * spread;
    }
    return pos;
  }, [count, armOffset]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color={color}
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GalacticCore() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.3;
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[0.72, 2]} />
        <meshStandardMaterial
          color="#ffe8a3"
          emissive="#f0ae43"
          emissiveIntensity={2.8}
          roughness={0.82}
          flatShading
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.18, 32, 32]} />
        <meshBasicMaterial color="#f4b84c" transparent opacity={0.075} depthWrite={false} />
      </mesh>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#fef3c7"
          transparent
          opacity={0.55}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function BackgroundStars({ count = 400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const r = 30 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        col[i * 3] = 1; col[i * 3 + 1] = 0.9; col[i * 3 + 2] = 0.7;
      } else if (colorChoice < 0.6) {
        col[i * 3] = 0.7; col[i * 3 + 1] = 0.85; col[i * 3 + 2] = 1;
      } else {
        col[i * 3] = 1; col[i * 3 + 1] = 1; col[i * 3 + 2] = 1;
      }
    }
    return [pos, col];
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.003;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function BasePlanet({ data, onClick, onHover, isActive, children }: PlanetProps & { children?: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const contentRef = useRef<THREE.Group>(null);
  const artifactOrbitRef = useRef<THREE.Group>(null);
  const lastTooltipUpdateRef = useRef(0);
  const [hovered, setHovered] = useState(false);
  const { camera, size } = useThree();

  const getScreenPosition = () => {
    if (!groupRef.current) return null;
    const worldPos = new THREE.Vector3();
    groupRef.current.getWorldPosition(worldPos);
    const projected = worldPos.project(camera);
    return {
      x: (projected.x * 0.5 + 0.5) * size.width,
      y: (-projected.y * 0.5 + 0.5) * size.height,
    };
  };

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    if (groupRef.current) {
      const angle = t * data.orbitSpeed + data.orbitOffset;
      groupRef.current.position.x = Math.cos(angle) * data.orbitRadius;
      groupRef.current.position.z = Math.sin(angle) * data.orbitRadius;
      groupRef.current.position.y = Math.sin(t * (0.2 + data.orbitSpeed) + data.orbitOffset) * 0.28;
    }

    if (contentRef.current) {
      contentRef.current.rotation.x = -0.07 + Math.sin(t * 0.11 + data.orbitOffset) * 0.065;
      contentRef.current.rotation.y = t * 0.08 + data.orbitOffset * 0.18;
      contentRef.current.rotation.z = Math.sin(t * 0.18 + data.orbitOffset) * 0.045;
    }

    if (artifactOrbitRef.current) {
      artifactOrbitRef.current.rotation.z = data.orbitOffset * 0.12;
      artifactOrbitRef.current.rotation.x = Math.PI * 0.44;
    }

    if (glowRef.current) {
      const pulse = 1 + Math.sin(t * 0.65 + data.orbitOffset) * 0.025;
      const scale = (hovered || isActive) ? pulse * 1.34 : pulse * 1.08;
      glowRef.current.scale.setScalar(scale);
    }

    if (hovered && t - lastTooltipUpdateRef.current > 0.08) {
      const screenPos = getScreenPosition();
      if (screenPos) {
        onHover(data.id, screenPos);
        lastTooltipUpdateRef.current = t;
      }
    }

  });

  const handlePointerEnter = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (isActive) return;
    setHovered(true);
    document.body.style.cursor = "pointer";
    const screenPos = getScreenPosition();
    if (screenPos) {
      onHover(data.id, screenPos);
    }
  };

  const handlePointerLeave = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = "auto";
    onHover(null, null);
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = "auto";
    onHover(null, null);
    onClick();
  };

  const isHighlighted = hovered || isActive;

  return (
    <group ref={groupRef}>
      <mesh
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <sphereGeometry args={[data.size * 2, 1, 1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <mesh ref={glowRef} renderOrder={-1}>
        <icosahedronGeometry args={[data.size * 1.12, 2]} />
        <meshBasicMaterial
          color={data.glowColor}
          transparent
          opacity={isHighlighted ? 0.07 : 0.018}
          depthWrite={false}
        />
      </mesh>

      <group ref={artifactOrbitRef}>
        <mesh>
          <torusGeometry args={[data.size * 1.38, data.size * 0.009, 4, 64]} />
          <meshBasicMaterial
            color={data.glowColor}
            transparent
            opacity={isHighlighted ? 0.32 : 0.08}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      <group ref={contentRef} scale={isHighlighted ? 1.46 : 1.3}>
        {children}
      </group>

      <pointLight
        color={data.glowColor}
        intensity={isHighlighted ? 2.2 : 0.85}
        distance={data.size * 7}
        decay={2}
      />
    </group>
  );
}

function OrbitPath({ radius, color }: { radius: number; color: string }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 8, 128]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.1}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

interface GalaxyProps {
  onPlanetClick: (id: string) => void;
  onPlanetHover: (id: string | null, screenPos: { x: number; y: number } | null) => void;
  activePlanet: string | null;
}

export function Galaxy({ onPlanetClick, onPlanetHover, activePlanet }: GalaxyProps) {
  const galaxyRef = useRef<THREE.Group>(null);

  const planets: PlanetData[] = [
    {
      id: "experience",
      name: ORBIT_META.experience.name,
      orbitRadius: 5,
      orbitSpeed: 0.15,
      orbitOffset: 0,
      size: 0.9,
      color: ORBIT_META.experience.solid,
      glowColor: ORBIT_META.experience.accent,
      emissiveIntensity: 0.4,
    },
    {
      id: "skills",
      name: ORBIT_META.skills.name,
      orbitRadius: 7,
      orbitSpeed: 0.12,
      orbitOffset: Math.PI * 0.6,
      size: 0.85,
      color: ORBIT_META.skills.solid,
      glowColor: ORBIT_META.skills.accent,
      emissiveIntensity: 0.5,
    },
    {
      id: "education",
      name: ORBIT_META.education.name,
      orbitRadius: 9,
      orbitSpeed: 0.1,
      orbitOffset: Math.PI * 1.2,
      size: 0.8,
      color: ORBIT_META.education.solid,
      glowColor: ORBIT_META.education.accent,
      emissiveIntensity: 0.4,
    },
    {
      id: "projects",
      name: ORBIT_META.projects.name,
      orbitRadius: 11,
      orbitSpeed: 0.08,
      orbitOffset: Math.PI * 0.3,
      size: 0.95,
      color: ORBIT_META.projects.solid,
      glowColor: ORBIT_META.projects.accent,
      emissiveIntensity: 0.5,
    },
    {
      id: "personal",
      name: ORBIT_META.personal.name,
      orbitRadius: 13,
      orbitSpeed: 0.06,
      orbitOffset: Math.PI * 1.5,
      size: 0.75,
      color: ORBIT_META.personal.solid,
      glowColor: ORBIT_META.personal.accent,
      emissiveIntensity: 0.4,
    },
    {
      id: "contact",
      name: ORBIT_META.contact.name,
      orbitRadius: 15,
      orbitSpeed: 0.05,
      orbitOffset: Math.PI * 0.9,
      size: 0.82,
      color: ORBIT_META.contact.solid,
      glowColor: ORBIT_META.contact.accent,
      emissiveIntensity: 0.5,
    },
    {
      id: "reading",
      name: ORBIT_META.reading.name,
      orbitRadius: 17,
      orbitSpeed: 0.04,
      orbitOffset: Math.PI * 0.2,
      size: 0.8,
      color: ORBIT_META.reading.solid,
      glowColor: ORBIT_META.reading.accent,
      emissiveIntensity: 0.4,
    },
  ];

  useFrame(({ clock }) => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y = clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <group ref={galaxyRef}>
      <GalacticCore />
      
      <SpiralArm color="#6366f1" armOffset={0} />
      <SpiralArm color="#ec4899" armOffset={Math.PI} />
      <SpiralArm color="#22d3ee" armOffset={Math.PI * 0.5} count={100} />
      <SpiralArm color="#fbbf24" armOffset={Math.PI * 1.5} count={100} />
      
      {planets.map((planet) => (
        <OrbitPath key={`orbit-${planet.id}`} radius={planet.orbitRadius} color={planet.glowColor} />
      ))}
      
      {planets.map((planet) => (
        <BasePlanet
          key={planet.id}
          data={planet}
          onClick={() => onPlanetClick(planet.id)}
          onHover={onPlanetHover}
          isActive={activePlanet === planet.id}
        >
          <OrbitalArtifact
            id={planet.id}
            size={planet.size}
            solidColor={planet.color}
            accentColor={planet.glowColor}
          />
        </BasePlanet>
      ))}

      <BackgroundStars count={500} />

      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#fef3c7" distance={20} />
    </group>
  );
}
