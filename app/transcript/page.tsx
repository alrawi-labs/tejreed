"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/i18n/LangContext";
import StatsSection from "@/components/StatsSection";

type Stage = "idle" | "processing" | "done" | "error";

const API_BASE = process.env.NEXT_PUBLIC_TRANSCRIPT_API_URL ?? "";
const API_KEY  = process.env.NEXT_PUBLIC_TRANSCRIPT_API_KEY ?? "";


interface TranscriptResult {
  metin: string;
  dil: string;
  dosya_adi: string;
}

const orbs = [
  { cls: "orb-cyan",   size: 90,  top: "6%",  left: "4%",  delay: "0s",   duration: "6s"   },
  { cls: "orb-mint",   size: 55,  top: "12%", left: "91%", delay: "1.5s", duration: "7s"   },
  { cls: "orb-purple", size: 70,  top: "60%", left: "2%",  delay: "0.8s", duration: "5.5s" },
  { cls: "orb-peach",  size: 42,  top: "75%", left: "89%", delay: "2.2s", duration: "8s"   },
  { cls: "orb-cyan",   size: 30,  top: "85%", left: "18%", delay: "1.0s", duration: "6.5s" },
  { cls: "orb-mint",   size: 38,  top: "38%", left: "95%", delay: "3.0s", duration: "7.5s" },
];

const sparkles = [
  { top: "10%", left: "22%", delay: "0s",   size: 10 },
  { top: "28%", left: "75%", delay: "1.2s", size: 8  },
  { top: "55%", left: "14%", delay: "0.6s", size: 12 },
  { top: "70%", left: "60%", delay: "2.0s", size: 9  },
  { top: "42%", left: "85%", delay: "1.8s", size: 7  },
  { top: "88%", left: "42%", delay: "0.3s", size: 11 },
];

function ProcessingRing() {
  return (
    <div className="relative flex items-center justify-center w-24 h-24 mx-auto">
      <div
        className="absolute inset-0 rounded-full border-4 border-transparent"
        style={{
          borderTopColor: "#60D0FF",
          borderRightColor: "#A0FFE0",
          animation: "spin 1.2s linear infinite",
        }}
      />
      <div
        className="absolute inset-3 rounded-full border-4 border-transparent"
        style={{
          borderTopColor: "#A060FF",
          borderLeftColor: "#60D0FF",
          animation: "spin 0.8s linear infinite reverse",
        }}
      />
      <span className="text-2xl">📝</span>
    </div>
  );
}

function Waveform({ active }: { active: boolean }) {
  const bars = [4, 8, 14, 20, 28, 20, 32, 24, 16, 36, 28, 18, 36, 26, 40, 32, 20, 36, 24, 16, 30, 22, 14, 8, 4];
  return (
    <svg viewBox="0 0 200 48" className="w-full h-12" preserveAspectRatio="none">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 8 + 2} y={(48 - h) / 2} width={4} height={h} rx={2}
          fill="url(#waveGradT)"
          opacity={active ? 1 : 0.35}
          style={{
            animation: active ? `barPulse ${0.6 + (i % 4) * 0.15}s ease-in-out infinite alternate` : "none",
            animationDelay: `${i * 0.04}s`,
          }}
        />
      ))}
      <defs>
        <linearGradient id="waveGradT" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#60D0FF" />
          <stop offset="100%" stopColor="#A0FFE0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function TranscriptPage() {
  const { t } = useLang();
  const tr = t.transcript;

  const [stage, setStage]         = useState<Stage>("idle");
  const [fileName, setFileName]   = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [result, setResult]       = useState<TranscriptResult | null>(null);
  const [errorMsg, setErrorMsg]   = useState("");
  const [copied, setCopied]       = useState(false);
  const [progress, setProgress]   = useState(0);

  const fileRef = useRef<HTMLInputElement>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  // Sahte ilerleme — gerçek API cevabı gelince %100'e zıplar
  const startFakeProgress = () => {
    setProgress(0);
    let p = 0;
    progressRef.current = setInterval(() => {
      p += Math.random() * 3;
      if (p >= 88) { clearInterval(progressRef.current!); p = 88; }
      setProgress(Math.round(p));
    }, 400);
  };

  const stopFakeProgress = () => {
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(100);
  };

  const handleFile = useCallback(async (file: File) => {
    if (!file) return;
    setFileName(file.name);
    setStage("processing");
    setErrorMsg("");
    setResult(null);
    startFakeProgress();

    const formData = new FormData();
    formData.append("dosya", file);

    try {
      const res = await fetch(`${API_BASE}/transkript`, {
        method: "POST",
        headers: { "X-API-Key": API_KEY },
        body: formData,
      });

      stopFakeProgress();

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: "Unknown error" }));
        throw new Error(err.detail ?? `HTTP ${res.status}`);
      }

      const data: TranscriptResult = await res.json();
      setResult(data);
      setStage("done");
    } catch (err: unknown) {
      stopFakeProgress();
      setErrorMsg(err instanceof Error ? err.message : "An error occurred");
      setStage("error");
    }
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleCopy = async () => {
    if (!result?.metin) return;
    await navigator.clipboard.writeText(result.metin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!result?.metin) return;
    const blob = new Blob([result.metin], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName.replace(/\.[^.]+$/, "") || "transkript"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadSrt = () => {
    if (!result?.metin) return;
    // Basit SRT: tüm metni tek segment olarak
    const srt = `1\n00:00:00,000 --> 99:59:59,999\n${result.metin}\n`;
    const blob = new Blob([srt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName.replace(/\.[^.]+$/, "") || "transkript"}.srt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setStage("idle");
    setProgress(0);
    setFileName("");
    setResult(null);
    setErrorMsg("");
    setCopied(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <style>{`
        @keyframes spin      { to { transform: rotate(360deg); } }
        @keyframes barPulse  { from { transform: scaleY(0.4); } to { transform: scaleY(1.1); } }
        @keyframes pulseRing { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.5); opacity: 0; } }
      `}</style>

      {orbs.map((o, i) => (
        <div key={i} className={`orb ${o.cls}`}
          style={{ width: o.size, height: o.size, top: o.top, left: o.left,
                   animationDelay: o.delay, animationDuration: o.duration }} />
      ))}
      {sparkles.map((s, i) => (
        <div key={i} className="sparkle"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size,
                   animationDelay: `${i * 0.5}s`, animationDuration: "3s" }} />
      ))}

      <Navbar />

      <main className="relative z-10 pt-24 pb-20 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 fade-in-up">
            <Link href="/" className="text-sm font-semibold transition-colors"
              style={{ color: "var(--text-light)" }}>
              {tr.breadcrumbHome}
            </Link>
            <span style={{ color: "var(--text-light)" }}>/</span>
            <span className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
              {tr.breadcrumbCurrent}
            </span>
          </div>

          {/* Hero */}
          <div className="text-center mb-10 fade-in-up">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="section-badge">
                <span className="dot" />
                {tr.badge}
              </span>
            </div>
            <h1 className="font-display font-black text-4xl md:text-5xl leading-tight mb-4"
              style={{ letterSpacing: "-0.01em" }}>
              {tr.title}
            </h1>
            <p className="text-base md:text-lg font-body max-w-md mx-auto"
              style={{ color: "var(--text-secondary)", fontWeight: 600 }}>
              {tr.subtitle}
            </p>
          </div>

          {/* Card */}
          <div className="glass-card p-6 md:p-8 fade-in-up delay-200">

            {/* ── IDLE ── */}
            {stage === "idle" && (
              <div
                className={`upload-zone rounded-3xl p-10 text-center cursor-pointer transition-all duration-300 ${isDragging ? "scale-[1.02]" : ""}`}
                style={{
                  borderStyle: isDragging ? "solid" : "dashed",
                  borderColor: isDragging ? "#60D0FF" : undefined,
                }}
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                <input
                  ref={fileRef}
                  type="file"
                  className="hidden"
                  accept="audio/*,video/*"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
                <div className="upload-icon-wrap w-20 h-20 mx-auto mb-5 float-gentle">
                  <span style={{ fontSize: 36 }}>📝</span>
                </div>
                <p className="font-display font-bold text-base mb-2"
                  style={{ color: "var(--text-primary)" }}>
                  {tr.dropTitle}
                </p>
                <p className="text-sm font-body mb-4"
                  style={{ color: "var(--text-secondary)" }}>
                  {tr.dropSub}
                </p>
                <p className="text-xs" style={{ color: "var(--text-light)" }}>
                  {tr.dropFormats}
                </p>
              </div>
            )}

            {/* ── PROCESSING ── */}
            {stage === "processing" && (
              <div className="text-center py-6 fade-in-up">
                <ProcessingRing />
                <p className="font-display font-bold text-sm mt-4 mb-1"
                  style={{ color: "var(--text-primary)" }}>
                  {fileName}
                </p>
                <p className="text-sm font-body mb-6"
                  style={{ color: "var(--text-secondary)" }}>
                  {tr.aiSubtitle}
                </p>
                <div className="rounded-2xl p-4"
                  style={{ background: "rgba(255,255,255,0.40)", border: "1px solid rgba(255,255,255,0.70)" }}>
                  <Waveform active={true} />
                </div>
                <div className="rounded-full overflow-hidden mt-4 mb-1"
                  style={{ height: 6, background: "rgba(255,255,255,0.50)", border: "1px solid rgba(255,255,255,0.70)" }}>
                  <div className="progress-bar h-full rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }} />
                </div>
                <p className="text-xs font-bold" style={{ color: "var(--text-light)" }}>
                  %{progress}
                </p>
              </div>
            )}

            {/* ── DONE ── */}
            {stage === "done" && result && (
              <div className="fade-in-up">
                {/* Başlık */}
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto"
                      style={{
                        background: "linear-gradient(135deg,#A0FFD8,#60E8B8)",
                        boxShadow: "0 8px 24px rgba(0,200,140,0.30),inset 0 1px 0 rgba(255,255,255,0.80)",
                      }}>
                      <span style={{ fontSize: 36 }}>✅</span>
                    </div>
                    <div className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{ border: "2px solid rgba(0,200,140,0.5)", animation: "pulseRing 1.2s ease-out forwards" }} />
                  </div>
                  <p className="font-display font-bold text-lg mb-1" style={{ color: "var(--text-primary)" }}>
                    {tr.done}
                  </p>
                  <p className="text-sm font-body" style={{ color: "var(--text-secondary)" }}>
                    {tr.doneSub}
                  </p>
                  {result.dil && (
                    <p className="text-xs mt-1 font-semibold" style={{ color: "var(--text-light)" }}>
                      {tr.detectedLang}: <span style={{ color: "var(--text-secondary)" }}>{result.dil.toUpperCase()}</span>
                    </p>
                  )}
                </div>

                {/* Metin kutusu */}
                <div className="rounded-2xl p-4 mb-4"
                  style={{ background: "rgba(255,255,255,0.50)", border: "1.5px solid rgba(255,255,255,0.80)" }}>
                  <p className="text-sm font-body leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto"
                    style={{ color: "var(--text-primary)" }}>
                    {result.metin}
                  </p>
                </div>

                {/* Aksiyonlar */}
                <div className="space-y-3 mb-4">
                  <button
                    onClick={handleCopy}
                    className="flex items-center justify-between w-full p-4 rounded-2xl transition-all"
                    style={{ background: "rgba(255,255,255,0.40)", border: "1.5px solid rgba(255,255,255,0.70)" }}>
                    <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                      {copied ? tr.copied : tr.copyBtn}
                    </span>
                    <span style={{ color: "var(--text-light)" }}>{copied ? "✅" : "📋"}</span>
                  </button>

                  <button
                    onClick={handleDownloadTxt}
                    className="flex items-center justify-between w-full p-4 rounded-2xl transition-all"
                    style={{ background: "rgba(255,255,255,0.40)", border: "1.5px solid rgba(255,255,255,0.70)" }}>
                    <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                      {tr.downloadTxt}
                    </span>
                    <span style={{ color: "var(--text-light)" }}>⬇️</span>
                  </button>

                  <button
                    onClick={handleDownloadSrt}
                    className="flex items-center justify-between w-full p-4 rounded-2xl transition-all"
                    style={{ background: "rgba(255,255,255,0.40)", border: "1.5px solid rgba(255,255,255,0.70)" }}>
                    <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                      {tr.downloadSrt}
                    </span>
                    <span style={{ color: "var(--text-light)" }}>⬇️</span>
                  </button>
                </div>

                <button onClick={reset} className="btn-pill-inactive w-full py-2.5 text-sm font-bold">
                  {tr.newFile}
                </button>
              </div>
            )}

            {/* ── ERROR ── */}
            {stage === "error" && (
              <div className="py-6 fade-in-up text-center">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: "linear-gradient(135deg,#FFD0D0,#FFB0B0)",
                    boxShadow: "0 8px 24px rgba(255,80,80,0.25)",
                  }}>
                  <span style={{ fontSize: 36 }}>❌</span>
                </div>
                <p className="font-display font-bold text-base mb-2" style={{ color: "var(--text-primary)" }}>
                  Something went wrong
                </p>
                <p className="text-sm font-body mb-6 max-w-sm mx-auto" style={{ color: "var(--text-secondary)" }}>
                  {errorMsg}
                </p>
                <button onClick={reset} className="btn-primary px-8 py-3 font-display font-bold text-sm">
                  Try Again
                </button>
              </div>
            )}
          </div>

          {/* Format pills */}
          {stage === "idle" && (
            <div className="flex flex-wrap justify-center gap-2 mt-6 fade-in-up delay-300">
              {["MP3", "MP4", "WAV", "M4A", "OGG", "FLAC", "WEBM"].map((fmt) => (
                <span key={fmt} className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.45)",
                    border: "1.5px solid rgba(255,255,255,0.70)",
                    color: "var(--text-secondary)",
                    backdropFilter: "blur(12px)",
                  }}>
                  {fmt}
                </span>
              ))}
            </div>
          )}

          {/* How it works */}
          {stage === "idle" && (
            <div className="mt-12 fade-in-up delay-400">
              <h2 className="font-display font-bold text-lg text-center mb-6"
                style={{ color: "var(--text-primary)" }}>
                {tr.howItWorks}
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {tr.steps.map((s) => (
                  <div key={s.step} className="step-card p-4 text-center">
                    <div className="step-number mx-auto mb-3">{s.step}</div>
                    <p className="font-display font-bold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                      {s.title}
                    </p>
                    <p className="text-xs font-body" style={{ color: "var(--text-secondary)" }}>
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <StatsSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}