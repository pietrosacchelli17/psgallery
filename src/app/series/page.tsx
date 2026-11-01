import type { Metadata } from "next";
import { Container } from "@/components/ui/bits";
import { Reveal } from "@/components/ui/Reveal";
import { SeriesTile } from "@/components/gallery/SeriesTile";
import { getAllSeries } from "@/lib/content";

export const metadata: Metadata = { title: "Series", description: "Photographic series from the PS Gallery archive, by city and subject." };

export default function SeriesIndex() {
  return (
    <Container className="pb-24 pt-12 sm:pt-20">
      <p className="eyebrow mb-4">Series</p>
      <h1 className="display h1 max-w-[14ch]">Projects and places</h1>
      <ul className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 sm:[&>li:nth-child(even)]:mt-14 lg:[&>li:nth-child(even)]:mt-0 lg:[&>li:nth-child(3n+2)]:mt-20">
        {getAllSeries().map((s, i) => (
          <li key={s.slug}>
            <Reveal delay={(i % 3) * 90}><SeriesTile s={s} /></Reveal>
          </li>
        ))}
      </ul>
    </Container>
  );
}
