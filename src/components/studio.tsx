import { useEffect, useMemo, useRef, useState, type CSSProperties, type RefObject } from "react";
import { Group, Panel, Separator as ResizeSeparator } from "react-resizable-panels";
import { toast } from "sonner";
import { FontLoader } from "@/components/font-loader";
import { MarkdownEditor } from "@/components/markdown-editor";
import { MarkdownPreview } from "@/components/markdown-preview";
import { TableOfContents } from "@/components/table-of-contents";
import { TiltFrame } from "@/components/tilt-frame";
import { BookView } from "@/components/book-view";
import { Toolbar } from "@/components/toolbar";
import { isDarkHex } from "@/lib/color";
import { useFaceTilt } from "@/lib/face-tilt";
import { fontStack } from "@/lib/fonts";
import { pageTitle, renderMarkdown } from "@/lib/markdown";
import { decodeSharePayload, readEncodedFromLocation, stripShareFromUrl } from "@/lib/share";
import { messages } from "@/lib/i18n";
import { headingFontId, useDocument, useSettings } from "@/lib/stores";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);
  return matches;
}

function useHydratedStores(encoded?: string | null) {
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      await Promise.all([useSettings.persist.rehydrate(), useDocument.persist.rehydrate()]);
      if (cancelled) return;
      const t = messages(useSettings.getState().uiLang);
      const fromUrl = encoded || readEncodedFromLocation(window.location);
      if (!fromUrl) return;
      const doc = await decodeSharePayload(fromUrl);
      if (cancelled) return;
      if (!doc) {
        toast.error(t.shareBroken);
        stripShareFromUrl();
        return;
      }
      useDocument.getState().replace({ markdown: doc.markdown, fileName: doc.fileName });
      if (doc.settings) {
        useSettings.setState({ ...doc.settings, viewMode: "preview" });
      } else {
        useSettings.setState({ viewMode: "preview" });
      }
      stripShareFromUrl();
      toast(t.shareOpened);
    })();
    return () => {
      cancelled = true;
    };
  }, [encoded]);
}

function applyShellTheme(colors: {
  bg: string;
  fg: string;
  muted: string;
  accent: string;
  codeBg: string;
}) {
  const root = document.documentElement;
  const dark = isDarkHex(colors.bg);
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
  root.style.setProperty("--background", colors.bg);
  root.style.setProperty("--foreground", colors.fg);
  root.style.setProperty("--card", colors.codeBg);
  root.style.setProperty("--card-foreground", colors.fg);
  root.style.setProperty("--popover", colors.codeBg);
  root.style.setProperty("--popover-foreground", colors.fg);
  root.style.setProperty("--primary", colors.fg);
  root.style.setProperty("--primary-foreground", colors.bg);
  root.style.setProperty("--secondary", colors.codeBg);
  root.style.setProperty("--secondary-foreground", colors.fg);
  root.style.setProperty("--muted", colors.codeBg);
  root.style.setProperty("--muted-foreground", colors.muted);
  root.style.setProperty("--accent", colors.codeBg);
  root.style.setProperty("--accent-foreground", colors.fg);
  root.style.setProperty("--ring", colors.accent);
  root.style.setProperty("--md-bg", colors.bg);
  root.style.setProperty("--md-fg", colors.fg);
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  themeMeta?.setAttribute("content", colors.bg);
}

function useSyncScroll(
  enabled: boolean,
  left: RefObject<HTMLElement | null>,
  right: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!enabled) return;
    const a = left.current;
    const b = right.current;
    if (!a || !b) return;
    let locked: "a" | "b" | null = null;

    const sync = (from: HTMLElement, to: HTMLElement, who: "a" | "b") => {
      if (locked && locked !== who) return;
      locked = who;
      const maxFrom = from.scrollHeight - from.clientHeight;
      const maxTo = to.scrollHeight - to.clientHeight;
      const ratio = maxFrom <= 0 ? 0 : from.scrollTop / maxFrom;
      to.scrollTop = ratio * Math.max(0, maxTo);
      requestAnimationFrame(() => {
        if (locked === who) locked = null;
      });
    };

    const onA = () => sync(a, b, "a");
    const onB = () => sync(b, a, "b");
    a.addEventListener("scroll", onA, { passive: true });
    b.addEventListener("scroll", onB, { passive: true });
    return () => {
      a.removeEventListener("scroll", onA);
      b.removeEventListener("scroll", onB);
    };
  }, [enabled, left, right]);
}

export function Studio({ encoded }: { encoded?: string | null }) {
  useHydratedStores(encoded);
  const mobile = useMediaQuery("(max-width: 767px)");
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const colors = useSettings((s) => s.colors);
  const uiLang = useSettings((s) => s.uiLang);
  const viewMode = useSettings((s) => s.viewMode);
  const syncScroll = useSettings((s) => s.syncScroll);
  const showToc = useSettings((s) => s.showToc);
  const cjkFriendly = useSettings((s) => s.cjkFriendly);
  const softBreaks = useSettings((s) => s.softBreaks);
  const markdown = useDocument((s) => s.markdown);
  const bodyFont = useSettings((s) => s.bodyFont);
  const headingFont = useSettings((s) => s.headingFont);
  const monoFont = useSettings((s) => s.monoFont);
  const faceTilt = useSettings((s) => s.faceTilt);
  const faceTiltMode = useSettings((s) => s.faceTiltMode);
  const faceTiltInvert = useSettings((s) => s.faceTiltInvert);
  const tilt = useFaceTilt({ enabled: faceTilt, mode: faceTiltMode, invert: faceTiltInvert });

  useEffect(() => {
    applyShellTheme(colors);
  }, [colors]);

  useEffect(() => {
    if (!faceTilt) return;
    const t = messages(useSettings.getState().uiLang);
    if (tilt.status === "denied") toast.error(t.faceTiltDenied);
    else if (tilt.status === "unsupported") toast.error(t.faceTiltUnsupported);
    else if (tilt.status === "error") toast.error(t.faceTiltError);
    else return;
    useSettings.getState().set({ faceTilt: false });
  }, [faceTilt, tilt.status]);

  useEffect(() => {
    document.documentElement.lang = uiLang;
  }, [uiLang]);

  const resolvedView = mobile && viewMode === "split" ? "preview" : viewMode;
  const showEditor = resolvedView === "edit" || resolvedView === "split";
  const showPreview = resolvedView === "preview" || resolvedView === "split";

  useSyncScroll(Boolean(syncScroll && showEditor && showPreview), editorRef, previewRef);

  const headings = useMemo(
    () => renderMarkdown(markdown, { cjkFriendly, softBreaks }).headings,
    [markdown, cjkFriendly, softBreaks],
  );

  useEffect(() => {
    document.title = pageTitle(headings, messages(uiLang).untitledDocument);
  }, [headings, uiLang]);

  const jump = (id: string) => {
    const target = previewRef.current?.querySelector(`#${CSS.escape(id)}`);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="flex h-dvh flex-col overflow-hidden bg-background text-foreground"
      data-view={viewMode}
      style={
        {
          "--md-font": fontStack(bodyFont, "gowun-batang"),
          "--md-heading-font": fontStack(headingFontId({ bodyFont, headingFont }), bodyFont),
          "--md-mono": fontStack(monoFont, "system-mono"),
        } as CSSProperties
      }
    >
      <FontLoader />
      <Toolbar mobile={mobile} />
      <div className="flex min-h-0 flex-1">
        {showToc && showPreview && !mobile ? (
          <aside data-app-chrome className="hidden w-52 shrink-0 border-r border-border lg:block">
            <TableOfContents headings={headings} onJump={jump} />
          </aside>
        ) : null}

        {resolvedView === "book" ? (
          <div className="min-h-0 min-w-0 flex-1">
            <BookView />
          </div>
        ) : showEditor && showPreview ? (
          <Group orientation="horizontal" className="min-h-0 min-w-0 flex-1">
            <Panel id="editor" minSize="22%" defaultSize="46%">
              <MarkdownEditor scrollRef={editorRef} />
            </Panel>
            <ResizeSeparator className="md-resize" />
            <Panel id="preview" minSize="28%" defaultSize="54%">
              <MarkdownPreview scrollRef={previewRef} dark={isDarkHex(colors.bg)} />
            </Panel>
          </Group>
        ) : showEditor ? (
          <div className="min-h-0 min-w-0 flex-1">
            <MarkdownEditor scrollRef={editorRef} />
          </div>
        ) : (
          <div className="min-h-0 min-w-0 flex-1">
            <TiltFrame
              angle={tilt.angle}
              mode={faceTiltMode}
              active={faceTilt && tilt.status !== "off"}
            >
              <MarkdownPreview scrollRef={previewRef} dark={isDarkHex(colors.bg)} />
            </TiltFrame>
          </div>
        )}
      </div>
    </div>
  );
}
