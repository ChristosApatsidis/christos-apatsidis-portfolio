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
    bannerImages?: BannerImage[];
  };
  glowGradient?: string;
  className?: string;
}

type BannerImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export interface ProjectsGridProps {
  className?: string;
  children?: ReactNode;
}

export interface ProjectsGridItemProps {
  className?: string;
  project: Project;
}
