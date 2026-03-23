import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project, EASE } from "@/types/projects";
import { EditBlock } from "./EditBlock";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { getBackgroundStyle } from "@/lib/getBackgroundColours";
import { getGridPosition } from "@/lib/getGridPosition";

interface EditorialLayoutProps {
  projects: Project[];
  itemsPerPage?: number;
}

export function EditorialLayout({ projects, itemsPerPage = 4 }: EditorialLayoutProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  // Auto-rotate slides
  useEffect(() => {
    if (!autoRotate || totalPages <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 9000);

    return () => clearInterval(interval);
  }, [autoRotate, totalPages]);

  const goToPage = (page: number) => {
    setAutoRotate(false);
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  };

  // Get current page projects
  const startIdx = currentPage * itemsPerPage;
  const currentProjects = projects.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="space-y-8">
      {/* Slideshow Container */}
      <div className="relative min-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-auto"
          >
            {currentProjects.map((project, idx) => {
              const gridPosition = getGridPosition(idx);
              const background = getBackgroundStyle(idx);
              
              return (
                <div key={`${project.title}-${currentPage}-${idx}`} className={gridPosition}>
                  <EditBlock
                    project={project}
                    className="h-full"
                    variant="editorial"
                    backgroundColor={background.bg}
                    titleColor={background.titleColor}
                    metaColor={background.metaColor}
                    isLarge={idx === 0 || idx === 3} // First and last items are large
                  />
                </div>
              );
            })}
            
            {/* Fill empty slots with placeholders if needed */}
            {currentProjects.length < itemsPerPage && 
              Array(itemsPerPage - currentProjects.length).fill(null).map((_, idx) => {
                const placeholderIdx = currentProjects.length + idx;
                const gridPosition = getGridPosition(placeholderIdx);
                const background = getBackgroundStyle(placeholderIdx);
                
                return (
                  <div key={`empty-${idx}`} className={gridPosition}>
                    <div
                      className="h-full p-8 flex items-center justify-center rounded-lg border border-dashed"
                      style={{ 
                        backgroundColor: background.bg,
                        borderColor: "hsl(var(--ink-faint))",
                      }}
                    >
                      <span 
                        className="font-mono text-xs text-center"
                        style={{ color: background.metaColor }}
                      >
                        More projects<br />coming soon
                      </span>
                    </div>
                  </div>
                );
              })
            }
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
        <div className="flex flex-col gap-4 pt-4 border-t border-ink-faint">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={prevPage}
                  className={currentPage === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              <PaginationItem>
                <span className="text-sm font-mono text-ink-muted">
                  {currentPage + 1} / {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={nextPage}
                  className={currentPage === totalPages - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

        </div>
      )}
      </div>

    </div>
  );
}