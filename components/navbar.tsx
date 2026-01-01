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
  const [scrollY, setScrollY] = useState<number>(0);
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
      setScrollY(Math.max(0, window.scrollY));
      setMobileMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Css glassmorphism styles
  const glass = `bg-white/50 dark:bg-black/30 bg-clip-padding backdrop-filter backdrop-blur-lg`;
  const border = `border border-black/[0.1] dark:border-white/[0.2]`;

  // Calculate padding based on scrollY (clamped between 8 and 32)
  const minPadding = 8;
  const maxPadding = 16;
  const padding = Math.max(
    minPadding,
    maxPadding - Math.min(scrollY, maxPadding - minPadding)
  );

  // Calculate logo size based on scroll
  const minLogoSize = 30;
  const maxLogoSize = 32;
  const logoSize = Math.max(
    minLogoSize,
    maxLogoSize - Math.min(scrollY * 0.2, maxLogoSize - minLogoSize)
  );

  return (
    <nav
      role="navigation"
      aria-label="Main Navigation"
      className={cn(
        `fixed top-3 inset-x-0 z-50 max-w-6xl mx-auto px-4`,
        isModalOpen ? "pointer-events-none blur-sm" : "",
        className
      )}
    >
      <motion.div
        animate={{
          paddingTop: padding,
          paddingBottom: padding,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={cn(
          `relative rounded-lg flex flex-col px-4 will-change-auto`,
          glass,
          border
        )}
        style={{
          paddingTop: padding,
          paddingBottom: padding,
          willChange: "padding, background, filter",
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
                  width: logoSize,
                  height: logoSize
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative"
                style={{
                  width: logoSize,
                  height: logoSize
                }}
              >
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  sizes="32px"
                  className="object-contain"
                  priority
                />
              </motion.div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 absolute left-1/2 -translate-x-1/2">
            <MenuItem
              href={menuConfig.home.link}
              ariaLabel={menuConfig.home.title}
            >
              {menuConfig.home.title}
            </MenuItem>
            <MenuItem
              href={menuConfig.about.link}
              ariaLabel={menuConfig.about.title}
            >
              {menuConfig.about.title}
            </MenuItem>
            <MenuItem
              href={menuConfig.contact.link}
              ariaLabel={menuConfig.contact.title}
            >
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
                {/* Home Menu Item */}
                <MenuItem
                  closeMobileMenu={() => setMobileMenuOpen(false)}
                  href={menuConfig.home.link}
                  ariaLabel={menuConfig.home.title}
                  mobile
                  pendingMobileNav={pendingMobileNav}
                  setPendingMobileNav={setPendingMobileNav}
                >
                  {menuConfig.home.title}
                </MenuItem>
                {/* Divider */}
                <div
                  className="w-full h-[0.1rem] bg-black/[0.1] dark:bg-white/[0.2] rounded-xl"
                  aria-hidden="true"
                />
                {/* About Menu Item */}
                <MenuItem
                  closeMobileMenu={() => setMobileMenuOpen(false)}
                  href={menuConfig.about.link}
                  ariaLabel={menuConfig.about.title}
                  mobile
                  pendingMobileNav={pendingMobileNav}
                  setPendingMobileNav={setPendingMobileNav}
                >
                  {menuConfig.about.title}
                </MenuItem>
                {/* Divider */}
                <div
                  className="w-full h-[0.1rem] bg-black/[0.1] dark:bg-white/[0.2] rounded-xl"
                  aria-hidden="true"
                />
                {/* Contact Menu Item */}
                <MenuItem
                  closeMobileMenu={() => setMobileMenuOpen(false)}
                  href={menuConfig.contact.link}
                  ariaLabel={menuConfig.contact.title}
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
    </nav>
  );
}

function MenuItem({ href, ariaLabel, children, closeMobileMenu, mobile, pendingMobileNav, setPendingMobileNav }: {
  href: string;
  ariaLabel?: string | "";
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
      aria-label={ariaLabel}
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