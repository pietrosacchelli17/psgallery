import type { Metadata } from "next";
import { ButtonLink, Container } from "@/components/ui/bits";
import { EnquiryForm } from "@/components/gallery/EnquiryForm";
import { SITE } from "@/lib/content";

export const metadata: Metadata = { title: "Contact", description: "Contact Pietro Sacchelli at PS Gallery." };

export default function Contact() {
  return (
    <Container className="pt-12 sm:pt-16">
      <p className="eyebrow mb-3">Contact</p>
      <h1 className="display h1 max-w-[14ch]">Get in <em className="text-stone-deep">touch</em></h1>
      <div className="mt-12 grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="max-w-[44ch] text-lg">Questions about the archive, prints, collaborations or commissions: send a message or find PS Gallery on Instagram.</p>
          <dl className="mt-8 text-sm">
            <div className="border-t border-line py-3"><dt className="eyebrow">Based in</dt><dd className="mt-1">London</dd></div>
            <div className="border-t border-line py-3"><dt className="eyebrow">Instagram</dt><dd className="mt-1"><a className="link-u" href={SITE.instagram} target="_blank" rel="noopener noreferrer">{SITE.instagramHandle}</a></dd></div>
            <div className="border-t border-line py-3"><dt className="eyebrow">Email</dt><dd className="mt-1 text-mute">{SITE.email ?? "To be added (not yet set in the studio site)"}</dd></div>
          </dl>
          <div className="mt-6"><ButtonLink href={SITE.instagram} variant="outline">Open Instagram</ButtonLink></div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7"><EnquiryForm /></div>
      </div>
    </Container>
  );
}
