// ------------------------------------------------------------
// ARCHITECTURE — one Mermaid diagram per portfolio project
//
// Keyed by the exact `name` in PROJECTS (models/resumeData.js). Kept
// separate from resumeData so PDF/LaTeX generation stays unaffected.
//
// Diagrams are read by views/ArchitectureModal.js, which supplies theme
// colors at render time. Keep them structural: no classDef/style directives,
// every label in double quotes, &amp; for an ampersand. Labels stay short —
// the viewer scales the whole diagram to fit, so long labels render tiny.
// ------------------------------------------------------------

export const ARCHITECTURE = {
  "Aside macOS AI Assistant": {
    summary:
      "Hotkey-driven Electron overlay whose main process gathers screenshots, read-only project excerpts, web page text and Swift-helper call audio, then routes each ask to Anthropic, OpenAI, Codex or Claude Code; it keeps a local question log and saves full sessions only when asked.",
    diagram: `
flowchart TD
  KEYS["Global shortcuts"]
  subgraph UI["Renderer"]
    PANEL["Overlay panel"]
  end
  BRIDGE["Preload IPC bridge"]
  subgraph M["Main process"]
    ASK["Ask orchestrator"]
    LISTEN["Listening controller"]
    CAP["Screen capture"]
    PAGE["Web page extractor"]
    SRC["Project source tools"]
    STT["Transcription"]
    ROUTE["Provider router"]
  end
  HELPER["Swift audio helper"]
  STORE[("Config, log &amp; sessions")]
  subgraph P["AI providers"]
    API["Anthropic &amp; OpenAI API"]
    CLI["Codex &amp; Claude Code"]
  end
  KEYS -->|"ask actions"| ASK
  KEYS -->|"listen toggle"| LISTEN
  PANEL -->|"typed asks"| BRIDGE
  BRIDGE -->|"IPC"| ASK
  ASK -->|"answer events"| BRIDGE
  BRIDGE --> PANEL
  LISTEN -->|"spawns"| HELPER
  HELPER -->|"16 kHz PCM"| STT
  STT -->|"transcript"| ASK
  CAP -->|"screenshot"| ASK
  PAGE -->|"page text"| ASK
  SRC -->|"source excerpts"| ASK
  ASK -->|"prompt"| ROUTE
  ROUTE -->|"tool calls"| SRC
  ROUTE <-->|"prompt + stream"| API
  ROUTE <-->|"prompt + output"| CLI
  ASK -->|"log &amp; sessions"| STORE
  STORE -->|"keys &amp; settings"| ROUTE
`,
  },

  "InterviewOS Integration Training Hub": {
    summary:
      "Buildless static hub deployed from GitHub to Vercel: it embeds Flightlab, RESTcraft and bundled SystemForge lessons in iframes, keeps progress in browser localStorage, and runs practice code in a sandboxed iframe plus disposable Web Worker that loads Pyodide and sql.js from the jsDelivr CDN.",
    diagram: `
flowchart TD
  subgraph Deploy["Deploy"]
    GH["GitHub repo"] -->|"push to main"| VC["Vercel static host"]
  end
  VC -->|"static assets"| HUB["Hub shell"]
  subgraph Browser["Browser"]
    HUB --> MODES["Practice modes"]
    HUB <-->|"progress"| LS[("localStorage")]
    MODES --> LS
  end
  subgraph Labs["Embedded labs"]
    FL["Flightlab"]
    RC["RESTcraft"]
    SF["SystemForge lessons"]
  end
  HUB -->|"iframe"| FL
  HUB -->|"iframe"| RC
  HUB -->|"same origin"| SF
  FL <-->|"WebSocket"| NODE["Local Node server"]
  FL --> EXT["Hosted lab links"]
  RC -->|"published"| EXT
  subgraph Sandbox["Code sandbox"]
    SBX["Sandboxed iframe"] -->|"spawns"| WK["Web Worker"]
  end
  MODES -->|"run code"| SBX
  WK <-->|"loads runtimes"| CDN["jsDelivr CDN"]
`,
  },

  "MobileView HAR & Network Analyzer": {
    summary:
      "Local-first React and Express app that parses HAR, PCAPNG and MobileView log captures, root-causes delays with a deterministic rule engine and feedback loop, then adds an optional Anthropic or Ollama supervisor-subagent narrative grounded in a local graphify knowledge base; ships via Docker.",
    diagram: `
flowchart TD
  subgraph FE["Frontend"]
    UI["React workspaces"]
  end
  subgraph BE["Backend"]
    API["Express REST API"]
    PARSE["HAR &amp; log parser"]
    RULES["Rule engine"]
    AI["AI orchestrator"]
    RPT["Report generator"]
  end
  subgraph DATA["Local knowledge"]
    REF["Graphify KB"]
    INST["Install scanner"]
    FB["Feedback log"]
  end
  subgraph EXT["AI providers"]
    ANTH["Anthropic API"]
    OLL["Local Ollama"]
  end
  PCAPP["tshark PCAP parser"]
  UI -->|"HTTP"| API
  API --> PARSE
  PARSE --> RULES
  FB --> RULES
  RULES -->|"findings"| AI
  INST --> REF
  AI <-->|"grounding"| REF
  AI <-->|"prompt + analysis"| ANTH
  AI <-->|"prompt + analysis"| OLL
  AI -->|"narrative"| RPT
  RPT --> API
  API -->|"spawn"| PCAPP
  PCAPP -->|"network map"| UI
`,
  },

  "HUGS Configuration AI Agent": {
    summary:
      "An operator uploads a site-intent JSON to a FastAPI web UI, a LangGraph drift planner reads live HUGS config over mv-ws SOAP and admin SQL and writes an audit bundle, a human approval gate releases the apply step to SOAP and the JSF admin UI, and a separate validator agent reconfirms in SQL.",
    diagram: `
flowchart TD
  OP["Operator"]
  SI["Site intent JSON"]
  UI["FastAPI web UI"]
  PLAN["Drift planner"]
  GATE["Human approval gate"]
  APPLY["Apply executor"]
  VAL["Validator agent"]
  BUNDLE["Audit bundle"]
  subgraph MV["MobileView"]
    WS["mv-ws SOAP services"]
    ADMIN["JSF admin UI"]
    DB[("SQL Server")]
  end
  OP --> UI
  SI --> UI
  UI --> PLAN
  PLAN <-->|"read live config"| WS
  PLAN <-->|"read params"| DB
  PLAN --> BUNDLE
  PLAN --> GATE
  GATE -->|"approved"| APPLY
  APPLY -->|"event specs"| WS
  APPLY -->|"config params"| ADMIN
  APPLY --> VAL
  VAL <-->|"verify"| DB`,
  },

  "MV J-Sage Knowledge Assistant": {
    summary:
      "A React chat UI streams over SSE to an Express backend whose agentic Anthropic loop calls five tools: BM25 retrieval over a sanitized Markdown corpus, exact .properties and JAR indexes, Mermaid rendering, and DOCX/PDF export, persisting conversations in SQLite behind the Solar System Hub.",
    diagram: `
flowchart TD
  subgraph FE["Frontend"]
    UI["React chat UI"]
    SSE["SSE client"]
  end
  subgraph BE["Backend"]
    RT["Express routes"]
    AI["Agentic turn loop"]
    TOOLS["Tool handlers"]
    RET["BM25 retrieval"]
    ART["DOCX + PDF writer"]
  end
  subgraph DATA["Local stores"]
    DB[("SQLite")]
    CORPUS[("Markdown corpus")]
    IDX[("Exact indexes")]
  end
  EXT["Anthropic API"]
  HUB["Solar System Hub"]
  UI --> SSE
  SSE -->|"HTTP + SSE"| RT
  RT --> AI
  AI --> TOOLS
  AI <-->|"prompt + stream"| EXT
  TOOLS --> RET
  TOOLS --> ART
  TOOLS <-->|"lookups"| IDX
  RET <-->|"retrieval"| CORPUS
  RT <-->|"history"| DB
  HUB -->|"proxy + health"| RT
`,
  },

  "Machine Learning Tumor Classification": {
    summary:
      "Brain MRI folders are indexed into a pandas DataFrame, split with scikit-learn and fed as 224px batches by a Keras ImageDataGenerator into a Sequential CNN of two Conv2D/MaxPool blocks plus dense softmax, trained with Adam and scored by confusion matrix, classification report and accuracy curves.",
    diagram: `
flowchart TD
  subgraph DATA["Dataset"]
    IMG["Brain MRI scans"]
    IDX["pandas DataFrame"]
  end
  subgraph PREP["Data Pipeline"]
    SPLIT["train_test_split"]
    GEN["ImageDataGenerator"]
  end
  subgraph CNN["Keras CNN"]
    CONV["Conv2D &amp; MaxPool"]
    HEAD["Dense &amp; softmax"]
  end
  FIT["Adam training"]
  subgraph EVAL["Evaluation"]
    PRED["Predict &amp; evaluate"]
    CM["Confusion matrix"]
    REP["Classification report"]
    PLOT["Accuracy curves"]
  end
  IMG -->|"class folders"| IDX
  IDX --> SPLIT
  SPLIT --> GEN
  GEN -->|"train batches"| CONV
  CONV --> HEAD
  HEAD --> FIT
  FIT --> PRED
  GEN -->|"test batches"| PRED
  PRED --> CM
  PRED --> REP
  FIT -->|"history"| PLOT
`,
  },

  "Project Management System": {
    summary:
      "React client on Vercel calls Next.js API routes for auth, projects, workflow stages, email and articles; a lib service layer persists data to Supabase Postgres, drafts email copy via the OpenAI or Gemini API, sends it over SMTP with Nodemailer, and reads knowledge-base files from disk.",
    diagram: `
flowchart TD
  subgraph CL["Client"]
    UI["React UI"]
  end
  subgraph SRV["Vercel API routes"]
    AUTH["Auth login"]
    PROJ["Projects &amp; stages"]
    EMAIL["Email API"]
    ART["Articles API"]
  end
  subgraph SVC["Service layer"]
    DS["Data store"]
    AISVC["AI service"]
    MAIL["Nodemailer"]
  end
  subgraph DATA["Data stores"]
    SUPA[("Supabase Postgres")]
    FS["Article files"]
    LEG[("Prisma SQLite")]
  end
  AIAPI["OpenAI / Gemini API"]
  SMTP["SMTP server"]
  UI -->|"fetch /api"| AUTH
  UI --> PROJ
  UI --> EMAIL
  UI --> ART
  AUTH --> DS
  PROJ --> DS
  EMAIL --> AISVC
  EMAIL --> MAIL
  EMAIL --> DS
  ART -->|"fs read"| FS
  DS <-->|"queries"| SUPA
  AISVC <-->|"prompt + draft"| AIAPI
  MAIL --> SMTP
  LEG -.->|"migrated"| SUPA
`,
  },

  "AI Face Detection": {
    summary:
      "An OpenCV loop captures webcam or image frames, converts them to grayscale for dlib's HOG + SVM frontal face detector and 68-point shape predictor, draws boxes and landmarks back onto the frame, and scores detections against a labeled ground-truth set.",
    diagram: `
flowchart TD
  IN["Webcam or images"]
  subgraph PRE["Preprocessing"]
    CAP["cv2 frame capture"]
    GRAY["Grayscale resize"]
  end
  subgraph DET["dlib Detection"]
    HOG["HOG + SVM detector"]
    LM["68-point landmarks"]
  end
  subgraph ANN["Annotation"]
    BOX["Bounding boxes"]
    DRAW["OpenCV overlay"]
  end
  subgraph EVAL["Evaluation"]
    GT["Ground-truth labels"]
    ACC["Accuracy scoring"]
  end
  OUT["Annotated frames"]
  IN --> CAP
  CAP --> GRAY
  GRAY -->|"gray frame"| HOG
  HOG -->|"face rects"| LM
  HOG --> BOX
  LM -->|"landmarks"| BOX
  BOX --> DRAW
  DRAW --> OUT
  HOG -->|"predictions"| ACC
  GT --> ACC
`,
  },

  "Gateway Architectural Designer": {
    summary:
      "Local-first React/TypeScript desktop app: PDF.js rasterizes floor plans, scale calibration feeds a Konva 2D editor where placed gateway stacks are projected for Three.js 3D review and coverage simulation, autosaving to IndexedDB with portable archives, engineering PDF export and a Windows build.",
    diagram: `
flowchart TD
  subgraph IN["Inputs"]
    FP["Floor plans"]
    PDFJS["PDF.js"]
  end
  subgraph UI["React app"]
    APP["React UI shell"]
    CAL["Scale calibration"]
    K2D["Konva 2D editor"]
    GW["Gateway projection"]
    COV["Coverage simulation"]
    V3D["Three.js 3D review"]
  end
  subgraph OUT["Local persistence"]
    IDB[("IndexedDB autosave")]
    ARCH["Project archive"]
    PDFOUT["PDF export"]
  end
  WIN["Windows build"]

  FP --> PDFJS
  PDFJS -->|"raster plans"| K2D
  APP --> CAL
  CAL -->|"real scale"| K2D
  K2D --> GW
  GW -->|"vertical stacks"| V3D
  GW --> COV
  COV -->|"overlay"| K2D
  APP --> V3D
  K2D --> IDB
  GW --> IDB
  IDB -->|"export"| ARCH
  ARCH -->|"import"| IDB
  K2D --> PDFOUT
  WIN -->|"bundles"| APP
`,
  },

  "Solar System Operations Hub": {
    summary:
      "A loopback-only Express API serves a React/Three.js 3D constellation UI with a dashboard fallback, hot-reloading an AJV-validated app registry while polling health, proxying and spawning registered apps, and running SQLite-backed job chains plus an Anthropic-powered command center.",
    diagram: `
flowchart LR
  subgraph FE["Frontend"]
    UI["3D constellation UI"]
    DASH["Dashboard fallback"]
  end
  subgraph BE["Backend"]
    API["Express API"]
    REG["Registry store"]
    HEALTH["Health poller"]
    PROXY["Reverse proxy"]
    PROC["Process manager"]
    JOBS["Job chain runner"]
    AI["Command center AI"]
  end
  subgraph DATA["Data"]
    MAN["App manifests"]
    DB[("SQLite")]
    WS["Artifact workspace"]
  end
  subgraph EXT["External"]
    ANTH["Anthropic API"]
    APPS["Managed apps"]
  end
  UI -->|"HTTP"| API
  DASH --> API
  API --> REG
  API --> HEALTH
  API --> PROXY
  API --> PROC
  API --> JOBS
  API --> AI
  REG --> MAN
  JOBS <-->|"job state"| DB
  JOBS --> WS
  JOBS -->|"tool adapters"| APPS
  PROXY -->|"proxies"| APPS
  PROC -->|"spawns"| APPS
  HEALTH <-->|"polls"| APPS
  AI <-->|"prompt + reply"| ANTH`,
  },

  "Dynamic System Architecture Builder": {
    summary:
      "Two implementations: a Tkinter desktop app emits Graphviz DOT or ELK JSON, laid out by a bundled dot binary or a Node.js elkjs subprocess and drawn to PNG by Pillow with ReportLab PDF export; a Next.js React web app runs Graphviz-WASM, browser elkjs and interactive SVG, exporting via jsPDF.",
    diagram: `
flowchart TD
  subgraph Desktop["Desktop app"]
    GUI["Tkinter GUI"]
    PB["DOT &amp; ELK builders"]
  end
  subgraph Engines["Layout engines"]
    DOT["Graphviz dot"]
    ELKN["Node.js elkjs"]
  end
  subgraph Export["Desktop export"]
    PIL["Pillow PNG"]
    RL["ReportLab PDF"]
  end
  subgraph Web["Web app"]
    UI["Next.js React UI"]
    WB["TypeScript builders"]
    GVW["Graphviz WASM"]
    ELKB["Browser elkjs"]
    SVG["Interactive SVG"]
    PDFE["jsPDF export"]
  end
  GUI --> PB
  PB -->|"DOT"| DOT
  PB -->|"ELK JSON"| ELKN
  DOT --> PIL
  ELKN --> PIL
  PIL --> RL
  UI --> WB
  WB -->|"DOT"| GVW
  WB -->|"ELK JSON"| ELKB
  UI --> SVG
  GVW --> PDFE
  ELKB --> PDFE
  SVG --> PDFE
`,
  },

  "Environmental Monitoring Analysis Tool": {
    summary:
      "A Tkinter launcher starts an embedded Werkzeug/Flask server on localhost, serving a vanilla-JS dashboard that posts asset and tag workbooks to the API; a Python engine parses them with xlrd and openpyxl, checks schema, runs a configurable rule engine, and exports a flagged review workbook.",
    diagram: `
flowchart TD
  IN["Asset &amp; tag workbooks"]
  subgraph Desktop["Desktop Launcher"]
    L["Tkinter launcher"]
    WS["Werkzeug server"]
  end
  subgraph Client["Browser"]
    UI["Dashboard UI"]
  end
  subgraph Server["Flask App"]
    RT["Flask API routes"]
    ST["Analysis state"]
  end
  subgraph Engine["Analysis Engine"]
    AN["Schema analyzer"]
    PA["Workbook parser"]
    RU["Rule engine"]
    EX["Workbook exporter"]
  end
  CFG["Config &amp; aliases"]
  OUT["Review workbook"]

  L --> WS
  WS -->|"serves"| UI
  UI -->|"HTTP JSON"| RT
  IN -->|"upload"| RT
  RT --> AN
  AN --> PA
  AN --> RU
  CFG -->|"site rules"| AN
  AN --> ST
  RT --> EX
  ST --> EX
  EX -->|"download"| OUT
`,
  },

  "LPMC Scheduler": {
    summary:
      "A Vite/React 19 SPA calls an Express 5 REST API that Vercel runs as a serverless function; routes authenticate admins via signed cookies, parse uploaded Excel schedules with xlsx, and persist metadata and PTO to Neon Postgres and workbooks to Vercel Blob, with a local JSON/file fallback.",
    diagram: `
flowchart TD
  subgraph CL["Browser"]
    UI["React 19 SPA"]
  end
  subgraph VC["Vercel"]
    ST["Static build"]
    FN["Serverless function"]
  end
  subgraph API["Express API"]
    RT["Express 5 routes"]
    AU["Cookie session auth"]
    PR["Excel parser"]
    SO["Storage adapter"]
  end
  subgraph DT["Storage"]
    PG[("Neon Postgres")]
    BL[("Vercel Blob")]
    LO[("Local JSON fallback")]
  end
  UI -->|"loads"| ST
  UI -->|"HTTP /api"| FN
  FN --> RT
  RT --> AU
  RT -->|"parse Excel"| PR
  RT --> SO
  RT <-->|"uploads"| BL
  SO <-->|"SQL"| PG
  SO -.->|"no DB env"| LO
`,
  },

  "Engine Map Filter Application": {
    summary:
      "Single-file Windows Tkinter app where drag-dropped Engine Map ZIPs or folders are scanned for map IDs, then a background worker zips, filters them to the chosen Maps and RadioMaps, and splits output over 200MB for manual Fieldwire upload; ships as a PyInstaller-built EngineMapFilter.exe.",
    diagram: `
flowchart TD
  SRC["Map ZIP or folder"]
  subgraph UI["Tkinter GUI"]
    DND["Drag-drop intake"]
    SCAN["Scan map IDs"]
    IDS["Map ID selection"]
    QUEUE["Queue &amp; log"]
    PREV["Pillow map collage"]
  end
  subgraph WORK["Background worker"]
    W["Worker thread"]
    ZC["Folder to ZIP"]
    FILT["Maps &amp; RadioMaps filter"]
    SPLIT["200MB split &amp; join"]
  end
  OUT["Filtered ZIP parts"]
  FW["Fieldwire upload"]
  PKG["PyInstaller exe"]

  SRC --> DND
  DND -->|"on add"| SCAN
  SCAN -->|"detected IDs"| IDS
  IDS -->|"keep list"| W
  QUEUE --> W
  W --> ZC
  ZC --> FILT
  W --> FILT
  FILT --> SPLIT
  SPLIT --> OUT
  W --> SPLIT
  OUT -->|"status"| QUEUE
  QUEUE -->|"preview"| PREV
  OUT -->|"manual upload"| FW
  PKG -->|"launches"| DND
`,
  },

  "Project Milestone Tracker": {
    summary:
      "Vercel serves a React/Vite SPA whose auth context gates role-based views and drives a Supabase data layer: Supabase Auth for sessions, row-level-secured Postgres for milestone data, and Deno edge functions for service-role admin user ops plus Resend password-recovery email.",
    diagram: `
flowchart TD
  subgraph CLIENT["Browser SPA"]
    V["Vercel static host"]
    UI["React Vite SPA"]
    RT["React Router views"]
    AC["Auth + role context"]
    DL["Supabase data layer"]
  end
  subgraph SB["Supabase"]
    AU["Supabase Auth"]
    PG[("Postgres + RLS")]
    EF["Deno edge functions"]
  end
  RS["Resend email API"]

  V -->|"serves"| UI
  UI --> RT
  RT --> AC
  AC --> DL
  AC <-->|"session"| AU
  DL <-->|"RLS queries"| PG
  DL -->|"invoke"| EF
  EF -->|"admin ops"| AU
  EF --> PG
  EF -->|"reset email"| RS
`,
  },

  "Jocelynne's Boots Invoice System": {
    summary:
      "Next.js 16 App Router pages served on Vercel behind a mock login render invoices, clients and products from an in-memory store that data.ts mutates and mock-data seeds, with shadcn/Base UI on Tailwind v4 and an EN/ES language provider that persists the choice to localStorage.",
    diagram: `
flowchart TD
  U["Browser"]
  HOST["Vercel"]

  subgraph APP["Next.js App Router"]
    LOGIN["Login page"]
    LAYOUT["Dashboard layout"]
    PAGES["Route pages"]
    UI["shadcn &amp; Tailwind"]
    I18N["i18n provider"]
    LS["localStorage"]
  end

  subgraph DATA["Data layer"]
    CRUD["CRUD &amp; stats"]
    STORE[("In-memory store")]
    SEED["Mock data seed"]
  end

  U -->|"HTTPS"| HOST
  HOST -->|"serves"| LOGIN
  HOST -->|"serves"| LAYOUT
  LOGIN -->|"mock auth"| LAYOUT
  LAYOUT --> PAGES
  PAGES --> UI
  PAGES --> I18N
  I18N -->|"persists"| LS
  PAGES -->|"read / mutate"| CRUD
  CRUD <-->|"reads + writes"| STORE
  SEED -->|"hydrates"| STORE
`,
  },

  "Aeroscout Log Filtering App": {
    summary:
      "A packaged Python/Tkinter desktop app parses dropped MobileView log files with regex, groups entries into configurable time windows, and exports Excel or CSV; a second window builds MobileView SQL Server query templates from a runtime-loaded alias config and copies them to the clipboard.",
    diagram: `
flowchart TD
  subgraph SRC["Inputs"]
    LOG["MobileView logs"]
    CFG["Alias config"]
  end
  subgraph APP["Desktop app"]
    MAIN["Main window"]
    PARSE["Regex log parser"]
    GROUP["Filter &amp; grouping"]
    EXPORT["Excel &amp; CSV export"]
    QG["Query generator"]
    ALIAS["Alias resolver"]
    SQLGEN["SQL template builder"]
  end
  subgraph OUT["Outputs"]
    FILES["Export folder"]
    CLIP["Clipboard"]
    DB[("MobileView SQL Server")]
  end
  PKG["PyInstaller build"]
  LOG -->|"drag and drop"| MAIN
  MAIN --> PARSE
  PARSE --> GROUP
  GROUP --> EXPORT
  EXPORT --> FILES
  MAIN -->|"opens"| QG
  QG --> SQLGEN
  CFG -->|"at runtime"| ALIAS
  ALIAS --> SQLGEN
  SQLGEN -->|"copy"| CLIP
  CLIP -.->|"user runs"| DB
  PKG -.->|"packages"| MAIN
`,
  },

  "Inventory Management System": {
    summary:
      "A jQuery dashboard posts stock actions over AJAX to PHP request handlers that authenticate the session, apply stock and reorder logic, and read and write the SQL database through prepared statements, returning JSON rows the table re-renders from.",
    diagram: `
flowchart TD
  subgraph CL["Browser"]
    UI["Inventory dashboard"]
    JQ["jQuery AJAX"]
  end
  subgraph SV["PHP server"]
    ROUTE["Request handlers"]
    AUTH["Session auth"]
    LOGIC["Stock logic"]
    QUERY["Prepared SQL"]
  end
  subgraph DB["SQL database"]
    ITEMS[("Items &amp; stock")]
    TXN[("Movement log")]
    USERS[("Users")]
  end
  REPORT["Low-stock reports"]
  UI --> JQ
  JQ -->|"HTTP"| ROUTE
  ROUTE --> AUTH
  AUTH <-->|"verify"| USERS
  AUTH --> LOGIC
  LOGIC --> QUERY
  QUERY <-->|"SQL"| ITEMS
  QUERY --> TXN
  LOGIC -->|"threshold"| REPORT
  QUERY -->|"JSON rows"| JQ
  JQ -->|"re-render"| UI
`,
  },

  "Particle Simulator": {
    summary:
      "A Django view generates 100 random element particles, resolving atomic mass through a periodicElement module that scrapes ptable.com with headless Selenium, then renders them as a Three.js WebGL canvas loaded from a CDN, with SQLite backing only Django's built-in admin and auth.",
    diagram: `
flowchart TD
    subgraph FE["Frontend"]
        UI["Three.js canvas"]
        CDN["Three.js CDN"]
    end
    subgraph BE["Django"]
        URL["URL router"]
        VIEW["Particle view"]
        GEN["Particle generator"]
        ADMIN["Django admin"]
    end
    subgraph SC["Scraper"]
        PE["periodicElement"]
        SEL["Selenium &amp; BS4"]
    end
    EXT["ptable.com"]
    DB[("SQLite")]

    UI <-->|"loads library"| CDN
    UI -->|"HTTP GET"| URL
    URL --> VIEW
    URL --> ADMIN
    VIEW --> GEN
    GEN -->|"atomic mass"| PE
    PE --> SEL
    SEL <-->|"scrapes DOM"| EXT
    VIEW -->|"HTML + JSON"| UI
    ADMIN <-->|"ORM"| DB`,
  },

  "Sias' Salt E-Commerce": {
    summary:
      "Vercel serves one static page whose Three.js crystal scene and scroll-scrubbed 120-frame canvas run in-browser; cart and form writes hit a localStorage layer that mirrors them to Supabase Postgres, while Stripe.js redirects to Stripe Checkout for payment.",
    diagram: `
flowchart TD
    V["Vercel static"]
    subgraph App["Browser SPA"]
        UI["Page sections"]
        T3["Three.js crystals"]
        SEQ["Scroll frame canvas"]
        LS[("localStorage")]
    end
    subgraph Int["Client Integrations"]
        SB["SupabaseSync"]
        SC["Stripe.js"]
    end
    subgraph Ext["External Services"]
        SUPA[("Supabase Postgres")]
        STR["Stripe Checkout"]
        CDN["CDNs"]
    end
    V -->|"serves assets"| UI
    UI --> T3
    UI --> SEQ
    UI -->|"cart &amp; forms"| LS
    LS -->|"mirrors writes"| SB
    UI -->|"checkout"| SC
    SB <-->|"reads + writes"| SUPA
    SC -->|"redirect"| STR
    UI <-.->|"loads libs"| CDN
`,
  },
};
