import { useEffect } from "react";
import { FONT_BY_ID } from "@/lib/fonts";
import { headingFontId, useSettings } from "@/lib/stores";

export function FontLoader() {
  const bodyFont = useSettings((s) => s.bodyFont);
  const headingFont = useSettings((s) => s.headingFont);
  const monoFont = useSettings((s) => s.monoFont);

  useEffect(() => {
    const ids = [bodyFont, headingFontId({ bodyFont, headingFont }), monoFont];
    for (const id of ids) {
      const href = FONT_BY_ID.get(id)?.href;
      if (!href) continue;
      if (document.querySelector(`link[data-hanji-font="${CSS.escape(href)}"]`)) continue;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.dataset.hanjiFont = href;
      document.head.appendChild(link);
    }
  }, [bodyFont, headingFont, monoFont]);

  return null;
}
