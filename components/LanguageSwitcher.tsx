'use client'

import { useState } from 'react'
import { useLang } from '@/i18n/LangContext'
import { Lang } from '@/i18n/translations'

const LANGS: { code: Lang; label: string; flag: string; fullName: string }[] = [
  { code: 'ar', label: 'AR', flag: '🇸🇦', fullName: 'العربية' },
  { code: 'tr', label: 'TR', flag: '🇹🇷', fullName: 'Türkçe' },
  { code: 'en', label: 'EN', flag: '🇺🇸', fullName: 'English' },
  { code: 'fa', label: 'FA', flag: '🇮🇷', fullName: 'فارسی' },
  { code: 'fr', label: 'FR', flag: '🇫🇷', fullName: 'Français' },
  { code: 'de', label: 'DE', flag: '🇩🇪', fullName: 'Deutsch' },
  { code: 'es', label: 'ES', flag: '🇪🇸', fullName: 'Español' },
  { code: 'it', label: 'IT', flag: '🇮🇹', fullName: 'Italiano' },
]

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang()
  const [isOpen, setIsOpen] = useState(false)

  const currentLang = LANGS.find(l => l.code === lang) || LANGS[0]

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#1A2640] bg-[#080C14]/80 backdrop-blur-sm hover:bg-[#0D1421] transition-all duration-200 group"
      >
        <span className="text-sm font-display tracking-wider text-gray-300 group-hover:text-white transition-colors">
          {currentLang.label}
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute top-full mt-2 right-0 z-20 w-48 bg-[#080C14]/95 backdrop-blur-xl border border-[#1A2640] rounded-lg shadow-xl overflow-hidden">
            {LANGS.map(({ code, label, flag, fullName }) => (
              <button
                key={code}
                onClick={() => {
                  setLang(code)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-3 text-left hover:bg-[#0D1421] transition-colors duration-150 flex items-center gap-3 group ${
                  lang === code ? 'bg-gradient-to-r from-[#0066FF]/20 to-[#00D4FF]/10 border-r-2 border-[#00D4FF]' : ''
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-display tracking-wider text-white group-hover:text-[#00D4FF] transition-colors">
                    {label}
                  </span>
                  <span className="text-xs text-gray-400">
                    {fullName}
                  </span>
                </div>
                {lang === code && (
                  <svg className="w-4 h-4 text-[#00D4FF] ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}