"use client";

import React, { useState, useEffect } from "react";
// Next.js components
import Link from "next/link";
import Image from "next/image";
// Next.js navigation
import { usePathname } from "next/navigation";
// Animation and theme
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
// i18n and Language Toggle
import { useTranslations } from 'next-intl';
import { LanguageToggle } from "@/components/language-toggle";
// Icons
import { FaBars, FaTimes } from "react-icons/fa";
// Utils
import { cn } from "@/lib/utils";

/**
 * Navbar Component
 * Renders a responsive navigation bar with logo, menu items, theme toggle, and language toggle.
 * Futures:
 * - Responsive design with mobile menu
 * - Animated transitions for scroll and menu interactions
 * - i18n support for menu item titles
 */
export function Navbar({ className }: { className?: string }) {
  const t = useTranslations('navbar');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pendingMobileNav, setPendingMobileNav] = useState<string | null>(null);

  // Menu configuration object
  const menuConfig = {
    home: {
      title: `${t("home")}`,
      link: "/",
      icon: "home",
    },
    about: {
      title: `${t("about")}`,
      link: "/about",
      icon: "about",
    },
    contact: {
      title: `${t("contact")}`,
      link: "/contact",
      icon: "contact",
    },
  };

  // Listen for modal state changes
  useEffect(() => {
    const handleModalState = (e: CustomEvent) => {
      setIsModalOpen(e.detail.isOpen);
    };
    window.addEventListener('modalStateChange' as any, handleModalState);
    return () => {
      window.removeEventListener('modalStateChange' as any, handleModalState);
    };
  }, []);

  // Listen for scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      setMobileMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        `fixed top-3 inset-x-0 z-50 max-w-6xl mx-auto px-4 ${isModalOpen ? "pointer-events-none blur-sm" : ""}`,
        className
      )}
    >
      <motion.div
        animate={{
          paddingTop: scrolled ? 10 : 16,
          paddingBottom: scrolled || mobileMenuOpen ? 10 : 16,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative border rounded-lg border-black/[0.1] dark:border-white/[0.2] bg-white/30 dark:bg-black/30 backdrop-blur-lg shadow-lg flex flex-col px-4"
        style={{
          paddingTop: scrolled ? 10 : 16,
          paddingBottom: scrolled || mobileMenuOpen ? 10 : 16,
        }}
      >
        <div className="flex justify-between items-center w-full">
          {/* Left side - Logo */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center"
            >
              <motion.div
                animate={{
                  width: scrolled ? 30 : 32,
                  height: scrolled ? 30 : 32,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative"
                style={{
                  width: scrolled ? 30 : 32,
                  height: scrolled ? 30 : 32,
                }}
              >
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 absolute left-1/2 -translate-x-1/2">
            <MenuItem href={menuConfig.home.link}>
              {menuConfig.home.title}
            </MenuItem>
            <MenuItem href={menuConfig.about.link}>
              {menuConfig.about.title}
            </MenuItem>
            <MenuItem href={menuConfig.contact.link}>
              {menuConfig.contact.title}
            </MenuItem>
          </div>

          {/* Right side - Theme Toggle and Hamburger */}
          <div className="flex items-center">
            {/* Language Toggle */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <LanguageToggle />
            </motion.div>

            {/* Theme Toggle */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center ml-2"
            >
              <ThemeToggle />
            </motion.div>

            <div className="hidden max-md:flex mx-2 h-6 border-l border-black/[0.1] dark:border-white/[0.2]"></div>

            {/* Hamburger for mobile */}
            <div className="hidden max-md:flex items-center">
              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="text-black dark:text-white focus:outline-none relative w-6 h-6"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <FaTimes size={30} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <FaBars size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu with merge animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden w-full"
            >
              <div className="flex flex-col items-center align-center py-2 p-4 space-y-2">
                <MenuItem
                  closeMobileMenu={() => setMobileMenuOpen(false)}
                  href={menuConfig.home.link}
                  mobile
                  pendingMobileNav={pendingMobileNav}
                  setPendingMobileNav={setPendingMobileNav}
                >
                  {menuConfig.home.title}
                </MenuItem>
                <div className="w-full h-[0.1rem] bg-black/[0.1] dark:bg-white/[0.2] rounded-xl"></div>
                <MenuItem
                  closeMobileMenu={() => setMobileMenuOpen(false)}
                  href={menuConfig.about.link}
                  mobile
                  pendingMobileNav={pendingMobileNav}
                  setPendingMobileNav={setPendingMobileNav}
                >
                  {menuConfig.about.title}
                </MenuItem>
                <div className="w-full h-[0.1rem] bg-black/[0.1] dark:bg-white/[0.2] rounded-xl"></div>
                <MenuItem
                  closeMobileMenu={() => setMobileMenuOpen(false)}
                  href={menuConfig.contact.link}
                  mobile
                  pendingMobileNav={pendingMobileNav}
                  setPendingMobileNav={setPendingMobileNav}
                >
                  {menuConfig.contact.title}
                </MenuItem>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function MenuItem({ href, children, closeMobileMenu, mobile, pendingMobileNav, setPendingMobileNav }: {
  href: string;
  children: React.ReactNode;
  closeMobileMenu?: () => void;
  mobile?: boolean;
  pendingMobileNav?: string | null;
  setPendingMobileNav?: (href: string | null) => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const underlineDuration = 0.3;

  /**
   * Handles navigation for mobile menu items with animated transitions.
   * This function manages the mobile navigation flow by:
   * 1. Checking if the device is in mobile mode (returns early if not)
   * 2. Triggering an underline animation by setting the pending navigation state
   * 3. Waiting for the underline animation to complete
   * 4. Closing the mobile menu and clearing the pending navigation state
   * 
   * The timeout duration is synchronized with the underline animation duration
   * to ensure smooth visual transitions before menu closure.
   */
  const handleMobileNavigation = (href: string) => {
    if (!mobile) return;

    // Start underline animation
    setPendingMobileNav?.(href);

    /**
     * Wait for underline animation, then close menu
     * The timeout duration is synchronized with the underline animation duration
     * to ensure smooth visual transitions before menu closure.
     */
    setTimeout(() => {
      closeMobileMenu?.();
      setPendingMobileNav?.(null);
    }, underlineDuration * 1000);
  };

  // Show underline if active or pending navigation
  const showUnderline = isActive || pendingMobileNav === href;

  return (
    <Link
      href={href}
      onClick={() => handleMobileNavigation(href)}
      prefetch={true}
    >
      <div
        className={cn("relative", mobile && "p-2")}
      >
        <div className="relative inline-block">
          <div
            className={cn(
              `cursor-pointer font-bold transition-colors`,
              isActive
                ? "text-black dark:text-white"
                : "text-black/60 hover:text-black/90 dark:text-white/60 dark:hover:text-white/90"
            )}
          >
            {children}
          </div>
          <AnimatePresence>
            {showUnderline && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: underlineDuration, ease: "easeInOut" }}
                className="absolute left-0 right-0 h-[2px] bg-black dark:bg-white bottom-0 origin-left"
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </Link>
  );
};