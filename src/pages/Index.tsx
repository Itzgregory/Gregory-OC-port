import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";
import portrait from "@/assets/portrait.jpg";
import projectIdmenaija from "@/assets/project-idmenaija.jpg";
import projectAdedeji from "@/assets/project-adedeji.jpg";
import projectEverfresh from "@/assets/project-everfresh.jpg";
import projectHustletrack from "@/assets/project-hustletrack.jpg";
import { CustomCursor } from "@/components/CustomCursor";
import { InfiniteMovingCards } from "@/components/InfiniteMovingCards";
import { ScrollReveal, StaggerReveal } from "@/components/ScrollReveal";
import { HoverBorderGradient } from "@/components/HoverBorderGradient";
import { useCharacterScramble } from "@/hooks/useCharacterScramble";
import { WorkSection } from "@/components/WorkLayouts";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";

/* ── Data ─────────────────────────────────────────────────────── */

const NAV_LINKS = ["about", "work", "stack", "contact"] as const;

interface Project {
  year: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  previewAvailable: boolean;
  url?: string;
  screenshot?: string;
}

const PROJECTS: Project[] = [
  {
    year: "2025",
    title: "ID Me Naija",
    category: "API Platform",
    description:
      "Nigerian identity verification platform built with React, TypeScript and Vite. Designed for speed, clarity, and trust — the kind of product where every millisecond of perceived performance matters.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    previewAvailable: true,
    url: "https://idmenaija.com",
    screenshot: projectIdmenaija,
  },
  {
    year: "2025",
    title: "Adedeji & Co.",
    category: "Web App",
    description:
      "Corporate law firm website with an editorial layout and TanStack Router. Typography-first design language that lets the content breathe while maintaining the gravitas the profession demands.",
    stack: ["React", "TypeScript", "Vite", "TanStack Router", "Tailwind CSS"],
    previewAvailable: true,
    url: "https://adedejiandco.com",
    screenshot: projectAdedeji,
  },
  {
    year: "2024",
    title: "EverFresh",
    category: "Web App",
    description:
      "Multi-service agency site with Framer Motion animations and a custom design system. Every interaction was choreographed — nothing moves without reason.",
    stack: ["React", "TypeScript", "TanStack Router", "Framer Motion", "Radix UI"],
    previewAvailable: true,
    url: "https://everfresh.com.ng",
    screenshot: projectEverfresh,
  },
  {
    year: "2024",
    title: "HustleTrack",
    category: "Web App",
    description:
      "Fintech expense tracker targeting Nigerian users, built with .NET 9 and DDD architecture. Clean separation of concerns on the backend, React on the front.",
    stack: [".NET 9", "C#", "CQRS", "React"],
    previewAvailable: true,
    url: "https://hustletrack.app",
    screenshot: projectHustletrack,
  },
];

const STACK_LIST = [
  { name: "React", desc: "UI architecture" },
  { name: "TypeScript", desc: "type safety" },
  { name: "Next.js", desc: "full-stack framework" },
  { name: "Vite", desc: "build tooling" },
  { name: "Tailwind CSS", desc: "utility-first styling" },
  { name: "TanStack Router", desc: "type-safe routing" },
  { name: "Framer Motion", desc: "animation library" },
  { name: "Radix UI", desc: "accessible primitives" },
  { name: ".NET / C#", desc: "backend services" },
  { name: "Git", desc: "version control" },
];

const STACK_TAGS = [
  "React", "TypeScript", "Next.js", "Vite", "Tailwind CSS", "TanStack Router",
  "Framer Motion", "Radix UI", "C#", ".NET 9", "GSAP", "Git",
];

const MARQUEE_TEXT = "React — TypeScript — Next.js — Vite — Tailwind CSS — TanStack Router — Framer Motion — .NET — ";

/* ── Easing ────────────────────────────────────────────────────── */

const EASE = [0.4, 0, 0.2, 1] as const;

/* ── Parallax Section Label ───────────────────────────────────── */

function SectionLabel({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const offset = (window.innerHeight - rect.top) * 0.15;
      el.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <span
      ref={ref}
      className="absolute top-8 left-0 text-xs font-mono uppercase tracking-[0.2em] text-ink-muted select-none"
    >
      ~/{text}
    </span>
  );
}

/* ── Work Row removed — now in WorkLayouts.tsx ──────────────── */

/* ── Left Nav ─────────────────────────────────────────────────── */

function LeftNav() {
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLElement>(null);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: 0.3 }
    );

    NAV_LINKS.forEach((link) => {
      const el = document.getElementById(link);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav ref={navRef} className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
      {NAV_LINKS.map((link) => {
        const isActive = activeSection === link;
        return (
          <button
            key={link}
            onClick={() => scrollTo(link)}
            className="relative font-mono text-xs uppercase tracking-[0.2em] text-left py-1 transition-colors duration-base ease-editorial"
            style={{ color: isActive ? "hsl(var(--ink-primary))" : "hsl(var(--ink-muted))" }}
          >
            ~/{link}
            {isActive && (
              <motion.span
                layoutId="nav-underline"
                className="absolute -bottom-0.5 left-0 w-full h-px bg-ink-primary"
                transition={{ duration: 0.3, ease: EASE }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}

/* ── Mobile Nav (Sheet) ───────────────────────────────────────── */

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = useCallback((id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }, []);

  return (
    <div className="lg:hidden">
      {/* Hamburger trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-[60] flex flex-col justify-center items-center w-10 h-10"
        aria-label="Open menu"
      >
        <span className="block w-6 h-px bg-ink-primary mb-1.5" />
        <span className="block w-6 h-px bg-ink-primary mb-1.5" />
        <span className="block w-6 h-px bg-ink-primary" />
      </button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
                ~/{link}
              </motion.button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}



function HeroSection() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ruleRef = useRef<HTMLHRElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split name into characters
      const nameEl = nameRef.current;
      if (!nameEl) return;

      const text = nameEl.textContent || "";
      nameEl.innerHTML = "";

      // Create line elements with character spans
      const lines = text.split("\n").filter(Boolean);
      lines.forEach((line, lineIdx) => {
        const lineDiv = document.createElement("div");
        line.split("").forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.style.display = "inline-block";
          span.style.opacity = "0";
          if (char === " ") span.style.width = "0.3em";
          lineDiv.appendChild(span);
        });
        nameEl.appendChild(lineDiv);
        if (lineIdx < lines.length - 1) {
          // line break is handled by divs
        }
      });

      const chars = nameEl.querySelectorAll("span");

      gsap.to(chars, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.04,
        ease: "power4.out",
        delay: 0.2,
      });

      // Set initial state
      gsap.set(chars, { y: 60, opacity: 0 });

      // Subtitle, rule, marquee
      const timeline = gsap.timeline({ delay: 0.6 + chars.length * 0.04 * 0.3 });
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { y: 20, opacity: 0 });
        timeline.to(subtitleRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0);
      }
      if (ruleRef.current) {
        gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: "left" });
        timeline.to(ruleRef.current, { scaleX: 1, duration: 0.8, ease: "power3.out" }, 0.1);
      }
      if (marqueeRef.current) {
        gsap.set(marqueeRef.current, { opacity: 0 });
        timeline.to(marqueeRef.current, { opacity: 1, duration: 0.6, ease: "power3.out" }, 0.3);
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="flex flex-col justify-center min-h-screen">
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
        Software Engineer — Frontend
      </p>
      <hr ref={ruleRef} className="mt-6 border-ink-faint" />

      {/* Marquee */}
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

/* ── About Section ────────────────────────────────────────────── */

function AboutSection() {
  const imageRef = useRef(null);
  const imageInView = useInView(imageRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative border-t border-ink-faint pt-20 pb-24">
      <SectionLabel text="about" />
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-[60%] space-y-5">
          <ScrollReveal delay={0}>
            <p className="font-body text-base leading-relaxed text-ink-primary">
              I build interfaces that feel inevitable — the kind where you don't notice the craft until you compare it with everything else. I care about type scales, transition curves, and the weight of a border. Most of my work lives at the intersection of design systems and frontend architecture.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="font-body text-base leading-relaxed text-ink-primary">
              Before code, I studied how people read. Not just text — layouts, hierarchies, the rhythm of a page. That background shapes how I approach every component: structure first, decoration never.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-body text-base leading-relaxed text-ink-primary">
              Currently based in Lagos, working across time zones. I write TypeScript almost exclusively, think in React, and reach for the simplest tool that doesn't compromise quality.
            </p>
          </ScrollReveal>
        </div>
        <div className="md:w-[35%]">
          <motion.div
            ref={imageRef}
            className="relative noise-overlay"
            initial={{ scale: 1.05, opacity: 0 }}
            animate={imageInView ? { scale: 1, opacity: 1 } : { scale: 1.05, opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <img
              src={portrait}
              alt="Gregory Opara Chukwuma portrait"
              className="w-full grayscale shadow-md"
            />
          </motion.div>
          <p className="mt-4 font-mono text-sm text-ink-muted">Gregory Opara Chukwuma</p>
          <p className="text-xs font-body uppercase tracking-[0.2em] text-ink-muted">
            Software Engineer
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Work Section ─────────────────────────────────────────────── */

function WorkSection() {
  return (
    <section id="work" className="relative border-t border-ink-faint pt-20 pb-24">
      <SectionLabel text="work" />
      <div>
        {PROJECTS.map((p) => (
          <WorkRow key={p.title} project={p} />
        ))}
        <div className="border-t border-ink-faint" />
      </div>
    </section>
  );
}

/* ── Stack Section ────────────────────────────────────────────── */

function StackSection() {
  return (
    <section id="stack" className="relative border-t border-ink-faint pt-20 pb-24">
      <SectionLabel text="stack" />

      {/* Infinite moving cards */}
      <div className="space-y-4 mb-12">
        <InfiniteMovingCards items={STACK_TAGS} direction="left" speed="slow" />
        <InfiniteMovingCards items={[...STACK_TAGS].reverse()} direction="right" speed="slow" />
      </div>

      {/* Static definition list */}
      <div>
        {STACK_LIST.map((item) => (
          <div
            key={item.name}
            className="flex items-baseline justify-between border-t border-ink-faint py-3"
          >
            <span className="font-body text-base text-ink-primary">{item.name}</span>
            <span className="font-mono text-sm text-ink-muted">{item.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Contact Section ──────────────────────────────────────────── */

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const emailRef = useRef<HTMLAnchorElement>(null);
  const scramble = useCharacterScramble();

  const handleEmailHover = useCallback(() => {
    if (emailRef.current) {
      scramble(emailRef.current, "hello@gregory.dev", 0.4);
    }
  }, [scramble]);

  return (
    <section
      id="contact"
      className="relative pt-20 pb-32 -mx-8 px-8"
      style={{ backgroundColor: "hsl(var(--background-dark))" }}
    >
      <div className="max-w-[820px] mx-auto relative">
        <span className="absolute top-8 left-0 text-xs font-mono uppercase tracking-[0.2em] select-none" style={{ color: "hsl(var(--ink-muted))" }}>
          ~/contact
        </span>

        <div ref={ref} className="pt-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <a
              ref={emailRef}
              href="mailto:hello@gregory.dev"
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
              hello@gregory.dev
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
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity duration-base ease-editorial"
              style={{ color: "hsl(var(--background))" }}
            >
              GitHub
            </a>
            <span style={{ color: "hsl(var(--ink-faint))" }}>·</span>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity duration-base ease-editorial"
              style={{ color: "hsl(var(--background))" }}
            >
              LinkedIn
            </a>
            <span style={{ color: "hsl(var(--ink-faint))" }}>·</span>
            <a
              href="#"
              className="hover:opacity-80 transition-opacity duration-base ease-editorial"
              style={{ color: "hsl(var(--background))" }}
            >
              CV
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */

export default function Index() {
  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // GSAP page entry for nav
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("nav button", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <CustomCursor />
      <LeftNav />
      <MobileNav />

      <main className="mx-auto max-w-[820px] px-8">
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <StackSection />
      </main>

      <ContactSection />
    </>
  );
}
