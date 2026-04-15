import type { Metadata } from "next";
import {
  Orbitron,
  Space_Mono,
  Noto_Kufi_Arabic,
  Aref_Ruqaa,
} from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/i18n/LangContext";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "600", "700", "900"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-kufi-arabic",
  weight: ["400", "500", "600", "700"],
});

// Aref Ruqaa Fontu Burada Tanımlanıyor
const arefRuqaa = Aref_Ruqaa({
  subsets: ["arabic"],
  variable: "--font-aref-ruqaa",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Tejreed — AI Vocal Extractor",
  description:
    "Separate crystal-clear vocals from any video instantly with AI.",
  icons: {
    icon: "/tejreed.png",
    shortcut: "/tejreed.png",
    apple: "/tejreed.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${spaceMono.variable} ${notoKufiArabic.variable} ${arefRuqaa.variable} font-body`}
      >
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
