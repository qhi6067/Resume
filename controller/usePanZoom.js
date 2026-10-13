"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MIN_SCALE = 0.2;
const MAX_SCALE = 5;
const FIT_PADDING = 24;

// Below roughly this scale the 13px diagram labels stop being readable, so
// "fit" stops shrinking and the viewer pans instead.
const MIN_READABLE_SCALE = 0.72;

// Phones get the whole shape first and pinch-zoom for the detail.
const MIN_PHONE_SCALE = 0.38;
const NARROW_VIEWPORT = 560;

const clampScale = (k) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, k));

/**
 * New view for a drag, from the baseline captured when the gesture began.
 * Pure, so the gesture math can be tested without a browser.
 */
export function panView(base, origin, now) {
  return {
    k: base.k,
    x: base.x + (now.x - origin.x),
    y: base.y + (now.y - origin.y),
  };
}

/**
 * New view for a pinch. Holds the point under the original pinch centre fixed
 * while the fingers spread, then follows the centre as it drifts so pinching
 * and dragging feel like one gesture. Pure, for the same reason as panView.
 */
export function pinchView(base, origin, baseSpread, now, dist, rect) {
  const k = clampScale(base.k * (dist / baseSpread));
  const ratio = k / base.k;

  const ax = origin.x - rect.left;
  const ay = origin.y - rect.top;

  return {
    k,
    x: ax - (ax - base.x) * ratio + (now.x - origin.x),
    y: ay - (ay - base.y) * ratio + (now.y - origin.y),
  };
}

/**
 * usePanZoom
 *
 * Drives a translate/scale transform on a content layer inside a fixed-size
 * container. Handles mouse drag, wheel zoom at the cursor, and two-finger
 * pinch on touch — so a wide architecture diagram stays readable on a phone.
 *
 * Attach `containerRef` to the viewport and `contentRef` to the layer that
 * holds the SVG. Spread `handlers` onto the viewport element.
 */
export function usePanZoom() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  const [view, setView] = useState({ x: 0, y: 0, k: 1 });
  const [size, setSize] = useState(null); // natural diagram size in px
  const [isPanning, setIsPanning] = useState(false);

  // Live pointers, keyed by pointerId, plus the in-flight gesture baseline.
  const pointers = useRef(new Map());
  const gesture = useRef(null);

  // A gesture baseline read from state can be a frame stale, which makes a
  // pinch jump at the moment the second finger lands. Track it live instead.
  const viewRef = useRef(view);
  viewRef.current = view;

  /** Read the diagram's intrinsic size from its viewBox (transform-independent). */
  const measure = useCallback(() => {
    const svg = contentRef.current?.querySelector("svg");
    if (!svg) return null;

    const box = svg.viewBox?.baseVal;
    if (box?.width && box?.height) return { w: box.width, h: box.height };

    const w = svg.width?.baseVal?.value || svg.clientWidth;
    const h = svg.height?.baseVal?.value || svg.clientHeight;
    return w && h ? { w, h } : null;
  }, []);

  /** Scale the diagram to fit the viewport and center it. */
  const fit = useCallback(() => {
    const container = containerRef.current;
    const natural = measure();
    if (!container || !natural) return;

    const availW = container.clientWidth - FIT_PADDING * 2;
    const availH = container.clientHeight - FIT_PADDING * 2;
    if (availW <= 0 || availH <= 0) return;

    // Scale to show the whole diagram, but never past 1 (upscaled vector text
    // reads as blurry) and never below the point where labels stop being
    // legible — past that it is better to open readable and let the viewer pan.
    // On a phone the whole shape matters more than reading every label at a
    // glance, and pinch-zoom is right there, so the floor drops.
    const floor = container.clientWidth < NARROW_VIEWPORT ? MIN_PHONE_SCALE : MIN_READABLE_SCALE;
    const whole = Math.min(availW / natural.w, availH / natural.h, 1);
    const k = clampScale(Math.max(whole, floor));

    const scaledW = natural.w * k;
    const scaledH = natural.h * k;

    // Pin the axis the diagram flows along so it opens at the beginning, and
    // center the cross axis — a top-down diagram centers its ranks, so pinning
    // it left would open on empty margin.
    const flowsSideways = natural.w >= natural.h;
    const pinX = flowsSideways && scaledW > container.clientWidth;
    const pinY = !flowsSideways && scaledH > container.clientHeight;

    setSize(natural);
    setView({
      x: pinX ? FIT_PADDING : (container.clientWidth - scaledW) / 2,
      y: pinY ? FIT_PADDING : (container.clientHeight - scaledH) / 2,
      k,
    });
  }, [measure]);

  /** Zoom by `factor`, keeping the point under (clientX, clientY) fixed. */
  const zoomAt = useCallback((clientX, clientY, factor) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;

    setView((v) => {
      const k = clampScale(v.k * factor);
      const ratio = k / v.k;
      return {
        k,
        x: px - (px - v.x) * ratio,
        y: py - (py - v.y) * ratio,
      };
    });
  }, []);

  /** Zoom about the viewport center — for the on-screen buttons. */
  const zoomBy = useCallback(
    (factor) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, factor);
    },
    [zoomAt]
  );

  // Wheel zoom. Registered natively so preventDefault works (React's
  // onWheel is passive and cannot stop the page from scrolling behind).
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e) => {
      e.preventDefault();
      const factor = Math.exp(-e.deltaY * 0.0016);
      zoomAt(e.clientX, e.clientY, factor);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  // iOS Safari pinch-zooms the page on two fingers even where touch-action is
  // none, and drives it through its own non-standard gesture events. Swallow
  // both so the pinch scales the diagram instead of the whole page.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const swallow = (e) => e.preventDefault();
    const onTouchMove = (e) => {
      if (e.touches.length > 1) e.preventDefault();
    };

    const opts = { passive: false };
    container.addEventListener("gesturestart", swallow, opts);
    container.addEventListener("gesturechange", swallow, opts);
    container.addEventListener("gestureend", swallow, opts);
    container.addEventListener("touchmove", onTouchMove, opts);

    return () => {
      container.removeEventListener("gesturestart", swallow, opts);
      container.removeEventListener("gesturechange", swallow, opts);
      container.removeEventListener("gestureend", swallow, opts);
      container.removeEventListener("touchmove", onTouchMove, opts);
    };
  }, []);

  // Re-fit when the viewport resizes (orientation change, window drag).
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(() => fit());
    ro.observe(container);
    return () => ro.disconnect();
  }, [fit]);

  const centroid = (list) => {
    const pts = [...list];
    const x = pts.reduce((sum, p) => sum + p.x, 0) / pts.length;
    const y = pts.reduce((sum, p) => sum + p.y, 0) / pts.length;
    return { x, y };
  };

  const spread = (list) => {
    const [a, b] = [...list];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };

  const onPointerDown = (e) => {
    // Let links and buttons inside the diagram behave normally.
    if (e.target.closest("a")) return;

    e.currentTarget.setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 1) {
      gesture.current = {
        type: "pan",
        origin: centroid(pointers.current.values()),
        view: { ...viewRef.current },
      };
      setIsPanning(true);
    } else if (pointers.current.size >= 2) {
      // Rebase on every extra finger so a pinch can start from a pan, and so a
      // third finger landing does not leave a stale baseline behind.
      gesture.current = {
        type: "pinch",
        origin: centroid(pointers.current.values()),
        spread: spread(pointers.current.values()),
        view: { ...viewRef.current },
      };
      setIsPanning(false);
    }
  };

  const onPointerMove = (e) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    const active = gesture.current;
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    if (active.type === "pan" && pointers.current.size === 1) {
      setView(panView(active.view, active.origin, centroid(pointers.current.values())));
      return;
    }

    if (active.type === "pinch" && pointers.current.size >= 2) {
      if (!active.spread) return;

      setView(
        pinchView(
          active.view,
          active.origin,
          active.spread,
          centroid(pointers.current.values()),
          spread(pointers.current.values()),
          container.getBoundingClientRect()
        )
      );
    }
  };

  const endPointer = (e) => {
    pointers.current.delete(e.pointerId);

    if (pointers.current.size === 1) {
      // Dropped from pinch to one finger — rebase as a pan.
      gesture.current = {
        type: "pan",
        origin: centroid(pointers.current.values()),
        view: { ...viewRef.current },
      };
      setIsPanning(true);
    } else if (pointers.current.size === 0) {
      gesture.current = null;
      setIsPanning(false);
    }
  };

  return {
    containerRef,
    contentRef,
    view,
    size,
    isPanning,
    fit,
    zoomIn: () => zoomBy(1.25),
    zoomOut: () => zoomBy(1 / 1.25),
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endPointer,
      // No onPointerLeave: with pointer capture it fires spuriously on iOS when
      // a finger strays past the stage edge, which dropped a live pinch back to
      // a pan mid-gesture. Up and cancel already cover every real end.
      onPointerCancel: endPointer,
    },
  };
}
