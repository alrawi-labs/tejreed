'use client'

import { useLang } from '@/i18n/LangContext'
import UploadZone from './UploadZone'

export default function HeroSection() {
  const { t } = useLang()
  const hero = t.hero

  return (
    <section id="upload" className="flex-1 flex flex-col items-center justify-center px-6 py-16">
      {/* Badge */}
      <div
        className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D4FF]/20 bg-[#00D4FF]/5 mb-8"
        style={{ animation: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) both' }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse-slow" />
        <span className="text-xs text-[#00D4FF] font-display tracking-widest">{hero.badge}</span>
      </div>

      {/* Headline */}
      <h1
        className="font-display text-center mb-4"
        style={{ animation: 'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s both' }}
      >
        <span
          className="block text-4xl md:text-6xl lg:text-7xl font-black tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #00D4FF 0%, #0066FF 50%, #7B2FFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight:"1.5"
          }}
        >
          {hero.title1}
        </span>
        <span className="block text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mt-1">
          {hero.title2}
        </span>
      </h1>

      {/* Subtitle */}
      <p
        className="text-gray-400 text-lg md:text-xl text-center max-w-xl mb-10"
        style={{ animation: 'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both' }}
      >
        {hero.subtitle}
      </p>

      {/* Upload card */}
      <div
        className="w-full max-w-xl"
        style={{ animation: 'slideUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s both' }}
      >
        <UploadZone />
      </div>
    </section>
  )
}