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

/** How many photographs fit across the screen: 1 on phones, 2 on laptops, 3 on wide screens. */
const perView = () =>
  window.matchMedia("(min-width: 1536px)").matches ? 3 : window.matchMedia("(min-width: 768px)").matches ? 2 : 1;

/**
 * Full-height photographs side by side, like a filmstrip. Click either half, use the arrow keys or
 * swipe: the whole strip glides across. The caption sits in its own thin strip underneath, so
 * nothing overlaps the photographs.
 */
export function FullViewer({ slides }: { slides: Slide[] }) {
  const n = slides.length;
  const [i, setI] = useState(0);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (d: number) => {
      const max = Math.max(0, n - perView());
      setI((x) => (d > 0 ? (x >= max ? 0 : x + 1) : x <= 0 ? max : x - 1));
    },
    [n],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (n === 0) return null;
  const s = slides[Math.min(i, n - 1)];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Selected photographs"
      className="on-ink relative isolate h-[calc(100svh-5.75rem)] min-h-[460px] overflow-hidden bg-black text-white [--pv:1] md:[--pv:2] 2xl:[--pv:3]"
      style={{ ["--i" as string]: i }}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="absolute inset-x-0 top-0 bottom-[56px] overflow-hidden">
        {/* The strip: every photograph, full height, glides sideways */}
        <div
          className="flex h-full transition-transform duration-[1100ms] ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none"
          style={{ transform: "translateX(calc(var(--i) * -100% / var(--pv)))" }}
        >
          {slides.map((sl, k) => (
            <div key={sl.id} className="h-full shrink-0 basis-[calc(100%/var(--pv))] px-[1px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sl.image} alt={sl.alt} loading={k < 3 ? "eager" : "lazy"} className="h-full w-full object-cover" draggable={false} />
            </div>
          ))}
        </div>

        {/* Click zones: left half back, right half forward */}
        <button type="button" onClick={() => go(-1)} aria-label="Previous photographs" className="absolute inset-y-0 left-0 z-10 w-1/2 cursor-w-resize" />
        <button type="button" onClick={() => go(1)} aria-label="Next photographs" className="absolute inset-y-0 right-0 z-10 w-1/2 cursor-e-resize" />
      </div>

      {/* Caption strip: its own row, never over a photograph */}
      <div className="absolute inset-x-0 bottom-0 z-20 h-[56px] border-t border-white/15 bg-black px-5 sm:px-8 lg:px-12">
        <div className="mx-auto grid h-full max-w-[1500px] grid-cols-[1fr_auto_1fr] items-center gap-4 text-xs">
          <Link href={s.href} className="link-u justify-self-start truncate">
            {s.title}<span className="text-white/60"> · {s.meta}</span>
          </Link>
          <p aria-live="polite" className="tabular-nums text-white/80">({Math.min(i + 1, n)}/{n})</p>
          <span />
        </div>
      </div>
    </section>
  );
}
