import type { Metadata } from "next";
import Script from "next/script";

import {
  Orbitron,
  Nunito,
  Noto_Kufi_Arabic,
  Aref_Ruqaa,
} from "next/font/google";

import "./globals.css";
import { LangProvider } from "@/i18n/LangContext";

/* ─── Display font: Orbitron ─── */
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "600", "700", "800", "900"],
});

/* ─── Body font: Nunito ─── */
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
      <head>
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6180379726303484"
          crossOrigin="anonymous"
        />
        <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
         <meta name="google-adsense-account" content="ca-pub-6180379726303484" />
      </head>

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
