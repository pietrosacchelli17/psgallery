import Link from "next/link";
import { ButtonLink, Container, DemoBadge, SectionHeading } from "@/components/ui/bits";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { FullViewer } from "@/components/gallery/FullViewer";
import { getAllSeries, getFeaturedSeries, getPhotos, getSeries } from "@/lib/content";

export default function Home() {
  const slides = getPhotos().map((p) => {
    const s = getSeries(p.series);
    return {
      id: p.id,
      image: p.image,
      alt: p.alt,
      title: p.title,
      meta: [s?.city, p.architect].filter(Boolean).join(" · "),
      href: `/photo/${p.id}`,
    };
  });
  const featured = getFeaturedSeries();
  const [lead, ...rest] = featured;

  return (
    <>
      <FullViewer slides={slides} />

      <section className="py-20 sm:py-28">
        <Container>
          <p className="eyebrow mb-5">Photography archive</p>
          <h1 className="display max-w-[14ch] text-[clamp(2.6rem,7vw,6rem)]">
            Architecture through <em className="text-stone-deep">observation.</em>
          </h1>
          <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-mute sm:text-lg">
            An independent architectural photography and visual archive by Pietro Sacchelli: composition, geometry, light, texture and spatial relationships.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/archive">Browse the archive</ButtonLink>
            <ButtonLink href="/licensing" variant="outline">Licensing</ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Featured series" title="Places, studied closely" href="/series" linkLabel="All series" />
          <div className="grid gap-5 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <SeriesTile s={lead} ratio="4 / 3" />
            </Reveal>
            <div className="grid gap-5 md:col-span-5">
              {rest.slice(0, 2).map((s, i) => (
                <Reveal key={s.slug} delay={i * 100}><SeriesTile s={s} ratio="16 / 10" /></Reveal>
              ))}
            </div>
            {rest.slice(2).map((s) => (
              <Reveal key={s.slug} className="md:col-span-12"><SeriesTile s={s} ratio="21 / 9" /></Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-paper py-20 sm:py-24">
        <Container className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow mb-3">The archive</p>
            <h2 className="display h2 max-w-[16ch]">A growing <em className="text-stone-deep">collection.</em></h2>
            <p className="mt-6 max-w-[56ch] text-mute">
              Modernist and contemporary architecture, historic buildings, architectural details and natural materials, from different cities and countries. Filter by city, subject or year.
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-4 md:col-span-5">
            {[
              [getPhotos().length, "Photographs"],
              [getAllSeries().length, "Series"],
              [new Set(getAllSeries().map((s) => s.city)).size, "Cities"],
            ].map(([n, l]) => (
              <div key={l} className="border-t border-ink pt-3">
                <dd className="font-display text-5xl font-light">{n}</dd>
                <dt className="eyebrow mt-1">{l}</dt>
              </div>
            ))}
          </dl>
          {getPhotos().some((p) => p.demo) && <p className="text-xs text-mute md:col-span-12">Counts reflect demo content only.</p>}
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <p className="eyebrow mb-3">Licensing</p>
            <h2 className="display h2 max-w-[18ch]">Images for publication, practice and display</h2>
            <p className="mt-5 max-w-[52ch] text-mute">Editorial, studio portfolio and exhibition uses are considered individually. Tell us about the project and we will reply with options.</p>
          </div>
          <div className="md:col-span-5 md:text-right">
            <ButtonLink href="/licensing" variant="outline">Make an enquiry</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}

function SeriesTile({ s, ratio }: { s: ReturnType<typeof getFeaturedSeries>[number]; ratio: string }) {
  return (
    <Link href={`/series/${s.slug}`} className="group block">
      <Picture src={s.image} alt={`${s.title}: series cover (placeholder)`} seed={s.slug} ratio={ratio} className="w-full" />
      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-2xl font-light group-hover:underline">{s.title}</h3>
        <p className="text-xs uppercase tracking-[0.14em] text-mute">{s.country} · {s.era}{s.demo && <> · <DemoBadge /></>}</p>
      </div>
    </Link>
  );
}
