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
  /** width / height of the photograph */
  ratio: number;
}

/** Two resting places for a photograph on the pile; they alternate so each print overlaps the last on purpose. */
const SPOTS: [number, number][] = [[0, 8], [24, 0]];
const KEEP = 2;

/**
 * A small pile of prints. The next photograph lands on top, the previous one stays behind it, and every
 * photograph keeps its own proportions. Click, arrow keys or swipe to move on; it also advances by itself.
 */
export function FullViewer({ slides }: { slides: Slide[] }) {
  const n = slides.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  useEffect(() => {
    if (paused || n < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => go(1), 4200);
    return () => clearInterval(t);
  }, [paused, n, go]);

  if (n === 0) return null;
  const s = slides[i];

  return (
    <figure
      aria-roledescription="carousel"
      aria-label="Selected photographs"
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div
        className="relative mx-auto cursor-pointer"
        style={{ width: "min(100%, calc((100svh - 11rem) * 0.98), 820px)", aspectRatio: "1 / 1.02" }}
        onClick={() => go(1)}
      >
        {slides.map((sl, k) => {
          const d = (i - k + n) % n; // 0 = on top, 1 = just behind
          const shown = d < KEEP;
          const [left, top] = SPOTS[k % SPOTS.length];
          // Wide photographs take more of the width, tall ones less, so the pile keeps one visual weight.
          const w = sl.ratio >= 1 ? 76 : 70;
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={sl.id}
              src={sl.image}
              alt={shown ? sl.alt : ""}
              aria-hidden={!shown}
              loading={k < 3 ? "eager" : "lazy"}
              draggable={false}
              className="absolute h-auto transition-[opacity,transform,filter] duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none"
              style={{
                width: `${w}%`,
                aspectRatio: String(sl.ratio),
                left: `${left}%`,
                top: `${top}%`,
                zIndex: shown ? 10 - d : 0,
                opacity: shown ? 1 : 0,
                transform: shown ? "none" : "translateY(16px)",
                filter: d === 0 ? "none" : "brightness(.5)",
              }}
            />
          );
        })}
      </div>

      <figcaption aria-live="polite" className="mx-auto mt-6 flex items-baseline justify-between gap-6 text-[0.85rem]" style={{ width: "min(100%, calc((100svh - 11rem) * 0.98), 820px)" }}>
        <Link href={s.href} className="link-u truncate text-ink">
          {s.title}<span className="text-mute"> · {s.meta}</span>
        </Link>
        <span className="shrink-0 tabular-nums text-mute">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
      </figcaption>
    </figure>
  );
}
