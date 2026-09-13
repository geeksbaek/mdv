import { useEffect, useMemo, useRef, type MouseEvent, type RefObject } from "react";
import { toast } from "sonner";
import { containsMermaid, renderMarkdown, toggleTaskAt } from "@/lib/markdown";
import { articleStyle } from "@/lib/article-style";
import { messages } from "@/lib/i18n";
import { useDocument, useSettings } from "@/lib/stores";

type Props = {
  scrollRef: RefObject<HTMLDivElement | null>;
  dark: boolean;
};

export function MarkdownPreview({ scrollRef, dark }: Props) {
  const markdown = useDocument((s) => s.markdown);
  const setMarkdown = useDocument((s) => s.setMarkdown);
  const settings = useSettings();
  const bodyRef = useRef<HTMLDivElement>(null);

  const rendered = useMemo(
    () =>
      renderMarkdown(markdown, {
        cjkFriendly: settings.cjkFriendly,
        softBreaks: settings.softBreaks,
      }),
    [markdown, settings.cjkFriendly, settings.softBreaks],
  );

  const html = rendered.html;

  useEffect(() => {
    const root = bodyRef.current;
    if (!root || !containsMermaid(html)) return;
    let cancelled = false;
    const nodes = [...root.querySelectorAll<HTMLElement>(".language-mermaid")];
    if (nodes.length === 0) return;

    void import("mermaid").then(async ({ default: mermaid }) => {
      if (cancelled) return;
      mermaid.initialize({
        startOnLoad: false,
        theme: dark ? "dark" : "neutral",
        securityLevel: "strict",
        fontFamily: "inherit",
      });
      for (const node of nodes) {
        const pre = node.closest("pre");
        const source = node.textContent ?? "";
        const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
        try {
          const { svg } = await mermaid.render(id, source);
          if (cancelled) return;
          const wrap = document.createElement("div");
          wrap.className = "md-mermaid";
          wrap.innerHTML = svg;
          pre?.replaceWith(wrap);
        } catch {
          /* leave source fence visible */
        }
      }
    });

    return () => {
      cancelled = true;
    };
  }, [html, dark]);

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const copyBtn = target.closest<HTMLElement>("[data-copy]");
    if (copyBtn) {
      const block = copyBtn.closest(".md-code");
      const code = block?.querySelector("pre")?.textContent ?? "";
      void navigator.clipboard
        .writeText(code)
        .then(() => toast(messages(useSettings.getState().uiLang).copiedCode));
      return;
    }
    const checkbox = target.closest<HTMLInputElement>("input[data-task-index]");
    if (checkbox) {
      event.preventDefault();
      const index = Number(checkbox.dataset.taskIndex);
      if (Number.isFinite(index)) setMarkdown(toggleTaskAt(markdown, index));
    }
  };

  return (
    <div ref={scrollRef} className="md-preview-scroll">
      <div className="md-preview">
        <article
          ref={bodyRef}
          lang={settings.contentLang}
          className="md-body"
          style={articleStyle(settings)}
          dangerouslySetInnerHTML={{ __html: html }}
          onClick={onClick}
        />
      </div>
    </div>
  );
}
