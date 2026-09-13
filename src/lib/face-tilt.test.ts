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
  it("holds the current step inside the hysteresis band", () => {
    assert.equal(easeFree(3.4, 0), 0);
    assert.equal(easeFree(-3.4, 0), 0);
    assert.equal(easeFree(8, 5), 5);
  });

  it("jumps to the nearest 5° step once past the band", () => {
    assert.equal(easeFree(3.6, 0), 5);
    assert.equal(easeFree(-3.6, 0), -5);
    assert.equal(easeFree(37, 0), 35);
    assert.equal(easeFree(178, 175), 175);
    assert.equal(easeFree(-178, 175), 180);
  });

  it("only ever returns multiples of five", () => {
    let a = 0;
    for (let t = 0; t <= 90; t += 0.7) {
      a = easeFree(t, a);
      assert.equal(a % 5, 0);
    }
    assert.equal(a, 90);
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

describe("screen geometry", () => {
  it("is the plain rectangle at 0°", async () => {
    const { screenPolygon, bandChord, verticalExtent } = await import("./face-tilt-math.ts");
    const poly = screenPolygon(400, 800, 0);
    assert.deepEqual(verticalExtent(poly), { min: -400, max: 400 });
    const chord = bandChord(poly, -100, 30);
    assert.ok(chord);
    assert.ok(Math.abs(chord.start + 200) < 1e-9 && Math.abs(chord.width - 400) < 1e-9);
  });

  it("swaps extents at 90°", async () => {
    const { screenPolygon, bandChord, verticalExtent } = await import("./face-tilt-math.ts");
    const poly = screenPolygon(400, 800, 90);
    const ext = verticalExtent(poly);
    assert.ok(Math.abs(ext.min + 200) < 1e-9 && Math.abs(ext.max - 200) < 1e-9);
    const chord = bandChord(poly, -50, 30);
    assert.ok(chord && Math.abs(chord.width - 800) < 1e-9);
  });

  it("gives narrower chords near the corners when tilted", async () => {
    const { screenPolygon, bandChord, verticalExtent } = await import("./face-tilt-math.ts");
    const poly = screenPolygon(400, 800, 30);
    const { min, max } = verticalExtent(poly);
    const nearTop = bandChord(poly, min + 5, 20);
    const middle = bandChord(poly, (min + max) / 2, 20);
    assert.ok(nearTop && middle);
    assert.ok(nearTop.width < middle.width);
    assert.equal(bandChord(poly, max - 5, 20), null);
  });
});
