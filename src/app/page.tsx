"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { InfoPanel } from "@/components/Planet/InfoPanel";
import { PlanetTooltip } from "@/components/Planet/PlanetTooltip";

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
      <div className="loading-galaxy">
        <div className="loading-star" />
        <div className="loading-orbit loading-orbit-1">
          <div className="loading-planet" />
        </div>
        <div className="loading-orbit loading-orbit-2">
          <div className="loading-planet loading-planet-2" />
        </div>
        <div className="loading-orbit loading-orbit-3">
          <div className="loading-planet loading-planet-3" />
        </div>
      </div>
      <p className="loading-text">Entering the galaxy...</p>
    </div>
  );
}

function IntroOverlay({ onDismiss }: { onDismiss: () => void }) {
  const [fadeOut, setFadeOut] = useState(false);

  const handleDismiss = () => {
    setFadeOut(true);
    setTimeout(onDismiss, 500);
  };

  return (
    <div
      className={`intro-overlay ${fadeOut ? "fade-out" : ""}`}
      onClick={handleDismiss}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleDismiss()}
    >
      <div className="intro-stars" />
      
      <div className="intro-content">
        <h1 className="intro-title">Ari von Nordenskjöld</h1>
        
        <div className="intro-role">
          <span className="role-line" />
          <span className="role-text">Senior Software Engineer</span>
          <span className="role-line" />
        </div>
        
        <p className="intro-location">
          <svg className="location-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Zürich, Switzerland
        </p>
        
        <div className="intro-cta">
          <span>Click anywhere to begin</span>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="site-title">
        <span className="title-star">✦</span>
        vnord.net
      </div>
      <nav className="nav-links">
        <a
          href="https://github.com/vnord"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
        >
          <svg className="nav-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/vnord"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
        >
          <svg className="nav-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </a>
        <a href="mailto:ari@vnord.net" className="nav-link nav-link-cta">
          <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Contact
        </a>
      </nav>
    </header>
  );
}

export default function Home() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

      {showIntro && <IntroOverlay onDismiss={handleDismissIntro} />}

      <div className="ui-overlay">
        <Header />

        {!showIntro && !activeHotspot && (
          <div className="controls-hint">
            <span>Drag to orbit</span>
            <span className="hint-dot">•</span>
            <span>Scroll to zoom</span>
          </div>
        )}

        {!activeHotspot && (
          <PlanetTooltip
            hoveredPlanet={hoveredPlanet}
            screenPosition={hoverPosition}
          />
        )}

        <InfoPanel activeSection={activeHotspot} onClose={handleClosePanel} />
      </div>
    </main>
  );
}
