import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useMobileNav } from "@/hooks/useMobileNav";
import { EASE } from "@/types";
import { NAV_LINKS } from "@/lib/navLink";

export function MobileNav() {
  const { isOpen, openMenu, closeMenu, scrollTo } = useMobileNav();

  return (
    <div className="lg:hidden">
      <button
        onClick={openMenu}
        className="fixed top-6 right-6 z-[60] flex flex-col justify-center items-center w-10 h-10"
        aria-label="Open menu"
      >
        <span className="block w-6 h-px bg-ink-primary mb-1.5" />
        <span className="block w-6 h-px bg-ink-primary mb-1.5" />
        <span className="block w-6 h-px bg-ink-primary" />
      </button>

      <Sheet open={isOpen} onOpenChange={closeMenu}>
        <SheetContent side="right" className="bg-background border-l border-ink-faint w-[280px] p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div className="flex flex-col justify-center h-full px-8">
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                onClick={() => scrollTo(link)}
                className="font-mono text-sm uppercase tracking-[0.2em] text-ink-primary py-4 text-left hover:text-accent transition-colors duration-base ease-editorial"
              >
                ../{link}
              </motion.button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}