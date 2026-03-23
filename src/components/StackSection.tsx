import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { InfiniteMovingCards } from "@/components/InfiniteMovingCards";
import { STACK_LIST, STACK_TAGS } from "@/lib/stackList";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { EASE } from "@/types";

export function StackSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(STACK_LIST.length / itemsPerPage);

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

  const startIdx = currentPage * itemsPerPage;
  const currentItems = STACK_LIST.slice(startIdx, startIdx + itemsPerPage);

  return (
    <section id="stack" className="relative border-t border-ink-faint pt-20 pb-24">
      <SectionLabel text="stack" />

      <div className="space-y-4 mb-12">
        <InfiniteMovingCards items={STACK_TAGS} direction="left" speed="slow" />
        <InfiniteMovingCards items={[...STACK_TAGS].reverse()} direction="right" speed="slow" />
      </div>

      {/* Stack List with Pagination */}
      <div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {currentItems.map((item) => (
              <div
                key={item.name}
                className="flex items-baseline justify-between border-t border-ink-faint py-3"
              >
                <span className="font-body text-base text-ink-primary">{item.name}</span>
                <span className="font-mono text-sm text-ink-muted">{item.desc}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col gap-4 mt-8 pt-4 border-t border-ink-faint">
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
    </section>
  );
}