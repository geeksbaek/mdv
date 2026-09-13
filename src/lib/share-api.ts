import { createServerFn } from "@tanstack/react-start";

const MAX_SHARE_PAYLOAD = 400_000;

export const createShare = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const payload =
      typeof input === "object" && input && "payload" in input
        ? String((input as { payload: unknown }).payload)
        : "";
    if (payload.length < 8 || payload.length > MAX_SHARE_PAYLOAD || !/^[A-Za-z0-9_-]+$/.test(payload)) {
      throw new Error("Invalid share payload");
    }
    return { payload };
  })
  .handler(async ({ data }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const hash = new Uint8Array(
      await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data.payload)),
    );
    const digest = bytesToBase64Url(hash);

    for (const length of [8, 10, 12, 16]) {
      const code = digest.slice(0, length);
      const existing = await sql<{ payload: string }>`
        select payload from shares where code = ${code} limit 1
      `;
      const row = existing[0];
      if (!row) {
        await sql`insert into shares (code, payload) values (${code}, ${data.payload})`;
        return { code };
      }
      if (row.payload === data.payload) return { code };
    }

    throw new Error("Could not allocate a short code");
  });

export const getShare = createServerFn({ method: "GET" })
  .validator((input: unknown) => {
    const code =
      typeof input === "object" && input && "code" in input
        ? String((input as { code: unknown }).code)
        : "";
    if (!/^[A-Za-z0-9_-]{4,16}$/.test(code)) throw new Error("Invalid share code");
    return { code };
  })
  .handler(async ({ data }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<{ payload: string }>`
      select payload from shares where code = ${data.code} limit 1
    `;
    return { payload: rows[0]?.payload ?? null };
  });

function bytesToBase64Url(bytes: Uint8Array): string {
  const chunk = 0x8000;
  let binary = "";
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}
