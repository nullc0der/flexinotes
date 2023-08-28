import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Providers } from "@/lib/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Note App",
  description: "Just another note taking app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} min-h-screen bg-white font-sans  text-black dark:bg-neutral-950 dark:text-white`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
