import WaveBackground from '@/components/WaveBackground'
import Particles from '@/components/Particles'
import Navbar from '@/components/Navbar'
import UploadZone from '@/components/UploadZone'
import StatsBar from '@/components/StatsBar'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080C14] relative overflow-hidden">
      {/* Background layers */}
      <div className="grid-overlay absolute inset-0 pointer-events-none" />
      <WaveBackground />
      <Particles />

      {/* Radial glow behind hero */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,102,255,0.08) 0%, rgba(0,212,255,0.04) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <Navbar />

      <main className="relative z-10 flex flex-col min-h-screen pt-16">
        {/* Hero */}
        <section className="flex-1 flex flex-col items-center justify-center px-6 py-16">
          {/* Badge */}
          <div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D4FF]/20 bg-[#00D4FF]/5 mb-8"
            style={{ animation: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) both' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse-slow" />
            <span className="text-xs text-[#00D4FF] font-display tracking-widest">AI-POWERED VOCAL SEPARATION</span>
          </div>

          {/* Headline */}
          <h1
            className="font-display text-center mb-4"
            style={{ animation: 'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s both' }}
          >
            <span
              className="block text-4xl md:text-6xl lg:text-7xl font-black tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #00D4FF 0%, #0066FF 50%, #7B2FFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              TEJREED:
            </span>
            <span className="block text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mt-1">
              AI VOCAL EXTRACTOR
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-gray-400 text-lg md:text-xl text-center max-w-xl mb-10"
            style={{ animation: 'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both' }}
          >
            Separate crystal-clear vocals from any video instantly.
          </p>

          {/* Upload card */}
          <div
            className="w-full max-w-xl"
            style={{ animation: 'slideUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s both' }}
          >
            <UploadZone />
          </div>

          {/* Stats */}
          <div
            className="w-full max-w-2xl"
            style={{ animation: 'slideUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s both' }}
          >
            <StatsBar />
          </div>
        </section>

        <Footer />
      </main>
    </div>
  )
}
