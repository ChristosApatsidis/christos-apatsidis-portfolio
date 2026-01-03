"use client";

/* Types */
import type { Project } from "@/types/projects";

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
// Animation library
import { motion, Variants, AnimatePresence, animate } from 'framer-motion';
// UI Components
import { SectionCard, SectionCardHeader } from '@/components/ui/section-card';
// Icons
import { MdOutlineSubtitles } from "react-icons/md";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { TbStack2 } from "react-icons/tb";
import { Calendar, CreditCard, XCircle, Users, CheckCircle, Monitor, FileCode } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Appointments Manager Page
 * Renders the Appointments Manager project page.
 */
export default function ProjectsAppointmentsManagerPage() {
  // Screenshots for both themes
  const screenshots = [
    {
      src: "/projects/appointments-manager/Screenshot1.png",
      alt: "Dashboard screenshot",
      width: 1280,
      height: 720,
      theme: ["light", "dark"],
    },
    {
      src: "/projects/appointments-manager/Screenshot2.png",
      alt: "Calendar screenshot",
      width: 1280,
      height: 720,
      theme: ["light", "dark"],
    },
    {
      src: "/projects/appointments-manager/Screenshot3.png",
      alt: "Appointment details screenshot",
      width: 1280,
      height: 720,
      theme: ["light", "dark"],
    },
    {
      src: "/projects/appointments-manager/Screenshot4.png",
      alt: "Client communication screenshot",
      width: 1280,
      height: 720,
      theme: ["light", "dark"],
    },
    {
      src: "/projects/appointments-manager/Screenshot5.png",
      alt: "Settings screenshot",
      width: 1280,
      height: 720,
      theme: ["light", "dark"],
    },
    {
      src: "/projects/appointments-manager/Screenshot6.png",
      alt: "Settings screenshot",
      width: 1280,
      height: 720,
      theme: ["light", "dark"],
    },
    {
      src: "/projects/appointments-manager/Screenshot7.png",
      alt: "Settings screenshot",
      width: 1280,
      height: 720,
      theme: ["light", "dark"],
    },
    {
      src: "/projects/appointments-manager/Screenshot8.png",
      alt: "Settings screenshot",
      width: 1280,
      height: 720,
      theme: ["light", "dark"],
    }
  ];

  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  // Determine current theme
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';

  // Filter screenshots based on current theme
  const filteredScreens = screenshots.filter(s => s.theme.includes(theme));

  // State for currentScreenshot screenshot index
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  const prevImage = () => {
    setCurrentScreenshot((prev) => (prev === 0 ? filteredScreens.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentScreenshot((prev) => (prev === filteredScreens.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Css glassmorphism styles
  const glass = `
    bg-white/20 dark:bg-black/20
    bg-gradient-to-br from-white/30 via-white/10 to-white/5 dark:from-black/30 dark:via-black/10 dark:to-black/5
    backdrop-blur-xl
    border border-white/30 dark:border-white/20
    ring-1 ring-white/20 dark:ring-white/10
  `;
  const border = `border border-black/[0.1] dark:border-white/[0.2]`;

  // Framer Motion variants for fade-in and staggered animation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <SectionCard>
      <SectionCardHeader animated>
        Appointments Manager
      </SectionCardHeader>

      <motion.div
        className="space-y-4 mt-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={cardVariants} className={cn("p-4 rounded-lg shadow space-y-2", glass, border)}>
          <h4 className="flex items-center gap-2 text-base font-semibold text-blue-600 dark:text-blue-300 mb-1">
            <MdOutlineSubtitles className="w-5 h-5" /> Overview
          </h4>
          <div className="w-full h-[0.1rem] bg-black/[0.1] dark:bg-white/[0.2] rounded-xl mb-2"></div>
          <p className="text-md text-neutral-900 dark:text-neutral-200">
            The Appointments Manager is a purpose-built desktop application designed to meet the complex needs of special treatment centers. Unlike generic scheduling tools, this app provides a comprehensive solution for managing recurring appointments, therapist assignments, and intricate billing scenarios.
          </p>
          <p className="text-md text-neutral-900 dark:text-neutral-200">
            This Appointment Manager transforms chaotic, paper-based processes into a streamlined digital workflow. By combining a user-friendly interface with advanced financial logic, it empowers therapists to focus on patient care instead of administration.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Interactive Dashboard */}
          <motion.div variants={cardVariants} className={cn("p-4 rounded-lg shadow space-y-2", glass, border)}>
            <h4 className="flex items-center gap-2 text-base font-semibold text-blue-600 dark:text-blue-300 mb-1">
              <Calendar className="w-5 h-5" /> Interactive Dashboard
            </h4>
            <div className="w-full h-[0.1rem] bg-black/[0.1] dark:bg-white/[0.2] rounded-xl mb-2"></div>
            <p className="text-neutral-900 dark:text-neutral-200">
              <span className="font-medium">Granular Filtering:</span> Easily filter the schedule by therapy type or therapist for a personalized view.
            </p>
            <p className="text-neutral-900 dark:text-neutral-200">
              <span className="font-medium">Status at a Glance:</span> Instantly recognize appointment types and statuses with color-coded blocks.
            </p>
            <p className="text-neutral-900 dark:text-neutral-200">
              <span className="font-medium">Flexible Navigation:</span> Plan ahead with custom date pickers for daily and weekly overviews.
            </p>
          </motion.div>

          {/* Comprehensive Client Profiles */}
          <motion.div variants={cardVariants} className={cn("p-4 rounded-lg shadow space-y-2", glass, border)}>
            <h4 className="flex items-center gap-2 text-base font-semibold text-blue-600 dark:text-blue-300 mb-1">
              <Users className="w-5 h-5" /> Comprehensive Client Profiles
            </h4>
            <div className="w-full h-[0.1rem] bg-black/[0.1] dark:bg-white/[0.2] rounded-xl mb-2"></div>
            <p className="text-neutral-900 dark:text-neutral-200">
              <span className="font-medium">Demographics:</span> Store essential client details like age, contact, and insurance information.
            </p>
            <p className="text-neutral-900 dark:text-neutral-200">
              <span className="font-medium">Session History:</span> Access a complete log of all past and upcoming sessions.
            </p>
            <p className="text-neutral-900 dark:text-neutral-200">
              <span className="font-medium">Payment Status:</span> Instantly see which sessions are paid (<CheckCircle className="inline w-4 h-4 text-green-500" />) or unpaid (<XCircle className="inline w-4 h-4 text-red-500" />) with clear visual cues.
            </p>
          </motion.div>

          {/* Smart Appointment Creation */}
          <motion.div variants={cardVariants} className={cn("p-4 rounded-lg shadow space-y-2", glass, border)}>
            <h4 className="flex items-center gap-2 text-base font-semibold text-blue-600 dark:text-blue-300 mb-1">
              <FileCode className="w-5 h-5" /> Smart Appointment Creation
            </h4>
            <div className="w-full h-[0.1rem] bg-black/[0.1] dark:bg-white/[0.2] rounded-xl mb-2"></div>
            <p className="text-neutral-900 dark:text-neutral-200">
              <span className="font-medium">Step-by-Step Wizard:</span> A guided process ensures all details are captured, reducing errors.
            </p>
            <p className="text-neutral-900 dark:text-neutral-200">
              <span className="font-medium">Conflict Detection:</span> Prevents double-booking and keeps the schedule accurate.
            </p>
            <p className="text-neutral-900 dark:text-neutral-200">
              <span className="font-medium">Integrated Billing:</span> Pricing is automatically set based on the selected service and patient.
            </p>
          </motion.div>

          {/* Advanced Financial Management */}
          <motion.div variants={cardVariants} className={cn("p-4 rounded-lg shadow space-y-2", glass, border)}>
            <h4 className="flex items-center gap-2 text-base font-semibold text-blue-600 dark:text-blue-300 mb-1">
              <CreditCard className="w-5 h-5" /> Advanced Financial Management
            </h4>
            <div className="w-full h-[0.1rem] bg-black/[0.1] dark:bg-white/[0.2] rounded-xl mb-2"></div>
            <p className="text-neutral-900 dark:text-neutral-200">
              <span className="font-medium">Bulk Settlement:</span> Settle multiple sessions at once for efficient payment processing.
            </p>
            <p className="text-neutral-900 dark:text-neutral-200">
              <span className="font-medium">Real-Time Balances:</span> Instantly view available balances, outstanding debts, and credits.
            </p>
            <p className="text-neutral-900 dark:text-neutral-200">
              <span className="font-medium">Revenue Insights:</span> The dashboard provides a clear overview of revenue, pending payments, and payment methods.
            </p>
          </motion.div>
        </motion.div>

        {/* Modern Tech Stack */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 1.25 } },
          }}
          className={cn("p-4 rounded-lg shadow space-y-2", glass, border)}
        >
          <h4 className="flex items-center gap-2 text-base font-semibold text-blue-600 dark:text-blue-300 mb-1">
            <TbStack2 className="w-5 h-5" /> Modern Tech Stack
          </h4>
          <div className="w-full h-[0.1rem] bg-black/[0.1] dark:bg-white/[0.2] rounded-xl mb-2"></div>
          <p className="text-md text-neutral-900 dark:text-neutral-200">
            Built with Electron.js for a seamless desktop experience, this application leverages TypeScript for type safety and MongoDB for flexible data storage. The combination of these technologies ensures a robust, maintainable, and user-friendly solution tailored to the unique needs of therapy centers.
          </p>
        </motion.div>

        {/* Screenshot Slider */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 1.50 } },
          }}
          className={cn("p-4 rounded-lg shadow space-y-2", glass, border)}
        >
          <h4 className="flex items-center gap-2 text-base font-semibold text-blue-600 dark:text-blue-300 mb-1">
            <Monitor className="w-5 h-5" /> Screenshot Gallery
          </h4>
          <div className="w-full h-[0.1rem] bg-black/[0.1] dark:bg-white/[0.2] rounded-xl mb-2"></div>

          {mounted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="w-full flex flex-col items-center relative aspect-[16/9] overflow-hidden rounded-lg border border-black/[0.1] dark:border-white/[0.2] bg-white/30 dark:bg-black/30"
            >
              <AnimatePresence mode="sync">
                <motion.img
                  key={filteredScreens[currentScreenshot].src}
                  src={filteredScreens[currentScreenshot].src}
                  alt={filteredScreens[currentScreenshot].alt}
                  width={filteredScreens[currentScreenshot].width}
                  height={filteredScreens[currentScreenshot].height}
                  className="object-contain rounded-lg w-full h-full absolute left-0 top-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
              {filteredScreens.length > 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  <button
                    onClick={prevImage}
                    className="bg-white/70 dark:bg-black/40 rounded-full px-2 py-2 text-xs font-bold shadow hover:bg-white/90 dark:hover:bg-black/60 flex items-center justify-center cursor-pointer"
                    aria-label="Previous screenshot"
                  >
                    <FiChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="bg-white/70 dark:bg-black/40 rounded-full px-2 py-2 text-xs font-bold shadow hover:bg-white/90 dark:hover:bg-black/60 flex items-center justify-center cursor-pointer"
                    aria-label="Next screenshot"
                  >
                    <FiChevronRight size={18} />
                  </button>
                </div>
              )}
              {filteredScreens.length > 1 && (
                <div className="absolute bottom-2 right-4 flex gap-1 z-10">
                  {filteredScreens.map((_, idx) => (
                    <span
                      key={idx}
                      className={`inline-block w-2 h-2 rounded-full ${idx === currentScreenshot ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </SectionCard>
  );
}