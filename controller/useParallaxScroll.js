"use client";

import { useEffect, useRef } from "react";

/**
 * useDotNavTracking
 *
 * Tracks which section is currently in view and updates:
 * 1. The right-side dot navigation (`.dot-nav-item.dot-active`)
 * 2. The floating top nav links (`.nav-links button.nav-active`)
 * 3. Shows/hides the dot nav after user scrolls past the hero
 */
export function useDotNavTracking(sectionIds) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const dotNav = document.querySelector(".dot-nav");
    const heroHeight = document.querySelector(".hero-section")?.offsetHeight ?? 400;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Show dot nav after hero
      if (dotNav) {
        if (scrollY > heroHeight * 0.6) {
          dotNav.classList.add("dot-nav-visible");
        } else {
          dotNav.classList.remove("dot-nav-visible");
        }
      }

      // Find active section
      let activeId = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45) {
          activeId = id;
        }
      }

      // Update dot nav active state
      document.querySelectorAll(".dot-nav-item").forEach((dot) => {
        const isActive = dot.dataset.section === activeId;
        dot.classList.toggle("dot-active", isActive);
      });

      // Update floating nav active state
      document.querySelectorAll(".nav-links button[data-section]").forEach((btn) => {
        btn.classList.toggle("nav-active", btn.dataset.section === activeId);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);
}

/**
 * useFloatingNavVisibility
 *
 * The floating top nav shows immediately (always visible in this design).
 * This hook handles fade-in after welcome overlay clears.
 */
export function useFloatingNavVisibility(show) {
  useEffect(() => {
    const nav = document.querySelector(".floating-nav");
    if (!nav) return;

    if (show) {
      // Small delay after welcome overlay clears
      const t = setTimeout(() => {
        nav.classList.remove("nav-hidden");
      }, 300);
      return () => clearTimeout(t);
    } else {
      nav.classList.add("nav-hidden");
    }
  }, [show]);
}

/**
 * useFunReveal (kept for compatibility)
 * Now a no-op since useRevealOnScroll handles everything.
 */
export function useFunReveal() {}

/**
 * useParallaxScroll (kept for compatibility)
 */
export function useParallaxScroll() {}
