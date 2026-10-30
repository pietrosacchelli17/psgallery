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

/** Where each photograph lands on the pile (left, top as % of the pile), so they overlap like loose prints. */
const SPOTS: [number, number][] = [[0, 4], [24, 0], [8, 20], [26, 15]];
const KEEP = 3;

/**
 * A pile of photographs in the middle of the page. The next one lands on top, the previous ones stay
 * behind it. Click, arrow keys or swipe to move on; it also advances by itself.
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
    const t = setInterval(() => go(1), 3400);
    return () => clearInterval(t);
  }, [paused, n, go]);

  if (n === 0) return null;
  const s = slides[i];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Selected photographs"
      className="on-ink relative isolate flex h-[calc(100svh-5.75rem)] min-h-[460px] flex-col overflow-hidden bg-black text-white"
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
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <div
          className="relative cursor-pointer"
          style={{ width: "min(84vw, calc((100svh - 14rem) / 1.275), 560px)", aspectRatio: "4 / 5.1" }}
          onClick={() => go(1)}
        >
          {slides.map((sl, k) => {
            const d = (i - k + n) % n; // 0 = on top, 1.. = further behind
            const shown = d < KEEP;
            const [left, top] = SPOTS[k % SPOTS.length];
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={sl.id}
                src={sl.image}
                alt={shown ? sl.alt : ""}
                aria-hidden={!shown}
                loading={k < 3 ? "eager" : "lazy"}
                draggable={false}
                className="absolute aspect-[3/4] w-[74%] object-cover transition-[opacity,transform,filter] duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  zIndex: shown ? 10 - d : 0,
                  opacity: shown ? 1 : 0,
                  transform: shown ? "none" : "translateY(18px)",
                  filter: d === 0 ? "none" : "brightness(.55)",
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="h-[56px] shrink-0 border-t border-white/15 bg-black px-5 sm:px-8 lg:px-12">
        <div className="mx-auto grid h-full max-w-[1500px] grid-cols-[1fr_auto_1fr] items-center gap-4 text-xs">
          <Link href={s.href} className="link-u justify-self-start truncate">
            {s.title}<span className="text-white/60"> · {s.meta}</span>
          </Link>
          <p aria-live="polite" className="tabular-nums text-white/80">({i + 1}/{n})</p>
          <span />
        </div>
      </div>
    </section>
  );
}
