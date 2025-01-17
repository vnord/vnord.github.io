"use client";

import { personalInfo } from "@/config/personal-info";
import { TimelineItem } from "./TimelineItem";
import { useState } from "react";

export interface TimelineItemProps {
  title: string;
  role: string;
  description?: string;
  isCurrentRole?: boolean;
  highlights?: string[];
  isExpanded: boolean;
}

export function Timeline() {
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set());

  const toggleExpand = (index: number) => {
    setExpandedIndices(currentIndices => {
      const newIndices = new Set(currentIndices);
      if (newIndices.has(index)) {
        newIndices.delete(index);
      } else {
        newIndices.add(index);
      }
      return newIndices;
    });
  };

  return (
    <section className="max-w-4xl mx-auto py-8 md:py-16 px-4">
      <div className="relative">
        {/* Animated flowing timeline */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-primary to-transparent -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-flow" />
        </div>
        
        <div className="space-y-12 md:space-y-24 relative pl-8">
          {personalInfo.timeline.map((item, index) => (
            <TimelineItem
              key={index}
              period={item.period}
              title={item.title}
              role={item.role}
              description={item.description || ''}
              isCurrentRole={item.isCurrentRole}
              highlights={item.highlights}
              isExpanded={expandedIndices.has(index)}
              onHover={() => toggleExpand(index)}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 