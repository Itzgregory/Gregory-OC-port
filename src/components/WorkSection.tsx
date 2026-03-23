import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project, LayoutType, EASE } from "@/types/projects";
import { LayoutSwitcher } from "./LayoutSwitcher";
import { FilmRollLayout } from "./FilmRollLayout";
import { EditorialLayout } from "./EditorialLayout";
import { IndexTableLayout } from "./IndexTableLayout";
import { SectionLabel } from "./SectionLabel";

interface WorkSectionProps {
  projects: Project[];
}

export function WorkSection({ projects }: WorkSectionProps) {
  const [layout, setLayout] = useState<LayoutType>("TABLE");

  return (
    <section id="work" className="relative border-t border-ink-faint pt-20 pb-24">
      <SectionLabel text="work" />
      
      <div className="flex items-baseline justify-between mb-8">
        <div className="w-20" /> 
        {/* Spacer to balance the layout */}
        <LayoutSwitcher active={layout} onChange={setLayout} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={layout}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <LayoutRenderer layout={layout} projects={projects} />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function LayoutRenderer({ layout, projects }: { layout: LayoutType; projects: Project[] }) {
  switch (layout) {
    case "FILM":
      return <FilmRollLayout projects={projects} />;
    case "EDIT":
      return <EditorialLayout projects={projects} />;
    case "TABLE":
      return <IndexTableLayout projects={projects} />;
    default:
      return null;
  }
}