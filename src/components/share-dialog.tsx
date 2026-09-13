import { useEffect, useState } from "react";
import { Check, Copy, Link2 } from "lucide-react";
import { toast } from "sonner";
import { createShare } from "@/lib/share-api";
import { messages } from "@/lib/i18n";
import { encodeSharePayload, longShareUrl, shortShareUrl, snapshotSettings } from "@/lib/share";
import { effectiveFileName, useDocument, useSettings } from "@/lib/stores";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const LONG_URL_LIMIT = 8000;

type ShareDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ShareDialog({ open, onOpenChange }: ShareDialogProps) {
  const t = messages(useSettings((s) => s.uiLang));
  const [includeSettings, setIncludeSettings] = useState(true);
  const [status, setStatus] = useState<"idle" | "creating" | "ready" | "fallback" | "error">(
    "idle",
  );
  const [shortUrl, setShortUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [copied, setCopied] = useState<"short" | "long" | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setStatus("creating");
    setCopied(null);
    setError("");
    setShortUrl("");
    setLongUrl("");
    const copy = messages(useSettings.getState().uiLang);

    void (async () => {
      try {
        const document = useDocument.getState();
        const settings = useSettings.getState();
        const payload = await encodeSharePayload({
          markdown: document.markdown,
          fileName: effectiveFileName(document, settings.uiLang),
          settings: includeSettings ? snapshotSettings(settings) : undefined,
        });
        const origin = window.location.origin;
        const encodedUrl = longShareUrl(origin, payload);
        if (cancelled) return;
        setLongUrl(encodedUrl);

        try {
          const { code } = await createShare({ data: { payload } });
          if (cancelled) return;
          const next = shortShareUrl(origin, code);
          setShortUrl(next);
          setStatus("ready");
          await copyText(next);
          if (!cancelled) {
            setCopied("short");
            toast(copy.copiedShort);
          }
        } catch {
          if (cancelled) return;
          setStatus("fallback");
          await copyText(encodedUrl);
          if (!cancelled) {
            setCopied("long");
            toast(copy.copiedEncoded);
          }
        }
      } catch (cause) {
        if (cancelled) return;
        setStatus("error");
        const code = cause instanceof Error ? cause.message : "";
        setError(code === "TOO_LONG" ? copy.shareTooLong : copy.shareFailed);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open, includeSettings]);

  const displayUrl = status === "fallback" ? longUrl : shortUrl;
  const showLong =
    Boolean(longUrl) &&
    longUrl.length <= LONG_URL_LIMIT &&
    (status === "ready" || status === "fallback");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent closeLabel={t.close}>
        <DialogHeader>
          <DialogTitle>{t.shareTitle}</DialogTitle>
          <DialogDescription>{t.shareDesc}</DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between gap-3">
          <div className="grid gap-1 pr-3">
            <Label htmlFor="share-settings">{t.includePage}</Label>
            <p className="text-xs text-muted-foreground">{t.includePageHint}</p>
          </div>
          <Switch
            id="share-settings"
            checked={includeSettings}
            onCheckedChange={setIncludeSettings}
            disabled={status === "creating"}
          />
        </div>

        {status === "creating" ? (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link2 className="size-4 animate-pulse" />
            {t.creatingLink}
          </p>
        ) : null}

        {status === "error" ? <p className="text-sm text-destructive">{error}</p> : null}

        {status === "ready" || status === "fallback" ? (
          <div className="grid gap-4">
            <UrlField
              label={status === "ready" ? t.shortLink : t.encodedAddress}
              value={displayUrl}
              copied={copied === (status === "ready" ? "short" : "long")}
              copyLabel={t.copy}
              onCopy={async () => {
                if (!(await copyText(displayUrl))) return;
                setCopied(status === "ready" ? "short" : "long");
                toast(t.copied);
              }}
            />
            {status === "ready" && showLong ? (
              <UrlField
                label={t.encodedOriginal}
                value={longUrl}
                copied={copied === "long"}
                copyLabel={t.copy}
                onCopy={async () => {
                  if (!(await copyText(longUrl))) return;
                  setCopied("long");
                  toast(t.copied);
                }}
              />
            ) : null}
            {status === "fallback" ? (
              <p className="text-xs text-muted-foreground">{t.fallbackHint}</p>
            ) : null}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function UrlField({
  label,
  value,
  copied,
  copyLabel,
  onCopy,
}: {
  label: string;
  value: string;
  copied: boolean;
  copyLabel: string;
  onCopy: () => void;
}) {
  return (
    <div className="grid gap-2">
      <Label className="text-muted-foreground">{label}</Label>
      <div className="flex gap-2">
        <Input
          readOnly
          value={value}
          className="font-mono text-xs"
          onFocus={(event) => event.currentTarget.select()}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="shrink-0"
          onClick={onCopy}
          aria-label={copyLabel}
        >
          {copied ? <Check className={cn("size-4")} /> : <Copy />}
        </Button>
      </div>
    </div>
  );
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    el.remove();
    return ok;
  }
}
