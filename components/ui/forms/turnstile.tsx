"use client";

/* Types */
import type { TurnstileProps } from '@marsidev/react-turnstile';

import { memo, useState, useEffect, forwardRef } from 'react';
/* Turnstile CAPTCHA React wrapper */
import { Turnstile as TurnstileWidget, TurnstileInstance } from '@marsidev/react-turnstile';
/* i18n */
import { useLocale } from 'next-intl';

/**
 * Turnstile CAPTCHA component wrapper.
 * Renders the Turnstile widget with loading state and error handling.
 */
export const Turnstile = memo(forwardRef<TurnstileInstance, TurnstileProps>(
  ({ onSuccess, onError, onExpire, options = {} }, ref) => {
    const [mounted, setMounted] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
      if (!mounted) return;
      // Simulate loading delay for Turnstile widget to enhance UX
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 1000);

      return () => clearTimeout(timer);
    }, [mounted]);

    // Get current locale for potential localization needs
    const locale = useLocale();

    // Ensure the site key is provided via environment variables
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

    if (!siteKey) {
      return (
        <div className="p-4 bg-yellow-500/10 border border-yellow-500 rounded-xl text-yellow-600 text-sm">
          Turnstile verification is not configured.
        </div>
      );
    }

    if (!mounted) {
      return null;
    }

    return (
      <div>
        {/* Only show loader if mounted but not loaded */}
        {!isLoaded && (
          <TurnstileSuspense />
        )}
        {/* Only show widget if mounted and loaded */}
        {isLoaded && (
          <TurnstileWidget
            ref={ref}
            siteKey={siteKey}
            onSuccess={onSuccess}
            onError={onError}
            onExpire={onExpire}
            options={{
              ...options,
              language: locale
            }}
          />
        )}
      </div>
    );
  }
));

const TurnstileSuspense = () => {
  return (
    <div className="h-16 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 animate-pulse flex items-center justify-center">
    </div>
  );
}

Turnstile.displayName = 'Turnstile';