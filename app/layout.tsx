import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3D Cube POC - Interactive Points",
  description: "Proof of Concept: Next.js + Three.js - Interactive 3D Model with clickable points",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}

