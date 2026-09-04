import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Video Speed Reader — Video to Transcript in 3 Minutes",
  description:
    "Upload your video, get a clean, high-accuracy transcript in three minutes. Built for creators, educators, and engineers.",
  openGraph: {
    title: "Video Speed Reader",
    description: "Upload your video, get a clean transcript in three minutes.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
