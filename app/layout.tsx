import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";

import Beams from "@/components/Beams";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dapp Trading Assistant",
  description: "Real-time gas prices, token swaps, and market insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${schibstedGrotesk.variable} ${martianMono.variable}  antialiased`}
      >
        <div className="absolute inset-0 top-0  z-[-1] min-h-screen ">
          <Beams
            beamWidth={2}
            beamHeight={11}
            beamNumber={10}
            lightColor="#ffffff"
            speed={1.8}
            noiseIntensity={0.5}
            scale={0.2}
            rotation={0}
          />
        </div>

        <main>{children}</main>
      </body>
    </html>
  );
}
