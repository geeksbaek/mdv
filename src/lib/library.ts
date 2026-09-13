/**
 * Documents saved in the browser (IndexedDB). Nothing leaves the device; the
 * library is per browser profile, like a local folder the viewer owns.
 */

export type SavedDocument = {
  id: string;
  name: string;
  markdown: string;
  updatedAt: number;
};

export type SavedDocumentSummary = Omit<SavedDocument, "markdown"> & { size: number };

const DB_NAME = "hanji-library";
const STORE = "documents";
const VERSION = 1;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB unavailable"));
      return;
    }
    const request = indexedDB.open(DB_NAME, VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: "id" });
        store.createIndex("updatedAt", "updatedAt");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("IndexedDB open failed"));
  });
}

function run<T>(
  mode: IDBTransactionMode,
  work: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const tx = db.transaction(STORE, mode);
        const request = work(tx.objectStore(STORE));
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error ?? new Error("IndexedDB request failed"));
        tx.oncomplete = () => db.close();
        tx.onabort = () => {
          db.close();
          reject(tx.error ?? new Error("IndexedDB transaction aborted"));
        };
      }),
  );
}

export function newDocumentId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export async function listDocuments(): Promise<SavedDocumentSummary[]> {
  const all = await run<SavedDocument[]>("readonly", (store) => store.getAll());
  return all
    .map(({ markdown, ...rest }) => ({ ...rest, size: markdown.length }))
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getDocument(id: string): Promise<SavedDocument | undefined> {
  return run<SavedDocument | undefined>("readonly", (store) => store.get(id));
}

export async function saveDocument(input: {
  id?: string | null;
  name: string;
  markdown: string;
}): Promise<SavedDocument> {
  const doc: SavedDocument = {
    id: input.id ?? newDocumentId(),
    name: input.name.trim() || "untitled.md",
    markdown: input.markdown,
    updatedAt: Date.now(),
  };
  await run("readwrite", (store) => store.put(doc));
  return doc;
}

/** Store a document exactly as given (used when pulling from the account). */
export async function putDocument(doc: SavedDocument): Promise<void> {
  await run("readwrite", (store) => store.put(doc));
}

export async function renameDocument(id: string, name: string): Promise<void> {
  const existing = await getDocument(id);
  if (!existing) return;
  await run("readwrite", (store) => store.put({ ...existing, name: name.trim() || existing.name }));
}

export async function deleteDocument(id: string): Promise<void> {
  await run("readwrite", (store) => store.delete(id));
}
