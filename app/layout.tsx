import type { Metadata } from "next";
import React from "react";
// Theme Provider
import { ThemeProvider } from "@/components/theme-provider"
// Fonts
import { Geist, Geist_Mono } from "next/font/google";
// i18n
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
// Vercel Speed Insights and Analytics
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
// Cookie Banner
import { CookieBanner } from "@/components/cookie-banner";
// Styles
import "./globals.css";
// Vercel Toolbar
import { VercelToolbar } from '@vercel/toolbar/next';
// Layout Components
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footter";
import { Background } from "@/components/ui/background";

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
  keywords: [
    "Christos Apatsidis",
    "Portfolio",
    "Developer",
    "Software Engineer",
    "Web Developer",
    "Full-Stack Developer",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "CSS",
    "HTML",
    "Programming",
    "Tech Blog",
  ],
  authors: [{ name: "Christos Apatsidis", url: "https://apatsidis.com" }],
  creator: "Christos Apatsidis",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Christos Apatsidis Portfolio",
    description: "Christos Apatsidis portfolio",
    siteName: "Christos Apatsidis Portfolio",
    images: [{
      url: "og-image-home.png",
      width: 1200,
      height: 630,
      alt: "Christos Apatsidis Portfolio"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Christos Apatsidis Portfolio",
    description: "Christos Apatsidis portfolio",
    images: ["./og-image-home.png"]
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html suppressHydrationWarning lang={locale} translate="no" className="notranslate">
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
            {/* Background */}
            <div className="fixed inset-0 h-full w-full z-0">
              <Background />
            </div>
            {/* Navigation Bar */}
            <Navbar />

            {/* Main Content */}
            <main role="main" className="flex-1 flex flex-col mt-[88px] container mx-auto max-w-6xl px-4">
              {children}
            </main>

            {/* Footer */}
            <Footer className="container mx-auto max-w-6xl px-4" />

            {/* Cookie Banner */}
            <CookieBanner />
          </ThemeProvider>
        </NextIntlClientProvider>
        {/* Vercel Speed Insights & Analytics */}
        <SpeedInsights />
        <Analytics />
        {process.env.NODE_ENV === 'development' && <VercelToolbar />}
      </body>
    </html>
  );
}