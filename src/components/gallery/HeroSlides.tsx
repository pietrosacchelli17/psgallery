"use client";
import { useEffect, useState } from "react";
import { ArchPlaceholder } from "@/components/ui/ArchPlaceholder";

interface Slide { id: string; image: string; label: string; caption: string }

function Slideimg({ s }: { s: Slide }) {
  const [ok, setOk] = useState(false);
  return (
    <div className="absolute inset-0">
      {!ok && <ArchPlaceholder seed={s.id} label={s.label} />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={s.image} alt="" onLoad={() => setOk(true)} onError={() => setOk(false)} className={`absolute inset-0 h-full w-full object-cover ${ok ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}

/** Slow crossfading hero. Respects reduced motion (static first slide, manual controls). */
export function HeroSlides({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  return (
    <div className="absolute inset-0">
      {slides.map((s, k) => (
        <div key={s.id} className={`slide absolute inset-0 ${k === i ? "on" : ""}`} aria-hidden={k !== i}>
          <Slideimg s={s} />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/55" />
      <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[1500px] items-center justify-between sm:justify-between max-sm:justify-end gap-4 px-5 pb-6 sm:px-8 lg:px-12" aria-label="Hero slideshow controls" role="group">
        <p className="hidden text-[11px] uppercase tracking-[0.16em] text-cream/75 sm:block" aria-live="off">{slides[i].caption}</p>
        <div className="flex items-center gap-2">
          {slides.map((s, k) => (
            <button key={s.id} type="button" onClick={() => { setI(k); setPaused(true); }} aria-label={`Show slide ${k + 1}`} aria-current={k === i} className="grid h-8 w-6 place-items-center">
              <span className={`block h-px transition-all ${k === i ? "w-6 bg-cream" : "w-3 bg-cream/50"}`} />
            </button>
          ))}
          <button type="button" onClick={() => setPaused((p) => !p)} className="ml-2 text-[11px] uppercase tracking-[0.14em] text-cream/75 hover:text-cream" aria-pressed={paused}>
            {paused ? "Play" : "Pause"}
          </button>
        </div>
      </div>
    </div>
  );
}
