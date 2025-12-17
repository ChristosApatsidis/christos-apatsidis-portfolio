import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Christos Apatsidis Portfolio",
  description: "Contact page of Christos Apatsidis portfolio website",
};

export default async function ContactLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}