import { useCallback, useEffect, useState } from "react";
import type { AppId } from "../data";

export interface WindowState {
  id: AppId;
  title: string;
  icon: string; // emoji or identifier
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
  payload?: unknown;
}

interface OpenOpts {
  id: AppId;
  title: string;
  icon?: string;
  width?: number;
  height?: number;
  payload?: unknown;
}

let zCounter = 10;

const DEFAULT_SIZE: Record<string, { w: number; h: number }> = {
  about: { w: 720, h: 540 },
  resume: { w: 680, h: 560 },
  experience: { w: 720, h: 520 },
  projects: { w: 820, h: 600 },
  skills: { w: 760, h: 560 },
  philosophy: { w: 660, h: 480 },
  systems: { w: 720, h: 540 },
  security: { w: 720, h: 560 },
  roadmap: { w: 820, h: 540 },
  education: { w: 680, h: 480 },
  goals: { w: 680, h: 480 },
  terminal: { w: 760, h: 520 },
  github: { w: 680, h: 540 },
  contact: { w: 600, h: 460 },
  files: { w: 760, h: 520 },
};

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [topZ, setTopZ] = useState<number>(zCounter);

  const focus = useCallback((id: AppId) => {
    setWindows((ws) => {
      const next = zCounter + 1;
      zCounter = next;
      setTopZ(next);
      return ws.map((w) => (w.id === id ? { ...w, z: next, minimized: false } : w));
    });
  }, []);

  const open = useCallback((opts: OpenOpts) => {
    const size = DEFAULT_SIZE[opts.id] ?? { w: 640, h: 480 };
    const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
    const vh = typeof window !== "undefined" ? window.innerHeight : 768;
    // Never open a window larger than the viewport (fixes mobile / small windows)
    const w = Math.min(opts.width ?? size.w, vw - 16);
    const h = Math.min(opts.height ?? size.h, vh - 120);

    setWindows((ws) => {
      const existing = ws.find((win) => win.id === opts.id);
      if (existing) {
        const next = zCounter + 1;
        zCounter = next;
        setTopZ(next);
        return ws.map((win) =>
          win.id === opts.id ? { ...win, z: next, minimized: false } : win
        );
      }
      const next = zCounter + 1;
      zCounter = next;
      setTopZ(next);
      const offset = (ws.length % 6) * 24;
      const x = Math.max(8, Math.min(120 + offset, vw - w - 8));
      const y = Math.max(32, Math.min(72 + offset, vh - h - 88));
      const win: WindowState = {
        id: opts.id,
        title: opts.title,
        icon: opts.icon ?? "🗔",
        x,
        y,
        width: w,
        height: h,
        z: next,
        minimized: false,
        maximized: false,
        payload: opts.payload,
      };
      return [...ws, win];
    });
  }, []);

  const close = useCallback((id: AppId) => {
    setWindows((ws) => ws.filter((w) => w.id !== id));
  }, []);

  const minimize = useCallback((id: AppId) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: !w.minimized } : w)));
  }, []);

  /** Android "Home": collapse every open window to the taskbar. */
  const minimizeAll = useCallback(() => {
    setWindows((ws) => ws.map((w) => ({ ...w, minimized: true })));
  }, []);

  /** Android "Back": close the focused (top) window. */
  const closeTop = useCallback(() => {
    setWindows((ws) => {
      if (ws.length === 0) return ws;
      const top = [...ws].sort((a, b) => b.z - a.z)[0];
      return ws.filter((w) => w.id !== top.id);
    });
  }, []);

  const toggleMaximize = useCallback((id: AppId) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)));
  }, []);

  const move = useCallback((id: AppId, x: number, y: number) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }, []);

  const resize = useCallback((id: AppId, width: number, height: number) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, width, height } : w)));
  }, []);

  // Keyboard escape closes top window
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && windows.length) {
        const top = [...windows].sort((a, b) => b.z - a.z)[0];
        if (top) close(top.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [windows, close]);

  return {
    windows,
    open,
    close,
    focus,
    minimize,
    minimizeAll,
    closeTop,
    toggleMaximize,
    move,
    resize,
    topZ,
  };
}
