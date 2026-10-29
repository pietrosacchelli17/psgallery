import Link from "next/link";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
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
        <Link href={href} className="link-u pb-1 text-sm tracking-wide">
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
      className={`inline-block border border-current px-1.5 py-[1px] text-[9px] font-medium uppercase tracking-[0.14em] ${className}`}
    >
      Demo content
    </span>
  );
}

export function ButtonLink({
  href, children, variant = "solid", className = "",
}: { href: string; children: React.ReactNode; variant?: "solid" | "outline" | "light"; className?: string }) {
  const styles = {
    solid: "bg-ink text-cream hover:bg-stone-deep",
    outline: "border border-ink text-ink hover:bg-ink hover:text-cream",
    light: "border border-cream/60 text-cream hover:bg-cream hover:text-ink",
  }[variant];
  const cls = `inline-flex items-center gap-2 px-6 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${styles} ${className}`;
  return /^https?:/.test(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
  ) : (
    <Link href={href} className={cls}>{children}</Link>
  );
}

export const RATIO = { landscape: "3 / 2", portrait: "4 / 5", square: "1 / 1" } as const;
export const RATIO_NUM = { landscape: 1.5, portrait: 0.8, square: 1 } as const;
