"use client";
import React, { useState } from 'react';
import { Spotlight } from "@/components/ui/spotlight-new";
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { SectionCard, SectionCardHeader } from '@/components/ui/sectionCard';

export default function AboutPage() {


  return (
    <SectionCard
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >


        <SectionCardHeader>About me</SectionCardHeader>
        <p className="text-md text-black dark:text-white mb-2">
          Technology has always been my battlefield.
          From the earliest days of my career, I was drawn to the challenge of turning complex problems into elegant digital solutions.
          Over the past decade, I've mastered the art of full stack development—building systems that balance logic, architecture, and creativity.
        </p>
        <p className="text-md text-black dark:text-white">
          Currently, I apply my expertise to a unique frontier.
          The Greek Army's Electronic Warfare division.
          There, I work directly with advanced EW systems, analyzing signals and maintaining mission-critical technology.
          I thrive on transforming intricate problems into tactical, practical solutions.
        </p>


      </motion.div>
    </SectionCard>
  );
}