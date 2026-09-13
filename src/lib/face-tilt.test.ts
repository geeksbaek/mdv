import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { coarsen, easeFree, fitRotatedBox, rollFromEyes, snapQuadrant } from "./face-tilt-math.ts";

describe("rollFromEyes", () => {
  it("is level for an upright face", () => {
    assert.equal(rollFromEyes({ x: 0.4, y: 0.5 }, { x: 0.6, y: 0.5 }, false), 0);
  });

  it("rotates clockwise on screen when the right ear drops (right eye lower in the frame)", () => {
    // Person's right eye sits on the image's left and lower than the left eye.
    const angle = rollFromEyes({ x: 0.4, y: 0.55 }, { x: 0.6, y: 0.45 }, false);
    assert.ok(angle > 20 && angle < 30, String(angle));
  });

  it("flips sign when inverted", () => {
    const a = rollFromEyes({ x: 0.4, y: 0.55 }, { x: 0.6, y: 0.45 }, false);
    const b = rollFromEyes({ x: 0.4, y: 0.55 }, { x: 0.6, y: 0.45 }, true);
    assert.equal(a, -b);
  });

  it("reports ±90 for a face lying on its side", () => {
    assert.equal(Math.abs(rollFromEyes({ x: 0.5, y: 0.4 }, { x: 0.5, y: 0.6 }, false)), 90);
  });
});

describe("snapQuadrant", () => {
  it("holds the current quadrant inside the hysteresis band", () => {
    assert.equal(snapQuadrant(50, 0), 0);
    assert.equal(snapQuadrant(-50, 0), 0);
  });

  it("snaps once past the band", () => {
    assert.equal(snapQuadrant(60, 0), 90);
    assert.equal(snapQuadrant(-60, 0), -90);
    assert.equal(snapQuadrant(170, 90), 180);
  });

  it("returns upright when the target is 0 from a side quadrant", () => {
    assert.equal(snapQuadrant(0, 90), 0);
  });
});

describe("easeFree", () => {
  it("ignores sub-degree jitter", () => {
    assert.equal(easeFree(0.6, 0), 0);
  });

  it("moves in whole degrees toward the target", () => {
    const next = easeFree(20, 0);
    assert.ok(next > 0 && next < 20);
    assert.equal(next, Math.round(next));
  });

  it("always advances at least one degree when off target", () => {
    assert.equal(easeFree(1.4, 0), 1);
    assert.equal(easeFree(-1.4, 0), -1);
  });

  it("converges exactly on the target", () => {
    let a = 0;
    for (let i = 0; i < 30; i++) a = easeFree(37, a);
    assert.equal(a, 37);
  });
});

describe("coarsen", () => {
  it("rounds down to the coarse step and never below one step", () => {
    assert.equal(coarsen(390), 384);
    assert.equal(coarsen(10), 24);
  });
});

describe("fitRotatedBox", () => {
  it("fills the viewport at 0°", () => {
    assert.deepEqual(fitRotatedBox(400, 800, 0), { width: 400, height: 800 });
  });

  it("swaps width and height at 90°", () => {
    assert.deepEqual(fitRotatedBox(400, 800, 90), { width: 800, height: 400 });
    assert.deepEqual(fitRotatedBox(400, 800, -90), { width: 800, height: 400 });
  });

  it("keeps the rotated box inside the viewport at 45°", () => {
    const { width, height } = fitRotatedBox(400, 800, 45);
    const s = Math.SQRT1_2;
    assert.ok(width * s + height * s <= 400 + 1);
    assert.ok(width * s + height * s <= 800 + 1);
    assert.ok(width > 0 && height > 0);
  });
});
