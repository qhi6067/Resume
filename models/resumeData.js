// ============================================================
// resumeData.js
// MODEL LAYER — Contains *all* structured data for the resume.
// This file has ZERO UI logic. It only exports clean JSON-like
// objects and arrays for the View to consume.
// ============================================================


// ------------------------------------------------------------
// CONTACT — Basic top-of-page personal info
// ------------------------------------------------------------
export const CONTACT = {
  name: "Jaime Perez",
  location: "El Paso, Texas 79915",
  phone: "(915) 888-7009",
  email: "Jaime123perez43@gmail.com",
  citizenship: "US Citizen",
};

export const SUMMARY =
  "Solutions engineer and software developer specializing in hospital RTLS, infant protection, and clinical infrastructure. Leads bilingual U.S./LATAM delivery across wireless, RF, servers, databases, and high-availability environments while building local-first AI and automation tools that make planning, diagnostics, configuration, and knowledge transfer safer and more repeatable.";


// ------------------------------------------------------------
// EXPERIENCE — Work history shown in the interactive carousel
// Each object = one job entry
// ------------------------------------------------------------
export const EXPERIENCE = [
  {
    id: "securitas",
    title: "Solutions Engineer / Technical Project Manager / Software Developer",
    company: "Securitas Healthcare",
    dates: "Oct. 2024 - Present",

    // Badges displayed visually on each experience card
    badges: [
      " RF/RTLS",
      " Networking",
      " Hospitals",
      " Project Management",
      " Software Development",
      " AI & Automation",
      " LATAM"
    ],

    // Bullet points displayed in the experience detail view
    bullets: [
      "Lead end-to-end architecture and delivery for hospital-wide RTLS, Hugs & Kisses infant protection, and environmental monitoring systems, translating clinical workflows into Cisco wireless, RF, server, database, and high-availability designs.",
      "Serve as the primary technical partner to hospital IT, clinical leaders, executives, and sales teams from discovery and solution demonstrations through implementation, validation, go-live, and post-deployment troubleshooting.",
      "Own LATAM solution delivery as the sole bilingual English/Spanish solutions engineer, leading implementations across Puerto Rico, Costa Rica, and Mexico while adapting training and technical plans to regional teams and clinical environments.",
      "Direct multi-site project execution across budgets, vendors, resource plans, milestones, risks, and escalations, coordinating engineering, product, sales, clinical, and customer teams around deployment readiness.",
      "Diagnose complex production issues across wireless networks, Windows and Linux servers, SQL Server, Tomcat, ActiveMQ, authentication, certificates, and HA infrastructure; convert field evidence into repeatable diagnostic and remediation playbooks.",
      "Build privacy-conscious engineering tools - including HAR/PCAP diagnostics, guarded configuration agents, architecture generators, and citation-grounded knowledge assistants - to standardize planning, troubleshooting, configuration, and knowledge transfer."
    ],

  },

  {
    id: "entheospace",
    title: "Software Engineer",
    company: "Entheospace",
    dates: "Feb. 2024 - May 2025",

    badges: [" JS/PHP/SQL", " Full-stack", " Automation"],

    bullets: [
      "Developed and maintained web-based software using JavaScript, PHP, SQL, HTML, and CSS.",
      "Collaborated with cross-functional teams to integrate systems seamlessly.",
      "Improved software reliability by ~20% via testing and debugging.",
      "Integrated cloud solutions and automation to streamline inventory and logistics.",
    ],
  },

  {
    id: "vclean",
    title: "Account Manager",
    company: "V-Clean",
    dates: "2022 - 2023",

    badges: [" Client Success", " Sales Ops", " Quoting App"],

    bullets: [
      "Managed client relationships; contributed to ~15% YoY revenue growth.",
      "Built a centralized project-phase database to boost efficiency.",
      "Developed a quoting website; reduced the sales cycle by ~30%.",
    ],
  },

  {
    id: "boots",
    title: "Procurement Manager",
    company: "Jocelynne's Boots (Remote)",
    dates: "2019 - 2022",

    badges: [" Sourcing", " Vendors", " Laser-Etch"],

    bullets: [
      "Sourced and managed procurement for a leather-goods network.",
      "Implemented laser-etched leather products, driving ~10% revenue lift.",
      "Maintained vendor relationships; reduced lead times and expedited delivery.",
    ],
  },

  {
    id: "pharmtech",
    title: "Pharmacy Technician",
    company: "UMC Lubbock, Las Palmas Medical Center",
    dates: "2019 - Present",

    badges: [" Compounding", " Nursing Communication", " Patient Care"],

    bullets: [
      "Enhanced digital pharmacy operations by resolving technical issues.",
      "Compounded and modified prescriptions with ~99% accuracy.",
      "First pharmacy technician recognized annually by nurses for excellence.",
      "Built foundational knowledge of medical devices (e.g., pacemakers).",
    ],
  },
];


// ------------------------------------------------------------
// PROJECTS — Portfolio projects grid
// Each object = one project card
// ------------------------------------------------------------
export const PROJECTS = [
  {
    name: "Gateway Architectural Designer",
    featured: true,
    desc:
      "Local-first engineering application for planning Securitas Healthcare gateway placement across multi-floor hospitals. Imports PDF and image floor plans, aligns and calibrates them to real-world scale, projects gateway stacks between floors, simulates estimated coverage, supports interactive 2D and 3D review, and exports portable project files and multi-page engineering PDFs. Packaged as a self-contained Windows application with no cloud dependency.",
    tags: ["React", "TypeScript", "Three.js", "Konva", "PDF.js", "IndexedDB", "Vitest"],
    pdfTags: ["React", "TypeScript", "Three.js", "Konva", "PDF.js"],
    bullets: [
      "Built a local-first React/TypeScript tool for importing, aligning, and calibrating multi-floor hospital plans, then placing vertically projected gateway stacks with per-floor adjustments and estimated coverage overlays.",
      "Added interactive 2D/3D review, IndexedDB autosave, portable project archives, high-resolution engineering PDF export, automated tests, and self-contained Windows distribution.",
    ],
  },
  {
    name: "MobileView HAR & Network Analyzer",
    featured: true,
    desc:
      "Local diagnostic platform that correlates HAR traffic, MobileView logs and configuration evidence, and PCAP/PCAPNG captures to explain performance and network failures. Combines a deterministic rule engine with grounded AI analysis, privacy screening, interactive network maps, multi-format reporting, and Docker or standalone Windows distribution.",
    tags: ["TypeScript", "React", "Express", "PCAP/PCAPNG", "Rule Engine", "Anthropic API", "Docker"],
    pdfTags: ["TypeScript", "React", "Express", "PCAP", "Docker"],
    bullets: [
      "Built a local React/TypeScript and Express platform that correlates HAR traffic, MobileView logs, configuration evidence, and PCAP/PCAPNG captures to isolate application and network delays.",
      "Combined deterministic diagnostics with grounded AI narratives, sensitivity screening, interactive network maps, multi-format reports, and Docker or standalone Windows distribution.",
    ],
  },
  {
    name: "HUGS Configuration AI Agent",
    featured: true,
    desc:
      "Safety-gated LangGraph system for configuring MobileView HUGS infant-protection environments. Converts site configuration sheets into validated intent, detects live drift, proposes a plan, requires human approval and administrator authorization before SOAP/SQL writes, then independently re-reads the system and produces an audit bundle.",
    tags: ["Python", "LangGraph", "FastAPI", "SOAP", "SQL Server", "Docker", "Human-in-the-Loop"],
    pdfTags: ["Python", "LangGraph", "SOAP", "SQL Server", "Docker"],
    bullets: [
      "Designed a two-agent LangGraph workflow that converts site configuration sheets into validated intent, detects live HUGS configuration drift, and produces an approval-ready change plan.",
      "Enforced dry-run defaults, human approval, administrator authorization, deterministic SOAP/SQL adapters, independent read-back verification, and auditable results for safety-critical changes.",
    ],
  },
  {
    name: "Solar System Operations Hub",
    desc:
      "Secure local operations portal that presents approved healthcare engineering applications as an interactive 3D constellation. Includes schema-validated hot-reload registration, live health polling, signed sessions, role-based access, one-time confirmations for service-impacting actions, loopback-only reverse proxying, and managed process controls.",
    tags: ["React", "TypeScript", "Three.js", "Express", "SQLite", "RBAC", "Vitest"],
    pdfTags: ["React", "TypeScript", "Three.js", "Express", "Security"],
    bullets: [
      "Built a React/Three.js operations portal with deterministic 3D visualization, schema-validated app registration, live health polling, an accessible dashboard, and managed application processes.",
      "Implemented signed sessions, role-based access, single-use confirmations for service-impacting actions, fail-closed exclusions, and loopback-only reverse proxy controls.",
    ],
  },
  {
    name: "MV J-Sage Knowledge Assistant",
    featured: true,
    desc:
      "Local citation-grounded assistant for a 959-document MobileView and AeroScout knowledge corpus. Uses BM25 retrieval, symptom-vocabulary query expansion, tool-assisted re-query, source citations, Mermaid diagrams, and DOCX/PDF export while keeping raw customer references out of shipped artifacts.",
    tags: ["TypeScript", "RAG", "React", "Express", "Anthropic API", "SQLite", "Docker"],
    pdfTags: ["TypeScript", "RAG", "React", "SQLite", "Docker"],
    bullets: [
      "Created a citation-grounded RAG assistant for a 959-document MobileView/AeroScout corpus with BM25 retrieval, symptom-aware query expansion, tool-assisted re-query, and inline Mermaid diagrams.",
      "Added DOCX/PDF export, local SQLite persistence, Docker packaging, and a sanitized-reference pipeline that prevents raw customer identifiers from entering shipped artifacts.",
    ],
  },
  {
    name: "Dynamic System Architecture Builder",
    desc:
      "Desktop and online architecture-design platform for RTLS/HUGS environments. Expanded the original Tkinter + Graphviz builder with ELK auto-layout, a Next.js web implementation, shared configuration mapping, layout and PDF export APIs, URL-driven config loading, and professional SVG/PNG/PDF output generation for Cisco and Non-Cisco HA or singular deployments.",
    tags: ["Python", "Tkinter", "Next.js", "TypeScript", "ELK.js", "Graphviz", "ReportLab", "PyInstaller"],
    bullets: [
      "Desktop and web platform for designing Cisco and Non-Cisco RTLS/HUGS network architectures; desktop version packaged as a standalone Windows EXE via PyInstaller with Graphviz rendering.",
      "Next.js web implementation with ELK.js auto-layout; exports professional SVG, PNG, and PDF diagrams via URL-driven configuration and a ReportLab pipeline.",
    ],
  },
  {
    name: "Environmental Monitoring Analysis Tool",
    desc:
      "Local Python web application for analyzing Securitas MobileView environmental monitoring exports. Built a configurable rule engine to cross-reference asset and tag inventories, flag compliance and naming anomalies, drive interactive filtering dashboards, and export client-ready Excel reports for investigation and remediation planning.",
    tags: ["Python", "Flask", "openpyxl", "xlrd", "Rule Engine", "Excel Automation"],
    bullets: [
      "Python/Flask web app that parses Securitas MobileView exports and applies a configurable rule engine to cross-reference asset inventories and flag compliance and naming anomalies.",
      "Drives interactive filtering dashboards and generates client-ready Excel reports for investigation and remediation planning.",
    ],
  },
  {
    name: "Project Management System",
    desc:
      "Full-stack Next.js platform for managing multi-stage hospital implementation projects. Features sequential workflow stages, AI-powered email generation, client info management, Supabase integration, Prisma ORM, and a real-time dashboard with dark/light theme toggle. Designed for field engineers coordinating deployments across multiple hospital sites.",
    tags: ["Next.js", "React", "Supabase", "Prisma ORM", "AI (OpenAI)", "TypeScript", "SQL"],
    bullets: [
      "Full-stack Next.js platform for coordinating multi-stage hospital RTLS deployments with sequential workflow stages, AI-powered email drafting (OpenAI), and a real-time project dashboard.",
      "Supabase and Prisma ORM backend with TypeScript throughout; supports multi-site field engineer coordination with client info management and dark/light theme.",
    ],
  },
  {
    name: "Machine Learning Tumor Classification",
    desc:
      "CNN model classifying brain tumor tissues from MRI scans. Achieved ~95% accuracy using RGB on >2,000 images.",
    tags: ["Python", "PyTorch", "CNN", "Medical Imaging"],
    bullets: [
      "Built a CNN with PyTorch to classify brain tumor tissues from MRI scans; achieved ~95% accuracy across 2,000+ RGB images.",
      "Applied transfer learning and data augmentation to improve robustness on limited medical imaging datasets.",
    ],
  },
  {
    name: "AI Face Detection",
    desc:
      "dlib + OpenCV face detection with ~96% accuracy; bounding-box overlays with robust performance.",
    tags: ["Python", "OpenCV", "dlib", "Computer Vision"],
  },
  {
    name: "LPMC Scheduler",
    desc:
      "Responsive scheduling portal for Las Palmas Medical Center supporting public pharmacist and tech schedule viewing, admin Excel uploads, PTO request submission and approval workflows, downloadable schedule files, and durable cloud-backed storage. Built with a Vite frontend and Node/Vercel deployment flow using Blob storage and Postgres, with local JSON/file fallbacks for offline development.",
    tags: ["Vite", "JavaScript", "Node.js", "Postgres", "Vercel Blob", "Excel Processing"],
    bullets: [
      "Responsive scheduling portal for Las Palmas Medical Center with public schedule viewing, admin Excel uploads, and PTO request and approval workflows.",
      "Vite frontend with a Node/Vercel backend using Vercel Blob and Postgres for cloud-backed storage; includes local JSON fallbacks for offline development.",
    ],
  },
  {
    name: "Jocelynne's Boots Invoice System",
    desc:
      "Next.js invoicing and operations dashboard for a custom boot business with login flow, client and product management, invoice creation, printable invoice detail pages, status updates, notifications, and Supabase-backed persistence. Structured as a modern admin workspace with reusable UI components and dashboard views for clients, products, invoices, and settings.",
    tags: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS", "Invoice Workflow"],
  },
  {
    name: "Project Milestone Tracker",
    desc:
      "Mobile-first project tracking web app built with Vite and Supabase. Features role-based access (admin/user), real-time workflow step tracking across 5 milestone phases, progress circle visualization, admin user creation portal, project archiving, and full Supabase-backed persistence. Deployed to Vercel.",
    tags: ["Vite", "Supabase", "JavaScript", "Role-Based Auth", "Vercel"],
  },
  {
    name: "Inventory Management System",
    desc:
      "Full-stack inventory app automating stock tracking and updates to optimize operations for various company use.",
    tags: ["JavaScript", "PHP", "SQL", "jQuery", "Full-stack"],
  },
  {
    name: "Engine Map Filter Application",
    desc:
      "Windows desktop app for filtering and optimizing AeroScout Engine Map ZIP archives before Fieldwire uploads. Features drag-and-drop batch processing, auto map-ID scanning, checkboxes for ID selection, configurable output folder, automatic archive splitting for Fieldwire's 200 MB limit, partition recombination, and a map image collage viewer. Packaged as a standalone EXE for hospital server deployment.",
    tags: ["Python", "Tkinter", "PyInstaller", "Fieldwire", "Windows"],
    bullets: [
      "Windows desktop app that filters and optimizes AeroScout Engine Map ZIP archives before Fieldwire uploads; auto-splits archives at the 200 MB limit and recombines partitions on demand.",
      "Drag-and-drop batch processing with auto map-ID scanning and a map image collage viewer; packaged as a standalone EXE for hospital server deployment.",
    ],
  },
  {
    name: "Aeroscout Log Filtering App",
    desc:
      "Desktop application for parsing and analyzing Aeroscout MobileView logs with time-window grouping. Features drag-and-drop processing and automated Excel reporting to accelerate system troubleshooting and diagnostics.",
    tags: ["Python", "Tkinter", "openpyxl", "PyInstaller"],
  },
  {
    name: "Particle Simulator",
    desc:
      "Python/Django + SQLite simulator; scraped periodic-table data and modeled particle interactions (mass/charge).",
    tags: ["Python", "Django", "SQLite", "Web Scraping"],
  },
  {
    name: "Sias' Salt E-Commerce",
    desc:
      "Premium product landing page for an artisan salt brand featuring custom visual design, responsive navigation, polished motion, immersive hero treatment, Supabase integration, and Three.js-driven presentation touches to create a more elevated online shopping experience.",
    tags: ["HTML", "CSS", "JavaScript", "Supabase", "Three.js", "Responsive Design"],
  },
];


// ------------------------------------------------------------
// EDUCATION — Academic history
// ------------------------------------------------------------
export const EDUCATION = [
  {
    school: "University of Texas at El Paso",
    degree: "Bachelor of Science in Biochemistry and Computer Science",
    dates: "2019 - 2024",

    // Achievements/honors under the degree
    bullets: [
      "Dean's List",
      "Best Medical Science Student",
      "Best Mathematical Student",
    ],
  },
];

// ------------------------------------------------------------
// LANGUAGES — Spoken languages
// ------------------------------------------------------------
export const LANGUAGES = [
  "English - Native",
  "Spanish - Fluent",
];



// ------------------------------------------------------------
// SKILLS — Structured skill categories
// Shown as badge rows in the Skills section
// ------------------------------------------------------------
export const SKILLS = {
  programming: [
    "Python",
    "TypeScript",
    "JavaScript",
    "SQL",
    "Next.js",
    "React",
    "Node.js",
    "Express",
    "Flask",
    "PHP",
    "HTML/CSS",
    "API Integration",
  ],

  infrastructure: [
    "Networking & IP configuration",
    "RF/RTLS systems",
    "Server deployment",
    "Cloud architecture",
    "Vercel deployment",
    "Postgres / Supabase",
    "Blob storage",
    "System commissioning",
    "Hardware/software troubleshooting",
  ],

  software: [
    "Full-stack web development",
    "Automation scripting",
    "Database design",
    "System integration",
    "RAG & AI agent orchestration",
    "Network traffic analysis",
    "Privacy-aware local AI systems",
    "Excel data processing",
    "Rule-engine design",
    "Diagram generation & export pipelines",
  ],

  medical: [
    "Healthcare technology systems",
    "Medical device knowledge",
    "Clinical workflow understanding",
    "Medical terminology",
  ],

  soft: [
    "Client management",
    "Problem solving",
    "Communication",
    "Cross-functional collaboration",
    "Simplifying complex systems",
  ],

  sales: [
    "Technical sales",
    "Solution selling",
    "Stakeholder coordination",
    "Bilingual client relationship building",
    "Objection handling",
  ],
};



// ------------------------------------------------------------
// LEADERSHIP — Involvement, leadership roles, organizations
// Rendered as bullet list in Leadership section
// ------------------------------------------------------------
export const LEADERSHIP = [
  "Assistant Project Manager - Securitas Healthcare Latin-American HUGS Projects",
  "Volunteer/Member - American Heart Association, University Medical Center, Local Churches",
  "Treasurer - Health Occupations Students of America (HOSA)",
  "Member - Dr. Bernard Harris Pre-Medical Society (TTU), Coding Interview Club",
  "Research Assistant - Texas Tech University, University of Texas at El Paso",
  "Programming Assistant - Back-end development for small businesses & university projects",
  "AI Club - Securitas Healthcare AI development playground developer and tester"
];

// ------------------------------------------------------------
// TOOLS — Platforms, software, and infrastructure tools
// ------------------------------------------------------------
export const TOOLS = [
  "Claude",
  "Anthropic API",
  "LangGraph",
  "ChatGPT",
  "Gemini",
  "Ollama",
  "Docker",
  "Git",
  "Salesforce",
  "Fieldwire",
  "Microsoft SQL Server",
  "Supabase",
  "Vercel",
  "Linux",
  "Windows Server",
  "VMware / Hyper-V",
  "Cisco Wireless LAN Controller (WLC)",
  "Apache Tomcat",
  "OpenSSL",
  "ReportLab",
  "openpyxl",
  "Notion",
  "Obsidian",
  "Confluence",
  "Jira",
];

