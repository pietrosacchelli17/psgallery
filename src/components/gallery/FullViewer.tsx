"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

interface Slide {
  id: string;
  image: string;
  alt: string;
  title: string;
  meta: string;
  href: string;
}

/**
 * Full-screen, one-image-at-a-time viewer. Click either half, use the arrow keys or swipe to move.
 * Caption bottom-left, counter bottom-centre. Portrait photos are cropped to fill on phones and
 * shown whole on wider screens.
 */
export function FullViewer({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const touchX = useRef<number | null>(null);
  const n = slides.length;
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (n === 0) return null;
  const s = slides[i];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Selected photographs"
      className="on-ink relative isolate h-[calc(100svh-5.75rem)] min-h-[420px] overflow-hidden bg-black text-white"
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {slides.map((sl, k) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={sl.id}
          src={sl.image}
          alt={k === i ? sl.alt : ""}
          aria-hidden={k !== i}
          loading={k === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 md:object-contain ${k === i ? "opacity-100" : "opacity-0"}`}
        />
      ))}

      {/* Click zones: left half back, right half forward */}
      <button type="button" onClick={() => go(-1)} aria-label="Previous photograph" className="absolute inset-y-0 left-0 z-10 w-1/2 cursor-w-resize" />
      <button type="button" onClick={() => go(1)} aria-label="Next photograph" className="absolute inset-y-0 right-0 z-10 w-1/2 cursor-e-resize" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] grid-cols-[1fr_auto_1fr] items-end gap-4 text-xs">
          <Link href={s.href} className="pointer-events-auto justify-self-start link-u">
            <span className="block">{s.title}</span>
            <span className="block text-white/70">{s.meta}</span>
          </Link>
          <p aria-live="polite" className="tabular-nums text-white/80">({i + 1}/{n})</p>
          <span />
        </div>
      </div>
    </section>
  );
}
