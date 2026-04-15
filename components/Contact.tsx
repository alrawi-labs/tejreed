'use client'

import { useLang } from '@/i18n/LangContext'

const LINK_DATA = [
  {
    label: 'LinkedIn',
    handle: 'yasir-alrawi',
    href: 'https://www.linkedin.com/in/yasir-alrawi/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: '#0A66C2',
  },
  {
    label: 'GitHub',
    handle: 'yasir237',
    href: 'https://github.com/yasir237',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: '#00D4FF',
  },
]

export default function Contact() {
  const { t } = useLang()
  const contact = t.contact

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-[#0066FF]/4 blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <p className="text-xs font-display tracking-[0.3em] text-[#00D4FF] mb-4 uppercase">{contact.tag}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            {contact.title}
          </h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
            {contact.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-xl mx-auto">
          {LINK_DATA.map(({ label, handle, href, icon, color }, idx) => {
            const desc = contact.links[idx]?.description ?? ''
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-4 p-6 rounded-2xl border border-[#1A2640] bg-[#0D1421]/60
                  hover:border-[#00D4FF]/30 transition-all duration-300 overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at 20% 50%, ${color}10 0%, transparent 70%)` }}
                />
                <div
                  className="relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300"
                  style={{ backgroundColor: `${color}18` }}
                >
                  <span style={{ color }} className="group-hover:scale-110 transition-transform duration-300 block">
                    {icon}
                  </span>
                </div>
                <div className="relative min-w-0">
                  <p className="text-white font-display font-semibold text-sm tracking-wide">{label}</p>
                  <p className="text-gray-500 text-xs mt-0.5 truncate">@{handle}</p>
                  <p className="text-gray-600 text-xs mt-1">{desc}</p>
                </div>
                <div className="relative ml-auto flex-shrink-0 text-gray-600 group-hover:text-[#00D4FF] group-hover:translate-x-0.5 transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            )
          })}
        </div>

        <div className="mt-20 pt-10 border-t border-[#1A2640] text-center">
          <p className="text-xs text-gray-600 tracking-wide">
            © {new Date().getFullYear()} Tejreed — {contact.builtBy}{' '}
            <a
              href="https://www.linkedin.com/in/yasir-alrawi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#00D4FF] transition-colors"
            >
              Yasir Al-Rawi
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}