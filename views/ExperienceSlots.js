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

  // Refs for swipe (touch) handling.
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  /**
   * Helper: move carousel by +1 or -1 (used by keys, arrows, and swipe).
   */
  const changeIndex = (delta) => {
    setActiveIndex((currentIndex) => {
      const next = Math.max(0, Math.min(items.length - 1, currentIndex + delta));
      return next;
    });
    setIsExpanded(false); // collapse bullets when changing job
  };

  /**
   * Hook: keyboard navigation (← / → keys)
   * The controller calls our callback with +1 (right) or -1 (left).
   */
  useKeyNav((delta) => {
    changeIndex(delta);
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
   * Touch handlers: allow swipe left/right on mobile
   * anywhere on the experience block (.slots).
   */
  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current == null || touchStartY.current == null) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStartX.current;
    const dy = touch.clientY - touchStartY.current;

    // Reset for next swipe
    touchStartX.current = null;
    touchStartY.current = null;

    // Ignore mostly-vertical swipes or tiny movements
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const SWIPE_THRESHOLD = 40;

    if (absDx < SWIPE_THRESHOLD || absDx < absDy) {
      return;
    }

    // dx < 0 => swipe left (go to next card)
    if (dx < 0) {
      changeIndex(+1);
    } else {
      changeIndex(-1);
    }
  };

  // Convenience: active experience object.
  const activeItem = items[activeIndex];

  // Decide which bullets to show based on expanded state.
  const visibleBullets = isExpanded
    ? activeItem.bullets
    : activeItem.bullets.slice(0, 3); // Only first 3 when collapsed

  return (
    <div
      className="slots"
      data-reveal
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* =================== CARD STRIP WITH ARROWS =================== */}
      <div className="slots-bar">
        {/* Previous button (hidden on mobile via CSS) */}
        <button
          className="nav-btn exp-nav-btn"
          onClick={() => changeIndex(-1)}
          disabled={activeIndex === 0}
          aria-label="Previous role"
          title="Previous"
        >
          ‹
        </button>

        {/* Scrollable wrapper for cards */}
        <div className="slots-wrap" ref={slotsWrapRef}>
          <div className="slots-track">
            {items.map((role, index) => (
              <div
                key={role.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`slot-card ${index === activeIndex ? "active" : ""}`}
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

        {/* Next button (hidden on mobile via CSS) */}
        <button
          className="nav-btn exp-nav-btn"
          onClick={() => changeIndex(+1)}
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

            {/* Add space so date doesn't touch company text */}
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
            {isExpanded ? (
              <>
                <FaChevronUp /> Show Less
              </>
            ) : (
              <>
                <FaChevronDown /> Show More
              </>
            )}
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

      {/* Local styles remain unchanged (kept in this component) */}
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

        /* Left/right arrow buttons */
        .nav-btn {
          width: 48px;
          height: 48px;
          border-radius: 999px;
          border: 1px solid rgba(81, 226, 245, 0.3);
          background: rgba(15, 27, 36, 0.8);
          backdrop-filter: blur(8px);
          color: #8dd0ff;
          cursor: pointer;
          font-size: 24px;
          font-weight: 300;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 300ms ease;
        }

        .nav-btn:hover:not(:disabled) {
          background: rgba(24, 52, 73, 0.9);
          border-color: rgba(81, 226, 245, 0.5);
          color: #51e2f5;
          box-shadow: 0 0 20px rgba(81, 226, 245, 0.15);
          transform: scale(1.05);
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
          background: radial-gradient(
            120% 140% at 0% 0%,
            #0f1e2a,
            #0b1116
          );
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
          margin-left: 8px; /* creates space between company and date */
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
          margin-top: 10px;
          padding: 8px 20px;
          border-radius: 999px;
          border: 1px solid rgba(81, 226, 245, 0.3);
          background: rgba(15, 28, 39, 0.8);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #8dd0ff;
          font-size: 13px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          cursor: pointer;
          transition: all 300ms ease;
        }

        .expand-btn:hover {
          background: rgba(24, 52, 73, 0.9);
          border-color: rgba(81, 226, 245, 0.5);
          color: #51e2f5;
          box-shadow: 0 0 20px rgba(81, 226, 245, 0.15);
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

        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
          .slots-bar {
            grid-template-columns: auto 1fr auto;
            gap: 4px;
          }

          .nav-btn {
            width: 36px;
            height: 36px;
            font-size: 18px;
          }

          .slot-card {
            min-width: 200px;
            max-width: 260px;
          }

          .slot-inner {
            padding: 10px;
          }

          .slot-title {
            font-size: 14px;
          }

          .slot-dates {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
}
