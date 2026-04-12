import type { Metadata } from 'next'
import { Orbitron, Space_Mono } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '600', '700', '900'],
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
})

// Metadata kısmına icons eklendi
export const metadata: Metadata = {
  title: 'Tejreed — AI Vocal Extractor',
  description: 'Separate crystal-clear vocals from any video instantly with AI.',
  icons: {
    icon: '/tejreed.png', // public klasöründeki yol
    shortcut: '/tejreed.png',
    apple: '/tejreed.png', // Opsiyonel: Apple cihazlar için
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${spaceMono.variable} font-body`}>
        {children}
      </body>
    </html>
  )
}