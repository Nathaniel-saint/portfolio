import {
  Terminal,
  Folder,
  User,
  Briefcase,
  Cpu,
  Shield,
  GraduationCap,
  Target,
  GitBranch,
  Wrench,
  Map,
  Mail,
  FileText,
  BookOpen,
  Sun,
  Moon,
  LayoutGrid,
  X,
  ChevronLeft,
  Home,
} from "lucide-react";
import type { AppId } from "../data";
import type { WindowState } from "../hooks/useWindowManager";
import { useTheme } from "../hooks/useTheme";

const APP_ICONS: Record<AppId, React.ReactNode> = {
  about: <User size={18} />,
  resume: <FileText size={18} />,
  experience: <Briefcase size={18} />,
  projects: <Folder size={18} />,
  skills: <Wrench size={18} />,
  philosophy: <BookOpen size={18} />,
  systems: <Cpu size={18} />,
  security: <Shield size={18} />,
  roadmap: <Map size={18} />,
  education: <GraduationCap size={18} />,
  goals: <Target size={18} />,
  terminal: <Terminal size={18} />,
  github: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.8 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.9C23.5 5.6 18.4.5 12 .5z" />
    </svg>
  ),
  contact: <Mail size={18} />,
  files: <Folder size={18} />,
};

interface TaskbarProps {
  windows: WindowState[];
  onOpen: (id: AppId, title: string) => void;
  onFocus: (id: AppId) => void;
  onLaunchTerminal: () => void;
  onShowApps: () => void;
  onBack: () => void;
  onHome: () => void;
  topZ: number;
  mobile: boolean;
}

const PINNED: { id: AppId; title: string }[] = [
  { id: "files", title: "Files" },
  { id: "about", title: "About" },
  { id: "projects", title: "Projects" },
  { id: "skills", title: "Stack" },
  { id: "terminal", title: "Terminal" },
];

export function Taskbar({
  windows,
  onOpen,
  onFocus,
  onLaunchTerminal,
  onShowApps,
  onBack,
  onHome,
  topZ,
  mobile,
}: TaskbarProps) {
  const { theme, toggle } = useTheme();
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });

  // ============ MOBILE: Android-style navigation bar ============
  if (mobile) {
    return (
      <div
        className="absolute bottom-0 left-0 right-0 z-[9999] flex h-16 items-stretch justify-between border-t px-2 transition-theme"
        style={{
          background: "var(--bg-2)",
          borderColor: "var(--border)",
          boxShadow: "var(--shadow-dock)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {/* Left: Back · Home · Apps */}
        <div className="flex items-stretch gap-1">
          <button
            onClick={onBack}
            title="Back"
            aria-label="Back"
            className="flex w-14 items-center justify-center rounded-md transition-theme"
            style={{ color: "var(--text)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "")}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={onHome}
            title="Home"
            aria-label="Home"
            className="flex w-14 items-center justify-center rounded-md transition-theme"
            style={{ color: "var(--text)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "")}
          >
            <Home size={22} />
          </button>
          <button
            onClick={onShowApps}
            title="All applications"
            aria-label="All applications"
            className="flex w-14 items-center justify-center rounded-md transition-theme"
            style={{ color: "var(--text)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "")}
          >
            <LayoutGrid size={22} />
          </button>
        </div>

        {/* Right: theme · clock */}
        <div className="flex items-stretch gap-1">
          <button
            onClick={toggle}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
            className="flex w-12 items-center justify-center rounded-md transition-theme"
            style={{ color: "var(--text-dim)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--hover)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "";
              e.currentTarget.style.color = "var(--text-dim)";
            }}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div
            className="flex flex-col items-end justify-center px-2 font-mono leading-tight"
            style={{ color: "var(--text)" }}
          >
            <span className="text-[13px] font-semibold">{time}</span>
            <span className="text-[10px]" style={{ color: "var(--text-faint)" }}>
              {date}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ============ DESKTOP: full dock ============
  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-[9999] flex h-16 items-stretch justify-between border-t px-2 backdrop-blur transition-theme"
      style={{
        background: "var(--bg-2)",
        borderColor: "var(--border)",
        boxShadow: "var(--shadow-dock)",
      }}
    >
      {/* Left cluster: apps + pinned + open */}
      <div className="flex items-stretch gap-0.5">
        <button
          title="Show Applications"
          onClick={onShowApps}
          aria-label="Show Applications"
          className="flex w-12 items-center justify-center rounded-md transition-theme"
          style={{ color: "var(--text)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "")}
        >
          <LayoutGrid size={20} />
        </button>

        <div className="mx-1 my-3 w-px" style={{ background: "var(--border-strong)" }} />

        {PINNED.map((p) => {
          const isOpen = windows.some((w) => w.id === p.id);
          const isTop = isOpen && windows.find((w) => w.id === p.id)?.z === topZ;
          return (
            <button
              key={p.id}
              title={p.title}
              onClick={() => {
                if (isOpen) onFocus(p.id);
                else onOpen(p.id, p.title);
              }}
              className="relative flex w-14 flex-col items-center justify-center gap-0.5 rounded-md transition-theme"
              style={{
                background: isOpen ? "var(--selected)" : "transparent",
                color: isOpen ? "var(--accent)" : "var(--text)",
              }}
              onMouseEnter={(e) => {
                if (!isOpen) e.currentTarget.style.background = "var(--hover)";
              }}
              onMouseLeave={(e) => {
                if (!isOpen) e.currentTarget.style.background = "transparent";
              }}
            >
              {APP_ICONS[p.id]}
              {isOpen && (
                <span
                  className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
                  style={{ background: isTop ? "var(--accent)" : "var(--text-faint)" }}
                />
              )}
            </button>
          );
        })}

        {windows
          .filter((w) => !PINNED.find((p) => p.id === w.id))
          .map((w) => {
            const isTop = w.z === topZ;
            return (
              <button
                key={w.id}
                onClick={() => onFocus(w.id)}
                className="group relative flex h-full max-w-[200px] min-w-[120px] items-center gap-2.5 rounded-md px-3 text-[12.5px] transition-theme"
                style={{
                  background: isTop ? "var(--selected)" : "transparent",
                  color: isTop ? "var(--text)" : "var(--text-dim)",
                }}
                onMouseEnter={(e) => {
                  if (!isTop) e.currentTarget.style.background = "var(--hover)";
                }}
                onMouseLeave={(e) => {
                  if (!isTop) e.currentTarget.style.background = "transparent";
                }}
                title={w.title}
              >
                <span className="shrink-0">{APP_ICONS[w.id] ?? <Folder size={18} />}</span>
                <span className="truncate font-medium">{w.title}</span>
                <span
                  role="button"
                  aria-label="Close window"
                  onClick={(e) => {
                    e.stopPropagation();
                    const ev = new CustomEvent("taskbar:close", { detail: { id: w.id } });
                    window.dispatchEvent(ev);
                  }}
                  className="ml-auto hidden h-5 w-5 shrink-0 items-center justify-center rounded transition-theme group-hover:flex"
                  style={{ color: "var(--text-faint)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--red)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "";
                    e.currentTarget.style.color = "var(--text-faint)";
                  }}
                >
                  <X size={11} />
                </span>
                {isTop && (
                  <span
                    className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                )}
              </button>
            );
          })}
      </div>

      {/* Right cluster: theme | git | terminal | clock */}
      <div className="flex items-stretch" style={{ color: "var(--text-dim)" }}>
        <button
          onClick={toggle}
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle theme"
          className="flex w-12 items-center justify-center rounded-md transition-theme"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--hover)";
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "";
            e.currentTarget.style.color = "var(--text-dim)";
          }}
          style={{ color: "var(--text-dim)" }}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div
          className="hidden items-center gap-2 px-3 font-mono text-[11.5px] md:flex"
          style={{ color: "var(--text-dim)" }}
          title="Branch"
        >
          <GitBranch size={13} style={{ color: "var(--accent)" }} />
          <span>main</span>
        </div>

        <button
          title="Open Terminal"
          onClick={onLaunchTerminal}
          aria-label="Open Terminal"
          className="flex w-12 items-center justify-center rounded-md transition-theme"
          style={{ color: "var(--text-dim)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--hover)";
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "";
            e.currentTarget.style.color = "var(--text-dim)";
          }}
        >
          <Terminal size={18} />
        </button>

        <div
          className="flex flex-col items-end justify-center px-3 font-mono leading-tight"
          style={{ color: "var(--text)" }}
        >
          <span className="text-[12px] font-semibold">{time}</span>
          <span className="text-[10.5px]" style={{ color: "var(--text-faint)" }}>
            {date}
          </span>
        </div>
      </div>
    </div>
  );
}
