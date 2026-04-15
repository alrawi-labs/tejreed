'use client'

import { useState } from 'react'
import { useLang } from '@/i18n/LangContext'
import LanguageSwitcher from './LanguageSwitcher'




export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useLang()
  const { lang } = useLang(); 
  const isRTL = lang === 'ar' || lang === 'fa';
  const NAV_LINKS = [
    { label: t.nav.upload,      href: '#upload' },
    { label: t.nav.howItWorks,  href: '#how-it-works' },
    { label: t.nav.faq,         href: '#faq' },
    { label: t.nav.contact,     href: '#contact' },
  ]

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileOpen(false)
  }

  const handleGetStarted = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    document.querySelector('#upload')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setMobileOpen(false)
  }

  return (
    <nav className="nav-blur fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
  href="#"
  onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
  className="flex items-center gap-3 group"
>
  <div className="relative w-9 h-9">
    <div className="absolute inset-0.5 rounded-lg bg-[#080C14] flex items-center justify-center">
      <img src="tejreed.png" alt="Tejreed logo" className="w-full h-full object-contain" />
    </div>
  </div>
  
  <span className={`
    logo-text text-xl font-bold transition-opacity group-hover:opacity-80
    ${isRTL ? 'font-ruqaa text-2xl' : 'font-display tracking-wider'}
  `}>
    {isRTL ? 'تجريد' : 'TEJREED'}
  </span>
</a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleScroll(e, href)}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200 tracking-wide"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right side: Language switcher + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={handleGetStarted}
            className="btn-glow px-5 py-2 rounded-lg text-sm font-display font-semibold tracking-wider text-white"
          >
            <span>{t.nav.getStarted}</span>
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#1A2640] bg-[#080C14]/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleScroll(e, href)}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
          <LanguageSwitcher />
          <button
            onClick={handleGetStarted}
            className="btn-glow mt-2 w-full py-2.5 rounded-lg text-sm font-display font-semibold tracking-wider text-white"
          >
            <span>{t.nav.getStarted}</span>
          </button>
        </div>
      )}
    </nav>
  )
}