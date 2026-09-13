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
import { isTyping } from "@/lib/utils";
import { messages } from "@/lib/i18n";
import { renderMarkdown } from "@/lib/markdown";
import { useDocument, useSettings } from "@/lib/stores";

const PAGE_RATIO = 1.42; // height / width
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
}: PageProps) {
  const inner = width - GAP * 2;
  const innerH = height - PAD_Y * 2;
  const blank = index < 0 || index >= total;
  return (
    <div className={`md-book-page ${className ?? ""}`} style={{ width, height }}>
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
  const [area, setArea] = useState({ width: 0, height: 0 });
  const [pageCount, setPageCount] = useState(1);
  const [spread, setSpread] = useState(0);
  const [flip, setFlip] = useState<Flip | null>(null);
  const flipRef = useRef<Flip | null>(null);
  flipRef.current = flip;
  const animRef = useRef<number | null>(null);
  const [fontGen, setFontGen] = useState(0);

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
    const update = () => setArea({ width: el.clientWidth, height: el.clientHeight });
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

  // Page size: two pages side by side, as tall as the area allows.
  const page = useMemo(() => {
    const availW = Math.max(0, area.width - 64);
    const availH = Math.max(0, area.height - 48);
    let width = Math.floor(availW / 2);
    let height = Math.floor(width * PAGE_RATIO);
    if (height > availH) {
      height = availH;
      width = Math.floor(height / PAGE_RATIO);
    }
    return { width, height };
  }, [area]);

  const inner = page.width - GAP * 2;
  const innerH = page.height - PAD_Y * 2;

  // Count columns the article needs at this page size.
  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el || inner <= 0) return;
    const count = Math.max(1, Math.round((el.scrollWidth + GAP) / (inner + GAP)));
    setPageCount(count);
  }, [html, inner, innerH, style, fontGen]);

  const spreadCount = Math.max(1, Math.ceil(pageCount / 2));
  useEffect(() => {
    setSpread((s) => Math.min(s, spreadCount - 1));
  }, [spreadCount]);
  useEffect(() => {
    setSpread(0);
  }, [markdown]);

  const left = spread * 2;
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

  const turn = useCallback(
    (dir: 1 | -1) => {
      if (flipRef.current) return;
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

  // Dragging a page corner: progress follows the pointer across the spread.
  const drag = useRef<{ id: number; dir: 1 | -1; startX: number; moved: boolean } | null>(null);

  const onPointerDown = (dir: 1 | -1) => (event: ReactPointerEvent<HTMLDivElement>) => {
    if (flipRef.current) return;
    if (dir === 1 && !canForward) return;
    if (dir === -1 && !canBack) return;
    drag.current = { id: event.pointerId, dir, startX: event.clientX, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
    setFlip({ dir, progress: 0, dragging: true });
  };
  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== event.pointerId) return;
    const travel = (event.clientX - d.startX) * -d.dir;
    const progress = Math.min(1, Math.max(0, travel / (page.width * 1.6)));
    if (Math.abs(event.clientX - d.startX) > 4) d.moved = true;
    setFlip({ dir: d.dir, progress, dragging: true });
  };
  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== event.pointerId) return;
    drag.current = null;
    const current = flipRef.current?.progress ?? 0;
    if (!d.moved) {
      animateTo(d.dir, 0, 1); // a plain click turns the page
      return;
    }
    animateTo(d.dir, current, current > 0.3 ? 1 : 0);
  };

  const pageProps = { total: pageCount, html, width: page.width, height: page.height, style };
  const label = (index: number) => t.bookPage(index + 1, pageCount);
  const angle = flip ? flip.progress * 180 : 0;
  const shade = flip ? Math.sin((flip.progress * Math.PI) / 1) : 0;

  // Pages under the leaf while it turns.
  const underLeft = flip?.dir === -1 ? left - 2 : left;
  const underRight = flip?.dir === 1 ? right + 2 : right;

  if (page.width <= 0) return <div ref={hostRef} className="md-book" />;

  return (
    <div ref={hostRef} className="md-book" style={{ background: settings.colors.bg }}>
      <div
        className="md-book-spread"
        style={
          {
            width: page.width * 2,
            height: page.height,
            "--flip-ms": `${FLIP_MS}ms`,
          } as CSSProperties
        }
        aria-label={t.book}
      >
        <Page {...pageProps} index={underLeft} label={label(underLeft)} className="md-book-left" />
        <Page
          {...pageProps}
          index={underRight}
          label={label(underRight)}
          className="md-book-right"
        />

        {flip ? (
          <div
            className={`md-book-leaf ${flip.dir === 1 ? "md-book-leaf-right" : "md-book-leaf-left"}`}
            style={{
              width: page.width,
              height: page.height,
              transform: `rotateY(${-flip.dir * angle}deg)`,
            }}
          >
            <div className="md-book-face md-book-face-front">
              <Page
                {...pageProps}
                index={flip.dir === 1 ? right : left}
                label={label(flip.dir === 1 ? right : left)}
                className={flip.dir === 1 ? "md-book-right" : "md-book-left"}
              />
              <div className="md-book-shade" style={{ opacity: shade * 0.35 }} />
            </div>
            <div className="md-book-face md-book-face-back">
              <Page
                {...pageProps}
                index={flip.dir === 1 ? right + 1 : left - 1}
                label={label(flip.dir === 1 ? right + 1 : left - 1)}
                className={flip.dir === 1 ? "md-book-left" : "md-book-right"}
              />
              <div className="md-book-shade" style={{ opacity: shade * 0.35 }} />
            </div>
          </div>
        ) : null}

        <div className="md-book-spine" />
        {flip ? (
          <div
            className={`md-book-cast ${flip.dir === 1 ? "md-book-cast-right" : "md-book-cast-left"}`}
            style={{ opacity: shade * 0.5 }}
          />
        ) : null}

        <div
          className="md-book-grab md-book-grab-left"
          style={{ width: page.width * GRAB_ZONE, cursor: canBack ? "grab" : "default" }}
          onPointerDown={onPointerDown(-1)}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          aria-hidden
        />
        <div
          className="md-book-grab md-book-grab-right"
          style={{ width: page.width * GRAB_ZONE, cursor: canForward ? "grab" : "default" }}
          onPointerDown={onPointerDown(1)}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          aria-hidden
        />
      </div>
      <p className="md-book-hint">{t.bookHint}</p>

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
