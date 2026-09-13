import { useEffect, useState } from "react";

export type ViewportSegment = { left: number; top: number; width: number; height: number };

type SegmentedViewport = VisualViewport & { segments?: DOMRect[] };

/**
 * Horizontal viewport segments on dual-screen / foldable devices (Surface Duo,
 * Galaxy Fold with the hinge upright), in viewport coordinates. Null when the
 * screen is a single continuous surface. Uses `visualViewport.segments` where
 * available and the CSS `env(viewport-segment-*)` variables otherwise.
 */
export function useViewportSegments(): ViewportSegment[] | null {
  const [segments, setSegments] = useState<ViewportSegment[] | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const read = () => setSegments(readSegments());
    read();
    window.addEventListener("resize", read);
    window.addEventListener("orientationchange", read);
    const media = window.matchMedia?.("(horizontal-viewport-segments: 2)");
    media?.addEventListener?.("change", read);
    return () => {
      window.removeEventListener("resize", read);
      window.removeEventListener("orientationchange", read);
      media?.removeEventListener?.("change", read);
    };
  }, []);

  return segments;
}

function readSegments(): ViewportSegment[] | null {
  const vv = window.visualViewport as SegmentedViewport | null;
  const native = vv?.segments;
  if (native && native.length >= 2) {
    const horizontal = [...native].filter((s) => Math.abs(s.top - native[0]!.top) < 1);
    if (horizontal.length >= 2) return horizontal.map(toSegment).sort((a, b) => a.left - b.left);
  }
  if (!window.matchMedia?.("(horizontal-viewport-segments: 2)").matches) return null;
  // Probe the CSS environment variables with two fixed-position elements.
  const probe = (index: number): ViewportSegment | null => {
    const el = document.createElement("div");
    el.style.cssText = `position:fixed;visibility:hidden;pointer-events:none;left:env(viewport-segment-left ${index} 0, -1px);top:env(viewport-segment-top ${index} 0, 0px);width:env(viewport-segment-width ${index} 0, 0px);height:env(viewport-segment-height ${index} 0, 0px);`;
    document.body.appendChild(el);
    const rect = el.getBoundingClientRect();
    el.remove();
    return rect.width > 0 ? toSegment(rect) : null;
  };
  const a = probe(0);
  const b = probe(1);
  return a && b ? [a, b].sort((x, y) => x.left - y.left) : null;
}

function toSegment(rect: DOMRect): ViewportSegment {
  return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
}
