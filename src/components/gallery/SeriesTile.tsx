import Link from "next/link";
import type { Series } from "@/data/types";
import { Picture } from "@/components/ui/Picture";
import { getPhotosBySeries } from "@/lib/content";

/** One series: a square cover so the grid stays balanced, then name, place and count. */
export function SeriesTile({ s }: { s: Series }) {
  const count = getPhotosBySeries(s.slug).length;
  return (
    <Link href={`/series/${s.slug}`} className="group block">
      <Picture src={s.image} alt={`${s.title}, series cover`} seed={s.slug} quiet ratio="1 / 1" className="w-full" />
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-[1.5rem] font-light leading-tight group-hover:underline group-hover:underline-offset-4">{s.title}</h3>
        <p className="shrink-0 text-[0.85rem] tabular-nums text-mute">{String(count).padStart(2, "0")}</p>
      </div>
      <p className="mt-1 text-[0.85rem] text-mute">{s.city}, {s.country}</p>
    </Link>
  );
}
