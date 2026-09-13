import type { CSSProperties } from "react";
import { fontStack } from "@/lib/fonts";
import { headingFontId, type SettingsState } from "@/lib/stores";

/** CSS custom properties that drive `.md-body` typography, derived from settings. */
export function articleStyle(settings: SettingsState): CSSProperties {
  const headingStack = fontStack(headingFontId(settings), settings.bodyFont);
  const bodyStack = fontStack(settings.bodyFont, "gowun-batang");
  const monoStack = fontStack(settings.monoFont, "system-mono");
  return {
    "--md-bg": settings.colors.bg,
    "--md-fg": settings.colors.fg,
    "--md-muted": settings.colors.muted,
    "--md-heading": settings.colors.heading,
    "--md-link": settings.colors.link,
    "--md-code-bg": settings.colors.codeBg,
    "--md-font": bodyStack,
    "--md-heading-font": headingStack,
    "--md-mono": monoStack,
    "--md-size": `${settings.fontSize}px`,
    "--md-weight": String(settings.fontWeight),
    "--md-heading-weight": String(settings.headingWeight),
    "--md-leading": String(settings.lineHeight),
    "--md-tracking": `${settings.letterSpacing}em`,
    "--md-para-gap": `${settings.paragraphSpacing}em`,
    "--md-width": `${settings.maxWidth}rem`,
    "--md-word-break": settings.wordBreak,
    "--md-line-break": settings.lineBreak,
    "--md-hang": settings.hangingPunctuation ? "first last allow-end" : "none",
  } as CSSProperties;
}
