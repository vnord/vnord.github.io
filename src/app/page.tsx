"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { InfoPanel } from "@/components/Planet/InfoPanel";
import { PlanetTooltip } from "@/components/Planet/PlanetTooltip";
import { OrbitIcon } from "@/components/Planet/OrbitIcon";
import { ORBIT_META, ORBIT_ORDER } from "@/components/Planet/orbitSystem";

const destinations = ORBIT_ORDER.map((id) => ({ id, ...ORBIT_META[id] }));

const Scene = dynamic(
  () => import("@/components/Planet/Scene").then((mod) => mod.Scene),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  },
);

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-brand" aria-hidden="true">
        <Image className="loading-mark" src="/orbit-mark.svg" alt="" width={96} height={96} priority />
        <span className="loading-scan" />
      </div>
      <p className="loading-text">Calibrating orbits</p>
    </div>
  );
}

function IntroOverlay({ onDismiss, isMobile }: { onDismiss: () => void; isMobile: boolean }) {
  const [fadeOut, setFadeOut] = useState(false);

  const handleDismiss = () => {
    if (fadeOut) return;
    setFadeOut(true);
    setTimeout(onDismiss, 500);
  };

  return (
    <div
      className={`intro-overlay ${fadeOut ? "fade-out" : ""}`}
    >
      <button
        className="intro-dismiss-surface"
        onPointerDown={(event) => {
          if (event.button === 0) handleDismiss();
        }}
        onClick={handleDismiss}
        aria-label="Enter the planetary system"
      />
      <div className="intro-stars" aria-hidden="true" />

      <div className="intro-content">
        <h1 className="intro-title">Ari von Nordenskjöld</h1>

        <p className="intro-role">Exploring technology and building cool stuff.</p>

        <button className="intro-cta" onClick={handleDismiss}>
          <span>Enter the system</span>
          <OrbitIcon className="cta-arrow" name="arrow" size={17} />
        </button>
        <p className="intro-footnote">
          {isMobile ? "Drag to orbit · pinch to zoom" : "Drag to orbit · scroll to zoom"}
        </p>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="site-title">
        <Image className="site-mark" src="/mark.svg" alt="" width={28} height={28} priority aria-hidden="true" />
        <span>vnord.net</span>
      </div>
    </header>
  );
}

function OrbitIndex({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <nav className="orbit-index" aria-label="Explore the planetary system">
      <div className="orbit-index-heading">
        <span>Orbit index</span>
      </div>
      <ol>
        {destinations.map((destination, index) => (
          <li key={destination.id}>
            <button onClick={() => onSelect(destination.id)}>
              <span className="orbit-number">{String(index + 1).padStart(2, "0")}</span>
              <OrbitIcon
                className="orbit-index-icon"
                name={destination.icon}
                size={14}
                style={{ color: destination.accent }}
              />
              <span className="orbit-label">{destination.navLabel}</span>
              <OrbitIcon className="orbit-arrow" name="arrow" size={14} />
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function Home() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setActiveHotspot(hash);
      setHoveredPlanet(null);
      setHoverPosition(null);
      setShowIntro(false);
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setActiveHotspot(hash || null);
      setHoveredPlanet(null);
      setHoverPosition(null);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (activeHotspot) {
      setHoveredPlanet(null);
      setHoverPosition(null);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeHotspot]);

  const handleHotspotClick = useCallback((id: string) => {
    setActiveHotspot(id);
    setHoveredPlanet(null);
    setHoverPosition(null);
    window.history.pushState(null, '', `#${id}`);
  }, []);

  const handleHotspotHover = useCallback((id: string | null, screenPos: { x: number; y: number } | null) => {
    if (activeHotspot) {
      setHoveredPlanet(null);
      setHoverPosition(null);
      return;
    }
    setHoveredPlanet(id);
    setHoverPosition(screenPos);
  }, [activeHotspot]);

  const handleClosePanel = useCallback(() => {
    setActiveHotspot(null);
    window.history.pushState(null, '', window.location.pathname);
  }, []);

  const handleDismissIntro = useCallback(() => {
    setShowIntro(false);
  }, []);

  if (!mounted) {
    return <LoadingScreen />;
  }

  return (
    <main>
      <Scene
        onHotspotClickAction={handleHotspotClick}
        onHotspotHoverAction={handleHotspotHover}
        activeHotspot={activeHotspot}
      />

      {showIntro && <IntroOverlay onDismiss={handleDismissIntro} isMobile={isMobile} />}

      <div className="ui-overlay">
        <Header />

        {!showIntro && !activeHotspot && (
          <OrbitIndex onSelect={handleHotspotClick} />
        )}

        {!activeHotspot && (
          <PlanetTooltip
            hoveredPlanet={hoveredPlanet}
            screenPosition={hoverPosition}
            isMobile={isMobile}
          />
        )}

        <InfoPanel activeSection={activeHotspot} onClose={handleClosePanel} />
      </div>
    </main>
  );
}
