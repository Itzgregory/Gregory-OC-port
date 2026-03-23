import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project, EASE } from "@/types/projects";
import { TableRow } from "./TableRow";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";

interface IndexTableLayoutProps {
  projects: Project[];
  itemsPerPage?: number;
}

export function IndexTableLayout({ projects, itemsPerPage = 5 }: IndexTableLayoutProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const goToPage = (page: number) => {
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

  const handleSliderChange = (value: number[]) => {
    goToPage(Math.round(value[0]));
  };

  const startIdx = currentPage * itemsPerPage;
  const currentProjects = projects.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <div className="min-w-[768px]">
          {/* Header */}
          <div className="grid grid-cols-[4rem_3rem_4rem_1fr_8rem_1fr] gap-4 py-3 border-b-2 border-ink-faint">
            {["No.", "", "Year", "Project", "Category", "Stack"].map((header, idx) => (
              <span 
                key={idx} 
                className="font-mono text-xs uppercase tracking-[0.15em] text-ink-muted select-none"
              >
                {header}
              </span>
            ))}
          </div>

          {/* Rows */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {currentProjects.map((project, i) => (
                <TableRow 
                  key={project.title} 
                  project={project} 
                  index={startIdx + i}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {currentProjects.length === 0 && (
            <div className="py-12 text-center">
              <span className="font-mono text-sm text-ink-muted">
                No projects found
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Pagination Controls */}
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
  );
}