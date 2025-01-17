"use client";

import { CurrentRoleDetails } from "./CurrentRoleDetails";
import { WorkHighlight } from "@/config/personal-info";
import { useState } from "react";

interface TimelineItemProps {
  period: string;
  title: string;
  role: string;
  description: string;
  isCurrentRole?: boolean;
  highlights?: WorkHighlight[];
  isExpanded: boolean;
  onHover: () => void;
  link?: string;
}

export function TimelineItem({ 
  period, 
  title, 
  role, 
  description, 
  isCurrentRole,
  highlights,
  isExpanded,
  onHover: toggleExpand,
  link
}: TimelineItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`
        relative flex gap-8 md:gap-12 items-start
        ${isCurrentRole ? 'md:flex-row-reverse' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        flex-1 p-6 rounded-lg transition-all duration-300
        ${isHovered ? 'timeline-hover' : 'hover:bg-primary/5'}
      `}>
        <div className="mb-2 font-mono text-sm text-muted">{period}</div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className={`
              text-xl font-bold mb-2 transition-all duration-300
              ${isHovered ? 'text-glow' : ''}
            `}>
              {link ? (
                <a 
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-300 inline-flex items-center gap-1 group"
                >
                  {title}
                  <svg 
                    className="w-3.5 h-3.5 text-muted/40 group-hover:text-primary/80 transition-colors" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              ) : title}
            </h3>
            <h4 className={`
              text-base font-normal mb-3 transition-all duration-300
              ${isHovered ? 'text-primary' : 'text-secondary'}
            `}>
              {role}
            </h4>
            <p className="text-base leading-relaxed text-muted mb-3">{description}</p>
          </div>
          {highlights && (
            <button 
              onClick={toggleExpand}
              className={`
                p-2 rounded-full transition-all duration-300 self-start flex-shrink-0
                hover:scale-105 active:scale-95
                ${isHovered ? 'bg-primary/20' : 'hover:bg-primary/10'}
              `}
              aria-label={isExpanded ? "Collapse details" : "Expand details"}
            >
              <svg 
                className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          )}
        </div>
        {isExpanded && highlights && (
          <CurrentRoleDetails highlights={highlights} />
        )}
      </div>
    </div>
  );
} 