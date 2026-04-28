"use client";
import { useState, useEffect, useRef } from "react";

/**
 * ProjectCard
 *
 * Desktop: shows full description with line-clamp (5 lines).
 *   - Detects if text is actually clamped via ResizeObserver.
 *   - Shows "read more →" only when text is genuinely overflowing.
 *   - All cards in a row are equal height via CSS grid stretch.
 *
 * Mobile (compact): collapses to title only; "Expand" reveals content.
 */
export function ProjectCard({ name, desc, tags, compact = false, index = 0 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const descRef = useRef(null);
  const toggleBtnRef = useRef(null);

  // Detect if the description text is actually overflowing (line-clamped)
  useEffect(() => {
    if (compact) return;
    const el = descRef.current;
    if (!el) return;

    const check = () => {
      setIsClamped(el.scrollHeight > el.clientHeight + 2);
    };

    check();

    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [compact, desc, isExpanded]);

  const isCompactCollapsed = compact && !isExpanded;
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      className={[
        "card project",
        compact ? "project-card-compact" : "project-card-desktop",
        isExpanded ? "project-card-expanded" : "project-card-collapsed",
      ].join(" ")}
      aria-expanded={isExpanded}
    >
      <span className="project-number">{num}</span>

      <div className="project-card-header">
        <h3 className="h3">{name}</h3>

        {/* Mobile-only collapse/expand toggle */}
        {compact && (
          <button
            ref={toggleBtnRef}
            type="button"
            className="project-toggle-btn"
            onClick={() => {
              if (isExpanded) {
                setIsExpanded(false);
                setTimeout(() => {
                  toggleBtnRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 50);
              } else {
                setIsExpanded(true);
              }
            }}
            aria-expanded={isExpanded}
          >
            {isExpanded ? "Collapse" : "Expand"}
          </button>
        )}
      </div>

      {/* Show content on desktop always; mobile only when expanded */}
      {!isCompactCollapsed && (
        <>
          {/* Description — line-clamped on desktop until expanded */}
          <p
            ref={descRef}
            className={[
              "project-desc",
              !compact && !isExpanded ? "desc-clamped" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {desc}
          </p>

          {/* "read more / see less" — desktop only, only when actually clamped */}
          {!compact && (isClamped || isExpanded) && (
            <button
              type="button"
              className="see-more-btn"
              onClick={() => setIsExpanded((v) => !v)}
            >
              {isExpanded ? "↑ see less" : "read more →"}
            </button>
          )}

          {/* Tech tags */}
          <div className="badge-row project-tags">
            {tags.map((tag, i) => (
              <span className="badge project-tag" key={i}>
                {tag}
              </span>
            ))}
          </div>
        </>
      )}
    </article>
  );
}
