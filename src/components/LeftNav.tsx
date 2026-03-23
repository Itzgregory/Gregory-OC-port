import { motion } from "framer-motion";
import { useSectionObserver } from "@/hooks/useSectionObserver";
import { EASE } from "@/types";
import { NAV_LINKS } from "@/lib/navLink";

export function LeftNav() {
  const activeSection = useSectionObserver();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
      {NAV_LINKS.map((link) => {
        const isActive = activeSection === link;
        return (
          <button
            key={link}
            onClick={() => scrollTo(link)}
            className="relative font-mono text-xs uppercase tracking-[0.2em] text-left py-1 transition-colors duration-base ease-editorial"
            style={{ color: isActive ? "hsl(var(--ink-primary))" : "hsl(var(--ink-muted))" }}
          >
            ../{link}
            {isActive && (
              <motion.span
                layoutId="nav-underline"
                className="absolute -bottom-0.5 left-0 w-full h-px bg-ink-primary"
                transition={{ duration: 0.3, ease: EASE }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}