import type { Series } from "./types";

/**
 * DEMO SERIES. Cities, eras and materials come from the original PS Gallery
 * studio mockup (itself sample content). Titles, descriptions and cover
 * images are placeholders: replace with real projects.
 */
const body = (city: string, mat: string) => [
  `A sample series standing in for photographs made in ${city}. The archive is built around composition, geometry, light, texture and spatial relationships; this entry shows how a finished series reads.`,
  `Materials in focus: ${mat.toLowerCase()}. Replace this text with a short, factual note on the buildings, the visit and the approach to photographing them.`,
];

export const series: Series[] = [
  { slug: "florence-stone-and-timber", title: "Florence: stone and timber", city: "Florence", country: "Italy", era: "Historic", materials: "Stone, timber", summary: "Weathered masonry, deep reveals and timber doors.", description: body("Florence", "Stone, timber"), image: "/images/series/florence-stone-and-timber/cover.jpg", featured: true, demo: true },
  { slug: "brussels-concrete-and-glass", title: "Brussels: concrete and glass", city: "Brussels", country: "Belgium", era: "Modernist", materials: "Concrete, glass", summary: "Modernist frames, glazing grids and board-marked concrete.", description: body("Brussels", "Concrete, glass"), image: "/images/series/brussels-concrete-and-glass/cover.jpg", featured: true, demo: true },
  { slug: "porto-granite-and-steel", title: "Porto: granite and steel", city: "Porto", country: "Portugal", era: "Contemporary", materials: "Granite, steel", summary: "Contemporary insertions against a granite city.", description: body("Porto", "Granite, steel"), image: "/images/series/porto-granite-and-steel/cover.jpg", featured: true, demo: true },
  { slug: "tokyo-concrete-and-timber", title: "Tokyo: concrete and timber", city: "Tokyo", country: "Japan", era: "Contemporary", materials: "Concrete, timber", summary: "Dense plots, quiet interiors, light carefully admitted.", description: body("Tokyo", "Concrete, timber"), image: "/images/series/tokyo-concrete-and-timber/cover.jpg", featured: true, demo: true },
  { slug: "berlin-brick-and-steel", title: "Berlin: brick and steel", city: "Berlin", country: "Germany", era: "Modernist", materials: "Brick, steel", summary: "Brick rhythms and exposed steel frames.", description: body("Berlin", "Brick, steel"), image: "/images/series/berlin-brick-and-steel/cover.jpg", featured: false, demo: true },
  { slug: "lisbon-limestone-and-tile", title: "Lisbon: limestone and tile", city: "Lisbon", country: "Portugal", era: "Details", materials: "Limestone, ceramic tile", summary: "Surface details: tile, stone and street-level pattern.", description: body("Lisbon", "Limestone, ceramic tile"), image: "/images/series/lisbon-limestone-and-tile/cover.jpg", featured: false, demo: true },
];
