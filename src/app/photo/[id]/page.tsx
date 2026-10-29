import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink, Container, DemoBadge } from "@/components/ui/bits";
import { PhotoViewer } from "@/components/gallery/PhotoViewer";
import { getAdjacent, getPhoto, getPhotos, getPhotosBySeries, getSeries, getSeriesTitles } from "@/lib/content";

export function generateStaticParams() {
  return getPhotos().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/photo/[id]">): Promise<Metadata> {
  const p = getPhoto((await params).id);
  return p ? { title: p.title, description: p.alt } : {};
}

export default async function PhotoPage({ params }: PageProps<"/photo/[id]">) {
  const photo = getPhoto((await params).id);
  if (!photo) notFound();
  const series = getSeries(photo.series)!;
  const { prev, next, index, total } = getAdjacent(photo);
  const facts: [string, string][] = [
    ["Series", series.title],
    ["Location", `${series.city}, ${series.country}`],
    ["Subject", photo.subject],
    ["Year", String(photo.year)],
    ["Materials", series.materials],
  ];

  return (
    <Container className="pt-8">
      <nav aria-label="Breadcrumb" className="text-xs text-mute">
        <Link href="/archive" className="link-u">Archive</Link> / <Link href={`/series/${series.slug}`} className="link-u">{series.title}</Link>
      </nav>
      <div className="mt-6 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <PhotoViewer photo={photo} siblings={getPhotosBySeries(series.slug)} prevId={prev.id} nextId={next.id} titles={getSeriesTitles()} />
        </div>
        <aside className="lg:col-span-4">
          <p className="eyebrow mb-3">Image {index} of {total} {photo.demo && <DemoBadge className="ml-2" />}</p>
          <h1 className="display h2">{photo.title}</h1>
          <dl className="mt-8">
            {facts.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 border-t border-line py-3 text-sm">
                <dt className="text-mute">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-mute">Title, year and subject are illustrative until real photographs are added.</p>
          {photo.licensable && (
            <ButtonLink href={`/licensing?photo=${encodeURIComponent(photo.title + " (" + series.title + ")")}`} className="mt-6">License this image</ButtonLink>
          )}
          <div className="mt-8 flex justify-between border-t border-line pt-4 text-sm">
            <Link href={`/photo/${prev.id}`} className="link-u" aria-label={`Previous: ${prev.title}`}>← Previous</Link>
            <Link href={`/photo/${next.id}`} className="link-u" aria-label={`Next: ${next.title}`}>Next →</Link>
          </div>
        </aside>
      </div>
    </Container>
  );
}
