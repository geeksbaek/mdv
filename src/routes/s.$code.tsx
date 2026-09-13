import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Studio } from "@/components/studio";
import { messages } from "@/lib/i18n";
import { pageTitle, renderMarkdown } from "@/lib/markdown";
import { decodeSharePayload } from "@/lib/share";
import { getShare } from "@/lib/share-api";
import { useSettings } from "@/lib/stores";

async function titleFromPayload(payload: string | null): Promise<string> {
  const fallback = messages("ko").appTitle;
  if (!payload) return fallback;
  const doc = await decodeSharePayload(payload);
  if (!doc) return fallback;
  const headings = renderMarkdown(doc.markdown, {
    cjkFriendly: doc.settings?.cjkFriendly ?? true,
    softBreaks: doc.settings?.softBreaks ?? false,
  }).headings;
  return pageTitle(headings, messages("ko").untitledDocument);
}

export const Route = createFileRoute("/s/$code")({
  loader: async ({ params }) => {
    try {
      const { payload } = await getShare({ data: { code: params.code } });
      if (!payload) return { payload: null, title: messages("ko").linkMissing };
      const title = await titleFromPayload(payload);
      return { payload, title };
    } catch {
      return { payload: null, title: messages("ko").linkMissing };
    }
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData?.title ?? messages("ko").appTitle }],
  }),
  component: SharedDocument,
});

function SharedDocument() {
  const { payload } = Route.useLoaderData();
  const t = messages(useSettings((s) => s.uiLang));
  useEffect(() => {
    void useSettings.persist.rehydrate();
  }, []);
  useEffect(() => {
    if (!payload) document.title = t.linkMissing;
  }, [payload, t.linkMissing]);
  if (!payload) {
    return (
      <main className="flex h-dvh flex-col items-center justify-center gap-3 bg-background px-6 text-center text-foreground">
        <h1 className="text-lg font-medium tracking-tight">{t.linkMissing}</h1>
        <p className="max-w-sm text-sm text-muted-foreground">{t.linkMissingHint}</p>
        <Link to="/" className="text-sm underline underline-offset-4">
          {t.backHome}
        </Link>
      </main>
    );
  }
  return <Studio encoded={payload} />;
}