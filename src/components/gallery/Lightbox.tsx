"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/data/types";
import { ArchPlaceholder } from "@/components/ui/ArchPlaceholder";
import { RATIO, RATIO_NUM } from "@/components/ui/bits";

function Frame({ photo }: { photo: Photo }) {
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const ratio = RATIO_NUM[photo.orientation];
  return (
    <div
      className="relative overflow-hidden bg-ink/40"
      style={{ aspectRatio: RATIO[photo.orientation], width: `min(100%, calc(70vh * ${ratio}))` }}
    >
      {state !== "ok" && <ArchPlaceholder seed={photo.id} label={photo.alt} />}
      {state !== "error" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo.image}
          alt={photo.alt}
          onLoad={() => setState("ok")}
          onError={() => setState("error")}
          className={`absolute inset-0 h-full w-full object-contain ${state === "ok" ? "opacity-100" : "opacity-0"}`}
        />
      )}
      {state !== "ok" && (
        <span className="absolute bottom-2 left-3 text-[10px] uppercase tracking-[0.14em] text-ink/60">Placeholder image</span>
      )}
    </div>
  );
}

interface Props {
  photos: Photo[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
  seriesTitle?: (slug: string) => string | undefined;
}

export function Lightbox({ photos, index, onIndex, onClose, seriesTitle }: Props) {
  const photo = photos[index];
  const dialog = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const n = photos.length;
  const go = useCallback((d: number) => onIndex((index + d + n) % n), [index, n, onIndex]);

  // Lock scroll, restore focus on close.
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    document.body.classList.add("lock");
    dialog.current?.focus();
    return () => {
      document.body.classList.remove("lock");
      prev?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Home") onIndex(0);
      else if (e.key === "End") onIndex(n - 1);
      else if (e.key === "Tab") {
        const f = dialog.current?.querySelectorAll<HTMLElement>("a[href], button");
        if (!f || !f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose, onIndex, n]);

  // Warm the neighbours.
  useEffect(() => {
    [photos[(index + 1) % n], photos[(index - 1 + n) % n]].forEach((p) => { const i = new Image(); i.src = p.image; });
  }, [index, n, photos]);

  const btn = "grid h-11 w-11 place-items-center border border-cream/30 text-cream transition-colors hover:bg-cream hover:text-ink";

  return (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.title}, image ${index + 1} of ${n}`}
      tabIndex={-1}
      className="on-ink fixed inset-0 z-[90] flex flex-col bg-ink/95 text-cream outline-none"
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-8">
        <p className="text-xs tracking-[0.14em] text-cream/70" aria-live="polite">{index + 1} / {n}</p>
        <button type="button" onClick={onClose} className={btn} aria-label="Close (Esc)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M5 5l14 14M19 5L5 19" /></svg>
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
        {n > 1 && (
          <button type="button" onClick={() => go(-1)} className={`${btn} absolute left-2 top-1/2 -translate-y-1/2 sm:left-6`} aria-label="Previous image (←)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M15 5l-7 7 7 7" /></svg>
          </button>
        )}
        <Frame key={photo.id} photo={photo} />
        {n > 1 && (
          <button type="button" onClick={() => go(1)} className={`${btn} absolute right-2 top-1/2 -translate-y-1/2 sm:right-6`} aria-label="Next image (→)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M9 5l7 7-7 7" /></svg>
          </button>
        )}
      </div>
      <div className="flex flex-wrap items-end justify-between gap-3 px-4 py-4 sm:px-8">
        <div>
          <p className="font-display text-2xl font-light">{photo.title}</p>
          <p className="text-xs text-cream/65">
            {seriesTitle?.(photo.series)} · {photo.subject}{photo.year ? ` · ${photo.year}` : ""}
            {photo.demo && <span className="ml-2 border border-cream/40 px-1.5 text-[9px] uppercase tracking-[0.14em]">Demo</span>}
          </p>
        </div>
        <Link href={`/photo/${photo.id}`} onClick={onClose} className="link-u text-sm">Image details →</Link>
      </div>
    </div>
  );
}
