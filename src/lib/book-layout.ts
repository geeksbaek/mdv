/** Pure layout rules for book mode (unit-tested in Node). */

export const PAGE_RATIO = 1.42; // height / width
const OUTER_MARGIN = 32;
const VERTICAL_MARGIN = 48;
const HINGE_MARGIN = 16;

export type Segment = { left: number; width: number };

export type BookLayout = {
  /** Pages shown side by side: 2 for a spread, 1 for portrait/narrow screens. */
  pages: 1 | 2;
  pageWidth: number;
  pageHeight: number;
  /** Gap between the two pages (the hinge on dual-screen devices, else 0). */
  spineGap: number;
  /** Left offset of the spread inside the host, or null to center it. */
  left: number | null;
};

/**
 * Decide the spread shape for a host area of `width` × `height`.
 * `segments` are the horizontal viewport segments (relative to the host) when
 * the device has a hinge — a Surface Duo or Galaxy Fold with the hinge upright.
 */
export function bookLayout(width: number, height: number, segments?: Segment[] | null): BookLayout {
  if (segments && segments.length >= 2) {
    const [a, b] = [segments[0]!, segments[1]!];
    const gap = Math.max(0, b.left - (a.left + a.width));
    const availH = Math.max(0, height - VERTICAL_MARGIN);
    let pageWidth = Math.floor(Math.min(a.width, b.width) - HINGE_MARGIN * 2);
    let pageHeight = Math.floor(pageWidth * PAGE_RATIO);
    if (pageHeight > availH) {
      pageHeight = availH;
      pageWidth = Math.floor(pageHeight / PAGE_RATIO);
    }
    const hingeCenter = a.left + a.width + gap / 2;
    return {
      pages: 2,
      pageWidth,
      pageHeight,
      spineGap: gap,
      left: Math.round(hingeCenter - gap / 2 - pageWidth),
    };
  }

  const availW = Math.max(0, width - OUTER_MARGIN * 2);
  const availH = Math.max(0, height - VERTICAL_MARGIN);
  const twoUp = availW >= 640 && width >= height * 0.85;
  if (twoUp) {
    let pageWidth = Math.floor(availW / 2);
    let pageHeight = Math.floor(pageWidth * PAGE_RATIO);
    if (pageHeight > availH) {
      pageHeight = availH;
      pageWidth = Math.floor(pageHeight / PAGE_RATIO);
    }
    return { pages: 2, pageWidth, pageHeight, spineGap: 0, left: null };
  }
  let pageWidth = Math.floor(Math.min(availW, availH / PAGE_RATIO));
  let pageHeight = Math.floor(pageWidth * PAGE_RATIO);
  if (pageHeight > availH) {
    pageHeight = availH;
    pageWidth = Math.floor(pageHeight / PAGE_RATIO);
  }
  return { pages: 1, pageWidth, pageHeight, spineGap: 0, left: null };
}

export type LeafSpec = {
  /** Left edge of the leaf inside the spread. */
  x: number;
  origin: "left" | "right";
  /** Signed rotation for CSS rotateY, degrees. */
  rotate: number;
  /** True while the leaf shows its back (past 90°). */
  showingBack: boolean;
  front: number;
  back: number;
  frontSide: "left" | "right";
  backSide: "left" | "right";
};

/**
 * Where the turning leaf is and what it shows, for a flip of `dir`
 * (1 forward, -1 back) at `progress` 0..1, on spread `spread`.
 */
export function leafSpec(
  layout: BookLayout,
  spread: number,
  dir: 1 | -1,
  progress: number,
): LeafSpec {
  const { pages, pageWidth, spineGap } = layout;
  const rightX = pageWidth + spineGap;
  if (pages === 2) {
    const left = spread * 2;
    const right = left + 1;
    const angle = progress * 180;
    if (dir === 1) {
      return {
        x: rightX,
        origin: "left",
        rotate: -angle,
        showingBack: angle > 90,
        front: right,
        back: right + 1,
        frontSide: "right",
        backSide: "left",
      };
    }
    return {
      x: 0,
      origin: "right",
      rotate: angle,
      showingBack: angle > 90,
      front: left,
      back: left - 1,
      frontSide: "left",
      backSide: "right",
    };
  }
  // Single page: the leaf hinges on the page's left edge, like a notepad.
  // Forward turns the current page away; back brings the previous one down.
  const angle = dir === 1 ? progress * 180 : (1 - progress) * 180;
  return {
    x: 0,
    origin: "left",
    rotate: -angle,
    showingBack: angle > 90,
    front: dir === 1 ? spread : spread - 1,
    back: -1,
    frontSide: "right",
    backSide: "left",
  };
}

/** Preferred stripe pitch: one stripe per page, 3px when there is room. */
const EDGE_PITCH = 3;
/** Thinnest pitch that still reads as separate sheets (1px light + 1px dark). */
const EDGE_MIN_PITCH = 2;

export type EdgeSpec = {
  /** Pile widths in px — exactly `pitch × pages` for each side. */
  read: number;
  remaining: number;
  readPages: number;
  remainingPages: number;
  /** Width of one stripe (one page), in px. */
  pitch: number;
  /**
   * False when the document has more pages than the cap can show at the
   * minimum pitch; the piles are then proportional rather than one-per-page.
   */
  exact: boolean;
};

/**
 * Page-edge stacks: one stripe per page, so the pile beside the spread can be
 * counted. The pitch is shared by both piles (a sheet is a sheet) and chosen so
 * the whole book fits under the cap: 3px, else 2px, else a fractional pitch
 * that keeps the sums right even when single sheets stop being countable.
 */
export function edgeThickness(
  pageCount: number,
  firstVisible: number,
  visiblePages: number,
  pageWidth: number,
): EdgeSpec {
  const max = Math.max(24, Math.min(120, Math.round(pageWidth * 0.12)));
  const readPages = Math.max(0, Math.min(pageCount, firstVisible));
  const remainingPages = Math.max(0, pageCount - firstVisible - visiblePages);
  // Both piles are at most `pageCount` pages, so the book as a whole is the
  // sizing constraint — and neither pile ever needs a different pitch.
  const total = Math.max(1, pageCount);
  let pitch = EDGE_PITCH;
  if (total * pitch > max) pitch = EDGE_MIN_PITCH;
  const exact = total * pitch <= max;
  if (!exact) pitch = max / total;
  const width = (n: number) => (n <= 0 ? 0 : Math.max(1, Math.round(n * pitch * 100) / 100));
  return {
    read: width(readPages),
    remaining: width(remainingPages),
    readPages,
    remainingPages,
    pitch,
    exact,
  };
}
