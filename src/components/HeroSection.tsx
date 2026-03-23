import { motion } from "framer-motion";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";
import { MARQUEE_TEXT } from "@/lib/stackList";

export function HeroSection() {
  const { nameRef, subtitleRef, ruleRef, marqueeRef } = useHeroAnimation();

  return (
   <section className="flex flex-col justify-center min-h-[65vh]">
      <h1
        ref={nameRef}
        className="font-display text-ink-primary tracking-tight"
        style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.95 }}
      >
        {"Gregory\nOpara\nChukwuma"}
      </h1>
      <p
        ref={subtitleRef}
        className="mt-6 text-xs font-body uppercase tracking-[0.2em] text-ink-muted"
      >
        Software Engineer
      </p>
      <hr ref={ruleRef} className="mt-6 border-ink-faint" />

      <div ref={marqueeRef} className="mt-6 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint pr-4">
            {MARQUEE_TEXT}{MARQUEE_TEXT}
          </span>
        </motion.div>
      </div>
    </section>
  );
}