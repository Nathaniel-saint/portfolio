import { useEffect, useRef, useState } from "react";
import { PROFILE, PROJECTS } from "../data";
import { useTheme } from "../hooks/useTheme";
import { useIsMobile } from "../hooks/useIsMobile";

interface Line {
  type: "in" | "out" | "err" | "ok";
  text: string;
}

const HELP = `Available commands:
  help            show this help
  whoami          short bio
  about           open the about window
  ls              list projects in ~/
  cat <id>        open a project window
  stack           open technical stack
  exp             open professional experience
  roadmap         open learning roadmap
  skills          open skills
  goals           open career goals
  contact         open contact window
  github          open GitHub repos window
  clear           clear the terminal
  pwd             print working directory
  date            print the current date
  echo <text>     print text
  uname           system info
  history         show command history
  theme           toggle dark / light
  sudo            try it
  exit            close terminal`;

const COLORS: Record<Line["type"], string> = {
  in: "var(--text)",
  ok: "var(--green)",
  err: "var(--red)",
  out: "var(--text-dim)",
};

export function TerminalApp({
  onClose,
  onOpen,
}: {
  onClose: () => void;
  onOpen: (id: any, title: string) => void;
}) {
  const { theme, toggle } = useTheme();
  const isMobile = useIsMobile();
  const [lines, setLines] = useState<Line[]>([
    { type: "ok", text: `Welcome to ${PROFILE.name}'s portfolio shell.` },
    { type: "out", text: "Type 'help' to see available commands. Try 'ls' or 'about'." },
  ]);
  const [input, setInput] = useState("");
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) {
      setLines((l) => [...l, { type: "in", text: "nathaniel@portfolio:~$ " }]);
      return;
    }
    setCmdHistory((h) => [...h, cmd]);
    setHistoryIdx(-1);
    const next: Line[] = [{ type: "in", text: `nathaniel@portfolio:~$ ${cmd}` }];
    const [base, ...rest] = cmd.split(/\s+/);
    switch (base) {
      case "help":
        next.push({ type: "out", text: HELP });
        break;
      case "clear":
        setLines([]);
        setInput("");
        return;
      case "whoami":
        next.push({ type: "out", text: `${PROFILE.name} — ${PROFILE.role}. ${PROFILE.subtitle}.` });
        next.push({ type: "out", text: "Backend-leaning software engineer building production-ready experience." });
        break;
      case "about":
        onOpen("about", "about.txt");
        next.push({ type: "ok", text: "→ opened about.txt" });
        break;
      case "ls":
        next.push({ type: "out", text: "total " + PROJECTS.length });
        PROJECTS.forEach((p) => {
          next.push({ type: "out", text: `  ${p.name.padEnd(18)} ${p.size.padStart(5)}  ${p.tagline}` });
        });
        break;
      case "cat":
        if (!rest[0]) {
          next.push({ type: "err", text: "cat: missing operand" });
        } else {
          const p = PROJECTS.find((x) => x.id === rest[0]);
          if (p) {
            onOpen("projects", "Selected Engineering Projects");
            next.push({ type: "ok", text: `→ opened ${p.name} in projects window` });
          } else {
            next.push({ type: "err", text: `cat: ${rest[0]}: no such project. try 'ls'.` });
          }
        }
        break;
      case "stack":
        onOpen("skills", "Technical Stack");
        next.push({ type: "ok", text: "→ opened Technical Stack" });
        break;
      case "exp":
        onOpen("experience", "Professional Experience");
        next.push({ type: "ok", text: "→ opened Professional Experience" });
        break;
      case "roadmap":
        onOpen("roadmap", "Learning Roadmap");
        next.push({ type: "ok", text: "→ opened Learning Roadmap" });
        break;
      case "skills":
        onOpen("skills", "Technical Stack");
        next.push({ type: "ok", text: "→ opened Technical Stack" });
        break;
      case "goals":
        onOpen("goals", "Career Goals");
        next.push({ type: "ok", text: "→ opened Career Goals" });
        break;
      case "contact":
        onOpen("contact", "Contact");
        next.push({ type: "ok", text: "→ opened Contact" });
        break;
      case "github":
        onOpen("github", "GitHub Repositories");
        next.push({ type: "ok", text: "→ opened GitHub Repositories" });
        break;
      case "pwd":
        next.push({ type: "out", text: "/home/nathaniel/portfolio" });
        break;
      case "date":
        next.push({ type: "out", text: new Date().toString() });
        break;
      case "uname":
        next.push({ type: "out", text: "Linux portfolio 6.0.0-career x86_64 GNU/Linux" });
        break;
      case "history":
        if (cmdHistory.length === 0) next.push({ type: "out", text: "(empty)" });
        else cmdHistory.forEach((c, i) => next.push({ type: "out", text: `  ${i + 1}  ${c}` }));
        break;
      case "theme":
        toggle();
        next.push({ type: "ok", text: `→ theme switched to ${theme === "dark" ? "light" : "dark"}` });
        break;
      case "echo":
        next.push({ type: "out", text: rest.join(" ") });
        break;
      case "sudo":
        next.push({ type: "err", text: "[sudo] password for nathaniel: " });
        next.push({ type: "err", text: "Sorry, try again." });
        next.push({ type: "err", text: "Sorry, try again." });
        next.push({ type: "err", text: "Sorry, try again." });
        next.push({ type: "err", text: "sudo: 3 incorrect password attempts" });
        break;
      case "exit":
        onClose();
        return;
      default:
        next.push({ type: "err", text: `bash: ${base}: command not found. type 'help'.` });
    }
    setLines((l) => [...l, ...next]);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const next = historyIdx + 1;
      if (next >= cmdHistory.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(next);
        setInput(cmdHistory[next] ?? "");
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div
      className="flex h-full min-h-0 flex-col font-mono leading-relaxed"
      style={{ background: "var(--bg-deep)", color: "var(--text)", fontSize: isMobile ? 14 : 13 }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Scrollable output */}
      <div className="min-h-0 flex-1 overflow-y-auto gui-scroll px-4 py-3">
        {lines.map((l, i) => (
          <div key={i} style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", color: COLORS[l.type] }}>
            {l.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Fixed input row — always visible, never breaks layout */}
      <div
        className="flex shrink-0 items-center gap-2 border-t px-3 py-2 transition-theme"
        style={{ background: "var(--bg-2)", borderColor: "var(--border)" }}
      >
        <span className="shrink-0" style={{ color: "var(--green)" }}>
          nathaniel@portfolio:~$
        </span>
        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          className="min-w-0 flex-1 bg-transparent outline-none"
          style={{ color: "var(--text)", fontSize: isMobile ? 16 : 13 }}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          enterKeyHint="go"
        />
      </div>

      {/* Status bar */}
      <div
        className="flex shrink-0 items-center justify-between border-t px-3 py-1 text-[10.5px]"
        style={{
          background: "var(--bg-2)",
          borderColor: "var(--border)",
          color: "var(--text-faint)",
        }}
      >
        <span className="min-w-0 truncate">
          bash 5.2 · {cmdHistory.length} cmds · {PROFILE.location} · {theme}
        </span>
        <span className="shrink-0">UTF-8 · 80×24</span>
      </div>
    </div>
  );
}
