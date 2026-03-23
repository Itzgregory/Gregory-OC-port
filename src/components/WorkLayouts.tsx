import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HoverBorderGradient } from "@/components/HoverBorderGradient";
import { useCharacterScramble } from "@/hooks/useCharacterScramble";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];

interface Project {
  year: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  previewAvailable: boolean;
  url?: string;
  screenshot?: string;
}

/* ── Layout Switcher ─────────────────────────────────────────── */

const LAYOUTS = ["FILM", "EDIT", "TABLE", "DECK"] as const;
type LayoutType = (typeof LAYOUTS)[number];

export function LayoutSwitcher({
  active,
  onChange,
}: {
  active: LayoutType;
  onChange: (l: LayoutType) => void;
}) {
  return (
    <div className="flex gap-1">
      {LAYOUTS.map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className="font-mono uppercase tracking-[0.2em] px-2 py-1 border transition-colors duration-base ease-editorial"
          style={{
            fontSize: "9px",
            borderColor: "hsl(var(--ink-faint))",
            backgroundColor:
              active === l ? "hsl(var(--ink-primary))" : "transparent",
            color:
              active === l ? "hsl(var(--background))" : "hsl(var(--ink-muted))",
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

/* ── Layout A: Film Roll ─────────────────────────────────────── */

function FilmFrame({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setExpanded((o) => !o)}
      className="shrink-0 flex flex-col justify-between p-4 cursor-pointer select-none overflow-hidden"
      style={{
        width: expanded ? 320 : 160,
        height: 340,
        backgroundColor: "hsl(var(--ink-primary))",
      }}
      transition={{ duration: 0.5, ease: EASE }}
      data-cursor-text="open"
    >
      {!expanded ? (
        <>
          <span
            className="font-display text-center"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              fontSize: "18px",
              color: "hsl(var(--background))",
              margin: "auto",
            }}
          >
            {project.title}
          </span>
          <div className="mt-auto">
            <span
              className="font-mono block text-center"
              style={{ fontSize: "10px", color: "hsl(var(--ink-muted))" }}
            >
              {project.year}
            </span>
            <span
              className="font-mono block text-center"
              style={{ fontSize: "10px", color: "hsl(var(--ink-muted))" }}
            >
              {project.category}
            </span>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-between h-full">
          <div>
            <h3
              className="font-display mb-2"
              style={{ fontSize: "20px", color: "hsl(var(--background))" }}
            >
              {project.title}
            </h3>
            <p
              className="font-body text-sm leading-relaxed mb-3"
              style={{ color: "hsl(var(--ink-muted))" }}
            >
              {project.description}
            </p>
            <p
              className="font-mono"
              style={{ fontSize: "11px", color: "hsl(var(--ink-muted))" }}
            >
              {project.stack.join(", ")}
            </p>
          </div>
          {project.previewAvailable && project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="font-mono text-sm text-accent hover:text-accent-dark hover:underline transition-colors duration-base ease-editorial mt-4"
            >
              View Project →
            </a>
          )}
          <div className="mt-2">
            <span
              className="font-mono"
              style={{ fontSize: "10px", color: "hsl(var(--ink-muted))" }}
            >
              {project.year} · {project.category}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export function FilmRollLayout({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Only pin on desktop
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const scrollWidth = track.scrollWidth - container.offsetWidth;
      gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollWidth}`,
        },
      });
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-3 py-4 md:py-0"
        style={{ touchAction: "pan-x" }}
      >
        {projects.map((p, i) => (
          <FilmFrame key={p.title} project={p} index={i} />
        ))}
      </div>
      {/* Mobile: allow horizontal scroll */}
      <style>{`
        @media (max-width: 767px) {
          [data-film-track] { overflow-x: auto; -webkit-overflow-scrolling: touch; }
        }
      `}</style>
    </div>
  );
}

/* ── Layout B: Editorial Spread ──────────────────────────────── */

export function EditorialLayout({ projects }: { projects: Project[] }) {
  const [p0, p1, p2, p3] = projects;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* Block 1: full width, dark */}
      <EditBlock
        project={p0}
        className="md:col-span-2 p-8"
        style={{ backgroundColor: "hsl(var(--ink-primary))" }}
        titleColor="hsl(var(--background))"
        metaColor="hsl(var(--ink-muted))"
        large
      />
      {/* Block 2: left, warm cream */}
      <EditBlock
        project={p1}
        className="p-8"
        style={{ backgroundColor: "hsl(var(--background-hover))" }}
        titleColor="hsl(var(--ink-primary))"
        metaColor="hsl(var(--ink-muted))"
        showDescription
      />
      {/* Block 3: right, accent */}
      <EditBlock
        project={p2}
        className="p-8"
        style={{ backgroundColor: "hsl(var(--accent))" }}
        titleColor="hsl(var(--background))"
        metaColor="hsla(40,33%,96%,0.7)"
      />
      {/* Block 4: full width, cream, footnote style */}
      <div
        className="md:col-span-2 p-8 flex flex-col md:flex-row items-baseline justify-between gap-4 group relative"
        style={{ backgroundColor: "hsl(var(--background))" }}
      >
        <h3
          className="font-display"
          style={{
            fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
            color: "hsl(var(--ink-primary))",
          }}
        >
          {p3.title}
        </h3>
        <div className="border-t border-ink-faint flex-1 mx-4 hidden md:block" />
        <span className="font-mono text-sm text-ink-muted">
          {p3.stack.join(", ")}
        </span>
        {p3.previewAvailable && p3.url && (
          <motion.a
            href={p3.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            whileHover={{ opacity: 1 }}
            className="absolute bottom-3 right-8 font-mono text-xs text-accent hover:text-accent-dark hover:underline opacity-0 group-hover:opacity-100 transition-all duration-base ease-editorial"
          >
            View Project →
          </motion.a>
        )}
      </div>
    </div>
  );
}

function EditBlock({
  project,
  className,
  style,
  titleColor,
  metaColor,
  large,
  showDescription,
}: {
  project: Project;
  className?: string;
  style?: React.CSSProperties;
  titleColor: string;
  metaColor: string;
  large?: boolean;
  showDescription?: boolean;
}) {
  return (
    <div className={`relative group ${className || ""}`} style={style}>
      <h3
        className="font-display"
        style={{
          fontSize: large
            ? "clamp(2rem, 4vw, 3rem)"
            : "clamp(1.25rem, 2.5vw, 1.75rem)",
          color: titleColor,
          lineHeight: 1.1,
        }}
      >
        {project.title}
      </h3>
      {showDescription && (
        <p
          className="font-body text-sm leading-relaxed mt-3 max-w-sm"
          style={{ color: metaColor }}
        >
          {project.description}
        </p>
      )}
      <div className="mt-3 flex gap-3 items-center">
        <span className="font-mono" style={{ fontSize: "11px", color: metaColor }}>
          {project.year}
        </span>
        <span className="font-mono" style={{ fontSize: "11px", color: metaColor }}>
          {project.category}
        </span>
      </div>
      {project.previewAvailable && project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 font-mono text-xs text-accent hover:text-accent-dark hover:underline opacity-0 group-hover:opacity-100 transition-all duration-base ease-editorial translate-y-2 group-hover:translate-y-0"
        >
          View Project →
        </a>
      )}
    </div>
  );
}

/* ── Layout C: Index Table ───────────────────────────────────── */

export function IndexTableLayout({ projects }: { projects: Project[] }) {
  return (
    <div>
      {/* Header */}
      <div className="hidden md:grid grid-cols-[3rem_4rem_1fr_8rem_1fr] gap-4 py-2 border-b border-ink-faint">
        {["No.", "Year", "Project", "Category", "Stack"].map((h) => (
          <span key={h} className="font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">
            {h}
          </span>
        ))}
      </div>
      {projects.map((p, i) => (
        <TableRow key={p.title} project={p} index={i} />
      ))}
    </div>
  );
}

function TableRow({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const quickX = useRef<gsap.QuickToFunc | null>(null);
  const quickY = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (!imgRef.current) return;
    quickX.current = gsap.quickTo(imgRef.current, "x", {
      duration: 0.3,
      ease: "power3.out",
    });
    quickY.current = gsap.quickTo(imgRef.current, "y", {
      duration: 0.3,
      ease: "power3.out",
    });
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!rowRef.current || !hovered) return;
      const rect = rowRef.current.getBoundingClientRect();
      quickX.current?.(e.clientX - rect.left - 100);
      quickY.current?.(e.clientY - rect.top - 60);
    },
    [hovered]
  );

  return (
    <div
      ref={rowRef}
      className="relative border-t border-ink-faint"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-[3rem_4rem_1fr_8rem_1fr] gap-2 md:gap-4 py-4 px-2 relative z-10"
        animate={{
          backgroundColor: hovered
            ? "hsl(var(--ink-primary))"
            : "hsla(0,0%,0%,0)",
        }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        <span
          className="font-mono text-sm hidden md:block"
          style={{ color: hovered ? "hsl(var(--ink-muted))" : "hsl(var(--ink-muted))" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className="font-mono text-sm"
          style={{
            color: hovered ? "hsl(var(--ink-muted))" : "hsl(var(--ink-muted))",
          }}
        >
          {project.year}
        </span>
        <span
          className="font-display transition-colors duration-base"
          style={{
            fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
            color: hovered
              ? "hsl(var(--background))"
              : "hsl(var(--ink-primary))",
          }}
        >
          {project.title}
          {project.previewAvailable && project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 font-mono text-xs text-accent hover:text-accent-dark hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              ↗
            </a>
          )}
        </span>
        <span
          className="font-mono transition-colors duration-base"
          style={{
            fontSize: "11px",
            color: hovered ? "hsl(var(--accent))" : "hsl(var(--ink-muted))",
          }}
        >
          {project.category}
        </span>
        <span
          className="font-mono text-xs hidden md:block transition-colors duration-base"
          style={{
            color: hovered ? "hsl(var(--ink-muted))" : "hsl(var(--ink-muted))",
          }}
        >
          {project.stack.join(", ")}
        </span>
      </motion.div>

      {/* Floating screenshot */}
      {project.screenshot && (
        <div
          ref={imgRef}
          className="absolute top-0 left-0 pointer-events-none z-20"
          style={{
            width: 200,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s",
            transform: "rotate(-2deg)",
          }}
        >
          <img
            src={project.screenshot}
            alt={project.title}
            className="w-full shadow-md"
          />
        </div>
      )}
    </div>
  );
}

/* ── Layout D: Stacked Deck (Default) ────────────────────────── */

const DECK_COLORS = [
  "hsl(var(--ink-primary))",
  "#2d2520",
  "#3d2e1e",
  "hsl(var(--accent))",
];
const DECK_ROTATIONS = [0, 1.2, -0.8, 1.5];

export function StackedDeckLayout({ projects }: { projects: Project[] }) {
  const [order, setOrder] = useState(projects.map((_, i) => i));
  const [exitingIdx, setExitingIdx] = useState<number | null>(null);

  const handleClick = () => {
    if (order.length <= 1) {
      // Reset deck
      setOrder(projects.map((_, i) => i));
      return;
    }
    setExitingIdx(order[0]);
    setTimeout(() => {
      setOrder((prev) => prev.slice(1));
      setExitingIdx(null);
    }, 500);
  };

  const handleReset = () => {
    setOrder([]);
    setTimeout(() => {
      setOrder(projects.map((_, i) => i));
    }, 100);
  };

  return (
    <div
      className="relative cursor-pointer select-none"
      style={{ height: 300 }}
      onClick={order.length === 0 ? handleReset : handleClick}
      data-cursor-text="open"
    >
      <AnimatePresence>
        {order.map((projIdx, stackPos) => {
          const project = projects[projIdx];
          const isTop = stackPos === 0;
          const isExiting = exitingIdx === projIdx;

          return (
            <motion.div
              key={projIdx}
              className="absolute inset-x-0 top-0 p-6 flex flex-col justify-between overflow-hidden"
              style={{
                height: 260,
                backgroundColor: DECK_COLORS[projIdx % DECK_COLORS.length],
                zIndex: order.length - stackPos,
              }}
              initial={{ opacity: 0, y: 20, rotate: DECK_ROTATIONS[projIdx % DECK_ROTATIONS.length] }}
              animate={
                isExiting
                  ? { y: "-120%", rotate: -8, opacity: 0 }
                  : {
                      opacity: 1,
                      y: stackPos * 8,
                      rotate: isTop ? 0 : DECK_ROTATIONS[projIdx % DECK_ROTATIONS.length],
                    }
              }
              exit={{ y: "-120%", rotate: -8, opacity: 0 }}
              transition={{
                duration: isExiting ? 0.5 : 0.4,
                delay: isExiting ? 0 : stackPos * 0.08,
                ease: EASE,
              }}
            >
              <div className="flex justify-between items-start">
                <span
                  className="font-mono"
                  style={{ fontSize: "11px", color: "hsl(var(--ink-muted))" }}
                >
                  {String(projIdx + 1).padStart(2, "0")}
                </span>
                <span
                  className="font-mono"
                  style={{ fontSize: "11px", color: "hsl(var(--ink-muted))" }}
                >
                  {project.category}
                </span>
              </div>
              <div>
                <h3
                  className="font-display mb-2"
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                    color: "hsl(var(--background))",
                    lineHeight: 1.1,
                  }}
                >
                  {project.title}
                </h3>
                <p
                  className="font-body text-sm max-w-md"
                  style={{ color: "hsla(40,33%,96%,0.6)" }}
                >
                  {project.description.slice(0, 80)}…
                </p>
              </div>
              <div className="flex justify-between items-end">
                <span
                  className="font-mono"
                  style={{ fontSize: "11px", color: "hsl(var(--ink-muted))" }}
                >
                  {project.year}
                </span>
                {project.previewAvailable && project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="font-mono text-xs text-accent hover:text-accent-dark hover:underline transition-colors duration-base ease-editorial"
                  >
                    View Project →
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      {order.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
            Click to reset deck
          </span>
        </div>
      )}
    </div>
  );
}

/* ── Exported Work Section ───────────────────────────────────── */

export function WorkSection({ projects }: { projects: Project[] }) {
  const [layout, setLayout] = useState<LayoutType>("DECK");

  return (
    <section id="work" className="relative border-t border-ink-faint pt-20 pb-24">
      {/* Header row */}
      <div className="flex items-baseline justify-between mb-8">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-ink-muted select-none">
          ~/work
        </span>
        <LayoutSwitcher active={layout} onChange={setLayout} />
      </div>

      {/* Layout content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={layout}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {layout === "FILM" && <FilmRollLayout projects={projects} />}
          {layout === "EDIT" && <EditorialLayout projects={projects} />}
          {layout === "TABLE" && <IndexTableLayout projects={projects} />}
          {layout === "DECK" && <StackedDeckLayout projects={projects} />}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
