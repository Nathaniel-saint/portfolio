import { useEffect, useRef } from "react";
import { Minus, Square, X, Maximize2, ChevronLeft } from "lucide-react";
import type { WindowState } from "../hooks/useWindowManager";

interface Props {
  state: WindowState;
  onClose: (id: WindowState["id"]) => void;
  onMinimize: (id: WindowState["id"]) => void;
  onMaximize: (id: WindowState["id"]) => void;
  onFocus: (id: WindowState["id"]) => void;
  onMove: (id: WindowState["id"], x: number, y: number) => void;
  onResize: (id: WindowState["id"], w: number, h: number) => void;
  topZ: number;
  mobile?: boolean;
  children: React.ReactNode;
}

export function Window({
  state,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize,
  topZ,
  mobile = false,
  children,
}: Props) {
  const dragRef = useRef<{
    ox: number;
    oy: number;
    x: number;
    y: number;
  } | null>(null);
  const resizeRef = useRef<{
    ox: number;
    oy: number;
    ow: number;
    oh: number;
  } | null>(null);
  const winRef = useRef<HTMLDivElement | null>(null);

  // Clamp to viewport (desktop only)
  useEffect(() => {
    if (mobile || state.maximized) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight - 64;
    if (state.x < 0) onMove(state.id, 0, state.y);
    if (state.y < 32) onMove(state.id, state.x, 32);
    if (state.x + state.width > vw) onMove(state.id, vw - state.width, state.y);
    if (state.y + state.height > vh)
      onMove(state.id, state.x, vh - state.height);
  }, [
    state.x,
    state.y,
    state.width,
    state.height,
    state.id,
    state.maximized,
    mobile,
    onMove,
  ]);

  const startDrag = (e: React.MouseEvent) => {
    if (mobile || state.maximized) return;
    if ((e.target as HTMLElement).closest("button")) return;
    onFocus(state.id);
    dragRef.current = { ox: e.clientX, oy: e.clientY, x: state.x, y: state.y };
    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
  };

  useEffect(() => {
    const onMove2 = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.ox;
      const dy = e.clientY - dragRef.current.oy;
      let nx = dragRef.current.x + dx;
      let ny = dragRef.current.y + dy;
      const vw = window.innerWidth;
      const vh = window.innerHeight - 64;
      nx = Math.max(-state.width + 120, Math.min(nx, vw - 40));
      ny = Math.max(32, Math.min(ny, vh - 40));
      onMove(state.id, nx, ny);
    };
    const onUp = () => {
      dragRef.current = null;
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
    window.addEventListener("mousemove", onMove2);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove2);
      window.removeEventListener("mouseup", onUp);
    };
  }, [state.id, state.width, onMove]);

  const startResize = (e: React.MouseEvent) => {
    if (mobile) return;
    e.stopPropagation();
    if (state.maximized) return;
    onFocus(state.id);
    resizeRef.current = {
      ox: e.clientX,
      oy: e.clientY,
      ow: state.width,
      oh: state.height,
    };
    document.body.style.userSelect = "none";
    document.body.style.cursor = "nwse-resize";
  };

  useEffect(() => {
    const onMove2 = (e: MouseEvent) => {
      if (!resizeRef.current) return;
      const dx = e.clientX - resizeRef.current.ox;
      const dy = e.clientY - resizeRef.current.oy;
      const nw = Math.max(360, resizeRef.current.ow + dx);
      const nh = Math.max(220, resizeRef.current.oh + dy);
      onResize(state.id, nw, nh);
    };
    const onUp = () => {
      resizeRef.current = null;
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
    window.addEventListener("mousemove", onMove2);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove2);
      window.removeEventListener("mouseup", onUp);
    };
  }, [state.id, onResize]);

  if (state.minimized) return null;

  const isTop = state.z === topZ;

  // ============ MOBILE: Android-style full-screen app ============
  if (mobile) {
    return (
      <div
        style={{
          position: "absolute",
          zIndex: state.z,
          left: 0,
          top: 32,
          width: "100%",
          height: "calc(100% - 32px - 64px)",
        }}
        className="window-slide-up flex flex-col overflow-hidden"
        onMouseDown={() => onFocus(state.id)}
      >
        {/* App bar: back · icon · title · close */}
        <div
          className="flex h-12 shrink-0 items-center gap-1.5 border-b px-1.5 transition-theme"
          style={{ background: "var(--bg-2)", borderColor: "var(--border)" }}
        >
          <button
            onClick={() => onClose(state.id)}
            aria-label="Back"
            title="Back"
            className="flex h-10 w-10 items-center justify-center rounded-full transition-theme"
            style={{ color: "var(--accent)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--hover)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = "")}
          >
            <ChevronLeft size={22} />
          </button>
          <span className="text-[19px] leading-none">{state.icon}</span>
          <span
            className="min-w-0 flex-1 truncate text-[15px] font-semibold"
            style={{ color: "var(--text)" }}
          >
            {state.title}
          </span>
          <button
            onClick={() => onClose(state.id)}
            aria-label="Close"
            className="flex h-10 w-10 items-center justify-center rounded-full transition-theme"
            style={{ color: "var(--text-dim)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--red)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "";
              e.currentTarget.style.color = "var(--text-dim)";
            }}
          >
            <X size={18} />
          </button>
        </div>
        {/* App content — full height, scrolls internally */}
        <div
          className="relative min-h-0 flex-1 overflow-hidden"
          style={{ background: "var(--bg-0)" }}
        >
          {children}
        </div>
      </div>
    );
  }

  // ============ DESKTOP: draggable / resizable window ============
  const style: React.CSSProperties = state.maximized
    ? { left: 0, top: 32, width: "100vw", height: "calc(100vh - 32px - 64px)" }
    : { left: state.x, top: state.y, width: state.width, height: state.height };

  return (
    <div
      ref={winRef}
      onMouseDown={() => onFocus(state.id)}
      style={{ position: "absolute", zIndex: state.z, ...style }}
      className="window-shadow window-pop flex flex-col overflow-hidden rounded-lg border"
    >
      {/* Title bar */}
      <div
        onMouseDown={startDrag}
        onDoubleClick={() => onMaximize(state.id)}
        className="flex h-10 shrink-0 cursor-grab items-center justify-between border-b px-3 active:cursor-grabbing transition-theme"
        style={{
          background: isTop ? "var(--bg-2)" : "var(--bg-3)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex min-w-0 items-center gap-2.5 text-[13px]">
          <span className="shrink-0 text-[15px] leading-none">
            {state.icon}
          </span>
          <span
            className="truncate font-semibold tracking-tight"
            style={{ color: "var(--text)" }}
          >
            {state.title}
          </span>
        </div>
        <div
          className="flex shrink-0 items-center gap-0.5"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(state.id);
            }}
            title="Minimize"
            aria-label="Minimize"
            className="flex h-8 w-9 items-center justify-center rounded transition-theme"
            style={{ color: "var(--text-dim)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--hover)";
              e.currentTarget.style.color = "var(--yellow)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "";
              e.currentTarget.style.color = "var(--text-dim)";
            }}
          >
            <Minus size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximize(state.id);
            }}
            title={state.maximized ? "Restore" : "Maximize"}
            aria-label="Maximize"
            className="flex h-8 w-9 items-center justify-center rounded transition-theme"
            style={{ color: "var(--text-dim)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--hover)";
              e.currentTarget.style.color = "var(--green)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "";
              e.currentTarget.style.color = "var(--text-dim)";
            }}
          >
            {state.maximized ? <Square size={11} /> : <Maximize2 size={12} />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose(state.id);
            }}
            title="Close"
            aria-label="Close"
            className="flex h-8 w-9 items-center justify-center rounded transition-theme"
            style={{ color: "var(--text-dim)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--red)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "";
              e.currentTarget.style.color = "var(--text-dim)";
            }}
          >
            <X size={14} />
          </button>
        </div>
      </div>
      {/* Body — hidden overflow; each app handles its own scroll */}
      <div
        className="relative min-h-0 flex-1 overflow-hidden"
        style={{ background: "var(--bg-0)" }}
      >
        {children}
      </div>
      {!state.maximized && (
        <div
          onMouseDown={startResize}
          className="absolute bottom-0 right-0 h-4 w-4 cursor-nwse-resize"
          aria-label="Resize"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            className="absolute bottom-0.5 right-0.5 opacity-60"
          >
            <path
              d="M13 1L1 13M13 6L6 13M13 11L11 13"
              stroke="var(--resize-handle)"
              strokeWidth="1.2"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
