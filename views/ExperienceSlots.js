"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useKeyNav } from "../controller/useKeyNav";
import { BadgeRow } from "./BadgeRow";

/**
 * ExperienceSlots — Premium horizontal carousel
 * Redesigned with:
 * - Cleaner card design with mono dates and role titles
 * - Active card glow indicator
 * - Smooth detail panel with spring animation
 * - 3D tilt on hover (preserved)
 * - Touch swipe (preserved)
 * - Keyboard navigation (preserved)
 */
export function ExperienceSlots({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const slotsWrapRef = useRef(null);
  const cardRefs = useRef([]);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const changeIndex = (delta) => {
    setActiveIndex((cur) => Math.max(0, Math.min(items.length - 1, cur + delta)));
    setIsExpanded(false);
  };

  useKeyNav((delta) => changeIndex(delta));

  // Center the active card in the scrollable strip
  useEffect(() => {
    const wrap = slotsWrapRef.current;
    const activeCard = cardRefs.current[activeIndex];
    if (!wrap || !activeCard) return;

    const wrapRect = wrap.getBoundingClientRect();
    const cardRect = activeCard.getBoundingClientRect();
    const scrollLeft = activeCard.offsetLeft - (wrapRect.width / 2 - cardRect.width / 2);
    wrap.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, [activeIndex, items.length]);

  // 3D tilt on mouse move
  const handleTilt = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--rx", `${(-y * 5).toFixed(2)}deg`);
    card.style.setProperty("--ry", `${(x * 7).toFixed(2)}deg`);
  };

  const clearTilt = (index) => {
    const card = cardRefs.current[index];
    if (!card) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  // Touch swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    changeIndex(dx < 0 ? 1 : -1);
  };

  const activeItem = items[activeIndex];
  const visibleBullets = isExpanded ? activeItem.bullets : activeItem.bullets.slice(0, 3);

  return (
    <div className="slots" data-reveal onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>

      {/* ── CARD STRIP ── */}
      <div className="slots-bar">
        <button
          className="exp-nav-btn"
          onClick={() => changeIndex(-1)}
          disabled={activeIndex === 0}
          aria-label="Previous role"
        >
          ‹
        </button>

        <div className="slots-wrap" ref={slotsWrapRef}>
          <div className="slots-track">
            {items.map((role, index) => (
              <div
                key={role.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`slot-card ${index === activeIndex ? "slot-active" : ""}`}
                onMouseMove={(e) => handleTilt(e, index)}
                onMouseLeave={() => clearTilt(index)}
                onClick={() => { setActiveIndex(index); setIsExpanded(false); }}
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
                  <div className="slot-index">{String(index + 1).padStart(2, "0")}</div>
                  <div className="slot-role">{role.title}</div>
                  <div className="slot-company">{role.company}</div>
                  <div className="slot-dates">{role.dates}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="exp-nav-btn"
          onClick={() => changeIndex(+1)}
          disabled={activeIndex === items.length - 1}
          aria-label="Next role"
        >
          ›
        </button>
      </div>

      {/* ── DETAIL PANEL ── */}
      <div className="detail-panel card" key={activeItem.id}>
        <div className="detail-header">
          <div className="detail-meta">
            <h3 className="detail-role">{activeItem.title}</h3>
            <div className="detail-company-row">
              <span className="detail-company">{activeItem.company}</span>
              <span className="detail-separator">·</span>
              <span className="detail-dates">{activeItem.dates}</span>
            </div>
          </div>
        </div>

        <BadgeRow items={activeItem.badges} />

        <ul className="bullets detail-bullets">
          {visibleBullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>

        {activeItem.bullets.length > 3 && (
          <button
            className="detail-expand-btn"
            onClick={() => setIsExpanded((v) => !v)}
            aria-label={isExpanded ? "Show fewer details" : "Show more details"}
          >
            {isExpanded ? <><FaChevronUp /> Collapse</> : <><FaChevronDown /> Show all {activeItem.bullets.length} points</>}
          </button>
        )}

        {/* Progress dots */}
        <div className="detail-dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`detail-dot ${i === activeIndex ? "dot-on" : ""}`}
              aria-label={`Go to role ${i + 1}`}
              onClick={() => { setActiveIndex(i); setIsExpanded(false); }}
            />
          ))}
        </div>
      </div>

      {/* ─── SCOPED STYLES ─── */}
      <style jsx>{`
        .slots {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .slots-bar {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 8px;
        }

        /* Arrow buttons */
        .exp-nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: var(--surface);
          backdrop-filter: blur(8px);
          color: var(--text-2);
          cursor: pointer;
          font-size: 22px;
          font-weight: 300;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 200ms ease;
          flex-shrink: 0;
        }

        .exp-nav-btn:hover:not(:disabled) {
          color: var(--cyan);
          border-color: var(--cyan-border);
          box-shadow: 0 0 20px var(--cyan-glow);
          transform: scale(1.08);
        }

        .exp-nav-btn:disabled {
          opacity: 0.2;
          cursor: not-allowed;
        }

        /* Scroll track */
        .slots-wrap {
          overflow: hidden;
        }

        .slots-track {
          display: flex;
          gap: 10px;
          padding: 4px 2px;
        }

        /* Individual cards */
        .slot-card {
          --rx: 0deg;
          --ry: 0deg;
          min-width: 240px;
          max-width: 290px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          cursor: pointer;
          transform: perspective(900px) rotateX(var(--rx)) rotateY(var(--ry));
          transition:
            transform 220ms ease,
            border-color 220ms ease,
            box-shadow 220ms ease;
          will-change: transform;
          position: relative;
          overflow: hidden;
        }

        .slot-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, transparent, transparent);
          transition: background 220ms ease;
        }

        .slot-card.slot-active {
          border-color: var(--cyan-border);
          box-shadow: 0 0 30px var(--cyan-glow), 0 8px 24px rgba(0,0,0,0.2);
        }

        .slot-card.slot-active::before {
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
          opacity: 0.6;
        }

        .slot-inner {
          padding: 16px;
        }

        .slot-index {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-3);
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .slot-card.slot-active .slot-index {
          color: var(--cyan);
        }

        .slot-role {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-1);
          line-height: 1.3;
          margin-bottom: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .slot-company {
          font-size: 12px;
          color: var(--cyan);
          margin-bottom: 4px;
          font-weight: 500;
        }

        .slot-dates {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-3);
          letter-spacing: 0.3px;
        }

        /* Detail panel */
        .detail-panel {
          padding: 24px 28px;
        }

        .detail-header {
          margin-bottom: 12px;
        }

        .detail-role {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-1);
          margin: 0 0 6px;
          line-height: 1.3;
        }

        .detail-company-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .detail-company {
          font-size: 14px;
          font-weight: 500;
          color: var(--cyan);
        }

        .detail-separator {
          color: var(--text-3);
          font-size: 12px;
        }

        .detail-dates {
          font-size: 12px;
          font-family: var(--font-mono);
          color: var(--text-3);
          letter-spacing: 0.3px;
        }

        .detail-bullets {
          margin-top: 14px;
        }

        .detail-expand-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 12px;
          padding: 7px 16px;
          font-size: 12px;
          font-weight: 500;
          font-family: var(--font-mono);
          color: var(--text-2);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 999px;
          cursor: pointer;
          transition: all 200ms ease;
        }

        .detail-expand-btn:hover {
          color: var(--cyan);
          border-color: var(--cyan-border);
          box-shadow: 0 0 16px var(--cyan-glow);
        }

        /* Progress dots */
        .detail-dots {
          display: flex;
          gap: 6px;
          justify-content: center;
          margin-top: 16px;
        }

        .detail-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--border);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: background 200ms ease, transform 200ms ease;
        }

        .detail-dot.dot-on {
          background: var(--cyan);
          transform: scale(1.4);
          box-shadow: 0 0 8px var(--cyan-glow);
        }

        .detail-dot:hover:not(.dot-on) {
          background: var(--text-3);
        }

        /* Mobile */
        @media (max-width: 768px) {
          .slots-bar {
            grid-template-columns: auto 1fr auto;
            gap: 4px;
          }

          .exp-nav-btn {
            display: none;
          }

          .slot-card {
            min-width: 180px;
            max-width: 230px;
          }

          .slot-inner {
            padding: 12px;
          }

          .detail-panel {
            padding: 18px 18px;
          }

          .detail-role {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}
