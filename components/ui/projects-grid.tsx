"use client";

import React, { useState, useEffect } from 'react';
import type { ProjectsGridProps, ProjectsGridItemProps } from '@/types/projects';

// Utils
import { cn } from "@/lib/utils";
// Glowing Effect Component
import { GlowingEffect } from "@/components/ui/glowing-effect";
// Next.js
import { useRouter } from 'next/navigation';
// Animation
import { motion, AnimatePresence } from "framer-motion";

/**
 * ProjectsGrid Component
 */
export const ProjectsGrid = ({
  className,
  children,
}: ProjectsGridProps) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

/**
 * ProjectsGridItem Component
 */
export const ProjectsGridItem = ({
  className,
  project
}: ProjectsGridItemProps) => {
  const router = useRouter();

  // Destructure project properties
  const { title, description, header, icons, urls, url } = project;
  const { bannerImages } = header || {};
  const images = bannerImages || [];

  // Slider state
  const [currentSliderImage, setCurrentSliderImage] = useState<number>(0);
  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);

  // Auto-advance images every 4 seconds
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSliderImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Css glassmorphism styles
  const glass = `bg-white/50 dark:bg-black/20 bg-clip-padding backdrop-filter`;
  const border = `border border-black/[0.1] dark:border-white/[0.2]`;

  return (
    <div
      className={cn(
        "relative rounded-xl row-span-1 flex h-full flex-col p-4 cursor-pointer hover:scale-[1.01] transition-transform",
        className,
        glass,
        border
      )}
      onClick={() => router.push(url)}
    >

      <GlowingEffect
        spread={40}
        glow={true}
        disabled={isMobile}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={1}
      />

      <div>
        {/* Header Section */}
        <div className="space-y-1">
          {header?.gradient || images.length > 0 ? (
            <div className={`rounded-lg p-[0.1rem] flex justify-center items-center bg-gradient-to-br ${header?.gradient} min-h-[10rem] w-full relative`}>
              {images.length > 0 && (
                <div className="w-full flex flex-col items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={images[currentSliderImage].src}
                    width={images[currentSliderImage].width}
                    height={images[currentSliderImage].height}
                    alt={images[currentSliderImage].alt}
                    className="object-contain rounded-lg max-h-48 w-full"
                  />

                  {/* Dots */}
                  {images.length > 1 && (
                    <div className="absolute bottom-2 right-4 flex gap-1">
                      {images.map((_, idx) => (
                        <span
                          key={idx}
                          className={`inline-block w-2 h-2 rounded-full ${idx === currentSliderImage ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : null}

          {/* Title */}
          <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200">
            {title}
          </div>

        </div>

        {/* Icons */}
        <div className="mt-1 flex gap-2 text-neutral-600 dark:text-neutral-400">
          {icons}
        </div>

        {/* Links and Description */}
        <div className="space-y-1 mt-1">
          <div>
            {urls?.live ? (
              <a
                href={urls.live.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                {urls.live.icon}
                {urls.live.label}
              </a>
            ) : null}
            {urls?.github ? (
              <a
                href={urls.github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:underline dark:text-gray-400 ml-4"
              >
                {urls.github.icon}
                {urls.github.label}
              </a>
            ) : null}
          </div>
          <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
            {description}
          </div>
        </div>

      </div>
    </div>
  );
};
