import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink, Container, DemoBadge } from "@/components/ui/bits";
import { Picture } from "@/components/ui/Picture";
import { PhotoGrid } from "@/components/gallery/PhotoGrid";
import { getAllSeries, getPhotosBySeries, getSeries, getSeriesTitles } from "@/lib/content";

export function generateStaticParams() {
  return getAllSeries().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/series/[slug]">): Promise<Metadata> {
  const s = getSeries((await params).slug);
  return s ? { title: s.title, description: s.summary } : {};
}

export default async function SeriesPage({ params }: PageProps<"/series/[slug]">) {
  const s = getSeries((await params).slug);
  if (!s) notFound();
  const photos = getPhotosBySeries(s.slug);
  const all = getAllSeries();
  const i = all.findIndex((x) => x.slug === s.slug);
  const next = all[(i + 1) % all.length];
  const facts: [string, string][] = [
    ["Location", `${s.city}, ${s.country}`],
    ["Period", s.era],
    ...(s.materials ? ([["Materials", s.materials]] as [string, string][]) : []),
    ["Photographs", String(photos.length)],
  ];

  return (
    <article>
      <Container className="pt-8">
        <nav aria-label="Breadcrumb" className="text-xs text-mute">
          <Link href="/series" className="link-u">Series</Link> / {s.title}
        </nav>
        <header className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-3">{s.city}, {s.country} {s.demo && <DemoBadge className="ml-2" />}</p>
            <h1 className="display h1">{s.title}</h1>
          </div>
        </header>
        <Picture src={s.image} alt={`${s.title}: series cover (placeholder)`} seed={s.slug} priority ratio="21 / 9" className="mt-10 w-full" />
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 lg:col-span-4 lg:grid-cols-1">
            {facts.map(([k, v]) => (
              <div key={k} className="border-t border-line pt-3">
                <dt className="eyebrow">{k}</dt>
                <dd className="mt-1">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="lg:col-span-7 lg:col-start-6">
            {s.description.map((p, k) => <p key={k} className={`mb-5 max-w-[62ch] ${k === 0 ? "text-lg" : "text-mute"}`}>{p}</p>)}
          </div>
        </div>
      </Container>
      <Container className="mt-16">
        <h2 className="eyebrow mb-6">Photographs in this series</h2>
        <PhotoGrid photos={photos} titles={getSeriesTitles()} />
      </Container>
      <Container className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
        <ButtonLink href={`/licensing?photo=${encodeURIComponent(s.title)}`} variant="outline">License from this series</ButtonLink>
        <Link href={`/series/${next.slug}`} className="link-u text-sm">Next series: {next.title} →</Link>
      </Container>
    </article>
  );
}
