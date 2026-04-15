'use client'

import { useState } from 'react'

const FAQS = [
  {
    q: 'What file formats are supported?',
    a: 'You can upload MP4, MOV, AVI, MKV for video, and MP3, WAV, FLAC, AAC for audio. Files up to 500MB are accepted. You can also paste a YouTube URL to process a video directly.',
  },
  {
    q: 'How accurate is the vocal extraction?',
    a: 'Tejreed uses state-of-the-art deep learning models trained on thousands of hours of music and speech. For most studio-quality recordings, the separation is virtually seamless. Results may vary for heavily compressed or low-quality source files.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No account, no sign-up, no credit card. Just upload your file and download the result. It\'s completely free to use.',
  },
  {
    q: 'How long does processing take?',
    a: 'Most files are processed within 30–90 seconds depending on file length and server load. You\'ll see a real-time progress bar while the AI works.',
  },
  {
    q: 'Are my files stored on your servers?',
    a: 'Files are processed in a temporary session and automatically deleted shortly after. We do not store, share, or use your audio or video content for any purpose.',
  },
  {
    q: 'Can I use the extracted vocals commercially?',
    a: 'Tejreed is a technical tool — it\'s your responsibility to ensure you have the appropriate rights to the source material before using the output commercially.',
  },
  {
    q: 'Why did my YouTube video fail to process?',
    a: 'Some YouTube videos are protected and cannot be downloaded automatically. If this happens, a fallback message will guide you to download the video manually via SaveFrom.net, then upload it through the file upload tab.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="faq" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#7B2FFF]/4 blur-[140px]" />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-xs font-display tracking-[0.3em] text-[#00D4FF] mb-4 uppercase">Got Questions?</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            Frequently Asked
          </h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Everything you need to know about Tejreed.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#00D4FF]/30 bg-[#00D4FF]/5'
                    : 'border-[#1A2640] bg-[#0D1421]/60 hover:border-[#1A2640]/80'
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left group"
                  onClick={() => toggle(i)}
                >
                  <span className={`text-sm font-display font-semibold tracking-wide transition-colors duration-200 ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                    {item.q}
                  </span>
                  <span className={`ml-4 flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isOpen
                      ? 'border-[#00D4FF] bg-[#00D4FF]/10 rotate-45'
                      : 'border-[#1A2640] group-hover:border-[#00D4FF]/50'
                  }`}>
                    <svg className="w-3 h-3 text-[#00D4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="px-6 pb-5 text-sm text-gray-400 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}