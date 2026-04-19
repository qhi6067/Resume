// components/ProjectCard.js
"use client";
import { useState } from "react";

export function ProjectCard({ name, desc, tags, compact = false }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 130; // char limit before truncation

  // Only truncate if description is long enough
  const shouldTruncate = desc.length > maxLength;

  // If truncated and not expanded, show substring + legacy hint
  const displayDesc = compact
    ? desc
    : shouldTruncate && !isExpanded
      ? desc.slice(0, maxLength)
      : desc;

  const isCompactCollapsed = compact && !isExpanded;
  const articleClasses = [
    "card",
    "project",
    shouldTruncate && !compact ? "project-card-interactive" : "",
    compact ? "project-card-compact" : "",
    isExpanded ? "project-card-expanded" : "project-card-collapsed",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={articleClasses}
      aria-expanded={isExpanded}
    >
      <div className="project-card-header">
        <h3 className="h3">{name}</h3>

        {compact ? (
          <button
            type="button"
            className="project-toggle-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
          >
            {isExpanded ? "Hide details" : "Expand"}
          </button>
        ) : null}
      </div>

      {!isCompactCollapsed ? (
        <>
          {/* Short project description with read more toggle */}
          <p
            className="project-desc"
            onClick={!compact && shouldTruncate ? () => setIsExpanded(!isExpanded) : undefined}
          >
            {displayDesc}
            {!compact && shouldTruncate && !isExpanded && (
              <span className="read-more-hint">... Read more</span>
            )}
            {!compact && shouldTruncate && isExpanded && (
              <span className="read-more-hint"> (Show less)</span>
            )}
          </p>

          {/* Tags row (tech stack, etc.) */}
          <div className="badge-row project-tags">
            {tags.map((tag, index) => (
              <span className="badge project-tag" key={index}>
                {tag}
              </span>
            ))}
          </div>
        </>
      ) : null}
    </article>
  );
}
