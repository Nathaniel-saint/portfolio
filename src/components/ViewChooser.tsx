import { ArrowRight, ExternalLink, Monitor, Sun } from "lucide-react";
import { PROFILE } from "../data";

export type PortfolioView = "desktop" | "traditional";

interface ViewChooserProps {
  onChoose: (view: PortfolioView) => void;
}

export function ViewChooser({ onChoose }: ViewChooserProps) {
  return (
    <main className="view-chooser min-h-full overflow-y-auto px-5 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col justify-center">
        <header className="mb-10 flex items-start justify-between gap-6">
          <div>
            <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] t-accent">
              <img
                src="/profile_pic.jpg"
                alt={PROFILE.name}
                className="h-9 w-9 rounded-full object-cover object-center"
              />
              {PROFILE.handle} · {PROFILE.location}
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight t-text sm:text-6xl">
              {PROFILE.name}
            </h1>
            <p className="mt-3 max-w-xl text-base t-text-dim sm:text-lg">
              {PROFILE.role} <span className="t-accent">—</span>{" "}
              {PROFILE.subtitle}
            </p>
          </div>
          <div className="hidden rounded-full border px-3 py-1.5 font-mono text-[11px] t-text-faint sm:block t-border">
            choose your interface
          </div>
        </header>

        <section
          className="grid gap-4 md:grid-cols-2"
          aria-label="Choose a portfolio view"
        >
          <button
            type="button"
            onClick={() => onChoose("desktop")}
            className="view-choice group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl border p-6 text-left transition-theme sm:p-8"
            style={{
              background: "var(--bg-2)",
              borderColor: "var(--accent-border)",
            }}
          >
            <div>
              <div className="mb-7 flex items-center justify-between">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
                  style={{
                    background: "var(--accent-soft)",
                    color: "var(--accent)",
                  }}
                >
                  Recommended
                </span>
                <Monitor size={25} className="t-accent" />
              </div>
              <h2 className="text-2xl font-semibold t-text">Linux Desktop</h2>
              <p className="mt-3 max-w-sm text-[14px] leading-relaxed t-text-dim">
                Browse files, open windows, use the terminal, and explore the
                portfolio like a small operating system.
              </p>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold t-accent">
              Enter Desktop{" "}
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </button>

          <button
            type="button"
            onClick={() => onChoose("traditional")}
            className="view-choice group flex min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl border p-6 text-left transition-theme sm:p-8"
            style={{ background: "var(--bg-1)", borderColor: "var(--border)" }}
          >
            <div>
              <div className="mb-7 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider t-border t-text-faint">
                  <Sun size={13} /> Familiar view
                </span>
                <ExternalLink size={23} className="t-text-dim" />
              </div>
              <h2 className="text-2xl font-semibold t-text">
                Traditional Website
              </h2>
              <p className="mt-3 max-w-sm text-[14px] leading-relaxed t-text-dim">
                Scroll through experience, projects, skills, and contact details
                in one clean, familiar page.
              </p>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold t-text">
              Open Website{" "}
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </button>
        </section>

        <p className="mt-7 flex items-center justify-center gap-2 text-center text-[12px] t-text-faint">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--green)" }}
          />
          Your choice is saved on this device. You can switch views anytime.
        </p>
      </div>
    </main>
  );
}
