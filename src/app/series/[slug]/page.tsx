import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/bits";
import { Picture } from "@/components/ui/Picture";
import { PhotoGrid } from "@/components/gallery/PhotoGrid";
import { getAllSeries, getPhotosBySeries, getSeries, getSeriesTitles, ratioNum } from "@/lib/content";

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
        <nav aria-label="Breadcrumb" className="text-[0.85rem] text-mute">
          <Link href="/series" className="link-u">Series</Link> / {s.title}
        </nav>
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6 lg:pt-10">
            <p className="eyebrow mb-4">{s.city}, {s.country}</p>
            <h1 className="display h1">{s.title}</h1>
            <div className="mt-8">
              {s.description.map((p, k) => <p key={k} className={`mb-5 max-w-[52ch] ${k === 0 ? "text-[1.05rem] text-ink" : "text-mute"}`}>{p}</p>)}
            </div>
            <dl className="mt-10 grid max-w-[28rem] grid-cols-2 gap-x-8 gap-y-6">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="eyebrow">{k}</dt>
                  <dd className="mt-1">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Picture src={s.image} alt={`${s.title}, series cover`} seed={s.slug} quiet priority ratio={String(ratioNum(s.image))} className="w-full" />
          </div>
        </div>
      </Container>
      <Container className="mt-24">
        <h2 className="eyebrow mb-8">Photographs in this series</h2>
        <PhotoGrid photos={photos} titles={getSeriesTitles()} />
      </Container>
      <Container className="mb-8 mt-8 flex justify-end">
        <Link href={`/series/${next.slug}`} className="link-u text-[0.9rem]">Next series: {next.title} →</Link>
      </Container>
    </article>
  );
}
