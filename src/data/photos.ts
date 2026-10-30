import type { Photo } from "./types";

/**
 * Real photographs by Pietro Sacchelli. Image files live at
 * /public/images/series/<series>/NN.jpg (NN is the order within the series).
 */
export const photos: Photo[] = [
  {
    id: "santander-01",
    series: "santander",
    title: "Beneath the Botín",
    alt: "A hexagon-patterned ceiling over a waterfront terrace at the Centro Botín, with the bay of Santander and hills beyond",
    subject: "Structure",
    year: 2025,
    building: "Centro Botín",
    architect: "Renzo Piano Building Workshop",
    orientation: "portrait",
    image: "/psgallery/images/series/santander/01.jpg",
    demo: false,
  },
  {
    id: "milan-01",
    series: "milan",
    title: "La Casa di Marmo",
    alt: "A dark red marble wall above a pale stone altar-like block in La Casa di Marmo, Milan Design Week 2026",
    subject: "Materials",
    year: 2026,
    building: "La Casa di Marmo",
    architect: "Hannes Peer for Margraf",
    orientation: "portrait",
    image: "/psgallery/images/series/milan/01.jpg",
    demo: false,
  },
  {
    id: "helsinki-01",
    series: "helsinki",
    title: "Pine shore",
    alt: "Pine trees on the Helsinki shoreline in low sun, with water and distant buildings behind",
    subject: "Light & shadow",
    orientation: "portrait",
    image: "/psgallery/images/series/helsinki/01.jpg",
    demo: false,
  },
  {
    id: "helsinki-02",
    series: "helsinki",
    title: "Finlandia Hall",
    alt: "The white marble facade of Finlandia Hall in Helsinki under snow",
    subject: "Facades",
    year: 2024,
    building: "Finlandia Hall",
    architect: "Alvar Aalto",
    orientation: "portrait",
    image: "/psgallery/images/series/helsinki/02.jpg",
    demo: false,
  },
];
