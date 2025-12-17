"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";

/**
 * Language Toggle Component
 * Allows users to switch between supported languages.
 */
export function LanguageToggle() {
  const router = useRouter();
  const locale = useLocale();

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;

    // Set cookie for locale preference
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // Soft refresh to reload server components
    router.refresh();
  };

  return (
    <button
      onClick={() => switchLocale(locale === "en" ? "el" : "en")}
      className="h-[30px] w-[30px] flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Change language"
    >
      <span className="text-lg">{locale === "en" ? "🇬🇷" : "🇬🇧"}</span>
    </button>
  );
}