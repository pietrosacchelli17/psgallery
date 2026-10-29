# Images

Drop real photographs here and they replace the generated placeholders automatically
(the page tries the file first and falls back to a generated drawing if it is missing).
Paths are set by each item's `image` field in `src/data/series.ts` and `src/data/photos.ts`.

- `series/<series-slug>/cover.jpg` series cover (landscape, 3:2 or wider)
- `series/<series-slug>/01.jpg`, `02.jpg`, ... photographs, numbered in `photos.ts` order
- `about.jpg` portrait for the About page (4:5)

Each photograph's `orientation` (`landscape` 3:2, `portrait` 4:5, `square`) sets its display frame, so
export to match. Recommended: 2400px on the long edge, JPEG. No photo credits are invented in this prototype.
