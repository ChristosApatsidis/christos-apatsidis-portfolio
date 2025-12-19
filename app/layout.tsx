import type { Metadata } from "next";
import React from "react";
// Theme Provider
import { ThemeProvider } from "@/components/theme-provider"
// Fonts
import { Geist, Geist_Mono } from "next/font/google";
// Spotlight background effect
import { Spotlight } from "@/components/ui/spotlight-new";
// i18n
import { NextIntlClientProvider } from 'next-intl';
// Vercel Speed Insights and Analytics
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
// Styles
import "./globals.css";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Christos Apatsidis Portfolio",
  description: "Christos Apatsidis portfolio",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning translate="no" className="notranslate">
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col notranslate`}
      >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            {/* Background Spotlight Effect */}
            <div className="fixed inset-0 h-full w-full z-0">
              <Spotlight />
            </div>
            {/* Navigation Bar */}
            <nav>
              <Navbar />
            </nav>
            {/* Main Content */}
            <main className="flex-1 flex flex-col mt-[88px] container mx-auto max-w-6xl px-4">
              {children}
            </main>
            {/* Footer */}
            <footer>
              <Footer className="container mx-auto max-w-6xl px-4" />
            </footer>
          </ThemeProvider>
        </NextIntlClientProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}