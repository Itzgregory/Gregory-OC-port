import { StackItem } from "@/types";

export const STACK_LIST: StackItem[] = [
  // Languages
  { name: "TypeScript", desc: "type safety & developer experience" },
  { name: "JavaScript", desc: "core web language" },
  { name: "C# / .NET", desc: "backend services & enterprise apps" },
  { name: "Python", desc: "scripting & AI integration" },
  { name: "SQL", desc: "database querying" },
  { name: "PHP", desc: "legacy & Laravel backend" },
  
  // Frontend Frameworks & Libraries
  { name: "React", desc: "UI architecture & components" },
  { name: "Next.js", desc: "full-stack React framework" },
  { name: "Vite", desc: "build tooling & dev experience" },
  { name: "Tailwind CSS", desc: "utility-first styling" },
  { name: "Zustand", desc: "state management" },
  { name: "TanStack Router", desc: "type-safe routing" },
  { name: "Framer Motion", desc: "animation library" },
  { name: "Radix UI", desc: "accessible primitives" },
  { name: "GSAP", desc: "advanced animations" },
  
  // Backend Frameworks
  { name: "Node.js", desc: "JavaScript runtime" },
  { name: "Express", desc: "Node.js framework" },
  { name: "Nest.js", desc: "structured Node.js backend" },
  { name: "Laravel", desc: "PHP framework" },
  { name: ".NET 9", desc: "enterprise backend" },
  
  // Mobile
  { name: "React Native", desc: "cross-platform mobile" },
  
  // DevOps & Tools
  { name: "Docker", desc: "containerization" },
  { name: "Nginx", desc: "web server & reverse proxy" },
  { name: "GitHub Actions", desc: "CI/CD automation" },
  { name: "Git", desc: "version control" },
  
  // Cloud & Databases
  { name: "AWS", desc: "EC2, S3, Lambda" },
  { name: "PostgreSQL", desc: "relational database" },
  { name: "MySQL", desc: "relational database" },
  { name: "MongoDB", desc: "NoSQL database" },
  { name: "Redis", desc: "in-memory data store" },
  
  // Architecture
  { name: "Microservices", desc: "distributed systems" },
  { name: "Event-Driven Systems", desc: "async architecture" },
  { name: "REST APIs", desc: "API design" },
  { name: "GraphQL", desc: "query language" },
];

export const STACK_TAGS = [
  "TypeScript", "JavaScript", "C#", ".NET", "Python", "SQL", "PHP",
  "React", "Next.js", "Vite", "Tailwind CSS", "Zustand", "TanStack Router",
  "Framer Motion", "Radix UI", "GSAP",
  "Node.js", "Express", "Nest.js", "Laravel", ".NET 9",
  "React Native",
  "Docker", "Nginx", "GitHub Actions", "Git",
  "AWS", "PostgreSQL", "MySQL", "MongoDB", "Redis",
  "Microservices", "REST", "GraphQL"
];

export const MARQUEE_TEXT = "React — TypeScript — Next.js — Vite — Tailwind CSS — TanStack Router — Framer Motion — .NET — ";
