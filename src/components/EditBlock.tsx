import { motion } from "framer-motion";
import { Project, EASE } from "@/types/projects";

interface EditBlockProps {
  project: Project;
  className?: string;
  variant?: "editorial" | "compact";
  backgroundColor?: string;
  titleColor?: string;
  metaColor?: string;
  isLarge?: boolean;
}

export function EditBlock({ 
  project, 
  className = "", 
  variant = "editorial",
  backgroundColor = "hsl(var(--background))",
  titleColor = "hsl(var(--ink-primary))",
  metaColor = "hsl(var(--ink-muted))",
  isLarge = false,
}: EditBlockProps) {
  const isEditorial = variant === "editorial";

  return (
    <motion.div
      className={`relative group overflow-hidden rounded-lg transition-all duration-300 ${className}`}
      style={{
        backgroundColor,
        border: "1px solid hsl(var(--ink-faint))",
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      {/* Image Section - Centered above content */}
      {project.screenshot && (
        <div className="relative w-full overflow-hidden">
          <div className={`flex items-center justify-center p-6 ${isLarge ? 'aspect-video' : 'aspect-square'}`}>
            <img
              src={project.screenshot}
              alt={project.title}
              className="max-w-full max-h-full object-contain rounded-md shadow-lg transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
        </div>
      )}

      {/* Content */}
      <div className={`relative ${isLarge ? 'p-8' : 'p-6'} space-y-3`}>
        {/* Category and Year */}
        <div className="flex items-center gap-2 flex-wrap">
          <span 
            className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: "hsla(0,0%,0%,0.05)",
              color: metaColor,
            }}
          >
            {project.category}
          </span>
          <span 
            className="font-mono text-[10px]"
            style={{ color: metaColor }}
          >
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-display leading-tight"
          style={{
            fontSize: isLarge 
              ? "clamp(1.5rem, 3vw, 2rem)" 
              : "clamp(1.125rem, 2vw, 1.5rem)",
            color: titleColor,
          }}
        >
          {project.title}
        </h3>

        {/* Description - only for larger blocks */}
        {isLarge && isEditorial && (
          <p
            className="font-body text-sm leading-relaxed line-clamp-3"
            style={{ color: metaColor }}
          >
            {project.description}
          </p>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.stack.slice(0, isLarge ? 4 : 3).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[9px] px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "hsla(0,0%,0%,0.05)",
                color: metaColor,
              }}
            >
              {tech}
            </span>
          ))}
          {project.stack.length > (isLarge ? 4 : 3) && (
            <span
              className="font-mono text-[9px] px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "hsla(0,0%,0%,0.05)",
                color: metaColor,
              }}
            >
              +{project.stack.length - (isLarge ? 4 : 3)}
            </span>
          )}
        </div>

        {/* View Link */}
        {project.previewAvailable && project.url && (
          <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 5 }}
            whileHover={{ opacity: 1, y: 0, x: 4 }}
            className="inline-flex items-center gap-1 font-mono text-xs text-accent hover:text-accent-dark transition-all duration-base ease-editorial"
            onClick={(e) => e.stopPropagation()}
          >
            View Project
            <span className="text-sm">→</span>
          </motion.a>
        )}
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-accent/0 rounded-lg transition-all duration-300 group-hover:border-accent/20 pointer-events-none" />
    </motion.div>
  );
}