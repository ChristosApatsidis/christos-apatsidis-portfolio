import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionCard({ children, className }: {
  children: React.ReactNode;
  className?: string;
}) {

  const glass = `bg-white/50 dark:bg-black/30 bg-clip-padding backdrop-filter backdrop-blur-lg`;
  const border = `border border-black/[0.1] dark:border-white/[0.2]`;

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

export function SectionCardHeader({ children, animated }: {
  children: React.ReactNode;
  animated?: boolean;
}) {

  if (!animated) {
    return (
      <div className="mb-2">
        <h2 className="text-2xl font-semibold text-black dark:text-white">{children}</h2>
        <div className="w-full h-[0.1rem] bg-black/[0.1] dark:bg-white/[0.2] rounded-xl"></div>
      </div>
    );
  }

  return (
    <motion.span
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="text-2xl font-bold"
    >
      <div className="mb-2">
        <h2 className="text-2xl font-semibold text-black dark:text-white">{children}</h2>
        <div className="w-full h-[0.1rem] bg-black/[0.1] dark:bg-white/[0.2] rounded-xl"></div>
      </div>
    </motion.span>
  );
}