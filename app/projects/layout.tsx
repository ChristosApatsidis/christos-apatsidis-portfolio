import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Christos Apatsidis Portfolio",
  description: "Projects page of Christos Apatsidis portfolio website",
};

export default async function ProjectsLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}