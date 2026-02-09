"use client"; // This page uses client-side hooks like useRevealOnScroll.

import { Fragment, useState } from "react";

// Controller for scroll animations (IntersectionObserver logic).
import { useRevealOnScroll } from "../controller/useRevealOnScroll";
import { useFunReveal } from "../controller/useParallaxScroll";

// Model data (your resume content).
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

// View components (pure presentation).
import { SectionTitle } from "../views/SectionTitle";
import { BadgeRow } from "../views/BadgeRow";
import { ExperienceSlots } from "../views/ExperienceSlots";
import { ProjectCard } from "../views/ProjectCard";
import { WelcomeOverlay } from "../views/WelcomeOverlay";

/**
 * Main page component:
 * - Wires controllers (hooks) + models (data) + views (UI components).
 * - Renders the full resume/portfolio layout.
 */
export default function Page() {
  // State to control welcome overlay visibility
  const [showWelcome, setShowWelcome] = useState(true);
  // State to control projects expand/collapse
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Start scroll-reveal behavior once elements enter the viewport.
  useRevealOnScroll();

  // Add fun staggered animations
  useFunReveal();

  // //download pdf version of file Will add later
  // const handleDownloadPDF = async () => {
  //   const jsPDF = (await import("jspdf")).default;
  //   const html2canvas = (await import("html2canvas")).default;

  //   const page = document.querySelector("main.site");

  //   // render screen to canvas
  //   const canvas = await html2canvas(page, { scale: 2 });
  //   const imgData = canvas.toDataURL("image/png");

  //   const pdf = new jsPDF("p", "mm", "a4");

  //   // scale to fit A4 width
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  //   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //   pdf.save("JaimePerez_Resume.pdf");
  // };


  /**
   * Safely copy email to clipboard when user clicks "Copy email" button.
   * Includes a fallback alert if Clipboard API is not available.
   */
  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(CONTACT.email)
        .catch((error) => {
          console.error("Failed to copy email to clipboard:", error);
          alert("Sorry, copying failed. You can copy the email manually.");
        });
    } else {
      alert("Clipboard copy is not supported here. Please copy the email manually.");
    }
  };

  /**
   * Scroll helper to "jump" to a section using its ID.
   * This replaces <a href="#section"> so links keep working no matter what.
   */
  const scrollToSection = (sectionId) => {
    if (typeof document === "undefined") return; // Safety for SSR.

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth", // Smooth scroll animation.
        block: "start",     // Align the section to the top of the viewport.
      });
    }
  };

  return (
    <>
      {/* Welcome overlay with typing animation */}
      {showWelcome && (
        <WelcomeOverlay onComplete={() => setShowWelcome(false)} />
      )}

      <main className={`site ${showWelcome ? "site-blur" : ""}`}>
        {/* ================= HEADER ================= */}
        <header className="header card reveal" data-reveal>
          {/* PDF Download/View Button */}
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="pdf-btn"
            aria-label="View PDF Resume"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: '6px' }}
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14,2 14,8 20,8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10,9 9,9 8,9" />
            </svg>
            View PDF
          </a>

          <div className="hero">
            <h1 className="name">
              {/* Highlight first name in gradient */}
              <span className="accent">
                {CONTACT.name.split(" ")[0]}
              </span>{" "}
              {/* Rest of name */}
              {CONTACT.name.split(" ").slice(1).join(" ")}
            </h1>

            <p className="subtitle">
              Solutions Engineer • Software Engineer • Medical • B2B Sales
            </p>

            {/* Languages badges inline */}
            <div className="languages-inline">
              {LanguagesData.map((lang) => (
                <span key={lang} className="lang-badge">{lang}</span>
              ))}
            </div>
          </div>

          {/* Top navigation: buttons that scroll to each section */}
          <nav className="nav">
            <button type="button" onClick={() => scrollToSection("experience")}>
              Experience
            </button>
            <button type="button" onClick={() => scrollToSection("projects")}>
              Projects
            </button>
            <button type="button" onClick={() => scrollToSection("education")}>
              Education
            </button>
            <button type="button" onClick={() => scrollToSection("skills")}>
              Skills
            </button>
            <button type="button" onClick={() => scrollToSection("tools")}>
              Tools
            </button>
            <button type="button" onClick={() => scrollToSection("leadership")}>
              Leadership
            </button>
          </nav>

          {/* Contact strip under header */}
          <div className="contact">
            <ul className="contact-list">
              <li>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phone.replace(/[^0-9]/g, "")}`}>
                  {CONTACT.phone}
                </a>
              </li>
              <li>{CONTACT.location}</li>
              <li>{CONTACT.citizenship}</li>
              <li>
                <button
                  className="link-btn"
                  onClick={handleCopyEmail}
                  aria-label="Copy email to clipboard"
                  title="Copy email"
                >
                  Copy email
                </button>
              </li>
            </ul>
          </div>

        </header>

        {/* ============== EXPERIENCE ============== */}
        <section id="experience" className="section reveal" data-reveal>
          <SectionTitle pill="Use ← → keys">
            Professional Experience
          </SectionTitle>

          {/* Interactive horizontal experience cards */}
          <ExperienceSlots items={ExperienceData} />
        </section>

        {/* ============== PROJECTS ============== */}
        <section id="projects" className="section reveal" data-reveal>
          <SectionTitle>Projects</SectionTitle>

          <div className="grid">
            {(showAllProjects ? ProjectData : ProjectData.slice(0, 6)).map((project_item, index) => (
              <Fragment key={project_item.name}>
                {/* Individual project card - add 'in' class for items beyond first 6 when expanded */}
                <div className={index >= 6 ? "reveal-instant" : ""}>
                  <ProjectCard {...project_item} />
                </div>

                {/* Visual separator between top and bottom grid rows */}
                {index === 2 && <div className="grid-separator" />}
              </Fragment>
            ))}
          </div>

          {/* Expand/Collapse button if more than 6 projects */}
          {ProjectData.length > 6 && (
            <button
              type="button"
              className="expand-btn"
              onClick={() => setShowAllProjects(!showAllProjects)}
            >
              {showAllProjects ? "Show Less" : `Show All ${ProjectData.length} Projects`}
            </button>
          )}
        </section>

        {/* ============== EDUCATION ============== */}
        <section id="education" className="section reveal" data-reveal>
          <SectionTitle>Education</SectionTitle>

          {EducationData.map((education_entry) => (
            <div
              className="card"
              key={education_entry.school}
              data-reveal
            >
              {/* School + degree + dates on one line */}
              <h3 className="h3">
                {education_entry.school} — {education_entry.degree} (
                {education_entry.dates})
              </h3>

              {/* Bullet list of honors/achievements */}
              <ul className="bullets">
                {education_entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* ============== SKILLS ============== */}
        <section id="skills" className="section reveal" data-reveal>
          <SectionTitle>Skills</SectionTitle>

          <div className="card" data-reveal>
            <h4 className="h4">Programming</h4>
            <BadgeRow items={SkillsData.programming} />

            <h4 className="h4">Infrastructure & Systems</h4>
            <BadgeRow items={SkillsData.infrastructure} />

            <h4 className="h4">Software Development</h4>
            <BadgeRow items={SkillsData.software} />

            <h4 className="h4">Healthcare & Medical</h4>
            <BadgeRow items={SkillsData.medical} />

            <h4 className="h4">Soft Skills</h4>
            <BadgeRow items={SkillsData.soft} />

            <h4 className="h4">Sales & Client Relations</h4>
            <BadgeRow items={SkillsData.sales} />
          </div>
        </section>

        {/* ============== TOOLS ============== */}
        <section id="tools" className="section reveal" data-reveal>
          <SectionTitle>Tools & Platforms</SectionTitle>

          <div className="card" data-reveal>
            <BadgeRow items={ToolsData} />
          </div>
        </section>

        {/* ============== LEADERSHIP ============== */}
        <section id="leadership" className="section reveal" data-reveal>
          <SectionTitle>Leadership &amp; Organizations</SectionTitle>

          <div className="card" data-reveal>
            <ul className="bullets">
              {Leadership.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============== FOOTER ============== */}
        <footer className="footer reveal" data-reveal>
          <span>
            © {new Date().getFullYear()} {CONTACT.name}. All rights reserved.
          </span>
        </footer>
      </main>
    </>
  );
}
