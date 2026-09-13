import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  clearCache,
  layoutNextLine,
  prepareWithSegments,
  type LayoutCursor,
  type PreparedTextWithSegments,
} from "@chenglou/pretext";
import { bandChord, screenPolygon, verticalExtent } from "@/lib/face-tilt-math";
import { fontStack } from "@/lib/fonts";
import { extractBlocks, type TextBlockKind } from "@/lib/markdown";
import { headingFontId, useDocument, useSettings } from "@/lib/stores";

type Props = {
  angle: number;
};

type Slot = { v: number; u: number; width: number };

type Line = {
  key: string;
  u: number;
  v: number;
  width: number;
  text: string;
  kind: TextBlockKind;
  depth: number;
};

type Position = { block: number; cursor: LayoutCursor; frac: number };

const START: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
const KIND_SCALE: Record<TextBlockKind, number> = {
  h1: 1.55,
  h2: 1.3,
  h3: 1.12,
  p: 1,
  li: 1,
  quote: 1,
  code: 0.88,
};
const INDENT_EM = 1.4;
/** Slots narrower than this many em (the sharp corners) stay empty. */
const MIN_SLOT_EM = 3;
/** Breathing room between the text and the screen edge, in px. */
const EDGE_INSET = 14;

function atStart(cursor: LayoutCursor): boolean {
  return cursor.segmentIndex === 0 && cursor.graphemeIndex === 0;
}

function sameCursor(a: LayoutCursor, b: LayoutCursor): boolean {
  return a.segmentIndex === b.segmentIndex && a.graphemeIndex === b.graphemeIndex;
}

function cursorBefore(a: LayoutCursor, b: LayoutCursor): boolean {
  return (
    a.segmentIndex < b.segmentIndex ||
    (a.segmentIndex === b.segmentIndex && a.graphemeIndex < b.graphemeIndex)
  );
}

/**
 * Reads the document as plain text laid out by pretext, one line per screen
 * "slot" along the tilted text axis. Every line gets exactly the width the
 * rotated screen offers at its height, so text fills the corners instead of
 * being boxed into a shrunken rectangle. Scrolling re-flows the visible lines.
 */
export function TiltedReader({ angle }: Props) {
  const markdown = useDocument((s) => s.markdown);
  const settings = useSettings();
  const hostRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [fontGeneration, setFontGeneration] = useState(0);
  const positionRef = useRef<Position>({ block: 0, cursor: START, frac: 0 });
  // Bumped after every scroll so slot and line memos re-read positionRef.
  const [tick, bump] = useState(0);
  const rerender = useCallback(() => bump((n) => n + 1), []);

  const blocks = useMemo(
    () =>
      extractBlocks(markdown, {
        cjkFriendly: settings.cjkFriendly,
        softBreaks: settings.softBreaks,
      }),
    [markdown, settings.cjkFriendly, settings.softBreaks],
  );

  const fontSize = settings.fontSize;
  const lineHeight = Math.round(fontSize * settings.lineHeight);
  const bodyStack = fontStack(settings.bodyFont, "gowun-batang");
  const headingStack = fontStack(headingFontId(settings), settings.bodyFont);
  const monoStack = fontStack(settings.monoFont, "system-mono");
  const letterSpacing = settings.letterSpacing * fontSize;

  const fontFor = useCallback(
    (kind: TextBlockKind): string => {
      const px = Math.round(fontSize * KIND_SCALE[kind] * 100) / 100;
      if (kind === "code") return `400 ${px}px ${monoStack}`;
      if (kind === "h1" || kind === "h2" || kind === "h3")
        return `${settings.headingWeight} ${px}px ${headingStack}`;
      return `${settings.fontWeight} ${px}px ${bodyStack}`;
    },
    [fontSize, monoStack, headingStack, bodyStack, settings.headingWeight, settings.fontWeight],
  );

  // Prepared text per block; pretext's one-time segmentation + measurement.
  const prepareKey = `${fontSize}|${settings.fontWeight}|${settings.headingWeight}|${bodyStack}|${headingStack}|${monoStack}|${letterSpacing}|${settings.wordBreak}|${fontGeneration}`;
  const preparedMap = useMemo(
    () => new Map<number, PreparedTextWithSegments>(),
    // A new document or a new font configuration invalidates every measurement.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prepareKey, blocks],
  );

  const prepared = useCallback(
    (index: number): PreparedTextWithSegments => {
      const cached = preparedMap.get(index);
      if (cached) return cached;
      const block = blocks[index]!;
      const value = prepareWithSegments(block.text, fontFor(block.kind), {
        whiteSpace: block.kind === "code" ? "pre-wrap" : "normal",
        wordBreak: settings.wordBreak === "keep-all" ? "keep-all" : "normal",
        letterSpacing: block.kind === "code" ? 0 : letterSpacing,
      });
      preparedMap.set(index, value);
      return value;
    },
    [blocks, preparedMap, fontFor, settings.wordBreak, letterSpacing],
  );

  // Re-measure once web fonts finish loading; canvas metrics change under us.
  useEffect(() => {
    const fonts = typeof document !== "undefined" ? document.fonts : undefined;
    if (!fonts) return;
    const onDone = () => {
      clearCache();
      setFontGeneration((n) => n + 1);
    };
    fonts.addEventListener("loadingdone", onDone);
    void fonts.ready.then(onDone);
    return () => fonts.removeEventListener("loadingdone", onDone);
  }, []);

  useLayoutEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const update = () => setSize({ width: el.clientWidth, height: el.clientHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Reset reading position when the document changes.
  useEffect(() => {
    positionRef.current = { block: 0, cursor: START, frac: 0 };
  }, [markdown]);

  const polygon = useMemo(
    () =>
      screenPolygon(
        Math.max(0, size.width - EDGE_INSET * 2),
        Math.max(0, size.height - EDGE_INSET * 2),
        angle,
      ),
    [size.width, size.height, angle],
  );

  const slots = useMemo((): Slot[] => {
    if (size.width === 0) return [];
    const { min, max } = verticalExtent(polygon);
    const minWidth = fontSize * MIN_SLOT_EM;
    const out: Slot[] = [];
    const frac = positionRef.current.frac;
    for (let v = min - frac * lineHeight; v < max; v += lineHeight) {
      const chord = bandChord(polygon, v, lineHeight);
      if (!chord || chord.width < minWidth) {
        out.push({ v, u: 0, width: 0 });
        continue;
      }
      out.push({ v, u: chord.start, width: chord.width });
    }
    return out;
    // `tick` stands in for positionRef.current.frac, which lives in a ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [polygon, lineHeight, fontSize, tick]);

  const gapSlots = settings.paragraphSpacing >= 0.45 ? 1 : 0;

  /** Lay out lines forward from `from` into the given slots. */
  const flow = useCallback(
    (from: Position, into: Slot[]): { lines: Line[]; nextLineStart: Position | null } => {
      const lines: Line[] = [];
      let block = from.block;
      let cursor = from.cursor;
      let gapLeft = 0;
      let nextLineStart: Position | null = null;
      for (let i = 0; i < into.length && block < blocks.length; i++) {
        const slot = into[i]!;
        if (slot.width === 0) continue;
        if (gapLeft > 0) {
          gapLeft -= 1;
          continue;
        }
        const current = blocks[block]!;
        const indent = current.depth * INDENT_EM * fontSize;
        const width = slot.width - indent;
        if (width < fontSize * 2) continue;
        const line = layoutNextLine(prepared(block), cursor, width);
        if (!line) {
          block += 1;
          cursor = START;
          gapLeft = gapSlots;
          i -= 1;
          continue;
        }
        lines.push({
          key: `${block}:${line.start.segmentIndex}:${line.start.graphemeIndex}`,
          u: slot.u + indent,
          v: slot.v,
          width,
          text: line.text,
          kind: current.kind,
          depth: current.depth,
        });
        cursor = line.end;
        if (sameCursor(line.end, line.start)) {
          // Nothing fit (a single grapheme wider than the slot): move on.
          block += 1;
          cursor = START;
        }
        if (!nextLineStart) {
          if (block >= blocks.length) nextLineStart = null;
          else if (layoutNextLine(prepared(block), cursor, width))
            nextLineStart = { block, cursor, frac: 0 };
          else if (block + 1 < blocks.length)
            nextLineStart = { block: block + 1, cursor: START, frac: 0 };
          else nextLineStart = null;
        }
      }
      return { lines, nextLineStart };
    },
    [blocks, prepared, fontSize, gapSlots],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const lines = useMemo(() => flow(positionRef.current, slots).lines, [flow, slots, tick]);

  const representativeWidth = useCallback((): number => {
    const widths = slots.filter((s) => s.width > 0).map((s) => s.width);
    if (widths.length === 0) return size.width || 320;
    widths.sort((a, b) => a - b);
    return widths[Math.floor(widths.length / 2)]!;
  }, [slots, size.width]);

  /** Start of the line before `pos`, approximated with the typical slot width. */
  const previousLineStart = useCallback(
    (pos: Position): Position | null => {
      const width = representativeWidth();
      let block = pos.block;
      let target = pos.cursor;
      if (atStart(target)) {
        if (block === 0) return null;
        block -= 1;
        target = { segmentIndex: Number.MAX_SAFE_INTEGER, graphemeIndex: 0 };
      }
      const text = prepared(block);
      const indent = blocks[block]!.depth * INDENT_EM * fontSize;
      let cursor = START;
      let lastStart = START;
      for (let guard = 0; guard < 10000; guard++) {
        const line = layoutNextLine(text, cursor, Math.max(fontSize * 2, width - indent));
        if (!line || sameCursor(line.end, line.start)) break;
        lastStart = line.start;
        if (!cursorBefore(line.end, target)) break;
        cursor = line.end;
      }
      return { block, cursor: lastStart, frac: 0 };
    },
    [blocks, prepared, representativeWidth, fontSize],
  );

  const scrollBy = useCallback(
    (px: number) => {
      const pos = { ...positionRef.current };
      pos.frac += px / lineHeight;
      let guard = 0;
      while (pos.frac >= 1 && guard++ < 200) {
        const next = flow(pos, slots).nextLineStart;
        if (!next) {
          pos.frac = Math.min(pos.frac, 0.999);
          break;
        }
        pos.block = next.block;
        pos.cursor = next.cursor;
        pos.frac -= 1;
      }
      while (pos.frac < 0 && guard++ < 200) {
        const prev = previousLineStart(pos);
        if (!prev) {
          pos.frac = 0;
          break;
        }
        pos.block = prev.block;
        pos.cursor = prev.cursor;
        pos.frac += 1;
      }
      positionRef.current = pos;
      rerender();
    },
    [lineHeight, flow, slots, previousLineStart, rerender],
  );

  // React registers wheel listeners as passive; attach our own so preventDefault works.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      scrollBy(event.deltaMode === 1 ? event.deltaY * lineHeight : event.deltaY);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [scrollBy, lineHeight]);

  const drag = useRef<{ id: number; x: number; y: number } | null>(null);
  const axis = useMemo(() => {
    const rad = (angle * Math.PI) / 180;
    // Text-frame "down" expressed on screen.
    return { x: -Math.sin(rad), y: Math.cos(rad) };
  }, [angle]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== event.pointerId) return;
    const dx = event.clientX - d.x;
    const dy = event.clientY - d.y;
    d.x = event.clientX;
    d.y = event.clientY;
    scrollBy(-(dx * axis.x + dy * axis.y));
  };
  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (drag.current?.id === event.pointerId) drag.current = null;
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") scrollBy(lineHeight);
      else if (event.key === "ArrowUp") scrollBy(-lineHeight);
      else if (event.key === "PageDown" || event.key === " ") scrollBy(size.height * 0.8);
      else if (event.key === "PageUp") scrollBy(-size.height * 0.8);
      else return;
      event.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollBy, lineHeight, size.height]);

  const colors = settings.colors;
  const styleFor = (line: Line): CSSProperties => {
    const kind = line.kind;
    const px = fontSize * KIND_SCALE[kind];
    const heading = kind === "h1" || kind === "h2" || kind === "h3";
    return {
      position: "absolute",
      left: line.u,
      top: line.v,
      width: line.width,
      height: lineHeight,
      lineHeight: `${lineHeight}px`,
      fontSize: px,
      fontFamily: kind === "code" ? monoStack : heading ? headingStack : bodyStack,
      fontWeight: heading ? settings.headingWeight : kind === "code" ? 400 : settings.fontWeight,
      letterSpacing: kind === "code" ? 0 : `${letterSpacing}px`,
      color: heading ? colors.heading : kind === "quote" ? colors.muted : colors.fg,
      whiteSpace: kind === "code" ? "pre" : "nowrap",
      wordBreak: settings.wordBreak,
      fontStyle: kind === "quote" ? "italic" : "normal",
      overflow: "visible",
    };
  };

  return (
    <div
      ref={hostRef}
      className="md-tilted-reader"
      lang={settings.contentLang}
      style={{ background: colors.bg, color: colors.fg, touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="md-tilted-frame" style={{ transform: `rotate(${angle}deg)` }}>
        {lines.map((line) => (
          <div key={line.key} style={styleFor(line)}>
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}
