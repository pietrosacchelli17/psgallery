import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { Container } from "../ui/bits";
import { SITE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="on-ink mt-24 bg-black text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <Wordmark className="text-5xl" light />
          <p className="font-display mt-4 max-w-[26ch] text-2xl font-light leading-snug text-white/80">{SITE.tagline}</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 md:col-span-6">
          <div>
            <p className="eyebrow mb-4 text-white/60">Archive</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link className="link-u" href="/archive">Browse photographs</Link></li>
              <li><Link className="link-u" href="/series">Series</Link></li>
              <li><Link className="link-u" href="/licensing">Licensing</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4 text-white/60">Photographer</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link className="link-u" href="/about">About</Link></li>
              <li><Link className="link-u" href="/contact">Contact</Link></li>
              <li><a className="link-u" href={SITE.instagram} rel="noopener noreferrer" target="_blank">Instagram {SITE.instagramHandle}</a></li>
            </ul>
          </div>
        </nav>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-white/15 py-6 text-xs text-white/60 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Pietro Sacchelli · London. Prototype.</p>
        <p>Photographs are placeholders.</p>
      </Container>
    </footer>
  );
}
