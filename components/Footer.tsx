"use client";

import { useLang } from "@/i18n/LangContext";

export default function Footer() {
  const { t } = useLang();

  const socials = [
     {
      label: "Linkedin",
      href: "https://www.linkedin.com/in/yasir-alrawi-12814521a/",
      path: "M20.447 20.452H16.893V14.84c0-1.337-.027-3.059-1.865-3.059-1.867 0-2.153 1.459-2.153 2.965v5.706H9.322V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.369-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.988 1.988 0 1 1 0-3.977 1.988 1.988 0 0 1 0 3.977zM6.915 20.452H3.759V9h3.156v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.222 0h.003z",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/yasir7_23/",
      path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
    },
    {
      label: "YouTube",
      href: "https://youtube.com/channel/UCrmPOr1XGME0wZwMDoi9uwA?si=tWasABCTxS_f3IOb",
      path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    },
   
  ];

  return (
    <footer className="footer-glass mt-8">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p
          className="text-xs font-semibold tracking-wider"
          style={{ color: "var(--text-light)" }}
        >
          {t.footer.rights}
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {socials.map(({ label, href, path }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="transition-all duration-300"
              style={{ color: "var(--text-light)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#A060FF";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-light)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d={path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
