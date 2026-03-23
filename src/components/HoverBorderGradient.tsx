import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface HoverBorderGradientProps {
  children: React.ReactNode;
  className?: string;
  isHovered?: boolean;
}

export function HoverBorderGradient({ children, className, isHovered = false }: HoverBorderGradientProps) {
  return (
    <span className={cn("relative inline-flex", className)}>
      {isHovered && (
        <motion.span
          className="absolute inset-0 rounded-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: "linear-gradient(90deg, hsl(var(--accent)), hsl(var(--accent-dark)), hsl(var(--accent)))",
            backgroundSize: "200% 100%",
            animation: "border-shimmer 2s linear infinite",
            padding: "1px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}
      <span className="relative inline-flex items-center font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink-muted border border-ink-faint px-2 py-[2px] rounded-[2px] whitespace-nowrap">
        {children}
      </span>
    </span>
  );
}
