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

  const currentLang = LANGS.find(l => l.code === lang) || LANGS[2]

  return (
    <>
      <style>{`
        .lang-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 50px;
          background: rgba(255,255,255,0.40);
          border: 1.5px solid rgba(255,255,255,0.70);
          backdrop-filter: blur(12px);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .lang-btn:hover {
          background: rgba(255,255,255,0.62);
          box-shadow: 0 4px 16px rgba(160,96,255,0.15);
        }
        .lang-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          z-index: 50;
          width: 200px;
          border-radius: 20px;
          overflow: hidden;
          background: linear-gradient(
            145deg,
            rgba(255,255,255,0.82) 0%,
            rgba(240,228,255,0.78) 100%
          );
          border: 1.5px solid rgba(255,255,255,0.90);
          backdrop-filter: blur(32px);
          box-shadow:
            0 16px 48px rgba(140,100,240,0.18),
            0 4px 16px rgba(100,180,255,0.10),
            inset 0 1px 0 rgba(255,255,255,0.95);
        }
        .lang-item {
          width: 100%;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          background: transparent;
          border: none;
          text-align: left;
          transition: background 0.15s ease;
        }
        .lang-item:hover {
          background: rgba(160,96,255,0.08);
        }
        .lang-item.active {
          background: linear-gradient(
            90deg,
            rgba(144,96,255,0.12) 0%,
            rgba(96,200,255,0.08) 100%
          );
          border-right: 2.5px solid #9060FF;
        }
        .lang-item + .lang-item {
          border-top: 1px solid rgba(255,255,255,0.60);
        }
      `}</style>

      <div className="relative">
        {/* Trigger */}
        <button className="lang-btn" onClick={() => setIsOpen(!isOpen)}>
          <span style={{ fontSize: 16, lineHeight: 1 }}>{currentLang.flag}</span>
          <span
            className="font-display font-bold text-sm tracking-wider"
            style={{ color: 'var(--text-secondary)' }}
          >
            {currentLang.label}
          </span>
          <svg
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
            style={{
              color: 'var(--text-light)',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Backdrop */}
        {isOpen && (
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
        )}

        {/* Dropdown */}
        {isOpen && (
          <div className="lang-dropdown">
            {LANGS.map(({ code, flag, label, fullName }) => {
              const active = lang === code
              return (
                <button
                  key={code}
                  className={`lang-item ${active ? 'active' : ''}`}
                  onClick={() => { setLang(code); setIsOpen(false) }}
                >
                  <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}>{flag}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      className="font-display font-bold text-xs tracking-wider"
                      style={{ color: active ? '#9060FF' : 'var(--text-primary)' }}
                    >
                      {label}
                    </div>
                    <div
                      className="text-xs font-body truncate"
                      style={{ color: 'var(--text-light)', marginTop: 1 }}
                    >
                      {fullName}
                    </div>
                  </div>
                  {active && (
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="#9060FF"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                      style={{ flexShrink: 0 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}