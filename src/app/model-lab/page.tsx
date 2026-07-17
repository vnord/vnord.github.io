"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { OrbitalArtifact } from "@/components/Planet/OrbitalArtifact";
import { OrbitIcon } from "@/components/Planet/OrbitIcon";
import {
  ORBIT_META,
  ORBIT_ORDER,
  type OrbitId,
} from "@/components/Planet/orbitSystem";
import styles from "./page.module.css";

type ViewId = "front" | "three-quarter" | "side";

const viewPresets: Record<ViewId, { label: string; rotation: [number, number, number] }> = {
  front: { label: "Front", rotation: [0, 0, 0] },
  "three-quarter": { label: "Three-quarter", rotation: [-0.12, 0.58, 0.04] },
  side: { label: "Side", rotation: [0, Math.PI / 2, 0] },
};

const artifactMeaning: Record<OrbitId, string> = {
  experience: "A well-travelled case for professional experience and the work carried forward.",
  skills: "Two meshing gears for technical craft, systems thinking, and tools in motion.",
  education: "A hovering mortarboard and bound book for formal study and ongoing learning.",
  projects: "A candy-coloured rocket for ideas that leave the launchpad and become real things.",
  personal: "A tiny home-world for the life, interests, and values behind the work.",
  contact: "An open letter with a live signal for direct communication and new conversations.",
  reading: "A glowing open book for notes, recommendations, and a growing library.",
};

function Studio({
  id,
  rotation,
  autoRotate,
  resetVersion,
  onInteractionStart,
}: {
  id: OrbitId;
  rotation: [number, number, number];
  autoRotate: boolean;
  resetVersion: number;
  onInteractionStart: () => void;
}) {
  const meta = ORBIT_META[id];
  const { camera } = useThree();
  const controlsRef = useRef<React.ElementRef<typeof OrbitControls>>(null);

  useEffect(() => {
    camera.position.set(0, 0.1, 6.4);
    camera.lookAt(0, 0, 0);
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, [camera, resetVersion]);

  return (
    <>
      <color attach="background" args={["#101219"]} />
      <fog attach="fog" args={["#101219", 8, 14]} />

      <ambientLight intensity={1.15} />
      <hemisphereLight args={["#e9f0ff", "#171923", 1.4]} />
      <directionalLight position={[4, 5, 6]} intensity={3.2} color="#fff8eb" />
      <directionalLight position={[-4, 1, 3]} intensity={2.1} color={meta.accent} />
      <pointLight position={[0, -2, 3]} intensity={1.1} color="#b9c3ff" />

      <group position={[0, 0.28, 0]} rotation={rotation} scale={1.3}>
        <OrbitalArtifact
          id={id}
          size={1}
          solidColor={meta.solid}
          accentColor={meta.accent}
        />
      </group>

      <ContactShadows
        position={[0, -1.72, 0]}
        opacity={0.38}
        scale={7}
        blur={2.8}
        far={4.5}
        color="#000000"
      />

      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={3.6}
        maxDistance={9}
        autoRotate={autoRotate}
        autoRotateSpeed={0.85}
        onStart={onInteractionStart}
      />
    </>
  );
}

export default function ModelLabPage() {
  const [activeId, setActiveId] = useState<OrbitId>("experience");
  const [view, setView] = useState<ViewId>("three-quarter");
  const [autoRotate, setAutoRotate] = useState(false);
  const [cameraVersion, setCameraVersion] = useState(0);
  const [isCustomView, setIsCustomView] = useState(false);

  const activeMeta = ORBIT_META[activeId];
  const activeIndex = ORBIT_ORDER.indexOf(activeId) + 1;
  const rotation = useMemo(() => viewPresets[view].rotation, [view]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedModel = params.get("model");
    const requestedView = params.get("view");

    if (requestedModel && ORBIT_ORDER.includes(requestedModel as OrbitId)) {
      setActiveId(requestedModel as OrbitId);
    }
    if (requestedView && Object.prototype.hasOwnProperty.call(viewPresets, requestedView)) {
      setView(requestedView as ViewId);
    }
  }, []);

  const chooseView = (nextView: ViewId) => {
    setView(nextView);
    setAutoRotate(false);
    setIsCustomView(false);
    setCameraVersion((version) => version + 1);
  };

  const resetView = () => {
    setView("three-quarter");
    setAutoRotate(false);
    setIsCustomView(false);
    setCameraVersion((version) => version + 1);
  };

  const toggleAutoRotate = () => {
    const nextValue = !autoRotate;
    setAutoRotate(nextValue);
    if (nextValue) {
      setIsCustomView(true);
    }
  };

  return (
    <main className={styles.lab}>
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Visual QA · 07 orbital artifacts</span>
          <h1>Model lab</h1>
        </div>
        <Link className={styles.backLink} href="/">
          <span aria-hidden="true">←</span>
          Return to orbit
        </Link>
      </header>

      <div className={styles.workspace}>
        <aside className={styles.controls} aria-label="Model inspection controls">
          <section className={styles.controlSection}>
            <div className={styles.sectionHeading}>
              <span>Artifact</span>
              <span>{String(activeIndex).padStart(2, "0")} / 07</span>
            </div>

            <div className={styles.artifactList}>
              {ORBIT_ORDER.map((id, index) => {
                const meta = ORBIT_META[id];
                const selected = id === activeId;

                return (
                  <button
                    className={styles.artifactButton}
                    data-selected={selected}
                    key={id}
                    onClick={() => setActiveId(id)}
                    style={{ "--artifact-accent": meta.accent } as React.CSSProperties}
                    type="button"
                    aria-pressed={selected}
                  >
                    <span className={styles.artifactNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.artifactIcon}>
                      <OrbitIcon name={meta.icon} size={18} />
                    </span>
                    <span>{meta.navLabel}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className={styles.controlSection}>
            <div className={styles.sectionHeading}>
              <span>View</span>
              <span>Drag to inspect</span>
            </div>
            <div className={styles.viewButtons}>
              {(Object.keys(viewPresets) as ViewId[]).map((viewId) => (
                <button
                  key={viewId}
                  className={styles.viewButton}
                  data-selected={view === viewId && !isCustomView}
                  onClick={() => chooseView(viewId)}
                  type="button"
                  aria-pressed={view === viewId && !isCustomView}
                >
                  {viewPresets[viewId].label}
                </button>
              ))}
            </div>

            <div className={styles.utilityButtons}>
              <button
                className={styles.toggleButton}
                data-active={autoRotate}
                onClick={toggleAutoRotate}
                type="button"
                aria-pressed={autoRotate}
              >
                <span className={styles.toggleTrack} aria-hidden="true">
                  <span />
                </span>
                Auto-rotate
              </button>
              <button className={styles.resetButton} onClick={resetView} type="button">
                Reset view
              </button>
            </div>
          </section>

          <p className={styles.hint}>
            Drag to orbit · scroll or pinch to zoom
          </p>
        </aside>

        <section
          className={styles.stage}
          style={{ "--artifact-accent": activeMeta.accent } as React.CSSProperties}
          aria-labelledby="artifact-title"
        >
          <div className={styles.stageGrid} aria-hidden="true" />
          <div className={styles.stageChrome} aria-hidden="true">
            <span>STUDIO / {activeMeta.catalogCode}</span>
            <span>NEUTRAL LIGHT · 50 MM</span>
          </div>

          <div className={styles.canvasWrap}>
            <Canvas
              camera={{ position: [0, 0.1, 6.4], fov: 32, near: 0.1, far: 50 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: false }}
              role="img"
              aria-label={`${activeMeta.name} artifact, shown as ${artifactMeaning[activeId]}`}
            >
              <Studio
                id={activeId}
                rotation={rotation}
                autoRotate={autoRotate}
                resetVersion={cameraVersion}
                onInteractionStart={() => setIsCustomView(true)}
              />
            </Canvas>
          </div>

          <div className={styles.caption} aria-live="polite">
            <span className={styles.captionIcon} aria-hidden="true">
              <OrbitIcon name={activeMeta.icon} size={24} />
            </span>
            <div>
              <span className={styles.catalogCode}>{activeMeta.catalogCode} · ORBIT {String(activeIndex).padStart(2, "0")}</span>
              <h2 id="artifact-title">{activeMeta.name}</h2>
              <p>{artifactMeaning[activeId]}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
