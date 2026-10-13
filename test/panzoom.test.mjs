import { panView, pinchView } from "../controller/usePanZoom.js";

const rect = { left: 0, top: 0 };          // stage at viewport origin
const close = (a, b, eps = 1e-6) => Math.abs(a - b) < eps;
let pass = 0, fail = 0;
const check = (name, ok, detail = "") => {
  if (ok) { pass++; console.log("PASS " + name); }
  else { fail++; console.log("FAIL " + name + (detail ? "  " + detail : "")); }
};

// Where a diagram point lands on screen for a given view.
const project = (v, p) => ({ x: v.x + p.x * v.k, y: v.y + p.y * v.k });
// Which diagram point currently sits under a screen point.
const unproject = (v, s) => ({ x: (s.x - v.x) / v.k, y: (s.y - v.y) / v.k });

// ── 1. Spreading fingers from a stationary centre zooms IN and holds that
//       centre's diagram point perfectly still. This is the core invariant.
{
  const base = { x: 10, y: 20, k: 0.38 };
  const origin = { x: 187, y: 400 };                 // phone-width centre
  const anchoredBefore = unproject(base, origin);

  const next = pinchView(base, origin, 100, origin, 250, rect);
  const anchoredAfter = project(next, anchoredBefore);

  check("pinch out increases scale", next.k > base.k, `k ${base.k} -> ${next.k}`);
  check("pinch out scale is exact", close(next.k, 0.38 * 2.5), `got ${next.k}`);
  check("anchor point stays put",
    close(anchoredAfter.x, origin.x, 1e-9) && close(anchoredAfter.y, origin.y, 1e-9),
    `(${anchoredAfter.x}, ${anchoredAfter.y}) vs (${origin.x}, ${origin.y})`);
}

// ── 2. Pinching in zooms OUT and still holds the anchor.
{
  const base = { x: -40, y: -90, k: 1.2 };
  const origin = { x: 200, y: 300 };
  const anchoredBefore = unproject(base, origin);
  const next = pinchView(base, origin, 300, origin, 150, rect);
  const anchoredAfter = project(next, anchoredBefore);

  check("pinch in decreases scale", next.k < base.k, `k ${base.k} -> ${next.k}`);
  check("pinch in anchor stays put",
    close(anchoredAfter.x, origin.x, 1e-9) && close(anchoredAfter.y, origin.y, 1e-9));
}

// ── 3. Scale is clamped to the usable range.
{
  const base = { x: 0, y: 0, k: 1 };
  const o = { x: 100, y: 100 };
  check("clamps at max 5", pinchView(base, o, 10, o, 100000, rect).k === 5);
  check("clamps at min 0.2", pinchView(base, o, 100000, o, 10, rect).k === 0.2);
}

// ── 4. Fingers that spread AND drift: zoom applies and the view follows.
{
  const base = { x: 0, y: 0, k: 0.5 };
  const origin = { x: 100, y: 100 };
  const drifted = { x: 160, y: 130 };
  const next = pinchView(base, origin, 100, drifted, 200, rect);
  const noDrift = pinchView(base, origin, 100, origin, 200, rect);
  check("drift translates by the centre delta",
    close(next.x - noDrift.x, 60) && close(next.y - noDrift.y, 30),
    `dx ${next.x - noDrift.x}, dy ${next.y - noDrift.y}`);
}

// ── 5. A stage offset from the viewport origin still anchors correctly.
{
  const offset = { left: 37, top: 128 };
  const base = { x: 5, y: 5, k: 0.72 };
  const origin = { x: 300, y: 500 };
  const anchorLocal = { x: (origin.x - offset.left - base.x) / base.k,
                        y: (origin.y - offset.top - base.y) / base.k };
  const next = pinchView(base, origin, 120, origin, 240, offset);
  const after = { x: offset.left + next.x + anchorLocal.x * next.k,
                  y: offset.top + next.y + anchorLocal.y * next.k };
  check("anchors correctly when the stage is offset",
    close(after.x, origin.x, 1e-9) && close(after.y, origin.y, 1e-9),
    `(${after.x}, ${after.y}) vs (${origin.x}, ${origin.y})`);
}

// ── 6. Pan translates 1:1 and never changes scale.
{
  const base = { x: 10, y: 10, k: 0.9 };
  const next = panView(base, { x: 50, y: 50 }, { x: 75, y: 20 });
  check("pan moves 1:1", next.x === 35 && next.y === -20, `${next.x}, ${next.y}`);
  check("pan preserves scale", next.k === 0.9);
}

// ── 7. Lifting one finger mid-pinch rebases to a pan with NO jump.
//       This is the bug the user hit: the view must be continuous.
{
  const duringPinch = { x: 123.5, y: 77.25, k: 1.6 };   // live view at liftoff
  const remaining = { x: 210, y: 410 };                  // the finger still down
  const rebased = panView(duringPinch, remaining, remaining);
  check("rebasing to pan does not jump",
    rebased.x === duringPinch.x && rebased.y === duringPinch.y && rebased.k === duringPinch.k,
    JSON.stringify(rebased));
}

console.log(`\n${pass} passed / ${fail} failed`);
process.exit(fail ? 1 : 0);
