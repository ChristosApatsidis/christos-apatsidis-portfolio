"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Cookie Banner Component
 * Styled to match the navbar: border, rounded, blurred, semi-transparent.
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

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-3 left-0 right-0 z-50 pointer-events-none">
          <div className="pointer-events-auto w-full flex justify-start md:justify-normal">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="
                relative
                border
                rounded-lg
                border-black/[0.1] 
                dark:border-white/[0.2]
                bg-white/30 
                dark:bg-black/30
                backdrop-blur-lg
                shadow-lg
                flex 
                flex-col 
                md:flex-row
                gap-2
                px-4
                py-3
                min-w-[220px]
                w-full
                md:max-w-lg
                md:w-auto
                mx-4
                md:ml-3
                transition-colors
                duration-300
                overflow-hidden
              "
            >
              <span className="text-xs font-medium text-black dark:text-white">
                We use essential cookies to ensure the best experience on our site. <br />
                By continuing, you agree to our use of cookies.
              </span>
              <button
                onClick={acceptCookies}
                className="
                  bg-green-600 
                  dark:bg-green-600 
                  text-white 
                  px-3 
                  py-1 
                  rounded-lg 
                  font-semibold 
                  shadow 
                  hover:bg-green-700 
                  dark:hover:bg-green-700
                  transition-colors 
                  text-xs
                  cursor-pointer
                  mt-2 
                  md:mt-0 
                  self-end"
              >
                Accept
              </button>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}