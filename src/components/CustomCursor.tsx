"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(true); // Default to true to prevent flash

  useEffect(() => {
    // Check if we're on desktop
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ 
        x: e.clientX - 50,
        y: e.clientY - 50
      });
    };

    if (!isMobile) {
      window.addEventListener('mousemove', updatePosition);
      return () => window.removeEventListener('mousemove', updatePosition);
    }
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <motion.div
      className="cursor-glow"
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        damping: 15,
        mass: 0.1,
        stiffness: 200
      }}
    />
  );
} 