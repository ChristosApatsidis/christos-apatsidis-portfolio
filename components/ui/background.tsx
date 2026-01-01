"use client";

import React, { useState, useEffect } from 'react';
// Animation library
import { motion } from "motion/react";
// Theme hook
import { useTheme } from "next-themes";

export const Background = () => {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      key={resolvedTheme}
      className="min-h-screen w-full relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {resolvedTheme === "light" ? <LightBackground /> : <DarkBackground />}
    </motion.div>
  )
};

function DarkBackground() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-900" />
  );
}


function LightBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1440 810"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Blue gradient (top left)  */}
        <radialGradient id="blueGradient" cx="20%" cy="20%">
          <stop offset="0%" stopColor="#7CB9FF" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#A8D5FF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#E8F4FF" stopOpacity="0.2" />
        </radialGradient>

        {/* Cyan gradient (bottom left) */}
        <radialGradient id="cyanGradient" cx="40%" cy="70%">
          <stop offset="0%" stopColor="#66D9D9" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#A3E8E8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#E0F7F7" stopOpacity="0" />
        </radialGradient>

        {/* Pink gradient (right side) */}
        <radialGradient id="pinkGradient" cx="80%" cy="40%">
          <stop offset="0%" stopColor="#E9A3E9" stopOpacity="0.7" />
          <stop offset="70%" stopColor="#F5CCF5" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FBF0FB" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Base background */}
      <rect width="100%" height="100%" fill="#F5F7FA" />

      {/* Gradient overlays using full rectangles */}
      <rect width="100%" height="100%" fill="url(#blueGradient)" />
      <rect width="100%" height="100%" fill="url(#cyanGradient)" />
      <rect width="100%" height="100%" fill="url(#pinkGradient)" />
    </svg>
  );
}
