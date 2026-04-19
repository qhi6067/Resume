"use client";

import { useEffect } from "react";

/**
 * useRevealOnScroll
 *
 * Direction-aware scroll reveal with:
 * - data-reveal         → slide up (default)
 * - data-reveal="left"  → slide from left
 * - data-reveal="right" → slide from right
 * - data-reveal="scale" → scale up
 * - data-stagger        → stagger-reveal all direct children
 *
 * Also handles:
 * - [data-count] → animated number counter on reveal
 * - .section elements → adds .section-in class for title underline animation
 */
export function useRevealOnScroll() {
  useEffect(() => {
    // Gather all reveal targets (including valued attributes)
    const revealTargets = document.querySelectorAll(
      "[data-reveal], [data-stagger], .section"
    );
    const countTargets = document.querySelectorAll("[data-count]");

    // ── Intersection observer for reveals ──────────────────────────
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;

          // Mark as revealed
          el.classList.add("in");

          // For sections, also add section-in for the title underline animation
          if (el.classList.contains("section")) {
            el.classList.add("section-in");
          }

          revealObserver.unobserve(el);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));

    // ── Counter animation ──────────────────────────────────────────
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          if (isNaN(target)) return;

          animateCount(el, target);
          counterObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    countTargets.forEach((el) => counterObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
    };
  }, []);
}

/**
 * Animates a number from 0 → target over ~900ms with easing.
 * Uses requestAnimationFrame for smooth performance.
 */
function animateCount(el, target) {
  const duration = 900;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);

    el.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(step);
}
