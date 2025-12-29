import { ReactNode } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes, ButtonHTMLAttributes, ChangeEvent } from "react"

export interface FormField {
  name: string;
  value: string;
  type: string;
  placeholder: string;
  required?: boolean;
  error: string;
};

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
  error?: string;
}

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  resize?: string;
  className?: string;
  error?: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  loadingMessage?: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}