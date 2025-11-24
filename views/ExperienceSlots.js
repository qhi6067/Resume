

"use client"; // Uses React hooks + browser APIs (must run on client)

import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Controller hook: adds global left/right arrow key navigation.
import { useKeyNav } from "../controller/useKeyNav";

// Presentational component to render badges as pills.
import { BadgeRow } from "./BadgeRow";

/**
 * ExperienceSlots
 * @param {Array} items - list of experience objects (from EXPERIENCE in resumeData.js)
 */
export function ExperienceSlots({ items }) {
  // Index of the currently active card.
  const [activeIndex, setActiveIndex] = useState(0);

  // Whether the bullet list is expanded (all bullets) or truncated (first 3).
  const [isExpanded, setIsExpanded] = useState(false);

  // Ref to the horizontal scroll wrapper for cards.
  const slotsWrapRef = useRef(null);

  // Array of refs, one per card, for tilt and scroll calculations.
  const cardRefs = useRef([]);

  // Touch tracking for swipe gestures (mobile).
  const touchStartXRef = useRef(null);

  /**
   * Helper: go to previous role (if not already at first).
   */
  const goPrev = () => {
    setActiveIndex((current) => {
      const nextIndex = Math.max(0, current - 1);
      // If we actually changed, collapse bullets.
      if (nextIndex !== current) setIsExpanded(false);
      return nextIndex;
    });
  };

  /**
   * Helper: go to next role (if not already at last).
   */
  const goNext = () => {
    setActiveIndex((current) => {
      const nextIndex = Math.min(items.length - 1, current + 1);
      if (nextIndex !== current) setIsExpanded(false);
      return nextIndex;
    });
  };

  /**
   * Hook: keyboard navigation (← / → keys)
   * The controller calls our callback with +1 (right) or -1 (left).
   * (Works on all viewports, but arrows are visually hidden on mobile.)
   */
  useKeyNav((delta) => {
    if (delta === 1) goNext();
    if (delta === -1) goPrev();
  });

  /**
   * Effect: whenever activeIndex changes, scroll the active card into view
   * and center it within the wrapper.
   */
  useEffect(() => {
    const wrap = slotsWrapRef.current;
    const activeCard = cardRefs.current[activeIndex];

    if (!wrap || !activeCard) return;

    const wrapRect = wrap.getBoundingClientRect();
    const cardRect = activeCard.getBoundingClientRect();

    // Calculate scroll position so the active card is centered.
    const scrollLeft =
      activeCard.offsetLeft - (wrapRect.width / 2 - cardRect.width / 2);

    wrap.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });
  }, [activeIndex, items.length]);

  /**
   * handleTilt
   * Adds a subtle 3D tilt effect to a card based on mouse position.
   * CSS uses custom properties --rx and --ry for the transform.
   */
  const handleTilt = (event, index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();

    // Normalize mouse position relative to the card: [-0.5, 0.5]
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    // Set CSS variables for rotation angles.
    card.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
    card.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
  };

  /**
   * clearTilt
   * Resets the card tilt back to neutral.
   */
  const clearTilt = (index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  /**
   * Touch handlers for swipe on mobile.
   * - We store the starting X coordinate on touchstart.
   * - On touchend we compare start vs end to decide swipe direction.
   */
  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchStartXRef.current = touch.clientX;
  };

  const handleTouchEnd = (event) => {
    const startX = touchStartXRef.current;
    if (startX == null) return;

    const touch = event.changedTouches[0];
    const endX = touch.clientX;
    const deltaX = endX - startX;

    // Minimal distance for it to count as a swipe gesture.
    const SWIPE_THRESHOLD = 50;

    if (deltaX > SWIPE_THRESHOLD) {
      // Swipe right → go to previous card.
      goPrev();
    } else if (deltaX < -SWIPE_THRESHOLD) {
      // Swipe left → go to next card.
      goNext();
    }

    // Reset for next gesture.
    touchStartXRef.current = null;
  };

  // Convenience: active experience object.
  const activeItem = items[activeIndex];

  // Decide which bullets to show based on expanded state.
  const visibleBullets = isExpanded
    ? activeItem.bullets
    : activeItem.bullets.slice(0, 3); // Only first 3 when collapsed

  return (
    <div className="slots" data-reveal>
      {/* =================== CARD STRIP WITH ARROWS =================== */}
      <div className="slots-bar">
        {/* Previous button (hidden on small screens via CSS) */}
        <button
          className="nav-btn"
          onClick={goPrev}
          disabled={activeIndex === 0}
          aria-label="Previous role"
          title="Previous"
        >
          ‹
        </button>

        {/* Scrollable wrapper for cards + swipe support */}
        <div
          className="slots-wrap"
          ref={slotsWrapRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="slots-track">
            {items.map((role, index) => (
              <div
                key={role.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`slot-card ${
                  index === activeIndex ? "active" : ""
                }`}
                onMouseMove={(e) => handleTilt(e, index)}
                onMouseLeave={() => clearTilt(index)}
                onClick={() => {
                  setActiveIndex(index);
                  setIsExpanded(false);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActiveIndex(index);
                    setIsExpanded(false);
                  }
                }}
              >
                <div className="slot-inner">
                  {/* Card title + company + dates */}
                  <div className="slot-title">
                    <span className="slot-role">{role.title}</span>
                    <span className="slot-company"> @ {role.company}</span>
                  </div>
                  <div className="slot-dates">{role.dates}</div>

                  {/* Top-level badges on each card */}
                  <BadgeRow items={role.badges} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next button (hidden on small screens via CSS) */}
        <button
          className="nav-btn"
          onClick={goNext}
          disabled={activeIndex === items.length - 1}
          aria-label="Next role"
          title="Next"
        >
          ›
        </button>
      </div>

      {/* =================== DETAIL PANEL =================== */}
      <article className="detail card reveal" data-reveal>
        {/* Job title + company + dates + badges */}
        <div className="detail-head">
          <div className="role">
            {/* Title + company in bold line */}
            <span className="title">{activeItem.title}</span>
            <span className="company"> | {activeItem.company}</span>
            <span className="dates">{activeItem.dates}</span>
          </div>

          {/* Badges rendered as pills with spacing */}
          <BadgeRow items={activeItem.badges} />
        </div>

        {/* Bullet list for selected role, indented slightly to the right */}
        <ul className="bullets">
          {visibleBullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>

        {/* Expand / collapse button to show all bullets */}
        {activeItem.bullets.length > 3 && (
          <button
            className="link-btn expand-btn"
            onClick={() => setIsExpanded((v) => !v)}
            aria-label={isExpanded ? "Show fewer details" : "Show more details"}
          >
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        )}

        {/* Progress dots showing position in carousel */}
        <div className="dots">
          {items.map((_, index) => (
            <button
              key={`experience-dot-${index}`}
              className={`dot ${index === activeIndex ? "on" : ""}`}
              aria-label={`Go to role ${index + 1}`}
              onClick={() => {
                setActiveIndex(index);
                setIsExpanded(false);
              }}
            />
          ))}
        </div>
      </article>

      {/* =================== LOCAL STYLES =================== */}
      <style jsx>{`
        /* Layout wrapper for the whole experience block */
        .slots {
          display: grid;
          gap: 12px;
        }

        .slots-bar {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 8px;
        }

        /* Left/right arrow buttons (desktop/tablet) */
        .nav-btn {
          width: 40px;
          height: 40px;
          border-radius: 999px;
          border: 1px solid #203544;
          background: #0f1b24;
          color: #bfe6ff;
          cursor: pointer;
        }

        .nav-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        /* Horizontal scrolling container for cards */
        .slots-wrap {
          overflow: hidden;
        }

        .slots-track {
          display: flex;
          gap: 12px;
          padding: 6px 2px;
        }

        /* Individual card styling with tilt */
        .slot-card {
          --rx: 0deg;
          --ry: 0deg;
          min-width: 280px;
          max-width: 320px;
          background: radial-gradient(120% 140% at 0% 0%, #0f1e2a, #0b1116);
          border: 1px solid #182532;
          border-radius: 16px;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
          transform: perspective(800px) rotateX(var(--rx)) rotateY(var(--ry));
          transition: transform 240ms ease, border-color 240ms ease,
            box-shadow 240ms ease;
          will-change: transform;
          cursor: pointer;
        }

        .slot-card.active {
          border-color: #2a4d66;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
        }

        .slot-inner {
          padding: 14px;
        }

        .slot-title {
          font-weight: 700;
        }

        .slot-role {
          color: #eaf5ff;
        }

        .slot-company {
          color: #94c8e8;
        }

        .slot-dates {
          opacity: 0.75;
          font-size: 13px;
          margin-top: 2px;
          margin-bottom: 8px;
        }

        /* Detail panel under the cards */
        .detail {
          margin-top: 6px;
        }

        .detail-head {
          margin-bottom: 6px;
        }

        /* Make the top line (title | company) visually strong */
        .detail-head .role {
          font-weight: 700;
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .detail-head .dates {
          margin-left: 8px; /* space between company and date */
          font-weight: 400;
          opacity: 0.85;
        }

        /* Bullets: indent slightly to the right ("tab" effect) */
        .bullets {
          margin: 8px 0 0 24px; /* pushes list to the right */
          padding-left: 4px; /* adjusts bullet alignment */
        }

        .bullets li {
          margin: 4px 0;
          line-height: 1.6;
        }

        /* Small expand/collapse button under bullets */
        .expand-btn {
          margin-top: 6px;
          width: 24px;
          height: 24px;
          border-radius: 999px;
          border: none;
          background-color: #222;
          color: #51e2f5;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Progress dots row */
        .dots {
          margin-top: 10px;
          display: flex;
          gap: 6px;
          justify-content: center;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #274055;
          border: none;
          padding: 0;
          cursor: pointer;
        }

        .dot.on {
          background: #8dd0ff;
        }

        /* ===== MOBILE: hide arrows, center strip ===== */
        @media (max-width: 768px) {
          .slots-bar {
            grid-template-columns: 1fr; /* no side columns for arrows */
          }

          .nav-btn {
            display: none; /* hide arrow buttons on mobile */
          }

          .slots-wrap {
            /* allow easy thumb access */
            padding: 2px 0;
          }

          .slot-card {
            min-width: 260px;
          }
        }
      `}</style>
    </div>
  );
}
