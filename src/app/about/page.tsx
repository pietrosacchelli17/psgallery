import type { Metadata } from "next";
import { ButtonLink, Container } from "@/components/ui/bits";
import { SITE } from "@/lib/content";

export const metadata: Metadata = { title: "About", description: "About Pietro Sacchelli and the PS Gallery architectural photography archive." };

export default function About() {
  return (
    <Container className="pt-12 sm:pt-16">
      <p className="eyebrow mb-3">About the archive</p>
      <h1 className="display h1 max-w-[14ch]">A growing <em className="text-stone-deep">collection.</em></h1>
      <div className="mt-12 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="max-w-[56ch] text-xl leading-snug sm:text-2xl">Founded by Pietro Sacchelli, an Italian architecture graduate based in London.</p>
          <p className="mt-6 max-w-[62ch] text-mute">
            The archive includes modernist and contemporary architecture, historic buildings, architectural details, natural materials and, occasionally, landscape and travel photography. It is a personal collection of architectural observations from different cities and countries.
          </p>
          <p className="mt-4 max-w-[62ch] text-mute">
            Each photograph looks for composition, geometry, light, texture and spatial relationships.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/archive">Browse the archive</ButtonLink>
            <ButtonLink href={SITE.instagram} variant="outline">Instagram {SITE.instagramHandle}</ButtonLink>
          </div>
        </div>
      </div>
    </Container>
  );
}
