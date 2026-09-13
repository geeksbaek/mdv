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
import { SOCIAL_SIGN_IN, authEnabled, signInSocial, signOut } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { messages } from "@/lib/i18n";
import { deleteRemote, syncLibrary, useSyncState } from "@/lib/sync";
import {
  deleteDocument,
  getDocument,
  listDocuments,
  saveDocument,
  type SavedDocumentSummary,
} from "@/lib/library";
import { useDocument, useFileName, useSettings } from "@/lib/stores";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function LibrarySheet({ open, onOpenChange }: Props) {
  const uiLang = useSettings((s) => s.uiLang);
  const t = messages(uiLang);
  const markdown = useDocument((s) => s.markdown);
  const fileName = useFileName();
  const libraryId = useDocument((s) => s.libraryId);
  const dirty = useDocument((s) => s.dirty);
  const [name, setName] = useState(fileName);
  const [docs, setDocs] = useState<SavedDocumentSummary[] | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [busy, setBusy] = useState(false);
  const { user, isPending } = useCurrentUserState();
  const signedIn = authEnabled && Boolean(user) && !user?.isDevFallback;
  const sync = useSyncState();

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

  // Signed in: reconcile with the account whenever the sheet opens.
  useEffect(() => {
    if (!open || !signedIn) return;
    void syncLibrary().then(refresh);
  }, [open, signedIn, refresh]);

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
      if (signedIn) void syncLibrary().then(refresh);
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
    if (signedIn) void deleteRemote(summary.id);
  };

  const startSignIn = async (provider: (typeof SOCIAL_SIGN_IN)[number]["id"]) => {
    try {
      await signInSocial(provider, { callbackURL: "/?library=1" });
    } catch {
      toast.error(t.accountSignInFailed);
    }
  };

  const syncLine =
    sync.status === "syncing"
      ? t.accountSyncing
      : sync.status === "error"
        ? t.accountSyncError
        : sync.status === "done"
          ? t.accountSynced(sync.pushed, sync.pulled)
          : null;

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

            {authEnabled ? (
              <>
                <Separator />
                <section className="grid gap-3">
                  <Label className="text-muted-foreground">{t.accountSection}</Label>
                  {isPending ? null : signedIn && user ? (
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        {user.profileImageUrl ? (
                          <img
                            src={user.profileImageUrl}
                            alt=""
                            className="size-8 rounded-full object-cover"
                          />
                        ) : (
                          <span className="grid size-8 place-items-center rounded-full bg-muted text-sm font-medium">
                            {(user.displayName ?? user.primaryEmail ?? "?").charAt(0).toUpperCase()}
                          </span>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm">
                            {user.displayName ?? user.primaryEmail}
                          </p>
                          {user.displayName && user.primaryEmail ? (
                            <p className="truncate text-xs text-muted-foreground">
                              {user.primaryEmail}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={sync.status === "syncing"}
                          onClick={() => void syncLibrary().then(refresh)}
                        >
                          {t.accountSyncNow}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => void signOut("/").catch(() => undefined)}
                        >
                          {t.accountSignOut}
                        </Button>
                      </div>
                      {syncLine ? (
                        <p className="text-xs text-muted-foreground" aria-live="polite">
                          {syncLine}
                        </p>
                      ) : null}
                    </div>
                  ) : (
                    <div className="grid gap-2">
                      <p className="text-xs text-muted-foreground">{t.accountSignInHint}</p>
                      <div className="flex flex-wrap gap-2">
                        {SOCIAL_SIGN_IN.map((p) => (
                          <Button
                            key={p.id}
                            variant="outline"
                            size="sm"
                            onClick={() => void startSignIn(p.id)}
                          >
                            {t.accountSignInWith(p.label)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              </>
            ) : null}

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
