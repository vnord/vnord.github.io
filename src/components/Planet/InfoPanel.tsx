"use client";

import { useEffect, useRef } from "react";
import {
  experience,
  skills,
  education,
  volunteering,
  projects,
  personal,
  contact,
  reading,
} from "./sections";

interface InfoPanelProps {
  activeSection: string | null;
  onClose: () => void;
}

const sectionContent: Record<
  string,
  {
    title: string;
    icon: string;
    content: React.ReactNode;
  }
> = {
  experience,
  skills,
  education,
  volunteering,
  projects,
  personal,
  contact,
  reading,
};

export function InfoPanel({ activeSection, onClose }: InfoPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Close on click outside - only when panel is actually shown
  useEffect(() => {
    if (!activeSection) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    // Delay adding the listener to prevent the same click that opened the panel from closing it
    const timer = setTimeout(() => {
      window.addEventListener("click", handleClickOutside);
    }, 300);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [activeSection, onClose]);

  if (!activeSection || !sectionContent[activeSection]) {
    return null;
  }

  const section = sectionContent[activeSection];

  return (
    <div
      className="info-panel"
      ref={panelRef}
      onClick={(e) => e.stopPropagation()}
    >
      <button className="close-button" onClick={onClose}>
        ×
      </button>

      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{section.icon}</span>
        <h2 className="text-2xl font-bold text-gradient">{section.title}</h2>
      </div>

      <div className="panel-content">{section.content}</div>
    </div>
  );
}
