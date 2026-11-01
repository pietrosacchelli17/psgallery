import { ButtonLink, Container, SectionHeading } from "@/components/ui/bits";
import { Reveal } from "@/components/ui/Reveal";
import { FullViewer } from "@/components/gallery/FullViewer";
import { SeriesTile } from "@/components/gallery/SeriesTile";
import { SITE, getAllSeries, getFeaturedSeries, getPhotos, getSeries, photoRatio } from "@/lib/content";

export default function Home() {
  const slides = getPhotos().map((p) => {
    const s = getSeries(p.series);
    return {
      id: p.id,
      image: p.image,
      alt: p.alt,
      title: p.title,
      meta: [s?.city, p.year].filter(Boolean).join(" · "),
      href: `/photo/${p.id}`,
      ratio: photoRatio(p),
    };
  });
  const featured = getFeaturedSeries();
  const photos = getPhotos();

  return (
    <>
      <section>
        <Container className="grid items-center gap-12 py-12 lg:min-h-[calc(100svh-6.5rem)] lg:grid-cols-12 lg:gap-8 lg:py-8">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Photography archive</p>
            <h1 className="display max-w-[11ch] text-[clamp(2.4rem,5.2vw,4.6rem)]">Architecture through observation.</h1>
            <p className="mt-8 max-w-[40ch] text-[1.05rem] leading-relaxed text-mute">
              An independent architectural photography and visual archive by Pietro Sacchelli: composition, geometry, light, texture and spatial relationships.
            </p>
            <div className="mt-10"><ButtonLink href="/archive">Browse the archive</ButtonLink></div>
          </div>
          <div className="lg:col-span-7">
            <FullViewer slides={slides} />
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading eyebrow="Featured series" title="Places, studied closely" href="/series" linkLabel="All series" />
          <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 sm:[&>li:nth-child(even)]:mt-14 lg:[&>li:nth-child(even)]:mt-0 lg:[&>li:nth-child(3n+2)]:mt-20">
            {featured.map((s, i) => (
              <li key={s.slug}>
                <Reveal delay={(i % 3) * 90}><SeriesTile s={s} /></Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container className="grid items-end gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow mb-4">The archive</p>
            <h2 className="display h2 max-w-[16ch]">A growing collection.</h2>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
              <ButtonLink href="/archive">Browse the archive</ButtonLink>
              <ButtonLink href={SITE.instagram}>Instagram {SITE.instagramHandle}</ButtonLink>
            </div>
          </div>
          <dl className="grid grid-cols-3 gap-6 md:col-span-5">
            {[
              [photos.length, "Photographs"],
              [getAllSeries().length, "Series"],
              [new Set(getAllSeries().map((s) => s.city)).size, "Cities"],
            ].map(([n, l]) => (
              <div key={l}>
                <dd className="font-display text-[3.2rem] font-light leading-none">{n}</dd>
                <dt className="eyebrow mt-3">{l}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>
    </>
  );
}
