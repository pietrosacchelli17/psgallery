/**
 * Generated architectural placeholder, deterministic per seed. Replaced
 * automatically when a real photo exists at the item's `image` path.
 */
const TONES = [
  ["#dcdcdc", "#b4b4b4", "#7c7c7c", "#2e2e2e"],
  ["#d6d8d8", "#a9acac", "#6f7272", "#2b2d2d"],
  ["#e2e2e2", "#c0c0c0", "#8a8a8a", "#363636"],
  ["#cfd2d6", "#9ea4ad", "#5f6670", "#23262b"],
  ["#dedede", "#b8b8b8", "#808080", "#2a2a2a"],
];

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

export function ArchPlaceholder({ seed, label }: { seed: string; label?: string }) {
  const h = hash(seed);
  const [sky, a, b, ink] = TONES[h % TONES.length];
  const kind = (h >> 3) % 6;
  const r = (n: number) => ((h >> n) % 100) / 100;
  let shapes: React.ReactNode;

  if (kind === 0) {
    // arcade
    const n = 4 + (h % 3);
    const w = 800 / n;
    shapes = (
      <>
        <rect y="330" width="800" height="270" fill={a} />
        {Array.from({ length: n }, (_, i) => (
          <path key={i} d={`M${i * w + 14} 600 V330 a${w / 2 - 14} ${w / 2 - 14} 0 0 1 ${w - 28} 0 V600 Z`} fill={ink} opacity={0.82 - i * 0.04} />
        ))}
        <rect y="300" width="800" height="30" fill={b} />
      </>
    );
  } else if (kind === 1) {
    // facade grid
    shapes = (
      <>
        <rect x="120" y="60" width="560" height="540" fill={b} />
        {Array.from({ length: 6 }, (_, row) =>
          Array.from({ length: 5 }, (_, col) => (
            <rect key={`${row}${col}`} x={150 + col * 108} y={90 + row * 82} width="78" height="56" fill={(row * 5 + col + h) % 7 === 0 ? sky : ink} opacity="0.85" />
          )),
        )}
      </>
    );
  } else if (kind === 2) {
    // stacked slabs
    shapes = (
      <>
        {Array.from({ length: 5 }, (_, i) => (
          <rect key={i} x={60 + r(i + 2) * 120} y={90 + i * 95} width={420 + r(i + 5) * 280} height="70" fill={i % 2 ? a : b} />
        ))}
        <rect x="0" y="560" width="800" height="40" fill={ink} />
      </>
    );
  } else if (kind === 3) {
    // dome / circle
    shapes = (
      <>
        <rect y="440" width="800" height="160" fill={a} />
        <circle cx="400" cy="440" r="230" fill={b} />
        <circle cx="400" cy="440" r="110" fill={sky} />
        <rect x="360" y="330" width="80" height="270" fill={ink} opacity="0.85" />
      </>
    );
  } else if (kind === 4) {
    // diagonals / stairs
    shapes = (
      <>
        {Array.from({ length: 9 }, (_, i) => (
          <rect key={i} x={i * 90} y={600 - (i + 1) * 58} width={800 - i * 90} height="58" fill={i % 2 ? b : a} />
        ))}
        <path d="M0 600 L800 80" stroke={ink} strokeWidth="3" opacity="0.7" />
      </>
    );
  } else {
    // tower
    shapes = (
      <>
        <rect y="470" width="800" height="130" fill={a} />
        <path d="M330 470 L350 60 H450 L470 470 Z" fill={ink} opacity="0.88" />
        <path d="M330 470 L350 60 H400 V470 Z" fill={b} opacity="0.5" />
        <rect x="120" y="300" width="130" height="170" fill={b} />
        <rect x="560" y="360" width="150" height="110" fill={b} />
      </>
    );
  }

  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label={label ?? "Placeholder image"}>
      <rect width="800" height="600" fill={sky} />
      {shapes}
      <rect width="800" height="600" fill="none" stroke={ink} strokeOpacity="0.08" />
    </svg>
  );
}
