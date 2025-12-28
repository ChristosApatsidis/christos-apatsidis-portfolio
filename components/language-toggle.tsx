"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Language Toggle Component
 * Allows users to switch between supported languages.
 */
export function LanguageToggle() {
  const router = useRouter();
  const locale = useLocale();

  const [mounted, setMounted] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;

    setIsAnimating(true);

    // Set cookie for locale preference
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // Soft refresh to reload server components
    router.refresh();
  };

  if (!mounted) {
    return (
      <div
        className="p-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900"
        aria-label="Loading language toggle"
      >
        <div className="w-4 h-4 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <button
      onClick={() => switchLocale(locale === "en" ? "el" : "en")}
      className="h-[30px] w-[30px] flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors overflow-hidden cursor-pointer"
      aria-label="Change language"
    >
      {isAnimating ? (
        <AnimatePresence mode="wait">
          <motion.span
            key={locale}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="text-lg"
          >
            {locale === "en" ? "🇬🇷" : "🇬🇧"}
          </motion.span>
        </AnimatePresence>
      ) : (
        <span className="text-lg">{locale === "en" ? "🇬🇷" : "🇬🇧"}</span>
      )}
    </button>
  );
}