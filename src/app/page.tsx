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

function IntroOverlay({ onDismiss, isMobile }: { onDismiss: () => void; isMobile: boolean }) {
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
          <span className="role-text">Exploring technology and building cool stuff</span>
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
          <span>{isMobile ? "Tap anywhere to begin" : "Click anywhere to begin"}</span>
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
    </header>
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
          <div className="controls-hint">
            <span>{isMobile ? "Pan to orbit" : "Drag to orbit"}</span>
            <span className="hint-dot">•</span>
            <span>{isMobile ? "Pinch to zoom" : "Scroll to zoom"}</span>
          </div>
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
