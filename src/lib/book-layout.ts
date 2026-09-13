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

/** Page-edge stacks: how thick the read and remaining piles look, in px. */
export function edgeThickness(
  pageCount: number,
  firstVisible: number,
  visiblePages: number,
  pageWidth: number,
): { read: number; remaining: number; readPages: number; remainingPages: number } {
  const max = Math.max(10, Math.min(28, Math.round(pageWidth * 0.06)));
  const readPages = Math.max(0, Math.min(pageCount, firstVisible));
  const remainingPages = Math.max(0, pageCount - firstVisible - visiblePages);
  const scale = (n: number) =>
    n <= 0 ? 0 : Math.max(3, Math.round((max * n) / Math.max(1, pageCount)));
  return { read: scale(readPages), remaining: scale(remainingPages), readPages, remainingPages };
}
