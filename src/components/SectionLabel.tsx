import { useParallaxLabel } from "@/hooks/useParallaxLabel";

interface SectionLabelProps {
  text: string;
}

export function SectionLabel({ text }: SectionLabelProps) {
  const ref = useParallaxLabel();

  return (
    <span
      ref={ref}
      className="absolute top-8 left-0 text-xs font-mono uppercase tracking-[0.2em] text-ink-muted select-none"
    >
      ../{text}
    </span>
  );
}