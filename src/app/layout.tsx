import type { Metadata } from "next";
import "./globals.css";
import React, { ReactNode } from "react";

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Learning SRS",
  description: "A spaced repetition system (SRS) for efficient learning and long-term retention",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang= "en" >
    <body>
    { children }
    </body>
    </html>
  );
}
