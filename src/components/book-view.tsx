import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { articleStyle } from "@/lib/article-style";
import { bookLayout, edgeThickness, leafSpec, type Segment } from "@/lib/book-layout";
import { useViewportSegments } from "@/lib/viewport-segments";
import { isTyping } from "@/lib/utils";
import { messages } from "@/lib/i18n";
import { renderMarkdown } from "@/lib/markdown";
import { useDocument, useSettings } from "@/lib/stores";

const GAP = 48; // gap between CSS columns; also the inner margin of a page
const PAD_Y = 40;
const FLIP_MS = 520;
/** Outer strip of a page (fraction of its width) that starts a flip when grabbed. */
const GRAB_ZONE = 0.22;

type Flip = {
  dir: 1 | -1;
  /** 0 = flat on its side, 1 = fully turned. */
  progress: number;
  dragging: boolean;
};

type PageProps = {
  index: number;
  total: number;
  html: string;
  width: number;
  height: number;
  style: CSSProperties;
  label: string;
  className?: string;
  /** Left offset inside the spread. */
  x: number;
};

/**
 * One page: the whole article laid out in fixed-height CSS columns, shifted
 * so column `index` is the one showing. Every page renders the same layout,
 * so column boundaries line up across pages.
 */
const Page = memo(function Page({
  index,
  total,
  html,
  width,
  height,
  style,
  label,
  className,
  x,
}: PageProps) {
  const inner = width - GAP * 2;
  const innerH = height - PAD_Y * 2;
  const blank = index < 0 || index >= total;
  return (
    <div className={`md-book-page ${className ?? ""}`} style={{ width, height, left: x }}>
      {blank ? null : (
        <>
          <div
            className="md-book-clip"
            style={{ left: GAP, top: PAD_Y, width: inner, height: innerH }}
          >
            <article
              className="md-body md-book-content"
              style={{
                ...style,
                columnWidth: inner,
                columnGap: GAP,
                width: inner,
                height: innerH,
                transform: `translateX(${-index * (inner + GAP)}px)`,
              }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
          <div className="md-book-folio">{label}</div>
        </>
      )}
    </div>
  );
});

export function BookView() {
  const markdown = useDocument((s) => s.markdown);
  const settings = useSettings();
  const t = messages(settings.uiLang);
  const hostRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLElement>(null);
  const [area, setArea] = useState({ width: 0, height: 0, left: 0 });
  const [pageCount, setPageCount] = useState(1);
  const [spread, setSpread] = useState(0);
  const [flip, setFlip] = useState<Flip | null>(null);
  const flipRef = useRef<Flip | null>(null);
  flipRef.current = flip;
  const animRef = useRef<number | null>(null);
  const [fontGen, setFontGen] = useState(0);
  const viewportSegments = useViewportSegments();

  const html = useMemo(
    () =>
      renderMarkdown(markdown, {
        cjkFriendly: settings.cjkFriendly,
        softBreaks: settings.softBreaks,
      }).html,
    [markdown, settings.cjkFriendly, settings.softBreaks],
  );
  const style = useMemo(() => articleStyle(settings), [settings]);

  useLayoutEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setArea({ width: el.clientWidth, height: el.clientHeight, left: rect.left });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fonts = typeof document !== "undefined" ? document.fonts : undefined;
    if (!fonts) return;
    const onDone = () => setFontGen((n) => n + 1);
    fonts.addEventListener("loadingdone", onDone);
    return () => fonts.removeEventListener("loadingdone", onDone);
  }, []);

  // Hinge segments relative to this host, when the device has one.
  const segments = useMemo((): Segment[] | null => {
    if (!viewportSegments || viewportSegments.length < 2) return null;
    return viewportSegments.map((s) => ({ left: s.left - area.left, width: s.width }));
  }, [viewportSegments, area.left]);

  const layout = useMemo(
    () => bookLayout(area.width, area.height, segments),
    [area.width, area.height, segments],
  );
  const { pages, pageWidth, pageHeight, spineGap } = layout;
  const inner = pageWidth - GAP * 2;
  const innerH = pageHeight - PAD_Y * 2;

  // Count columns the article needs at this page size.
  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el || inner <= 0) return;
    const count = Math.max(1, Math.round((el.scrollWidth + GAP) / (inner + GAP)));
    setPageCount(count);
  }, [html, inner, innerH, style, fontGen]);

  const spreadCount = Math.max(1, Math.ceil(pageCount / pages));
  useEffect(() => {
    setSpread((s) => Math.min(s, spreadCount - 1));
  }, [spreadCount]);
  useEffect(() => {
    setSpread(0);
  }, [markdown]);
  // Keep roughly the same place when switching between one and two pages.
  const prevPages = useRef(pages);
  useEffect(() => {
    if (prevPages.current === pages) return;
    setSpread((s) => (pages === 2 ? Math.floor(s / 2) : s * 2));
    prevPages.current = pages;
  }, [pages]);

  const left = spread * pages;
  const right = left + 1;
  const canForward = spread < spreadCount - 1;
  const canBack = spread > 0;

  const stopAnim = () => {
    if (animRef.current !== null) cancelAnimationFrame(animRef.current);
    animRef.current = null;
  };

  const finish = useCallback((dir: 1 | -1, completed: boolean) => {
    stopAnim();
    setFlip(null);
    if (completed) setSpread((s) => s + dir);
  }, []);

  const animateTo = useCallback(
    (dir: 1 | -1, from: number, to: number) => {
      stopAnim();
      const start = performance.now();
      const duration = FLIP_MS * Math.max(0.25, Math.abs(to - from));
      const step = (now: number) => {
        const k = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - k, 3);
        const progress = from + (to - from) * eased;
        setFlip({ dir, progress, dragging: false });
        if (k < 1) {
          animRef.current = requestAnimationFrame(step);
        } else {
          finish(dir, to === 1);
        }
      };
      animRef.current = requestAnimationFrame(step);
    },
    [finish],
  );

  // Dragging: mouse/pen grab an outer edge; a touch swipe works anywhere.
  const drag = useRef<{ id: number; dir: 1 | -1 | 0; startX: number; moved: boolean } | null>(null);

  const turn = useCallback(
    (dir: 1 | -1) => {
      // A drag owns the leaf until it is released: starting a keyboard or wheel
      // turn underneath it would run two turns on one spread and desync pages.
      if (flipRef.current || drag.current) return;
      if (dir === 1 && !canForward) return;
      if (dir === -1 && !canBack) return;
      animateTo(dir, 0, 1);
    },
    [animateTo, canForward, canBack],
  );

  useEffect(() => stopAnim, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (isTyping(event.target)) return;
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") turn(1);
      else if (event.key === "ArrowLeft" || event.key === "PageUp") turn(-1);
      else return;
      event.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [turn]);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    let last = 0;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const now = performance.now();
      if (now - last < 400 || Math.abs(event.deltaY) < 8) return;
      last = now;
      turn(event.deltaY > 0 ? 1 : -1);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [turn]);

  const allowed = (dir: 1 | -1) => (dir === 1 ? canForward : canBack);

  const beginDrag = (event: ReactPointerEvent<HTMLDivElement>, dir: 1 | -1 | 0) => {
    if (flipRef.current || drag.current) return;
    if (dir !== 0 && !allowed(dir)) return;
    drag.current = { id: event.pointerId, dir, startX: event.clientX, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
    if (dir !== 0) setFlip({ dir, progress: 0, dragging: true });
  };
  const onEdgePointerDown = (dir: 1 | -1) => (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return; // handled by the spread's swipe
    event.stopPropagation();
    beginDrag(event, dir);
  };
  const onSpreadPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "touch") return;
    beginDrag(event, 0);
  };
  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== event.pointerId) return;
    const dx = event.clientX - d.startX;
    if (d.dir === 0) {
      if (Math.abs(dx) < 10) return;
      const dir: 1 | -1 = dx < 0 ? 1 : -1;
      if (!allowed(dir)) {
        drag.current = null;
        return;
      }
      d.dir = dir;
      d.startX = event.clientX;
      setFlip({ dir, progress: 0, dragging: true });
      return;
    }
    const travel = dx * -d.dir;
    const progress = Math.min(1, Math.max(0, travel / (pageWidth * 1.3)));
    if (Math.abs(dx) > 4) d.moved = true;
    setFlip({ dir: d.dir, progress, dragging: true });
  };
  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== event.pointerId) return;
    drag.current = null;
    if (d.dir === 0) return;
    const current = flipRef.current?.progress ?? 0;
    if (!d.moved) {
      animateTo(d.dir, 0, 1); // a plain click turns the page
      return;
    }
    animateTo(d.dir, current, current > 0.3 ? 1 : 0);
  };

  const pageProps = { total: pageCount, html, width: pageWidth, height: pageHeight, style };
  const label = (index: number) => t.bookPage(index + 1, pageCount);
  const shade = flip ? Math.sin(flip.progress * Math.PI) : 0;
  const leaf = flip ? leafSpec(layout, spread, flip.dir, flip.progress) : null;
  const rightX = pageWidth + spineGap;
  const edges = edgeThickness(pageCount, left, pages, pageWidth);

  // Pages that stay put while the leaf turns.
  const baseLeft =
    pages === 2 ? (flip?.dir === -1 ? left - 2 : left) : flip?.dir === 1 ? spread + 1 : spread;
  const baseRight = flip?.dir === 1 ? right + 2 : right;

  if (pageWidth <= 0) return <div ref={hostRef} className="md-book" />;

  const spreadStyle: CSSProperties = {
    width: pageWidth * pages + spineGap,
    height: pageHeight,
    ...(layout.left !== null
      ? {
          position: "absolute",
          left: layout.left,
          top: Math.max(0, (area.height - pageHeight) / 2 - 12),
        }
      : {}),
  };

  return (
    <div
      ref={hostRef}
      className={`md-book ${settings.bookStyle === "plain" ? "md-book-plain" : ""}`}
      style={{ background: settings.colors.bg }}
    >
      <div
        className="md-book-spread"
        style={spreadStyle}
        aria-label={t.book}
        onPointerDown={onSpreadPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Fore-edges: the pile of pages already read (left) and still to read (right). */}
        <div
          className="md-book-edge md-book-edge-left"
          style={
            {
              width: edges.read,
              left: -edges.read,
              "--md-edge-pitch": `${edges.pitch}px`,
            } as CSSProperties
          }
          title={t.bookEdgeRead(edges.readPages)}
          aria-label={t.bookEdgeRead(edges.readPages)}
        />
        <div
          className="md-book-edge md-book-edge-right"
          style={
            {
              width: edges.remaining,
              right: -edges.remaining,
              "--md-edge-pitch": `${edges.pitch}px`,
            } as CSSProperties
          }
          title={t.bookEdgeRemaining(edges.remainingPages)}
          aria-label={t.bookEdgeRemaining(edges.remainingPages)}
        />
        <Page
          {...pageProps}
          index={baseLeft}
          label={label(baseLeft)}
          className={pages === 2 ? "md-book-left" : "md-book-single"}
          x={0}
        />
        {pages === 2 ? (
          <Page
            {...pageProps}
            index={baseRight}
            label={label(baseRight)}
            className="md-book-right"
            x={rightX}
          />
        ) : null}

        {leaf ? (
          <div
            className="md-book-leaf"
            style={{
              left: leaf.x,
              width: pageWidth,
              height: pageHeight,
              transformOrigin: leaf.origin === "left" ? "left center" : "right center",
              transform: `rotateY(${leaf.rotate}deg)`,
            }}
          >
            {/* Only the face that is toward the viewer exists, so nothing can bleed through. */}
            {leaf.showingBack ? (
              <div className="md-book-face md-book-face-back">
                <Page
                  {...pageProps}
                  index={leaf.back}
                  label={label(leaf.back)}
                  className={leaf.backSide === "left" ? "md-book-left" : "md-book-right"}
                  x={0}
                />
              </div>
            ) : (
              <div className="md-book-face">
                <Page
                  {...pageProps}
                  index={leaf.front}
                  label={label(leaf.front)}
                  className={leaf.frontSide === "left" ? "md-book-left" : "md-book-right"}
                  x={0}
                />
              </div>
            )}
            <div className="md-book-shade" style={{ opacity: shade * 0.35 }} />
          </div>
        ) : null}

        {pages === 2 ? (
          <div className="md-book-spine" style={{ left: pageWidth + spineGap / 2 }} />
        ) : null}
        {flip ? (
          <div
            className={`md-book-cast ${flip.dir === 1 ? "md-book-cast-right" : "md-book-cast-left"}`}
            style={{ opacity: shade * 0.5, width: pageWidth, left: flip.dir === 1 ? rightX : 0 }}
          />
        ) : null}

        <div
          className="md-book-grab md-book-grab-left"
          style={{ width: pageWidth * GRAB_ZONE, cursor: canBack ? "grab" : "default" }}
          onPointerDown={onEdgePointerDown(-1)}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          aria-hidden
        />
        <div
          className="md-book-grab md-book-grab-right"
          style={{ width: pageWidth * GRAB_ZONE, cursor: canForward ? "grab" : "default" }}
          onPointerDown={onEdgePointerDown(1)}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          aria-hidden
        />
      </div>
      <p className="md-book-hint">
        {t.bookHint}{" "}
        <button
          type="button"
          className="md-book-style-toggle"
          onClick={() =>
            settings.set({ bookStyle: settings.bookStyle === "plain" ? "book" : "plain" })
          }
        >
          {settings.bookStyle === "plain" ? t.bookStyleBook : t.bookStylePlain}
        </button>
      </p>

      {/* Hidden copy used only to count how many columns the article needs. */}
      <article
        ref={measureRef}
        className="md-body md-book-content md-book-measure"
        style={{ ...style, columnWidth: inner, columnGap: GAP, width: inner, height: innerH }}
        aria-hidden
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
