import { create } from "zustand";
import {
  deleteRemoteDocument,
  getRemoteDocument,
  listRemoteDocuments,
  upsertRemoteDocument,
} from "@/lib/documents-api";
import { deleteDocument, getDocument, listDocuments, putDocument } from "@/lib/library";
import { planSync } from "@/lib/sync-plan";

export type SyncStatus = "idle" | "syncing" | "done" | "error";

type SyncState = {
  status: SyncStatus;
  lastSyncedAt: number | null;
  /** Counts from the last run, for the status line. */
  pushed: number;
  pulled: number;
};

export const useSyncState = create<SyncState>(() => ({
  status: "idle",
  lastSyncedAt: null,
  pushed: 0,
  pulled: 0,
}));

let inFlight: Promise<void> | null = null;

/**
 * Two-way sync between this browser's library and the signed-in account.
 * Safe to call often; concurrent calls share one run.
 */
export function syncLibrary(): Promise<void> {
  if (inFlight) return inFlight;
  inFlight = (async () => {
    useSyncState.setState({ status: "syncing" });
    try {
      const [local, remote] = await Promise.all([listDocuments(), listRemoteDocuments()]);
      const plan = planSync(local, remote);

      for (const id of plan.deleteLocal) await deleteDocument(id);

      let pushed = 0;
      for (const id of plan.push) {
        const doc = await getDocument(id);
        if (!doc) continue;
        await upsertRemoteDocument({
          data: { id: doc.id, name: doc.name, markdown: doc.markdown, updatedAt: doc.updatedAt },
        });
        pushed += 1;
      }

      let pulled = 0;
      for (const id of plan.pull) {
        const doc = await getRemoteDocument({ data: { id } });
        if (!doc || doc.deleted) continue;
        await putDocument({
          id: doc.id,
          name: doc.name,
          markdown: doc.markdown,
          updatedAt: doc.updatedAt,
        });
        pulled += 1;
      }

      useSyncState.setState({ status: "done", lastSyncedAt: Date.now(), pushed, pulled });
    } catch (error) {
      console.warn("[sync] failed", error);
      useSyncState.setState({ status: "error" });
    } finally {
      inFlight = null;
    }
  })();
  return inFlight;
}

/** Best-effort remote delete; the local delete has already happened. */
export async function deleteRemote(id: string): Promise<void> {
  try {
    await deleteRemoteDocument({ data: { id } });
  } catch (error) {
    console.warn("[sync] remote delete failed", error);
  }
}
