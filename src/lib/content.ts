/**
 * Content access layer. Every page reads through these functions, so swapping
 * local files for a database or CMS later means changing only this module
 * (and making the functions async).
 */
import { series } from "@/data/series";
import { photos } from "@/data/photos";
import { DIMS } from "@/data/dimensions";
import type { Photo, Series, Subject } from "@/data/types";

const FALLBACK = { landscape: 1.5, portrait: 0.8, square: 1 } as const;
/** Width / height of a photograph, from its real pixel size (falls back to its orientation). */
export const ratioNum = (src: string, orientation: Photo["orientation"] = "portrait") => {
  const d = DIMS[src];
  return d ? d[0] / d[1] : FALLBACK[orientation];
};
export const photoRatio = (p: Photo) => ratioNum(p.image, p.orientation);

export const getAllSeries = () => series;
export const getFeaturedSeries = () => series.filter((s) => s.featured);
export const getSeries = (slug: string) => series.find((s) => s.slug === slug);
export const getPhotos = () => photos;
export const getPhoto = (id: string) => photos.find((p) => p.id === id);
export const getPhotosBySeries = (slug: string) => photos.filter((p) => p.series === slug);
export const getSeriesCover = (s: Series) => s.image;

export function getFeaturedPhotos(limit = 8) {
  return getFeaturedSeries().flatMap((s) => getPhotosBySeries(s.slug).slice(0, 2)).slice(0, limit);
}

/** Neighbours within the same series, wrapping around. */
export function getAdjacent(photo: Photo) {
  const list = getPhotosBySeries(photo.series);
  const i = list.findIndex((p) => p.id === photo.id);
  return { prev: list[(i - 1 + list.length) % list.length], next: list[(i + 1) % list.length], index: i + 1, total: list.length };
}

export interface ArchiveFilter {
  city?: string;
  subject?: string;
  year?: string;
}

export function getFilterOptions() {
  const cities = [...new Set(series.map((s) => s.city))].sort();
  const subjects = [...new Set(photos.map((p) => p.subject))].sort() as Subject[];
  const years = [...new Set(photos.flatMap((p) => (p.year ? [String(p.year)] : [])))].sort().reverse();
  return { cities, subjects, years };
}

export function filterPhotos(f: ArchiveFilter) {
  return photos.filter((p) => {
    const s = getSeries(p.series);
    return (!f.city || s?.city === f.city) && (!f.subject || p.subject === f.subject) && (!f.year || String(p.year) === f.year);
  });
}

export const SITE = {
  name: "PS Gallery",
  tagline: "Architecture through observation.",
  instagram: "https://www.instagram.com/psgallery.jpg",
  instagramHandle: "@psgallery.jpg",
  email: "pietrosacchelli17@gmail.com" as string | null,
};

/** slug -> title map, for client components that only receive photos. */
export const getSeriesTitles = () => Object.fromEntries(series.map((s) => [s.slug, s.title]));
