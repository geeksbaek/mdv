import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FaceTiltMode } from "@/lib/face-tilt";
import { FONT_BY_ID } from "@/lib/fonts";
import { isAppLang, messages, type AppLang } from "@/lib/i18n";
import { defaultFileName } from "@/lib/markdown";
import { SAMPLE_DOCUMENT } from "@/lib/sample-document";
import { DEFAULT_THEME, THEME_BY_ID, type ThemeColors } from "@/lib/themes";

export type ViewMode = "edit" | "split" | "preview" | "book";
export type BookStyle = "book" | "plain";
export type WordBreak = "keep-all" | "break-word" | "normal";
export type LineBreak = "auto" | "loose" | "normal" | "strict" | "anywhere";
export type ContentLang = "ko" | "ja" | "zh-CN" | "zh-TW" | "en";

export type SettingsState = {
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
  wordBreak: WordBreak;
  lineBreak: LineBreak;
  hangingPunctuation: boolean;
  cjkFriendly: boolean;
  softBreaks: boolean;
  syncScroll: boolean;
  showToc: boolean;
  bookStyle: BookStyle;
  faceTilt: boolean;
  faceTiltMode: FaceTiltMode;
  faceTiltInvert: boolean;
  viewMode: ViewMode;
  contentLang: ContentLang;
  uiLang: AppLang;
  applyPreset: (id: string) => void;
  setColors: (patch: Partial<ThemeColors>) => void;
  set: (patch: Partial<Omit<SettingsState, "applyPreset" | "setColors" | "set" | "reset">>) => void;
  reset: () => void;
};

const defaultSettings = {
  preset: DEFAULT_THEME.id,
  colors: { ...DEFAULT_THEME.colors },
  bodyFont: "gowun-batang",
  headingFont: "match-body",
  monoFont: "nanum-gothic-coding",
  fontSize: 17,
  fontWeight: 400,
  headingWeight: 600,
  lineHeight: 1.85,
  letterSpacing: 0,
  paragraphSpacing: 0.9,
  maxWidth: 44,
  wordBreak: "keep-all" as WordBreak,
  lineBreak: "strict" as LineBreak,
  hangingPunctuation: true,
  cjkFriendly: true,
  softBreaks: false,
  syncScroll: true,
  showToc: false,
  bookStyle: "book" as BookStyle,
  faceTilt: false,
  faceTiltMode: "free" as FaceTiltMode,
  faceTiltInvert: false,
  viewMode: "split" as ViewMode,
  contentLang: "ko" as ContentLang,
  uiLang: "ko" as AppLang,
};

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,
      applyPreset: (id) => {
        const preset = THEME_BY_ID.get(id);
        if (!preset) return;
        set({ preset: id, colors: { ...preset.colors } });
      },
      setColors: (patch) =>
        set((state) => ({
          colors: { ...state.colors, ...patch },
        })),
      set: (patch) => set(patch),
      reset: () =>
        set((state) => ({
          ...defaultSettings,
          colors: { ...DEFAULT_THEME.colors },
          uiLang: state.uiLang,
        })),
    }),
    {
      name: "hanji-settings",
      skipHydration: true,
      version: 5,
      // The camera needs a fresh user gesture each visit, so the toggle itself is never persisted.
      partialize: (state) => {
        const { faceTilt: _faceTilt, ...rest } = state;
        return rest as SettingsState;
      },
      migrate: (persisted) => {
        const state = { ...(persisted as Record<string, unknown>) };
        state.faceTilt = false;
        if (state.bookStyle !== "book" && state.bookStyle !== "plain") state.bookStyle = "book";
        // v5: continuous rotation became the default; reset once so existing users get it.
        if (
          typeof persisted === "object" &&
          persisted &&
          (persisted as { faceTiltMode?: unknown }).faceTiltMode !== "free"
        )
          state.faceTiltMode = "free";
        if (state.faceTiltMode !== "snap" && state.faceTiltMode !== "free")
          state.faceTiltMode = "free";
        if (typeof state.faceTiltInvert !== "boolean") state.faceTiltInvert = false;
        if (!isAppLang(state.uiLang)) state.uiLang = "ko";
        if (typeof state.fontWeight !== "number") state.fontWeight = 400;
        if (typeof state.headingWeight !== "number") state.headingWeight = 600;
        return state as SettingsState;
      },
    },
  ),
);

export type DocumentState = {
  markdown: string;
  /** The document's own name; empty when it should follow the title (see `useFileName`). */
  fileName: string;
  /** Id in the browser library when this document was saved there or opened from it. */
  libraryId: string | null;
  /** True once the text changed after the last library save/open. */
  dirty: boolean;
  setMarkdown: (markdown: string) => void;
  setFileName: (fileName: string) => void;
  loadSample: () => void;
  /** Replace the whole document (file open, share link, library open). */
  replace: (doc: { markdown: string; fileName: string; libraryId?: string | null }) => void;
  markSaved: (libraryId: string, fileName: string) => void;
};

export const useDocument = create<DocumentState>()(
  persist(
    (set) => ({
      markdown: SAMPLE_DOCUMENT,
      fileName: "",
      libraryId: null,
      dirty: false,
      setMarkdown: (markdown) => set({ markdown, dirty: true }),
      setFileName: (fileName) => set({ fileName }),
      loadSample: () =>
        set({ markdown: SAMPLE_DOCUMENT, fileName: "", libraryId: null, dirty: false }),
      replace: ({ markdown, fileName, libraryId = null }) =>
        set({ markdown, fileName, libraryId, dirty: false }),
      markSaved: (libraryId, fileName) => set({ libraryId, fileName, dirty: false }),
    }),
    {
      name: "hanji-document",
      skipHydration: true,
      version: 3,
      migrate: (persisted, version) => {
        const state = { ...(persisted as Record<string, unknown>) };
        if (typeof state.libraryId !== "string") state.libraryId = null;
        if (typeof state.dirty !== "boolean") state.dirty = false;
        // v2 named every fresh document after the app; let those follow their title.
        if (version < 3 && (state.fileName === "한지.md" || typeof state.fileName !== "string")) {
          state.fileName = "";
        }
        return state as DocumentState;
      },
    },
  ),
);

/** The document's effective name: its own, else derived from its title. */
export function effectiveFileName(
  doc: Pick<DocumentState, "markdown" | "fileName">,
  uiLang: AppLang,
): string {
  return doc.fileName || defaultFileName(doc.markdown, messages(uiLang).untitledDocument);
}

export function useFileName(): string {
  const fileName = useDocument((s) => s.fileName);
  const markdown = useDocument((s) => s.markdown);
  const uiLang = useSettings((s) => s.uiLang);
  return fileName || defaultFileName(markdown, messages(uiLang).untitledDocument);
}

export function headingFontId(settings: Pick<SettingsState, "headingFont" | "bodyFont">): string {
  return settings.headingFont === "match-body" ? settings.bodyFont : settings.headingFont;
}

export function isKnownFont(id: string): boolean {
  return id === "match-body" || FONT_BY_ID.has(id);
}
