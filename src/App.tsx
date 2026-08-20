import { useEffect, useState } from "react";
import { useWindowManager } from "./hooks/useWindowManager";
import { useIsMobile } from "./hooks/useIsMobile";
import { Window } from "./components/Window";
import { Taskbar } from "./components/Taskbar";
import { TopBar } from "./components/TopBar";
import { DesktopIcon } from "./components/FolderIcon";
import { TerminalApp } from "./components/Terminal";
import { TraditionalView } from "./components/TraditionalView";
import { ViewChooser, type PortfolioView } from "./components/ViewChooser";
import {
  AboutApp,
  ExperienceApp,
  ProjectsApp,
  SkillsApp,
  PhilosophyApp,
  SystemsApp,
  SecurityApp,
  RoadmapApp,
  EducationApp,
  GoalsApp,
  GithubApp,
  ContactApp,
  FilesApp,
  ResumeApp,
} from "./components/apps";
import type { AppId } from "./data";
import { PROFILE } from "./data";
import {
  X,
  ArrowRight,
  LayoutGrid,
  Search,
  Folder,
  User,
  Terminal,
  MapPin,
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
const Linkedin = ({
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
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);

interface AppMeta {
  title: string;
  emoji: string;
  category: string;
  render: (props: any) => React.ReactNode;
}

const APP_META: Record<AppId, AppMeta> = {
  about: {
    title: "About",
    emoji: "👤",
    category: "Info",
    render: () => <AboutApp />,
  },
  resume: {
    title: "Resume",
    emoji: "📑",
    category: "Info",
    render: () => <ResumeApp />,
  },
  experience: {
    title: "Experience",
    emoji: "💼",
    category: "Career",
    render: () => <ExperienceApp />,
  },
  projects: {
    title: "Projects",
    emoji: "📁",
    category: "Work",
    render: () => <ProjectsApp />,
  },
  skills: {
    title: "Stack",
    emoji: "🛠️",
    category: "Work",
    render: () => <SkillsApp />,
  },
  philosophy: {
    title: "Philosophy",
    emoji: "📜",
    category: "Info",
    render: () => <PhilosophyApp />,
  },
  systems: {
    title: "Systems",
    emoji: "🖥️",
    category: "Systems",
    render: () => <SystemsApp />,
  },
  security: {
    title: "Low-Level",
    emoji: "🔒",
    category: "Security",
    render: () => <SecurityApp />,
  },
  roadmap: {
    title: "Roadmap",
    emoji: "🗺️",
    category: "Career",
    render: () => <RoadmapApp />,
  },
  education: {
    title: "Education",
    emoji: "🎓",
    category: "Career",
    render: () => <EducationApp />,
  },
  goals: {
    title: "Goals",
    emoji: "🎯",
    category: "Career",
    render: () => <GoalsApp />,
  },
  terminal: {
    title: "Terminal",
    emoji: "⌨️",
    category: "Tools",
    render: ({ onOpen, onClose }: any) => (
      <TerminalApp onClose={onClose} onOpen={onOpen} />
    ),
  },
  github: {
    title: "GitHub",
    emoji: "🔗",
    category: "Work",
    render: () => <GithubApp />,
  },
  contact: {
    title: "Contact",
    emoji: "✉️",
    category: "Info",
    render: () => <ContactApp />,
  },
  files: {
    title: "Files",
    emoji: "📂",
    category: "Tools",
    render: ({ onOpen }: any) => <FilesApp onOpen={onOpen} />,
  },
};

const DESKTOP_ITEMS: { id: string; label: string; icon: string; app: AppId }[] =
  [
    { id: "about", label: "About", icon: "👤", app: "about" },
    { id: "resume", label: "Resume", icon: "📑", app: "resume" },
    { id: "files", label: "Files", icon: "📁", app: "files" },
    { id: "projects", label: "Projects", icon: "📂", app: "projects" },
    { id: "experience", label: "Experience", icon: "💼", app: "experience" },
    { id: "skills", label: "Stack", icon: "🛠️", app: "skills" },
    { id: "systems", label: "Systems", icon: "🖥️", app: "systems" },
    { id: "security", label: "Low-Level", icon: "🔒", app: "security" },
    { id: "roadmap", label: "Roadmap", icon: "🗺️", app: "roadmap" },
    { id: "education", label: "Education", icon: "🎓", app: "education" },
    { id: "goals", label: "Goals", icon: "🎯", app: "goals" },
    { id: "github", label: "GitHub", icon: "🔗", app: "github" },
    { id: "contact", label: "Contact", icon: "✉️", app: "contact" },
    { id: "terminal", label: "Terminal", icon: "⌨️", app: "terminal" },
  ];

function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  return (
    <div>
      <div
        className="text-[40px] font-semibold leading-none"
        style={{ color: "var(--text)" }}
      >
        {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
      <div className="mt-1 text-[13px]" style={{ color: "var(--text-dim)" }}>
        {now.toLocaleDateString([], {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>
  );
}

export default function App() {
  const wm = useWindowManager();
  const isMobile = useIsMobile();
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const [appsOverviewOpen, setAppsOverviewOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [homeSearch, setHomeSearch] = useState("");
  const [selectedDesktop, setSelectedDesktop] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [viewMode, setViewMode] = useState<PortfolioView | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = window.localStorage.getItem("portfolio-view");
    return stored === "desktop" || stored === "traditional" ? stored : null;
  });

  const hasOpenWindows = wm.windows.some((w) => !w.minimized);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setContextMenu(null);
        setAppsOverviewOpen(false);
        setWelcomeOpen(false);
        return;
      }
      if ((e.ctrlKey || e.metaKey) && !isMobile) {
        const map: Record<string, AppId> = {
          "1": "about",
          "2": "experience",
          "3": "projects",
          "4": "skills",
          "5": "philosophy",
          "6": "systems",
          "7": "security",
          "8": "roadmap",
          "9": "education",
        };
        const id = map[e.key];
        if (id) {
          e.preventDefault();
          open(id);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  useEffect(() => {
    const close = () => setContextMenu(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  useEffect(() => {
    const onClose = (e: Event) => {
      const id = (e as CustomEvent<{ id: AppId }>).detail?.id;
      if (id) wm.close(id);
    };
    window.addEventListener("taskbar:close", onClose as EventListener);
    return () =>
      window.removeEventListener("taskbar:close", onClose as EventListener);
  }, [wm]);

  const open = (id: AppId) => {
    const meta = APP_META[id];
    if (!meta) return;
    wm.open({ id, title: meta.title, icon: meta.emoji });
    setAppsOverviewOpen(false);
  };

  const openAppsOverview = () => {
    setSearchQuery("");
    setAppsOverviewOpen(true);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isMobile) return;
    const w = 240;
    const h = 360;
    const x = Math.min(e.clientX, window.innerWidth - w - 8);
    const y = Math.min(e.clientY, window.innerHeight - h - 64);
    setContextMenu({ x, y });
  };

  /** Wrap normal apps in a scroll container (windows have overflow-hidden bodies). */
  const renderApp = (id: AppId, props: any) => {
    const meta = APP_META[id];
    if (id === "terminal" || id === "files") return meta.render(props);
    return (
      <div className="h-full min-h-0 overflow-y-auto gui-scroll">
        {meta.render(props)}
      </div>
    );
  };

  const filteredHomeApps = DESKTOP_ITEMS.filter((a) =>
    homeSearch
      ? `${a.label} ${a.app}`.toLowerCase().includes(homeSearch.toLowerCase())
      : true,
  );

  const selectView = (view: PortfolioView) => {
    window.localStorage.setItem("portfolio-view", view);
    setViewMode(view);
  };

  if (viewMode === null) return <ViewChooser onChoose={selectView} />;
  if (viewMode === "traditional")
    return <TraditionalView onSwitchView={selectView} />;

  return (
    <div
      className="desktop-grid relative h-full w-full overflow-hidden transition-theme"
      style={{ color: "var(--text)" }}
      onContextMenu={handleContextMenu}
    >
      {/* Status / Top bar */}
      <TopBar
        onOpen={open}
        onShowApps={openAppsOverview}
        onSwitchView={() => selectView("traditional")}
        mobile={isMobile}
      />

      {/* ============ MOBILE: Android home screen ============ */}
      {isMobile && !hasOpenWindows && (
        <div
          className="absolute bottom-16 left-0 right-0 top-8 z-0 overflow-y-auto gui-scroll px-4 pb-8 pt-4"
          onClick={() => setSelectedDesktop(null)}
        >
          {/* Clock widget */}
          <div
            className="mb-4 rounded-2xl border p-4 transition-theme"
            style={{ background: "var(--bg-2)", borderColor: "var(--border)" }}
          >
            <Clock />
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px]">
              <span className="font-medium" style={{ color: "var(--text)" }}>
                {PROFILE.role}
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5"
                style={{
                  background: "var(--green-soft)",
                  color: "var(--green)",
                }}
              >
                <span
                  className="pulse-dot inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--green)" }}
                />
                Open to opportunities
              </span>
            </div>
            <div
              className="mt-1 flex items-center gap-1 text-[11.5px]"
              style={{ color: "var(--text-faint)" }}
            >
              <MapPin size={11} /> {PROFILE.location} · {PROFILE.handle}
            </div>
          </div>

          {/* Search */}
          <div
            className="mb-4 flex items-center gap-2 rounded-xl border px-3 py-2.5 transition-theme"
            style={{ background: "var(--bg-2)", borderColor: "var(--border)" }}
          >
            <Search size={15} style={{ color: "var(--text-faint)" }} />
            <input
              value={homeSearch}
              onChange={(e) => setHomeSearch(e.target.value)}
              placeholder="Search apps"
              className="min-w-0 flex-1 bg-transparent text-[14px] outline-none"
              style={{ color: "var(--text)" }}
              enterKeyHint="search"
            />
            {homeSearch && (
              <button
                onClick={() => setHomeSearch("")}
                aria-label="Clear search"
                style={{ color: "var(--text-faint)" }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* App grid (4 columns, Android launcher style) */}
          <div className="grid grid-cols-4 gap-x-2 gap-y-4">
            {filteredHomeApps.map((a) => (
              <button
                key={a.id}
                onClick={() => open(a.app)}
                className="flex flex-col items-center gap-1.5 transition-transform active:scale-90"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-[30px]"
                  style={{
                    background: "var(--bg-2)",
                    border: "1px solid var(--border)",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                  }}
                >
                  {a.icon}
                </span>
                <span
                  className="line-clamp-2 max-w-[5.5rem] text-center text-[10.5px] font-medium leading-tight"
                  style={{ color: "var(--text)" }}
                >
                  {a.label}
                </span>
              </button>
            ))}
          </div>

          {filteredHomeApps.length === 0 && (
            <div
              className="mt-10 text-center text-[13px]"
              style={{ color: "var(--text-faint)" }}
            >
              No apps match "{homeSearch}"
            </div>
          )}

          <div
            className="mt-8 text-center text-[10.5px] uppercase tracking-widest"
            style={{ color: "var(--text-faint)" }}
          >
            tap an app to open it
          </div>
        </div>
      )}

      {/* ============ DESKTOP: icon rail + hero ============ */}
      {!isMobile && (
        <>
          <div className="absolute bottom-16 left-3 top-10 z-0 grid grid-cols-1 gap-1 overflow-y-auto gui-scroll pb-2 sm:left-5 sm:top-11">
            {DESKTOP_ITEMS.map((it) => (
              <DesktopIcon
                key={it.id}
                label={it.label}
                icon={<span>{it.icon}</span>}
                selected={selectedDesktop === it.id}
                onSelect={() => setSelectedDesktop(it.id)}
                onOpen={() => {
                  setSelectedDesktop(null);
                  open(it.app);
                }}
              />
            ))}
          </div>

          {!hasOpenWindows && !welcomeOpen && (
            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 select-none flex-col items-center text-center md:flex">
              <div
                className="font-mono text-[10.5px] uppercase tracking-[0.4em]"
                style={{ color: "var(--accent)", opacity: 0.7 }}
              >
                nathaniel@portfolio:~
              </div>
              <div
                className="mt-3 text-3xl font-semibold"
                style={{ color: "var(--text)" }}
              >
                {PROFILE.name}
              </div>
              <div
                className="mt-1.5 text-[14px]"
                style={{ color: "var(--text-dim)" }}
              >
                {PROFILE.role} · {PROFILE.subtitle}
              </div>
              <div
                className="mt-6 rounded-lg border px-4 py-3 text-left font-mono text-[11.5px] leading-relaxed"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-2)",
                  color: "var(--text-dim)",
                }}
              >
                <div>
                  <span style={{ color: "var(--accent)" }}>$</span> ls
                  ~/portfolio
                </div>
                <div className="mt-1" style={{ color: "var(--text-faint)" }}>
                  about · resume · projects · stack · systems · low-level ·
                  roadmap · education · goals · github · contact
                </div>
                <div className="mt-1">
                  <span style={{ color: "var(--accent)" }}>$</span>{" "}
                  <span className="blink" style={{ color: "var(--accent)" }}>
                    ▌
                  </span>
                </div>
              </div>
              <div
                className="mt-5 text-[10.5px] uppercase tracking-widest"
                style={{ color: "var(--text-faint)" }}
              >
                double-click an icon · or right-click anywhere
              </div>
            </div>
          )}
        </>
      )}

      {/* Windows */}
      {wm.windows.map((w) => {
        const meta = APP_META[w.id];
        if (!meta) return null;
        return (
          <Window
            key={w.id}
            state={w}
            onClose={wm.close}
            onMinimize={wm.minimize}
            onMaximize={wm.toggleMaximize}
            onFocus={wm.focus}
            onMove={wm.move}
            onResize={wm.resize}
            topZ={wm.topZ}
            mobile={isMobile}
          >
            {renderApp(w.id, { onOpen: open, onClose: () => wm.close(w.id) })}
          </Window>
        );
      })}

      {/* ============ Welcome modal ============ */}
      {welcomeOpen && (
        <div
          className="absolute inset-0 z-[10000] flex items-end justify-center p-0 backdrop-blur-sm transition-theme fade-in md:items-center md:p-4"
          style={{
            background: "color-mix(in srgb, var(--bg-0) 60%, transparent)",
          }}
          onClick={() => setWelcomeOpen(false)}
        >
          <div
            className="window-shadow welcome-rise flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden border transition-theme md:rounded-xl md:border"
            style={{
              background: "var(--bg-1)",
              borderColor: "var(--border)",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between border-b px-5 py-3.5 transition-theme"
              style={{
                background: "var(--bg-2)",
                borderColor: "var(--border)",
              }}
            >
              <div
                className="flex items-center gap-2 text-[14px] font-semibold"
                style={{ color: "var(--text)" }}
              >
                Welcome
              </div>
              <button
                onClick={() => setWelcomeOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md transition-theme"
                style={{ color: "var(--text-dim)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--red)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "";
                  e.currentTarget.style.color = "var(--text-dim)";
                }}
                title="Close (ESC)"
                aria-label="Close welcome"
              >
                <X size={15} />
              </button>
            </div>
            <div className="grid min-h-0 grid-cols-1 overflow-y-auto gui-scroll md:grid-cols-5">
              <div className="p-6 md:col-span-3">
                <div
                  className="font-mono text-[11px] uppercase tracking-wider"
                  style={{ color: "var(--accent)" }}
                >
                  {PROFILE.handle}
                </div>
                <h2
                  className="mt-2 text-[26px] font-semibold leading-snug"
                  style={{ color: "var(--text)" }}
                >
                  {PROFILE.name}
                </h2>
                <p
                  className="mt-1 text-[14.5px]"
                  style={{ color: "var(--accent)" }}
                >
                  {PROFILE.role}
                </p>
                <p
                  className="mt-1 text-[13.5px]"
                  style={{ color: "var(--text-dim)" }}
                >
                  {PROFILE.subtitle}
                </p>
                <p
                  className="mt-4 text-[13.5px] leading-relaxed"
                  style={{ color: "var(--text-dim)" }}
                >
                  This portfolio is a small Linux desktop. Double-click any
                  icon, browse the file manager, or open the{" "}
                  <span style={{ color: "var(--accent)", fontWeight: 500 }}>
                    terminal
                  </span>{" "}
                  and try{" "}
                  <code
                    className="rounded px-1.5 py-0.5 font-mono"
                    style={{
                      background: "var(--bg-2)",
                      color: "var(--accent)",
                    }}
                  >
                    help
                  </code>
                  .
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {[
                    { id: "about" as AppId, label: "Read About" },
                    { id: "projects" as AppId, label: "See Projects" },
                    { id: "experience" as AppId, label: "Experience" },
                    { id: "goals" as AppId, label: "Hiring Me" },
                  ].map((b) => (
                    <button
                      key={b.id}
                      onClick={() => {
                        open(b.id);
                        setWelcomeOpen(false);
                      }}
                      className="group inline-flex items-center gap-1.5 rounded-md border px-3.5 py-2 text-[12.5px] font-medium transition-theme"
                      style={{
                        borderColor: "var(--border-strong)",
                        background: "var(--bg-2)",
                        color: "var(--text)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--accent)";
                        e.currentTarget.style.color = "var(--accent)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--border-strong)";
                        e.currentTarget.style.color = "var(--text)";
                      }}
                    >
                      {b.label}
                      <ArrowRight
                        size={12}
                        className="opacity-60 transition-transform group-hover:translate-x-0.5"
                      />
                    </button>
                  ))}
                </div>
                <div
                  className="mt-5 flex flex-wrap items-center gap-4 text-[11.5px]"
                  style={{ color: "var(--text-faint)" }}
                >
                  <span className="flex items-center gap-1.5">
                    <span
                      className="pulse-dot inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--green)" }}
                    />
                    Open to opportunities
                  </span>
                  <span>{PROFILE.location}</span>
                </div>
              </div>
              <div
                className="flex flex-col gap-3 border-t p-6 transition-theme md:col-span-2 md:border-l md:border-t-0"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-2)",
                }}
              >
                <div
                  className="font-mono text-[11px] uppercase tracking-wider"
                  style={{ color: "var(--accent)" }}
                >
                  Get started
                </div>
                <button
                  onClick={() => {
                    setWelcomeOpen(false);
                    open("about");
                  }}
                  className="flex items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-theme"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-1)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "var(--border)")
                  }
                >
                  <User size={18} className="t-accent" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-medium t-text">
                      Open About
                    </div>
                    <div className="text-[11.5px] t-text-dim">
                      Bio, focus, qualities
                    </div>
                  </div>
                  <ArrowRight size={14} className="t-text-faint" />
                </button>
                <button
                  onClick={() => {
                    setWelcomeOpen(false);
                    open("projects");
                  }}
                  className="flex items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-theme"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-1)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "var(--border)")
                  }
                >
                  <Folder size={18} className="t-accent" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-medium t-text">
                      View Projects
                    </div>
                    <div className="text-[11.5px] t-text-dim">
                      Selected engineering work
                    </div>
                  </div>
                  <ArrowRight size={14} className="t-text-faint" />
                </button>
                <button
                  onClick={() => {
                    setWelcomeOpen(false);
                    open("terminal");
                  }}
                  className="flex items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-theme"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-1)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "var(--border)")
                  }
                >
                  <Terminal size={18} className="t-accent" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-medium t-text">
                      Open Terminal
                    </div>
                    <div className="text-[11.5px] t-text-dim">
                      Try the shell
                    </div>
                  </div>
                  <ArrowRight size={14} className="t-text-faint" />
                </button>
                <button
                  onClick={() => {
                    setWelcomeOpen(false);
                    openAppsOverview();
                  }}
                  className="mt-1 flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-[13px] font-semibold transition-theme"
                  style={{
                    background: "var(--accent)",
                    color: "var(--accent-text-on)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.filter = "brightness(1.08)")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.filter = "")}
                >
                  Browse all applications <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ Applications Overview ============ */}
      {appsOverviewOpen && (
        <div
          className="absolute inset-0 z-[10000] flex items-center justify-center backdrop-blur-md transition-theme fade-in"
          style={{
            background: "color-mix(in srgb, var(--bg-0) 70%, transparent)",
          }}
          onClick={() => setAppsOverviewOpen(false)}
        >
          <div
            className="window-shadow welcome-rise flex h-full w-full flex-col overflow-hidden border transition-theme md:h-[80vh] md:max-w-5xl md:rounded-xl"
            style={{
              background: "var(--bg-1)",
              borderColor: "var(--border)",
              ...(isMobile ? {} : { margin: "16px" }),
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between border-b px-4 py-3 transition-theme"
              style={{
                background: "var(--bg-2)",
                borderColor: "var(--border)",
              }}
            >
              <div
                className="flex items-center gap-2 text-[14px] font-semibold"
                style={{ color: "var(--text)" }}
              >
                <LayoutGrid size={15} style={{ color: "var(--accent)" }} />
                Applications
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="hidden items-center gap-2 rounded-md border px-2.5 py-1 text-[12px] transition-theme sm:flex"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-1)",
                    color: "var(--text-dim)",
                  }}
                >
                  <Search size={12} />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search applications…"
                    className="w-36 bg-transparent outline-none sm:w-44"
                    style={{ color: "var(--text)" }}
                  />
                </div>
                <button
                  onClick={() => setAppsOverviewOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-md transition-theme"
                  style={{ color: "var(--text-dim)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--red)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "";
                    e.currentTarget.style.color = "var(--text-dim)";
                  }}
                  title="Close (ESC)"
                  aria-label="Close applications overview"
                >
                  <X size={15} />
                </button>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto gui-scroll p-4">
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6">
                {Object.entries(APP_META)
                  .filter(([id, m]) =>
                    searchQuery
                      ? `${m.title} ${m.category} ${id}`
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      : true,
                  )
                  .map(([id, m]) => {
                    const aid = id as AppId;
                    const isOpen = wm.windows.some(
                      (w) => w.id === aid && !w.minimized,
                    );
                    return (
                      <button
                        key={id}
                        onClick={() => open(aid)}
                        className="group flex flex-col items-center gap-2 rounded-lg border p-3 text-center transition-theme"
                        style={{
                          borderColor: "var(--border)",
                          background: "var(--bg-1)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--accent)";
                          e.currentTarget.style.background = "var(--bg-2)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "var(--border)";
                          e.currentTarget.style.background = "var(--bg-1)";
                        }}
                        title={m.title}
                      >
                        <div className="text-[36px] leading-none">
                          {m.emoji}
                        </div>
                        <div
                          className="line-clamp-2 max-w-[6rem] text-[12px] font-medium"
                          style={{ color: "var(--text)" }}
                        >
                          {m.title}
                        </div>
                        <div
                          className="font-mono text-[9.5px] uppercase tracking-wider"
                          style={{ color: "var(--text-faint)" }}
                        >
                          {m.category}
                        </div>
                        {isOpen && (
                          <span
                            className="rounded-full px-2 py-0.5 text-[9.5px] font-medium"
                            style={{
                              background: "var(--accent-soft)",
                              color: "var(--accent)",
                            }}
                          >
                            open
                          </span>
                        )}
                      </button>
                    );
                  })}
              </div>
              {searchQuery &&
                Object.entries(APP_META).filter(([id, m]) =>
                  `${m.title} ${m.category} ${id}`
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
                ).length === 0 && (
                  <div
                    className="mt-12 text-center text-[13px]"
                    style={{ color: "var(--text-faint)" }}
                  >
                    No applications match "{searchQuery}"
                  </div>
                )}
            </div>
            <div
              className="flex items-center justify-between border-t px-4 py-2 text-[11.5px] transition-theme"
              style={{
                background: "var(--bg-2)",
                borderColor: "var(--border)",
                color: "var(--text-faint)",
              }}
            >
              <span>{Object.keys(APP_META).length} applications</span>
              <span>ESC to close · tap an app to open</span>
            </div>
          </div>
        </div>
      )}

      {/* ============ Context menu (desktop only) ============ */}
      {!isMobile && contextMenu && (
        <div
          className="absolute z-[10001] w-60 overflow-hidden rounded-md border py-1 shadow-2xl transition-theme"
          style={{
            left: contextMenu.x,
            top: contextMenu.y,
            background: "var(--bg-1)",
            borderColor: "var(--border)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-wider"
            style={{ color: "var(--text-faint)" }}
          >
            Desktop
          </div>
          {[
            { label: "Open Files", id: "files" as AppId },
            { label: "Open Terminal", id: "terminal" as AppId },
            { label: "Open About", id: "about" as AppId },
            { label: "Open Projects", id: "projects" as AppId },
            { label: "Open GitHub", id: "github" as AppId },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => {
                open(m.id);
                setContextMenu(null);
              }}
              className="flex w-full items-center justify-between px-3 py-1.5 text-left text-[12.5px] transition-theme"
              style={{ color: "var(--text)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--hover)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "")}
            >
              <span>{m.label}</span>
              <span style={{ color: "var(--text-faint)" }}>
                {APP_META[m.id].emoji}
              </span>
            </button>
          ))}
          <div className="my-1 h-px" style={{ background: "var(--border)" }} />
          <button
            onClick={() => {
              setContextMenu(null);
              openAppsOverview();
            }}
            className="flex w-full items-center justify-between px-3 py-1.5 text-left text-[12.5px] transition-theme"
            style={{ color: "var(--text)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--hover)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = "")}
          >
            <span>Show Applications</span>
            <LayoutGrid size={12} style={{ color: "var(--accent)" }} />
          </button>
          <div className="my-1 h-px" style={{ background: "var(--border)" }} />
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 text-left text-[12.5px] transition-theme"
            style={{ color: "var(--text)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--hover)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = "")}
          >
            <Github size={12} /> Open GitHub in new tab
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 text-left text-[12.5px] transition-theme"
            style={{ color: "var(--text)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--hover)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = "")}
          >
            <Linkedin size={12} /> Open LinkedIn in new tab
          </a>
        </div>
      )}

      {/* ============ Taskbar / Navigation ============ */}
      <Taskbar
        windows={wm.windows}
        onOpen={open}
        onFocus={wm.focus}
        onLaunchTerminal={() => open("terminal")}
        onShowApps={openAppsOverview}
        onBack={wm.closeTop}
        onHome={wm.minimizeAll}
        topZ={wm.topZ}
        mobile={isMobile}
      />
    </div>
  );
}
