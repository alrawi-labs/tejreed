import WaveBackground from '@/components/WaveBackground'
import Particles from '@/components/Particles'
import Navbar from '@/components/Navbar'
import UploadZone from '@/components/UploadZone'
import Footer from '@/components/Footer'
import HowItWorks from '@/components/HowItWorks'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import HeroSection from '@/components/HeroSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080C14] relative overflow-hidden">
      <div className="grid-overlay absolute inset-0 pointer-events-none" />
      <WaveBackground />
      <Particles />

      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,102,255,0.08) 0%, rgba(0,212,255,0.04) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <Navbar />

      <main className="relative z-10 flex flex-col min-h-screen pt-16">
        <HeroSection />
        <HowItWorks />
        <FAQ />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}