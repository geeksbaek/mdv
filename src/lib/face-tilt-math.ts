/** Pure geometry for face-following rotation. Kept free of browser imports so it can be unit-tested in Node. */

/** Ignore jitter below this amount in free mode (output is quantized to whole degrees). */
const DEAD_ZONE_DEG = 1;
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

/** Follow the target in whole-degree steps: ease part of the way, always at least one degree. */
export function easeFree(target: number, current: number): number {
  const diff = normalize(target - current);
  if (Math.abs(diff) < DEAD_ZONE_DEG) return current;
  const step = Math.sign(diff) * Math.max(1, Math.abs(diff) * 0.5);
  return normalize(Math.round(current + step));
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
