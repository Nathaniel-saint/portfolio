import {
  ArrowRight,
  ExternalLink,
  GitBranch,
  Monitor,
  Network,
} from "lucide-react";
import { PROFILE } from "../data";
import {
  AboutApp,
  ContactApp,
  EducationApp,
  ExperienceApp,
  PhilosophyApp,
  ProjectsApp,
  RoadmapApp,
  SecurityApp,
  SkillsApp,
  SystemsApp,
} from "./apps";
import type { PortfolioView } from "./ViewChooser";

interface TraditionalViewProps {
  onSwitchView: (view: PortfolioView) => void;
}

export function TraditionalView({ onSwitchView }: TraditionalViewProps) {
  return (
    <main
      className="traditional-view h-full overflow-y-auto gui-scroll"
      id="top"
    >
      <nav
        className="sticky top-0 z-20 border-b px-5 py-3 backdrop-blur-xl transition-theme sm:px-8"
        style={{
          background: "color-mix(in srgb, var(--bg-0) 90%, transparent)",
          borderColor: "var(--border)",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <a
            href="#top"
            className="flex items-center gap-2 text-[13px] font-semibold t-text"
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ background: "var(--accent)" }}
            >
              N
            </span>
            <span className="hidden sm:inline">Nathaniel Marfo</span>
          </a>
          <div className="hidden items-center gap-5 text-[12px] t-text-dim md:flex">
            {[
              ["About", "about"],
              ["Experience", "experience"],
              ["Projects", "projects"],
              ["Skills", "skills"],
              ["Systems", "systems"],
              ["Roadmap", "roadmap"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className="transition-colors hover:text-[var(--accent)]"
              >
                {label}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onSwitchView("desktop")}
            className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-[12px] font-semibold transition-theme t-border t-text"
            title="Switch to desktop view"
          >
            <Monitor size={14} /> Desktop View
          </button>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <section className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-4 text-[13px] t-text-dim">
              {PROFILE.location} · {PROFILE.status}
            </p>
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight t-text sm:text-7xl">
              {PROFILE.name}
            </h1>
            <p className="mt-5 text-lg font-medium t-accent sm:text-xl">
              {PROFILE.role}.
            </p>
            <p className="mt-1 text-lg t-text-dim sm:text-xl">
              {PROFILE.subtitle}.
            </p>
            <p className="mt-5 max-w-2xl text-[14px] leading-relaxed t-text-dim">
              Information Technology student building practical experience in
              backend and software engineering — with a growing foundation in
              Linux, systems and a long-term passion for low-level security.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-[12.5px] font-semibold text-white"
                style={{ background: "var(--accent-strong)" }}
              >
                View My Work <ArrowRight size={14} />
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-[12.5px] font-semibold t-border t-text"
              >
                <GitBranch size={14} /> GitHub
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-[12.5px] font-semibold t-border t-text"
              >
                <Network size={14} /> LinkedIn
              </a>
            </div>
          </div>
          <div className="rounded-xl border p-5 font-mono text-[12px] leading-relaxed t-border t-bg-deep">
            <div className="mb-4 t-text-faint">nathaniel@portfolio: ~</div>
            <div className="t-text">nathaniel@portfolio:~$ cat about.txt</div>
            <div className="mt-3 t-accent">Information Technology Student</div>
            <div className="t-accent">
              Software Engineering Intern — Adroit 360
            </div>
            <div className="t-accent">Backend · Systems · Security Curious</div>
            <div className="mt-3 t-text">
              nathaniel@portfolio:~$ <span className="blink">▌</span>
            </div>
          </div>
        </section>

        <TraditionalSection id="about">
          <AboutApp />
        </TraditionalSection>
        <TraditionalSection id="experience">
          <ExperienceApp />
        </TraditionalSection>
        <TraditionalSection id="projects">
          <ProjectsApp />
        </TraditionalSection>
        <TraditionalSection id="skills">
          <SkillsApp />
        </TraditionalSection>
        <TraditionalSection id="philosophy">
          <PhilosophyApp />
        </TraditionalSection>
        <TraditionalSection id="systems">
          <SystemsApp />
          <SecurityApp />
        </TraditionalSection>
        <TraditionalSection id="roadmap">
          <RoadmapApp />
        </TraditionalSection>
        <TraditionalSection id="education">
          <EducationApp />
        </TraditionalSection>

        <section
          id="contact"
          className="border-t py-12 sm:py-16"
          style={{ borderColor: "var(--border)" }}
        >
          <ContactApp />
          <div className="mt-6 flex flex-wrap gap-3 px-7">
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-[12.5px] font-semibold text-white"
              style={{ background: "var(--accent-strong)" }}
            >
              Connect on LinkedIn <ExternalLink size={13} />
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-[12.5px] font-semibold t-border t-text"
            >
              <GitBranch size={14} /> GitHub
            </a>
          </div>
        </section>

        <footer
          className="flex flex-wrap items-center justify-between gap-4 border-t py-6 text-[11px] t-text-faint"
          style={{ borderColor: "var(--border)" }}
        >
          <div>
            <strong className="t-text">{PROFILE.name}</strong>
            <span className="mx-2">·</span>Software Engineering · Systems ·
            Security
          </div>
          <div>Built with curiosity. © 2026 {PROFILE.name}.</div>
        </footer>
      </div>
    </main>
  );
}

function TraditionalSection({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="border-t py-2 sm:py-4"
      style={{ borderColor: "var(--border)" }}
    >
      {children}
    </section>
  );
}
