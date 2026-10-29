import type { Metadata } from "next";
import Link from "next/link";
import { Container, DemoBadge } from "@/components/ui/bits";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { getAllSeries, getPhotosBySeries } from "@/lib/content";

export const metadata: Metadata = { title: "Series", description: "Photographic series from the PS Gallery archive, by city and subject." };

export default function SeriesIndex() {
  return (
    <Container className="pt-12 sm:pt-16">
      <p className="eyebrow mb-3">Series</p>
      <h1 className="display h1 max-w-[14ch]">Projects &amp; <em className="text-stone-deep">places</em></h1>
      <ul className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {getAllSeries().map((s, i) => (
          <li key={s.slug}>
            <Reveal delay={(i % 3) * 80}>
              <Link href={`/series/${s.slug}`} className="group block">
                <Picture src={s.image} alt={`${s.title}: series cover (placeholder)`} seed={s.slug} ratio="4 / 3" className="w-full" />
                <div className="mt-3">
                  <p className="eyebrow">{s.city}, {s.country} · {s.era}</p>
                  <h2 className="font-display mt-1 text-3xl font-light group-hover:underline">{s.title}</h2>
                  <p className="mt-1 text-sm text-mute">{s.summary} · {getPhotosBySeries(s.slug).length} photographs {s.demo && <DemoBadge className="ml-1" />}</p>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </Container>
  );
}
