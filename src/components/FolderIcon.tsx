import { useState } from "react";

interface IconProps {
  label: string;
  icon: React.ReactNode;
  onOpen: () => void;
  selected?: boolean;
  onSelect?: () => void;
}

export function DesktopIcon({ label, icon, onOpen, selected, onSelect }: IconProps) {
  const [hover, setHover] = useState(false);
  const active = selected || hover;
  return (
    <button
      onDoubleClick={onOpen}
      onClick={onSelect}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group flex w-24 flex-col items-center gap-1.5 rounded-md p-2 text-center transition-theme focus:outline-none"
      style={{
        background: active ? "var(--icon-bg-selected)" : "transparent",
      }}
      title={`Open ${label}`}
    >
      <div className="folder-icon-shadow flex h-14 w-14 items-center justify-center text-[36px] leading-none">
        {icon}
      </div>
      <span
        className="desktop-label line-clamp-2 max-w-[6.5rem] text-[11.5px] font-medium leading-tight"
        style={{
          color: selected ? "var(--accent)" : "var(--text)",
          textShadow: "var(--icon-shadow)",
        }}
      >
        {label}
      </span>
    </button>
  );
}
