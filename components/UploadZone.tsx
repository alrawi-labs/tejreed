'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useLang } from '@/i18n/LangContext'

const API_BASE = 'http://127.0.0.1:5000'

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

interface TranscribeResult {
  language: string
  text: string
  segments: { id: number; start: number; end: number; text: string }[]
  downloads: {
    txt: string
    srt: string
    json: string
  }
}

type TabType = 'upload' | 'youtube' | 'transcribe'

export default function UploadZone() {
  const { t } = useLang()
  const u = t.upload

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

  // Transcribe state
  const [transcribeTab, setTranscribeTab] = useState<'file' | 'youtube'>('file')
  const [transcribeYtUrl, setTranscribeYtUrl] = useState('')
  const [transcribeYtInfo, setTranscribeYtInfo] = useState<any>(null)
  const [transcribeYtLoading, setTranscribeYtLoading] = useState(false)
  const [transcribeResult, setTranscribeResult] = useState<TranscribeResult | null>(null)
  const [transcribeLang, setTranscribeLang] = useState('')
  const [copiedText, setCopiedText] = useState(false)
  const [activeSegment, setActiveSegment] = useState<number | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const transcribeFileInputRef = useRef<HTMLInputElement>(null)
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

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true) }
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
    setError(null); setResult(null); setIsProcessing(true); setProgress(0); setCurrentStep(null)
    connectSSE()
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await fetch(`${API_BASE}/api/split-audio`, { method: 'POST', body: formData })
      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Operation failed.')
      }
      const contentType = response.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        const data = await response.json()
        setResult({ type: 'video', ...data })
      } else {
        const blob = await response.blob()
        setResult({ type: 'audio', vocals: URL.createObjectURL(blob) })
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred.')
    } finally {
      setIsProcessing(false)
      eventSourceRef.current?.close()
    }
  }

  const fetchYoutubeInfo = async (url: string) => {
    if (!url.trim()) return
    setYtInfo(null); setYtLoading(true)
    try {
      const fd = new FormData(); fd.append('url', url)
      const res = await fetch(`${API_BASE}/api/get-youtube-info`, { method: 'POST', body: fd })
      if (res.ok) setYtInfo(await res.json())
    } catch {}
    setYtLoading(false)
  }

  const fetchTranscribeYtInfo = async (url: string) => {
    if (!url.trim()) return
    setTranscribeYtInfo(null); setTranscribeYtLoading(true)
    try {
      const fd = new FormData(); fd.append('url', url)
      const res = await fetch(`${API_BASE}/api/get-youtube-info`, { method: 'POST', body: fd })
      if (res.ok) setTranscribeYtInfo(await res.json())
    } catch {}
    setTranscribeYtLoading(false)
  }

  const handleYoutubeProcess = async () => {
    if (!youtubeUrl.trim()) return
    setError(null); setResult(null); setIsProcessing(true); setProgress(0); setCurrentStep(null)
    connectSSE()
    const fd = new FormData(); fd.append('url', youtubeUrl)
    const minWait = new Promise(resolve => setTimeout(resolve, 5000))
    try {
      const [response] = await Promise.all([
        fetch(`${API_BASE}/api/process-youtube`, { method: 'POST', body: fd }),
        minWait,
      ])
      if (!response.ok) { await minWait; setError('youtube_blocked'); return }
      const contentType = response.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        const data = await response.json()
        setResult({ type: 'video', ...data })
      } else {
        const blob = await response.blob()
        setResult({ type: 'audio', vocals: URL.createObjectURL(blob) })
      }
    } catch {
      await minWait; setError('youtube_blocked')
    } finally {
      setIsProcessing(false); eventSourceRef.current?.close()
    }
  }

  // ── Transcribe handlers ──────────────────────────────────────────────────

  const handleTranscribeFile = async (file: File) => {
    setError(null); setTranscribeResult(null); setIsProcessing(true); setProgress(0); setCurrentStep(null)
    connectSSE()
    const fd = new FormData()
    fd.append('file', file)
    if (transcribeLang) fd.append('language', transcribeLang)
    try {
      const response = await fetch(`${API_BASE}/api/transcribe`, { method: 'POST', body: fd })
      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Transcription failed.')
      }
      const data = await response.json()
      setTranscribeResult(data)
    } catch (err: any) {
      setError(err.message || 'An error occurred.')
    } finally {
      setIsProcessing(false)
      eventSourceRef.current?.close()
    }
  }

  const handleTranscribeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) handleTranscribeFile(files[0])
  }

  const handleTranscribeYoutube = async () => {
    if (!transcribeYtUrl.trim()) return
    setError(null); setTranscribeResult(null); setIsProcessing(true); setProgress(0); setCurrentStep(null)
    connectSSE()
    const fd = new FormData()
    fd.append('url', transcribeYtUrl)
    if (transcribeLang) fd.append('language', transcribeLang)
    try {
      const response = await fetch(`${API_BASE}/api/transcribe-youtube`, { method: 'POST', body: fd })
      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Transcription failed.')
      }
      const data = await response.json()
      setTranscribeResult(data)
    } catch (err: any) {
      setError(err.message || 'An error occurred.')
    } finally {
      setIsProcessing(false)
      eventSourceRef.current?.close()
    }
  }

  const handleCopyText = () => {
    if (!transcribeResult) return
    navigator.clipboard.writeText(transcribeResult.text)
    setCopiedText(true)
    setTimeout(() => setCopiedText(false), 2000)
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${String(s).padStart(2, '0')}`
  }

  const reset = () => {
    setResult(null); setError(null); setProgress(0); setCurrentStep(null)
    setYoutubeUrl(''); setYtInfo(null)
    setTranscribeResult(null); setTranscribeYtUrl(''); setTranscribeYtInfo(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    if (transcribeFileInputRef.current) transcribeFileInputRef.current.value = ''
  }

  // ── RESULT VIEW (vocal separation) ──────────────────────────────────────
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
            <h3 className="font-display text-lg font-bold text-white">{u.completeTitle}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{u.completeSub}</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {result.vocals && (
            <a href={result.vocals} download="vocals.mp3"
              className="flex items-center justify-between p-4 rounded-xl border border-[#1A2640] hover:border-[#00D4FF]/40 transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0066FF]/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#00D4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <span className="text-sm text-gray-300">{u.downloadVocals}</span>
              </div>
              <svg className="w-4 h-4 text-gray-600 group-hover:text-[#00D4FF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          )}
          {result.vocal_video && (
            <a href={`${API_BASE}${result.vocal_video}`} download="vocal_video.mp4"
              className="flex items-center justify-between p-4 rounded-xl border border-[#1A2640] hover:border-[#00D4FF]/40 transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#7B2FFF]/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#7B2FFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.876v6.248a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-300">{u.downloadVideo}</span>
              </div>
              <svg className="w-4 h-4 text-gray-600 group-hover:text-[#00D4FF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          )}
          {result.zip && (
            <a href={`${API_BASE}${result.zip}`} download="tejreed_output.zip"
              className="flex items-center justify-between p-4 rounded-xl border border-[#00D4FF]/20 bg-[#00D4FF]/5 hover:border-[#00D4FF]/40 transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#00D4FF]/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#00D4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
                  </svg>
                </div>
                <span className="text-sm text-white font-medium">{u.downloadAll}</span>
              </div>
              <svg className="w-4 h-4 text-[#00D4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          )}
        </div>

        <button onClick={reset}
          className="w-full py-3 rounded-xl border border-[#1A2640] text-gray-400 hover:text-white hover:border-[#00D4FF]/40 transition-all text-sm font-display tracking-wider">
          {u.processAnother}
        </button>
      </div>
    )
  }

  // ── TRANSCRIBE RESULT VIEW ───────────────────────────────────────────────
  if (transcribeResult) {
    return (
      <div className="result-card rounded-2xl p-6 animate-fade-in space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">{u.transcribeCompleteTitle}</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {u.transcribeDetectedLang}: <span className="text-emerald-400 uppercase font-mono">{transcribeResult.language}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Full text */}
        <div className="relative">
          <div className="p-4 rounded-xl bg-[#080C14] border border-[#1A2640] max-h-40 overflow-y-auto">
            <p className="text-sm text-gray-300 leading-relaxed font-body whitespace-pre-wrap">
              {transcribeResult.text}
            </p>
          </div>
          <button
            onClick={handleCopyText}
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#1A2640] hover:bg-[#00D4FF]/20 border border-[#1A2640] hover:border-[#00D4FF]/40 transition-all group"
            title="Copy"
          >
            {copiedText
              ? <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              : <svg className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#00D4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            }
          </button>
        </div>

        {/* Segments */}
        {transcribeResult.segments.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 mb-2 font-display tracking-wider">{u.transcribeSegments}</p>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {transcribeResult.segments.map((seg) => (
                <div
                  key={seg.id}
                  onClick={() => setActiveSegment(activeSegment === seg.id ? null : seg.id)}
                  className={`flex gap-3 p-2.5 rounded-lg cursor-pointer transition-all ${
                    activeSegment === seg.id
                      ? 'bg-[#00D4FF]/10 border border-[#00D4FF]/30'
                      : 'hover:bg-[#0D1421] border border-transparent'
                  }`}
                >
                  <span className="text-xs text-[#00D4FF] font-mono shrink-0 mt-0.5 w-20">
                    {formatTime(seg.start)} → {formatTime(seg.end)}
                  </span>
                  <span className="text-xs text-gray-300 leading-relaxed">{seg.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Downloads */}
        <div>
          <p className="text-xs text-gray-500 mb-2 font-display tracking-wider">{u.transcribeDownload}</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { fmt: 'txt', label: 'TXT', icon: '📄', url: transcribeResult.downloads.txt },
              { fmt: 'srt', label: 'SRT', icon: '🎬', url: transcribeResult.downloads.srt },
              { fmt: 'json', label: 'JSON', icon: '{ }', url: transcribeResult.downloads.json },
            ].map(({ fmt, label, icon, url }) => (
              <a key={fmt} href={url} download={`transcription.${fmt}`}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-[#1A2640] hover:border-[#00D4FF]/40 bg-[#080C14] hover:bg-[#00D4FF]/5 transition-all group">
                <span className="text-base">{icon}</span>
                <span className="text-xs font-mono text-gray-400 group-hover:text-[#00D4FF] transition-colors">{label}</span>
              </a>
            ))}
          </div>
        </div>

        <button onClick={reset}
          className="w-full py-3 rounded-xl border border-[#1A2640] text-gray-400 hover:text-white hover:border-[#00D4FF]/40 transition-all text-sm font-display tracking-wider">
          {u.processAnother}
        </button>
      </div>
    )
  }

  // ── PROCESSING VIEW ──────────────────────────────────────────────────────
  if (isProcessing) {
    return (
      <div className="result-card rounded-2xl p-8 animate-fade-in">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display text-sm font-semibold text-white tracking-wider">{u.processingLabel}</span>
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
              <p className="text-xs text-gray-500 mt-0.5">{u.aiWorking}</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-1 mt-8 h-12">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="wave-bar w-1.5 rounded-full"
              style={{ '--bar-height': `${Math.random() * 32 + 8}px`, '--bar-delay': `${i * 0.08}s`, height: '4px' } as React.CSSProperties} />
          ))}
        </div>
      </div>
    )
  }

  // ── MAIN VIEW ────────────────────────────────────────────────────────────
  return (
    <div className="space-y-4 animate-slide-up" style={{ animationFillMode: 'both' }}>

      {/* Tab Bar */}
      <div className="flex rounded-xl overflow-hidden border border-[#1A2640] p-1 bg-[#080C14]/60">
        {(['upload', 'youtube', 'transcribe'] as TabType[]).map((tabKey) => (
          <button key={tabKey} onClick={() => { setTab(tabKey); setError(null) }}
            className={`flex-1 py-2.5 rounded-lg text-xs font-display tracking-wider transition-all ${
              tab === tabKey
                ? tabKey === 'transcribe'
                  ? 'bg-gradient-to-r from-emerald-600 to-[#00D4FF] text-white'
                  : 'bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white'
                : 'text-gray-500 hover:text-gray-300'
            }`}>
            {tabKey === 'upload' ? u.tabFile : tabKey === 'youtube' ? u.tabYoutube : u.tabTranscribe}
          </button>
        ))}
      </div>

      {/* ── Upload Tab ── */}
      {tab === 'upload' && (
        <div
          className={`upload-zone rounded-2xl p-10 text-center cursor-pointer relative overflow-hidden ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="scan-line" />
          <input ref={fileInputRef} type="file" accept="video/*,audio/*" className="hidden" onChange={handleFileInput} />
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
                    <stop stopColor="#00D4FF" /><stop offset="1" stopColor="#0066FF" />
                  </linearGradient>
                  <linearGradient id="iconGrad2" x1="30" y1="32" x2="54" y2="56">
                    <stop stopColor="#0066FF" /><stop offset="1" stopColor="#00D4FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <h3 className="font-display text-xl font-bold text-white mb-2 tracking-wider">{u.dragTitle}</h3>
          <p className="text-gray-500 text-sm">{u.dragSub}</p>
          {isDragging && (
            <div className="absolute inset-0 bg-[#00D4FF]/5 flex items-center justify-center rounded-2xl">
              <p className="font-display text-[#00D4FF] text-lg font-bold tracking-wider animate-pulse">{u.dropIt}</p>
            </div>
          )}
        </div>
      )}

      {/* ── YouTube Tab ── */}
      {tab === 'youtube' && (
        <div className="upload-zone rounded-2xl p-6 space-y-4">
          <div className="flex gap-2">
            <input type="text" value={youtubeUrl}
              onChange={(e) => {
                setYoutubeUrl(e.target.value)
                if (e.target.value.length > 20) setTimeout(() => fetchYoutubeInfo(e.target.value), 800)
              }}
              placeholder={u.youtubePlaceholder}
              className="flex-1 bg-[#080C14] border border-[#1A2640] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00D4FF]/50 transition-colors font-body"
            />
            <button onClick={handleYoutubeProcess} disabled={!youtubeUrl.trim()}
              className="btn-glow px-5 py-3 rounded-xl text-sm font-display font-bold tracking-wider text-white disabled:opacity-40 disabled:pointer-events-none">
              <span>{u.process}</span>
            </button>
          </div>

          {ytLoading && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-3 h-3 border border-[#00D4FF] border-t-transparent rounded-full animate-spin" />
              {u.fetchingInfo}
            </div>
          )}

          {ytInfo && (
            <div className="flex gap-3 p-3 rounded-xl bg-[#080C14] border border-[#1A2640]">
              {ytInfo.thumbnail && <img src={ytInfo.thumbnail} alt="" className="w-20 h-14 object-cover rounded-lg flex-shrink-0" />}
              <div className="min-w-0">
                <p className="text-sm text-white font-medium truncate">{ytInfo.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{ytInfo.uploader}</p>
                <p className="text-xs text-[#00D4FF] mt-1">
                  {ytInfo.duration ? `${Math.floor(ytInfo.duration / 60)}:${String(ytInfo.duration % 60).padStart(2, '0')}` : ''}
                </p>
              </div>
            </div>
          )}

          {error === 'youtube_blocked' && (
            <div className="p-5 rounded-xl bg-[#0D1421] border border-yellow-500/30 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">⚠️</span>
                <p className="text-sm text-yellow-400 font-medium">{u.youtubeBlocked}</p>
              </div>
              {ytInfo && (
                <div className="flex gap-3 p-3 rounded-xl bg-[#080C14] border border-[#1A2640]">
                  {ytInfo.thumbnail && <img src={ytInfo.thumbnail} alt="" className="w-20 h-14 object-cover rounded-lg flex-shrink-0" />}
                  <div className="min-w-0">
                    <p className="text-sm text-white font-medium truncate">{ytInfo.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{ytInfo.uploader}</p>
                  </div>
                </div>
              )}
              <p className="text-xs text-gray-400">
                {u.youtubeManual} <strong className="text-white">{u.uploadFileTab}</strong> {u.tab}
              </p>
              <a href={`https://en1.savefrom.net/1-youtube-video-downloader-14hf/#${youtubeUrl}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/20 transition-all text-sm font-display tracking-wider">
                {u.downloadSavefrom}
              </a>
              <button onClick={() => { setError(null); setTab('upload') }}
                className="w-full py-2.5 rounded-xl border border-[#1A2640] text-gray-400 hover:text-white hover:border-[#00D4FF]/40 transition-all text-sm font-display tracking-wider">
                {u.uploadFileBtn}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Transcribe Tab ── */}
      {tab === 'transcribe' && (
        <div className="upload-zone rounded-2xl p-6 space-y-4">

          {/* Language selector */}
          <div className="flex items-center gap-3">
            <label className="text-xs text-gray-500 font-display tracking-wider shrink-0">{u.transcribeLang}</label>
            <select
              value={transcribeLang}
              onChange={(e) => setTranscribeLang(e.target.value)}
              className="flex-1 bg-[#080C14] border border-[#1A2640] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00D4FF]/50 transition-colors font-body appearance-none cursor-pointer"
            >
              <option value="">{u.transcribeLangAuto}</option>
              <option value="tr">Türkçe</option>
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="de">Deutsch</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="it">Italiano</option>
              <option value="fa">فارسی</option>
              <option value="ru">Русский</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
            </select>
          </div>

          {/* Sub-tabs: File / YouTube */}
          <div className="flex rounded-lg overflow-hidden border border-[#1A2640] p-0.5 bg-[#080C14]/40">
            {(['file', 'youtube'] as const).map((st) => (
              <button key={st} onClick={() => setTranscribeTab(st)}
                className={`flex-1 py-2 rounded-md text-xs font-display tracking-wider transition-all ${
                  transcribeTab === st ? 'bg-[#1A2640] text-white' : 'text-gray-600 hover:text-gray-400'
                }`}>
                {st === 'file' ? u.tabFile : u.tabYoutube}
              </button>
            ))}
          </div>

          {/* File upload */}
          {transcribeTab === 'file' && (
            <div
              className="flex flex-col items-center justify-center gap-4 p-8 rounded-xl border-2 border-dashed border-[#1A2640] hover:border-emerald-500/40 transition-all cursor-pointer group"
              onClick={() => transcribeFileInputRef.current?.click()}
            >
              <input
                ref={transcribeFileInputRef}
                type="file"
                accept="video/*,audio/*"
                className="hidden"
                onChange={handleTranscribeFileInput}
              />
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-all flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-display text-white tracking-wider">{u.transcribeDropTitle}</p>
                <p className="text-xs text-gray-500 mt-1">{u.transcribeDropSub}</p>
              </div>
            </div>
          )}

          {/* YouTube transcribe */}
          {transcribeTab === 'youtube' && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={transcribeYtUrl}
                  onChange={(e) => {
                    setTranscribeYtUrl(e.target.value)
                    if (e.target.value.length > 20) setTimeout(() => fetchTranscribeYtInfo(e.target.value), 800)
                  }}
                  placeholder={u.youtubePlaceholder}
                  className="flex-1 bg-[#080C14] border border-[#1A2640] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 transition-colors font-body"
                />
                <button
                  onClick={handleTranscribeYoutube}
                  disabled={!transcribeYtUrl.trim()}
                  className="px-5 py-3 rounded-xl text-sm font-display font-bold tracking-wider text-white bg-gradient-to-r from-emerald-600 to-[#00D4FF] hover:opacity-90 transition-opacity disabled:opacity-40 disabled:pointer-events-none"
                >
                  {u.process}
                </button>
              </div>

              {transcribeYtLoading && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-3 h-3 border border-emerald-400 border-t-transparent rounded-full animate-spin" />
                  {u.fetchingInfo}
                </div>
              )}

              {transcribeYtInfo && (
                <div className="flex gap-3 p-3 rounded-xl bg-[#080C14] border border-[#1A2640]">
                  {transcribeYtInfo.thumbnail && (
                    <img src={transcribeYtInfo.thumbnail} alt="" className="w-20 h-14 object-cover rounded-lg flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm text-white font-medium truncate">{transcribeYtInfo.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{transcribeYtInfo.uploader}</p>
                    <p className="text-xs text-emerald-400 mt-1">
                      {transcribeYtInfo.duration
                        ? `${Math.floor(transcribeYtInfo.duration / 60)}:${String(transcribeYtInfo.duration % 60).padStart(2, '0')}`
                        : ''}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Info badge */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
            <span className="text-emerald-400 text-sm">🧠</span>
            <p className="text-xs text-gray-400">{u.transcribeInfo}</p>
          </div>
        </div>
      )}

      {/* Generic error */}
      {error && error !== 'youtube_blocked' && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          ❌ {error}
        </div>
      )}
    </div>
  )
}