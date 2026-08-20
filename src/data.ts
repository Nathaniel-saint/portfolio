export type AppId =
  | "about"
  | "resume"
  | "experience"
  | "projects"
  | "skills"
  | "philosophy"
  | "systems"
  | "security"
  | "roadmap"
  | "education"
  | "goals"
  | "terminal"
  | "github"
  | "contact"
  | "files";

export type ProjectCategory =
  | "all"
  | "engineering"
  | "backend"
  | "systems"
  | "security";

export interface Project {
  id: string;
  name: string;
  tagline: string;
  category: Exclude<ProjectCategory, "all">;
  stack: string[];
  description: string;
  highlights: string[];
  repo: string;
  live?: string;
  language: string; // for the language tag color
  size: string; // for the "ls -lh" feel
}

export const PROJECTS: Project[] = [
  {
    id: "domain-guard",
    name: "Domain-Guard",
    tagline: "Full-stack domain application",
    category: "engineering",
    stack: ["Python", "Django", "React", "JavaScript", "REST API", "Git"],
    description:
      "A full-stack application combining a Django backend with a React frontend. Explores API-driven communication, authentication, protected functionality, and application architecture.",
    highlights: [
      "Django REST backend with separated frontend",
      "Authentication and protected resources",
      "Iterative Git development workflow",
      "Deployed preview on Vercel",
    ],
    repo: "https://github.com/Nathaniel-saint/Domain-Guard",
    live: "https://domain-guard-delta.vercel.app",
    language: "Python",
    size: "2.4M",
  },
  {
    id: "med-ocr",
    name: "med-ocr",
    tagline: "Full-stack OCR application",
    category: "engineering",
    stack: ["Django", "DRF", "React", "Vite", "SQLite", "OCR"],
    description:
      "Pharma 2 — a full-stack pharmaceutical management application with OCR scanning, secure authentication, role-based access, scan history and analytics insights.",
    highlights: [
      "Django 6 + DRF backend with SQLite",
      "React 19 + Vite frontend with protected routes",
      "OCR-based scanning workflow",
      "Authentication, history, and analytics dashboard",
    ],
    repo: "https://github.com/Nathaniel-saint/med-ocr",
    language: "JavaScript",
    size: "5.1M",
  },
  {
    id: "password-vault",
    name: "password-vault",
    tagline: "Security-focused full-stack app",
    category: "security",
    stack: ["Django", "React", "Authentication", "Persistent data"],
    description:
      "A security-focused full-stack application exploring authentication, protected resources, access-controlled functionality and separated frontend/backend responsibilities.",
    highlights: [
      "Authentication and access control patterns",
      "Separated frontend/backend responsibilities",
      "Defensive programming focus",
      "Exploratory security learning project",
    ],
    repo: "https://github.com/Nathaniel-saint/password-vault",
    language: "Python",
    size: "0.8M",
  },
  {
    id: "pharma",
    name: "pHarMa",
    tagline: "OCR / app security concept",
    category: "engineering",
    stack: ["React", "JavaScript", "OCR", "Supabase"],
    description:
      "An application exploring pharmaceutical information workflows, OCR-based processing, authentication, scan history and analytics.",
    highlights: [
      "OCR-based pharmaceutical data workflow",
      "Authentication and scan history",
      "Analytics dashboard",
      "Persistent data via Supabase",
    ],
    repo: "https://github.com/Nathaniel-saint/pHarMa",
    language: "JavaScript",
    size: "1.2M",
  },
  {
    id: "moorhead",
    name: "Moorhead",
    tagline: "C# / .NET inventory CLI",
    category: "backend",
    stack: ["C#", ".NET", "OOP", "CSV", "Data validation"],
    description:
      "A robust console-based retail inventory system focused on data integrity, input validation, persistent storage and defensive programming.",
    highlights: [
      "Live CSV ingestion & persistent reporting",
      "Defensive programming with try-parse + do-while",
      "Case-insensitive product search",
      "Clean object-oriented architecture",
    ],
    repo: "https://github.com/Nathaniel-saint/Moorhead",
    language: "C#",
    size: "0.3M",
  },
  {
    id: "vuln-scanner",
    name: "vuln-scanner",
    tagline: "Educational Python security tool",
    category: "security",
    stack: ["Python", "Requests", "BeautifulSoup", "Web security"],
    description:
      "An educational Python security project exploring basic web vulnerability assessment — testing for reflected XSS and SQL injection against web forms.",
    highlights: [
      "Reflected XSS and SQL injection checks",
      "Form discovery and request handling",
      "Educational/learning context",
      "Responsible security exploration",
    ],
    repo: "https://github.com/Nathaniel-saint",
    language: "Python",
    size: "0.2M",
  },
  {
    id: "weatherapp",
    name: "Weatherapp",
    tagline: "Async JavaScript weather app",
    category: "engineering",
    stack: ["JavaScript", "REST APIs", "Async/Await"],
    description:
      "A real-time weather application using asynchronous API communication, data processing and a responsive frontend. Live demo available.",
    highlights: [
      "Async API communication",
      "Real-time data processing",
      "Responsive UI",
      "Deployed on GitHub Pages",
    ],
    repo: "https://github.com/Nathaniel-saint/Weatherapp",
    live: "https://nathaniel-saint.github.io/Weatherapp/",
    language: "JavaScript",
    size: "0.4M",
  },
  {
    id: "disk-monitor",
    name: "disk-monitor",
    tagline: "Linux / Bash systems utility",
    category: "systems",
    stack: ["Bash", "Linux", "Systems automation"],
    description:
      "A Bash-based systems utility exploring filesystem health monitoring, disk utilization and basic system automation — bridging Linux Luminarium concepts with real shell scripting.",
    highlights: [
      "Filesystem health and disk utilization",
      "Bash automation fundamentals",
      "Bridges Linux Luminarium training to practice",
      "Systems-oriented scripting",
    ],
    repo: "https://github.com/Nathaniel-saint",
    language: "Shell",
    size: "0.1M",
  },
];

export const PROFILE = {
  name: "Nathaniel Addae Marfo",
  handle: "@Nathaniel-saint",
  role: "Software Engineer in the Making",
  subtitle: "Systems Thinker by Nature",
  location: "Ghana",
  status: "Open to opportunities",
  education:
    "Palm University College — B.Sc. Information Technology (Junior Year)",
  email: "", // intentionally blank per brief — no fabricated email
  github: "https://github.com/Nathaniel-saint",
  linkedin: "https://www.linkedin.com/in/nathaniel-addae-marfo-24348a348",
};

export const SKILL_GROUPS = [
  {
    title: "Backend",
    icon: "server",
    items: [
      "Python",
      "Django",
      "Django REST Framework",
      "REST APIs",
      "Authentication",
      "Authorization",
      "CRUD",
      "Data validation",
    ],
  },
  {
    title: "Languages & Secondary",
    icon: "code",
    items: ["C#", ".NET", "Java", "JavaScript"],
  },
  {
    title: "Frontend",
    icon: "layout",
    items: ["React", "JavaScript", "HTML5", "CSS3"],
  },
  {
    title: "Data",
    icon: "database",
    items: [
      "SQL",
      "Relational design",
      "SQLite",
      "CSV persistence",
      "Data integrity",
    ],
  },
  {
    title: "Systems & DevOps",
    icon: "terminal",
    items: [
      "Linux (Ubuntu, Kali)",
      "Bash",
      "Git",
      "GitHub",
      "GitHub Actions",
      "CI workflows",
      "Docker",
      "Networking (IPv4 / VLSM)",
    ],
  },
  {
    title: "Security Awareness",
    icon: "shield",
    items: [
      "Defensive programming",
      "Input validation",
      "Web security fundamentals",
      "Vulnerability assessment",
      "XSS / SQLi fundamentals",
      "Linux security fundamentals",
    ],
  },
];

export const PHILOSOPHY = [
  { key: "Build", desc: "Turn ideas into working software." },
  {
    key: "Understand",
    desc: "Learn the technologies underneath the abstraction.",
  },
  { key: "Break", desc: "Test assumptions and find weaknesses." },
  { key: "Secure", desc: "Think about failure and attack surfaces." },
  { key: "Improve", desc: "Refactor, test, document, deploy better versions." },
];

export const ROADMAP = [
  {
    phase: "NOW",
    title: "Software Engineering",
    items: ["Python", "Django", "DRF", "SQL", "C# / .NET", "Testing"],
  },
  {
    phase: "NEXT",
    title: "Systems & DevOps",
    items: ["Linux", "Docker", "CI/CD", "Networking", "Deployment"],
  },
  {
    phase: "FOUNDATIONS",
    title: "Computer Science",
    items: [
      "C",
      "Memory",
      "Algorithms",
      "Data structures",
      "Computer architecture",
    ],
  },
  {
    phase: "LONG-TERM",
    title: "Low-Level Security",
    items: [
      "Assembly",
      "Operating systems",
      "Reverse engineering",
      "Binary exploitation",
      "Vulnerability research",
    ],
  },
];

export const CERTS = [
  { org: "Microsoft", name: "Foundational C# Certification" },
  { org: "Grow with Educ8africa", name: "Cybersecurity Essentials" },
  { org: "Grow with Educ8africa", name: "CyberRookie 7.0" },
  { org: "pwn.college", name: "Linux Luminarium — Completed" },
];

export const TIMELINE = [
  {
    date: "Now",
    title: "Information Technology Student",
    org: "Palm University College",
  },
  {
    date: "Building",
    title: "Selected Engineering Projects",
    org: "Domain-Guard · med-ocr · Moorhead · pHarMa",
  },
  {
    date: "Training",
    title: "pwn.college — Linux Luminarium",
    org: "Hands-on Linux foundations",
  },
  {
    date: "Foundation",
    title: "Backend & Full-Stack Development",
    org: "Django · DRF · React · C#/.NET",
  },
  {
    date: "Long-term",
    title: "Low-Level Security",
    org: "C · Memory · OS · Assembly · RE",
  },
];
