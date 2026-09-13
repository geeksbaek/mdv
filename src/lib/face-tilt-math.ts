/** Pure geometry for face-following rotation. Kept free of browser imports so it can be unit-tested in Node. */

/** Free mode rotates in steps of this many degrees. */
export const FREE_STEP_DEG = 5;
/** Extra angle past a step boundary before moving to the next step (prevents flapping). */
const FREE_HYSTERESIS_DEG = 1;
/** Free-mode reading box is resized only in steps this large so lines don't rewrap on every degree. */
const BOX_STEP_PX = 24;
/** Extra angle needed beyond a 45° boundary before snapping to the next quadrant. */
const SNAP_HYSTERESIS_DEG = 12;
function normalize(deg: number): number {
  let d = deg % 360;
  if (d > 180) d -= 360;
  if (d <= -180) d += 360;
  return d === 0 ? 0 : d;
}

/** Roll of the face on screen, derived from the eye line in the raw (unmirrored) front-camera frame. */
export function rollFromEyes(
  right: { x: number; y: number },
  left: { x: number; y: number },
  invert: boolean,
): number {
  const imageAngle = (Math.atan2(left.y - right.y, left.x - right.x) * 180) / Math.PI;
  // The front camera sees the user unmirrored: image x runs opposite to screen x,
  // so a rotation in the frame is the opposite rotation on screen.
  return normalize(invert ? imageAngle : -imageAngle);
}

/** Snap to the nearest quadrant, but only leave the current one once past the boundary by a margin. */
export function snapQuadrant(angle: number, current: number): number {
  const diff = normalize(angle - current);
  if (Math.abs(diff) < 45 + SNAP_HYSTERESIS_DEG) return current;
  return normalize(Math.round(angle / 90) * 90);
}

/**
 * Follow the target in 5° steps. The current step is kept until the target is
 * more than half a step plus a small margin away, then the nearest step wins.
 */
export function easeFree(target: number, current: number): number {
  const diff = normalize(target - current);
  if (Math.abs(diff) < FREE_STEP_DEG / 2 + FREE_HYSTERESIS_DEG) return current;
  return normalize(Math.round(target / FREE_STEP_DEG) * FREE_STEP_DEG);
}

/** Round a box dimension down to the coarse step used in free mode. */
export function coarsen(value: number): number {
  return Math.max(BOX_STEP_PX, Math.floor(value / BOX_STEP_PX) * BOX_STEP_PX);
}

/**
 * Size of a reading box that, rotated by `angle`, still fits inside a
 * `width` × `height` viewport. Text keeps its real size: the box shrinks
 * instead of being scaled. At 0° it fills the viewport; at ±90° it fills
 * the viewport with width and height swapped.
 */
export function fitRotatedBox(
  width: number,
  height: number,
  angle: number,
): { width: number; height: number } {
  const rad = (angle * Math.PI) / 180;
  const c = Math.abs(Math.cos(rad));
  const s = Math.abs(Math.sin(rad));
  const fit = (w: number, h: number) => Math.min(width / (w * c + h * s), height / (w * s + h * c));
  const upright = fit(width, height);
  const swapped = fit(height, width);
  const floor = (value: number) => Math.floor(value + 1e-6);
  if (swapped > upright) {
    return { width: floor(height * swapped), height: floor(width * swapped) };
  }
  return { width: floor(width * upright), height: floor(height * upright) };
}

export type Chord = { start: number; width: number };

/**
 * Screen rectangle (`width` × `height`, centered at the origin) expressed in the
 * text frame that is rotated by `angle` degrees (CSS clockwise, y down), as a
 * convex polygon of four points `{ u, v }`.
 */
export function screenPolygon(
  width: number,
  height: number,
  angle: number,
): Array<{ u: number; v: number }> {
  const rad = (angle * Math.PI) / 180;
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  const hw = width / 2;
  const hh = height / 2;
  // Inverse rotation: screen (x, y) → text-frame (u, v).
  return [
    [-hw, -hh],
    [hw, -hh],
    [hw, hh],
    [-hw, hh],
  ].map(([x, y]) => ({ u: x * c + y * s, v: -x * s + y * c }));
}

/** Horizontal extent of the polygon at height `v`, or null when `v` is outside it. */
export function chordAt(polygon: Array<{ u: number; v: number }>, v: number): Chord | null {
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < polygon.length; i++) {
    const p = polygon[i]!;
    const q = polygon[(i + 1) % polygon.length]!;
    if (p.v === q.v) {
      if (p.v === v) {
        min = Math.min(min, p.u, q.u);
        max = Math.max(max, p.u, q.u);
      }
      continue;
    }
    const lo = Math.min(p.v, q.v);
    const hi = Math.max(p.v, q.v);
    if (v < lo || v > hi) continue;
    const t = (v - p.v) / (q.v - p.v);
    const u = p.u + (q.u - p.u) * t;
    min = Math.min(min, u);
    max = Math.max(max, u);
  }
  if (min === Infinity || max - min <= 0) return null;
  return { start: min, width: max - min };
}

/**
 * Horizontal extent available to a full line band `[v, v + lineHeight]`: the part
 * of the polygon that every row of the band shares. Convexity makes that the
 * intersection of the chords at the band's two edges.
 */
export function bandChord(
  polygon: Array<{ u: number; v: number }>,
  v: number,
  lineHeight: number,
): Chord | null {
  const top = chordAt(polygon, v);
  const bottom = chordAt(polygon, v + lineHeight);
  if (!top || !bottom) return null;
  const start = Math.max(top.start, bottom.start);
  const end = Math.min(top.start + top.width, bottom.start + bottom.width);
  if (end - start <= 0) return null;
  return { start, width: end - start };
}

/** Vertical extent of the polygon. */
export function verticalExtent(polygon: Array<{ u: number; v: number }>): {
  min: number;
  max: number;
} {
  let min = Infinity;
  let max = -Infinity;
  for (const p of polygon) {
    min = Math.min(min, p.v);
    max = Math.max(max, p.v);
  }
  return { min, max };
}
