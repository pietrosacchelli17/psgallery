/**
 * Content model. Every entity carries a `demo` flag.
 * `demo: true` = placeholder content NOT verified by the photographer:
 * titles, years and captions are illustrative only, and the image is a
 * generated placeholder until a real file exists at `image`.
 * Shapes are flat so they map 1:1 to database tables / CMS types.
 */

export type Subject = "Facades" | "Details" | "Interiors" | "Materials" | "Light & shadow" | "Structure";

export type Era = "Historic" | "Modernist" | "Contemporary" | "Details";

export type Orientation = "landscape" | "portrait" | "square";

export interface Series {
  slug: string;
  title: string;
  city: string;
  country: string;
  era: Era;
  /** Dominant materials; omit when not known. */
  materials?: string;
  summary: string;
  description: string[];
  /** Series cover image path under /public. */
  image: string;
  featured: boolean;
  demo: boolean;
}

export interface Photo {
  /** Stable id, also the URL slug: /photo/[id] */
  id: string;
  series: string;
  title: string;
  /** Alt text. Describes what the real photograph should show; edit with the real image. */
  alt: string;
  subject: Subject;
  /** Year photographed; omit when not known. */
  year?: number;
  /** Building or installation name, when the subject is one. */
  building?: string;
  architect?: string;
  orientation: Orientation;
  /** Path under /public; falls back to a generated placeholder when missing. */
  image: string;
  /** Sale / licence availability, mock. */
  licensable: boolean;
  demo: boolean;
}
