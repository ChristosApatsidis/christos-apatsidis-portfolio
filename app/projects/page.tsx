"use client";

/* Types */
import type { Project } from "@/types/projects";

import React from 'react';
// Animation library
import { motion, Variants } from 'framer-motion';
// UI Components
import { SectionCard } from '@/components/ui/section-card';
import { ProjectsGrid, ProjectsGridItem } from '@/components/ui/projects-grid';
// Icons
import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaExternalLinkAlt
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiSocketdotio,
  SiMongodb,
  SiExpo,
  SiTailwindcss,
  SiTypescript
} from 'react-icons/si';

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
        staggerChildren: 0.15,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
  };

  return (
    <SectionCard>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
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