import { useRef, useState, type ReactNode } from "react";
import {
  Columns2,
  Download,
  Eye,
  FolderOpen,
  MoreHorizontal,
  PanelLeft,
  Printer,
  RotateCcw,
  Settings2,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import { messages } from "@/lib/i18n";
import { SAMPLE_DOCUMENT } from "@/lib/sample-document";
import { useDocument, useSettings, type ViewMode } from "@/lib/stores";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SettingsPanel } from "@/components/settings-panel";
import { ShareDialog } from "@/components/share-dialog";
import { cn } from "@/lib/utils";

function Tip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export function Toolbar({ mobile }: { mobile: boolean }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const t = messages(useSettings((s) => s.uiLang));
  const viewMode = useSettings((s) => s.viewMode);
  const setView = (next: ViewMode) => useSettings.getState().set({ viewMode: next });
  const cjkFriendly = useSettings((s) => s.cjkFriendly);
  const fileName = useDocument((s) => s.fileName);
  const markdown = useDocument((s) => s.markdown);

  const views: Array<{ id: ViewMode; label: string; icon: typeof PanelLeft }> = [
    { id: "edit", label: t.edit, icon: PanelLeft },
    { id: "split", label: t.split, icon: Columns2 },
    { id: "preview", label: t.preview, icon: Eye },
  ];

  const openFile = () => fileRef.current?.click();

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    const text = await file.text();
    useDocument.getState().setMarkdown(text);
    useDocument.getState().setFileName(file.name);
    toast(t.openedFile(file.name));
  };

  const saveFile = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName.endsWith(".md") ? fileName : `${fileName}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const loadSample = () => {
    useDocument.getState().setMarkdown(SAMPLE_DOCUMENT);
    useDocument.getState().setFileName("한지.md");
    toast(t.sampleLoaded);
  };

  return (
    <header
      data-app-chrome
      className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-2 sm:px-3"
    >
      <input
        ref={fileRef}
        type="file"
        accept=".md,.markdown,.txt,text/markdown,text/plain"
        className="hidden"
        onChange={(event) => {
          void onFile(event.target.files?.[0]);
          event.currentTarget.value = "";
        }}
      />
      <div className="flex min-w-0 items-baseline gap-2 px-2">
        <span className="text-base font-medium tracking-tight">한지</span>
        <span className="hidden truncate text-xs text-muted-foreground sm:inline">{fileName}</span>
      </div>

      <div className="ml-1 flex rounded-lg bg-muted p-0.5">
        {views.map((view) => {
          const Icon = view.icon;
          if (view.id === "split") {
            return (
              <Tip key={view.id} label={view.label}>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-pressed={viewMode === view.id}
                  className={cn("max-md:hidden", viewMode === view.id && "bg-background shadow-[var(--shadow-border)]")}
                  onClick={() => setView(view.id)}
                >
                  <Icon />
                  <span className="sr-only">{view.label}</span>
                </Button>
              </Tip>
            );
          }
          const active = (mobile && viewMode === "split" ? "preview" : viewMode) === view.id;
          return (
            <Tip key={view.id} label={view.label}>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-pressed={active}
                className={cn(active && "bg-background shadow-[var(--shadow-border)]")}
                onClick={() => setView(view.id)}
              >
                <Icon />
                <span className="sr-only">{view.label}</span>
              </Button>
            </Tip>
          );
        })}
      </div>

      <span
        className={cn(
          "hidden rounded-full px-2 py-1 text-xs tracking-wide sm:inline",
          cjkFriendly ? "bg-secondary text-secondary-foreground" : "text-muted-foreground",
        )}
      >
        CJK {cjkFriendly ? t.cjkFixed : t.cjkRaw}
      </span>

      <div className="ml-auto flex items-center gap-0.5">
        <div className="hidden items-center sm:flex">
          <Tip label={t.open}>
            <Button variant="ghost" size="icon-sm" onClick={openFile}>
              <FolderOpen />
              <span className="sr-only">{t.open}</span>
            </Button>
          </Tip>
          <Tip label={t.save}>
            <Button variant="ghost" size="icon-sm" onClick={saveFile}>
              <Download />
              <span className="sr-only">{t.save}</span>
            </Button>
          </Tip>
          <Tip label={t.sample}>
            <Button variant="ghost" size="icon-sm" onClick={loadSample}>
              <RotateCcw />
              <span className="sr-only">{t.sample}</span>
            </Button>
          </Tip>
          <Tip label={t.print}>
            <Button variant="ghost" size="icon-sm" onClick={() => window.print()}>
              <Printer />
              <span className="sr-only">{t.print}</span>
            </Button>
          </Tip>
        </div>

        <Tip label={t.share}>
          <Button variant="ghost" size="icon-sm" onClick={() => setShareOpen(true)}>
            <Share2 />
            <span className="sr-only">{t.share}</span>
          </Button>
        </Tip>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="sm:hidden">
              <MoreHorizontal />
              <span className="sr-only">{t.more}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={openFile}>{t.open}</DropdownMenuItem>
            <DropdownMenuItem onSelect={saveFile}>{t.save}</DropdownMenuItem>
            <DropdownMenuItem onSelect={loadSample}>{t.sample}</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => window.print()}>{t.print}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Sheet>
          <Tip label={t.settings}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <Settings2 />
                <span className="sr-only">{t.settings}</span>
              </Button>
            </SheetTrigger>
          </Tip>
          <SheetContent closeLabel={t.close}>
            <SheetHeader>
              <SheetTitle>{t.settingsTitle}</SheetTitle>
              <SheetDescription>{t.settingsDesc}</SheetDescription>
            </SheetHeader>
            <SettingsPanel />
          </SheetContent>
        </Sheet>
      </div>

      <ShareDialog open={shareOpen} onOpenChange={setShareOpen} />
    </header>
  );
}
