"use client";

/* Types */
import type { Project } from "@/types/projects";

import React from 'react';
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
  SiTypescript,
  SiMui,
  SiElectron
} from 'react-icons/si';

const iconMap = {
  nextdotjs: <SiNextdotjs className="h-4 w-4" key={0} />,
  typescript: <SiTypescript className="h-4 w-4" key={1} />,
  mongodb: <SiMongodb className="h-4 w-4" key={2} />,
  tailwindcss: <SiTailwindcss className="h-4 w-4" key={3} />,
  react: <FaReact className="h-4 w-4" key={4} />,
  nodejs: <FaNodeJs className="h-4 w-4" key={5} />,
  socketio: <SiSocketdotio className="h-4 w-4" key={6} />,
  electron: <SiElectron className="h-4 w-4" key={7} />,
  expo: <SiExpo className="h-4 w-4" key={8} />,
  mui: <SiMui className="h-4 w-4" key={9} />,
  github: <FaGithub className="h-4 w-4" key={10} />,
  externallink: <FaExternalLinkAlt className="h-4 w-4" key={11} />,
};

/**
 * Projects Data
 * An array of project objects representing the portfolio projects.
 */
export const projects: Project[] = [
  {
    id: 'appointments-manager',
    url: '/projects/appointments-manager',
    header: {
      gradient: 'from-blue-500/60 to-cyan-500/60',
      bannerImages: [{
        src: '/projects/appointments-manager/Screenshot1.png',
        width: 1920,
        height: 1080,
        alt: 'Appointments Manager Screenshot 1',
      }],
    },
    icons: [
      iconMap.typescript,
      iconMap.electron,
      iconMap.mui,
      iconMap.mongodb
    ],
    urls: {},
    title: 'Appointments Manager',
    description: '',
  }
];