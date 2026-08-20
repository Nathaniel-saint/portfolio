import { useState } from "react";
import {
  PROFILE,
  PROJECTS,
  SKILL_GROUPS,
  PHILOSOPHY,
  ROADMAP,
  CERTS,
  type ProjectCategory,
} from "../data";
import {
  ExternalLink,
  MapPin,
  GraduationCap,
  Briefcase,
  Shield,
  Server,
  Cpu,
  Code2,
  Database,
  Terminal as TermIcon,
  Layers,
  Wrench,
  BookOpen,
  Target,
} from "lucide-react";

const Github = ({
  size = 14,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.8 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.9C23.5 5.6 18.4.5 12 .5z" />
  </svg>
);

const groupIcons: Record<string, React.ReactNode> = {
  Backend: <Server size={14} />,
  "Languages & Secondary": <Code2 size={14} />,
  Frontend: <Layers size={14} />,
  Data: <Database size={14} />,
  "Systems & DevOps": <TermIcon size={14} />,
  "Security Awareness": <Shield size={14} />,
  "Linux & Systems": <Cpu size={14} />,
  "Low-Level Security": <Shield size={14} />,
};

const cardCls = "rounded-lg border t-border t-bg-1 p-4";
const cardXlCls = "rounded-xl border t-border t-bg-1 p-5";
const sectionLabelCls =
  "font-mono text-[11px] uppercase tracking-wider t-accent";

// =================== ABOUT ===================
export function AboutApp() {
  return (
    <div className="p-7 transition-theme">
      <div className="flex items-start gap-5">
        <img
          src="/profile_pic.jpg"
          alt={PROFILE.name}
          className="h-20 w-20 shrink-0 rounded-full object-cover object-center"
        />
        <div className="flex-1">
          <div className={sectionLabelCls}>About</div>
          <h2 className="mt-1 text-[22px] font-semibold t-text">
            {PROFILE.name}
          </h2>
          <p className="text-[14px] t-text-dim">
            {PROFILE.role} · {PROFILE.subtitle}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-[12px] t-text-dim">
            <span className="flex items-center gap-1.5">
              <MapPin size={12} /> {PROFILE.location}
            </span>
            <span className="flex items-center gap-1.5">
              <GraduationCap size={12} /> {PROFILE.education}
            </span>
            <span className="flex items-center gap-1.5 rounded-full t-green-bg px-2 py-0.5 t-green">
              <span
                className="pulse-dot inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--green)" }}
              />
              {PROFILE.status}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className={cardCls}>
          <h3 className="mb-2 flex items-center gap-2 text-[14px] font-semibold t-text">
            <BookOpen size={14} className="t-accent" /> What I'm focused on
          </h3>
          <p className="text-[13.5px] leading-relaxed t-text-dim">
            I'm an Information Technology student focused on becoming a strong
            software engineer. My current work centers on backend development,
            APIs, databases and practical software engineering with{" "}
            <span className="t-text">
              Python, Django, C#/.NET, React, SQL, Linux and Docker
            </span>
            .
          </p>
        </div>

        <div className={cardCls}>
          <h3 className="mb-2 flex items-center gap-2 text-[14px] font-semibold t-text">
            <Layers size={14} className="t-mauve" /> The longer arc
          </h3>
          <p className="text-[13.5px] leading-relaxed t-text-dim">
            Alongside software engineering, I have a growing systems foundation
            in Linux, Bash, Docker, networking and CI workflows. My long-term
            technical passion is low-level security — understanding operating
            systems, memory, binaries and how software works beneath the
            abstraction layer.
          </p>
        </div>
      </div>

      <div className={`mt-4 ${cardCls}`}>
        <h3 className="mb-3 flex items-center gap-2 text-[14px] font-semibold t-text">
          <Target size={14} className="t-yellow" /> Five qualities I bring
        </h3>
        <div className="grid grid-cols-1 gap-3 text-[13.5px] t-text-dim md:grid-cols-2">
          <div>
            <span className="font-medium t-text">Engineer</span> — likes
            building real software.
          </div>
          <div>
            <span className="font-medium t-text">Curious</span> — wants to know
            how things actually work.
          </div>
          <div>
            <span className="font-medium t-text">Systems-minded</span> — sees
            beyond app code into Linux, networking and OS.
          </div>
          <div>
            <span className="font-medium t-text">Security-conscious</span> —
            thinks about auth, validation and failure modes.
          </div>
          <div className="md:col-span-2">
            <span className="font-medium t-text">Long-term learner</span> —
            understands excellence takes years and is deliberately building
            fundamentals.
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md border t-border-strong t-bg-2 px-3.5 py-2 text-[12.5px] t-text transition-theme hover:t-accent-border"
          onMouseEnter={(e) => (
            (e.currentTarget.style.borderColor = "var(--accent-border)"),
            (e.currentTarget.style.color = "var(--accent)")
          )}
          onMouseLeave={(e) => (
            (e.currentTarget.style.borderColor = "var(--border-strong)"),
            (e.currentTarget.style.color = "var(--text)")
          )}
        >
          <Github size={13} /> GitHub
        </a>
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md border t-border-strong t-bg-2 px-3.5 py-2 text-[12.5px] t-text transition-theme"
          onMouseEnter={(e) => (
            (e.currentTarget.style.borderColor = "var(--blue)"),
            (e.currentTarget.style.color = "var(--blue)")
          )}
          onMouseLeave={(e) => (
            (e.currentTarget.style.borderColor = "var(--border-strong)"),
            (e.currentTarget.style.color = "var(--text)")
          )}
        >
          <ExternalLink size={13} /> LinkedIn
        </a>
      </div>
    </div>
  );
}

// =================== EXPERIENCE ===================
export function ExperienceApp() {
  return (
    <div className="p-7 transition-theme">
      <div className={sectionLabelCls}>Professional Experience</div>
      <h2 className="mt-1 text-[22px] font-semibold t-text">
        Where I've worked
      </h2>
      <p className="mt-1 text-[14px] t-text-dim">
        Building real software, learning production engineering, contributing to
        teams.
      </p>

      <div className="mt-6 space-y-3">
        <div
          className="rounded-xl border p-5 transition-theme"
          style={{
            borderColor: "var(--accent-border)",
            background: "var(--bg-1)",
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-[15px] font-semibold t-text">
                <Briefcase size={15} className="t-accent" />
                Software Engineering Intern
              </div>
              <div className="text-[12.5px] t-text-dim">
                Adroit 360 · Industry placement
              </div>
            </div>
            <span
              className="rounded-full px-2.5 py-0.5 font-mono text-[10.5px] t-accent"
              style={{ background: "var(--accent-soft)" }}
            >
              CURRENT · INTERNSHIP
            </span>
          </div>
          <p className="mt-3 text-[13.5px] leading-relaxed t-text">
            Nathaniel gained practical software engineering experience in an
            industry environment at{" "}
            <span className="font-medium t-accent">Adroit 360</span>,
            complementing his academic studies and personal engineering
            projects.
          </p>
          <p className="mt-2 text-[12.5px] leading-relaxed t-text-dim">
            <em>
              Specific responsibilities, technologies and projects at Adroit 360
              will be expanded here once those details are confirmed. The
              portfolio will be updated rather than the experience being left
              generic.
            </em>
          </p>
        </div>

        <div className={cardXlCls}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-[15px] font-semibold t-text">
                <Code2 size={15} className="t-blue" />
                Independent Engineering Projects
              </div>
              <div className="text-[12.5px] t-text-dim">
                Self-directed · Open source
              </div>
            </div>
            <span
              className="rounded-full px-2.5 py-0.5 font-mono text-[10.5px] t-blue"
              style={{ background: "rgba(98, 160, 234, 0.15)" }}
            >
              ONGOING
            </span>
          </div>
          <p className="mt-3 text-[13.5px] leading-relaxed t-text-dim">
            Selected full-stack, backend, systems and security-leaning projects
            built on personal time. See the{" "}
            <span className="font-medium t-accent">Engineering Projects</span>{" "}
            window for the curated set.
          </p>
        </div>
      </div>

      <h3 className="mt-8 text-[14px] font-semibold t-text">Career Story</h3>
      <div
        className="mt-3 rounded-lg border t-border p-4 font-mono text-[12.5px] leading-relaxed"
        style={{ background: "var(--bg-2)" }}
      >
        <div className="t-text">Information Technology Student</div>
        <div className="t-accent">↓</div>
        <div className="t-text">Software Engineering Intern — Adroit 360</div>
        <div className="t-accent">↓</div>
        <div className="t-text">Backend / Software Engineering Projects</div>
        <div className="t-accent">↓</div>
        <div className="t-text">Systems & Linux Foundations</div>
        <div className="t-accent">↓</div>
        <div className="t-text">Low-Level Security Passion</div>
      </div>
    </div>
  );
}

// =================== PROJECTS ===================
const CATS: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "engineering", label: "Engineering" },
  { id: "backend", label: "Backend" },
  { id: "systems", label: "Systems" },
  { id: "security", label: "Security" },
];

export function ProjectsApp() {
  const [cat, setCat] = useState<ProjectCategory>("all");
  const filtered =
    cat === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === cat);

  return (
    <div className="p-7 transition-theme">
      <div className={sectionLabelCls}>Engineering Projects</div>
      <h2 className="mt-1 text-[22px] font-semibold t-text">Selected Work</h2>
      <p className="mt-1 text-[14px] t-text-dim">
        Curated full-stack, backend, systems and security-leaning work. Not
        every GitHub repository is featured; this is the quality over quantity
        set.
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {CATS.map((c) => {
          const active = cat === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className="rounded-full border px-3 py-1 text-[12px] font-medium transition-theme"
              style={
                active
                  ? {
                      borderColor: "var(--accent)",
                      background: "var(--accent-soft)",
                      color: "var(--accent)",
                    }
                  : {
                      borderColor: "var(--border-strong)",
                      background: "var(--bg-2)",
                      color: "var(--text-dim)",
                    }
              }
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="rounded-xl border t-border p-4 transition-theme"
            style={{ background: "var(--bg-1)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "var(--accent-border)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "var(--border)")
            }
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-[14.5px] font-semibold t-text">
                  {p.name}
                </div>
                <div className="text-[12px] t-text-dim">{p.tagline}</div>
              </div>
              <span
                className="rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide t-accent"
                style={{ background: "var(--accent-soft)" }}
              >
                {p.category}
              </span>
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed t-text-dim">
              {p.description}
            </p>
            <ul className="mt-2 space-y-1 text-[12.5px] t-text">
              {p.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2">
                  <span
                    className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-1">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded border t-border-strong px-2 py-0.5 font-mono text-[10.5px] t-text-dim"
                  style={{ background: "var(--bg-2)" }}
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between border-t pt-3 t-border">
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[12px] font-medium t-accent hover:underline"
              >
                <Github size={11} /> View on GitHub →
              </a>
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[12px] font-medium t-blue hover:underline"
                >
                  <ExternalLink size={11} /> Live demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =================== SKILLS ===================
export function SkillsApp() {
  return (
    <div className="p-7 transition-theme">
      <div className={sectionLabelCls}>Technical Stack</div>
      <h2 className="mt-1 text-[22px] font-semibold t-text">Skills & Tools</h2>
      <p className="mt-1 text-[14px] t-text-dim">
        Organized by what I use day-to-day versus what I'm growing into.
      </p>

      <div className="mt-5 space-y-3">
        {SKILL_GROUPS.map((g) => (
          <div key={g.title} className={cardCls}>
            <div className="flex items-center gap-2 text-[14px] font-semibold t-text">
              <span className="t-accent">
                {groupIcons[g.title] ?? <Wrench size={14} />}
              </span>
              {g.title}
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {g.items.map((i) => (
                <span
                  key={i}
                  className="rounded-md border t-border-strong px-2.5 py-0.5 font-mono text-[11.5px] t-text"
                  style={{ background: "var(--bg-2)" }}
                >
                  {i}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =================== PHILOSOPHY ===================
export function PhilosophyApp() {
  return (
    <div className="p-7 transition-theme">
      <div className={sectionLabelCls}>Engineering Philosophy</div>
      <h2 className="mt-1 text-[22px] font-semibold t-text">How I work</h2>
      <div
        className="mt-3 rounded-lg border p-4"
        style={{
          borderColor: "var(--accent-border)",
          background: "var(--accent-soft)",
        }}
      >
        <p className="text-[15px] font-medium t-text">
          "Build it. Understand it. Break it. Secure it. Improve it."
        </p>
      </div>
      <div className="mt-5 space-y-3">
        {PHILOSOPHY.map((p, i) => (
          <div key={p.key} className={`flex items-start gap-3 ${cardCls}`}>
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[13px] font-semibold t-accent"
              style={{ background: "var(--accent-soft)" }}
            >
              {i + 1}
            </div>
            <div>
              <div className="text-[14px] font-semibold t-text">{p.key}</div>
              <div className="text-[13px] t-text-dim">{p.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =================== SYSTEMS ===================
export function SystemsApp() {
  return (
    <div className="p-7 transition-theme">
      <div className={sectionLabelCls}>Systems & Linux</div>
      <h2 className="mt-1 text-[22px] font-semibold t-text">
        Linux & Systems Foundation
      </h2>
      <p className="mt-1 text-[14px] t-text-dim">
        The foundation beneath application code. Comfortable in the shell,
        learning the OS from the inside out.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
        {[
          { name: "Ubuntu", desc: "Daily driver for development" },
          { name: "Kali Linux", desc: "Security-leaning exploration" },
          { name: "Bash", desc: "Shell scripting & automation" },
          { name: "Git", desc: "Version control, branching, history" },
          { name: "GitHub Actions", desc: "CI workflows" },
          { name: "Docker", desc: "Containerization fundamentals" },
          { name: "Networking", desc: "IPv4, VLSM, fundamentals" },
        ].map((s) => (
          <div
            key={s.name}
            className="rounded-lg border t-border p-3"
            style={{ background: "var(--bg-1)" }}
          >
            <div className="text-[13.5px] font-semibold t-text">{s.name}</div>
            <div className="text-[11.5px] t-text-dim">{s.desc}</div>
          </div>
        ))}
      </div>

      <div className={`mt-6 ${cardCls}`}>
        <h3 className="flex items-center gap-2 text-[14px] font-semibold t-text">
          <Cpu size={14} className="t-accent" /> Linux Luminarium — pwn.college
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed t-text-dim">
          Completed hands-on Linux-focused security training through{" "}
          <span className="font-medium t-accent">pwn.college</span> — filesystem
          operations, permissions, processes, shell environments, command-line
          problem solving and Linux system interaction. A hands-on foundation,
          not a claim of expertise.
        </p>
      </div>
    </div>
  );
}

// =================== SECURITY ===================
export function SecurityApp() {
  return (
    <div className="p-7 transition-theme">
      <div className={sectionLabelCls}>Long-term Passion</div>
      <h2 className="mt-1 text-[22px] font-semibold t-text">
        Beyond the Abstraction Layer
      </h2>
      <p className="mt-3 text-[13.5px] leading-relaxed t-text-dim">
        Software engineering is my career path. Understanding what happens
        underneath software is my obsession.
      </p>
      <p className="mt-2 text-[13.5px] leading-relaxed t-text-dim">
        I'm gradually exploring the lower layers of computing — Linux internals,
        memory, operating systems, computer architecture, assembly, reverse
        engineering and vulnerability research.
      </p>
      <p className="mt-2 text-[13.5px] leading-relaxed t-text-dim">
        This is a long-term specialization, not something I'm pretending to have
        mastered today. I'm building the foundations first: programming,
        computer science, Linux and systems knowledge.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-3">
        {[
          "Linux internals",
          "Memory & C",
          "Operating systems",
          "Computer architecture",
          "Assembly",
          "Reverse engineering",
          "Binary analysis",
          "Binary exploitation",
          "Vulnerability research",
        ].map((s) => (
          <div
            key={s}
            className="rounded-md border t-border px-3 py-2 text-center text-[12px] font-medium t-text"
            style={{ background: "var(--bg-1)" }}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

// =================== ROADMAP ===================
export function RoadmapApp() {
  return (
    <div className="p-7 transition-theme">
      <div className={sectionLabelCls}>Learning Roadmap</div>
      <h2 className="mt-1 text-[22px] font-semibold t-text">
        Long-term Learning Direction
      </h2>
      <p className="mt-1 text-[14px] t-text-dim">
        A coherent development plan — not a list of buzzwords.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
        {ROADMAP.map((r, i) => (
          <div key={r.phase} className={cardCls}>
            <div className="flex items-center justify-between">
              <span
                className="rounded-full px-2.5 py-0.5 font-mono text-[10.5px] font-semibold uppercase tracking-wider t-accent"
                style={{ background: "var(--accent-soft)" }}
              >
                {r.phase}
              </span>
              <span className="font-mono text-[10.5px] t-text-faint">
                step {i + 1}
              </span>
            </div>
            <div className="mt-2 text-[14px] font-semibold t-text">
              {r.title}
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {r.items.map((it) => (
                <span
                  key={it}
                  className="rounded-md border t-border-strong px-2 py-0.5 font-mono text-[11px] t-text-dim"
                  style={{ background: "var(--bg-2)" }}
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =================== EDUCATION ===================
export function EducationApp() {
  return (
    <div className="p-7 transition-theme">
      <div className={sectionLabelCls}>Education & Training</div>
      <h2 className="mt-1 text-[22px] font-semibold t-text">Where I studied</h2>

      <div className={`mt-5 ${cardXlCls}`}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-[15px] font-semibold t-text">
              <GraduationCap size={15} className="t-accent" />
              Palm University College
            </div>
            <div className="text-[12.5px] t-text-dim">
              Bachelor of Science — Information Technology
            </div>
          </div>
          <span
            className="rounded-full px-2.5 py-0.5 font-mono text-[10.5px] t-accent"
            style={{ background: "var(--accent-soft)" }}
          >
            JUNIOR · CURRENT
          </span>
        </div>
        <p className="mt-3 text-[13px] leading-relaxed t-text-dim">
          Relevant areas of study include programming, software development,
          databases, networking, systems, cybersecurity and information
          technology.
        </p>
      </div>

      <h3 className="mt-7 text-[14px] font-semibold t-text">
        Certifications & Training
      </h3>
      <div className="mt-3 space-y-2">
        {CERTS.map((c) => (
          <div
            key={`${c.org}-${c.name}`}
            className="flex items-center justify-between rounded-lg border t-border px-4 py-3"
            style={{ background: "var(--bg-1)" }}
          >
            <div>
              <div className="text-[13.5px] font-medium t-text">{c.name}</div>
              <div className="text-[11.5px] t-text-dim">{c.org}</div>
            </div>
            <Shield size={14} className="t-accent" />
          </div>
        ))}
      </div>
    </div>
  );
}

// =================== GOALS ===================
export function GoalsApp() {
  return (
    <div className="p-7 transition-theme">
      <div className={sectionLabelCls}>Career Goals</div>
      <h2 className="mt-1 text-[22px] font-semibold t-text">
        What I'm looking for
      </h2>
      <p className="mt-3 text-[13.5px] leading-relaxed t-text">
        I'm currently looking for opportunities to grow as a software engineer —
        particularly{" "}
        <span className="font-medium t-accent">
          junior software engineering, backend engineering, and software
          engineering internship
        </span>{" "}
        roles.
      </p>
      <p className="mt-2 text-[13.5px] leading-relaxed t-text-dim">
        My immediate goal is to contribute to real-world software, learn from
        experienced engineers, understand production systems and develop strong
        engineering habits.
      </p>
      <p className="mt-2 text-[13.5px] leading-relaxed t-text-dim">
        Long term, I want to combine strong software engineering fundamentals
        with my passion for systems and low-level security.
      </p>

      <div
        className="mt-6 rounded-lg border p-4"
        style={{
          borderColor: "var(--accent-border)",
          background: "var(--accent-soft)",
        }}
      >
        <div className="font-mono text-[10.5px] uppercase tracking-wider t-accent">
          Ideal Role
        </div>
        <div className="mt-2 text-[13.5px] font-medium t-text">
          Junior Software Engineer · Backend Engineer · Software Engineering
          Intern · Graduate Software Engineer
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className={cardCls}>
          <div className="text-[14px] font-semibold t-text">Immediate</div>
          <p className="mt-1 text-[13px] t-text-dim">
            Real-world production engineering. Mentorship. Habits that scale.
          </p>
        </div>
        <div className={cardCls}>
          <div className="text-[14px] font-semibold t-text">Long-term</div>
          <p className="mt-1 text-[13px] t-text-dim">
            Software engineering fundamentals combined with systems and
            low-level security.
          </p>
        </div>
      </div>
    </div>
  );
}

// =================== GITHUB ===================
export function GithubApp() {
  return (
    <div className="p-7 transition-theme">
      <div className={sectionLabelCls}>GitHub</div>
      <h2 className="mt-1 text-[22px] font-semibold t-text">
        More experiments, more code
      </h2>
      <p className="mt-2 text-[13.5px] leading-relaxed t-text-dim">
        My GitHub contains projects, experiments, learning exercises and ongoing
        technical work. Not everything is production-ready — some repositories
        document the process of learning a technology from first principles.
      </p>
      <a
        href={PROFILE.github}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-md border px-4 py-2 text-[13px] font-medium t-accent transition-theme"
        style={{
          borderColor: "var(--accent)",
          background: "var(--accent-soft)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.filter = "brightness(1.08)")
        }
        onMouseLeave={(e) => (e.currentTarget.style.filter = "")}
      >
        <Github size={13} /> Explore GitHub →
      </a>

      <div className="mt-6 space-y-2">
        {[
          {
            name: "Domain-Guard",
            desc: "Full-stack Django + React",
            lang: "Python",
          },
          {
            name: "med-ocr",
            desc: "OCR-based pharmaceutical app",
            lang: "JavaScript",
          },
          {
            name: "password-vault",
            desc: "Auth-focused exploration",
            lang: "Python",
          },
          { name: "pHarMa", desc: "OCR / Supabase", lang: "JavaScript" },
          { name: "Moorhead", desc: "C# / .NET inventory CLI", lang: "C#" },
          {
            name: "Weatherapp",
            desc: "Async weather frontend",
            lang: "JavaScript",
          },
          { name: "Hello-Nat", desc: "HTML/CSS + Docker", lang: "HTML" },
          {
            name: "first-docker-image",
            desc: "Dockerized todo",
            lang: "JavaScript",
          },
          {
            name: "Django-first-crud",
            desc: "Django CRUD exploration",
            lang: "Python",
          },
          {
            name: "linux-luminarium",
            desc: "pwn.college exercises",
            lang: "Shell",
          },
          { name: "flow-3.0", desc: "JavaScript project", lang: "JavaScript" },
          { name: "portfolio", desc: "This site", lang: "HTML" },
        ].map((r) => (
          <a
            key={r.name}
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-md border t-border px-3 py-2 transition-theme"
            style={{ background: "var(--bg-1)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "var(--accent-border)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "var(--border)")
            }
          >
            <div>
              <div className="font-mono text-[13px] font-medium t-text">
                {r.name}
              </div>
              <div className="text-[11.5px] t-text-dim">{r.desc}</div>
            </div>
            <span
              className="rounded border t-border-strong px-2 py-0.5 font-mono text-[10.5px] t-text-dim"
              style={{ background: "var(--bg-2)" }}
            >
              {r.lang}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

// =================== CONTACT ===================
export function ContactApp() {
  return (
    <div className="p-7 transition-theme">
      <div className={sectionLabelCls}>Contact</div>
      <h2 className="mt-1 text-[22px] font-semibold t-text">
        Have a problem worth building?
      </h2>
      <p className="mt-3 text-[13.5px] leading-relaxed t-text-dim">
        I'm currently open to software engineering internships, junior
        engineering opportunities, and collaborations that help me grow through
        real-world engineering.
      </p>

      <div className="mt-6 space-y-2">
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-lg border t-border px-4 py-3 transition-theme"
          style={{ background: "var(--bg-1)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.borderColor = "var(--accent-border)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderColor = "var(--border)")
          }
        >
          <div>
            <div className="text-[11.5px] t-text-dim">GitHub</div>
            <div className="font-mono text-[13.5px] t-text">
              github.com/Nathaniel-saint
            </div>
          </div>
          <Github size={16} className="t-accent" />
        </a>
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-lg border t-border px-4 py-3 transition-theme"
          style={{ background: "var(--bg-1)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.borderColor = "var(--blue)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderColor = "var(--border)")
          }
        >
          <div>
            <div className="text-[11.5px] t-text-dim">LinkedIn</div>
            <div className="font-mono text-[13.5px] t-text">
              nathaniel-addae-marfo
            </div>
          </div>
          <ExternalLink size={16} className="t-blue" />
        </a>
      </div>

      <p className="mt-6 text-[11.5px] t-text-faint">
        For direct email, please reach out via LinkedIn.
      </p>
    </div>
  );
}

// =================== FILES ===================
export function FilesApp({
  onOpen,
}: {
  onOpen: (id: any, title: string) => void;
}) {
  const items: {
    name: string;
    type: "folder" | "file";
    size?: string;
    app: any;
    title: string;
    emoji: string;
  }[] = [
    {
      name: "About",
      type: "file",
      size: "1.2K",
      app: "about",
      title: "about.txt",
      emoji: "📄",
    },
    {
      name: "Experience",
      type: "folder",
      app: "experience",
      title: "Professional Experience",
      emoji: "💼",
    },
    {
      name: "Projects",
      type: "folder",
      app: "projects",
      title: "Selected Engineering Projects",
      emoji: "📁",
    },
    {
      name: "Stack",
      type: "file",
      size: "0.8K",
      app: "skills",
      title: "Technical Stack",
      emoji: "🛠️",
    },
    {
      name: "Philosophy",
      type: "file",
      size: "0.6K",
      app: "philosophy",
      title: "Engineering Philosophy",
      emoji: "📜",
    },
    {
      name: "Systems",
      type: "folder",
      app: "systems",
      title: "Systems & Linux",
      emoji: "🖥️",
    },
    {
      name: "Low-Level",
      type: "folder",
      app: "security",
      title: "Beyond the Abstraction Layer",
      emoji: "🔒",
    },
    {
      name: "Roadmap",
      type: "file",
      size: "0.5K",
      app: "roadmap",
      title: "Learning Roadmap",
      emoji: "🗺️",
    },
    {
      name: "Education",
      type: "folder",
      app: "education",
      title: "Education & Training",
      emoji: "🎓",
    },
    {
      name: "Goals",
      type: "file",
      size: "0.4K",
      app: "goals",
      title: "Career Goals",
      emoji: "🎯",
    },
    {
      name: "GitHub",
      type: "file",
      size: "2.1K",
      app: "github",
      title: "GitHub Repositories",
      emoji: "🔗",
    },
    {
      name: "Contact",
      type: "file",
      size: "0.3K",
      app: "contact",
      title: "Contact",
      emoji: "✉️",
    },
    {
      name: "Terminal",
      type: "file",
      size: "—",
      app: "terminal",
      title: "Terminal",
      emoji: "⌨️",
    },
  ];

  return (
    <div className="flex h-full flex-col transition-theme">
      <div
        className="flex items-center gap-2 border-b px-4 py-2 text-[12px] t-text-dim"
        style={{ background: "var(--bg-2)", borderColor: "var(--border)" }}
      >
        <span className="font-mono">/home/nathaniel/portfolio</span>
        <span className="ml-auto font-mono text-[11px] t-text-faint">
          {items.length} items
        </span>
      </div>
      <div className="flex-1 overflow-auto gui-scroll p-4">
        <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5">
          {items.map((it) => (
            <button
              key={it.name}
              onDoubleClick={() => onOpen(it.app, it.title)}
              className="group flex flex-col items-center gap-1.5 rounded-md p-2 text-center transition-theme"
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--hover)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "")}
              title={`Open ${it.name}`}
            >
              <div className="text-3xl">{it.emoji}</div>
              <div className="line-clamp-1 max-w-[7rem] text-[12px] t-text">
                {it.name}
              </div>
              {it.size && (
                <div className="font-mono text-[10.5px] t-text-faint">
                  {it.size}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      <div
        className="border-t px-4 py-1.5 font-mono text-[10.5px] t-text-faint"
        style={{ background: "var(--bg-2)", borderColor: "var(--border)" }}
      >
        Double-click to open · 13 items · 7 folders · 6 files
      </div>
    </div>
  );
}

// =================== RESUME ===================
export function ResumeApp() {
  return (
    <div className="p-7 transition-theme">
      <div className={sectionLabelCls}>Resume</div>
      <h2 className="mt-1 text-[22px] font-semibold t-text">Career Summary</h2>
      <div
        className="mt-5 rounded-lg border t-border p-5 font-mono text-[12.5px] leading-relaxed"
        style={{ background: "var(--bg-2)" }}
      >
        <div className="t-accent">$ cat resume.txt</div>
        <pre className="mt-3 whitespace-pre-wrap t-text">
          {`─────────────────────────────────────────────────────
  NATHANIEL ADDAE MARFO
  Software Engineer in the Making · Systems Thinker
  Ghana · ${PROFILE.handle}
─────────────────────────────────────────────────────

PROFESSIONAL SUMMARY
  Information Technology student focused on
  becoming a strong software engineer. Practical
  experience in backend, APIs, databases, Linux and
  application security. Long-term passion: low-level
  systems security.

EXPERIENCE
  ▸ Software Engineering Intern — Adroit 360
    Industry placement. Engineering experience
    complementing academic studies.

EDUCATION
  ▸ Palm University College
    B.Sc. Information Technology — Junior Year

SKILLS
  Backend   : Python · Django · DRF · REST APIs
  Langs     : C# · .NET · Java · JavaScript
  Frontend  : React · JavaScript · HTML5 · CSS3
  Data      : SQL · SQLite · CSV
  Systems   : Linux · Bash · Docker · Git · CI
  Security  : Defensive programming · web vuln. basics

PROJECTS
  ▸ Domain-Guard   (Django + React)
  ▸ med-ocr        (DRF + React + OCR)
  ▸ password-vault (Django + React)
  ▸ pHarMa         (React + OCR + Supabase)
  ▸ Moorhead       (C# / .NET CLI)
  ▸ weatherapp     (JavaScript)
  ▸ vuln-scanner   (Python, educational)
  ▸ disk-monitor   (Bash, systems)

CERTIFICATIONS
  ▸ Microsoft — Foundational C#
  ▸ Educ8africa — Cybersecurity Essentials
  ▸ Educ8africa — CyberRookie 7.0
  ▸ pwn.college — Linux Luminarium

GOAL
  Get employed as a Software Engineer and turn
  foundations into real production engineering.
─────────────────────────────────────────────────────`}
        </pre>
      </div>
    </div>
  );
}
