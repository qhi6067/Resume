// scripts/generateResume.mjs
// Reads models/resumeData.js and produces latex/resume.tex, then compiles to public/Resume.pdf
// Run manually:  node scripts/generateResume.mjs
// Auto-triggered by Claude Code hook whenever resumeData.js is saved.

import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'fs';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ── Load resumeData.js without requiring ESM or type:module ─────────────────
const src = readFileSync(join(ROOT, 'models', 'resumeData.js'), 'utf8')
  .replace(/^export const /gm, 'const ');

const {
  CONTACT, EXPERIENCE, PROJECTS, EDUCATION,
  SKILLS, TOOLS, LEADERSHIP, LANGUAGES,
} = Function(`"use strict"; ${src};
  return { CONTACT, EXPERIENCE, PROJECTS, EDUCATION, SKILLS, TOOLS, LEADERSHIP, LANGUAGES };
`)();

// ── LaTeX escaper ─────────────────────────────────────────────────────────────
function esc(str) {
  if (str == null) return '';
  return String(str)
    .replace(/[\\&%$#_{}~^]/g, c => ({
      '\\': '\\textbackslash{}',
      '&':  '\\&',
      '%':  '\\%',
      '$':  '\\$',
      '#':  '\\#',
      '_':  '\\_',
      '{':  '\\{',
      '}':  '\\}',
      '~':  '\\textasciitilde{}',
      '^':  '\\textasciicircum{}',
    }[c]))
    .replace(/—/g,  '---')
    .replace(/–/g,  '--')
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'");
}

// ── Derive "Bilingual: English / Spanish" from LANGUAGES array ───────────────
// LANGUAGES entries look like "English — Native", "Spanish — Fluent"
function bilingualString() {
  const names = (LANGUAGES || [])
    .map(l => l.split(/\s*[—\-–]\s*/)[0].trim())
    .filter(Boolean);
  if (names.length < 2) return names[0] || '';
  return `Bilingual: ${names.join(' / ')}`;
}

// ── Section generators ────────────────────────────────────────────────────────

function genExperience() {
  const jobs = EXPERIENCE.map(job => `
    \\resumeSubheading
      {${esc(job.company)}}{${esc(job.dates)}}
      {${esc(job.title)}}{}
      \\resumeItemListStart
${job.bullets.map(b => `        \\resumeItem{${esc(b)}}`).join('\n')}
      \\resumeItemListEnd
`).join('');

  return `
%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart
${jobs}
  \\resumeSubHeadingListEnd
`;
}

function genProjects() {
  // Only render projects marked featured: true
  const featured = PROJECTS.filter(p => p.featured);

  const cards = featured.map(p => {
    const tags = (p.tags || []).map(esc).join(', ');
    const heading = tags
      ? `\\textbf{${esc(p.name)}} $|$ \\emph{${tags}}`
      : `\\textbf{${esc(p.name)}}`;

    // Use bullets[] when present, fall back to desc
    const bulletLines = (p.bullets && p.bullets.length > 0)
      ? p.bullets
      : [p.desc];

    return `
      \\resumeProjectHeading
          {${heading}}{}
          \\resumeItemListStart
${bulletLines.map(b => `            \\resumeItem{${esc(b)}}`).join('\n')}
          \\resumeItemListEnd
`;
  }).join('');

  return `
%-----------PROJECTS-----------
\\section{Projects}
    \\resumeSubHeadingListStart
${cards}
    \\resumeSubHeadingListEnd
`;
}

function genEducation() {
  const schools = EDUCATION.map(edu => `
    \\resumeSubheading
      {${esc(edu.school)}}{${esc(edu.dates)}}
      {${esc(edu.degree)}}{}
      \\resumeItemListStart
        \\resumeItem{\\textbf{Honors}: ${edu.bullets.map(esc).join(', ')}}
      \\resumeItemListEnd
`).join('');

  return `
%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
${schools}
  \\resumeSubHeadingListEnd
`;
}

function genSkillsAndTools() {
  // Soft Skills + Sales merged into one Professional row
  const professionalSkills = [
    ...(SKILLS.soft  || []),
    ...(SKILLS.sales || []),
  ];

  const rows = [
    { label: 'Programming',    items: SKILLS.programming    },
    { label: 'Infrastructure', items: SKILLS.infrastructure },
    { label: 'Software',       items: SKILLS.software       },
    { label: 'Medical',        items: SKILLS.medical        },
    { label: 'Professional',   items: professionalSkills    },
  ];

  const lines = rows
    .filter(r => r.items?.length)
    .map((r, i, arr) => {
      const suffix = i < arr.length - 1 ? ' \\\\' : '';  // no trailing \\ on last row before Tools
      return `     \\textbf{${r.label}}{: ${r.items.map(esc).join(', ')}}${suffix}`;
    });

  // Tools always last, no trailing \\
  if (TOOLS?.length) {
    lines[lines.length - 1] += ' \\\\';  // add \\ to what was the last row
    lines.push(`     \\textbf{Tools}{: ${TOOLS.map(esc).join(', ')}}`);
  }

  return `
%
%-----------TECHNICAL SKILLS-----------
\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
${lines.join('\n')}
    }}
 \\end{itemize}
`;
}

function genLeadership() {
  const items = LEADERSHIP.map(l => `    \\resumeItem{${esc(l)}}`).join('\n');
  return `
%-----------LEADERSHIP-----------
\\section{Leadership \\& Involvement}
  \\resumeItemListStart
${items}
  \\resumeItemListEnd
`;
}

// ── Full document ─────────────────────────────────────────────────────────────

function buildDocument() {
  const bilingual = esc(bilingualString());

  return `%-------------------------
% Resume -- generated from models/resumeData.js
% DO NOT EDIT THIS FILE DIRECTLY -- edit resumeData.js instead
% Template: https://github.com/sb2nov/resume (MIT)
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}


\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generated PDF is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\\begin{document}

%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape ${esc(CONTACT.name)}} \\\\ \\vspace{1pt}
    \\small ${esc(CONTACT.phone)} $|$
    \\href{mailto:${CONTACT.email}}{\\underline{${esc(CONTACT.email)}}} $|$
    ${esc(CONTACT.location)} $|$
    ${esc(CONTACT.citizenship)} $|$
    ${bilingual}
\\end{center}
${genExperience()}${genProjects()}${genEducation()}${genSkillsAndTools()}${genLeadership()}
%-------------------------------------------
\\end{document}
`;
}

// ── Write .tex and compile ────────────────────────────────────────────────────

const latexDir = join(ROOT, 'latex');
mkdirSync(latexDir, { recursive: true });
const texPath = join(latexDir, 'resume.tex');

writeFileSync(texPath, buildDocument(), 'utf8');
console.log(`✓ Generated latex/resume.tex`);

// Locate pdflatex — check PATH first, then MiKTeX default install on Windows
const MIKTEX_BIN = 'C:\\Users\\perezja\\AppData\\Local\\Programs\\MiKTeX\\miktex\\bin\\x64';
let pdflatexCmd = 'pdflatex';
let hasPdflatex = false;
try {
  execSync('pdflatex --version', { stdio: 'ignore' });
  hasPdflatex = true;
} catch {
  try {
    execSync(`"${MIKTEX_BIN}\\pdflatex.exe" --version`, { stdio: 'ignore' });
    pdflatexCmd = `"${MIKTEX_BIN}\\pdflatex.exe"`;
    hasPdflatex = true;
  } catch { /* not installed */ }
}

if (!hasPdflatex) {
  console.log('\n⚠  pdflatex not found — .tex written but PDF not compiled.');
  process.exit(0);
}

console.log('Compiling PDF (pass 1/2)...');
try {
  execSync(
    `${pdflatexCmd} -interaction=nonstopmode -output-directory="${latexDir}" "${texPath}"`,
    { stdio: 'pipe', cwd: latexDir }
  );
  console.log('Compiling PDF (pass 2/2)...');
  execSync(
    `${pdflatexCmd} -interaction=nonstopmode -output-directory="${latexDir}" "${texPath}"`,
    { stdio: 'pipe', cwd: latexDir }
  );
} catch (err) {
  const log = err.stdout?.toString() || err.stderr?.toString() || err.message;
  console.error('PDF compilation failed. Last pdflatex output:');
  log.split('\n').filter(l => /error|fatal|undefined/i.test(l)).forEach(l => console.error(' ', l));
  console.error('\nFull log: latex/resume.log');
  process.exit(1);
}

const pdfSrc  = join(latexDir, 'resume.pdf');
const pdfDest = join(ROOT, 'public', 'Resume.pdf');
copyFileSync(pdfSrc, pdfDest);
console.log(`✓ PDF saved to public/Resume.pdf`);
