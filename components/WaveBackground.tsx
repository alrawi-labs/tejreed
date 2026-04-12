'use client'

import { useEffect, useRef } from 'react'

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const drawWave = (
      yOffset: number,
      amplitude: number,
      frequency: number,
      speed: number,
      color1: string,
      color2: string,
      opacity: number
    ) => {
      const w = canvas.width
      const h = canvas.height

      ctx.beginPath()
      ctx.moveTo(0, h)

      for (let x = 0; x <= w; x += 2) {
        const y =
          yOffset +
          Math.sin((x / w) * frequency * Math.PI + time * speed) * amplitude +
          Math.sin((x / w) * frequency * 0.7 * Math.PI + time * speed * 1.3) * (amplitude * 0.4)
        ctx.lineTo(x, y)
      }

      ctx.lineTo(w, h)
      ctx.lineTo(0, h)
      ctx.closePath()

      const grad = ctx.createLinearGradient(0, yOffset - amplitude, 0, h)
      grad.addColorStop(0, color1.replace(')', `, ${opacity})`).replace('rgb', 'rgba'))
      grad.addColorStop(1, color2.replace(')', `, 0)`).replace('rgb', 'rgba'))
      ctx.fillStyle = grad
      ctx.fill()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const h = canvas.height

      // Wave 3 (back, purple)
      drawWave(h * 0.65, 60, 2.5, 0.3, 'rgb(123, 47, 255)', 'rgb(8, 12, 20)', 0.12)
      // Wave 2 (mid, blue)
      drawWave(h * 0.72, 50, 3, 0.4, 'rgb(0, 102, 255)', 'rgb(8, 12, 20)', 0.15)
      // Wave 1 (front, cyan)
      drawWave(h * 0.78, 40, 2, 0.5, 'rgb(0, 212, 255)', 'rgb(8, 12, 20)', 0.18)

      time += 0.008
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  )
}
