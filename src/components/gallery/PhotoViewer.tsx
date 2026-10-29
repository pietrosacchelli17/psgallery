"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Photo } from "@/data/types";
import { Picture } from "@/components/ui/Picture";
import { RATIO } from "@/components/ui/bits";
import { Lightbox } from "./Lightbox";

/** Large image with ←/→ to move through the series, Enter/F to open the lightbox. */
export function PhotoViewer({ photo, siblings, prevId, nextId, titles }: { photo: Photo; siblings: Photo[]; prevId: string; nextId: string; titles: Record<string, string> }) {
  const router = useRouter();
  const [open, setOpen] = useState<number | null>(null);
  const start = siblings.findIndex((p) => p.id === photo.id);

  useEffect(() => {
    if (open !== null) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select")) return;
      if (e.key === "ArrowLeft") router.push(`/photo/${prevId}`);
      else if (e.key === "ArrowRight") router.push(`/photo/${nextId}`);
      else if (e.key === "f" || e.key === "F") setOpen(start);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, prevId, nextId, router, start]);

  return (
    <>
      <button type="button" onClick={() => setOpen(start)} aria-haspopup="dialog" aria-label={`View ${photo.title} full screen`} className="group block w-full cursor-zoom-in">
        <div className="mx-auto" style={{ width: `min(100%, calc(78vh * ${photo.orientation === "landscape" ? 1.5 : photo.orientation === "portrait" ? 0.8 : 1}))` }}>
          <Picture src={photo.image} alt={photo.alt} seed={photo.id} priority ratio={RATIO[photo.orientation]} className="w-full" />
        </div>
      </button>
      <p className="mt-3 text-center text-xs text-mute">← → previous / next · F full screen</p>
      {open !== null && <Lightbox photos={siblings} index={open} onIndex={setOpen} onClose={() => setOpen(null)} seriesTitle={(s) => titles[s]} />}
    </>
  );
}
