import type { Photo } from "./types";

/**
 * DEMO PHOTOGRAPHS. Titles, subjects, years and alt text are illustrative
 * placeholders (no real photographs are included yet). To go live, drop real
 * JPEGs at each `image` path under /public and edit the metadata.
 */
const p = (series: string, n: number, title: string, subject: Photo["subject"], year: number, orientation: Photo["orientation"]): Photo => ({
  id: `${series}-${String(n).padStart(2, "0")}`,
  series,
  title,
  alt: `${title} (placeholder: describe the real photograph here)`,
  subject,
  year,
  orientation,
  image: `/images/series/${series}/${String(n).padStart(2, "0")}.jpg`,
  licensable: true,
  demo: true,
});

export const photos: Photo[] = [
  p("florence-stone-and-timber", 1, "Arcade at midday", "Structure", 2023, "landscape"),
  p("florence-stone-and-timber", 2, "Rusticated wall", "Materials", 2023, "portrait"),
  p("florence-stone-and-timber", 3, "Timber door, deep reveal", "Details", 2023, "portrait"),
  p("florence-stone-and-timber", 4, "Courtyard stair", "Interiors", 2023, "square"),
  p("florence-stone-and-timber", 5, "Cornice shadow", "Light & shadow", 2023, "landscape"),
  p("brussels-concrete-and-glass", 1, "Glazing grid", "Facades", 2024, "landscape"),
  p("brussels-concrete-and-glass", 2, "Board-marked concrete", "Materials", 2024, "square"),
  p("brussels-concrete-and-glass", 3, "Stair core", "Structure", 2024, "portrait"),
  p("brussels-concrete-and-glass", 4, "Lobby, late light", "Interiors", 2024, "landscape"),
  p("brussels-concrete-and-glass", 5, "Curtain wall detail", "Details", 2024, "portrait"),
  p("porto-granite-and-steel", 1, "Steel canopy", "Structure", 2022, "landscape"),
  p("porto-granite-and-steel", 2, "Granite steps", "Materials", 2022, "portrait"),
  p("porto-granite-and-steel", 3, "Threshold", "Details", 2022, "square"),
  p("porto-granite-and-steel", 4, "Facade against sky", "Facades", 2022, "portrait"),
  p("porto-granite-and-steel", 5, "Hard shadow", "Light & shadow", 2022, "landscape"),
  p("tokyo-concrete-and-timber", 1, "Narrow elevation", "Facades", 2025, "portrait"),
  p("tokyo-concrete-and-timber", 2, "Timber slat screen", "Materials", 2025, "square"),
  p("tokyo-concrete-and-timber", 3, "Interior, single opening", "Interiors", 2025, "landscape"),
  p("tokyo-concrete-and-timber", 4, "Roof edge", "Details", 2025, "landscape"),
  p("tokyo-concrete-and-timber", 5, "Light well", "Light & shadow", 2025, "portrait"),
  p("berlin-brick-and-steel", 1, "Brick rhythm", "Facades", 2024, "landscape"),
  p("berlin-brick-and-steel", 2, "Exposed frame", "Structure", 2024, "portrait"),
  p("berlin-brick-and-steel", 3, "Bond pattern", "Materials", 2024, "square"),
  p("berlin-brick-and-steel", 4, "Window reveal", "Details", 2024, "portrait"),
  p("lisbon-limestone-and-tile", 1, "Tile field", "Materials", 2023, "square"),
  p("lisbon-limestone-and-tile", 2, "Limestone corner", "Details", 2023, "portrait"),
  p("lisbon-limestone-and-tile", 3, "Street facade", "Facades", 2023, "landscape"),
  p("lisbon-limestone-and-tile", 4, "Doorway, afternoon", "Light & shadow", 2023, "portrait"),
  p("lisbon-limestone-and-tile", 5, "Stair and rail", "Structure", 2023, "landscape"),
];
