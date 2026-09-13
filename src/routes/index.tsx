import { createFileRoute } from "@tanstack/react-router";
import { Studio } from "@/components/studio";

type IndexSearch = { d?: string };

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): IndexSearch => ({
    d: typeof search.d === "string" ? search.d : undefined,
  }),
  component: Home,
});

function Home() {
  const { d } = Route.useSearch();
  return <Studio encoded={d} />;
}
