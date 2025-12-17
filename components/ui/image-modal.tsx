import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ImageModal({ image, isOpen, onClose }: {
  image: { src: string, alt?: string };
  isOpen: boolean;
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[100]"
            style={{ pointerEvents: 'auto' }}
            onClick={() => onClose()}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <motion.div
              layoutId="profile-image"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-[102] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                {/* Close Button */}
                <button
                  onClick={() => onClose()}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <svg
                    className="w-6 h-6 text-gray-700 dark:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2} d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Large Image */}
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex-shrink-0"
                >
                  <img
                    src={image.src}
                    alt={image.alt || ""}
                    className="w-full md:w-80 md:h-80 object-cover rounded-xl border-4 border-white/50 dark:border-white/20 shadow-2xl"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}