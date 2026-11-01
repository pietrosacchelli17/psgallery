"use client";
import { useState } from "react";
import type { Photo } from "@/data/types";
import { Picture } from "@/components/ui/Picture";
import { photoRatio } from "@/lib/content";
import { Lightbox } from "./Lightbox";

/** Masonry grid of photographs; clicking opens the keyboard-navigable lightbox. */
export function PhotoGrid({ photos, titles }: { photos: Photo[]; titles: Record<string, string> }) {
  const [open, setOpen] = useState<number | null>(null);
  // Reset if the list changes under an open lightbox.
  const idx = open !== null && open < photos.length ? open : null;
  return (
    <>
      <ul className="columns-1 gap-x-6 sm:columns-2 lg:columns-3 [&>li]:mb-12">
        {photos.map((p, i) => (
          <li key={p.id} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-haspopup="dialog"
              aria-label={`Open ${p.title}`}
              className="group block w-full text-left"
            >
              <Picture src={p.image} alt={p.alt} seed={p.id} quiet ratio={String(photoRatio(p))} className="w-full transition-opacity duration-500 group-hover:opacity-85" />
              <span className="mt-3 flex items-baseline justify-between gap-4 text-[0.85rem] leading-snug">
                <span className="text-ink group-hover:underline group-hover:underline-offset-4">{p.title}</span>
                <span className="shrink-0 text-mute">{[titles[p.series], p.year].filter(Boolean).join(" · ")}</span>
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
