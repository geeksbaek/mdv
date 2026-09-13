import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";

/** Server-side copy of a library document, scoped to the signed-in user. */
export type RemoteDocumentSummary = {
  id: string;
  name: string;
  updatedAt: number;
  deleted: boolean;
};

export type RemoteDocument = RemoteDocumentSummary & { markdown: string };

const MAX_MARKDOWN = 1_000_000;
const ID_RE = /^[A-Za-z0-9_-]{4,64}$/;

function readId(input: unknown): string {
  const id =
    typeof input === "object" && input && "id" in input
      ? String((input as { id: unknown }).id)
      : "";
  if (!ID_RE.test(id)) throw new Error("Invalid document id");
  return id;
}

type Row = {
  id: string;
  name: string;
  updated_at: string | number;
  deleted: boolean;
  markdown?: string;
};

function toSummary(row: Row): RemoteDocumentSummary {
  return { id: row.id, name: row.name, updatedAt: Number(row.updated_at), deleted: row.deleted };
}

export const listRemoteDocuments = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<RemoteDocumentSummary[]> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<Row>`
      select id, name, updated_at, deleted from documents
      where user_id = ${context.userId}
      order by updated_at desc
    `;
    return rows.map(toSummary);
  });

export const getRemoteDocument = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((input: unknown) => ({ id: readId(input) }))
  .handler(async ({ context, data }): Promise<RemoteDocument | null> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<Row>`
      select id, name, updated_at, deleted, markdown from documents
      where user_id = ${context.userId} and id = ${data.id} limit 1
    `;
    const row = rows[0];
    return row ? { ...toSummary(row), markdown: row.markdown ?? "" } : null;
  });

export const upsertRemoteDocument = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => {
    const id = readId(input);
    const o = input as { name?: unknown; markdown?: unknown; updatedAt?: unknown };
    const name =
      String(o.name ?? "")
        .trim()
        .slice(0, 200) || "untitled.md";
    const markdown = String(o.markdown ?? "");
    if (markdown.length > MAX_MARKDOWN) throw new Error("Document too large");
    const updatedAt = Number(o.updatedAt);
    if (!Number.isFinite(updatedAt) || updatedAt <= 0) throw new Error("Invalid timestamp");
    return { id, name, markdown, updatedAt: Math.floor(updatedAt) };
  })
  .handler(async ({ context, data }): Promise<RemoteDocumentSummary> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    // Newer wins; a row owned by someone else is never touched (the where clause
    // makes the upsert a no-op, and the select below returns nothing).
    await sql`
      insert into documents (id, user_id, name, markdown, updated_at, deleted)
      values (${data.id}, ${context.userId}, ${data.name}, ${data.markdown}, ${data.updatedAt}, false)
      on conflict (id) do update
        set name = excluded.name, markdown = excluded.markdown,
            updated_at = excluded.updated_at, deleted = false
        where documents.user_id = excluded.user_id
          and documents.updated_at <= excluded.updated_at
    `;
    const rows = await sql<Row>`
      select id, name, updated_at, deleted from documents
      where user_id = ${context.userId} and id = ${data.id} limit 1
    `;
    const row = rows[0];
    if (!row) throw new Error("Document belongs to another account");
    return toSummary(row);
  });

export const deleteRemoteDocument = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => ({ id: readId(input) }))
  .handler(async ({ context, data }): Promise<void> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const now = Date.now();
    await sql`
      insert into documents (id, user_id, name, markdown, updated_at, deleted)
      values (${data.id}, ${context.userId}, '', '', ${now}, true)
      on conflict (id) do update
        set markdown = '', updated_at = ${now}, deleted = true
        where documents.user_id = excluded.user_id
    `;
  });
