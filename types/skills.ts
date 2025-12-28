import { ReactNode } from "react";

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface SkillItem {
  name: string;
  icon: ReactNode;
  boxShadow: string;
  boxShadowLight: string;
}