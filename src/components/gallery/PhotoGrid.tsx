"use client";
import { useState } from "react";
import type { Photo } from "@/data/types";
import { Picture } from "@/components/ui/Picture";
import { RATIO } from "@/components/ui/bits";
import { Lightbox } from "./Lightbox";

/** Masonry grid of photographs; clicking opens the keyboard-navigable lightbox. */
export function PhotoGrid({ photos, titles }: { photos: Photo[]; titles: Record<string, string> }) {
  const [open, setOpen] = useState<number | null>(null);
  // Reset if the list changes under an open lightbox.
  const idx = open !== null && open < photos.length ? open : null;
  return (
    <>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        {photos.map((p, i) => (
          <li key={p.id} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-haspopup="dialog"
              aria-label={`Open ${p.title}`}
              className="group relative block w-full text-left"
            >
              <Picture src={p.image} alt={p.alt} seed={p.id} quiet ratio={RATIO[p.orientation]} className="w-full" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-ink/70 to-transparent p-3 text-cream opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                <span className="text-sm leading-tight">{p.title}</span>
                <span className="shrink-0 text-[10px] uppercase tracking-[0.14em] text-cream/80">{p.year}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      {idx !== null && (
        <Lightbox photos={photos} index={idx} onIndex={setOpen} onClose={() => setOpen(null)} seriesTitle={(s) => titles[s]} />
      )}
    </>
  );
}
