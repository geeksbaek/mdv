import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bookLayout, leafSpec } from "./book-layout.ts";

describe("bookLayout", () => {
  it("uses two pages on a wide landscape area", () => {
    const l = bookLayout(1400, 800);
    assert.equal(l.pages, 2);
    assert.ok(l.pageWidth * 2 <= 1400 && l.pageHeight <= 800);
  });

  it("uses a single page on iPad portrait and phones", () => {
    assert.equal(bookLayout(768, 960).pages, 1);
    assert.equal(bookLayout(390, 780).pages, 1);
    const l = bookLayout(768, 960);
    assert.ok(l.pageWidth <= 768 - 64 && l.pageHeight <= 960 - 48);
  });

  it("uses two pages on an unfolded Galaxy Fold", () => {
    assert.equal(bookLayout(884, 760).pages, 2);
  });

  it("aligns the spine with the hinge on a dual-screen device", () => {
    const l = bookLayout(1114, 650, [
      { left: 0, width: 540 },
      { left: 574, width: 540 },
    ]);
    assert.equal(l.pages, 2);
    assert.equal(l.spineGap, 34);
    assert.ok(l.pageWidth <= 540 - 32);
    // Left page ends exactly at the hinge's left edge.
    assert.equal((l.left ?? 0) + l.pageWidth, 540);
  });
});

describe("leafSpec", () => {
  const two = bookLayout(1400, 800);
  it("turns the right page forward around the spine and shows its back past 90°", () => {
    const early = leafSpec(two, 1, 1, 0.2);
    assert.equal(early.x, two.pageWidth);
    assert.equal(early.origin, "left");
    assert.equal(early.showingBack, false);
    assert.equal(early.front, 3);
    const late = leafSpec(two, 1, 1, 0.8);
    assert.equal(late.showingBack, true);
    assert.equal(late.back, 4);
    assert.ok(late.rotate < -90);
  });

  it("turns the left page back around the spine", () => {
    const spec = leafSpec(two, 2, -1, 0.9);
    assert.equal(spec.x, 0);
    assert.equal(spec.origin, "right");
    assert.equal(spec.front, 4);
    assert.equal(spec.back, 3);
    assert.ok(spec.rotate > 90);
  });

  it("flips a single page like a notepad, back first when going back", () => {
    const one = bookLayout(768, 960);
    assert.equal(leafSpec(one, 3, 1, 0.1).front, 3);
    const back = leafSpec(one, 3, -1, 0.1);
    assert.equal(back.showingBack, true);
    assert.equal(leafSpec(one, 3, -1, 0.9).front, 2);
  });
});

describe("edgeThickness", () => {
  it("grows the left pile and shrinks the right one as reading progresses", async () => {
    const { edgeThickness } = await import("./book-layout.ts");
    const start = edgeThickness(40, 0, 2, 500);
    assert.equal(start.read, 0);
    assert.equal(start.remainingPages, 38);
    const mid = edgeThickness(40, 20, 2, 500);
    assert.ok(mid.read > 0 && mid.read < start.remaining);
    const end = edgeThickness(40, 38, 2, 500);
    assert.equal(end.remaining, 0);
    assert.equal(end.readPages, 38);
  });

  it("draws exactly one stripe per page while the book fits under the cap", async () => {
    const { edgeThickness } = await import("./book-layout.ts");
    const e = edgeThickness(30, 10, 2, 800);
    assert.equal(e.exact, true);
    assert.equal(e.pitch, 3);
    assert.equal(e.read, 10 * 3);
    assert.equal(e.remaining, 18 * 3);
    assert.equal(edgeThickness(500, 1, 2, 500).read >= 1, true);
  });

  it("shares one pitch across both piles and narrows it before going proportional", async () => {
    const { edgeThickness } = await import("./book-layout.ts");
    // 800px page → 96px cap: 40 pages need 120px at 3px, so drop to 2px.
    const narrow = edgeThickness(40, 20, 2, 800);
    assert.equal(narrow.exact, true);
    assert.equal(narrow.pitch, 2);
    assert.equal(narrow.read, 40);
    assert.equal(narrow.remaining, 36);
    // 1000 pages can't fit; widths stay capped and proportional.
    const huge = edgeThickness(1000, 1000, 1, 2000);
    assert.equal(huge.exact, false);
    assert.ok(huge.read <= 120);
    assert.ok(huge.pitch < 2);
  });
});
