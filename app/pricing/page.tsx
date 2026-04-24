"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/i18n/LangContext";

const PLAN_PRICES = [
  { monthly: "₺0", yearly: "₺0" },
  { monthly: "₺149", yearly: "₺99" },
  { monthly: "₺499", yearly: "₺349" },
];
const PLAN_COLORS = ["#40D0FF", "#9060FF", "#FF80C0"];
const PLAN_ICON_BGS = [
  "tool-icon-bg-cyan",
  "tool-icon-bg-purple",
  "tool-icon-bg-pink",
];
const POPULAR_IDX = 1;

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
  { top: "42%", left: "85%", delay: "1.9s", size: 7 },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const { t } = useLang();
  const p = t.pricing;

  return (
    <div className="min-h-screen relative overflow-hidden">
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
        {/* ── Hero ── */}
        <section className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="section-badge">
              <span className="dot" />
              {p.badge}
            </span>
          </div>
          <h1
            className="font-display font-black text-5xl md:text-7xl leading-tight mb-6"
            style={{ letterSpacing: "-0.01em" }}
          >
            {p.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="title-gradient">
              {p.title.split(" ").slice(-1)}
            </span>
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body"
            style={{ color: "var(--text-secondary)", fontWeight: 600 }}
          >
            {p.subtitle}
          </p>

          {/* Billing toggle */}
          <div
            className="inline-flex items-center gap-1 p-1 glass"
            style={{ borderRadius: 50 }}
          >
            <button
              onClick={() => setIsYearly(false)}
              className={`font-display font-bold text-xs tracking-wider px-5 py-2.5 ${!isYearly ? "btn-pill-active" : "btn-pill-inactive"}`}
            >
              {p.monthly}
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`font-display font-bold text-xs tracking-wider px-5 py-2.5 ${isYearly ? "btn-pill-active" : "btn-pill-inactive"}`}
            >
              {p.yearly}
              <span
                className="ml-2 px-2 py-0.5 rounded-full text-white"
                style={{
                  background: "linear-gradient(135deg, #40E8B0, #60D0FF)",
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                }}
              >
                {p.discount}
              </span>
            </button>
          </div>
        </section>

        {/* ── Plans Grid ── */}
        <section
          className="max-w-5xl mx-auto mb-24 fade-in-up"
          style={{ opacity: 0, animationDelay: "0.15s" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {p.plans.map((plan, i) => {
              const price = isYearly
                ? PLAN_PRICES[i].yearly
                : PLAN_PRICES[i].monthly;
              const color = PLAN_COLORS[i];
              const popular = i === POPULAR_IDX;
              const billingLabel =
                plan.name === p.plans[0].name
                  ? p.foreverFree
                  : isYearly
                    ? p.yearlyBilling
                    : p.monthlyBilling;

              return (
                <div
                  key={i}
                  className={`relative fade-in-up ${popular ? "md:-mt-4" : ""}`}
                  style={{ opacity: 0, animationDelay: `${0.2 + i * 0.08}s` }}
                >
                  {popular && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                      <div
                        className="px-5 py-1.5 rounded-full font-display font-black text-xs tracking-widest text-white"
                        style={{
                          background:
                            "linear-gradient(135deg, #9060FF, #60C8FF)",
                          boxShadow: "0 4px 20px rgba(120,80,255,0.40)",
                        }}
                      >
                        {p.popular}
                      </div>
                    </div>
                  )}

                  <div
                    className={popular ? "glass-strong p-7" : "glass-card p-7"}
                    style={{
                      borderRadius: 28,
                      ...(popular
                        ? {
                            borderColor: `${color}60`,
                            background:
                              "linear-gradient(145deg, rgba(255,255,255,0.60) 0%, rgba(200,180,255,0.50) 50%, rgba(180,220,255,0.45) 100%)",
                          }
                        : {}),
                    }}
                  >
                    {/* Icon + Name */}
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className={`tool-icon-bg ${PLAN_ICON_BGS[i]} float-gentle`}
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 16,
                          fontSize: 24,
                          animationDelay: `${i * 0.25}s`,
                        }}
                      >
                        {plan.emoji}
                      </div>
                      <div>
                        <div
                          className="font-display font-black text-lg"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {plan.name}
                        </div>
                        <div
                          className="text-xs font-body"
                          style={{
                            color: "var(--text-light)",
                            fontWeight: 600,
                          }}
                        >
                          {plan.sub}
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div
                        className="font-display font-black text-4xl mb-0.5 transition-all duration-300"
                        style={{ color }}
                      >
                        {price}
                      </div>
                      {isYearly && i > 0 && (
                        <div
                          className="text-xs font-body line-through mb-0.5"
                          style={{
                            color: "var(--text-light)",
                            fontWeight: 500,
                          }}
                        >
                          {PLAN_PRICES[i].monthly}
                        </div>
                      )}
                      <div
                        className="text-xs font-body"
                        style={{ color: "var(--text-light)", fontWeight: 600 }}
                      >
                        {billingLabel}
                      </div>
                    </div>

                    <div
                      className="mb-5"
                      style={{
                        height: 1,
                        background: "rgba(255,255,255,0.60)",
                        borderRadius: 1,
                      }}
                    />

                    {/* Features */}
                    <ul className="flex flex-col gap-3 mb-7">
                      {plan.features.map((f, fi) => (
                        <li key={fi} className="flex items-center gap-3">
                          <span
                            className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black"
                            style={
                              f.included
                                ? {
                                    background: `linear-gradient(135deg, ${color}40, ${color}20)`,
                                    color,
                                    border: `1.5px solid ${color}50`,
                                  }
                                : {
                                    background: "rgba(200,190,220,0.25)",
                                    color: "var(--text-light)",
                                    border:
                                      "1.5px solid rgba(200,190,220,0.40)",
                                  }
                            }
                          >
                            {f.included ? "✓" : "✕"}
                          </span>
                          <span
                            className="text-sm font-body"
                            style={{
                              color: f.included
                                ? "var(--text-primary)"
                                : "var(--text-light)",
                              fontWeight: f.included ? 600 : 500,
                              textDecoration: f.included
                                ? "none"
                                : "line-through",
                              textDecorationColor: "rgba(160,150,190,0.40)",
                            }}
                          >
                            {f.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button
                      className={`w-full font-display font-bold tracking-wider py-3.5 text-sm ${popular ? "btn-primary" : "btn-pill-inactive"}`}
                      style={{ borderRadius: 50 }}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Compare Table ── */}
        <section className="max-w-4xl mx-auto mb-24">
          <div
            className="text-center mb-10 fade-in-up"
            style={{ opacity: 0, animationDelay: "0.3s" }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="section-badge">
                <span className="dot" />
                {p.compareTag}
              </span>
            </div>
            <h2
              className="font-display font-black text-3xl md:text-4xl"
              style={{ color: "var(--text-primary)" }}
            >
              {p.comparePlans}
            </h2>
          </div>

          <div
            className="glass-card overflow-hidden fade-in-up"
            style={{ opacity: 0, animationDelay: "0.35s", borderRadius: 28 }}
          >
            {/* Header */}
            <div
              className="grid grid-cols-4 p-4 border-b"
              style={{ borderColor: "rgba(255,255,255,0.50)" }}
            >
              <div
                className="text-xs font-display font-bold uppercase tracking-widest"
                style={{ color: "var(--text-light)" }}
              >
                {p.feature}
              </div>
              {p.plans.map((plan, i) => (
                <div key={i} className="text-center">
                  <span
                    className="font-display font-black text-sm"
                    style={{ color: PLAN_COLORS[i] }}
                  >
                    {plan.name}
                  </span>
                </div>
              ))}
            </div>
            {/* Rows */}
            {p.tableRows.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-4 px-4 py-3.5 border-b transition-all duration-200"
                style={{
                  borderColor: "rgba(255,255,255,0.40)",
                  background:
                    i % 2 === 0 ? "rgba(255,255,255,0.10)" : "transparent",
                }}
              >
                <div
                  className="text-sm font-body flex items-center"
                  style={{ color: "var(--text-primary)", fontWeight: 600 }}
                >
                  {row.label}
                </div>
                {(
                  [row.free, row.pro, row.enterprise] as (boolean | string)[]
                ).map((val, j) => (
                  <div key={j} className="flex justify-center items-center">
                    {typeof val === "boolean" ? (
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                        style={
                          val
                            ? {
                                background: `${PLAN_COLORS[j]}25`,
                                color: PLAN_COLORS[j],
                                border: `1.5px solid ${PLAN_COLORS[j]}50`,
                              }
                            : {
                                background: "rgba(200,190,220,0.20)",
                                color: "var(--text-light)",
                                border: "1.5px solid rgba(200,190,220,0.35)",
                              }
                        }
                      >
                        {val ? "✓" : "✕"}
                      </span>
                    ) : (
                      <span
                        className="text-xs font-body font-bold text-center"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {val}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="max-w-3xl mx-auto mb-24">
          <div
            className="text-center mb-10 fade-in-up"
            style={{ opacity: 0, animationDelay: "0.4s" }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="section-badge">
                <span className="dot" />
                {p.faqTag}
              </span>
            </div>
            <h2
              className="font-display font-black text-3xl md:text-4xl"
              style={{ color: "var(--text-primary)" }}
            >
              {p.faqTitle}
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {p.faqs.map((faq, i) => (
              <div
                key={i}
                className="faq-item p-6 fade-in-up"
                style={{ opacity: 0, animationDelay: `${0.45 + i * 0.07}s` }}
              >
                <div
                  className="font-display font-bold text-base mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {faq.q}
                </div>
                <div
                  className="text-sm font-body leading-relaxed"
                  style={{ color: "var(--text-secondary)", fontWeight: 500 }}
                >
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section
          className="max-w-3xl mx-auto fade-in-up"
          style={{ opacity: 0, animationDelay: "0.85s" }}
        >
          <div
            className="glass-strong text-center px-8 py-12"
            style={{
              borderRadius: 32,
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.55) 0%, rgba(200,180,255,0.40) 50%, rgba(160,220,255,0.35) 100%)",
            }}
          >
            <div
              className="text-4xl mb-4 float-gentle"
              style={{ animationDuration: "5s" }}
            >
              💎
            </div>
            <h3
              className="font-display font-black text-2xl md:text-3xl mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              {p.ctaTitle}
            </h3>
            <p
              className="font-body mb-8 max-w-md mx-auto"
              style={{ color: "var(--text-secondary)", fontWeight: 600 }}
            >
              {p.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                className="btn-primary font-display font-bold tracking-wider px-10 py-4"
                style={{ borderRadius: 50, fontSize: 14 }}
              >
                {p.ctaBtn}
              </button>
              <button
                className="btn-pill-inactive font-display font-bold tracking-wider px-8 py-4"
                style={{ fontSize: 14 }}
              >
                {p.ctaSalesBtn}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
