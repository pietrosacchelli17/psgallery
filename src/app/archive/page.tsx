import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/bits";
import { ArchiveFilters } from "@/components/gallery/ArchiveFilters";
import { PhotoGrid } from "@/components/gallery/PhotoGrid";
import { filterPhotos, getFilterOptions, getSeriesTitles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Archive",
  description: "Browse the PS Gallery archive of architectural photography by city, subject and year.",
};

export default async function ArchivePage({ searchParams }: PageProps<"/archive">) {
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const filter = { city: one(sp.city), subject: one(sp.subject), year: one(sp.year) };
  const photos = filterPhotos(filter);
  const active = Object.values(filter).some(Boolean);

  return (
    <Container className="pb-8 pt-12 sm:pt-16">
      <p className="eyebrow mb-3">Archive</p>
      <h1 className="display h1 max-w-[14ch]">Browse the <em className="text-stone-deep">archive</em></h1>
      <div className="mt-10"><ArchiveFilters filter={filter} options={getFilterOptions()} /></div>
      <div className="mb-6 mt-8 flex items-center justify-between border-t border-line pt-4 text-sm text-mute" aria-live="polite">
        <p>{photos.length} photograph{photos.length === 1 ? "" : "s"} · demo content</p>
        {active && <Link href="/archive" className="link-u text-ink">Clear filters</Link>}
      </div>
      {photos.length ? (
        <PhotoGrid key={JSON.stringify(filter)} photos={photos} titles={getSeriesTitles()} />
      ) : (
        <div className="border border-line py-20 text-center">
          <p className="font-display text-3xl font-light">Nothing matches those filters.</p>
          <Link href="/archive" className="link-u mt-4 inline-block text-sm">Clear filters</Link>
        </div>
      )}
    </Container>
  );
}
