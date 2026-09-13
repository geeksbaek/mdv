import { createFileRoute } from "@tanstack/react-router";

/** Mounts this app's Better Auth at `/api/auth/*` (sign-in, callbacks, session). */
export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: async ({ request }) => (await import("@/lib/auth/server")).auth.handler(request),
      POST: async ({ request }) => (await import("@/lib/auth/server")).auth.handler(request),
    },
  },
});
