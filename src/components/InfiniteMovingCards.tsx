import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface InfiniteMovingCardsProps {
  items: string[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "slow",
  className,
}: InfiniteMovingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const duration = speed === "fast" ? "20s" : speed === "normal" ? "30s" : "40s";
    container.style.setProperty("--scroll-duration", duration);
  }, [speed]);

  const animationClass = direction === "left" ? "animate-scroll-left" : "animate-scroll-right";

  return (
    <div className={cn("overflow-hidden", className)}>
      <div className={cn("flex w-max gap-4", animationClass)}>
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center font-mono text-xs uppercase tracking-[0.15em] text-ink-muted border border-ink-faint px-3 py-1.5 rounded-[2px] whitespace-nowrap shrink-0"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
