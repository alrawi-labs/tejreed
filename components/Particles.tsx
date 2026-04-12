'use client'

import { useEffect, useRef } from 'react'

export default function Particles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const particles: HTMLDivElement[] = []

    const createParticle = () => {
      const p = document.createElement('div')
      const size = Math.random() * 3 + 1
      const x = Math.random() * 100
      const duration = Math.random() * 15 + 10
      const delay = Math.random() * 10

      const colors = ['#00D4FF', '#0066FF', '#7B2FFF', '#00D4FF']
      const color = colors[Math.floor(Math.random() * colors.length)]

      p.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        bottom: -10px;
        border-radius: 50%;
        background: ${color};
        opacity: 0;
        box-shadow: 0 0 ${size * 2}px ${color};
        animation: particleFloat ${duration}s linear ${delay}s infinite;
        pointer-events: none;
      `
      container.appendChild(p)
      particles.push(p)
    }

    for (let i = 0; i < 25; i++) {
      createParticle()
    }

    return () => {
      particles.forEach(p => p.remove())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    />
  )
}
