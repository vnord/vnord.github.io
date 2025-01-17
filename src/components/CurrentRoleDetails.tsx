"use client";

import { WorkHighlight } from "@/config/personal-info";
import { motion } from "framer-motion";

interface CurrentRoleDetailsProps {
  highlights: WorkHighlight[];
}

export function CurrentRoleDetails({ highlights }: CurrentRoleDetailsProps) {
  return (
    <div className="mt-4 md:mt-6">
      <div className="pl-4 md:pl-6">
        <div className="grid grid-cols-1 gap-4">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.3
              }}
              className="p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors duration-300"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold text-lg mb-2">
                  {highlight.title}
                  {highlight.link && (
                    <a 
                      href={highlight.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 inline-flex items-center text-muted/40 hover:text-primary/80 transition-colors duration-300"
                    >
                      <svg 
                        className="w-3.5 h-3.5" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="15 3 21 3 21 9" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  )}
                </h4>
              </div>
              <p className="text-muted">{highlight.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {highlight.tags.map(tag => (
                  <span 
                    key={tag}
                    className="text-sm px-2 py-1 rounded-full bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}