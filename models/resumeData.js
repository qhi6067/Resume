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


// ------------------------------------------------------------
// EXPERIENCE — Work history shown in the interactive carousel
// Each object = one job entry
// ------------------------------------------------------------
export const EXPERIENCE = [
  {
    id: "securitas",
    title: "Solutions Engineer / Project Manager / LATAM Clinical Educator / Developer",
    company: "Securitas Healthcare",
    dates: "October 2024 - Present",

    // Badges displayed visually on each experience card
    badges: [
      " RF/RTLS",
      " Networking",
      " Hospitals",
      " Training",
      " Project Management",
      " Security"
    ],

    // Bullet points displayed in the experience detail view
    bullets: [
      "Lead end-to-end solution design and deployment of hospital-wide RTLS, infant protection (Hugs & Kisses), and environmental monitoring systems across multi-site health systems, translating clinical workflow requirements into Cisco networking, RF infrastructure, and server architectures.",
      "Serve as the primary technical point of contact for hospital IT, clinical leadership, and executive stakeholders throughout the pre-sales and implementation lifecycle, scoping requirements, running solution demos, and driving technical wins from discovery through go-live.",
      "Own the full LATAM portfolio as the sole bilingual (Spanish/English) solutions engineer, leading implementations across Puerto Rico, Costa Rica, and Mexico and expanding delivery capacity in markets previously underserved due to language and regional coverage gaps.",
      "Manage project lifecycle for multi-site hospital deployments as assisting project manager, overseeing budgeting, vendor coordination, resource planning, deadline tracking, and escalation management across cross-functional teams.",
      "Partner with sales, product, and engineering teams to troubleshoot complex integration issues spanning databases, authentication, certificates, and wireless infrastructure, reducing escalations and accelerating time-to-value for hospital customers.",
      "Design and deliver bilingual clinical education programs, workshops, remote trainings, and go-live support for nursing, IT, and executive stakeholders, ensuring sustained adoption of patient safety technology in labor and delivery and other high-acuity units.",
      "Develop internal Python and AI-assisted tooling to automate deployment documentation, technical analysis, and reporting workflows, applying full-stack and machine learning experience to reduce manual overhead for the implementation team."
    ],

  },

  {
    id: "entheospace",
    title: "Software Engineer",
    company: "Entheospace",
    dates: "February 2024 - May 2025",

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
    name: "Machine Learning Tumor Classification",
    desc:
      "CNN model classifying brain tumor tissues from MRI scans. Achieved ~95% accuracy using RGB on >2,000 images.",
    tags: [
      " Python,",
      " PyTorch,",
      " CNN,",
      " Medical Imaging.",
    ],
  },
  {
    name: "AI Face Detection",
    desc:
      "dlib + OpenCV face detection with ~96% accuracy; bounding-box overlays with robust performance.",
    tags: [
      " Python,",
      " OpenCV,",
      " dlib,",
      " Computer Vision.",
    ],
  },
  {
    name: "Project Management System",
    desc:
      "Full-stack Next.js platform for managing multi-stage hospital implementation projects. Features sequential workflow stages, AI-powered email generation, client info management, Supabase integration, Prisma ORM, and a real-time dashboard with dark/light theme toggle. Designed for field engineers coordinating deployments across multiple hospital sites.",
    tags: [
      " Next.js,",
      " React,",
      " Supabase,",
      " Prisma ORM,",
      " AI (OpenAI),",
      " TypeScript,",
      " SQL.",
    ],
  },
  {
    name: "Dynamic System Architecture Builder",
    desc:
      "Desktop and online architecture-design platform for RTLS/HUGS environments. Expanded the original Tkinter + Graphviz builder with ELK auto-layout, a Next.js web implementation, shared configuration mapping, layout and PDF export APIs, URL-driven config loading, and professional SVG/PNG/PDF output generation for Cisco and Non-Cisco HA or singular deployments.",
    tags: [
      " Python,",
      " Tkinter,",
      " Next.js,",
      " TypeScript,",
      " ELK.js,",
      " Graphviz,",
      " ReportLab,",
      " PyInstaller.",
    ],
  },
  {
    name: "Environmental Monitoring Analysis Tool",
    desc:
      "Local Python web application for analyzing Securitas MobileView environmental monitoring exports. Built a configurable rule engine to cross-reference asset and tag inventories, flag compliance and naming anomalies, drive interactive filtering dashboards, and export client-ready Excel reports for investigation and remediation planning.",
    tags: [
      " Python,",
      " Flask,",
      " openpyxl,",
      " xlrd,",
      " Rule Engine,",
      " Excel Automation.",
    ],
  },
  {
    name: "LPMC Scheduler",
    desc:
      "Responsive scheduling portal for Las Palmas Medical Center supporting public pharmacist and tech schedule viewing, admin Excel uploads, PTO request submission and approval workflows, downloadable schedule files, and durable cloud-backed storage. Built with a Vite frontend and Node/Vercel deployment flow using Blob storage and Postgres, with local JSON/file fallbacks for offline development.",
    tags: [
      " Vite,",
      " JavaScript,",
      " Node.js,",
      " Postgres,",
      " Vercel Blob,",
      " Excel Processing.",
    ],
  },
  {
    name: "Jocelynne's Boots Invoice System",
    desc:
      "Next.js invoicing and operations dashboard for a custom boot business with login flow, client and product management, invoice creation, printable invoice detail pages, status updates, notifications, and Supabase-backed persistence. Structured as a modern admin workspace with reusable UI components and dashboard views for clients, products, invoices, and settings.",
    tags: [
      " Next.js,",
      " React,",
      " TypeScript,",
      " Supabase,",
      " Tailwind CSS,",
      " Invoice Workflow.",
    ],
  },
  {
    name: "Project Milestone Tracker",
    desc:
      "Mobile-first project tracking web app built with Vite and Supabase. Features role-based access (admin/user), real-time workflow step tracking across 5 milestone phases, progress circle visualization, admin user creation portal, project archiving, and full Supabase-backed persistence. Deployed to Vercel.",
    tags: [
      " Vite,",
      " Supabase,",
      " JavaScript,",
      " Role-Based Auth,",
      " Vercel.",
    ],
  },
  {
    name: "Inventory Management System",
    desc:
      "Full-stack inventory app automating stock tracking and updates to optimize operations for various company use.",
    tags: [
      " JavaScript,",
      " PHP,",
      " SQL,",
      " jQuery,",
      " Full-stack.",
    ],
  },
  {
    name: "Engine Map Filter Application",
    desc:
      "Windows desktop app for filtering and optimizing AeroScout Engine Map ZIP archives before Fieldwire uploads. Features drag-and-drop batch processing, auto map-ID scanning, checkboxes for ID selection, configurable output folder, automatic archive splitting for Fieldwire's 200 MB limit, partition recombination, and a map image collage viewer. Packaged as a standalone EXE for hospital server deployment.",
    tags: [
      " Python,",
      " Tkinter,",
      " PyInstaller,",
      " Fieldwire,",
      " Windows.",
    ],
  },
  {
    name: "Aeroscout Log Filtering App",
    desc:
      "Desktop application for parsing and analyzing Aeroscout MobileView logs with time-window grouping. Features drag-and-drop processing and automated Excel reporting to accelerate system troubleshooting and diagnostics.",
    tags: [
      " Python,",
      " Tkinter,",
      " openpyxl,",
      " PyInstaller.",
    ],
  },
  {
    name: "Particle Simulator",
    desc:
      "Python/Django + SQLite simulator; scraped periodic-table data and modeled particle interactions (mass/charge).",
    tags: [
      " Python,",
      " Django,",
      " SQLite,",
      " Web Scraping.",
    ],
  },
  {
    name: "Sias' Salt E-Commerce",
    desc:
      "Premium product landing page for an artisan salt brand featuring custom visual design, responsive navigation, polished motion, immersive hero treatment, Supabase integration, and Three.js-driven presentation touches to create a more elevated online shopping experience.",
    tags: [
      " HTML,",
      " CSS,",
      " JavaScript,",
      " Supabase,",
      " Three.js,",
      " Responsive Design.",
    ],
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
  "English — Native",
  "Spanish — Fluent",
];



// ------------------------------------------------------------
// SKILLS — Structured skill categories
// Shown as badge rows in the Skills section
// ------------------------------------------------------------
export const SKILLS = {
  programming: [
    "Next.js",
    "Python",
    "React",
    "JavaScript",
    "TypeScript",
    "jQuery",
    "PHP",
    "SQL",
    "Flask",
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
    "Excel data processing",
    "Rule-engine design",
    "Diagram generation & export pipelines",
    "Responsive UI design",
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
  "Assisting Project Manager — Securitas Healthcare Latin-American HUGS Projects",
  "Volunteer/Member — American Heart Association, University Medical Center, Local Churches",
  "Treasurer — Health Occupations Students of America (HOSA)",
  "Member — Dr. Bernard Harris Pre-Medical Society (TTU), Coding Interview Club",
  "Research Assistant — Texas Tech University, University of Texas at El Paso",
  "Programming Assistant — Back-end development for small businesses & university projects",
  "AI Club — Securitas Healthcare AI development playground developer and tester"
];

// ------------------------------------------------------------
// TOOLS — Platforms, software, and infrastructure tools
// ------------------------------------------------------------
export const TOOLS = [
  "Claude",
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

