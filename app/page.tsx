'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useLang } from '@/i18n/LangContext'

const TOOL_HREFS = [
  '/music-remover',
  '/transcript',
  '/bg-remover',
  '/upscale',
  '/noise-cancel',
]

const TOOL_EMOJIS   = ['🎵', '📝', '🖼️', '✨', '🔇']
const TOOL_ICON_BGS = ['tool-icon-bg-purple', 'tool-icon-bg-cyan', 'tool-icon-bg-pink', 'tool-icon-bg-mint', 'tool-icon-bg-peach']

/* ─── Decorative orb data ─── */
const orbs = [
  { cls: 'orb-purple', size: 80,  top: '8%',  left: '5%',   delay: '0s',    duration: '6s'   },
  { cls: 'orb-cyan',   size: 50,  top: '15%', left: '92%',  delay: '1.5s',  duration: '7s'   },
  { cls: 'orb-pink',   size: 65,  top: '55%', left: '3%',   delay: '0.8s',  duration: '5.5s' },
  { cls: 'orb-mint',   size: 40,  top: '72%', left: '88%',  delay: '2.2s',  duration: '8s'   },
  { cls: 'orb-purple', size: 28,  top: '88%', left: '20%',  delay: '1.0s',  duration: '6.5s' },
  { cls: 'orb-peach',  size: 36,  top: '35%', left: '96%',  delay: '3.0s',  duration: '7.5s' },
  { cls: 'orb-cyan',   size: 22,  top: '45%', left: '1%',   delay: '0.4s',  duration: '5s'   },
  { cls: 'orb-pink',   size: 18,  top: '20%', left: '50%',  delay: '2.5s',  duration: '9s'   },
]

const sparkles = [
  { top: '12%', left: '20%', delay: '0s',   size: 10 },
  { top: '25%', left: '78%', delay: '1.2s', size: 8  },
  { top: '60%', left: '15%', delay: '0.6s', size: 12 },
  { top: '75%', left: '65%', delay: '2.0s', size: 9  },
  { top: '40%', left: '88%', delay: '1.8s', size: 7  },
  { top: '85%', left: '40%', delay: '0.3s', size: 11 },
]

export default function Home() {
  const { t } = useLang()
  const home = t.home

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* ── Decorative Orbs ── */}
      {orbs.map((o, i) => (
        <div key={i} className={`orb ${o.cls}`}
          style={{ width: o.size, height: o.size, top: o.top, left: o.left,
                   animationDelay: o.delay, animationDuration: o.duration }} />
      ))}

      {/* ── Sparkles ── */}
      {sparkles.map((s, i) => (
        <div key={i} className="sparkle"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size,
                   animationDelay: `${i * 0.5}s`, animationDuration: '3s' }} />
      ))}

      <Navbar />

      <main className="relative z-10 pt-24 pb-20 px-4">

        {/* ── Hero ── */}
        <section className="text-center mb-20 fade-in-up">
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="section-badge">
              <span className="dot" />
              {home.badge}
            </span>
          </div>

          <h1 className="font-display font-black text-5xl md:text-7xl leading-tight mb-6"
            style={{ letterSpacing: '-0.01em' }}>
            {home.title}
          </h1>

          <p className="text-lg md:text-xl max-w-xl mx-auto mb-4 font-body"
            style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
            {home.subtitle}
          </p>
        </section>

        {/* ── Tools Grid ── */}
        <section className="max-w-5xl mx-auto fade-in-up delay-200" style={{ opacity: 0 }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {home.tools.map((tool, i) => (
              <ToolCard
                key={i}
                index={i}
                label={tool.label}
                description={tool.description}
                available={tool.available}
                href={TOOL_HREFS[i]}
                emoji={TOOL_EMOJIS[i]}
                iconBg={TOOL_ICON_BGS[i]}
                useLabel={home.useTool}
                soonLabel={home.comingSoon}
              />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}

/* ─── ToolCard component ─── */
function ToolCard({
  index, label, description, available, href, emoji, iconBg, useLabel, soonLabel,
}: {
  index: number
  label: string
  description: string
  available: boolean
  href: string
  emoji: string
  iconBg: string
  useLabel: string
  soonLabel: string
}) {
  const card = (
    <div className="tool-card p-7 flex flex-col gap-4 h-full fade-in-up"
      style={{ opacity: 0, animationDelay: `${0.1 + index * 0.08}s` }}>

      {/* Icon */}
      <div className={`tool-icon-bg ${iconBg} float-gentle`}
        style={{ animationDelay: `${index * 0.3}s` }}>
        <span style={{ fontSize: 28 }}>{emoji}</span>
      </div>

      {/* Label + Tag */}
      <div className="flex items-center gap-2">
        <h2 className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
          {label}
        </h2>
        {!available && <span className="badge-soon">SOON</span>}
        {available && (
          <span className="text-xs font-black px-2 py-0.5 rounded-full text-white"
            style={{ background: 'linear-gradient(135deg, #9060FF, #60C8FF)', fontSize: 10 }}>
            ✦ AI
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed flex-1 font-body"
        style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
        {description}
      </p>

      {/* CTA */}
      <div className={`inline-flex items-center gap-2 text-sm font-bold py-2.5 px-5 rounded-full w-fit transition-all duration-300
        ${available ? 'btn-primary text-white' : 'btn-pill-inactive cursor-not-allowed'}`}>
        {available ? <>{useLabel} <span>→</span></> : <>{soonLabel}</>}
      </div>
    </div>
  )

  if (available) {
    return <Link href={href} className="block h-full">{card}</Link>
  }
  return <div className="h-full opacity-80">{card}</div>
}