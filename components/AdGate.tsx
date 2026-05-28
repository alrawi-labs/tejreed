"use client";

/**
 * components/AdGate.tsx
 *
 * Kullanım — iki mod:
 *
 * 1) Direkt indirme (blob: veya harici URL):
 *    <AdGate href={result.vocals} filename="vocals.mp3" label="Vokalleri İndir" />
 *
 * 2) Sunucu korumalı indirme (token sistemi):
 *    <AdGate fileId="track1" filename="vocals.mp3" label="Vokalleri İndir" />
 */

import { useState, useEffect, useRef, useCallback } from "react";

interface AdGateProps {
  /** Direkt indirme için URL (blob: veya harici). fileId yoksa zorunlu. */
  href?: string;
  /** Sunucu korumalı dosya ID'si (.env.local'deki FILE_<id>). href yoksa zorunlu. */
  fileId?: string;
  /** İndirme butonunda gösterilecek metin */
  label: string;
  /** İndirilen dosyanın adı */
  filename: string;
  /** Geri sayım süresi (saniye). Varsayılan: 15 */
  countdownSeconds?: number;
}

const AD_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-XXXXXXXXXXXXXXXX";
const AD_SLOT   = process.env.NEXT_PUBLIC_ADSENSE_SLOT   ?? "XXXXXXXXXX";

/** Bir kez AdSense scriptini yükler */
function useAdSenseScript() {
  useEffect(() => {
    const id = "adsense-script";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;
    s.async = true;
    s.crossOrigin = "anonymous";
    document.head.appendChild(s);
  }, []);
}

export default function AdGate({
  href,
  fileId,
  label,
  filename,
  countdownSeconds = 15,
}: AdGateProps) {
  useAdSenseScript();

  const [open, setOpen] = useState(false);
  const [remaining, setRemaining] = useState(countdownSeconds);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const adRef = useRef<HTMLModElement | null>(null);
  const remainingRef = useRef(countdownSeconds);

  /* Sayaç — sekme gizlenince durur, geri gelince devam eder */
  useEffect(() => {
    if (!open) return;
    remainingRef.current = countdownSeconds;
    setRemaining(countdownSeconds);
    setReady(false);
    setPaused(false);

    const start = () => {
      if (timerRef.current) return; // zaten çalışıyor
      timerRef.current = setInterval(() => {
        remainingRef.current -= 1;
        setRemaining(remainingRef.current);
        if (remainingRef.current <= 0) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          setReady(true);
        }
      }, 1000);
    };

    const pause = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    const onVisibility = () => {
      if (document.hidden) {
        pause();
        setPaused(true);
      } else {
        setPaused(false);
        start();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);

    /* Pencere odağını kaybedince de durdur (başka uygulamaya geçiş) */
    const onBlur  = () => { pause(); setPaused(true);  };
    const onFocus = () => { setPaused(false); start(); };
    window.addEventListener("blur",  onBlur);
    window.addEventListener("focus", onFocus);

    start();

    /* AdSense push */
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch {}

    return () => {
      pause();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur",  onBlur);
      window.removeEventListener("focus", onFocus);
    };
  }, [open, countdownSeconds]);

  /* ESC tuşuyla kapat */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const close = () => {
    clearInterval(timerRef.current!);
    setOpen(false);
    setError("");
  };

  /* İndirme işlemi */
  const handleDownload = useCallback(async () => {
    if (!ready) return;

    /* Mod 1: Direkt URL */
    if (href) {
      const a = document.createElement("a");
      a.href = href;
      a.download = filename;
      a.click();
      close();
      return;
    }

    /* Mod 2: Token sistemi */
    if (!fileId) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/token?fileId=${encodeURIComponent(fileId)}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Hata ${res.status}`);
      }
      const { token } = await res.json();

      const a = document.createElement("a");
      a.href = `/api/download?token=${encodeURIComponent(token)}`;
      a.download = filename;
      a.click();
      close();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, [ready, href, fileId, filename]);

  /* ─── Trigger Butonu ──────────────────────────────────────────────────── */
  const trigger = (
    <button
      onClick={() => setOpen(true)}
      className="flex items-center justify-between w-full p-4 rounded-2xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
      style={{
        background: "rgba(255,255,255,0.40)",
        border: "1.5px solid rgba(255,255,255,0.70)",
        cursor: "pointer",
      }}
    >
      <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
        {label}
      </span>
      <span style={{ color: "var(--text-light)" }}>⬇️</span>
    </button>
  );

  /* ─── Modal ───────────────────────────────────────────────────────────── */
  const modal = open ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl p-6 fade-in-up"
        style={{
          background: "rgba(255,255,255,0.18)",
          border: "1.5px solid rgba(255,255,255,0.55)",
          backdropFilter: "blur(28px)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.45)",
        }}
      >
        {/* Kapat */}
        <button
          onClick={close}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all hover:scale-110"
          style={{
            background: "rgba(255,255,255,0.30)",
            border: "1px solid rgba(255,255,255,0.50)",
            color: "var(--text-secondary)",
          }}
          aria-label="Kapat"
        >
          ✕
        </button>

        {/* Başlık */}
        <div className="text-center mb-5">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
            style={{
              background: "var(--grad-button, linear-gradient(135deg,#A060FF,#60D0FF))",
              boxShadow: "0 8px 20px rgba(120,80,255,0.35)",
            }}
          >
            <span style={{ fontSize: 22 }}>🎵</span>
          </div>
          <p
            className="font-display font-bold text-base"
            style={{ color: "var(--text-primary)" }}
          >
            İndirme Hazırlanıyor
          </p>
          <p
            className="text-xs mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            Reklam yüklenirken bekleyin
          </p>
        </div>

        {/* AdSense Alanı */}
        <div
          className="rounded-2xl overflow-hidden mb-5 flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.25)",
            border: "1px solid rgba(255,255,255,0.45)",
            minHeight: 120,
          }}
        >
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: "block", width: "100%", minHeight: 120 }}
            data-ad-client={AD_CLIENT}
            data-ad-slot={AD_SLOT}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>

        {/* Sayaç */}
        {/* Duraklatıldı uyarısı */}
        {paused && !ready && (
          <div
            className="flex items-center gap-2 mb-3 px-3 py-2.5 rounded-2xl"
            style={{
              background: "rgba(255,180,0,0.12)",
              border: "1.5px solid rgba(255,180,0,0.35)",
            }}
          >
            <span style={{ fontSize: 16 }}>⏸️</span>
            <p className="text-xs font-bold" style={{ color: "#F5C518" }}>
              Sekmeyi kapatırsan sayaç duruyor — bu sayfada kal
            </p>
          </div>
        )}

        {!ready && (
          <div className="flex items-center gap-3 mb-4">
            {/* Dairesel sayaç */}
            <div className="relative flex-shrink-0 w-12 h-12">
              <svg viewBox="0 0 48 48" className="w-full h-full -rotate-90">
                <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.20)" strokeWidth="4" />
                <circle
                  cx="24" cy="24" r="20" fill="none"
                  stroke={paused ? "rgba(255,180,0,0.7)" : "url(#cGrad)"}
                  strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 20}`}
                  strokeDashoffset={`${2 * Math.PI * 20 * (remaining / countdownSeconds)}`}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.9s linear" }}
                />
                <defs>
                  <linearGradient id="cGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#A060FF" />
                    <stop offset="100%" stopColor="#60D0FF" />
                  </linearGradient>
                </defs>
              </svg>
              <span
                className="absolute inset-0 flex items-center justify-center text-xs font-black"
                style={{ color: paused ? "#F5C518" : "var(--text-primary)" }}
              >
                {paused ? "⏸" : remaining}
              </span>
            </div>
            <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
              {paused
                ? "Sayaç durakladı — geri dön"
                : `${remaining} saniye sonra indirme butonu aktif olacak`}
            </p>
          </div>
        )}

        {/* Hata mesajı */}
        {error && (
          <p
            className="text-xs mb-3 px-3 py-2 rounded-xl"
            style={{
              color: "#FF6060",
              background: "rgba(255,80,80,0.12)",
              border: "1px solid rgba(255,80,80,0.25)",
            }}
          >
            {error}
          </p>
        )}

        {/* İndir Butonu */}
        <button
          onClick={handleDownload}
          disabled={!ready || loading}
          className="w-full py-3 rounded-2xl text-sm font-display font-bold tracking-wide transition-all duration-300"
          style={
            ready && !loading
              ? {
                  background: "var(--grad-button, linear-gradient(135deg,#A060FF,#60D0FF))",
                  boxShadow: "0 8px 24px rgba(120,80,255,0.40)",
                  color: "#fff",
                  transform: "scale(1)",
                }
              : {
                  background: "rgba(255,255,255,0.18)",
                  border: "1.5px solid rgba(255,255,255,0.30)",
                  color: "rgba(255,255,255,0.40)",
                  cursor: "not-allowed",
                }
          }
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Hazırlanıyor...
            </span>
          ) : ready ? (
            `⬇️ ${filename} İndir`
          ) : (
            `⏳ ${remaining}s bekleyin...`
          )}
        </button>
      </div>
    </div>
  ) : null;

  return (
    <>
      {trigger}
      {modal}
    </>
  );
}