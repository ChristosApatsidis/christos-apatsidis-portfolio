"use client";

/* Types */
import type { SkillCategory, SkillItem } from "@/types/skills";

import React, { useEffect, useState } from "react";
/* Next.js Components */
import Image from "next/image";
/* UI Components */
import { ImageModal } from "@/components/ui/image-modal";
import { SectionCard, SectionCardHeader } from "@/components/ui/section-card";
/* Theme */
import { useTheme } from "next-themes";
/* Animation library */
import { motion, Variants } from "framer-motion";
/* Utility */
import { cn } from "@/lib/utils";
/* Icons */
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiSocketdotio, SiMongodb, SiRedis, SiExpo } from "react-icons/si";
/* i18n */
import { useTranslations } from 'next-intl';

/**
 * Home Page Component
 * Renders the main profile and skills sections
 */
export default function Home() {
  return (
    <div>
      {/* Profile Section */}
      <ProfileSection />
      {/* Skills Section */}
      <SkillsSection className="mt-3" />
    </div>
  );
}

/**
 * Profile Section Component
 * Displays profile image, name, title, and social links
 */
function ProfileSection({ className }: {
  className?: string
}) {
  const t = useTranslations('HomePage.ProfileSection');

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hasAnimatedName, setHasAnimatedName] = useState<boolean>(false);

  // Trigger name animation on mount
  useEffect(() => {
    if (!hasAnimatedName) {
      setHasAnimatedName(true);
    }
  }, [hasAnimatedName]);

  // Handle modal open/close side effects
  useEffect(() => {
    // Dispatch custom event when modal state changes
    const event = new CustomEvent('modalStateChange', {
      detail: { isOpen: isModalOpen }
    });

    // Dispatch the event to notify other components
    window.dispatchEvent(event);

    // Prevent body scroll when modal is open
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Css glassmorphism styles
  const glass = `bg-white/50 dark:bg-black/30 bg-clip-padding backdrop-filter backdrop-blur-lg`;
  const border = `border border-black/[0.1] dark:border-white/[0.2]`;

  return (
    <React.Fragment>
      <SectionCard
        className={className}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6"
        >
          {/* Profile Image and Name Row for Mobile */}
          <div className="flex flex-row gap-4 w-full md:flex-col md:w-auto">
            {/* Animated Profile Image */}
            <motion.div
              className="flex-shrink-0 relative z-10"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
            >
              {/* Mobile Image */}
              <Image
                src="/christos-profile.png"
                alt="Christos Apatsidis"
                width={120}
                height={120}
                className={cn(
                  "md:hidden w-20 h-20 object-cover rounded-full shadow-xl cursor-pointer",
                  glass,
                  border
                )}
                priority
              />
              {/* Desktop Image */}
              <Image
                src="/christos-profile.png"
                alt="Christos Apatsidis"
                width={160}
                height={160}
                className={cn(
                  "hidden md:block md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover rounded-full shadow-xl cursor-pointer",
                  glass,
                  border
                )}
                priority
              />
            </motion.div>

            {/* Name and Title for Mobile */}
            <div className="flex flex-col md:hidden">
              <motion.h1
                className="whitespace-nowrap text-xl sm:text-2xl font-bold text-black dark:text-white"
                aria-label={t('name')}
              >
                {Array.from(t('name')).map((char, i) => (
                  <motion.span
                    key={`${char}-${i}`}
                    initial={
                      !hasAnimatedName
                        ? { opacity: 0, y: i % 2 === 0 ? -40 : 40 }
                        : false
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: !hasAnimatedName ? 0.1 + i * 0.06 : 0,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                    }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h1>
              <p className="text-base text-blue-600 dark:text-blue-400 font-semibold mb-1">
                {t('description')}
              </p>
            </div>
          </div>

          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-left w-full"
          >
            {/* Name and Title for Desktop */}
            <div className="hidden md:block">
              <motion.h1
                className="text-3xl lg:text-4xl font-bold text-black dark:text-white flex flex-wrap"
                aria-label={t('name')}
              >
                {Array.from(t('name')).map((char, i) => (
                  <motion.span
                    key={`${char}-${i}`}
                    initial={
                      !hasAnimatedName
                        ? { opacity: 0, y: i % 2 === 0 ? -40 : 40 }
                        : false
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: !hasAnimatedName ? 0.1 + i * 0.06 : 0,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                    }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h1>

              <p className="text-lg md:text-xl text-blue-600 dark:text-blue-400 font-semibold mb-2">
                Full-Stack Developer
              </p>
            </div>

            {/* Profile Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="justify-start mb-4"
            >
              <p className="text-base text-black dark:text-white mb-1">
                {t('location')}
              </p>
              <p className="text-base text-black dark:text-white mb-2">
                {t('currentPosition')}
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex gap-4 md:justify-start mt-2"
            >
              <a
                href="https://github.com/ChristosApatsidis"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/christos-apatsidis"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="mailto:christos.apatsidis@icloud.com"
                aria-label="Send Email"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </SectionCard>

      {/* Profile image Modal */}
      <ImageModal
        image={{ src: "christos-profile.png", alt: "Christos Apatsidis" }}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </React.Fragment>
  );
}

/**
 * Skills Section Component
 * Displays categorized skills with icons and animations
 */
function SkillsSection({ className }: {
  className?: string
}) {
  const t = useTranslations('HomePage.SkillsSection');
  const { theme } = useTheme();

  const [isAnimated, setIsAnimated] = useState<boolean>(false);

  // Animation Variants
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.11, // Reduced for smoother stagger
        delayChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6
      }
    },
  };

  const skills: SkillCategory[] = [
    {
      category: t('frontend'),
      items: [
        { name: "HTML", icon: <FaHtml5 className="text-orange-500" size={20} />, boxShadow: "0 0 10px 2px rgba(255,165,0,0.8)", boxShadowLight: "0 0 10px 2px rgba(255,140,0,0.8)" },
        { name: "CSS", icon: <FaCss3Alt className="text-blue-500" size={20} />, boxShadow: "0 0 10px 2px rgba(30,144,255,0.8)", boxShadowLight: "0 0 10px 2px rgba(0,0,255,0.8)" },
        { name: "JavaScript", icon: <FaJs className="text-yellow-500" size={20} />, boxShadow: "0 0 10px 2px rgba(255,223,0,0.8)", boxShadowLight: "0 0 10px 2px rgba(255,215,0,0.8)" },
        { name: "React", icon: <FaReact className="text-blue-400" size={20} />, boxShadow: "0 0 10px 2px rgba(100,149,237,0.8)", boxShadowLight: "0 0 10px 2px rgba(30,144,255,0.8)" },
        { name: "Next.js", icon: <SiNextdotjs className="text-black dark:text-white" size={20} />, boxShadow: "0 0 10px 2px rgba(255,255,255,0.8)", boxShadowLight: "0 0 10px 2px rgba(23, 22, 22, 0.8)" },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400" size={20} />, boxShadow: "0 0 10px 2px rgba(64,224,208,0.8)", boxShadowLight: "0 0 10px 2px rgba(0,206,209,0.8)" },
      ],
    },
    {
      category: t('backend'),
      items: [
        { name: "Node.js", icon: <FaNodeJs className="text-green-500" size={20} />, boxShadow: "0 0 10px 2px rgba(34,139,34,0.8)", boxShadowLight: "0 0 10px 2px rgba(34,139,34,0.8)" },
        { name: "Express", icon: <FaNodeJs className="text-gray-500" size={20} />, boxShadow: "0 0 10px 2px rgba(255,255,255,0.8)", boxShadowLight: "0 0 10px 2px rgba(82, 80, 80, 0.8)" },
        { name: "Socket.io", icon: <SiSocketdotio className="text-pink-500" size={20} />, boxShadow: "0 0 10px 2px rgba(255,105,180,0.8)", boxShadowLight: "0 0 10px 2px rgba(255,20,147,0.8)" },
      ],
    },
    {
      category: t('databases'),
      items: [
        { name: "MongoDB", icon: <SiMongodb className="text-green-500" size={20} />, boxShadow: "0 0 10px 2px rgba(34,139,34,0.8)", boxShadowLight: "0 0 10px 2px rgba(34,139,34,0.8)" },
        { name: "Redis", icon: <SiRedis className="text-red-500" size={20} />, boxShadow: "0 0 10px 2px rgba(255,0,0,0.8)", boxShadowLight: "0 0 10px 2px rgba(255,0,0,0.8)" }
      ],
    },
    {
      category: t('mobileApps'),
      items: [
        { name: "React Native", icon: <FaReact className="text-blue-400" size={20} />, boxShadow: "0 0 10px 2px rgba(100,149,237,0.8)", boxShadowLight: "0 0 10px 2px rgba(30,144,255,0.8)" },
        { name: "Expo", icon: <SiExpo className="text-gray-700 dark:text-gray-300" size={20} />, boxShadow: "0 0 10px 2px rgba(255,255,255,0.8)", boxShadowLight: "0 0 10px 2px rgba(82, 80, 80, 0.8)" },
      ],
    }
  ];

  // Css glassmorphism styles
  const glass = `bg-white/50 dark:bg-black/30 bg-clip-padding backdrop-filter backdrop-blur-lg`;
  const border = `border border-black/[0.1] dark:border-white/[0.2]`;

  return (
    <React.Fragment>
      <SectionCard
        className={className}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        {/* Scroll message with smooth exit animation - Outside SectionCard */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: isAnimated ? 0 : 1,
            y: isAnimated ? -10 : 0,
            height: isAnimated ? 0 : 'auto',
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut"
          }}
          className="text-center text-gray-600 dark:text-gray-400 overflow-hidden"
        >
          <p className="text-lg">{t('scrollMessage')}</p>
          <motion.div
            className="mt-2 animate-bounce"
          >
            <svg className="w-6 h-6 mx-auto text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
        <motion.div
          initial="hidden"
          animate={isAnimated ? "visible" : "hidden"}
          onViewportEnter={() => setIsAnimated(true)}
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          <SectionCardHeader>{t('title')}</SectionCardHeader>
          {/* Skills Grid */}
          {skills.map((skillCategory: SkillCategory, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                {skillCategory.category}
              </h3>
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                variants={container}
              >
                {skillCategory.items.map((skill: SkillItem, idx) => (
                  <motion.div
                    key={idx}
                    className={cn(
                      `flex items-center gap-2 px-4 py-2 text-gray-800 dark:text-gray-200 font-medium rounded-md shadow-input cursor-pointer`,
                      glass,
                      border
                    )}
                    variants={item}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: theme === 'dark'
                        ? `${skill.boxShadow}`
                        : `${skill.boxShadowLight}`,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{
                      scale: 0.98,
                      boxShadow: theme === 'dark'
                        ? `${skill.boxShadow}`
                        : `${skill.boxShadowLight}`,
                      transition: { duration: 0.2 },
                    }}
                  >
                    {skill.icon}
                    <span className={cn(
                      skill.name.length > 12 ? 'text-xs' :
                        skill.name.length > 10 ? 'text-sm' :
                          ''
                    )}>
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </SectionCard>
    </React.Fragment>
  );
}