import type { Metadata } from "next";
import { Container } from "@/components/ui/bits";
import { EnquiryForm } from "@/components/gallery/EnquiryForm";

export const metadata: Metadata = { title: "Licensing", description: "Licensing enquiries for PS Gallery architectural photography." };

const USES = [
  ["Editorial", "Magazines, books, journals and online publications."],
  ["Studios & practice", "Architects and designers presenting their own research or portfolios."],
  ["Exhibition & display", "Galleries, hospitality and workplace interiors."],
  ["Commercial", "Advertising and brand work, assessed project by project."],
];

export default async function Licensing({ searchParams }: PageProps<"/licensing">) {
  const sp = await searchParams;
  const photo = Array.isArray(sp.photo) ? sp.photo[0] : sp.photo;
  return (
    <Container className="pt-12 sm:pt-16">
      <p className="eyebrow mb-3">Licensing</p>
      <h1 className="display h1 max-w-[14ch]">License an <em className="text-stone-deep">image</em></h1>
      <div className="mt-12 grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="max-w-[48ch] text-lg">Tell us about your project and which images you have in mind. We reply with terms for the intended use.</p>
          <ul className="mt-8">
            {USES.map(([t, d]) => (
              <li key={t} className="border-t border-line py-4">
                <p className="font-display text-2xl font-light">{t}</p>
                <p className="text-sm text-mute">{d}</p>
              </li>
            ))}
          </ul>
          <p className="border-t border-line pt-4 text-xs text-mute">Categories are indicative. Fees and licence terms are not set in this prototype.</p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <EnquiryForm kind="licensing" prefill={photo} />
        </div>
      </div>
    </Container>
  );
}
