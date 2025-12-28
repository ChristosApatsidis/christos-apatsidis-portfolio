import { ReactNode } from "react";

export interface Project {
  id: string;
  url: string;
  title: string;
  description: string;
  icons?: ReactNode[];
  urls?: {
    live?: {
      href: string;
      label: string;
      icon: ReactNode;
    };
    github?: {
      href: string;
      label: string;
      icon: ReactNode;
    };
  };
  header: {
    gradient: string;
    image?: {
      src: string;
      width: number;
      height: number;
      alt: string;
    };
  };
  glowGradient?: string;
  className?: string;
}