import { useCallback, type KeyboardEvent, type RefObject } from "react";
import { messages } from "@/lib/i18n";
import { useDocument, useSettings } from "@/lib/stores";

type Props = {
  scrollRef: RefObject<HTMLTextAreaElement | null>;
};

export function MarkdownEditor({ scrollRef }: Props) {
  const markdown = useDocument((s) => s.markdown);
  const setMarkdown = useDocument((s) => s.setMarkdown);
  const contentLang = useSettings((s) => s.contentLang);
  const t = messages(useSettings((s) => s.uiLang));

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.nativeEvent.isComposing || event.key === "Process") return;
      if (event.key !== "Tab") return;
      event.preventDefault();
      const el = event.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const next = `${markdown.slice(0, start)}  ${markdown.slice(end)}`;
      setMarkdown(next);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 2;
      });
    },
    [markdown, setMarkdown],
  );

  return (
    <textarea
      ref={scrollRef}
      className="md-editor"
      value={markdown}
      spellCheck={false}
      autoCapitalize="off"
      autoCorrect="off"
      lang={contentLang}
      aria-label={t.markdownSource}
      onChange={(event) => setMarkdown(event.target.value)}
      onKeyDown={onKeyDown}
    />
  );
}