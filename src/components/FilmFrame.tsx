// components/FilmFrame.tsx
import { motion } from "framer-motion";
import { Project, EASE } from "@/types/projects";
import { getBackgroundStyle } from "@/lib/getBackgroundColours";

interface FilmFrameProps {
  project: Project;
  index: number;
  isExpanded: boolean;
  onExpand: () => void;
}

export function FilmFrame({ project, index, isExpanded, onExpand }: FilmFrameProps) {
  const backgroundStyle = getBackgroundStyle(index);

  return (
    <motion.div
      layout
      onClick={onExpand}
      className="shrink-0 flex flex-col justify-between p-4 cursor-pointer select-none overflow-hidden"
      style={{
        width: isExpanded ? 320 : 160,
        height: 340,
        backgroundColor: backgroundStyle.bg,
      }}
      transition={{ duration: 0.5, ease: EASE }}
      data-cursor-text={isExpanded ? "close" : "open"}
    >
      {!isExpanded ? (
        <FilmFrameCompact project={project} backgroundStyle={backgroundStyle} />
      ) : (
        <FilmFrameExpanded project={project} backgroundStyle={backgroundStyle} />
      )}
    </motion.div>
  );
}

function FilmFrameCompact({ 
  project, 
  backgroundStyle 
}: { 
  project: Project;
  backgroundStyle: { bg: string; titleColor: string; metaColor: string };
}) {
  return (
    <>
      <span
        className="font-display text-center"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          fontSize: "18px",
          color: backgroundStyle.titleColor,
          margin: "auto",
        }}
      >
        {project.title}
      </span>
      <div className="mt-auto">
        <span
          className="font-mono block text-center"
          style={{ fontSize: "10px", color: backgroundStyle.metaColor }}
        >
          {project.year}
        </span>
        <span
          className="font-mono block text-center"
          style={{ fontSize: "10px", color: backgroundStyle.metaColor }}
        >
          {project.category}
        </span>
      </div>
    </>
  );
}

function FilmFrameExpanded({ 
  project, 
  backgroundStyle 
}: { 
  project: Project;
  backgroundStyle: { bg: string; titleColor: string; metaColor: string };
}) {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h3
          className="font-display mb-2"
          style={{ 
            fontSize: "20px", 
            color: backgroundStyle.titleColor 
          }}
        >
          {project.title}
        </h3>
        
        {/* Screenshot/Image */}
        {project.screenshot && (
          <div className="mb-3 rounded-md overflow-hidden">
            <img
              src={project.screenshot}
              alt={project.title}
              className="w-full h-auto object-cover"
              style={{ maxHeight: "120px" }}
            />
          </div>
        )}
        
        <p
          className="font-body text-sm leading-relaxed mb-3"
          style={{ color: backgroundStyle.metaColor }}
        >
          {project.description}
        </p>
        <p
          className="font-mono text-xs"
          style={{ color: backgroundStyle.metaColor }}
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
          style={{ fontSize: "10px", color: backgroundStyle.metaColor }}
        >
          {project.year} · {project.category}
        </span>
      </div>
    </div>
  );
}

