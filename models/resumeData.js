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
    title: "Solutions Engineer and Assisting Project Manager",
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
      "Deliver end-to-end system, network, and security engineering solutions for multi-site hospital deployments, including Cisco networking, RF/RTLS systems and server infrastructure.",
      "Design and implement patient safety and environmental monitoring systems, including Hugs & Kisses infant security technology in labor and delivery units.",
      "Act as the primary owner for all Latin American projects, leveraging bilingual Spanish–English skills to lead implementations in Puerto Rico, Costa Rica, and Mexico.",
      "Collaborate with hospital IT teams and clinical staff to develop scalable solutions and deliver hands-on training.",
      "Manage project budgeting, vendor coordination, and resource planning as assisting project manager for multi-site hospital deployments.",
      "Awarded and recognized for successfully completing complex projects in Puerto Rico, Costa Rica, and Mexico while maintaining excellent customer satisfaction."
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
    name: "Project Management System",
    desc:
      "System for Securitas Healthcare to manage projects and tasks in a sequential and automated manner.",
    tags: [
      " Next.js,",
      " CSS,",
      " SQL,",
      " React,",
      " Docker.",
    ],
  },
  {
    name: "Engine Map Remover Application",
    desc:
      "Windows executable to remove hospital maps from Securitas’ backend engine to reduce Location Optimization file size.",
    tags: [
      " Python,",
      " Windows,",
      " PyInstaller.",
    ],
  },
  {
    name: "Dynamic System Architecture Builder",
    desc:
      "Tkinter GUI application for building and visualizing network architecture diagrams using Graphviz, with portable distribution.",
    tags: [
      " Python,",
      " Tkinter,",
      " Graphviz,",
      " PyInstaller.",
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
    "jQuery",
    "PHP",
    "SQL",
    "HTML/CSS",
    "API Integration",
  ],

  infrastructure: [
    "Networking & IP configuration",
    "RF/RTLS systems",
    "Server deployment",
    "Cloud architecture",
    "System commissioning",
    "Hardware/software troubleshooting",
  ],

  software: [
    "Full-stack web development",
    "Automation scripting",
    "Database design",
    "System integration",
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
  "Docker",
  "Git / Version Control",
  "Salesforce",
  "Fieldwire",
  "SQL Server",
  "Linux",
  "Windows Server",
  "Virtual Machines / Remote Desktop",
  "Cisco Networking Tools",
  "Network Diagnostics & Troubleshooting",
];

