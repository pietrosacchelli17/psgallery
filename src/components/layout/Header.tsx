"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "./Wordmark";

export const NAV = [
  { href: "/archive", label: "Archive" },
  { href: "/series", label: "Series" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => path === href || path.startsWith(href + "/");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur">
      <div className="mx-auto w-full max-w-[1280px] px-[clamp(1.25rem,4vw,3rem)] pt-1.5">
        <a
          href="https://petrus-atelier-site.vercel.app"
          className="inline-flex items-center gap-2 py-2.5 text-[0.82rem] uppercase tracking-[0.14em] text-ink hover:underline hover:underline-offset-[5px]"
        >
          <span aria-hidden>←</span> Petrus Atelier
        </a>
      </div>
      <div className="mx-auto flex h-[4.25rem] max-w-[1280px] items-center justify-between px-[clamp(1.25rem,4vw,3rem)]">
        <span onClick={() => setOpen(false)}><Wordmark /></span>
        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={active(n.href) ? "page" : undefined}
              className={`link-u py-1 text-[0.8rem] font-normal uppercase tracking-[0.14em] ${active(n.href) ? "text-ink" : "text-mute hover:text-ink"}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 8h18M3 16h18" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="bg-cream md:hidden">
          <ul className="px-5 py-3">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={() => setOpen(false)} className="font-display block py-3 text-3xl font-light">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
