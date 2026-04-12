'use client'

import { useState } from 'react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="nav-blur fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0.5 rounded-lg bg-[#080C14] flex items-center justify-center">
                <img src="tejreed.png" alt="" className='w-100 h-100'  />

            </div>
          </div>
          <span className="logo-text text-xl font-display font-bold tracking-wider">TEJREED</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['How it Works', 'Pricing', 'FAQ', 'Contact Us'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200 tracking-wide"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button className="btn-glow px-5 py-2 rounded-lg text-sm font-display font-semibold tracking-wider text-white">
            <span>GET STARTED</span>
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#7B2FFF] flex items-center justify-center text-xs font-bold cursor-pointer">
            U
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#1A2640] bg-[#080C14]/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-4">
          {['How it Works', 'Pricing', 'FAQ', 'Contact Us'].map((item) => (
            <a key={item} href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{item}</a>
          ))}
          <button className="btn-glow mt-2 w-full py-2.5 rounded-lg text-sm font-display font-semibold tracking-wider text-white">
            <span>GET STARTED</span>
          </button>
        </div>
      )}
    </nav>
  )
}
