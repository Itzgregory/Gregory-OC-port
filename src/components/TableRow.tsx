import { useState } from "react";
import { motion } from "framer-motion";
import { Project, EASE } from "@/types/projects";

interface TableRowProps {
  project: Project;
  index: number;
}

export function TableRow({ project, index }: TableRowProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="border-t border-ink-faint/50 hover:border-ink-faint transition-colors duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="grid grid-cols-[4rem_3rem_4rem_1fr_8rem_1fr] gap-4 py-4 px-2 relative z-10 transition-all duration-300"
        animate={{
          backgroundColor: hovered
            ? "hsl(var(--ink-primary))"
            : "transparent",
        }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        <TableRowContent 
          project={project} 
          index={index} 
          hovered={hovered} 
        />
      </motion.div>
    </div>
  );
}

function TableRowContent({
  project,
  index,
  hovered,
}: {
  project: Project;
  index: number;
  hovered: boolean;
}) {
  return (
    <>
      {/* No. */}
      <span
        className="font-mono text-sm transition-colors duration-300"
        style={{ 
          color: hovered ? "hsl(var(--ink-muted))" : "hsl(var(--ink-muted))",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      
      {/* Thumbnail Image - Fixed size */}
      <div className="w-8 h-8 rounded-md overflow-hidden bg-ink-faint/10 flex-shrink-0">
        {project.screenshot ? (
          <img
            src={project.screenshot}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-ink-faint/20" />
        )}
      </div>
      
      {/* Year */}
      <span
        className="font-mono text-sm transition-colors duration-300"
        style={{ 
          color: hovered ? "hsl(var(--ink-muted))" : "hsl(var(--ink-muted))",
        }}
      >
        {project.year}
      </span>
      
      {/* Project Title */}
      <span
        className="font-display transition-all duration-300"
        style={{
          fontSize: "clamp(1rem, 2vw, 1.25rem)",
          color: hovered ? "hsl(var(--background))" : "hsl(var(--ink-primary))",
        }}
      >
        {project.title}
        {project.previewAvailable && project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 font-mono text-xs text-accent hover:text-accent-dark hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            ↗
          </a>
        )}
      </span>
      
      {/* Category */}
      <span
        className="font-mono text-xs transition-all duration-300"
        style={{
          fontSize: "11px",
          color: hovered ? "hsl(var(--accent))" : "hsl(var(--ink-muted))",
          textTransform: "uppercase",
        }}
      >
        {project.category}
      </span>
      
      {/* Stack */}
      <div className="flex flex-wrap gap-1.5">
        {project.stack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="font-mono text-[10px] px-2 py-0.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: hovered ? "hsla(0,0%,100%,0.1)" : "hsla(0,0%,0%,0.05)",
              color: hovered ? "hsl(var(--ink-muted))" : "hsl(var(--ink-muted))",
            }}
          >
            {tech}
          </span>
        ))}
        {project.stack.length > 3 && (
          <span
            className="font-mono text-[10px] px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: hovered ? "hsla(0,0%,100%,0.1)" : "hsla(0,0%,0%,0.05)",
              color: hovered ? "hsl(var(--ink-muted))" : "hsl(var(--ink-muted))",
            }}
          >
            +{project.stack.length - 3}
          </span>
        )}
      </div>
    </>
  );
}