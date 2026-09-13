import type { ReactNode } from "react";
import { BODY_FONTS, FONT_BY_ID, MONO_FONTS, fontStack } from "@/lib/fonts";
import { APP_LANGS, isAppLang, messages, weightName } from "@/lib/i18n";
import { normalizeHex } from "@/lib/color";
import { useFaceTiltRuntime, type FaceTiltMode } from "@/lib/face-tilt";
import { THEME_PRESETS } from "@/lib/themes";
import {
  headingFontId,
  useSettings,
  type ContentLang,
  type LineBreak,
  type WordBreak,
} from "@/lib/stores";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

function Field({ label, value, children }: { label: string; value?: string; children: ReactNode }) {
  return (
    <div className="grid gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <Label className="text-muted-foreground">{label}</Label>
        {value ? (
          <span className="font-mono text-xs tabular-nums text-muted-foreground">{value}</span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function NativeSelect({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-10 w-full rounded-md bg-background px-3 text-sm shadow-[var(--shadow-border)] outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
    >
      {children}
    </select>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="flex items-center gap-2">
        <input
          type="color"
          value={normalizeHex(value, "#000000")}
          onChange={(event) => onChange(event.target.value)}
          className="size-8 cursor-pointer rounded-md border-0 bg-transparent p-0"
          aria-label={label}
        />
        <Input
          value={value}
          onChange={(event) => onChange(normalizeHex(event.target.value, value))}
          className="h-9 w-[6.5rem] font-mono text-xs"
        />
      </span>
    </label>
  );
}

export function SettingsPanel() {
  const settings = useSettings();
  const t = messages(settings.uiLang);
  const headingId = headingFontId(settings);
  const previewStack = fontStack(settings.bodyFont, "gowun-batang");
  const tiltStatus = useFaceTiltRuntime((s) => s.status);
  const tiltStatusText =
    tiltStatus === "loading"
      ? t.faceTiltLoading
      : tiltStatus === "tracking"
        ? t.faceTiltTracking
        : tiltStatus === "lost"
          ? t.faceTiltLost
          : null;

  return (
    <ScrollArea className="min-h-0 flex-1">
      <div className="flex flex-col gap-8 px-6 pb-10">
        <section className="grid gap-3">
          <h3 className="text-sm font-medium">{t.appSection}</h3>
          <Field label={t.appLanguage}>
            <NativeSelect
              value={settings.uiLang}
              onChange={(value) => {
                if (isAppLang(value)) settings.set({ uiLang: value });
              }}
            >
              {APP_LANGS.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.native}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <p className="text-xs text-muted-foreground">{t.appLanguageHint}</p>
        </section>

        <Separator />

        <section className="grid gap-3">
          <h3 className="text-sm font-medium">{t.paper}</h3>
          <div className="grid grid-cols-2 gap-2">
            {THEME_PRESETS.map((theme) => {
              const active = settings.preset === theme.id;
              const copy = t.themes[theme.id] ?? {
                name: theme.name,
                description: theme.description,
              };
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => settings.applyPreset(theme.id)}
                  className={cn(
                    "flex h-16 flex-col items-start justify-between rounded-xl px-3 py-2 text-left shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-150",
                    active && "ring-2 ring-ring/70",
                  )}
                  style={{ background: theme.colors.bg, color: theme.colors.fg }}
                >
                  <span className="text-sm font-medium">{copy.name}</span>
                  <span className="text-xs opacity-70">{copy.description}</span>
                </button>
              );
            })}
          </div>
        </section>

        <Separator />

        <section className="grid gap-4">
          <h3 className="text-sm font-medium">{t.fonts}</h3>
          <Field label={t.body}>
            <NativeSelect
              value={settings.bodyFont}
              onChange={(id) => settings.set({ bodyFont: id })}
            >
              {BODY_FONTS.map((font) => (
                <option key={font.id} value={font.id}>
                  {font.name}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field label={t.heading}>
            <NativeSelect
              value={settings.headingFont}
              onChange={(id) => settings.set({ headingFont: id })}
            >
              <option value="match-body">{t.matchBody}</option>
              {BODY_FONTS.map((font) => (
                <option key={font.id} value={font.id}>
                  {font.name}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field label={t.code}>
            <NativeSelect
              value={settings.monoFont}
              onChange={(id) => settings.set({ monoFont: id })}
            >
              {MONO_FONTS.map((font) => (
                <option key={font.id} value={font.id}>
                  {font.name}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <p
            className="rounded-xl bg-muted px-3 py-3 text-base leading-relaxed"
            style={{ fontFamily: previewStack, fontWeight: settings.fontWeight }}
          >
            {FONT_BY_ID.get(settings.bodyFont)?.name} · 가나다라 ABCabc あいう 漢字
          </p>
          <p
            className="text-xs text-muted-foreground"
            style={{
              fontFamily: fontStack(headingId, "gowun-batang"),
              fontWeight: settings.headingWeight,
            }}
          >
            {t.headingPreview} · {FONT_BY_ID.get(headingId)?.name}
          </p>
          <Field label={t.size} value={`${settings.fontSize}px`}>
            <Slider
              min={14}
              max={24}
              step={1}
              value={[settings.fontSize]}
              onValueChange={([value]) => settings.set({ fontSize: value ?? 17 })}
            />
          </Field>
          <Field
            label={t.fontWeight}
            value={`${settings.fontWeight} · ${weightName(settings.fontWeight, settings.uiLang)}`}
          >
            <Slider
              min={300}
              max={700}
              step={100}
              value={[settings.fontWeight]}
              onValueChange={([value]) => settings.set({ fontWeight: value ?? 400 })}
            />
          </Field>
          <Field
            label={t.headingWeight}
            value={`${settings.headingWeight} · ${weightName(settings.headingWeight, settings.uiLang)}`}
          >
            <Slider
              min={300}
              max={700}
              step={100}
              value={[settings.headingWeight]}
              onValueChange={([value]) => settings.set({ headingWeight: value ?? 600 })}
            />
          </Field>
          <Field label={t.lineHeight} value={settings.lineHeight.toFixed(2)}>
            <Slider
              min={1.4}
              max={2.2}
              step={0.05}
              value={[settings.lineHeight]}
              onValueChange={([value]) => settings.set({ lineHeight: value ?? 1.85 })}
            />
          </Field>
          <Field label={t.letterSpacing} value={`${settings.letterSpacing.toFixed(3)}em`}>
            <Slider
              min={-0.04}
              max={0.08}
              step={0.005}
              value={[settings.letterSpacing]}
              onValueChange={([value]) => settings.set({ letterSpacing: value ?? 0 })}
            />
          </Field>
        </section>

        <Separator />

        <section className="grid gap-4">
          <h3 className="text-sm font-medium">{t.paragraph}</h3>
          <Field label={t.contentWidth} value={`${settings.maxWidth}rem`}>
            <Slider
              min={32}
              max={64}
              step={1}
              value={[settings.maxWidth]}
              onValueChange={([value]) => settings.set({ maxWidth: value ?? 44 })}
            />
          </Field>
          <Field label={t.paragraphGap} value={`${settings.paragraphSpacing.toFixed(2)}em`}>
            <Slider
              min={0.4}
              max={1.6}
              step={0.05}
              value={[settings.paragraphSpacing]}
              onValueChange={([value]) => settings.set({ paragraphSpacing: value ?? 0.9 })}
            />
          </Field>
          <Field label={t.contentLanguage}>
            <NativeSelect
              value={settings.contentLang}
              onChange={(value) => settings.set({ contentLang: value as ContentLang })}
            >
              {APP_LANGS.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.native}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field label={t.wordBreak}>
            <NativeSelect
              value={settings.wordBreak}
              onChange={(value) => settings.set({ wordBreak: value as WordBreak })}
            >
              <option value="keep-all">{t.wordBreakKeep}</option>
              <option value="break-word">{t.wordBreakWord}</option>
              <option value="normal">{t.wordBreakNormal}</option>
            </NativeSelect>
          </Field>
          <Field label={t.cjkLineBreak}>
            <NativeSelect
              value={settings.lineBreak}
              onChange={(value) => settings.set({ lineBreak: value as LineBreak })}
            >
              <option value="auto">{t.lbAuto}</option>
              <option value="loose">{t.lbLoose}</option>
              <option value="normal">{t.lbNormal}</option>
              <option value="strict">{t.lbStrict}</option>
              <option value="anywhere">{t.lbAnywhere}</option>
            </NativeSelect>
          </Field>
          <div className="flex items-center justify-between gap-3">
            <div className="grid gap-1">
              <Label>{t.hangingPunct}</Label>
              <p className="text-xs text-muted-foreground">{t.hangingPunctHint}</p>
            </div>
            <Switch
              checked={settings.hangingPunctuation}
              onCheckedChange={(checked) => settings.set({ hangingPunctuation: checked })}
            />
          </div>
        </section>

        <Separator />

        <section className="grid gap-3">
          <h3 className="text-sm font-medium">{t.colors}</h3>
          <ColorField
            label={t.colorBg}
            value={settings.colors.bg}
            onChange={(bg) => settings.setColors({ bg })}
          />
          <ColorField
            label={t.colorFg}
            value={settings.colors.fg}
            onChange={(fg) => settings.setColors({ fg })}
          />
          <ColorField
            label={t.colorHeading}
            value={settings.colors.heading}
            onChange={(heading) => settings.setColors({ heading })}
          />
          <ColorField
            label={t.colorMuted}
            value={settings.colors.muted}
            onChange={(muted) => settings.setColors({ muted })}
          />
          <ColorField
            label={t.colorLink}
            value={settings.colors.link}
            onChange={(link) => settings.setColors({ link })}
          />
          <ColorField
            label={t.colorCodeBg}
            value={settings.colors.codeBg}
            onChange={(codeBg) => settings.setColors({ codeBg })}
          />
        </section>

        <Separator />

        <section className="grid gap-4">
          <h3 className="text-sm font-medium">{t.engine}</h3>
          <div className="flex items-center justify-between gap-3">
            <div className="grid gap-1 pr-3">
              <Label>{t.cjkEmphasis}</Label>
              <p className="text-xs text-muted-foreground">{t.cjkEmphasisHint}</p>
            </div>
            <Switch
              checked={settings.cjkFriendly}
              onCheckedChange={(checked) => settings.set({ cjkFriendly: checked })}
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="grid gap-1 pr-3">
              <Label>{t.softBreaks}</Label>
              <p className="text-xs text-muted-foreground">{t.softBreaksHint}</p>
            </div>
            <Switch
              checked={settings.softBreaks}
              onCheckedChange={(checked) => settings.set({ softBreaks: checked })}
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="grid gap-1 pr-3">
              <Label>{t.syncScroll}</Label>
              <p className="text-xs text-muted-foreground">{t.syncScrollHint}</p>
            </div>
            <Switch
              checked={settings.syncScroll}
              onCheckedChange={(checked) => settings.set({ syncScroll: checked })}
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="grid gap-1 pr-3">
              <Label>{t.toc}</Label>
              <p className="text-xs text-muted-foreground">{t.tocHint}</p>
            </div>
            <Switch
              checked={settings.showToc}
              onCheckedChange={(checked) => settings.set({ showToc: checked })}
            />
          </div>
        </section>

        <Separator />

        <section className="grid gap-4">
          <h3 className="text-sm font-medium">{t.faceTilt}</h3>
          <div className="flex items-center justify-between gap-3">
            <div className="grid gap-1 pr-3">
              <Label>{t.faceTilt}</Label>
              <p className="text-xs text-muted-foreground">{t.faceTiltHint}</p>
              <p className="text-xs text-muted-foreground">{t.faceTiltPrivacy}</p>
              {settings.faceTilt && tiltStatusText ? (
                <p className="text-xs text-foreground" aria-live="polite">
                  {tiltStatusText}
                </p>
              ) : null}
            </div>
            <Switch
              checked={settings.faceTilt}
              onCheckedChange={(checked) =>
                settings.set(
                  checked ? { faceTilt: true, viewMode: "preview" } : { faceTilt: false },
                )
              }
            />
          </div>
          <Field label={t.faceTiltMode}>
            <NativeSelect
              value={settings.faceTiltMode}
              onChange={(value) => settings.set({ faceTiltMode: value as FaceTiltMode })}
            >
              <option value="free">{t.faceTiltFree}</option>
              <option value="snap">{t.faceTiltSnap}</option>
            </NativeSelect>
          </Field>
          <p className="text-xs text-muted-foreground">{t.faceTiltFreeHint}</p>
          <div className="flex items-center justify-between gap-3">
            <div className="grid gap-1 pr-3">
              <Label>{t.faceTiltInvert}</Label>
              <p className="text-xs text-muted-foreground">{t.faceTiltInvertHint}</p>
            </div>
            <Switch
              checked={settings.faceTiltInvert}
              onCheckedChange={(checked) => settings.set({ faceTiltInvert: checked })}
            />
          </div>
        </section>

        <Button variant="outline" onClick={() => settings.reset()}>
          {t.resetDefaults}
        </Button>
      </div>
    </ScrollArea>
  );
}
