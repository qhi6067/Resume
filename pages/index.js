"use client"; // This page uses client-side hooks like useRevealOnScroll.

import { Fragment } from "react";

// Controller for scroll animations (IntersectionObserver logic).
import { useRevealOnScroll } from "../controller/useRevealOnScroll";

// Model data (your resume content).
import {
  CONTACT,
  EXPERIENCE as ExperienceData,
  PROJECTS as ProjectData,
  EDUCATION as EducationData,
  SKILLS as SkillsData,
  LEADERSHIP as Leadership,
} from "../models/resumeData";

// View components (pure presentation).
import { SectionTitle } from "../views/SectionTitle";
import { BadgeRow } from "../views/BadgeRow";
import { ExperienceSlots } from "../views/ExperienceSlots";
import { ProjectCard } from "../views/ProjectCard";

/**
 * Main page component:
 * - Wires controllers (hooks) + models (data) + views (UI components).
 * - Renders the full resume/portfolio layout.
 */
export default function Page() {
  // Start scroll-reveal behavior once elements enter the viewport.
  useRevealOnScroll();

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
      <main className="site">
        {/* ================= HEADER ================= */}
        <header className="header card reveal" data-reveal>
          {/* Name + subtitle */}
          {/* To implement later */}
          {/* <button className="pdf-btn" onClick={handleDownloadPDF}>
            Download PDF
          </button> */}

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
            {ProjectData.map((project_item, index) => (
              <Fragment key={project_item.name}>
                {/* Individual project card */}
                <ProjectCard {...project_item} />

                {/* Visual separator between top and bottom grid rows */}
                {index === 2 && <div className="grid-separator" />}
              </Fragment>
            ))}
          </div>
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
            <h4 className="h4">Programming Languages</h4>
            <BadgeRow items={SkillsData.programming} />

            <h4 className="h4">Technical Skills</h4>
            <BadgeRow items={SkillsData.technical} />

            <h4 className="h4">Medical Knowledge</h4>
            <BadgeRow items={SkillsData.medical} />

            <h4 className="h4">Soft Skills</h4>
            <BadgeRow items={SkillsData.soft} />

            <h4 className="h4">Sales Skills</h4>
            <BadgeRow items={SkillsData.sales} />
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
            © {new Date().getFullYear()} {CONTACT.name}.
          </span>
        </footer>
      </main>
    </>
  );
}
