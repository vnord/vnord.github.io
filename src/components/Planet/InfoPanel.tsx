"use client";

import { useEffect } from "react";
import {
  experience,
  skills,
  education,
  projects,
  personal,
  contact,
  reading,
} from "./sections";
import { OrbitIcon } from "./OrbitIcon";
import { isOrbitId, ORBIT_META, type OrbitId } from "./orbitSystem";

interface InfoPanelProps {
  activeSection: string | null;
  onClose: () => void;
}

const sectionContent: Record<OrbitId, React.ReactNode> = {
  experience: experience.content,
  skills: skills.content,
  education: education.content,
  projects: projects.content,
  personal: personal.content,
  contact: contact.content,
  reading: reading.content,
};

export function InfoPanel({ activeSection, onClose }: InfoPanelProps) {
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

  if (!activeSection || !isOrbitId(activeSection)) {
    return null;
  }

  const section = ORBIT_META[activeSection];

  return (
    <>
      <button className="info-panel-backdrop" onClick={onClose} aria-label="Close panel" />
      <aside
        className="info-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="panel-title"
      >
        <button className="close-button" onClick={onClose} aria-label="Close panel">
          <OrbitIcon name="close" size={18} />
        </button>

        <div className="panel-heading">
          <span className="panel-icon" aria-hidden="true"><OrbitIcon name={section.icon} /></span>
          <h2 id="panel-title">{section.name}</h2>
        </div>

        <div className="panel-content">{sectionContent[activeSection]}</div>
      </aside>
    </>
  );
}
