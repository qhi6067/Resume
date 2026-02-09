// components/ProjectCard.js
"use client";
import { useState } from "react";

export function ProjectCard({ name, desc, tags }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 130; // char limit before truncation

  // Only truncate if description is long enough
  const shouldTruncate = desc.length > maxLength;

  // If truncated and not expanded, show substring + legacy hint
  const displayDesc =
    shouldTruncate && !isExpanded
      ? desc.slice(0, maxLength)
      : desc;

  return (
    <article
      className={`card project ${shouldTruncate ? "project-card-interactive" : ""}`}
      data-reveal
      onClick={() => shouldTruncate && setIsExpanded(!isExpanded)}
    >
      {/* Project title */}
      <h3 className="h3">{name}</h3>

      {/* Short project description with read more toggle */}
      <p className="project-desc">
        {displayDesc}
        {shouldTruncate && !isExpanded && (
          <span className="read-more-hint">... Read more</span>
        )}
        {shouldTruncate && isExpanded && (
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
    </article>
  );
}