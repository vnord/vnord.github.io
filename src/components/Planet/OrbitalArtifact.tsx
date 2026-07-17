"use client";

import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ORBIT_META, type OrbitId } from "./orbitSystem";

export type OrbitalArtifactProps = {
  id: OrbitId;
  size?: number;
  solidColor?: string;
  accentColor?: string;
};

type ArtifactShapeProps = {
  size: number;
  solidColor: string;
  accentColor: string;
};

type PaintedMaterialProps = {
  color: string;
  emissiveIntensity?: number;
  metalness?: number;
  roughness?: number;
};

const CAP_BOARD_SHAPE = new THREE.Shape();
CAP_BOARD_SHAPE.moveTo(-0.72, 0.08);
CAP_BOARD_SHAPE.lineTo(0, 0.44);
CAP_BOARD_SHAPE.lineTo(0.72, 0.08);
CAP_BOARD_SHAPE.lineTo(0, -0.22);
CAP_BOARD_SHAPE.closePath();

const HOUSE_ROOF_SHAPE = new THREE.Shape();
HOUSE_ROOF_SHAPE.moveTo(-0.49, 0);
HOUSE_ROOF_SHAPE.lineTo(0, 0.38);
HOUSE_ROOF_SHAPE.lineTo(0.49, 0);
HOUSE_ROOF_SHAPE.closePath();

const ENVELOPE_FLAP_SHAPE = new THREE.Shape();
ENVELOPE_FLAP_SHAPE.moveTo(-0.56, 0.25);
ENVELOPE_FLAP_SHAPE.lineTo(0.56, 0.25);
ENVELOPE_FLAP_SHAPE.lineTo(0, -0.15);
ENVELOPE_FLAP_SHAPE.closePath();

function PaintedMaterial({
  color,
  emissiveIntensity = 0.08,
  metalness = 0.22,
  roughness = 0.46,
}: PaintedMaterialProps) {
  return (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={emissiveIntensity}
      metalness={metalness}
      roughness={roughness}
      flatShading
    />
  );
}

function AccentMaterial({ color, intensity = 0.42 }: { color: string; intensity?: number }) {
  return (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={intensity}
      roughness={0.3}
      metalness={0.46}
      flatShading
    />
  );
}

function WarmMetalMaterial({ intensity = 0.18 }: { intensity?: number }) {
  return (
    <meshStandardMaterial
      color="#e5b85c"
      emissive="#a66b20"
      emissiveIntensity={intensity}
      roughness={0.28}
      metalness={0.72}
      flatShading
    />
  );
}

function PaperMaterial() {
  return (
    <meshStandardMaterial
      color="#f1ead8"
      emissive="#c8bfa8"
      emissiveIntensity={0.04}
      roughness={0.86}
      metalness={0.02}
      flatShading
    />
  );
}

function ArtifactLine({
  from,
  to,
  z,
  width,
  color,
  intensity = 0.34,
}: {
  from: [number, number];
  to: [number, number];
  z: number;
  width: number;
  color: string;
  intensity?: number;
}) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const length = Math.hypot(dx, dy);

  return (
    <mesh
      position={[(from[0] + to[0]) / 2, (from[1] + to[1]) / 2, z]}
      rotation={[0, 0, Math.atan2(dy, dx)]}
    >
      <boxGeometry args={[length, width, width * 0.72]} />
      <AccentMaterial color={color} intensity={intensity} />
    </mesh>
  );
}

function ExperienceArtifact({ size, solidColor, accentColor }: ArtifactShapeProps) {
  const caseRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!caseRef.current) return;
    const t = clock.getElapsedTime();
    caseRef.current.rotation.y = Math.sin(t * 0.42) * 0.07;
    caseRef.current.rotation.x = Math.sin(t * 0.31 + 0.8) * 0.025;
  });

  return (
    <group ref={caseRef}>
      <mesh position={[0, -size * 0.12, 0]}>
        <boxGeometry args={[size * 1.12, size * 0.6, size * 0.48]} />
        <PaintedMaterial color={solidColor} emissiveIntensity={0.1} roughness={0.38} />
      </mesh>
      <mesh position={[0, size * 0.13, 0]}>
        <boxGeometry args={[size * 1.16, size * 0.2, size * 0.5]} />
        <PaintedMaterial color="#6f4527" emissiveIntensity={0.08} roughness={0.4} />
      </mesh>

      {[-0.2, 0.2].map((x) => (
        <mesh key={`handle-post-${x}`} position={[x * size, size * 0.32, 0]}>
          <boxGeometry args={[size * 0.07, size * 0.23, size * 0.12]} />
          <PaintedMaterial color="#5a3823" roughness={0.34} metalness={0.3} />
        </mesh>
      ))}
      <mesh position={[0, size * 0.43, 0]}>
        <torusGeometry args={[size * 0.2, size * 0.042, 6, 18, Math.PI]} />
        <PaintedMaterial color="#5a3823" roughness={0.34} metalness={0.3} />
      </mesh>

      <mesh position={[0, size * 0.015, size * 0.255]}>
        <boxGeometry args={[size * 1.02, size * 0.052, size * 0.035]} />
        <PaintedMaterial color="#4c2f20" roughness={0.35} />
      </mesh>
      {[-0.29, 0.29].map((x) => (
        <mesh key={`latch-${x}`} position={[x * size, size * 0.015, size * 0.29]}>
          <boxGeometry args={[size * 0.105, size * 0.14, size * 0.055]} />
          <WarmMetalMaterial intensity={0.24} />
        </mesh>
      ))}

      <mesh position={[size * 0.38, -size * 0.15, size * 0.275]} rotation={[0, 0, -0.18]}>
        <circleGeometry args={[size * 0.09, 10]} />
        <AccentMaterial color={accentColor} intensity={0.26} />
      </mesh>
      <mesh position={[size * 0.38, -size * 0.15, size * 0.286]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[size * 0.065, size * 0.065, size * 0.015]} />
        <PaintedMaterial color="#8f4c58" emissiveIntensity={0.12} />
      </mesh>

      {[-0.5, 0.5].flatMap((x) =>
        [-0.33, 0.17].map((y) => (
          <mesh key={`${x}-${y}`} position={[x * size, y * size, size * 0.255]}>
            <sphereGeometry args={[size * 0.035, 6, 5]} />
            <WarmMetalMaterial intensity={0.12} />
          </mesh>
        )),
      )}
    </group>
  );
}

function Gear({
  size,
  radius,
  teeth,
  color,
  accentColor,
  thickness,
}: {
  size: number;
  radius: number;
  teeth: number;
  color: string;
  accentColor: string;
  thickness: number;
}) {
  const toothOrbit = radius * 1.27;

  return (
    <group>
      <mesh>
        <torusGeometry args={[size * radius, size * radius * 0.23, 6, teeth]} />
        <PaintedMaterial color={color} emissiveIntensity={0.14} metalness={0.68} roughness={0.25} />
      </mesh>

      {Array.from({ length: teeth }, (_, index) => {
        const angle = index * Math.PI * 2 / teeth;
        return (
          <mesh
            key={`tooth-${index}`}
            position={[Math.cos(angle) * size * toothOrbit, Math.sin(angle) * size * toothOrbit, 0]}
            rotation={[0, 0, angle]}
          >
            <boxGeometry args={[size * radius * 0.42, size * radius * 0.26, size * thickness]} />
            <PaintedMaterial color={color} emissiveIntensity={0.14} metalness={0.68} roughness={0.25} />
          </mesh>
        );
      })}

      {Array.from({ length: 4 }, (_, index) => {
        const angle = index * Math.PI / 2;
        return (
          <mesh
            key={`spoke-${index}`}
            position={[Math.cos(angle) * size * radius * 0.45, Math.sin(angle) * size * radius * 0.45, 0]}
            rotation={[0, 0, angle]}
          >
            <boxGeometry args={[size * radius * 0.88, size * radius * 0.14, size * thickness * 0.78]} />
            <PaintedMaterial color={accentColor} emissiveIntensity={0.18} metalness={0.62} roughness={0.27} />
          </mesh>
        );
      })}

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[size * radius * 0.34, size * radius * 0.34, size * thickness, 10]} />
        <PaintedMaterial color={accentColor} emissiveIntensity={0.2} metalness={0.66} roughness={0.24} />
      </mesh>
      <mesh position={[0, 0, size * thickness * 0.54]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[size * radius * 0.13, size * radius * 0.13, size * thickness * 0.12, 10]} />
        <PaintedMaterial color="#17162d" emissiveIntensity={0.04} metalness={0.4} roughness={0.32} />
      </mesh>
    </group>
  );
}

function SkillsArtifact({ size, solidColor, accentColor }: ArtifactShapeProps) {
  const primaryGearRef = useRef<THREE.Group>(null);
  const secondaryGearRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (primaryGearRef.current) primaryGearRef.current.rotation.z = t * 0.34;
    if (secondaryGearRef.current) secondaryGearRef.current.rotation.z = -t * 0.272 + Math.PI / 10;
  });

  return (
    <group rotation={[0.02, 0.09, -0.04]}>
      <group ref={primaryGearRef} position={[-size * 0.3, -size * 0.08, 0]}>
        <Gear
          size={size}
          radius={0.33}
          teeth={8}
          color={solidColor}
          accentColor="#9a91ed"
          thickness={0.22}
        />
      </group>
      <group ref={secondaryGearRef} position={[size * 0.4, size * 0.2, size * 0.08]}>
        <Gear
          size={size}
          radius={0.26}
          teeth={10}
          color={accentColor}
          accentColor="#6258bb"
          thickness={0.18}
        />
      </group>

      <mesh position={[-size * 0.65, size * 0.36, -size * 0.05]} rotation={[0.2, 0.2, 0]}>
        <octahedronGeometry args={[size * 0.075, 0]} />
        <AccentMaterial color={accentColor} intensity={0.5} />
      </mesh>
      <mesh position={[size * 0.68, -size * 0.28, -size * 0.05]} rotation={[0.2, 0.2, 0]}>
        <octahedronGeometry args={[size * 0.055, 0]} />
        <WarmMetalMaterial intensity={0.2} />
      </mesh>
    </group>
  );
}

function EducationArtifact({ size, solidColor, accentColor }: ArtifactShapeProps) {
  const capRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!capRef.current) return;
    const t = clock.getElapsedTime();
    capRef.current.position.y = size * (0.22 + Math.sin(t * 0.72) * 0.025);
    capRef.current.rotation.z = Math.sin(t * 0.48) * 0.02;
  });

  return (
    <group rotation={[0.01, 0.08, -0.03]}>
      <group position={[0, -size * 0.35, 0]} rotation={[0, 0.02, -0.055]}>
        <mesh position={[0, -size * 0.11, 0]}>
          <boxGeometry args={[size * 1.16, size * 0.08, size * 0.64]} />
          <PaintedMaterial color="#236f5e" emissiveIntensity={0.1} roughness={0.48} />
        </mesh>
        <mesh>
          <boxGeometry args={[size * 1.06, size * 0.19, size * 0.58]} />
          <PaperMaterial />
        </mesh>
        <mesh position={[0, size * 0.12, 0]}>
          <boxGeometry args={[size * 1.16, size * 0.07, size * 0.64]} />
          <PaintedMaterial color={solidColor} emissiveIntensity={0.14} roughness={0.42} />
        </mesh>
        <mesh position={[-size * 0.55, 0, 0]}>
          <boxGeometry args={[size * 0.08, size * 0.29, size * 0.66]} />
          <PaintedMaterial color="#205a4e" emissiveIntensity={0.08} roughness={0.5} />
        </mesh>
        {[-0.045, 0.035].map((y) => (
          <mesh key={y} position={[size * 0.18, size * y, size * 0.31]}>
            <boxGeometry args={[size * 0.48, size * 0.018, size * 0.015]} />
            <PaintedMaterial color="#cfbf9c" emissiveIntensity={0.02} metalness={0.02} roughness={0.8} />
          </mesh>
        ))}
      </group>

      <group ref={capRef} position={[0, size * 0.22, size * 0.03]}>
        <mesh position={[0, size * 0.05, 0]} scale={size * 0.78}>
          <extrudeGeometry args={[CAP_BOARD_SHAPE, { depth: 0.1, bevelEnabled: false, steps: 1 }]} />
          <PaintedMaterial color="#273a45" emissiveIntensity={0.11} roughness={0.42} metalness={0.32} />
        </mesh>
        <mesh position={[0, -size * 0.17, -size * 0.015]}>
          <cylinderGeometry args={[size * 0.23, size * 0.32, size * 0.27, 8]} />
          <PaintedMaterial color="#1f313a" emissiveIntensity={0.1} roughness={0.44} metalness={0.28} />
        </mesh>
        <ArtifactLine
          from={[0, size * 0.14]}
          to={[size * 0.45, size * 0.07]}
          z={size * 0.125}
          width={size * 0.037}
          color={solidColor}
        />
        <ArtifactLine
          from={[size * 0.45, size * 0.07]}
          to={[size * 0.45, -size * 0.35]}
          z={size * 0.125}
          width={size * 0.037}
          color={accentColor}
          intensity={0.46}
        />
        <mesh position={[size * 0.45, -size * 0.42, size * 0.125]}>
          <coneGeometry args={[size * 0.085, size * 0.15, 6]} />
          <AccentMaterial color={accentColor} intensity={0.48} />
        </mesh>
        <mesh position={[0, size * 0.14, size * 0.135]}>
          <sphereGeometry args={[size * 0.055, 8, 6]} />
          <WarmMetalMaterial intensity={0.22} />
        </mesh>
      </group>
    </group>
  );
}

function ProjectsArtifact({ size, solidColor, accentColor }: ArtifactShapeProps) {
  const rocketRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (rocketRef.current) {
      rocketRef.current.position.y = Math.sin(t * 0.78) * size * 0.03;
      rocketRef.current.rotation.z = -0.45 + Math.sin(t * 0.54) * 0.025;
      rocketRef.current.rotation.y = 0.08 + Math.sin(t * 0.43) * 0.035;
    }
    if (flameRef.current) {
      flameRef.current.scale.y = 0.88 + Math.sin(t * 8.5) * 0.12;
    }
  });

  return (
    <group ref={rocketRef} rotation={[0.035, 0.08, -0.45]}>
      <mesh position={[0, -size * 0.03, 0]}>
        <cylinderGeometry args={[size * 0.24, size * 0.3, size * 0.91, 10]} />
        <PaintedMaterial color="#e8e6de" emissiveIntensity={0.05} metalness={0.28} roughness={0.4} />
      </mesh>
      <mesh position={[0, size * 0.61, 0]}>
        <coneGeometry args={[size * 0.24, size * 0.39, 10]} />
        <PaintedMaterial color={solidColor} emissiveIntensity={0.18} metalness={0.36} roughness={0.3} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * size * 0.31, -size * 0.39, 0]}
          rotation={[0, 0, side * -0.38]}
        >
          <coneGeometry args={[size * 0.2, size * 0.48, 3]} />
          <PaintedMaterial color="#b84e7e" emissiveIntensity={0.12} metalness={0.28} roughness={0.34} />
        </mesh>
      ))}
      <mesh position={[0, -size * 0.24, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[size * 0.285, size * 0.035, 6, 20]} />
        <AccentMaterial color={solidColor} intensity={0.34} />
      </mesh>

      <mesh position={[0, size * 0.16, size * 0.27]}>
        <sphereGeometry args={[size * 0.11, 10, 8]} />
        <AccentMaterial color="#77def2" intensity={0.72} />
      </mesh>
      <mesh position={[0, size * 0.16, size * 0.292]}>
        <torusGeometry args={[size * 0.12, size * 0.024, 6, 18]} />
        <WarmMetalMaterial intensity={0.17} />
      </mesh>

      <mesh ref={flameRef} position={[0, -size * 0.69, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[size * 0.18, size * 0.39, 9]} />
        <meshStandardMaterial
          color="#ff7043"
          emissive="#ff3d20"
          emissiveIntensity={1.8}
          roughness={0.42}
          flatShading
        />
      </mesh>
      <mesh position={[0, -size * 0.65, size * 0.015]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[size * 0.09, size * 0.27, 8]} />
        <meshStandardMaterial
          color="#ffe36e"
          emissive="#ffb400"
          emissiveIntensity={2.1}
          roughness={0.36}
          flatShading
        />
      </mesh>

      <pointLight color={accentColor} intensity={0.55} distance={size * 1.8} position={[0, -size * 0.62, 0]} />
    </group>
  );
}

function PersonalArtifact({ size, solidColor, accentColor }: ArtifactShapeProps) {
  const worldRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!worldRef.current) return;
    const t = clock.getElapsedTime();
    worldRef.current.rotation.y = Math.sin(t * 0.34) * 0.055;
    worldRef.current.rotation.z = Math.sin(t * 0.29 + 0.7) * 0.018;
  });

  return (
    <group ref={worldRef}>
      <mesh position={[0, -size * 0.44, 0]} scale={[1, 0.36, 0.78]}>
        <icosahedronGeometry args={[size * 0.62, 2]} />
        <PaintedMaterial color="#4d8d59" emissiveIntensity={0.11} metalness={0.06} roughness={0.72} />
      </mesh>

      <mesh position={[0, -size * 0.14, 0]}>
        <boxGeometry args={[size * 0.76, size * 0.5, size * 0.56]} />
        <PaintedMaterial color="#f0dfbd" emissiveIntensity={0.05} metalness={0.04} roughness={0.75} />
      </mesh>
      <mesh position={[0, size * 0.11, -size * 0.29]} scale={size}>
        <extrudeGeometry args={[HOUSE_ROOF_SHAPE, { depth: 0.58, bevelEnabled: false, steps: 1 }]} />
        <PaintedMaterial color={solidColor} emissiveIntensity={0.13} metalness={0.16} roughness={0.5} />
      </mesh>
      <mesh position={[size * 0.27, size * 0.39, -size * 0.13]}>
        <boxGeometry args={[size * 0.12, size * 0.29, size * 0.15]} />
        <PaintedMaterial color="#7b4332" emissiveIntensity={0.08} roughness={0.55} />
      </mesh>

      <mesh position={[0, -size * 0.25, size * 0.295]}>
        <boxGeometry args={[size * 0.17, size * 0.29, size * 0.045]} />
        <PaintedMaterial color="#70452c" emissiveIntensity={0.06} roughness={0.55} />
      </mesh>
      <mesh position={[size * 0.055, -size * 0.25, size * 0.328]}>
        <sphereGeometry args={[size * 0.022, 6, 5]} />
        <WarmMetalMaterial intensity={0.25} />
      </mesh>

      {[-0.24, 0.24].map((x) => (
        <group key={`window-${x}`}>
          <mesh position={[x * size, -size * 0.08, size * 0.298]}>
            <boxGeometry args={[size * 0.19, size * 0.17, size * 0.045]} />
            <PaintedMaterial color="#815036" emissiveIntensity={0.07} roughness={0.5} />
          </mesh>
          <mesh position={[x * size, -size * 0.08, size * 0.328]}>
            <boxGeometry args={[size * 0.135, size * 0.115, size * 0.025]} />
            <AccentMaterial color="#83ddf0" intensity={0.54} />
          </mesh>
          <mesh position={[x * size, -size * 0.08, size * 0.346]}>
            <boxGeometry args={[size * 0.018, size * 0.12, size * 0.015]} />
            <PaintedMaterial color="#f5dcb1" emissiveIntensity={0.08} roughness={0.72} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, -size * 0.49, size * 0.41]} rotation={[0.16, 0, 0]}>
        <boxGeometry args={[size * 0.17, size * 0.28, size * 0.035]} />
        <PaintedMaterial color="#d5ae72" emissiveIntensity={0.05} metalness={0.04} roughness={0.8} />
      </mesh>

      <mesh position={[-size * 0.5, -size * 0.29, size * 0.01]}>
        <cylinderGeometry args={[size * 0.035, size * 0.045, size * 0.21, 7]} />
        <PaintedMaterial color="#70503a" emissiveIntensity={0.05} roughness={0.68} />
      </mesh>
      <mesh position={[-size * 0.5, -size * 0.12, size * 0.01]}>
        <coneGeometry args={[size * 0.15, size * 0.32, 7]} />
        <PaintedMaterial color="#3f8556" emissiveIntensity={0.1} metalness={0.04} roughness={0.7} />
      </mesh>

      <mesh position={[size * 0.49, -size * 0.35, size * 0.34]}>
        <octahedronGeometry args={[size * 0.045, 0]} />
        <AccentMaterial color={accentColor} intensity={0.44} />
      </mesh>
    </group>
  );
}

function ContactArtifact({ size, solidColor, accentColor }: ArtifactShapeProps) {
  const signalRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!signalRef.current) return;
    const t = clock.getElapsedTime();
    signalRef.current.children.forEach((child, index) => {
      child.position.y = Math.sin(t * 2.2 + index * 0.72) * size * 0.055;
    });
  });

  return (
    <group rotation={[0.01, 0.07, -0.035]}>
      <mesh position={[0, size * 0.28, -size * 0.055]}>
        <boxGeometry args={[size * 0.9, size * 0.66, size * 0.08]} />
        <PaperMaterial />
      </mesh>
      {[0.38, 0.27].map((y, index) => (
        <mesh key={y} position={[-size * (index ? 0.04 : 0.1), size * y, size * 0.005]}>
          <boxGeometry args={[size * (index ? 0.54 : 0.63), size * 0.025, size * 0.02]} />
          <AccentMaterial color={index ? solidColor : accentColor} intensity={0.34} />
        </mesh>
      ))}

      <mesh position={[0, -size * 0.12, 0]}>
        <boxGeometry args={[size * 1.16, size * 0.64, size * 0.18]} />
        <PaintedMaterial color="#d7e8e6" emissiveIntensity={0.08} metalness={0.08} roughness={0.7} />
      </mesh>
      <mesh position={[0, size * 0.17, size * 0.052]}>
        <boxGeometry args={[size * 1.01, size * 0.15, size * 0.15]} />
        <PaintedMaterial color="#326d71" emissiveIntensity={0.16} metalness={0.14} roughness={0.5} />
      </mesh>
      <mesh position={[0, -size * 0.08, size * 0.105]} scale={size}>
        <extrudeGeometry args={[ENVELOPE_FLAP_SHAPE, { depth: 0.04, bevelEnabled: false, steps: 1 }]} />
        <PaintedMaterial color="#b9d5d3" emissiveIntensity={0.09} metalness={0.08} roughness={0.68} />
      </mesh>
      {[-0.55, 0.55].map((x) => (
        <mesh key={`edge-${x}`} position={[size * x, -size * 0.12, size * 0.11]}>
          <boxGeometry args={[size * 0.045, size * 0.58, size * 0.045]} />
          <AccentMaterial color={solidColor} intensity={0.25} />
        </mesh>
      ))}
      <mesh position={[0, -size * 0.415, size * 0.11]}>
        <boxGeometry args={[size * 1.12, size * 0.045, size * 0.045]} />
        <AccentMaterial color={solidColor} intensity={0.25} />
      </mesh>
      <mesh position={[0, size * 0.18, size * 0.14]}>
        <boxGeometry args={[size * 1.08, size * 0.035, size * 0.025]} />
        <AccentMaterial color={solidColor} intensity={0.28} />
      </mesh>
      <ArtifactLine
        from={[-size * 0.53, -size * 0.39]}
        to={[0, -size * 0.21]}
        z={size * 0.135}
        width={size * 0.025}
        color={accentColor}
        intensity={0.24}
      />
      <ArtifactLine
        from={[size * 0.53, -size * 0.39]}
        to={[0, -size * 0.21]}
        z={size * 0.135}
        width={size * 0.025}
        color={accentColor}
        intensity={0.24}
      />
      <mesh position={[0, -size * 0.21, size * 0.16]}>
        <octahedronGeometry args={[size * 0.075, 0]} />
        <AccentMaterial color={accentColor} intensity={0.58} />
      </mesh>

      <group ref={signalRef} position={[0, size * 0.71, 0]}>
        {[-0.21, 0, 0.21].map((x, index) => (
          <mesh key={x} position={[x * size, 0, index === 1 ? size * 0.03 : 0]}>
            <sphereGeometry args={[size * (index === 1 ? 0.067 : 0.058), 8, 6]} />
            <AccentMaterial color={index === 1 ? accentColor : solidColor} intensity={0.62} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function ReadingArtifact({ size, solidColor, accentColor }: ArtifactShapeProps) {
  const bookRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!bookRef.current) return;
    const t = clock.getElapsedTime();
    bookRef.current.rotation.y = Math.sin(t * 0.38) * 0.09;
    bookRef.current.rotation.z = 0.16 + Math.sin(t * 0.31 + 0.5) * 0.018;
    bookRef.current.position.y = Math.sin(t * 0.53) * size * 0.018;
  });

  return (
    <group ref={bookRef} rotation={[0.025, 0, 0.16]}>
      <mesh position={[-size * 0.28, 0, -size * 0.07]} rotation={[0, 0.31, 0]}>
        <boxGeometry args={[size * 0.6, size * 0.84, size * 0.16]} />
        <PaintedMaterial color={solidColor} emissiveIntensity={0.16} metalness={0.2} roughness={0.42} />
      </mesh>
      <mesh position={[size * 0.28, 0, -size * 0.07]} rotation={[0, -0.31, 0]}>
        <boxGeometry args={[size * 0.6, size * 0.84, size * 0.16]} />
        <PaintedMaterial color={solidColor} emissiveIntensity={0.16} metalness={0.2} roughness={0.42} />
      </mesh>
      <mesh position={[-size * 0.255, 0, size * 0.035]} rotation={[0, 0.31, 0]}>
        <boxGeometry args={[size * 0.51, size * 0.73, size * 0.075]} />
        <PaperMaterial />
      </mesh>
      <mesh position={[size * 0.255, 0, size * 0.035]} rotation={[0, -0.31, 0]}>
        <boxGeometry args={[size * 0.51, size * 0.73, size * 0.075]} />
        <PaperMaterial />
      </mesh>
      <mesh position={[0, 0, -size * 0.11]}>
        <boxGeometry args={[size * 0.085, size * 0.84, size * 0.12]} />
        <PaintedMaterial color="#4e348f" emissiveIntensity={0.18} metalness={0.24} roughness={0.4} />
      </mesh>

      {[-0.19, -0.07, 0.05, 0.17].map((y) => (
        <group key={y}>
          <mesh position={[-size * 0.25, size * y, size * 0.09]} rotation={[0, 0.31, 0]}>
            <boxGeometry args={[size * 0.28, size * 0.018, size * 0.013]} />
            <AccentMaterial color={accentColor} intensity={0.22} />
          </mesh>
          <mesh position={[size * 0.25, size * y, size * 0.09]} rotation={[0, -0.31, 0]}>
            <boxGeometry args={[size * 0.28, size * 0.018, size * 0.013]} />
            <AccentMaterial color={accentColor} intensity={0.22} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, -size * 0.49, size * 0.075]} rotation={[0, 0, -0.04]}>
        <boxGeometry args={[size * 0.075, size * 0.25, size * 0.035]} />
        <AccentMaterial color="#e4748e" intensity={0.38} />
      </mesh>
      <mesh position={[size * 0.56, size * 0.35, -size * 0.03]} rotation={[0.2, 0.2, 0]}>
        <octahedronGeometry args={[size * 0.065, 0]} />
        <WarmMetalMaterial intensity={0.28} />
      </mesh>
    </group>
  );
}

const ARTIFACTS: Record<OrbitId, (props: ArtifactShapeProps) => ReactNode> = {
  experience: ExperienceArtifact,
  skills: SkillsArtifact,
  education: EducationArtifact,
  projects: ProjectsArtifact,
  personal: PersonalArtifact,
  contact: ContactArtifact,
  reading: ReadingArtifact,
};

/** The exact same miniature world is rendered in the live galaxy and the inspection lab. */
export function OrbitalArtifact({
  id,
  size = 1,
  solidColor = ORBIT_META[id].solid,
  accentColor = ORBIT_META[id].accent,
}: OrbitalArtifactProps) {
  const Artifact = ARTIFACTS[id];
  return <Artifact size={size} solidColor={solidColor} accentColor={accentColor} />;
}
