"use client";

import { OrbitIcon } from "./OrbitIcon";
import { isOrbitId, ORBIT_META } from "./orbitSystem";

interface PlanetTooltipProps {
  hoveredPlanet: string | null;
  screenPosition: { x: number; y: number } | null;
  isMobile?: boolean;
}

export function PlanetTooltip({ hoveredPlanet, screenPosition, isMobile = false }: PlanetTooltipProps) {
  if (isMobile || !hoveredPlanet || !screenPosition || !isOrbitId(hoveredPlanet)) {
    return null;
  }

  const currentPlanet = ORBIT_META[hoveredPlanet];
  
  const tooltipWidth = 152;
  const tooltipHeight = 38;
  const padding = 12;
  
  let x = screenPosition.x;
  let y = screenPosition.y - tooltipHeight - 14;
  
  if (x + tooltipWidth / 2 > window.innerWidth - padding) {
    x = window.innerWidth - tooltipWidth / 2 - padding;
  }
  if (x - tooltipWidth / 2 < padding) {
    x = tooltipWidth / 2 + padding;
  }
  
  if (y < padding) {
    y = screenPosition.y + 20;
  }

  return (
    <div
      className="planet-tooltip"
      style={{
        left: x,
        top: y,
        "--tooltip-color": currentPlanet.accent,
      } as React.CSSProperties}
    >
      <div className="tooltip-content">
        <span className="tooltip-icon"><OrbitIcon name={currentPlanet.icon} size={18} /></span>
        <span className="tooltip-title">{currentPlanet.name}</span>
      </div>
    </div>
  );
}
