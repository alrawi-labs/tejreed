'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useLang } from '@/i18n/LangContext'
import LanguageSwitcher from './LanguageSwitcher'
import Link from 'next/link'

const TOOL_HREFS = [
  '/music-remover',
  '/transcript',
  '/background-remover',
  '/image-enhancer',
  '/noise-reducer',
]

const ICONS: Record<string, JSX.Element> = {
  music: (
    <svg width="14" height="14" fill="none" stroke="#9060FF" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm12-3c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" />
    </svg>
  ),
  doc: (
    <svg width="14" height="14" fill="none" stroke="#9060FF" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z" />
    </svg>
  ),
  circle: (
    <svg width="14" height="14" fill="none" stroke="#9060FF" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h3m12 0h3M12 3v3m0 12v3" />
    </svg>
  ),
  image: (
    <svg width="14" height="14" fill="none" stroke="#9060FF" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  wave: (
    <svg width="14" height="14" fill="none" stroke="#9060FF" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414" />
    </svg>
  ),
}

const TOOL_ICONS = ['music', 'doc', 'circle', 'image', 'wave']

export default function Navbar() {
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [toolsOpen, setToolsOpen]     = useState(false)
  const [scrolled, setScrolled]       = useState(false)
  const closeTimerRef                 = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { lang, t } = useLang()
  const pathname  = usePathname()
  const isRTL     = lang === 'ar' || lang === 'fa'

  const handleMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setToolsOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setToolsOpen(false)
    }, 150)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setToolsOpen(false)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  const navLinks = [
    { label: t.nav.api,      href: '/api'     },
    { label: t.nav.pricing,  href: '/pricing' },
    { label: t.nav.account,  href: '/account' },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled ? {
        background:    'rgba(232, 218, 255, 0.72)',
        backdropFilter:'blur(28px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(28px) saturate(1.8)',
        borderBottom:  '1px solid rgba(255,255,255,0.70)',
        boxShadow:     '0 4px 24px rgba(160,100,255,0.14)',
      } : {
        background:    'transparent',
        backdropFilter:'none',
        borderBottom:  '1px solid transparent',
        boxShadow:     'none',
      }}
    >
      <style suppressHydrationWarning>{`
        .tools-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 14px; border-radius: 50px;
          background: rgba(255,255,255,0.40);
          border: 1.5px solid rgba(255,255,255,0.70);
          backdrop-filter: blur(12px);
          cursor: pointer; transition: all 0.2s ease;
        }
        .tools-btn:hover {
          background: rgba(255,255,255,0.62);
          box-shadow: 0 4px 16px rgba(160,96,255,0.15);
        }
        .tools-dropdown {
          position: absolute; top: calc(100% + 8px); left: 0; z-index: 50;
          width: 220px; border-radius: 20px; overflow: hidden;
          background: linear-gradient(145deg, rgba(255,255,255,0.82) 0%, rgba(240,228,255,0.78) 100%);
          border: 1.5px solid rgba(255,255,255,0.90); backdrop-filter: blur(32px);
          box-shadow: 0 16px 48px rgba(140,100,240,0.18), 0 4px 16px rgba(100,180,255,0.10), inset 0 1px 0 rgba(255,255,255,0.95);
        }
        .tool-item {
          width: 100%; padding: 10px 14px; display: flex; align-items: center; gap: 10px;
          cursor: pointer; background: transparent; border: none;
          border-top: 1px solid rgba(255,255,255,0.60);
          text-align: left; text-decoration: none; transition: background 0.15s ease; color: inherit;
        }
        .tool-item:first-child { border-top: none; }
        .tool-item:hover { background: rgba(160,96,255,0.08); }
        .tool-item.active {
          background: linear-gradient(90deg, rgba(144,96,255,0.12) 0%, rgba(96,200,255,0.08) 100%);
          border-right: 2.5px solid #9060FF;
        }
        .tool-icon {
          width: 28px; height: 28px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(144,96,255,0.10); flex-shrink: 0;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.80), rgba(220,210,255,0.70))',
                border: '1.5px solid rgba(255,255,255,0.90)',
                boxShadow: '0 4px 12px rgba(160,120,255,0.20)',
              }}>
              <img src="tejreed.png" alt="Tejreed logo" className="w-6 h-6 object-contain" />
            </div>
          </div>
          <span className={`logo-text text-xl font-bold transition-opacity group-hover:opacity-70 ${isRTL ? 'font-ruqaa text-2xl' : 'font-display tracking-wider'}`}>
            {isRTL ? 'تجريد' : 'TEJREED'}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">

          {/* Tools Dropdown */}
          <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className="tools-btn">
              <svg width="14" height="14" fill="none" stroke="#9060FF" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h7" />
              </svg>
              <span className="font-display font-bold text-sm tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                {t.nav.tools}
              </span>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
                style={{ color: 'var(--text-light)', transform: toolsOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {toolsOpen && (
              <div className="tools-dropdown">
                <div style={{ position: 'absolute', top: -8, left: 0, right: 0, height: 8 }} />
                {t.nav.toolItems.map((item, i) => {
                  const href = TOOL_HREFS[i]
                  const active = pathname === href
                  return (
                    <Link key={href} href={href} className={`tool-item ${active ? 'active' : ''}`}>
                      <div className="tool-icon">{ICONS[TOOL_ICONS[i]]}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="font-display font-bold text-xs tracking-wider"
                          style={{ color: active ? '#9060FF' : 'var(--text-primary)' }}>
                          {item.label}
                        </div>
                        <div className="text-xs font-body truncate" style={{ color: 'var(--text-light)', marginTop: 1 }}>
                          {item.sub}
                        </div>
                      </div>
                      {active && (
                        <svg width="14" height="14" fill="none" stroke="#9060FF" strokeWidth={2.5} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {navLinks.map(({ label, href }) => (
            <Link key={href} href={href}
              className="text-sm font-semibold transition-colors duration-200"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
              {label}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden transition-colors" style={{ color: 'var(--text-secondary)' }}
          onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 py-5 flex flex-col gap-4"
          style={{ background: 'rgba(255,255,255,0.65)', borderTop: '1px solid rgba(255,255,255,0.80)', backdropFilter: 'blur(24px)' }}>
          <div>
            <button className="tools-btn mb-2" onClick={() => setToolsOpen(!toolsOpen)}>
              {t.nav.tools}
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
                style={{ transform: toolsOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {toolsOpen && (
              <div className="flex flex-col gap-1 pl-2 border-l-2" style={{ borderColor: 'rgba(160,120,255,0.3)' }}>
                {t.nav.toolItems.map((item, i) => {
                  const href = TOOL_HREFS[i]
                  return (
                    <Link key={href} href={href} className="tool-item" style={{ borderRadius: 12 }}>
                      <div className="tool-icon">{ICONS[TOOL_ICONS[i]]}</div>
                      <div>
                        <div className="font-display font-bold text-xs tracking-wider" style={{ color: 'var(--text-primary)' }}>{item.label}</div>
                        <div className="text-xs" style={{ color: 'var(--text-light)' }}>{item.sub}</div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {navLinks.map(({ label, href }) => (
            <Link key={href} href={href} className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
              {label}
            </Link>
          ))}

          <LanguageSwitcher />
        </div>
      )}
    </nav>
  )
}