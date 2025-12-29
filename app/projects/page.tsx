"use client";

/* Types */
import type { Project } from "@/types/projects";

import React from 'react';
// Animation library
import { motion, Variants } from 'framer-motion';
// UI Components
import { SectionCard } from '@/components/ui/sectionCard';
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
 * Projects Page
 * Renders the projects portfolio page.
 */
export default function ProjectsPage() {
  // Projects data
  const projects: Project[] = [
    {
      id: 'appointments-manager',
      url: '/projects/appointments-manager',
      header: {
        gradient: 'from-blue-500/60 to-cyan-500/60',
        image: {
          src: 'http://127.0.0.1:3000/og-image-home.png',
          width: 1920,
          height: 1080,
          alt: 'Portfolio Website Screenshot',
        },
      },
      icons: [
        <SiNextdotjs key="next" className="h-4 w-4" />,
        <SiTypescript key="ts" className="h-4 w-4" />,
        <SiMongodb key="mongo" className="h-4 w-4" />,
        <SiTailwindcss key="tailwind" className="h-4 w-4" />,
      ],
      urls: {

      },
      title: 'Appointments Manager',
      description: '',
    },
    {
      id: 'chatApp',
      url: '/projects/chatApp',
      title: 'Real-time Chat Application',
      description: 'Full-stack chat platform with Socket.io, Redis caching, and JWT authentication. Supports private messages and group conversations.',
      icons: [
        <SiSocketdotio key="socket" className="h-4 w-4" />,
        <FaReact key="react" className="h-4 w-4" />,
        <FaNodeJs key="node" className="h-4 w-4" />,
      ],
      header: {
        gradient: 'from-purple-500/60 to-pink-500/60',
        image: {
          src: 'http://127.0.0.1:3000/og-image-home.png',
          width: 1920,
          height: 1080,
          alt: 'Portfolio Website Screenshot',
        },
      },
      urls: {
        live: {
          href: '#',
          label: 'Live Demo',
          icon: <FaExternalLinkAlt className="h-3 w-3" />,
        },
        github: {
          href: '#',
          label: 'View Code',
          icon: <FaGithub className="h-3 w-3" />,
        }
      },
    },
    {
      id: 'mobileApp',
      url: '/projects/mobileApp',
      title: 'React Native Mobile App',
      description: 'Cross-platform mobile application built with Expo and React Native, featuring offline-first architecture.',
      icons: [
        <SiExpo key="expo" className="h-4 w-4" />,
        <FaReact key="react" className="h-4 w-4" />,
      ],
      header: {
        gradient: 'from-green-500/60 to-emerald-500/60',
        image: {
          src: 'http://127.0.0.1:3000/og-image-home.png',
          width: 1920,
          height: 1080,
          alt: 'Portfolio Website Screenshot',
        },
      },
      urls: {
        live: {
          href: '#',
          label: 'Live Demo',
          icon: <FaExternalLinkAlt className="h-3 w-3" />,
        },
        github: {
          href: '#',
          label: 'View Code',
          icon: <FaGithub className="h-3 w-3" />,
        }
      },
    },
    {
      id: 'dashboard',
      url: '/projects/dashboard',
      title: 'Analytics Dashboard',
      description: 'Interactive data visualization dashboard with real-time updates, built with Next.js and Chart.js.',
      icons: [
        <SiNextdotjs key="next" className="h-4 w-4" />,
        <SiTypescript key="ts" className="h-4 w-4" />,
      ],
      header: {
        gradient: 'from-orange-500/60 to-red-500/60',
        image: {
          src: 'http://127.0.0.1:3000/og-image-home.png',
          width: 1920,
          height: 1080,
          alt: 'Portfolio Website Screenshot',
        },
      },
      urls: {
        live: {
          href: '#',
          label: 'Live Demo',
          icon: <FaExternalLinkAlt className="h-3 w-3" />,
        },
        github: {
          href: '#',
          label: 'View Code',
          icon: <FaGithub className="h-3 w-3" />,
        }
      },
    },
    {
      id: 'ecommerce',
      url: '/projects/ecommerce',
      title: 'E-Commerce Platform',
      description: 'Full-featured online store with payment integration, inventory management, and order tracking.',
      icons: [
        <SiNextdotjs key="next" className="h-4 w-4" />,
        <SiMongodb key="mongo" className="h-4 w-4" />,
        <FaNodeJs key="node" className="h-4 w-4" />,
      ],
      header: {
        gradient: 'from-indigo-500/60 to-violet-500/60',
        image: {
          src: 'http://127.0.0.1:3000/og-image-home.png',
          width: 1920,
          height: 1080,
          alt: 'Portfolio Website Screenshot',
        },
      },
      urls: {
        live: {
          href: '#',
          label: 'Live Demo',
          icon: <FaExternalLinkAlt className="h-3 w-3" />,
        },
        github: {
          href: '#',
          label: 'View Code',
          icon: <FaGithub className="h-3 w-3" />,
        }
      },
    },
  ];

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <SectionCard transition={{ duration: 0.5, ease: "easeOut" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
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
      </motion.div>
    </SectionCard>
  );
}