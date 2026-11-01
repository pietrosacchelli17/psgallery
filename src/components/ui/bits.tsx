import Link from "next/link";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-[clamp(1.25rem,4vw,3rem)] ${className}`}>{children}</div>;
}

export function SectionHeading({
  eyebrow, title, href, linkLabel, className = "",
}: { eyebrow: string; title: string; href?: string; linkLabel?: string; className?: string }) {
  return (
    <div className={`mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-14 ${className}`}>
      <div>
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="display h2 max-w-[18ch]">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="link-u pb-1 text-[0.9rem] tracking-wide">
          {linkLabel ?? "View all"} →
        </Link>
      )}
    </div>
  );
}

export function DemoBadge({ className = "" }: { className?: string }) {
  return (
    <span
      title="Placeholder content. Not yet verified by the photographer."
      className={`inline-block border border-current px-1.5 py-[1px] text-[9px] font-normal uppercase tracking-[0.14em] ${className}`}
    >
      Demo content
    </span>
  );
}

export function ButtonLink({
  href, children, className = "",
}: { href: string; children: React.ReactNode; variant?: "solid" | "outline" | "light"; className?: string }) {
  const cls = `group/btn inline-flex items-center gap-3 border-b border-ink/60 pb-1.5 text-[0.82rem] font-normal uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:border-ink hover:text-mute ${className}`;
  const arrow = <span aria-hidden className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>;
  return /^https?:/.test(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}{arrow}</a>
  ) : (
    <Link href={href} className={cls}>{children}{arrow}</Link>
  );
}

export const RATIO = { landscape: "3 / 2", portrait: "4 / 5", square: "1 / 1" } as const;
export const RATIO_NUM = { landscape: 1.5, portrait: 0.8, square: 1 } as const;
