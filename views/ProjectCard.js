// components/ProjectCard.js
"use client";

export function ProjectCard({ name, desc, tags }) {
    return (
      <article className="card project" data-reveal>
        {/* Project title */}
        <h3 className="h3">{name}</h3>
  
        {/* Short project description */}
        <p className="project-desc">{desc}</p>
  
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