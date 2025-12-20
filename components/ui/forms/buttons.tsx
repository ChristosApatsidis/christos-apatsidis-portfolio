import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  loadingMessage?: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  type = "button",
  loading = false,
  loadingMessage = "Loading...",
  disabled = false,
  className,
  children,
}) => {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.99 }}
      disabled={disabled}
      className={cn(
        "w-full px-4 py-2 rounded-xl bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 border border-black/20 dark:border-white/20 transition-colors font-medium text-black/80 dark:text-white/80 hover:text-black/90 dark:hover:text-white/90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {loadingMessage}
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
};

Button.displayName = "Button";