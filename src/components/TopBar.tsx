import { useEffect, useState } from "react";
import { Wifi, BatteryFull, Volume2, PanelsTopLeft } from "lucide-react";
import { PROFILE } from "../data";

interface Props {
  onOpen: (id: import("../data").AppId, title: string) => void;
  onShowApps: () => void;
  onSwitchView: () => void;
  mobile?: boolean;
}

const MENU_ITEMS: {
  label: string;
  id: import("../data").AppId;
  shortcut?: string;
}[] = [
  { label: "About Nathaniel", id: "about", shortcut: "Ctrl+1" },
  { label: "Professional Experience", id: "experience", shortcut: "Ctrl+2" },
  { label: "Engineering Projects", id: "projects", shortcut: "Ctrl+3" },
  { label: "Technical Stack", id: "skills", shortcut: "Ctrl+4" },
  { label: "Engineering Philosophy", id: "philosophy", shortcut: "Ctrl+5" },
  { label: "Systems & Linux", id: "systems", shortcut: "Ctrl+6" },
  { label: "Low-Level Security", id: "security", shortcut: "Ctrl+7" },
  { label: "Learning Roadmap", id: "roadmap", shortcut: "Ctrl+8" },
  { label: "Education & Training", id: "education", shortcut: "Ctrl+9" },
  { label: "Career Goals", id: "goals" },
  { label: "GitHub Repositories", id: "github" },
  { label: "Contact", id: "contact" },
];

export function TopBar({
  onOpen,
  onShowApps,
  onSwitchView,
  mobile = false,
}: Props) {
  const [time, setTime] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  // ============ MOBILE: Android status bar ============
  if (mobile) {
    return (
      <div
        className="absolute left-0 right-0 top-0 z-[9998] flex h-8 items-center justify-between border-b px-4 transition-theme"
        style={{
          background: "var(--bg-2)",
          borderColor: "var(--border)",
          color: "var(--text)",
        }}
      >
        <span
          className="font-mono text-[13px] font-semibold"
          style={{ color: "var(--text)" }}
        >
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
        <div
          className="flex items-center gap-3"
          style={{ color: "var(--text-dim)" }}
        >
          <Volume2 size={14} />
          <Wifi size={14} />
          <BatteryFull size={16} style={{ color: "var(--green)" }} />
        </div>
      </div>
    );
  }

  // ============ DESKTOP: GNOME-style top bar ============
  return (
    <div
      className="absolute left-0 right-0 top-0 z-[9998] flex h-8 items-center justify-between border-b px-3 text-[12.5px] backdrop-blur transition-theme"
      style={{
        background: "var(--bg-2)",
        borderColor: "var(--border)",
        color: "var(--text)",
      }}
      onClick={() => setMenuOpen(false)}
    >
      <div className="flex items-center gap-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((v) => !v);
          }}
          className="flex items-center gap-1.5 rounded px-2.5 py-0.5 text-[12.5px] font-semibold transition-theme"
          style={{
            color: "var(--accent)",
            background: menuOpen ? "var(--hover)" : "transparent",
          }}
          onMouseEnter={(e) => {
            if (!menuOpen) e.currentTarget.style.background = "var(--hover)";
          }}
          onMouseLeave={(e) => {
            if (!menuOpen) e.currentTarget.style.background = "transparent";
          }}
          title="Open menu"
          aria-expanded={menuOpen}
        >
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          Activities
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(false);
            onShowApps();
          }}
          className="rounded px-2.5 py-0.5 text-[12.5px] transition-theme"
          style={{ color: "var(--text)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--hover)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.background = "")}
          title="Show Applications"
        >
          Applications
        </button>
        <span className="mx-1" style={{ color: "var(--text-faint)" }}>
          ·
        </span>
        <span
          className="font-mono text-[11.5px]"
          style={{ color: "var(--text-dim)" }}
        >
          nathaniel@portfolio:~
        </span>
      </div>

      <div
        className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[11.5px] md:flex"
        style={{ color: "var(--text-dim)" }}
      >
        <span
          className="inline-block h-1.5 w-1.5 rounded-full pulse-dot"
          style={{ background: "var(--green)" }}
        />
        <span>
          {PROFILE.location} · {PROFILE.handle}
        </span>
      </div>

      <div
        className="flex items-center gap-3"
        style={{ color: "var(--text-dim)" }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSwitchView();
          }}
          className="hidden items-center gap-1.5 rounded px-2 py-0.5 text-[11px] transition-theme md:flex"
          style={{ color: "var(--text-dim)" }}
          title="Switch to traditional website view"
        >
          <PanelsTopLeft size={12} /> Website view
        </button>
        <Volume2 size={13} />
        <Wifi size={13} />
        <BatteryFull size={14} style={{ color: "var(--green)" }} />
        <span className="font-mono text-[11.5px]">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>

      {menuOpen && (
        <div
          className="absolute left-2 top-9 z-[9999] w-72 overflow-hidden rounded-md border py-1 shadow-2xl transition-theme"
          style={{ background: "var(--bg-1)", borderColor: "var(--border)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="border-b px-3 py-2 text-[10.5px] uppercase tracking-wider"
            style={{ borderColor: "var(--border)", color: "var(--text-faint)" }}
          >
            Quick Open
          </div>
          {MENU_ITEMS.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                onOpen(m.id, m.label);
                setMenuOpen(false);
              }}
              className="flex w-full items-center justify-between px-3 py-1.5 text-left text-[12.5px] transition-theme"
              style={{ color: "var(--text)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--hover)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "")}
            >
              <span>{m.label}</span>
              {m.shortcut && (
                <span
                  className="font-mono text-[10.5px]"
                  style={{ color: "var(--text-faint)" }}
                >
                  {m.shortcut}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
