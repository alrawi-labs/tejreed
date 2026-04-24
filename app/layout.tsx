import type { Metadata } from "next";
import {
  Orbitron,
  Nunito,
  Noto_Kufi_Arabic,
  Aref_Ruqaa,
} from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/i18n/LangContext";

/* ─── Display font: Orbitron (bold tech titles) ─── */
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "600", "700", "800", "900"],
});

/* ─── Body font: Nunito (soft, rounded, cute) ─── */
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

/* ─── Arabic fonts ─── */
const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-kufi-arabic",
  weight: ["400", "500", "600", "700"],
});

const arefRuqaa = Aref_Ruqaa({
  subsets: ["arabic"],
  variable: "--font-aref-ruqaa",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Tejreed — AI Creative Tools",
  description:
    "AI-powered creative tools: music extraction, background removal, image enhancement and more.",
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
        className={`
          ${orbitron.variable}
          ${nunito.variable}
          ${notoKufiArabic.variable}
          ${arefRuqaa.variable}
          font-body
          antialiased
        `}
      >
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}