import { LayoutType, LAYOUTS } from "@/types/projects";

interface LayoutSwitcherProps {
  active: LayoutType;
  onChange: (layout: LayoutType) => void;
}

export function LayoutSwitcher({ active, onChange }: LayoutSwitcherProps) {
  return (
    <div className="flex items-center gap-3">
      <span 
        className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted select-none"
      >
        Switch Layout:
      </span>
      <div className="flex gap-1">
        {LAYOUTS.map((layout) => (
          <button
            key={layout}
            onClick={() => onChange(layout)}
            className="font-mono uppercase tracking-[0.2em] px-2 py-1 border transition-colors duration-base ease-editorial"
            style={{
              fontSize: "9px",
              borderColor: "hsl(var(--ink-faint))",
              backgroundColor: active === layout ? "hsl(var(--ink-primary))" : "transparent",
              color: active === layout ? "hsl(var(--background))" : "hsl(var(--ink-muted))",
            }}
          >
            {layout}
          </button>
        ))}
      </div>
    </div>
  );
}