"use client";

import { Fragment, useEffect, useState, useRef } from "react";

// Controllers
import { useRevealOnScroll } from "../controller/useRevealOnScroll";
import { useDotNavTracking, useFloatingNavVisibility } from "../controller/useParallaxScroll";

// Data
import {
  CONTACT,
  EXPERIENCE as ExperienceData,
  PROJECTS as ProjectData,
  EDUCATION as EducationData,
  SKILLS as SkillsData,
  LEADERSHIP as Leadership,
  LANGUAGES as LanguagesData,
  TOOLS as ToolsData,
} from "../models/resumeData";

// Views
import { SectionTitle } from "../views/SectionTitle";
import { BadgeRow } from "../views/BadgeRow";
import { ExperienceSlots } from "../views/ExperienceSlots";
import { ProjectCard } from "../views/ProjectCard";
import { WelcomeOverlay } from "../views/WelcomeOverlay";
import { BB8Toggle } from "../views/BB8Toggle";

// Section IDs used by dot nav and scroll tracking
const SECTION_IDS = ["hero", "experience", "projects", "education", "skills", "tools", "leadership"];

export default function Page() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isMobileProjects, setIsMobileProjects] = useState(false);
  // true = DARK (checked), false = LIGHT (unchecked)
  const [isDark, setIsDark] = useState(true);

  // Activate scroll animations
  useRevealOnScroll();

  // Track active section for dot nav + floating nav
  useDotNavTracking(SECTION_IDS);

  // Show floating nav after welcome overlay clears
  useFloatingNavVisibility(!showWelcome);

  // Mobile breakpoint detection
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const sync = (e) => setIsMobileProjects(e.matches);
    sync(mq);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Theme persistence + apply data-theme attribute
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("theme");
    if (saved === "light") setIsDark(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const theme = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDark]);

  const handleThemeToggle = () => setIsDark((v) => !v);

  // Smooth scroll to section
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Copy email
  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(CONTACT.email).catch(() => {
      alert("Copy not supported — please copy manually.");
    });
  };

  const initialProjectCount = isMobileProjects ? 3 : 6;
  const visibleProjects = showAllProjects ? ProjectData : ProjectData.slice(0, initialProjectCount);
  const remainingProjects = Math.max(ProjectData.length - initialProjectCount, 0);

  return (
    <>
      {showWelcome && <WelcomeOverlay onComplete={() => setShowWelcome(false)} />}

      {/* ──────────────── FLOATING TOP NAV ──────────────── */}
      <nav className={`floating-nav nav-hidden`} aria-label="Site navigation">
        <span className="nav-brand">JP</span>

        <div className="nav-links">
          {SECTION_IDS.slice(1).map((id) => (
            <button
              key={id}
              type="button"
              data-section={id}
              onClick={() => scrollTo(id)}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>

        <div className="nav-theme-wrap">
          <BB8Toggle checked={isDark} onChange={handleThemeToggle} />
        </div>

        <a
          href="/Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-pdf-btn"
        >
          {/* Document icon */}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
          </svg>
          PDF
        </a>
      </nav>

      {/* ──────────────── RIGHT DOT NAV ──────────────── */}
      <nav className="dot-nav" aria-label="Section navigation">
        <button className="dot-nav-item dot-active" data-section="hero" data-label="Top" aria-label="Scroll to top" onClick={() => scrollTo("hero")} />
        <button className="dot-nav-item" data-section="experience" data-label="Experience" aria-label="Scroll to Experience" onClick={() => scrollTo("experience")} />
        <button className="dot-nav-item" data-section="projects" data-label="Projects" aria-label="Scroll to Projects" onClick={() => scrollTo("projects")} />
        <button className="dot-nav-item" data-section="education" data-label="Education" aria-label="Scroll to Education" onClick={() => scrollTo("education")} />
        <button className="dot-nav-item" data-section="skills" data-label="Skills" aria-label="Scroll to Skills" onClick={() => scrollTo("skills")} />
        <button className="dot-nav-item" data-section="tools" data-label="Tools" aria-label="Scroll to Tools" onClick={() => scrollTo("tools")} />
        <button className="dot-nav-item" data-section="leadership" data-label="Leadership" aria-label="Scroll to Leadership" onClick={() => scrollTo("leadership")} />
      </nav>

      <main className={`site ${showWelcome ? "site-blur" : ""}`}>

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section id="hero" className="hero-section">

          <div className="hero-eyebrow">Solutions Engineer &amp; Software Developer</div>

          <h1 className="hero-name">
            <span className="gradient-text">{CONTACT.name}</span>
          </h1>

          <p className="hero-subtitle">
            Tech · Healthcare · Strategy · B2B Sales
          </p>

          <div className="hero-languages">
            {LanguagesData.map((lang) => (
              <span key={lang} className="lang-badge">{lang}</span>
            ))}
            <span className="lang-badge">{CONTACT.citizenship}</span>
            <span className="lang-badge">{CONTACT.location}</span>
          </div>

          <div className="hero-cta">
            <button type="button" className="btn-primary" onClick={() => scrollTo("experience")}>
              View Experience ↓
            </button>
            <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Download PDF
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="btn-secondary"
            >
              Send Email
            </a>
          </div>

          {/* Stats counters */}
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-num-wrap">
                <span className="stat-num" data-count="13">0</span>
                <span className="stat-suffix">+</span>
              </div>
              <span className="stat-label">Projects Built</span>
            </div>
            <div className="stat">
              <div className="stat-num-wrap">
                <span className="stat-num" data-count="5">0</span>
                <span className="stat-suffix">+</span>
              </div>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat">
              <div className="stat-num-wrap">
                <span className="stat-num" data-count="2">0</span>
              </div>
              <span className="stat-label">Languages</span>
            </div>
            <div className="stat">
              <div className="stat-num-wrap">
                <span className="stat-num" data-count="3">0</span>
              </div>
              <span className="stat-label">Domains</span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="hero-scroll" aria-hidden="true">
            <div className="hero-scroll-line" />
            <span>Scroll</span>
          </div>
        </section>

        {/* ── Content below hero ── */}
        <div className="content-wrap">

          {/* ══════════════════════════════════════
              EXPERIENCE
          ══════════════════════════════════════ */}
          <section id="experience" className="section" data-reveal>
            <SectionTitle num={1} pill="← → keys or swipe">
              Professional Experience
            </SectionTitle>
            <ExperienceSlots items={ExperienceData} />
          </section>

          {/* ══════════════════════════════════════
              PROJECTS
          ══════════════════════════════════════ */}
          <section id="projects" className="section" data-reveal>
            <SectionTitle num={2}>Projects</SectionTitle>

            <div className="grid" data-stagger>
              {visibleProjects.map((project, index) => (
                <Fragment key={project.name}>
                  <div className={index >= initialProjectCount ? "reveal-instant" : ""}>
                    <ProjectCard
                      {...project}
                      index={index}
                      compact={isMobileProjects}
                    />
                  </div>
                </Fragment>
              ))}
            </div>

            {ProjectData.length > initialProjectCount && (
              <button
                type="button"
                className="expand-btn"
                onClick={() => setShowAllProjects(!showAllProjects)}
              >
                {showAllProjects
                  ? "↑ Show Less"
                  : isMobileProjects
                    ? `Show ${remainingProjects} More ↓`
                    : `Show All ${ProjectData.length} Projects ↓`}
              </button>
            )}
          </section>

          {/* ══════════════════════════════════════
              EDUCATION
          ══════════════════════════════════════ */}
          <section id="education" className="section" data-reveal>
            <SectionTitle num={3}>Education</SectionTitle>

            {EducationData.map((entry) => (
              <div className="card" key={entry.school} data-reveal="left">
                <p className="edu-dates">{entry.dates}</p>
                <h3 className="edu-school">{entry.school}</h3>
                <p className="edu-degree">{entry.degree}</p>
                <div className="edu-honors">
                  {entry.bullets.map((b) => (
                    <span key={b} className="edu-honor">★ {b}</span>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* ══════════════════════════════════════
              SKILLS
          ══════════════════════════════════════ */}
          <section id="skills" className="section" data-reveal>
            <SectionTitle num={4}>Skills</SectionTitle>

            <div className="skills-grid" data-stagger>
              {Object.entries({
                "Programming": SkillsData.programming,
                "Infrastructure & Systems": SkillsData.infrastructure,
                "Software Development": SkillsData.software,
                "Healthcare & Medical": SkillsData.medical,
                "Soft Skills": SkillsData.soft,
                "Sales & Client Relations": SkillsData.sales,
              }).map(([label, items]) => (
                <div key={label} className="skill-category">
                  <div className="skill-category-label">{label}</div>
                  <BadgeRow items={items} />
                </div>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════════════
              TOOLS
          ══════════════════════════════════════ */}
          <section id="tools" className="section" data-reveal>
            <SectionTitle num={5}>Tools &amp; Platforms</SectionTitle>

            <div className="card" data-reveal="scale">
              <div className="tools-wrap">
                <BadgeRow items={ToolsData} />
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════
              LEADERSHIP
          ══════════════════════════════════════ */}
          <section id="leadership" className="section" data-reveal>
            <SectionTitle num={6}>Leadership &amp; Organizations</SectionTitle>

            <div className="card" data-reveal="right">
              <ul className="leadership-list">
                {Leadership.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* ══════════════════════════════════════
              FOOTER
          ══════════════════════════════════════ */}
          <footer className="footer" data-reveal>
            <div className="footer-inner">
              <span>© {new Date().getFullYear()}</span>
              <div className="footer-dot" />
              <span>{CONTACT.name}</span>
              <div className="footer-dot" />
              <a href={`mailto:${CONTACT.email}`} style={{ color: "var(--cyan)", opacity: 0.7 }}>
                {CONTACT.email}
              </a>
            </div>
          </footer>

        </div>{/* end .content-wrap */}
      </main>
    </>
  );
}
