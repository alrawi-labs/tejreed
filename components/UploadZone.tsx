'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

const API_BASE = 'https://tejreed-backend.onrender.com'

interface ProgressStep {
  icon: string
  text: string
  progress: number
}

interface Result {
  type: 'audio' | 'video'
  vocals?: string
  vocal_video?: string
  zip?: string
}

type TabType = 'upload' | 'youtube'

export default function UploadZone() {
  const [tab, setTab] = useState<TabType>('upload')
  const [isDragging, setIsDragging] = useState(false)
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState<ProgressStep | null>(null)
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [ytInfo, setYtInfo] = useState<any>(null)
  const [ytLoading, setYtLoading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const eventSourceRef = useRef<EventSource | null>(null)

  const connectSSE = useCallback(() => {
    if (eventSourceRef.current) eventSourceRef.current.close()
    const es = new EventSource(`${API_BASE}/api/progress`)
    es.onmessage = (e) => {
      try {
        const step: ProgressStep = JSON.parse(e.data)
        setCurrentStep(step)
        setProgress(step.progress)
      } catch {}
    }
    eventSourceRef.current = es
  }, [])

  useEffect(() => {
    return () => { eventSourceRef.current?.close() }
  }, [])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) handleFile(files[0])
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) handleFile(files[0])
  }

  const handleFile = async (file: File) => {
    setError(null)
    setResult(null)
    setIsProcessing(true)
    setProgress(0)
    setCurrentStep(null)

    connectSSE()

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(`${API_BASE}/api/split-audio`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'İşlem başarısız.')
      }

      const contentType = response.headers.get('content-type') || ''

      if (contentType.includes('application/json')) {
        const data = await response.json()
        setResult({ type: 'video', ...data })
      } else {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        setResult({ type: 'audio', vocals: url })
      }
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu.')
    } finally {
      setIsProcessing(false)
      eventSourceRef.current?.close()
    }
  }

  const fetchYoutubeInfo = async (url: string) => {
    if (!url.trim()) return
    setYtInfo(null)
    setYtLoading(true)
    try {
      const fd = new FormData()
      fd.append('url', url)
      const res = await fetch(`${API_BASE}/api/get-youtube-info`, { method: 'POST', body: fd })
      if (res.ok) {
        const data = await res.json()
        setYtInfo(data)
      }
    } catch {}
    setYtLoading(false)
  }

  const handleYoutubeProcess = async () => {
    if (!youtubeUrl.trim()) return
    setError(null)
    setResult(null)
    setIsProcessing(true)
    setProgress(0)
    setCurrentStep(null)

    connectSSE()

    const fd = new FormData()
    fd.append('url', youtubeUrl)

    try {
      const response = await fetch(`${API_BASE}/api/process-youtube`, { method: 'POST', body: fd })
      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'İşlem başarısız.')
      }

      const contentType = response.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        const data = await response.json()
        setResult({ type: 'video', ...data })
      } else {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        setResult({ type: 'audio', vocals: url })
      }
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu.')
    } finally {
      setIsProcessing(false)
      eventSourceRef.current?.close()
    }
  }

  const reset = () => {
    setResult(null)
    setError(null)
    setProgress(0)
    setCurrentStep(null)
    setYoutubeUrl('')
    setYtInfo(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // --- RESULT VIEW ---
  if (result) {
    return (
      <div className="result-card rounded-2xl p-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#00D4FF]/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#00D4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-white">Processing Complete</h3>
            <p className="text-xs text-gray-500 mt-0.5">Your vocals have been extracted</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {result.vocals && (
            <a
              href={result.vocals}
              download="vocals.mp3"
              className="flex items-center justify-between p-4 rounded-xl border border-[#1A2640] hover:border-[#00D4FF]/40 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0066FF]/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#00D4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <span className="text-sm text-gray-300">vocals.mp3</span>
              </div>
              <span className="text-xs text-[#00D4FF] opacity-0 group-hover:opacity-100 transition-opacity">Download ↓</span>
            </a>
          )}

          {result.vocal_video && (
            <a
              href={result.vocal_video}
              download="vocal_video.mp4"
              className="flex items-center justify-between p-4 rounded-xl border border-[#1A2640] hover:border-[#00D4FF]/40 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#7B2FFF]/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#7B2FFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-300">vocal_video.mp4</span>
              </div>
              <span className="text-xs text-[#00D4FF] opacity-0 group-hover:opacity-100 transition-opacity">Download ↓</span>
            </a>
          )}

          {result.zip && (
            <a
              href={result.zip}
              download="results.zip"
              className="flex items-center justify-between p-4 rounded-xl border border-[#00D4FF]/30 bg-[#00D4FF]/5 hover:bg-[#00D4FF]/10 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#00D4FF]/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#00D4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                </div>
                <span className="text-sm text-white font-medium">Download All (ZIP)</span>
              </div>
              <span className="text-xs text-[#00D4FF]">Download ↓</span>
            </a>
          )}
        </div>

        <button
          onClick={reset}
          className="w-full py-3 rounded-xl border border-[#1A2640] text-gray-400 hover:text-white hover:border-[#00D4FF]/40 transition-all text-sm font-display tracking-wider"
        >
          PROCESS ANOTHER FILE
        </button>
      </div>
    )
  }

  // --- PROCESSING VIEW ---
  if (isProcessing) {
    return (
      <div className="result-card rounded-2xl p-8 animate-fade-in">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display text-sm font-semibold text-white tracking-wider">PROCESSING</span>
            <span className="font-display text-sm text-[#00D4FF]">{progress}%</span>
          </div>
          <div className="h-1.5 bg-[#1A2640] rounded-full overflow-hidden">
            <div className="progress-bar h-full rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {currentStep && (
          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#00D4FF]/5 border border-[#00D4FF]/20">
            <span className="text-2xl">{currentStep.icon}</span>
            <div>
              <p className="text-sm text-white">{currentStep.text}</p>
              <p className="text-xs text-gray-500 mt-0.5">AI is working...</p>
            </div>
          </div>
        )}

        {/* Waveform animation */}
        <div className="flex items-center justify-center gap-1 mt-8 h-12">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="wave-bar w-1.5 rounded-full"
              style={{
                '--bar-height': `${Math.random() * 32 + 8}px`,
                '--bar-delay': `${i * 0.08}s`,
                height: '4px',
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    )
  }

  // --- MAIN UPLOAD VIEW ---
  return (
    <div className="space-y-4 animate-slide-up" style={{ animationFillMode: 'both' }}>
      {/* Tab switcher */}
      <div className="flex rounded-xl overflow-hidden border border-[#1A2640] p-1 bg-[#080C14]/60">
        {(['upload', 'youtube'] as TabType[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-display tracking-wider transition-all ${
              tab === t
                ? 'bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {t === 'upload' ? '↑ UPLOAD FILE' : '▶ YOUTUBE'}
          </button>
        ))}
      </div>

      {tab === 'upload' ? (
        <div
          className={`upload-zone rounded-2xl p-10 text-center cursor-pointer relative overflow-hidden ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="scan-line" />
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*,audio/*"
            className="hidden"
            onChange={handleFileInput}
          />

          {/* Icon */}
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6 mx-auto animate-float">
            <div className="absolute inset-0 rounded-2xl bg-[#0066FF]/10 blur-xl" />
            <div className="relative w-full h-full rounded-2xl border border-[#1A2640] bg-[#0D1421] flex items-center justify-center">
              <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
                <rect x="10" y="8" width="32" height="40" rx="4" stroke="url(#iconGrad1)" strokeWidth="2" />
                <path d="M38 8L46 18V50H16" stroke="url(#iconGrad1)" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="42" cy="44" r="12" fill="url(#iconGrad2)" />
                <path d="M42 38V50M36 44H48" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M20 24H34M20 30H30M20 36H26" stroke="url(#iconGrad1)" strokeWidth="1.5" strokeLinecap="round" />
                <defs>
                  <linearGradient id="iconGrad1" x1="10" y1="8" x2="46" y2="50">
                    <stop stopColor="#00D4FF" />
                    <stop offset="1" stopColor="#0066FF" />
                  </linearGradient>
                  <linearGradient id="iconGrad2" x1="30" y1="32" x2="54" y2="56">
                    <stop stopColor="#0066FF" />
                    <stop offset="1" stopColor="#00D4FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <h3 className="font-display text-xl font-bold text-white mb-2 tracking-wider">
            DRAG & DROP YOUR VIDEO HERE
          </h3>
          <p className="text-gray-500 text-sm">
            Or Click to Upload (MP4, MOV, AVI — Max 500MB)
          </p>

          {isDragging && (
            <div className="absolute inset-0 bg-[#00D4FF]/5 flex items-center justify-center rounded-2xl">
              <p className="font-display text-[#00D4FF] text-lg font-bold tracking-wider animate-pulse">DROP IT!</p>
            </div>
          )}
        </div>
      ) : (
        <div className="upload-zone rounded-2xl p-6 space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => {
                setYoutubeUrl(e.target.value)
                if (e.target.value.length > 20) {
                  setTimeout(() => fetchYoutubeInfo(e.target.value), 800)
                }
              }}
              placeholder="Paste a YouTube link..."
              className="flex-1 bg-[#080C14] border border-[#1A2640] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00D4FF]/50 transition-colors font-body"
            />
            <button
              onClick={handleYoutubeProcess}
              disabled={!youtubeUrl.trim()}
              className="btn-glow px-5 py-3 rounded-xl text-sm font-display font-bold tracking-wider text-white disabled:opacity-40 disabled:pointer-events-none"
            >
              <span>PROCESS</span>
            </button>
          </div>

          {ytLoading && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-3 h-3 border border-[#00D4FF] border-t-transparent rounded-full animate-spin" />
              Fetching video info...
            </div>
          )}

          {ytInfo && (
            <div className="flex gap-3 p-3 rounded-xl bg-[#080C14] border border-[#1A2640]">
              {ytInfo.thumbnail && (
                <img src={ytInfo.thumbnail} alt="" className="w-20 h-14 object-cover rounded-lg flex-shrink-0" />
              )}
              <div className="min-w-0">
                <p className="text-sm text-white font-medium truncate">{ytInfo.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{ytInfo.uploader}</p>
                <p className="text-xs text-[#00D4FF] mt-1">
                  {ytInfo.duration ? `${Math.floor(ytInfo.duration / 60)}:${String(ytInfo.duration % 60).padStart(2, '0')}` : ''}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          ❌ {error}
        </div>
      )}
    </div>
  )
}
