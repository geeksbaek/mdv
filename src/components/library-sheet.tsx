import { useCallback, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { messages } from "@/lib/i18n";
import {
  deleteDocument,
  getDocument,
  listDocuments,
  saveDocument,
  type SavedDocumentSummary,
} from "@/lib/library";
import { useDocument, useSettings } from "@/lib/stores";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function LibrarySheet({ open, onOpenChange }: Props) {
  const uiLang = useSettings((s) => s.uiLang);
  const t = messages(uiLang);
  const markdown = useDocument((s) => s.markdown);
  const fileName = useDocument((s) => s.fileName);
  const libraryId = useDocument((s) => s.libraryId);
  const dirty = useDocument((s) => s.dirty);
  const [name, setName] = useState(fileName);
  const [docs, setDocs] = useState<SavedDocumentSummary[] | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    try {
      setDocs(await listDocuments());
      setUnavailable(false);
    } catch {
      setDocs([]);
      setUnavailable(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    setName(fileName);
    void refresh();
  }, [open, fileName, refresh]);

  const save = async (asNew: boolean) => {
    setBusy(true);
    try {
      const saved = await saveDocument({
        id: asNew ? null : libraryId,
        name: name.trim() || fileName,
        markdown,
      });
      useDocument.getState().markSaved(saved.id, saved.name);
      toast(t.librarySaved(saved.name));
      await refresh();
    } catch {
      toast.error(t.libraryUnavailable);
    } finally {
      setBusy(false);
    }
  };

  const openDoc = async (summary: SavedDocumentSummary) => {
    if (dirty && libraryId !== summary.id && !window.confirm(t.libraryUnsaved)) return;
    const doc = await getDocument(summary.id);
    if (!doc) {
      await refresh();
      return;
    }
    useDocument
      .getState()
      .replace({ markdown: doc.markdown, fileName: doc.name, libraryId: doc.id });
    toast(t.openedFile(doc.name));
    onOpenChange(false);
  };

  const remove = async (summary: SavedDocumentSummary) => {
    if (!window.confirm(t.libraryConfirmDelete(summary.name))) return;
    await deleteDocument(summary.id);
    if (libraryId === summary.id) useDocument.setState({ libraryId: null, dirty: true });
    await refresh();
  };

  const formatDate = (ts: number) =>
    new Intl.DateTimeFormat(uiLang, { dateStyle: "medium", timeStyle: "short" }).format(
      new Date(ts),
    );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent closeLabel={t.close}>
        <SheetHeader>
          <SheetTitle>{t.library}</SheetTitle>
          <SheetDescription>{t.libraryDesc}</SheetDescription>
        </SheetHeader>
        <ScrollArea className="min-h-0 flex-1">
          <div className="flex flex-col gap-6 px-6 pb-10">
            <section className="grid gap-3">
              <Label className="text-muted-foreground">{t.libraryCurrent}</Label>
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.nativeEvent.isComposing) void save(false);
                }}
                aria-label={t.libraryCurrent}
              />
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => void save(false)} disabled={busy || unavailable}>
                  {t.librarySave}
                  {dirty && libraryId ? (
                    <span aria-hidden className="ml-1 opacity-70">
                      •
                    </span>
                  ) : null}
                </Button>
                {libraryId ? (
                  <Button
                    variant="outline"
                    onClick={() => void save(true)}
                    disabled={busy || unavailable}
                  >
                    {t.librarySaveAsNew}
                  </Button>
                ) : null}
              </div>
              {unavailable ? (
                <p className="text-xs text-destructive">{t.libraryUnavailable}</p>
              ) : null}
            </section>

            <Separator />

            <section className="grid gap-2">
              {docs === null ? null : docs.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t.libraryEmpty}</p>
              ) : (
                <ul className="grid gap-1">
                  {docs.map((doc) => {
                    const current = doc.id === libraryId;
                    return (
                      <li
                        key={doc.id}
                        className={cn(
                          "flex items-center gap-2 rounded-lg px-2 py-1.5",
                          current && "bg-muted",
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => void openDoc(doc)}
                          className="min-w-0 flex-1 rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
                          aria-label={`${t.libraryOpen}: ${doc.name}`}
                        >
                          <span className="block truncate text-sm">{doc.name}</span>
                          <span className="block text-xs text-muted-foreground">
                            {formatDate(doc.updatedAt)} · {t.libraryChars(doc.size)}
                          </span>
                        </button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => void remove(doc)}
                          aria-label={`${t.libraryDelete}: ${doc.name}`}
                        >
                          <Trash2 />
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
