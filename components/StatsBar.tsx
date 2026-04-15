'use client'

import { useLang } from '@/i18n/LangContext'

export default function StatsBar() {
  const { t } = useLang()

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
      {t.stats.map((stat, i) => (
        <div
          key={i}
          className="text-center p-4 rounded-xl border border-[#1A2640] bg-[#0D1421]/60 backdrop-blur-sm"
          style={{ animationDelay: `${i * 0.1 + 0.5}s` }}
        >
          <div className="stat-number font-display text-2xl font-bold">{stat.value}</div>
          <div className="text-gray-600 text-xs mt-1 tracking-widest">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}