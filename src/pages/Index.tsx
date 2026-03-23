import { useState, useEffect, useRef, useCallback } from "react";
import portrait from "@/assets/portrait.jpg";

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
}

const PROJECTS: Project[] = [
  {
    year: "2025",
    title: "ID Me Naija",
    category: "API Platform",
    description:
      "Nigerian identity verification platform built with React, TypeScript and Vite. Designed for speed, clarity, and trust — the kind of product where every millisecond of perceived performance matters.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
  },
  {
    year: "2025",
    title: "Adedeji & Co.",
    category: "Web App",
    description:
      "Corporate law firm website with an editorial layout and TanStack Router. Typography-first design language that lets the content breathe while maintaining the gravitas the profession demands.",
    stack: ["React", "TypeScript", "Vite", "TanStack Router", "Tailwind CSS"],
  },
  {
    year: "2024",
    title: "EverFresh",
    category: "Web App",
    description:
      "Multi-service agency site with Framer Motion animations and a custom design system. Every interaction was choreographed — nothing moves without reason.",
    stack: ["React", "TypeScript", "TanStack Router", "Framer Motion", "Radix UI"],
  },
  {
    year: "2024",
    title: "HustleTrack",
    category: "Web App",
    description:
      "Fintech expense tracker targeting Nigerian users, built with .NET 9 and DDD architecture. Clean separation of concerns on the backend, React on the front.",
    stack: [".NET 9", "C#", "CQRS", "React"],
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

/* ── Parallax label ───────────────────────────────────────────── */

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

/* ── Category Tag ─────────────────────────────────────────────── */

function CategoryTag({ label }: { label: string }) {
  return (
    <span className="inline-block font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink-muted border border-ink-faint px-2 py-[2px] rounded-[2px] whitespace-nowrap">
      {label}
    </span>
  );
}

/* ── Work Row ─────────────────────────────────────────────────── */

function WorkRow({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-ink-faint">
      <button
        onClick={() => setOpen((o) => !o)}
        className="group w-full flex items-center gap-4 py-5 px-2 text-left transition-colors duration-base ease-editorial hover:bg-background-hover"
      >
        <span className="w-16 shrink-0 font-mono text-sm text-ink-muted">
          {project.year}
        </span>
        <span className="flex-1 relative">
          <span
            className="font-display text-ink-primary"
            style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", lineHeight: 1.3 }}
          >
            {project.title}
          </span>
          <span className="absolute bottom-0 left-0 w-full h-px bg-ink-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-slow ease-editorial" />
        </span>
        <CategoryTag label={project.category} />
      </button>

      <div
        className="overflow-hidden transition-all duration-slow ease-editorial"
        style={{
          maxHeight: open ? "600px" : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="px-2 pb-8 pt-2">
          <p className="font-body text-base leading-relaxed text-ink-primary max-w-lg">
            {project.description}
          </p>
          <p className="mt-4 font-mono text-sm text-ink-muted">
            {project.stack.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Nav ──────────────────────────────────────────────────────── */

function LeftNav() {
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
      {NAV_LINKS.map((link) => (
        <button
          key={link}
          onClick={() => scrollTo(link)}
          className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted hover:text-ink-primary hover:font-medium transition-all duration-base ease-editorial text-left"
        >
          ~/{link}
        </button>
      ))}
    </nav>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */

export default function Index() {
  return (
    <>
      <LeftNav />

      <main className="mx-auto max-w-[780px] px-6 md:px-10">
        {/* Hero */}
        <section className="flex flex-col justify-center min-h-screen">
          <h1
            className="font-display text-ink-primary tracking-tight"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.95 }}
          >
            Gregory
            <br />
            Opara
            <br />
            Chukwuma
          </h1>
          <p className="mt-6 text-xs font-body uppercase tracking-[0.2em] text-ink-muted">
            Software Engineer — Frontend
          </p>
          <hr className="mt-6 border-ink-faint" />
        </section>

        {/* About */}
        <section id="about" className="relative border-t border-ink-faint pt-20 pb-24">
          <SectionLabel text="about" />
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-[60%] space-y-5">
              <p className="font-body text-base leading-relaxed text-ink-primary">
                I build interfaces that feel inevitable — the kind where you don't notice the craft until you compare it with everything else. I care about type scales, transition curves, and the weight of a border. Most of my work lives at the intersection of design systems and frontend architecture.
              </p>
              <p className="font-body text-base leading-relaxed text-ink-primary">
                Before code, I studied how people read. Not just text — layouts, hierarchies, the rhythm of a page. That background shapes how I approach every component: structure first, decoration never.
              </p>
              <p className="font-body text-base leading-relaxed text-ink-primary">
                Currently based in Lagos, working across time zones. I write TypeScript almost exclusively, think in React, and reach for the simplest tool that doesn't compromise quality.
              </p>
            </div>
            <div className="md:w-[35%]">
              <div className="relative noise-overlay">
                <img
                  src={portrait}
                  alt="Gregory Opara Chukwuma portrait"
                  className="w-full grayscale shadow-lg"
                />
              </div>
              <p className="mt-4 font-mono text-sm text-ink-muted">Gregory Opara Chukwuma</p>
              <p className="text-xs font-body uppercase tracking-[0.2em] text-ink-muted">
                Software Engineer
              </p>
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="relative border-t border-ink-faint pt-20 pb-24">
          <SectionLabel text="work" />
          <div>
            {PROJECTS.map((p) => (
              <WorkRow key={p.title} project={p} />
            ))}
            <div className="border-t border-ink-faint" />
          </div>
        </section>

        {/* Stack */}
        <section id="stack" className="relative border-t border-ink-faint pt-20 pb-24">
          <SectionLabel text="stack" />
          <div>
            {STACK_LIST.map((item) => (
              <div
                key={item.name}
                className="flex items-baseline justify-between border-t border-ink-faint py-3 first:border-t-0"
              >
                <span className="font-body text-base text-ink-primary">{item.name}</span>
                <span className="font-mono text-sm text-ink-muted">{item.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="relative border-t border-ink-faint pt-20 pb-32">
          <SectionLabel text="contact" />
          <a
            href="mailto:hello@gregory.dev"
            className="block font-display text-ink-primary hover:text-accent transition-colors duration-base ease-editorial"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", lineHeight: 1.2 }}
          >
            hello@gregory.dev
          </a>
          <p className="mt-6 text-xs font-body uppercase tracking-[0.2em] text-ink-muted">
            Open to roles. Selective with projects. Fast to respond.
          </p>
          <div className="mt-6 flex items-center gap-3 font-mono text-sm text-ink-muted">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink-primary transition-colors duration-base ease-editorial"
            >
              GitHub
            </a>
            <span className="text-ink-faint">|</span>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink-primary transition-colors duration-base ease-editorial"
            >
              LinkedIn
            </a>
            <span className="text-ink-faint">|</span>
            <a
              href="#"
              className="hover:text-ink-primary transition-colors duration-base ease-editorial"
            >
              CV
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
