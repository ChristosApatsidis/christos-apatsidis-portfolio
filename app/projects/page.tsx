"use client";

import React from 'react';
// Animation library
import { motion, Variants } from 'framer-motion';
// UI Components
import { SectionCard } from '@/components/ui/section-card';
import { ProjectsGrid, ProjectsGridItem } from '@/components/ui/projects-grid';

// Projects data
import { projects } from '@/app/projects/projects-data';

/**
 * Projects Page
 * Renders the projects portfolio page.
 */
export default function ProjectsPage() {

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 2,
        staggerChildren: 0.25,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    },
  };

  return (
    <SectionCard aria-label="Projects section">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        aria-label="Projects introduction"
      >
        <motion.p
          className="mb-2 text-lg font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          aria-label="Projects intro heading"
        >
          Here are some of my projects and personal works.
        </motion.p>
        <motion.p
          className="text-md font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          aria-label="Projects intro creativity"
        >
          Built with creativity, curiosity, and care.
        </motion.p>
        <motion.p
          className="mb-2 text-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          aria-label="Projects intro journey"
        >
          Each project is a reflection of my journey to learn, innovate, and make a positive impact through my work.
        </motion.p>
      </motion.div>
      <motion.div
        className="h-[0.1rem] bg-black/[0.1] dark:bg-white/[0.2] rounded-xl mb-2"
        initial={{ width: 0, opacity: 0, x: 0 }}
        animate={{ width: '100%', opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
      />

      {/* Projects Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        aria-label="Projects grid"
      >
        <ProjectsGrid className='gap-4'>
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
            >
              <ProjectsGridItem project={project} />
            </motion.div>
          ))}
        </ProjectsGrid>
      </motion.div>
    </SectionCard>
  );
}