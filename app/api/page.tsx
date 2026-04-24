'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLang } from '@/i18n/LangContext'

const METHOD_COLORS: Record<string, string> = { POST: '#9060FF', GET: '#40D0FF' }

const orbs = [
  { cls: 'orb-purple', size: 90, top: '5%',  left: '4%',  delay: '0s',   duration: '6s'  },
  { cls: 'orb-cyan',   size: 55, top: '12%', left: '91%', delay: '1.5s', duration: '7s'  },
  { cls: 'orb-pink',   size: 60, top: '58%', left: '2%',  delay: '0.8s', duration: '5.5s'},
  { cls: 'orb-mint',   size: 38, top: '75%', left: '90%', delay: '2.2s', duration: '8s'  },
  { cls: 'orb-peach',  size: 28, top: '40%', left: '97%', delay: '3.0s', duration: '7.5s'},
  { cls: 'orb-cyan',   size: 20, top: '85%', left: '18%', delay: '0.4s', duration: '5s'  },
]

const sparkles = [
  { top: '10%', left: '22%', delay: '0s',   size: 10 },
  { top: '28%', left: '80%', delay: '1.4s', size: 8  },
  { top: '62%', left: '12%', delay: '0.7s', size: 12 },
  { top: '78%', left: '60%', delay: '2.1s', size: 9  },
  { top: '42%', left: '85%', delay: '1.9s', size: 7  },
]

export default function ApiPage() {
  const { t } = useLang()
  const a = t.apiPage

  return (
    <div className="min-h-screen relative overflow-hidden">
      {orbs.map((o, i) => (
        <div key={i} className={`orb ${o.cls}`}
          style={{ width: o.size, height: o.size, top: o.top, left: o.left,
                   animationDelay: o.delay, animationDuration: o.duration }} />
      ))}
      {sparkles.map((s, i) => (
        <div key={i} className="sparkle"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size,
                   animationDelay: `${i * 0.5}s`, animationDuration: '3s' }} />
      ))}

      <Navbar />

      <main className="relative z-10 pt-28 pb-24 px-4">

        {/* ── Hero ── */}
        <section className="text-center mb-20 fade-in-up">
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="section-badge"><span className="dot" />{a.badge}</span>
          </div>
          <h1 className="font-display font-black text-5xl md:text-7xl leading-tight mb-6" style={{ letterSpacing: '-0.01em' }}>
            TEJREED <span className="title-gradient">API</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body"
            style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
            {a.subtitle.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </p>

          {/* Waitlist CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="glass-strong px-8 py-4 flex items-center gap-4" style={{ borderRadius: 50, maxWidth: 420, width: '100%' }}>
              <div className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #A060FF, #60D0FF)', animation: 'dotPulse 2s ease-in-out infinite' }} />
              <span className="font-body text-sm flex-1 text-left" style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                {a.waitlistPlaceholder}
              </span>
            </div>
            <button className="btn-primary font-display font-bold text-sm tracking-wider px-8 py-4" style={{ borderRadius: 50 }}>
              {a.earlyAccessBtn}
            </button>
          </div>
          <p className="mt-4 text-xs font-body" style={{ color: 'var(--text-light)' }}>{a.betaNote}</p>
        </section>

        {/* ── Feature Highlights ── */}
        <section className="max-w-4xl mx-auto mb-20 fade-in-up" style={{ opacity: 0, animationDelay: '0.15s' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {a.features.map((f, i) => (
              <div key={i} className="glass-card p-5 flex flex-col items-center text-center gap-3 fade-in-up"
                style={{ opacity: 0, animationDelay: `${0.2 + i * 0.07}s` }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl float-gentle"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.80), rgba(220,210,255,0.70))',
                           border: '1.5px solid rgba(255,255,255,0.90)', boxShadow: '0 4px 12px rgba(160,120,255,0.20)',
                           animationDelay: `${i * 0.25}s` }}>
                  {f.emoji}
                </div>
                <div>
                  <div className="font-display font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{f.label}</div>
                  <div className="text-xs font-body leading-relaxed" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Endpoints ── */}
        <section className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-10 fade-in-up" style={{ opacity: 0, animationDelay: '0.3s' }}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="section-badge"><span className="dot" />{a.endpointsTag}</span>
            </div>
            <h2 className="font-display font-black text-3xl md:text-4xl" style={{ color: 'var(--text-primary)' }}>
              {a.endpointsTitle}
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {a.endpoints.map((ep, i) => (
              <div key={i} className="glass-card p-6 fade-in-up" style={{ opacity: 0, animationDelay: `${0.35 + i * 0.07}s` }}>
                <div className="flex items-start gap-4">
                  <div className="px-3 py-1 rounded-xl font-display font-black text-xs tracking-widest flex-shrink-0 mt-0.5"
                    style={{ background: `${METHOD_COLORS[ep.method]}22`, color: METHOD_COLORS[ep.method],
                             border: `1.5px solid ${METHOD_COLORS[ep.method]}44` }}>
                    {ep.method}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <code className="font-display font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{ep.path}</code>
                      <span className="font-body font-bold text-xs" style={{ color: 'var(--text-light)' }}>— {ep.label}</span>
                      {ep.soon && <span className="badge-soon">{a.soon}</span>}
                    </div>
                    <p className="text-sm font-body" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{ep.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Code Example ── */}
        <section className="max-w-3xl mx-auto mb-20 fade-in-up" style={{ opacity: 0, animationDelay: '0.55s' }}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="section-badge"><span className="dot" />{a.codeTag}</span>
            </div>
            <h2 className="font-display font-black text-3xl md:text-4xl" style={{ color: 'var(--text-primary)' }}>
              {a.codeTitle}
            </h2>
          </div>

          <div className="glass-strong overflow-hidden" style={{ borderRadius: 24 }}>
            <div className="flex items-center gap-1 px-4 pt-4 pb-0 border-b" style={{ borderColor: 'rgba(255,255,255,0.50)' }}>
              {['Python', 'Node.js', 'cURL'].map((lang, i) => (
                <div key={lang} className="px-4 py-2 rounded-t-xl font-display font-bold text-xs tracking-wider"
                  style={i === 0
                    ? { background: 'rgba(255,255,255,0.70)', color: 'var(--text-primary)', borderBottom: '2px solid #9060FF' }
                    : { color: 'var(--text-light)', cursor: 'pointer' }}>
                  {lang}
                </div>
              ))}
            </div>
            <div className="p-6 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}>
              <pre className="font-mono text-sm leading-relaxed" style={{ color: 'var(--text-primary)', minWidth: 0 }}>
{`import requests

API_KEY  = "tj_xxxxxxxxxxxxxxxx"
API_BASE = "https://api.tejreed.com"

with open("video.mp4", "rb") as f:
    response = requests.post(
        f"{API_BASE}/v1/audio/separate",
        headers={"Authorization": f"Bearer {API_KEY}"},
        files={"file": f},
        data={"output_format": "mp3"}
    )

result = response.json()
print(result["vocals_url"])
print(result["background_url"])`}
              </pre>
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="max-w-3xl mx-auto fade-in-up" style={{ opacity: 0, animationDelay: '0.85s' }}>
          <div className="glass-strong text-center px-8 py-12"
            style={{ borderRadius: 32, background: 'linear-gradient(145deg, rgba(255,255,255,0.55) 0%, rgba(200,180,255,0.40) 50%, rgba(160,220,255,0.35) 100%)' }}>
            <div className="text-4xl mb-4 float-gentle" style={{ animationDuration: '5s' }}>🚀</div>
            <h3 className="font-display font-black text-2xl md:text-3xl mb-3" style={{ color: 'var(--text-primary)' }}>
              {a.ctaTitle}
            </h3>
            <p className="font-body mb-8 max-w-md mx-auto" style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
              {a.ctaSubtitle}
            </p>
            <button className="btn-primary font-display font-bold tracking-wider px-10 py-4" style={{ borderRadius: 50, fontSize: 14 }}>
              {a.ctaBtn}
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}