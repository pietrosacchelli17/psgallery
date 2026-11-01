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
  const item = "py-1 text-[0.92rem] transition-colors";
  const on = "text-ink underline decoration-1 underline-offset-[6px]";
  const off = "text-mute hover:text-ink";
  return (
    <div role="group" aria-label={`Filter by ${label.toLowerCase()}`} className="grid gap-x-8 gap-y-1 sm:grid-cols-[5.5rem_1fr]">
      <span className="eyebrow pt-1.5">{label}</span>
      <div className="flex flex-wrap gap-x-6 gap-y-1">
        <Link href={href(f, k)} scroll={false} aria-current={!f[k] ? "true" : undefined} className={`${item} ${!f[k] ? on : off}`}>All</Link>
        {options.map((o) => (
          <Link key={o} href={href(f, k, o)} scroll={false} aria-current={f[k] === o ? "true" : undefined} className={`${item} ${f[k] === o ? on : off}`}>{o}</Link>
        ))}
      </div>
    </div>
  );
}

export function ArchiveFilters({ filter, options }: { filter: ArchiveFilter; options: { cities: string[]; subjects: string[]; years: string[] } }) {
  return (
    <div className="space-y-4">
      <Group label="City" k="city" options={options.cities} f={filter} />
      <Group label="Subject" k="subject" options={options.subjects} f={filter} />
      <Group label="Year" k="year" options={options.years} f={filter} />
    </div>
  );
}
