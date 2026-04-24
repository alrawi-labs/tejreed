"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/i18n/LangContext";

type Tab   = "file" | "youtube";
type Stage = "idle" | "processing" | "done" | "error";

const API_BASE = "http://127.0.0.1:5000";

interface ProgressStep {
  icon:     string;
  text:     string;
  progress: number;
}

interface Result {
  type:         "audio" | "video";
  vocals?:      string;
  vocal_video?: string;
  zip?:         string;
}

const orbs = [
  { cls: "orb-purple", size: 90,  top: "6%",  left: "4%",  delay: "0s",   duration: "6s"   },
  { cls: "orb-cyan",   size: 55,  top: "12%", left: "91%", delay: "1.5s", duration: "7s"   },
  { cls: "orb-pink",   size: 70,  top: "60%", left: "2%",  delay: "0.8s", duration: "5.5s" },
  { cls: "orb-mint",   size: 42,  top: "75%", left: "89%", delay: "2.2s", duration: "8s"   },
  { cls: "orb-purple", size: 30,  top: "85%", left: "18%", delay: "1.0s", duration: "6.5s" },
  { cls: "orb-peach",  size: 38,  top: "38%", left: "95%", delay: "3.0s", duration: "7.5s" },
];

const sparkles = [
  { top: "10%", left: "22%", delay: "0s",   size: 10 },
  { top: "28%", left: "75%", delay: "1.2s", size: 8  },
  { top: "55%", left: "14%", delay: "0.6s", size: 12 },
  { top: "70%", left: "60%", delay: "2.0s", size: 9  },
  { top: "42%", left: "85%", delay: "1.8s", size: 7  },
  { top: "88%", left: "42%", delay: "0.3s", size: 11 },
];

function Waveform({ active }: { active: boolean }) {
  const bars = [4,8,14,20,28,20,32,24,16,36,28,18,36,26,40,32,20,36,24,16,30,22,14,8,4];
  return (
    <svg viewBox="0 0 200 48" className="w-full h-12" preserveAspectRatio="none">
      {bars.map((h, i) => (
        <rect key={i} x={i*8+2} y={(48-h)/2} width={4} height={h} rx={2}
          fill="url(#waveGrad)" opacity={active ? 1 : 0.35}
          style={{
            animation: active ? `barPulse ${0.6+(i%4)*0.15}s ease-in-out infinite alternate` : "none",
            animationDelay: `${i*0.04}s`,
          }}
        />
      ))}
      <defs>
        <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#A060FF" />
          <stop offset="100%" stopColor="#60D0FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ProcessingRing() {
  return (
    <div className="relative flex items-center justify-center w-24 h-24 mx-auto">
      <div className="absolute inset-0 rounded-full border-4 border-transparent"
        style={{ borderTopColor:"#A060FF", borderRightColor:"#60D0FF", animation:"spin 1.2s linear infinite" }} />
      <div className="absolute inset-3 rounded-full border-4 border-transparent"
        style={{ borderTopColor:"#FFB8D8", borderLeftColor:"#A0FFE0", animation:"spin 0.8s linear infinite reverse" }} />
      <span className="text-2xl">🎤</span>
    </div>
  );
}

export default function MusicRemoverPage() {
  const { t } = useLang();
  const mr = t.musicRemover;
  const u  = t.upload;

  const [tab,         setTab]         = useState<Tab>("file");
  const [stage,       setStage]       = useState<Stage>("idle");
  const [progress,    setProgress]    = useState(0);
  const [currentStep, setCurrentStep] = useState<ProgressStep | null>(null);
  const [fileName,    setFileName]    = useState("");
  const [youtubeUrl,  setYoutubeUrl]  = useState("");
  const [isDragging,  setIsDragging]  = useState(false);
  const [result,      setResult]      = useState<Result | null>(null);
  const [errorMsg,    setErrorMsg]    = useState("");
  const [ytInfo,      setYtInfo]      = useState<any>(null);
  const [ytLoading,   setYtLoading]   = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const sseRef  = useRef<EventSource | null>(null);

  // ── SSE ─────────────────────────────────────────────────────────────────
  const connectSSE = useCallback(() => {
    if (sseRef.current) sseRef.current.close();
    const es = new EventSource(`${API_BASE}/api/progress`);
    es.onmessage = (e) => {
      try {
        const step: ProgressStep = JSON.parse(e.data);
        setCurrentStep(step);
        setProgress(step.progress);
      } catch {}
    };
    sseRef.current = es;
  }, []);

  useEffect(() => () => { sseRef.current?.close(); }, []);

  // ── YouTube info ─────────────────────────────────────────────────────────
  const fetchYoutubeInfo = async (url: string) => {
    if (!url.trim()) return;
    setYtInfo(null);
    setYtLoading(true);
    try {
      const fd = new FormData();
      fd.append("url", url);
      const res = await fetch(`${API_BASE}/api/get-youtube-info`, { method: "POST", body: fd });
      if (res.ok) setYtInfo(await res.json());
    } catch {}
    setYtLoading(false);
  };

  // ── File handler ─────────────────────────────────────────────────────────
  const handleFile = useCallback(async (file: File) => {
    if (!file) return;
    setFileName(file.name);
    setStage("processing");
    setProgress(0);
    setCurrentStep(null);
    setErrorMsg("");
    setResult(null);
    connectSSE();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE}/api/split-audio`, { method: "POST", body: formData });
      sseRef.current?.close();

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(err.error ?? `HTTP ${res.status}`);
      }

      const contentType = res.headers.get("content-type") ?? "";

      if (contentType.includes("application/json")) {
        // Video → { vocals, vocal_video, zip } — روابط backend كاملة
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setResult({ type: "video", ...data });
      } else {
        // Audio → blob مباشر
        const blob = await res.blob();
        setResult({ type: "audio", vocals: URL.createObjectURL(blob) });
      }

      setStage("done");
      setProgress(100);
    } catch (err: unknown) {
      sseRef.current?.close();
      setErrorMsg(err instanceof Error ? err.message : "An error occurred");
      setStage("error");
    }
  }, [connectSSE]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  // ── YouTube handler ──────────────────────────────────────────────────────
  const handleYouTube = useCallback(async () => {
    if (!youtubeUrl.trim()) return;
    setFileName("YouTube");
    setStage("processing");
    setProgress(0);
    setCurrentStep(null);
    setErrorMsg("");
    setResult(null);
    connectSSE();

    const fd = new FormData();
    fd.append("url", youtubeUrl.trim());

    try {
      const res = await fetch(`${API_BASE}/api/process-youtube`, { method: "POST", body: fd });
      sseRef.current?.close();

      if (!res.ok) {
        // YouTube blocked → special error
        setErrorMsg("youtube_blocked");
        setStage("error");
        return;
      }

      const contentType = res.headers.get("content-type") ?? "";

      if (contentType.includes("application/json")) {
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setResult({ type: "video", ...data });
      } else {
        const blob = await res.blob();
        setResult({ type: "audio", vocals: URL.createObjectURL(blob) });
      }

      setStage("done");
      setProgress(100);
    } catch (err: unknown) {
      sseRef.current?.close();
      setErrorMsg(err instanceof Error ? err.message : "An error occurred");
      setStage("error");
    }
  }, [youtubeUrl, connectSSE]);

  // ── Reset ────────────────────────────────────────────────────────────────
  const reset = () => {
    if (result?.vocals?.startsWith("blob:")) URL.revokeObjectURL(result.vocals);
    setStage("idle");
    setProgress(0);
    setFileName("");
    setYoutubeUrl("");
    setResult(null);
    setErrorMsg("");
    setCurrentStep(null);
    setYtInfo(null);
  };

  // ────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen relative overflow-hidden">
      <style>{`
        @keyframes spin      { to { transform: rotate(360deg); } }
        @keyframes barPulse  { from { transform: scaleY(0.4); } to { transform: scaleY(1.1); } }
        @keyframes pulseRing { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.5); opacity: 0; } }
      `}</style>

      {orbs.map((o, i) => (
        <div key={i} className={`orb ${o.cls}`}
          style={{ width:o.size, height:o.size, top:o.top, left:o.left,
                   animationDelay:o.delay, animationDuration:o.duration }} />
      ))}
      {sparkles.map((s, i) => (
        <div key={i} className="sparkle"
          style={{ top:s.top, left:s.left, width:s.size, height:s.size,
                   animationDelay:`${i*0.5}s`, animationDuration:"3s" }} />
      ))}

      <Navbar />

      <main className="relative z-10 pt-24 pb-20 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 fade-in-up">
            <Link href="/" className="text-sm font-semibold transition-colors"
              style={{ color:"var(--text-light)" }}>
              {mr.breadcrumbHome}
            </Link>
            <span style={{ color:"var(--text-light)" }}>/</span>
            <span className="text-sm font-semibold" style={{ color:"var(--text-secondary)" }}>
              {mr.breadcrumbCurrent}
            </span>
          </div>

          {/* Hero */}
          <div className="text-center mb-10 fade-in-up">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="section-badge"><span className="dot" />{mr.badge}</span>
            </div>
            <h1 className="font-display font-black text-4xl md:text-5xl leading-tight mb-4"
              style={{ letterSpacing:"-0.01em" }}>
              {mr.title}
            </h1>
            <p className="text-base md:text-lg font-body max-w-md mx-auto"
              style={{ color:"var(--text-secondary)", fontWeight:600 }}>
              {mr.subtitle}
            </p>
          </div>

          {/* Card */}
          <div className="glass-card p-6 md:p-8 fade-in-up delay-200">

            {/* Tabs */}
            {stage === "idle" && (
              <div className="flex gap-3 mb-6">
                {(["file","youtube"] as Tab[]).map((tb) => (
                  <button key={tb} onClick={() => { setTab(tb); setErrorMsg(""); }}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold flex-1 justify-center transition-all duration-300
                      ${tab === tb ? "btn-pill-active" : "btn-pill-inactive"}`}>
                    {tb === "file" ? mr.tabFile : mr.tabYoutube}
                  </button>
                ))}
              </div>
            )}

            {/* ── IDLE: File ── */}
            {stage === "idle" && tab === "file" && (
              <div
                className={`upload-zone rounded-3xl p-10 text-center cursor-pointer transition-all duration-300 ${isDragging ? "scale-[1.02]" : ""}`}
                style={{ borderStyle:isDragging?"solid":"dashed", borderColor:isDragging?"#A060FF":undefined }}
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                <input ref={fileRef} type="file" className="hidden" accept="audio/*,video/*"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
                <div className="upload-icon-wrap w-20 h-20 mx-auto mb-5 float-gentle">
                  <span style={{ fontSize:36 }}>🎵</span>
                </div>
                <p className="font-display font-bold text-base mb-2" style={{ color:"var(--text-primary)" }}>
                  {mr.dropTitle}
                </p>
                <p className="text-sm font-body mb-4" style={{ color:"var(--text-secondary)" }}>
                  {mr.dropSub}
                </p>
                <p className="text-xs" style={{ color:"var(--text-light)" }}>{mr.dropFormats}</p>
              </div>
            )}

            {/* ── IDLE: YouTube ── */}
            {stage === "idle" && tab === "youtube" && (
              <div className="flex flex-col gap-4">
                <div className="upload-zone rounded-3xl p-8 text-center">
                  <div className="upload-icon-wrap w-20 h-20 mx-auto mb-5 float-gentle">
                    <span style={{ fontSize:36 }}>▶️</span>
                  </div>
                  <p className="font-display font-bold text-base mb-4" style={{ color:"var(--text-primary)" }}>
                    {mr.youtubePaste}
                  </p>
                  <input
                    type="text" value={youtubeUrl}
                    onChange={(e) => {
                      setYoutubeUrl(e.target.value);
                      if (e.target.value.length > 20)
                        setTimeout(() => fetchYoutubeInfo(e.target.value), 800);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleYouTube()}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-5 py-3 rounded-full text-sm font-body font-semibold outline-none"
                    style={{ background:"rgba(255,255,255,0.65)", border:"1.5px solid rgba(255,255,255,0.80)", color:"var(--text-primary)" }}
                  />
                </div>

                {ytLoading && (
                  <div className="flex items-center gap-2 text-xs" style={{ color:"var(--text-light)" }}>
                    <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                    {u.fetchingInfo}
                  </div>
                )}

                {ytInfo && (
                  <div className="flex gap-3 p-3 rounded-2xl"
                    style={{ background:"rgba(255,255,255,0.35)", border:"1px solid rgba(255,255,255,0.60)" }}>
                    {ytInfo.thumbnail && (
                      <img src={ytInfo.thumbnail} alt="" className="w-20 h-14 object-cover rounded-xl flex-shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate" style={{ color:"var(--text-primary)" }}>{ytInfo.title}</p>
                      <p className="text-xs mt-0.5" style={{ color:"var(--text-secondary)" }}>{ytInfo.uploader}</p>
                      {ytInfo.duration && (
                        <p className="text-xs mt-1" style={{ color:"var(--text-light)" }}>
                          {Math.floor(ytInfo.duration / 60)}:{String(ytInfo.duration % 60).padStart(2,"0")}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <button onClick={handleYouTube} disabled={!youtubeUrl.trim()}
                  className="btn-primary w-full py-3 text-sm font-display font-bold tracking-wide disabled:opacity-40 disabled:cursor-not-allowed">
                  {mr.removeBtn}
                </button>
              </div>
            )}

            {/* ── PROCESSING ── */}
            {stage === "processing" && (
              <div className="text-center py-6 fade-in-up">
                <ProcessingRing />
                {currentStep && (
                  <div className="flex items-center justify-center gap-2 mt-4 mb-1">
                    <span className="text-xl">{currentStep.icon}</span>
                    <p className="font-display font-bold text-sm" style={{ color:"var(--text-primary)" }}>
                      {currentStep.text}
                    </p>
                  </div>
                )}
                <p className="text-sm font-body mb-6" style={{ color:"var(--text-secondary)" }}>
                  {mr.aiSubtitle}
                </p>
                <div className="rounded-2xl p-4"
                  style={{ background:"rgba(255,255,255,0.40)", border:"1px solid rgba(255,255,255,0.70)" }}>
                  <Waveform active={true} />
                </div>
                <div className="rounded-full overflow-hidden mt-4 mb-1"
                  style={{ height:6, background:"rgba(255,255,255,0.50)", border:"1px solid rgba(255,255,255,0.70)" }}>
                  <div className="progress-bar h-full rounded-full transition-all duration-300" style={{ width:`${progress}%` }} />
                </div>
                <p className="text-xs font-bold" style={{ color:"var(--text-light)" }}>%{Math.round(progress)}</p>
              </div>
            )}

            {/* ── DONE ── */}
            {stage === "done" && result && (
              <div className="fade-in-up">
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto"
                      style={{ background:"linear-gradient(135deg,#A0FFD8,#60E8B8)",
                               boxShadow:"0 8px 24px rgba(0,200,140,0.30),inset 0 1px 0 rgba(255,255,255,0.80)" }}>
                      <span style={{ fontSize:36 }}>✅</span>
                    </div>
                    <div className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{ border:"2px solid rgba(0,200,140,0.5)", animation:"pulseRing 1.2s ease-out forwards" }} />
                  </div>
                  <p className="font-display font-bold text-lg mb-1" style={{ color:"var(--text-primary)" }}>
                    {mr.done}
                  </p>
                  <p className="text-sm font-body" style={{ color:"var(--text-secondary)" }}>
                    {mr.doneSub}
                  </p>
                </div>

                <div className="rounded-2xl p-4 mb-6"
                  style={{ background:"rgba(255,255,255,0.50)", border:"1.5px solid rgba(255,255,255,0.80)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background:"var(--grad-button)", boxShadow:"0 4px 12px rgba(120,80,255,0.35)" }}>
                      <span style={{ fontSize:14 }}>🎤</span>
                    </div>
                    <p className="text-xs font-bold truncate" style={{ color:"var(--text-primary)" }}>
                      vocals.mp3
                    </p>
                  </div>
                  <Waveform active={false} />
                </div>

                {/* Download links — نفس نمط UploadZone القديم بالضبط */}
                <div className="space-y-3 mb-4">
                  {result.vocals && (
                    <a href={result.vocals} download="vocals.mp3"
                      className="flex items-center justify-between p-4 rounded-2xl transition-all"
                      style={{ background:"rgba(255,255,255,0.40)", border:"1.5px solid rgba(255,255,255,0.70)" }}>
                      <span className="text-sm font-bold" style={{ color:"var(--text-primary)" }}>
                        {u.downloadVocals}
                      </span>
                      <span style={{ color:"var(--text-light)" }}>⬇️</span>
                    </a>
                  )}

                  {result.type === "video" && result.vocal_video && (
                    <a href={result.vocal_video} download="vocal_video.mp4"
                      className="flex items-center justify-between p-4 rounded-2xl transition-all"
                      style={{ background:"rgba(255,255,255,0.40)", border:"1.5px solid rgba(255,255,255,0.70)" }}>
                      <span className="text-sm font-bold" style={{ color:"var(--text-primary)" }}>
                        {u.downloadVideo}
                      </span>
                      <span style={{ color:"var(--text-light)" }}>⬇️</span>
                    </a>
                  )}

                  {result.type === "video" && result.zip && (
                    <a href={result.zip} download="tejreed_output.zip"
                      className="flex items-center justify-between p-4 rounded-2xl transition-all"
                      style={{ background:"rgba(255,255,255,0.40)", border:"1.5px solid rgba(255,255,255,0.70)" }}>
                      <span className="text-sm font-bold" style={{ color:"var(--text-primary)" }}>
                        {u.downloadAll}
                      </span>
                      <span style={{ color:"var(--text-light)" }}>⬇️</span>
                    </a>
                  )}
                </div>

                <button onClick={reset} className="btn-pill-inactive w-full py-2.5 text-sm font-bold">
                  {mr.newFile}
                </button>
              </div>
            )}

            {/* ── ERROR ── */}
            {stage === "error" && (
              <div className="py-6 fade-in-up">
                {errorMsg === "youtube_blocked" ? (
                  /* YouTube blocked — نفس تصميم UploadZone القديم */
                  <div className="p-5 rounded-2xl space-y-3"
                    style={{ background:"rgba(255,200,0,0.08)", border:"1.5px solid rgba(255,200,0,0.35)" }}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">⚠️</span>
                      <p className="text-sm font-bold" style={{ color:"#F5C518" }}>{u.youtubeBlocked}</p>
                    </div>
                    {ytInfo && (
                      <div className="flex gap-3 p-3 rounded-xl"
                        style={{ background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.30)" }}>
                        {ytInfo.thumbnail && (
                          <img src={ytInfo.thumbnail} alt="" className="w-20 h-14 object-cover rounded-lg flex-shrink-0" />
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-bold truncate" style={{ color:"var(--text-primary)" }}>{ytInfo.title}</p>
                          <p className="text-xs" style={{ color:"var(--text-secondary)" }}>{ytInfo.uploader}</p>
                        </div>
                      </div>
                    )}
                    <p className="text-xs" style={{ color:"var(--text-secondary)" }}>
                      {u.youtubeManual}{" "}
                      <strong style={{ color:"var(--text-primary)" }}>{u.uploadFileTab}</strong>{" "}
                      {u.tab}
                    </p>
                    <a
                      href={`https://en1.savefrom.net/1-youtube-video-downloader-14hf/#${youtubeUrl}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center w-full py-3 rounded-xl text-sm font-bold"
                      style={{ background:"rgba(255,200,0,0.12)", border:"1.5px solid rgba(255,200,0,0.40)", color:"#F5C518" }}
                    >
                      {u.downloadSavefrom}
                    </a>
                    <button
                      onClick={() => { setStage("idle"); setTab("file"); setErrorMsg(""); }}
                      className="btn-pill-inactive w-full py-2.5 text-sm font-bold"
                    >
                      {u.uploadFileBtn}
                    </button>
                  </div>
                ) : (
                  /* Generic error */
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      style={{ background:"linear-gradient(135deg,#FFD0D0,#FFB0B0)",
                               boxShadow:"0 8px 24px rgba(255,80,80,0.25)" }}>
                      <span style={{ fontSize:36 }}>❌</span>
                    </div>
                    <p className="font-display font-bold text-base mb-2" style={{ color:"var(--text-primary)" }}>
                      Something went wrong
                    </p>
                    <p className="text-sm font-body mb-6 max-w-sm mx-auto" style={{ color:"var(--text-secondary)" }}>
                      {errorMsg}
                    </p>
                    <button onClick={reset} className="btn-primary px-8 py-3 font-display font-bold text-sm">
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Format pills */}
          {stage === "idle" && (
            <div className="flex flex-wrap justify-center gap-2 mt-6 fade-in-up delay-300">
              {["MP3","MP4","WAV","M4A","OGG","FLAC","YouTube"].map((fmt) => (
                <span key={fmt} className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ background:"rgba(255,255,255,0.45)", border:"1.5px solid rgba(255,255,255,0.70)",
                           color:"var(--text-secondary)", backdropFilter:"blur(12px)" }}>
                  {fmt}
                </span>
              ))}
            </div>
          )}

          {/* How it works */}
          {stage === "idle" && (
            <div className="mt-12 fade-in-up delay-400">
              <h2 className="font-display font-bold text-lg text-center mb-6"
                style={{ color:"var(--text-primary)" }}>
                {mr.howItWorks}
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {mr.steps.map((s) => (
                  <div key={s.step} className="step-card p-4 text-center">
                    <div className="step-number mx-auto mb-3">{s.step}</div>
                    <p className="font-display font-bold text-sm mb-1" style={{ color:"var(--text-primary)" }}>
                      {s.title}
                    </p>
                    <p className="text-xs font-body" style={{ color:"var(--text-secondary)" }}>
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}