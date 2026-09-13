/** Pure merge rules for browser-library ⇄ account sync (unit-tested in Node). */

export type LocalEntry = { id: string; updatedAt: number };
export type RemoteEntry = { id: string; updatedAt: number; deleted: boolean };

export type SyncPlan = {
  /** Local documents to upload (missing remotely or newer locally). */
  push: string[];
  /** Remote documents to download (missing locally or newer remotely). */
  pull: string[];
  /** Local documents to remove because the account deleted them later. */
  deleteLocal: string[];
};

/** Last write wins per document id; a remote tombstone beats an older local copy. */
export function planSync(local: LocalEntry[], remote: RemoteEntry[]): SyncPlan {
  const plan: SyncPlan = { push: [], pull: [], deleteLocal: [] };
  const remoteById = new Map(remote.map((r) => [r.id, r]));
  const localById = new Map(local.map((l) => [l.id, l]));

  for (const l of local) {
    const r = remoteById.get(l.id);
    if (!r) {
      plan.push.push(l.id);
    } else if (r.deleted) {
      if (l.updatedAt > r.updatedAt) plan.push.push(l.id);
      else plan.deleteLocal.push(l.id);
    } else if (l.updatedAt > r.updatedAt) {
      plan.push.push(l.id);
    } else if (r.updatedAt > l.updatedAt) {
      plan.pull.push(l.id);
    }
  }
  for (const r of remote) {
    if (!r.deleted && !localById.has(r.id)) plan.pull.push(r.id);
  }
  return plan;
}
