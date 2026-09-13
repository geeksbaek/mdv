import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FaceTiltMode } from "@/lib/face-tilt";
import { FONT_BY_ID } from "@/lib/fonts";
import { isAppLang, type AppLang } from "@/lib/i18n";
import { SAMPLE_DOCUMENT } from "@/lib/sample-document";
import { DEFAULT_THEME, THEME_BY_ID, type ThemeColors } from "@/lib/themes";

export type ViewMode = "edit" | "split" | "preview";
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
  fileName: string;
  setMarkdown: (markdown: string) => void;
  setFileName: (fileName: string) => void;
  loadSample: () => void;
};

export const useDocument = create<DocumentState>()(
  persist(
    (set) => ({
      markdown: SAMPLE_DOCUMENT,
      fileName: "한지.md",
      setMarkdown: (markdown) => set({ markdown }),
      setFileName: (fileName) => set({ fileName }),
      loadSample: () => set({ markdown: SAMPLE_DOCUMENT, fileName: "한지.md" }),
    }),
    {
      name: "hanji-document",
      skipHydration: true,
      version: 1,
    },
  ),
);

export function headingFontId(settings: Pick<SettingsState, "headingFont" | "bodyFont">): string {
  return settings.headingFont === "match-body" ? settings.bodyFont : settings.headingFont;
}

export function isKnownFont(id: string): boolean {
  return id === "match-body" || FONT_BY_ID.has(id);
}
