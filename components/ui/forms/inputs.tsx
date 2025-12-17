import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
  error?: string;
}

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  resize?: string;
  className?: string;
  error?: string;
}

/**
 * Reusable form input component with validation error display and smooth animations.
 * Supports all standard HTML input attributes through prop spreading.
 */
export const FormTextInput: React.FC<FormInputProps> = ({ value, onChange, label, error, className, ...inputProps }) => {
  return (
    <div className="flex flex-col mb-4">
      {label && <label className="mb-2 font-medium">{label}</label>}
      <input
        value={value}
        onChange={onChange}
        className={cn(
          `w-full px-4 py-2 rounded-xl border focus:border-black/20 bg-black/5 dark:bg-white/5 focus:dark:border-white/20 focus:outline-none transition-colors`,
          error ? 'border-red-500' : 'border-black/10 dark:border-white/10',
          className
        )}
        {...inputProps}
      />
      <InputError message={error} />
    </div>
  );
}

/**
 * Reusable form textarea component with validation error display and smooth animations.
 * Supports all standard HTML textarea attributes through prop spreading.
 */
export const FormTextArea: React.FC<FormTextAreaProps> = ({ value, onChange, label, className, error, resize, ...textareaProps }) => {
  return (
    <div className="flex flex-col mb-4">
      {label && <label className="mb-2 font-medium">{label}</label>}
      <textarea
        value={value}
        onChange={onChange}
        className={cn(
          `w-full px-4 py-2 rounded-xl border focus:border-black/20 focus:outline-none bg-black/5 dark:bg-white/5 focus:dark:border-white/20 transition-colors`,
          error ? 'border-red-500' : 'border-black/10 dark:border-white/10',
          resize,
          className
        )}
        {...textareaProps}
      />
      <InputError message={error} />
    </div>
  );
}

/**
 * Component to display input validation errors with smooth animations.
 * Only renders when there is an error message.
 */
function InputError({ message }: {
  message?: string
}) {
  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.span
          key="error"
          initial={{ opacity: 0, y: -10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -10, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-red-500 text-sm mt-1 block"
        >
          {message}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

FormTextInput.displayName = 'FormTextInput';
FormTextArea.displayName = 'FormTextArea';