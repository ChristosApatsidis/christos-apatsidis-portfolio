"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Link from "next/link";
/* i18n */
import { useTranslations } from 'next-intl';

/**
 * Footer Component
 * Renders the footer section with links and contact information.
 */
export function Footer({ className }: {
  className?: string
}) {
  const t = useTranslations('footer');

  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);

  // Update date and time every second
  useEffect(() => {
    setCurrentDateTime(new Date());

    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <footer
      role="contentinfo"
      aria-label="Footer"
      className={`mt-3 mb-3 ${cn(className)}`}
    >
      <div className="relative rounded-xl border border-black/[0.1] dark:border-white/[0.2] bg-white/30 dark:bg-black/30 backdrop-blur-lg shadow-lg p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Name and Title */}
          <div>
            <h3 className="text-xl font-bold">Christos Apatsidis</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
              Portfolio website
            </p>
          </div>

          {/* Quick Links */}
          <div className='grid grid-cols-2 gap-4 justify-end'>
            <div>
              <h4 className="text-sm md:text-md lg:text-lg font-semibold">{t('quickLinks')}</h4>
              <ul>
                <li>
                  <Link
                    href="/about"
                    className="text-sm md:text-md text-gray-900 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white cursor-pointer transition"
                  >
                    {t('about')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm md:text-md text-gray-900 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white cursor-pointer transition"
                  >
                    {t('contact')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm md:text-md lg:text-lg font-semibold">{t('connect')}</h4>
              <ul>
                <li>
                  <a
                    href="https://www.linkedin.com/in/christos-apatsidis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm md:text-md  text-gray-900 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white cursor-pointer transition"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:christos.apatsidis@icloud.com"
                    className="text-sm md:text-md text-gray-900 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white cursor-pointer transition">
                    Email
                  </a>
                </li>
                <li>
                  <a href="https://github.com/christosapatsidis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm md:text-md text-gray-900 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white cursor-pointer transition">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <div
          className="w-full h-[0.1rem] bg-black/[0.1] dark:bg-white/[0.2] rounded-xl"
          aria-hidden="true"
        />

        {/* footer */}
        <div className="flex justify-between">
          {/* Rights */}
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            <p>&copy; {new Date().getFullYear()} Christos Apatsidis. <br className="md:hidden" />{t('rights')}</p>
          </div>
          {/* Date and Time */}
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            <p>{currentDateTime && currentDateTime.toLocaleDateString() + " " + currentDateTime.toLocaleTimeString()}</p>
          </div>
        </div>

      </div>
    </footer>
  );
}