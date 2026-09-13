export type RGB = { r: number; g: number; b: number };

export function parseHex(hex: string): RGB | null {
  const m = hex.trim().match(/^#?([0-9a-f]{6})$/i);
  if (!m?.[1]) return null;
  const n = parseInt(m[1], 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function normalizeHex(hex: string, fallback: string): string {
  const c = parseHex(hex);
  if (!c) return fallback;
  return `#${[c.r, c.g, c.b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

export function luminance(hex: string): number {
  const c = parseHex(hex);
  if (!c) return 1;
  const lin = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
}

export function isDarkHex(hex: string): boolean {
  return luminance(hex) < 0.45;
}
