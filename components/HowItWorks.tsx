'use client'

const STEPS = [
  {
    number: '01',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    title: 'Upload Your File',
    description:
      'Drop any video or audio file — MP4, MOV, AVI, MP3, WAV and more. Up to 500MB supported. Or paste a YouTube link to process directly from the web.',
  },
  {
    number: '02',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'AI Processes Your Audio',
    description:
      'Our deep learning model analyses every frequency layer in your track. It separates vocals from instrumentals with surgical precision — no artifacts, no quality loss.',
  },
  {
    number: '03',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    title: 'Download Your Results',
    description:
      'Get the clean vocal track as an MP3, the vocal-synced video as an MP4, or grab everything at once in a single ZIP — ready in seconds.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0066FF]/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Heading */}
        <div className="text-center mb-20">
          <p className="text-xs font-display tracking-[0.3em] text-[#00D4FF] mb-4 uppercase">Simple Process</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Three steps. No account needed. No watermarks. Just clean vocals.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[calc(16.666%+2rem)] right-[calc(16.666%+2rem)] h-px bg-gradient-to-r from-transparent via-[#1A2640] to-transparent" />

          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className="group relative flex flex-col items-center text-center"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {/* Number badge */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-2xl border border-[#1A2640] bg-[#0D1421] flex items-center justify-center
                    group-hover:border-[#00D4FF]/40 transition-all duration-500 group-hover:bg-[#0D1421]/80 relative overflow-hidden">
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/0 to-[#00D4FF]/0 group-hover:from-[#0066FF]/10 group-hover:to-[#00D4FF]/5 transition-all duration-500" />
                    <div className="relative flex flex-col items-center gap-2">
                      <span className="text-[#00D4FF] group-hover:text-white transition-colors duration-300">
                        {step.icon}
                      </span>
                      <span className="font-display text-xs font-bold tracking-[0.2em] text-[#1A2640] group-hover:text-[#00D4FF]/40 transition-colors duration-300">
                        {step.number}
                      </span>
                    </div>
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold text-white mb-3 tracking-wide">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a
            href="#upload"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#upload')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }}
            className="inline-flex items-center gap-2 text-sm text-[#00D4FF] hover:text-white transition-colors font-display tracking-wider group"
          >
            Try it now
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}