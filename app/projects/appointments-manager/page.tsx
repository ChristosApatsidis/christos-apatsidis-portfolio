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

/**
 * Appointments Manager Page
 * Renders the Appointments Manager project page.
 */
export default function ProjectsAppointmentsManagerPage() {

  return (
    <SectionCard transition={{ duration: 0.5, ease: "easeOut" }}>
      <div>

      </div>
    </SectionCard>
  );
}