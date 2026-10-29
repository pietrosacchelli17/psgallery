import Link from "next/link";

export function Wordmark({ className = "text-2xl", light = false }: { className?: string; light?: boolean }) {
  return (
    <Link href="/" aria-label="PS Gallery — home" className={`font-display font-normal tracking-[0.04em] ${className}`}>
      <span className={light ? "text-cream" : "text-ink"}>PS </span>
      <span style={{ color: light ? "var(--color-stone)" : "var(--color-stone-deep)" }}>Gallery</span>
    </Link>
  );
}
