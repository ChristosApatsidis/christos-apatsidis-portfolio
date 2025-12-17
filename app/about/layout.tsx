import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Christos Apatsidis Portfolio",
  description: "About page of Christos Apatsidis portfolio website",
};

export default async function AboutLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}