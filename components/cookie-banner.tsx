"use client";

import { useState, useEffect } from "react";

/**
 * Cookie Banner Component
 * Displays a cookie consent banner at the bottom of the screen.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookieAccepted")) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieAccepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-3 left-0 right-0 z-50 pointer-events-none">
      <div className="pointer-events-auto w-full flex justify-start md:justify-normal">
        <div className="
          bg-gradient-to-br 
          from-neutral-900 
          via-neutral-800 
          to-neutral-700 
          dark:from-neutral-100 
          dark:via-neutral-200 
          dark:to-neutral-300 
          text-white 
          dark:text-neutral-900 
          rounded-xl 
          shadow-xl 
          p-3 
          flex 
          items-center 
          gap-3  
          border 
          border-neutral-700 
          dark:border-neutral-300 
          min-w-[220px] 
          w-full 
          md:max-w-sm 
          md:w-auto 
          mx-4 
          md:ml-3 
          transition-colors 
          duration-300">
          <span className="text-xs font-medium">
            This website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content. <br />
            By continuing to use this site, you consent to our use of cookies.
          </span>
          <button
            onClick={acceptCookies}
            className="
            bg-green-500 
            dark:bg-green-500 
            text-white 
            px-3 
            py-1 
            rounded-lg 
            font-semibold 
            shadow 
            hover:bg-green-600 
            dark:hover:bg-green-600
            transition-colors 
            text-xs
            cursor-pointer"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}