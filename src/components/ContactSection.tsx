import { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useCharacterScramble } from "@/hooks/useCharacterScramble";
import { EASE } from "@/types";
import { SectionLabel } from "./SectionLabel";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const emailRef = useRef<HTMLAnchorElement>(null);
  const scramble = useCharacterScramble();

  const handleEmailHover = useCallback(() => {
    if (emailRef.current) {
      scramble(emailRef.current, "Oparagregory7@gmail.com", 0.4);
    }
  }, [scramble]);

  return (
    <section
      id="contact"
      className="relative pt-20 pb-32 -mx-8 px-8"
      style={{ backgroundColor: "hsl(var(--background-dark))" }}
    >
      <div className="max-w-[820px] mx-auto relative">
        <SectionLabel text="contact" />

        <div ref={ref} className="pt-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <a
              ref={emailRef}
              href="mailto:Oparagregory7@gmail.com"
              onMouseEnter={handleEmailHover}
              className="block font-display transition-colors duration-base ease-editorial"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                lineHeight: 1.2,
                color: "hsl(var(--background))",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "hsl(var(--accent))")}
              onMouseOut={(e) => (e.currentTarget.style.color = "hsl(var(--background))")}
            >
              Oparagregory7@gmail.com
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="mt-6 text-xs font-body uppercase tracking-[0.2em]"
            style={{ color: "hsl(var(--ink-muted))" }}
          >
            Open to roles. Selective with projects. Fast to respond.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            className="mt-6 flex items-center gap-3 font-mono text-sm"
            style={{ color: "hsl(var(--ink-muted))" }}
          >
            <ContactLink href="https://github.com/itzgregory" text="GitHub" />
            <span style={{ color: "hsl(var(--ink-faint))" }}>·</span>
            <ContactLink href="https://www.linkedin.com/in/gregory-opara-622591247/" text="LinkedIn" />
            <span style={{ color: "hsl(var(--ink-faint))" }}>·</span>
            <ContactLink href="#" text="CV" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactLink({ href, text }: { href: string; text: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80 transition-opacity duration-base ease-editorial"
      style={{ color: "hsl(var(--background))" }}
    >
      {text}
    </a>
  );
}