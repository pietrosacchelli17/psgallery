import Link from "next/link";
import type { ArchiveFilter } from "@/lib/content";

type Key = keyof ArchiveFilter;

function href(f: ArchiveFilter, key: Key, value?: string) {
  const q = new URLSearchParams();
  (["city", "subject", "year"] as Key[]).forEach((k) => {
    const v = k === key ? value : f[k];
    if (v) q.set(k, v);
  });
  const s = q.toString();
  return `/archive${s ? `?${s}` : ""}`;
}

function Group({ label, k, options, f }: { label: string; k: Key; options: string[]; f: ArchiveFilter }) {
  const chip = "border px-3.5 py-1.5 text-xs tracking-wide transition-colors";
  return (
    <div role="group" aria-label={`Filter by ${label.toLowerCase()}`} className="flex flex-wrap items-center gap-2">
      <span className="eyebrow mr-2 w-16">{label}</span>
      <Link href={href(f, k)} scroll={false} aria-current={!f[k] ? "true" : undefined} className={`${chip} ${!f[k] ? "border-ink bg-ink text-cream" : "border-line hover:border-ink"}`}>All</Link>
      {options.map((o) => (
        <Link key={o} href={href(f, k, o)} scroll={false} aria-current={f[k] === o ? "true" : undefined} className={`${chip} ${f[k] === o ? "border-ink bg-ink text-cream" : "border-line hover:border-ink"}`}>{o}</Link>
      ))}
    </div>
  );
}

export function ArchiveFilters({ filter, options }: { filter: ArchiveFilter; options: { cities: string[]; subjects: string[]; years: string[] } }) {
  return (
    <div className="space-y-3">
      <Group label="City" k="city" options={options.cities} f={filter} />
      <Group label="Subject" k="subject" options={options.subjects} f={filter} />
      <Group label="Year" k="year" options={options.years} f={filter} />
    </div>
  );
}
