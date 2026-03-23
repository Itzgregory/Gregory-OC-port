import { useState, useRef, useEffect } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { FilmFrame } from "./FilmFrame";
import { Project } from "@/types/projects";

interface FilmRollLayoutProps {
  projects: Project[];
}

export function FilmRollLayout({ projects }: FilmRollLayoutProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemsPerView = 5;
  const totalPages = Math.ceil(projects.length / itemsPerView);

  const goToPage = (page: number) => {
    setCurrentIndex(Math.max(0, Math.min(page, totalPages - 1)));
    setExpandedId(null);
  };

  const nextPage = () => {
    if (currentIndex < totalPages - 1) {
      goToPage(currentIndex + 1);
    }
  };

  const previousPage = () => {
    if (currentIndex > 0) {
      goToPage(currentIndex - 1);
    }
  };

  const handleFrameClick = (projectId: string) => {
    setExpandedId(expandedId === projectId ? null : projectId);
  };

  const startIdx = currentIndex * itemsPerView;
  const currentProjects = projects.slice(startIdx, startIdx + itemsPerView);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [currentIndex]);

  return (
    <div className="space-y-6">
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div ref={scrollRef} className="flex gap-3 py-4">
          {currentProjects.map((project, idx) => {
            const globalIndex = startIdx + idx;
            return (
              <div
                key={project.title}
                className="inline-block"
                style={{ scrollSnapAlign: "start" }}
              >
                <FilmFrame
                  project={project}
                  index={globalIndex}
                  isExpanded={expandedId === project.title}
                  onExpand={() => handleFrameClick(project.title)}
                />
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {totalPages > 1 && (
        <div className="flex flex-col gap-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={previousPage}
                  className={currentIndex === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              <PaginationItem>
                <span className="text-sm text-muted-foreground">
                  Page {currentIndex + 1} of {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={nextPage}
                  className={currentIndex === totalPages - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}