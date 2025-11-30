"use client";

interface PlanetInfo {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const planetInfo: Record<string, PlanetInfo> = {
  experience: {
    id: "experience",
    name: "Experience",
    icon: "💼",
    color: "#fbbf24",
  },
  skills: {
    id: "skills",
    name: "Skills & Tech",
    icon: "⚙️",
    color: "#a5b4fc",
  },
  education: {
    id: "education",
    name: "Education",
    icon: "🎓",
    color: "#fbbf24",
  },
  projects: {
    id: "projects",
    name: "Projects",
    icon: "🚀",
    color: "#f472b6",
  },
  personal: {
    id: "personal",
    name: "About Me",
    icon: "🏠",
    color: "#fb923c",
  },
  contact: {
    id: "contact",
    name: "Contact",
    icon: "✉️",
    color: "#22d3ee",
  },
  volunteering: {
    id: "volunteering",
    name: "Volunteering",
    icon: "🤝",
    color: "#34d399",
  },
};

interface PlanetTooltipProps {
  hoveredPlanet: string | null;
  screenPosition: { x: number; y: number } | null;
  isMobile?: boolean;
}

export function PlanetTooltip({ hoveredPlanet, screenPosition, isMobile = false }: PlanetTooltipProps) {
  if (isMobile || !hoveredPlanet || !screenPosition || !planetInfo[hoveredPlanet]) {
    return null;
  }

  const currentPlanet = planetInfo[hoveredPlanet];
  
  const tooltipWidth = 180;
  const tooltipHeight = 50;
  const padding = 20;
  
  let x = screenPosition.x;
  let y = screenPosition.y - tooltipHeight - 20;
  
  if (x + tooltipWidth / 2 > window.innerWidth - padding) {
    x = window.innerWidth - tooltipWidth / 2 - padding;
  }
  if (x - tooltipWidth / 2 < padding) {
    x = tooltipWidth / 2 + padding;
  }
  
  if (y < padding) {
    y = screenPosition.y + 40;
  }

  return (
    <div
      className="planet-tooltip"
      style={{
        left: x,
        top: y,
        "--tooltip-color": currentPlanet.color,
      } as React.CSSProperties}
    >
      <div className="tooltip-glow" style={{ background: currentPlanet.color }} />
      
      <div className="tooltip-content">
        <span className="tooltip-icon">{currentPlanet.icon}</span>
        <span className="tooltip-title" style={{ color: currentPlanet.color }}>
          {currentPlanet.name}
        </span>
      </div>
    </div>
  );
}
