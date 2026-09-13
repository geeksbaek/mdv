import { normalizeHex } from "./color.ts";
import { FONT_BY_ID } from "./fonts.ts";
import { THEME_BY_ID, type ThemeColors } from "./themes.ts";

export const MAX_SHARE_MARKDOWN = 120_000;
export const MAX_SHARE_PAYLOAD = 400_000;

export type ShareSettings = {
  preset: string;
  colors: ThemeColors;
  bodyFont: string;
  headingFont: string;
  monoFont: string;
  fontSize: number;
  fontWeight: number;
  headingWeight: number;
  lineHeight: number;
  letterSpacing: number;
  paragraphSpacing: number;
  maxWidth: number;
  wordBreak: "keep-all" | "break-word" | "normal";
  lineBreak: "auto" | "loose" | "normal" | "strict" | "anywhere";
  hangingPunctuation: boolean;
  cjkFriendly: boolean;
  softBreaks: boolean;
  contentLang: "ko" | "ja" | "zh-CN" | "zh-TW" | "en";
};

export type ShareDocument = {
  markdown: string;
  fileName: string;
  settings?: ShareSettings;
};

type ShareEnvelope = {
  v: 1;
  markdown: string;
  fileName: string;
  settings?: ShareSettings;
};

const WORD_BREAKS: ShareSettings["wordBreak"][] = ["keep-all", "break-word", "normal"];
const LINE_BREAKS: ShareSettings["lineBreak"][] = ["auto", "loose", "normal", "strict", "anywhere"];
const LANGS: ShareSettings["contentLang"][] = ["ko", "ja", "zh-CN", "zh-TW", "en"];
const COLOR_KEYS: Array<keyof ThemeColors> = [
  "bg",
  "fg",
  "muted",
  "accent",
  "link",
  "codeBg",
  "heading",
];

export function snapshotSettings(state: ShareSettings): ShareSettings {
  return {
    preset: state.preset,
    colors: { ...state.colors },
    bodyFont: state.bodyFont,
    headingFont: state.headingFont,
    monoFont: state.monoFont,
    fontSize: state.fontSize,
    fontWeight: state.fontWeight,
    headingWeight: state.headingWeight,
    lineHeight: state.lineHeight,
    letterSpacing: state.letterSpacing,
    paragraphSpacing: state.paragraphSpacing,
    maxWidth: state.maxWidth,
    wordBreak: state.wordBreak,
    lineBreak: state.lineBreak,
    hangingPunctuation: state.hangingPunctuation,
    cjkFriendly: state.cjkFriendly,
    softBreaks: state.softBreaks,
    contentLang: state.contentLang,
  };
}

export async function encodeSharePayload(doc: ShareDocument): Promise<string> {
  if (doc.markdown.length > MAX_SHARE_MARKDOWN) {
    throw new Error("TOO_LONG");
  }
  const envelope: ShareEnvelope = {
    v: 1,
    markdown: doc.markdown,
    fileName: sanitizeFileName(doc.fileName),
    ...(doc.settings ? { settings: snapshotSettings(doc.settings) } : {}),
  };
  const bytes = new TextEncoder().encode(JSON.stringify(envelope));
  const compressed = await deflate(bytes);
  const payload = bytesToBase64Url(compressed);
  if (payload.length > MAX_SHARE_PAYLOAD) {
    throw new Error("TOO_LONG");
  }
  return payload;
}

export async function decodeSharePayload(payload: string): Promise<ShareDocument | null> {
  const cleaned = payload.trim();
  if (cleaned.length < 8 || cleaned.length > MAX_SHARE_PAYLOAD) return null;
  if (!/^[A-Za-z0-9_-]+$/.test(cleaned)) return null;
  try {
    const inflated = await inflate(base64UrlToBytes(cleaned));
    const parsed: unknown = JSON.parse(new TextDecoder().decode(inflated));
    return parseEnvelope(parsed);
  } catch {
    return null;
  }
}

export function longShareUrl(origin: string, payload: string): string {
  return `${origin}/#d=${payload}`;
}

export function shortShareUrl(origin: string, code: string): string {
  return `${origin}/s/${code}`;
}

export function readEncodedFromLocation(location: Pick<Location, "search" | "hash">): string | undefined {
  const query = new URLSearchParams(location.search).get("d");
  if (query) return query;
  const hash = location.hash;
  if (hash.startsWith("#d=")) {
    try {
      return decodeURIComponent(hash.slice(3));
    } catch {
      return hash.slice(3);
    }
  }
  return undefined;
}

export function stripShareFromUrl() {
  const url = new URL(window.location.href);
  const path = url.pathname.startsWith("/s/") ? "/" : url.pathname;
  url.searchParams.delete("d");
  window.history.replaceState(window.history.state, "", path);
}

function parseEnvelope(raw: unknown): ShareDocument | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (o.v !== 1 || typeof o.markdown !== "string") return null;
  if (o.markdown.length > MAX_SHARE_MARKDOWN) return null;
  return {
    markdown: o.markdown,
    fileName: sanitizeFileName(typeof o.fileName === "string" ? o.fileName : "한지.md"),
    settings: parseSettings(o.settings),
  };
}

function parseSettings(raw: unknown): ShareSettings | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const o = raw as Record<string, unknown>;
  const preset = typeof o.preset === "string" && THEME_BY_ID.has(o.preset) ? o.preset : "hanji";
  const fallback = THEME_BY_ID.get(preset)?.colors ?? THEME_BY_ID.get("hanji")!.colors;
  const colors = parseColors(o.colors, fallback);
  const bodyFont = knownFont(o.bodyFont, "gowun-batang");
  const headingFont =
    o.headingFont === "match-body" ? "match-body" : knownFont(o.headingFont, "match-body");
  return {
    preset,
    colors,
    bodyFont,
    headingFont,
    monoFont: knownFont(o.monoFont, "nanum-gothic-coding"),
    fontSize: clamp(o.fontSize, 14, 24, 17),
    fontWeight: clampWeight(o.fontWeight, 400),
    headingWeight: clampWeight(o.headingWeight, 600),
    lineHeight: clamp(o.lineHeight, 1.4, 2.2, 1.85),
    letterSpacing: clamp(o.letterSpacing, -0.04, 0.08, 0),
    paragraphSpacing: clamp(o.paragraphSpacing, 0.4, 1.6, 0.9),
    maxWidth: clamp(o.maxWidth, 32, 64, 44),
    wordBreak: oneOf(o.wordBreak, WORD_BREAKS, "keep-all"),
    lineBreak: oneOf(o.lineBreak, LINE_BREAKS, "strict"),
    hangingPunctuation: bool(o.hangingPunctuation, true),
    cjkFriendly: bool(o.cjkFriendly, true),
    softBreaks: bool(o.softBreaks, false),
    contentLang: oneOf(o.contentLang, LANGS, "ko"),
  };
}

function parseColors(raw: unknown, fallback: ThemeColors): ThemeColors {
  const src = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const colors = { ...fallback };
  for (const key of COLOR_KEYS) {
    const value = src[key];
    if (typeof value === "string") colors[key] = normalizeHex(value, fallback[key]);
  }
  return colors;
}

function knownFont(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  if (value === "match-body" || FONT_BY_ID.has(value)) return value;
  return fallback;
}

function sanitizeFileName(name: string): string {
  const cleaned = name.replace(/[/\\]/g, "").trim().slice(0, 80);
  return cleaned || "한지.md";
}

function clamp(value: unknown, min: number, max: number, fallback: number): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

function clampWeight(value: unknown, fallback: number): number {
  const n = clamp(value, 300, 700, fallback);
  return Math.round(n / 100) * 100;
}

function bool(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function oneOf<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === "string" && (allowed as readonly string[]).includes(value)
    ? (value as T)
    : fallback;
}

async function deflate(bytes: Uint8Array): Promise<Uint8Array> {
  const copy = Uint8Array.from(bytes);
  const stream = new Blob([copy]).stream().pipeThrough(new CompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function inflate(bytes: Uint8Array): Promise<Uint8Array> {
  const copy = Uint8Array.from(bytes);
  const stream = new Blob([copy]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

function bytesToBase64Url(bytes: Uint8Array): string {
  const chunk = 0x8000;
  let binary = "";
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

function base64UrlToBytes(value: string): Uint8Array {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}
