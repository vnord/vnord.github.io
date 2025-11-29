"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

interface PlanetData {
  id: string;
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
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#fef3c7"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
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
      groupRef.current.position.y = Math.sin(t * 0.5 + data.orbitOffset) * 0.5;
    }

    if (contentRef.current) {
      contentRef.current.rotation.y = t * 0.3;
    }

    if (glowRef.current) {
      const pulse = 1 + Math.sin(t * 2 + data.orbitOffset) * 0.1;
      const scale = (hovered || isActive) ? pulse * 1.4 : pulse * 1.15;
      glowRef.current.scale.setScalar(scale);
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
        <sphereGeometry args={[data.size * 1.2, 32, 32]} />
        <meshBasicMaterial
          color={data.glowColor}
          transparent
          opacity={isHighlighted ? 0.25 : 0.12}
          depthWrite={false}
        />
      </mesh>

      <group ref={contentRef} scale={isHighlighted ? 1.1 : 1}>
        {children}
      </group>

      <pointLight
        color={data.glowColor}
        intensity={isHighlighted ? 3 : 1}
        distance={data.size * 10}
        decay={2}
      />
    </group>
  );
}

function ExperiencePlanet(props: PlanetProps) {
  const { data, isActive } = props;
  const hovered = isActive;
  return (
    <BasePlanet {...props}>
      <mesh>
        <boxGeometry args={[data.size * 1.2, data.size * 0.8, data.size * 0.5]} />
        <meshStandardMaterial color="#92400e" roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[0, data.size * 0.45, 0]}>
        <boxGeometry args={[data.size * 0.3, data.size * 0.1, data.size * 0.1]} />
        <meshStandardMaterial color="#78350f" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0, data.size * 0.26]}>
        <boxGeometry args={[data.size * 0.25, data.size * 0.15, data.size * 0.02]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
      </mesh>
    </BasePlanet>
  );
}

function SkillsPlanet(props: PlanetProps) {
  const { data } = props;
  const gear1Ref = useRef<THREE.Group>(null);
  const gear2Ref = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (gear1Ref.current) gear1Ref.current.rotation.z = t * 0.5;
    if (gear2Ref.current) gear2Ref.current.rotation.z = -t * 0.625;
  });

  const teethCount1 = 8;
  const teethCount2 = 10;

  return (
    <BasePlanet {...props}>
      <group ref={gear1Ref} position={[-data.size * 0.3, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[data.size * 0.4, data.size * 0.4, data.size * 0.12, 32]} />
          <meshStandardMaterial color="#4f46e5" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[data.size * 0.12, data.size * 0.12, data.size * 0.15, 16]} />
          <meshStandardMaterial color="#1e1b4b" metalness={0.9} roughness={0.1} />
        </mesh>
        {Array.from({ length: teethCount1 }).map((_, i) => {
          const angle = (i / teethCount1) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(angle) * data.size * 0.45, 0, Math.sin(angle) * data.size * 0.45]} rotation={[0, -angle, 0]}>
              <boxGeometry args={[data.size * 0.12, data.size * 0.12, data.size * 0.1]} />
              <meshStandardMaterial color="#4f46e5" metalness={0.8} roughness={0.2} />
            </mesh>
          );
        })}
      </group>

      <group ref={gear2Ref} position={[data.size * 0.35, data.size * 0.15, data.size * 0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[data.size * 0.32, data.size * 0.32, data.size * 0.1, 32]} />
          <meshStandardMaterial color="#818cf8" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[data.size * 0.1, data.size * 0.1, data.size * 0.12, 16]} />
          <meshStandardMaterial color="#312e81" metalness={0.9} roughness={0.1} />
        </mesh>
        {Array.from({ length: teethCount2 }).map((_, i) => {
          const angle = (i / teethCount2) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(angle) * data.size * 0.36, 0, Math.sin(angle) * data.size * 0.36]} rotation={[0, -angle, 0]}>
              <boxGeometry args={[data.size * 0.1, data.size * 0.1, data.size * 0.08]} />
              <meshStandardMaterial color="#818cf8" metalness={0.8} roughness={0.2} />
            </mesh>
          );
        })}
      </group>

    </BasePlanet>
  );
}

function EducationPlanet(props: PlanetProps) {
  const { data } = props;
  return (
    <BasePlanet {...props}>
      <group position={[0, data.size * 0.3, 0]}>
        <mesh>
          <boxGeometry args={[data.size * 0.9, data.size * 0.06, data.size * 0.9]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        <mesh position={[0, data.size * 0.12, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[data.size * 0.45, data.size * 0.2, 4]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        <mesh position={[data.size * 0.45, 0, 0]}>
          <sphereGeometry args={[data.size * 0.06, 8, 8]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.8} />
        </mesh>
      </group>
      <group position={[0, -data.size * 0.2, 0]}>
        <mesh>
          <boxGeometry args={[data.size * 0.8, data.size * 0.12, data.size * 0.6]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        <mesh position={[0, data.size * 0.07, 0]}>
          <boxGeometry args={[data.size * 0.75, data.size * 0.08, data.size * 0.55]} />
          <meshStandardMaterial color="#fef3c7" />
        </mesh>
      </group>
    </BasePlanet>
  );
}

function ProjectsPlanet(props: PlanetProps) {
  const { data } = props;
  const flameRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (flameRef.current) {
      flameRef.current.scale.y = 0.8 + Math.sin(clock.getElapsedTime() * 10) * 0.2;
    }
  });

  return (
    <BasePlanet {...props}>
      <mesh>
        <cylinderGeometry args={[data.size * 0.25, data.size * 0.3, data.size * 0.9, 12]} />
        <meshStandardMaterial color="#f5f5f4" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, data.size * 0.6, 0]}>
        <coneGeometry args={[data.size * 0.25, data.size * 0.35, 12]} />
        <meshStandardMaterial color="#ec4899" metalness={0.4} roughness={0.3} />
      </mesh>
      <mesh position={[0, data.size * 0.15, 0]}>
        <cylinderGeometry args={[data.size * 0.27, data.size * 0.27, data.size * 0.2, 12]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>
      <mesh position={[0, data.size * 0.3, data.size * 0.22]}>
        <circleGeometry args={[data.size * 0.08, 16]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.8} />
      </mesh>
      <mesh ref={flameRef} position={[0, -data.size * 0.65, 0]}>
        <coneGeometry args={[data.size * 0.22, data.size * 0.45, 12]} />
        <meshStandardMaterial color="#ff6600" emissive="#ff4400" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0, -data.size * 0.55, 0]}>
        <coneGeometry args={[data.size * 0.14, data.size * 0.3, 12]} />
        <meshStandardMaterial color="#ffcc00" emissive="#ffaa00" emissiveIntensity={3} />
      </mesh>
    </BasePlanet>
  );
}

function PersonalPlanet(props: PlanetProps) {
  const { data } = props;

  return (
    <BasePlanet {...props}>
      <mesh position={[0, -data.size * 0.15, 0]}>
        <boxGeometry args={[data.size * 0.7, data.size * 0.45, data.size * 0.5]} />
        <meshStandardMaterial color="#fef3c7" />
      </mesh>
      
      <group position={[0, data.size * 0.2, 0]}>
        <mesh rotation={[0, 0, Math.PI / 4]} position={[-data.size * 0.175, 0, 0]}>
          <boxGeometry args={[data.size * 0.5, data.size * 0.08, data.size * 0.55]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 4]} position={[data.size * 0.175, 0, 0]}>
          <boxGeometry args={[data.size * 0.5, data.size * 0.08, data.size * 0.55]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
      </group>
      
      <mesh position={[0, -data.size * 0.2, data.size * 0.26]}>
        <boxGeometry args={[data.size * 0.12, data.size * 0.2, data.size * 0.02]} />
        <meshStandardMaterial color="#854d0e" />
      </mesh>
      
      {[[-0.2, 0], [0.2, 0]].map(([x, y], i) => (
        <mesh key={i} position={[x * data.size, y * data.size, data.size * 0.26]}>
          <boxGeometry args={[data.size * 0.1, data.size * 0.1, data.size * 0.02]} />
          <meshStandardMaterial color="#7dd3fc" emissive="#7dd3fc" emissiveIntensity={0.4} />
        </mesh>
      ))}
      
      <mesh position={[0, -data.size * 0.4, 0]}>
        <cylinderGeometry args={[data.size * 0.5, data.size * 0.6, data.size * 0.08, 24]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>
    </BasePlanet>
  );
}

function ContactPlanet(props: PlanetProps) {
  const { data } = props;
  const waveRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (waveRef.current) {
      waveRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(clock.getElapsedTime() * 3 + i * 0.5) * data.size * 0.1;
      });
    }
  });

  return (
    <BasePlanet {...props}>
      <mesh>
        <boxGeometry args={[data.size * 1.1, data.size * 0.7, data.size * 0.08]} />
        <meshStandardMaterial color="#f5f5f4" />
      </mesh>
      <mesh position={[0, data.size * 0.15, data.size * 0.05]} rotation={[0.4, 0, 0]}>
        <planeGeometry args={[data.size * 1.05, data.size * 0.5]} />
        <meshStandardMaterial color="#e5e5e5" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, data.size * 0.05]}>
        <planeGeometry args={[data.size * 0.8, data.size * 0.01]} />
        <meshStandardMaterial color="#22d3ee" />
      </mesh>
      <mesh position={[0, -data.size * 0.15, data.size * 0.05]}>
        <planeGeometry args={[data.size * 0.6, data.size * 0.01]} />
        <meshStandardMaterial color="#22d3ee" />
      </mesh>
      <group ref={waveRef} position={[0, data.size * 0.6, 0]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[(i - 1) * data.size * 0.2, 0, 0]}>
            <sphereGeometry args={[data.size * 0.06, 8, 8]} />
            <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.8} />
          </mesh>
        ))}
      </group>
    </BasePlanet>
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
      name: "Experience",
      orbitRadius: 5,
      orbitSpeed: 0.15,
      orbitOffset: 0,
      size: 0.9,
      color: "#f59e0b",
      glowColor: "#fbbf24",
      emissiveIntensity: 0.4,
    },
    {
      id: "skills",
      name: "Skills",
      orbitRadius: 7,
      orbitSpeed: 0.12,
      orbitOffset: Math.PI * 0.6,
      size: 0.85,
      color: "#6366f1",
      glowColor: "#a5b4fc",
      emissiveIntensity: 0.5,
    },
    {
      id: "education",
      name: "Education",
      orbitRadius: 9,
      orbitSpeed: 0.1,
      orbitOffset: Math.PI * 1.2,
      size: 0.8,
      color: "#10b981",
      glowColor: "#6ee7b7",
      emissiveIntensity: 0.4,
    },
    {
      id: "projects",
      name: "Projects",
      orbitRadius: 11,
      orbitSpeed: 0.08,
      orbitOffset: Math.PI * 0.3,
      size: 0.95,
      color: "#ec4899",
      glowColor: "#f472b6",
      emissiveIntensity: 0.5,
    },
    {
      id: "personal",
      name: "About Me",
      orbitRadius: 13,
      orbitSpeed: 0.06,
      orbitOffset: Math.PI * 1.5,
      size: 0.75,
      color: "#f97316",
      glowColor: "#fb923c",
      emissiveIntensity: 0.4,
    },
    {
      id: "contact",
      name: "Contact",
      orbitRadius: 15,
      orbitSpeed: 0.05,
      orbitOffset: Math.PI * 0.9,
      size: 0.7,
      color: "#06b6d4",
      glowColor: "#22d3ee",
      emissiveIntensity: 0.5,
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
      
      {planets.map((planet) => {
        const commonProps = {
          data: planet,
          onClick: () => onPlanetClick(planet.id),
          onHover: onPlanetHover,
          isActive: activePlanet === planet.id,
        };
        
        switch (planet.id) {
          case "experience":
            return <ExperiencePlanet key={planet.id} {...commonProps} />;
          case "skills":
            return <SkillsPlanet key={planet.id} {...commonProps} />;
          case "education":
            return <EducationPlanet key={planet.id} {...commonProps} />;
          case "projects":
            return <ProjectsPlanet key={planet.id} {...commonProps} />;
          case "personal":
            return <PersonalPlanet key={planet.id} {...commonProps} />;
          case "contact":
            return <ContactPlanet key={planet.id} {...commonProps} />;
          default:
            return null;
        }
      })}

      <BackgroundStars count={500} />

      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#fef3c7" distance={20} />
    </group>
  );
}
