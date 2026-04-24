"use client";

import { useEffect, useState, useRef } from "react";
import { useLang } from "@/i18n/LangContext";

const API_BASE = "https://yasir723-tejreed.hf.space";

interface Stats {
  total_requests: number;
  file_uploads_audio: number;
  file_uploads_video: number;
  youtube_attempts: number;
  youtube_download_success: number;
  process_success_audio: number;
  process_success_video: number;
  process_success_youtube: number;
  first_request_at: string | null;
  last_request_at: string | null;
}

function useCountUp(target: number, duration = 1400) {
  const [val, setVal] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (target === 0) return;
    let start: number | null = null;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return val;
}

function StatItem({
  value,
  suffix = "",
  label,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  const count = useCountUp(visible ? value : 0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div className="stat-item">
      <div className="stat-number">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function StatsSection() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLang();

  useEffect(() => {
    fetch(`${API_BASE}/api/stats`)
      .then((r) => r.json())
      .then((d) => {
        setStats(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalSuccess = stats
    ? stats.process_success_audio +
      stats.process_success_video +
      stats.process_success_youtube
    : 0;

  const successRate =
    stats && stats.total_requests > 0
      ? Math.round((totalSuccess / stats.total_requests) * 100)
      : 0;

  return (
    <section className="stats-section fade-in-up">
      <style>{`
        .stats-section {
          margin-top: 2.5rem;
        }

        .stats-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: rgba(255, 255, 255, 0.28);
          border: 1.5px solid rgba(255, 255, 255, 0.65);
          border-radius: 24px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          overflow: hidden;
        }

        .stat-item {
          padding: 24px 16px 20px;
          text-align: center;
          position: relative;
        }

        .stat-item:not(:last-child)::after {
          content: "";
          position: absolute;
          right: 0;
          top: 20%;
          height: 60%;
          width: 1px;
          background: rgba(255, 255, 255, 0.55);
        }

        .stat-number {
          font-family: var(--font-display, sans-serif);
          font-weight: 900;
          font-size: 2rem;
          line-height: 1;
          letter-spacing: -0.03em;
          margin-bottom: 6px;
          background: linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--text-secondary, #6b7280);
        }

        .stats-skeleton {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: rgba(255, 255, 255, 0.20);
          border: 1.5px solid rgba(255, 255, 255, 0.50);
          border-radius: 24px;
          overflow: hidden;
          height: 88px;
        }

        .skel-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 20px 16px;
        }

        .skel-num {
          width: 64px;
          height: 28px;
          border-radius: 6px;
          background: rgba(255,255,255,0.45);
          animation: skshimmer 1.6s ease-in-out infinite;
        }

        .skel-lbl {
          width: 48px;
          height: 10px;
          border-radius: 4px;
          background: rgba(255,255,255,0.30);
          animation: skshimmer 1.6s ease-in-out infinite 0.2s;
        }

        @keyframes skshimmer {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }

        @media (max-width: 480px) {
          .stats-strip,
          .stats-skeleton {
            grid-template-columns: repeat(2, 1fr);
          }
          .stat-item:nth-child(2)::after {
            display: none;
          }
        }
      `}</style>

      {loading ? (
        <div className="stats-skeleton">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="skel-item">
              <div className="skel-num" />
              <div className="skel-lbl" />
            </div>
          ))}
        </div>
      ) : stats ? (
        <div className="stats-strip">
          <StatItem value={totalSuccess}   label={t.stats.vocalsExtracted} delay={0}   />
          <StatItem value={stats.file_uploads_audio + stats.file_uploads_video} label={t.stats.filesUploaded} delay={100} />
          <StatItem value={stats.youtube_attempts}   label={t.stats.youtubeLinks}    delay={200} />
          <StatItem value={successRate} suffix="%" label={t.stats.successRate} delay={300} />
        </div>
      ) : null}
    </section>
  );
}