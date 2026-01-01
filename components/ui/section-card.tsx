import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionCard({ children, className, transition }: {
  children: React.ReactNode;
  className?: string;
  transition?: any
}) {

  const glass = `bg-white/50 dark:bg-black/30 bg-clip-padding backdrop-filter backdrop-blur-lg`;
  const border = `border border-black/[0.1] dark:border-white/[0.2]`;

  // If no transition is provided, render a static div
  if (!transition) {
    return (
      <div className={cn(
        `h-full w-full flex-1 rounded-xl shadow-lg p-6`,
        className,
        glass,
        border
      )}
      >
        {children}
      </div>
    )
  }

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      transition={transition}
      className={cn(
        `h-full w-full flex-1 rounded-xl shadow-lg p-6`,
        className,
        glass,
        border
      )}
    >
      {children}
    </motion.div>
  );
}

export function SectionCardHeader({ children }: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-2">
      <h2 className="text-2xl font-semibold text-black dark:text-white">{children}</h2>
      <div className="w-full h-[0.1rem] bg-black/[0.1] dark:bg-white/[0.2] rounded-xl"></div>
    </div>
  );
}