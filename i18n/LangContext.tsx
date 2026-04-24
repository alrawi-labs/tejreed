'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Lang, translations } from './translations'

interface LangContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: typeof translations[keyof typeof translations]
}

const LangContext = createContext<LangContextType>({
  lang: 'tr',
  setLang: () => {},
  t: translations['tr'],
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('tr')

  useEffect(() => {
    const saved = localStorage.getItem('tejreed_lang') as Lang | null
    if (saved && translations[saved]) setLangState(saved)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('tejreed_lang', l)
    document.documentElement.dir = translations[l].dir
    document.documentElement.lang = l
  }

  useEffect(() => {
    document.documentElement.dir = translations[lang].dir
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)