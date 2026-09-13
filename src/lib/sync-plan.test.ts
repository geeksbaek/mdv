import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { planSync } from "./sync-plan.ts";

describe("planSync", () => {
  it("pushes local-only and pulls remote-only documents", () => {
    const plan = planSync(
      [{ id: "a", updatedAt: 10 }],
      [{ id: "b", updatedAt: 5, deleted: false }],
    );
    assert.deepEqual(plan, { push: ["a"], pull: ["b"], deleteLocal: [] });
  });

  it("lets the newer side win", () => {
    const plan = planSync(
      [
        { id: "a", updatedAt: 20 },
        { id: "b", updatedAt: 5 },
        { id: "c", updatedAt: 7 },
      ],
      [
        { id: "a", updatedAt: 10, deleted: false },
        { id: "b", updatedAt: 9, deleted: false },
        { id: "c", updatedAt: 7, deleted: false },
      ],
    );
    assert.deepEqual(plan, { push: ["a"], pull: ["b"], deleteLocal: [] });
  });

  it("applies remote tombstones unless the local copy is newer", () => {
    const plan = planSync(
      [
        { id: "old", updatedAt: 3 },
        { id: "revived", updatedAt: 30 },
      ],
      [
        { id: "old", updatedAt: 8, deleted: true },
        { id: "revived", updatedAt: 8, deleted: true },
        { id: "gone", updatedAt: 9, deleted: true },
      ],
    );
    assert.deepEqual(plan, { push: ["revived"], pull: [], deleteLocal: ["old"] });
  });
});
