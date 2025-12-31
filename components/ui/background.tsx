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

  if (resolvedTheme === "light") return <LightBackground />;
  if (resolvedTheme === "dark") return <DarkBackground />;
};

function DarkBackground() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-900" />
  );
}


function LightBackground() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div
        className="absolute top-20 left-20 w-72 h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
      />
      <div
        className="absolute top-40 right-20 w-72 h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
      />
      <div
        className="absolute bottom-10 left-1/4 w-72 h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
      />
      <div
        className="absolute top-10 right-2/5 w-72 h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
      />
    </div>
  );
}
