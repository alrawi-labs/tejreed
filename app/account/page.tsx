"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/i18n/LangContext";

const orbs = [
  {
    cls: "orb-purple",
    size: 90,
    top: "5%",
    left: "4%",
    delay: "0s",
    duration: "6s",
  },
  {
    cls: "orb-cyan",
    size: 55,
    top: "12%",
    left: "91%",
    delay: "1.5s",
    duration: "7s",
  },
  {
    cls: "orb-pink",
    size: 60,
    top: "58%",
    left: "2%",
    delay: "0.8s",
    duration: "5.5s",
  },
  {
    cls: "orb-mint",
    size: 38,
    top: "75%",
    left: "90%",
    delay: "2.2s",
    duration: "8s",
  },
  {
    cls: "orb-peach",
    size: 28,
    top: "40%",
    left: "97%",
    delay: "3.0s",
    duration: "7.5s",
  },
  {
    cls: "orb-cyan",
    size: 20,
    top: "85%",
    left: "18%",
    delay: "0.4s",
    duration: "5s",
  },
  {
    cls: "orb-pink",
    size: 18,
    top: "30%",
    left: "50%",
    delay: "2.5s",
    duration: "9s",
  },
];

const sparkles = [
  { top: "10%", left: "22%", delay: "0s", size: 10 },
  { top: "28%", left: "80%", delay: "1.4s", size: 8 },
  { top: "62%", left: "12%", delay: "0.7s", size: 12 },
  { top: "78%", left: "60%", delay: "2.1s", size: 9 },
];

const mockKeys = [
  {
    id: "k1",
    name: "Production Key",
    key: "tj_prod_••••••••••••••••4f2a",
    created: "Apr 12 2025",
    lastUsed: "Today",
    active: true,
  },
  {
    id: "k2",
    name: "Test Key",
    key: "tj_test_••••••••••••••••9c1b",
    created: "Feb 2 2025",
    lastUsed: "3 days ago",
    active: true,
  },
  {
    id: "k3",
    name: "Old Integration",
    key: "tj_prod_••••••••••••••••2e8d",
    created: "Jan 14 2025",
    lastUsed: "2 months ago",
    active: false,
  },
];

export default function AccountPage() {
  const { t } = useLang();
  const a = t.account;

  const [activeSection, setActiveSection] = useState("profile");
  const [editingProfile, setEditingProfile] = useState(false);
  const [name, setName] = useState("Yasir Alrawi");
  const [email, setEmail] = useState("yasir7alrawi23@gmail.com");
  const [showKey, setShowKey] = useState<string | null>(null);
  const [notifications, setNotifications] = useState({
    email: true,
    updates: true,
    usage: false,
    marketing: false,
  });
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [savedBadge, setSavedBadge] = useState(false);

  const handleSave = () => {
    setEditingProfile(false);
    setSavedBadge(true);
    setTimeout(() => setSavedBadge(false), 2500);
  };

  const usageStats = [
    {
      label: "Today",
      value: 2,
      limit: 3,
      unit: "ops",
      color: "#40D0FF",
      pct: 67,
    },
    {
      label: "This Month",
      value: 18,
      limit: 100,
      unit: "ops",
      color: "#9060FF",
      pct: 18,
    },
    {
      label: "API Requests",
      value: 340,
      limit: 1000,
      unit: "req",
      color: "#FF80C0",
      pct: 34,
    },
    {
      label: "Storage",
      value: 1.2,
      limit: 2,
      unit: "GB",
      color: "#40E8B0",
      pct: 60,
    },
  ];

  const recentActivity = [
    {
      emoji: "🎵",
      title: "video_final.mp4",
      action: "Music Remover",
      time: "2 hours ago",
      size: "124 MB",
    },
    {
      emoji: "🎵",
      title: "podcast_ep12.mp3",
      action: "Music Remover",
      time: "Yesterday",
      size: "48 MB",
    },
    {
      emoji: "🎵",
      title: "remix_vocals.wav",
      action: "Music Remover",
      time: "3 days ago",
      size: "86 MB",
    },
    {
      emoji: "🎵",
      title: "interview_raw.m4a",
      action: "Music Remover",
      time: "5 days ago",
      size: "31 MB",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <style>{`
        @keyframes savePopIn { 0% { opacity:0; transform:scale(0.8) translateY(6px);} 60% { transform:scale(1.06) translateY(-1px);} 100% { opacity:1; transform:scale(1) translateY(0);} }
        .save-badge { animation: savePopIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .key-mono { font-family: 'Courier New', monospace; letter-spacing: 0.04em; }
        .toggle-track { width:44px; height:24px; border-radius:12px; position:relative; cursor:pointer; transition:background 0.25s ease; border:1.5px solid rgba(255,255,255,0.70); }
        .toggle-track.on  { background: linear-gradient(135deg, #9060FF, #60C8FF); }
        .toggle-track.off { background: rgba(200,190,220,0.40); }
        .toggle-thumb { width:18px; height:18px; border-radius:50%; background:white; position:absolute; top:2px; transition:left 0.25s cubic-bezier(0.34,1.56,0.64,1); box-shadow:0 2px 6px rgba(100,60,200,0.25); }
        .toggle-track.on  .toggle-thumb { left:22px; }
        .toggle-track.off .toggle-thumb { left:2px; }
        .sidebar-item { display:flex; align-items:center; gap:12px; padding:11px 16px; border-radius:16px; font-family:var(--font-nunito),sans-serif; font-weight:700; font-size:14px; cursor:pointer; transition:all 0.22s ease; color:var(--text-secondary); border:1.5px solid transparent; }
        .sidebar-item:hover { background:rgba(255,255,255,0.50); color:var(--text-primary); }
        .sidebar-item.active { background:linear-gradient(135deg,rgba(160,100,255,0.18),rgba(80,200,255,0.14)); border-color:rgba(160,100,255,0.30); color:var(--text-primary); box-shadow:0 4px 16px rgba(120,80,255,0.12); }
        .sidebar-item .s-emoji { font-size:18px; line-height:1; }
        .input-glass { width:100%; background:rgba(255,255,255,0.55); border:1.5px solid rgba(255,255,255,0.80); border-radius:14px; padding:11px 16px; font-family:var(--font-nunito),sans-serif; font-weight:600; font-size:14px; color:var(--text-primary); outline:none; transition:border-color 0.2s ease,box-shadow 0.2s ease; backdrop-filter:blur(8px); }
        .input-glass:focus { border-color:rgba(160,100,255,0.55); box-shadow:0 0 0 3px rgba(160,100,255,0.12); }
        .input-glass:disabled { background:rgba(255,255,255,0.35); color:var(--text-light); cursor:default; }
        .plan-badge { display:inline-flex; align-items:center; gap:6px; padding:5px 14px; border-radius:50px; font-size:12px; font-weight:800; letter-spacing:0.05em; }
        .account-grid { align-items:stretch; }
        .sidebar-card  { display:flex; flex-direction:column; height:100%; }
        .content-card  { height:100%; }
      `}</style>

      {orbs.map((o, i) => (
        <div
          key={i}
          className={`orb ${o.cls}`}
          style={{
            width: o.size,
            height: o.size,
            top: o.top,
            left: o.left,
            animationDelay: o.delay,
            animationDuration: o.duration,
          }}
        />
      ))}
      {sparkles.map((s, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: `${i * 0.5}s`,
            animationDuration: "3s",
          }}
        />
      ))}

      <Navbar />

      <main className="relative z-10 pt-28 pb-24 px-4">
        {/* Hero */}
        <section className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="section-badge">
              <span className="dot" />
              {a.badge}
            </span>
          </div>
          <h1
            className="font-display font-black text-5xl md:text-7xl leading-tight mb-6"
            style={{ letterSpacing: "-0.01em" }}
          >
            {a.title} <span className="title-gradient">{a.titleGradient}</span>
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto font-body"
            style={{ color: "var(--text-secondary)", fontWeight: 600 }}
          >
            {a.subtitle}
          </p>
          {savedBadge && (
            <div
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white save-badge"
              style={{
                background: "linear-gradient(135deg, #40E8B0, #60D0FF)",
                boxShadow: "0 4px 16px rgba(0,200,140,0.35)",
              }}
            >
              {a.savedBadge}
            </div>
          )}
        </section>

        <div className="max-w-5xl mx-auto">
          <div
            className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 account-grid fade-in-up"
            style={{ animationDelay: "0.15s", opacity: 0 }}
          >
            {/* Sidebar */}
            <aside className="glass-card p-4 sidebar-card">
              <div
                className="flex flex-col items-center gap-2 px-2 py-4 mb-2 border-b"
                style={{ borderColor: "rgba(255,255,255,0.50)" }}
              >
                <div className="relative">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black text-white"
                    style={{
                      background: "linear-gradient(135deg, #9060FF, #60C8FF)",
                      boxShadow: "0 6px 20px rgba(120,80,255,0.40)",
                    }}
                  >
                    YA
                  </div>
                  <div
                    className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #40E8B0, #60D0FF)",
                      fontSize: 9,
                    }}
                  >
                    ✓
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="font-display font-bold text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Yasir A.
                  </div>
                  <div
                    className="plan-badge mt-1"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(144,96,255,0.20), rgba(96,200,255,0.15))",
                      border: "1.5px solid rgba(144,96,255,0.30)",
                      color: "#9060FF",
                    }}
                  >
                    ⚡ Pro
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1 flex-1">
                {a.nav.map((item) => (
                  <button
                    key={item.id}
                    className={`sidebar-item ${activeSection === item.id ? "active" : ""}`}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <span className="s-emoji">{item.emoji}</span>
                    {item.label}
                  </button>
                ))}
              </div>

              <div
                className="mt-auto pt-3 border-t"
                style={{ borderColor: "rgba(255,255,255,0.50)" }}
              >
                <button
                  className="sidebar-item w-full"
                  style={{ color: "#FF8090" }}
                >
                  <span className="s-emoji">🚪</span>
                  {a.logout}
                </button>
              </div>
            </aside>

            {/* Content */}
            <div className="content-card">
              {/* ── PROFILE ── */}
              {activeSection === "profile" && (
                <div className="glass-card p-8 h-full fade-in-up">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2
                        className="font-display font-black text-2xl mb-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {a.profile.title}
                      </h2>
                      <p
                        className="text-sm font-body"
                        style={{ color: "var(--text-light)", fontWeight: 600 }}
                      >
                        {a.profile.subtitle}
                      </p>
                    </div>
                    {!editingProfile ? (
                      <button
                        className="btn-pill-inactive font-display font-bold text-sm px-5 py-2.5"
                        onClick={() => setEditingProfile(true)}
                      >
                        {a.profile.edit}
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          className="btn-pill-inactive font-display font-bold text-sm px-5 py-2.5"
                          onClick={() => setEditingProfile(false)}
                        >
                          {a.profile.cancel}
                        </button>
                        <button
                          className="btn-primary font-display font-bold text-sm px-5 py-2.5"
                          onClick={handleSave}
                        >
                          {a.profile.save}
                        </button>
                      </div>
                    )}
                  </div>

                  <div
                    className="flex items-center gap-6 mb-8 p-5 rounded-2xl"
                    style={{
                      background: "rgba(255,255,255,0.45)",
                      border: "1.5px solid rgba(255,255,255,0.75)",
                    }}
                  >
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-black text-white float-gentle"
                        style={{
                          background:
                            "linear-gradient(135deg, #9060FF, #60C8FF)",
                          boxShadow: "0 8px 28px rgba(120,80,255,0.45)",
                        }}
                      >
                        YA
                      </div>
                    </div>
                    <div>
                      <div
                        className="font-display font-black text-lg mb-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {name}
                      </div>
                      <div
                        className="text-sm font-body mb-3"
                        style={{
                          color: "var(--text-secondary)",
                          fontWeight: 600,
                        }}
                      >
                        {email}
                      </div>
                      {editingProfile && (
                        <button className="btn-pill-inactive font-display font-bold text-xs px-4 py-2">
                          {a.profile.changePhoto}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label
                        className="block text-xs font-display font-bold uppercase tracking-widest mb-2"
                        style={{ color: "var(--text-light)" }}
                      >
                        {a.profile.fullName}
                      </label>
                      <input
                        className="input-glass"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!editingProfile}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs font-display font-bold uppercase tracking-widest mb-2"
                        style={{ color: "var(--text-light)" }}
                      >
                        {a.profile.email}
                      </label>
                      <input
                        className="input-glass"
                        value={email}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!editingProfile}
                      />
                    </div>
                  </div>

                  <div
                    className="mt-8 pt-6 border-t"
                    style={{ borderColor: "rgba(255,255,255,0.50)" }}
                  >
                    <div
                      className="text-xs font-display font-bold uppercase tracking-widest mb-3"
                      style={{ color: "#FF8090" }}
                    >
                      {a.profile.dangerZone}
                    </div>
                    <button
                      className="font-display font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-200"
                      style={{
                        background: "rgba(255,128,144,0.12)",
                        border: "1.5px solid rgba(255,128,144,0.30)",
                        color: "#FF8090",
                      }}
                    >
                      {a.profile.deleteAccount}
                    </button>
                  </div>
                </div>
              )}

              {/* ── PLAN ── */}
              {activeSection === "plan" && (
                <div className="flex flex-col gap-5 h-full fade-in-up">
                  <div
                    className="glass-strong p-7"
                    style={{
                      background:
                        "linear-gradient(145deg, rgba(255,255,255,0.60), rgba(200,180,255,0.45), rgba(160,220,255,0.40))",
                    }}
                  >
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="tool-icon-bg tool-icon-bg-purple float-gentle"
                          style={{ width: 56, height: 56, fontSize: 26 }}
                        >
                          ⚡
                        </div>
                        <div>
                          <div
                            className="text-xs font-display font-bold uppercase tracking-widest mb-1"
                            style={{ color: "var(--text-light)" }}
                          >
                            {a.plan.title}
                          </div>
                          <div
                            className="font-display font-black text-2xl"
                            style={{ color: "#9060FF" }}
                          >
                            Pro Plan
                          </div>
                          <div
                            className="text-sm font-body mt-0.5"
                            style={{
                              color: "var(--text-secondary)",
                              fontWeight: 600,
                            }}
                          >
                            {a.plan.nextRenewal} <strong>May 15 2025</strong>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className="font-display font-black text-3xl"
                          style={{ color: "#9060FF" }}
                        >
                          ₺149
                        </div>
                        <div
                          className="text-xs font-body"
                          style={{
                            color: "var(--text-light)",
                            fontWeight: 600,
                          }}
                        >
                          {a.plan.perMonth}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-7">
                    <h3
                      className="font-display font-black text-lg mb-5"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {a.plan.comparison}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        {
                          name: "Free",
                          emoji: "🌱",
                          price: "₺0",
                          color: "#40D0FF",
                          features: ["3 ops/day", "50 MB", "720p"],
                          current: false,
                        },
                        {
                          name: "Pro",
                          emoji: "⚡",
                          price: "₺149",
                          color: "#9060FF",
                          features: ["100 ops/day", "2 GB", "4K", "API"],
                          current: true,
                        },
                        {
                          name: "Enterprise",
                          emoji: "🏢",
                          price: "₺499",
                          color: "#FF80C0",
                          features: [
                            "Unlimited ops",
                            "Unlimited",
                            "4K+",
                            "API",
                            "24/7",
                          ],
                          current: false,
                        },
                      ].map((p) => (
                        <div
                          key={p.name}
                          className={`p-5 rounded-2xl flex flex-col gap-3 ${p.current ? "glass-strong" : ""}`}
                          style={
                            p.current
                              ? {
                                  borderColor: `${p.color}60`,
                                  background:
                                    "linear-gradient(145deg,rgba(255,255,255,0.60),rgba(200,180,255,0.45),rgba(180,220,255,0.40))",
                                }
                              : {
                                  background: "rgba(255,255,255,0.35)",
                                  border: "1.5px solid rgba(255,255,255,0.60)",
                                  borderRadius: 16,
                                }
                          }
                        >
                          <div className="flex items-center gap-2">
                            <span style={{ fontSize: 20 }}>{p.emoji}</span>
                            <span
                              className="font-display font-black text-base"
                              style={{ color: p.color }}
                            >
                              {p.name}
                            </span>
                            {p.current && (
                              <span
                                className="ml-auto text-xs font-black px-2 py-0.5 rounded-full text-white"
                                style={{
                                  background:
                                    "linear-gradient(135deg,#9060FF,#60C8FF)",
                                  fontSize: 9,
                                }}
                              >
                                {a.plan.title.toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div
                            className="font-display font-black text-2xl"
                            style={{ color: p.color }}
                          >
                            {p.price}
                            <span
                              className="text-sm font-body"
                              style={{
                                color: "var(--text-light)",
                                fontWeight: 600,
                              }}
                            >
                              {a.plan.perMonth}
                            </span>
                          </div>
                          <ul className="flex flex-col gap-1.5">
                            {p.features.map((f) => (
                              <li
                                key={f}
                                className="flex items-center gap-2 text-xs font-body"
                                style={{
                                  color: "var(--text-secondary)",
                                  fontWeight: 600,
                                }}
                              >
                                <span
                                  className="w-4 h-4 rounded-full flex items-center justify-center text-white flex-shrink-0"
                                  style={{ background: p.color, fontSize: 8 }}
                                >
                                  ✓
                                </span>
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card p-7">
                    <h3
                      className="font-display font-black text-lg mb-5"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {a.plan.billing}
                    </h3>
                    <div className="flex flex-col gap-2">
                      {[
                        {
                          date: "Apr 15 2025",
                          amount: "₺149",
                          invoice: "#INV-0042",
                        },
                        {
                          date: "Mar 15 2025",
                          amount: "₺149",
                          invoice: "#INV-0038",
                        },
                        {
                          date: "Feb 15 2025",
                          amount: "₺149",
                          invoice: "#INV-0031",
                        },
                        {
                          date: "Jan 15 2025",
                          amount: "₺149",
                          invoice: "#INV-0024",
                        },
                      ].map((inv, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between px-4 py-3 rounded-xl"
                          style={{
                            background:
                              i % 2 === 0
                                ? "rgba(255,255,255,0.35)"
                                : "transparent",
                            border: "1px solid rgba(255,255,255,0.50)",
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <span
                              className="text-sm font-body"
                              style={{
                                color: "var(--text-secondary)",
                                fontWeight: 600,
                              }}
                            >
                              {inv.date}
                            </span>
                            <span
                              className="text-xs font-mono"
                              style={{ color: "var(--text-light)" }}
                            >
                              {inv.invoice}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span
                              className="font-display font-bold text-sm"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {inv.amount}
                            </span>
                            <span
                              className="text-xs font-black px-2.5 py-1 rounded-full"
                              style={{
                                background: "rgba(64,232,176,0.20)",
                                color: "#20C090",
                                border: "1px solid rgba(64,232,176,0.35)",
                              }}
                            >
                              {a.plan.paid}
                            </span>
                            <button
                              className="text-xs font-bold"
                              style={{ color: "#9060FF" }}
                            >
                              {a.plan.pdfDownload}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── USAGE ── */}
              {activeSection === "usage" && (
                <div className="flex flex-col gap-5 h-full fade-in-up">
                  <div className="glass-card p-7">
                    <h2
                      className="font-display font-black text-2xl mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {a.usage.title}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      {usageStats.map((s, i) => (
                        <div
                          key={i}
                          className="p-5 rounded-2xl"
                          style={{
                            background: "rgba(255,255,255,0.45)",
                            border: "1.5px solid rgba(255,255,255,0.70)",
                          }}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <span
                              className="text-sm font-display font-bold"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {s.label}
                            </span>
                            <span
                              className="font-display font-black text-sm"
                              style={{ color: s.color }}
                            >
                              {s.value} / {s.limit} {s.unit}
                            </span>
                          </div>
                          <div
                            className="rounded-full overflow-hidden mb-1"
                            style={{
                              height: 8,
                              background: "rgba(200,180,255,0.30)",
                              border: "1px solid rgba(255,255,255,0.70)",
                            }}
                          >
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${s.pct}%`,
                                background: `linear-gradient(90deg, ${s.color}CC, ${s.color})`,
                                boxShadow: `0 0 8px ${s.color}66`,
                              }}
                            />
                          </div>
                          <div
                            className="text-right text-xs font-bold"
                            style={{ color: "var(--text-light)" }}
                          >
                            {s.pct}% {a.usage.used}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card p-7">
                    <h3
                      className="font-display font-black text-lg mb-5"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {a.usage.recentTitle}
                    </h3>
                    <div className="flex flex-col gap-2">
                      {recentActivity.map((ac, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 px-4 py-3 rounded-xl"
                          style={{
                            background: "rgba(255,255,255,0.40)",
                            border: "1px solid rgba(255,255,255,0.65)",
                          }}
                        >
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                              background:
                                "linear-gradient(135deg,#D0B0FF,#A080FF)",
                              boxShadow: "0 4px 12px rgba(140,80,255,0.25)",
                            }}
                          >
                            <span style={{ fontSize: 18 }}>{ac.emoji}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className="text-sm font-display font-bold truncate"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {ac.title}
                            </div>
                            <div
                              className="text-xs font-body"
                              style={{
                                color: "var(--text-secondary)",
                                fontWeight: 600,
                              }}
                            >
                              {ac.action}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div
                              className="text-xs font-bold"
                              style={{ color: "var(--text-light)" }}
                            >
                              {ac.time}
                            </div>
                            <div
                              className="text-xs font-body"
                              style={{
                                color: "var(--text-light)",
                                fontWeight: 600,
                              }}
                            >
                              {ac.size}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── API KEYS ── */}
              {activeSection === "api" && (
                <div className="glass-card p-7 h-full fade-in-up">
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                    <div>
                      <h2
                        className="font-display font-black text-2xl mb-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {a.api.title}
                      </h2>
                      <p
                        className="text-sm font-body"
                        style={{ color: "var(--text-light)", fontWeight: 600 }}
                      >
                        {a.api.subtitle}
                      </p>
                    </div>
                    <button
                      className="btn-primary font-display font-bold text-sm px-5 py-2.5"
                      style={{ borderRadius: 50 }}
                    >
                      {a.api.newKey}
                    </button>
                  </div>

                  <div className="flex flex-col gap-3">
                    {mockKeys.map((k) => (
                      <div
                        key={k.id}
                        className="p-5 rounded-2xl"
                        style={{
                          background: "rgba(255,255,255,0.45)",
                          border: "1.5px solid rgba(255,255,255,0.70)",
                        }}
                      >
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{
                                background: k.active
                                  ? "linear-gradient(135deg,rgba(144,96,255,0.25),rgba(96,200,255,0.18))"
                                  : "rgba(200,190,220,0.25)",
                                border: `1.5px solid ${k.active ? "rgba(144,96,255,0.35)" : "rgba(200,190,220,0.40)"}`,
                              }}
                            >
                              <span style={{ fontSize: 16 }}>🔑</span>
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span
                                  className="font-display font-bold text-sm"
                                  style={{ color: "var(--text-primary)" }}
                                >
                                  {k.name}
                                </span>
                                <span
                                  className="text-xs font-black px-2 py-0.5 rounded-full"
                                  style={
                                    k.active
                                      ? {
                                          background: "rgba(64,232,176,0.20)",
                                          color: "#20C090",
                                          border:
                                            "1px solid rgba(64,232,176,0.35)",
                                        }
                                      : {
                                          background: "rgba(200,180,220,0.25)",
                                          color: "var(--text-light)",
                                          border:
                                            "1px solid rgba(200,180,220,0.40)",
                                        }
                                  }
                                >
                                  {k.active ? a.api.active : a.api.inactive}
                                </span>
                              </div>
                              <div
                                className="key-mono text-xs mt-1 truncate"
                                style={{ color: "var(--text-secondary)" }}
                              >
                                {showKey === k.id
                                  ? k.key.replace(/•/g, "x")
                                  : k.key}
                              </div>
                              <div
                                className="text-xs font-body mt-0.5"
                                style={{
                                  color: "var(--text-light)",
                                  fontWeight: 600,
                                }}
                              >
                                {a.api.created} {k.created} · {a.api.lastUsed}{" "}
                                {k.lastUsed}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={() =>
                                setShowKey(showKey === k.id ? null : k.id)
                              }
                              className="btn-pill-inactive font-display font-bold text-xs px-3 py-2"
                            >
                              {showKey === k.id ? a.api.hide : a.api.show}
                            </button>
                            <button className="btn-pill-inactive font-display font-bold text-xs px-3 py-2">
                              {a.api.copy}
                            </button>
                            <button
                              className="font-display font-bold text-xs px-3 py-2 rounded-full transition-all duration-200"
                              style={{
                                background: "rgba(255,128,144,0.12)",
                                border: "1.5px solid rgba(255,128,144,0.30)",
                                color: "#FF8090",
                              }}
                            >
                              🗑
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    className="mt-5 p-4 rounded-xl flex items-start gap-3"
                    style={{
                      background: "rgba(160,100,255,0.08)",
                      border: "1.5px solid rgba(160,100,255,0.20)",
                    }}
                  >
                    <span style={{ fontSize: 18 }}>💡</span>
                    <p
                      className="text-xs font-body leading-relaxed"
                      style={{
                        color: "var(--text-secondary)",
                        fontWeight: 600,
                      }}
                    >
                      {a.api.tip}
                    </p>
                  </div>
                </div>
              )}

              {/* ── SECURITY ── */}
              {activeSection === "security" && (
                <div className="flex flex-col gap-5 h-full fade-in-up">
                  <div className="glass-card p-7">
                    <h2
                      className="font-display font-black text-2xl mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {a.security.title}
                    </h2>
                    <p
                      className="text-sm font-body mb-6"
                      style={{ color: "var(--text-light)", fontWeight: 600 }}
                    >
                      {a.security.subtitle}
                    </p>

                    <div
                      className="mb-6 p-5 rounded-2xl"
                      style={{
                        background: "rgba(255,255,255,0.45)",
                        border: "1.5px solid rgba(255,255,255,0.70)",
                      }}
                    >
                      <div
                        className="font-display font-bold text-base mb-4"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {a.security.changePassword}
                      </div>
                      <div className="flex flex-col gap-3">
                        {[
                          a.security.currentPassword,
                          a.security.newPassword,
                          a.security.confirmPassword,
                        ].map((label) => (
                          <div key={label}>
                            <label
                              className="block text-xs font-display font-bold uppercase tracking-widest mb-1.5"
                              style={{ color: "var(--text-light)" }}
                            >
                              {label}
                            </label>
                            <input
                              type="password"
                              className="input-glass"
                              placeholder="••••••••"
                            />
                          </div>
                        ))}
                        <button
                          className="btn-primary font-display font-bold text-sm px-6 py-2.5 w-fit mt-1"
                          style={{ borderRadius: 50 }}
                        >
                          {a.security.updatePassword}
                        </button>
                      </div>
                    </div>

                    <div
                      className="p-5 rounded-2xl"
                      style={{
                        background: "rgba(255,255,255,0.45)",
                        border: "1.5px solid rgba(255,255,255,0.70)",
                      }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <span style={{ fontSize: 24 }}>🛡️</span>
                          <div>
                            <div
                              className="font-display font-bold text-base mb-0.5"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {a.security.twoFA}
                            </div>
                            <div
                              className="text-xs font-body leading-relaxed"
                              style={{
                                color: "var(--text-secondary)",
                                fontWeight: 600,
                              }}
                            >
                              {a.security.twoFADesc}
                              {twoFAEnabled
                                ? a.security.twoFAOn
                                : a.security.twoFAOff}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`toggle-track ${twoFAEnabled ? "on" : "off"}`}
                          onClick={() => setTwoFAEnabled(!twoFAEnabled)}
                        >
                          <div className="toggle-thumb" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-7">
                    <h3
                      className="font-display font-black text-lg mb-5"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {a.security.activeSessions}
                    </h3>
                    <div className="flex flex-col gap-3">
                      {[
                        {
                          device: "MacBook Pro",
                          os: "macOS 14 · Chrome 123",
                          location: "Istanbul, TR",
                          current: true,
                          time: "Now",
                        },
                        {
                          device: "iPhone 15",
                          os: "iOS 17 · Safari",
                          location: "Istanbul, TR",
                          current: false,
                          time: "3 hours ago",
                        },
                        {
                          device: "Windows PC",
                          os: "Windows 11 · Firefox",
                          location: "Ankara, TR",
                          current: false,
                          time: "2 days ago",
                        },
                      ].map((s, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between gap-3 p-4 rounded-xl"
                          style={{
                            background: "rgba(255,255,255,0.40)",
                            border: "1px solid rgba(255,255,255,0.65)",
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span style={{ fontSize: 22 }}>
                              {s.device.includes("iPhone")
                                ? "📱"
                                : s.device.includes("Mac")
                                  ? "💻"
                                  : "🖥️"}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span
                                  className="font-display font-bold text-sm"
                                  style={{ color: "var(--text-primary)" }}
                                >
                                  {s.device}
                                </span>
                                {s.current && (
                                  <span
                                    className="text-xs font-black px-2 py-0.5 rounded-full"
                                    style={{
                                      background: "rgba(64,232,176,0.20)",
                                      color: "#20C090",
                                      border: "1px solid rgba(64,232,176,0.35)",
                                    }}
                                  >
                                    {a.security.thisDevice}
                                  </span>
                                )}
                              </div>
                              <div
                                className="text-xs font-body"
                                style={{
                                  color: "var(--text-light)",
                                  fontWeight: 600,
                                }}
                              >
                                {s.os} · {s.location}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className="text-xs font-bold"
                              style={{ color: "var(--text-light)" }}
                            >
                              {s.time}
                            </span>
                            {!s.current && (
                              <button
                                className="text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-200"
                                style={{
                                  background: "rgba(255,128,144,0.12)",
                                  border: "1.5px solid rgba(255,128,144,0.30)",
                                  color: "#FF8090",
                                }}
                              >
                                {a.security.terminate}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── NOTIFICATIONS ── */}
              {activeSection === "notifications" && (
                <div className="glass-card p-7 h-full fade-in-up">
                  <h2
                    className="font-display font-black text-2xl mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {a.notifications.title}
                  </h2>
                  <p
                    className="text-sm font-body mb-7"
                    style={{ color: "var(--text-light)", fontWeight: 600 }}
                  >
                    {a.notifications.subtitle}
                  </p>

                  <div className="flex flex-col gap-4">
                    {a.notifications.items.map((n) => (
                      <div
                        key={n.key}
                        className="flex items-center justify-between gap-4 p-5 rounded-2xl"
                        style={{
                          background: "rgba(255,255,255,0.45)",
                          border: "1.5px solid rgba(255,255,255,0.70)",
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <span style={{ fontSize: 24 }}>{n.emoji}</span>
                          <div>
                            <div
                              className="font-display font-bold text-sm mb-0.5"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {n.title}
                            </div>
                            <div
                              className="text-xs font-body"
                              style={{
                                color: "var(--text-secondary)",
                                fontWeight: 600,
                              }}
                            >
                              {n.desc}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`toggle-track ${notifications[n.key as keyof typeof notifications] ? "on" : "off"}`}
                          onClick={() =>
                            setNotifications((prev) => ({
                              ...prev,
                              [n.key]:
                                !prev[n.key as keyof typeof notifications],
                            }))
                          }
                        >
                          <div className="toggle-thumb" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    className="btn-primary font-display font-bold text-sm px-8 py-3 mt-8 w-full"
                    style={{ borderRadius: 50 }}
                    onClick={() => {
                      setSavedBadge(true);
                      setTimeout(() => setSavedBadge(false), 2500);
                    }}
                  >
                    {a.notifications.saveBtn}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
