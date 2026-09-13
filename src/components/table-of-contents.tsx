import type { Heading } from "@/lib/markdown";
import { messages } from "@/lib/i18n";
import { useSettings } from "@/lib/stores";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function TableOfContents({
  headings,
  onJump,
}: {
  headings: Heading[];
  onJump: (id: string) => void;
}) {
  const t = messages(useSettings((s) => s.uiLang));
  const items = headings.filter((item) => item.level <= 3);
  if (items.length === 0) {
    return <p className="px-4 py-3 text-sm text-muted-foreground">{t.noHeadings}</p>;
  }

  return (
    <ScrollArea className="h-full">
      <nav className="md-toc px-3 py-3" aria-label={t.tocLabel}>
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(item.level === 1 && "font-medium text-foreground", item.level > 2 && "opacity-80")}
            style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}
            onClick={(event) => {
              event.preventDefault();
              onJump(item.id);
            }}
          >
            {item.text || item.id}
          </a>
        ))}
      </nav>
    </ScrollArea>
  );
}