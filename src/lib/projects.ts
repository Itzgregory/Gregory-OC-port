import { Project } from "@/types";
import projectIdmenaija from "@/assets/idme-naija.png";
import projectAdedeji from "@/assets/adedeji-and-co.png";
import projectEverfresh from "@/assets/Ever-fresh.png";
import projectHustletrack from "@/assets/project-hustletrack.jpg";
import projectMacosine from "@/assets/macosine.png";
import projectAleanCloud from "@/assets/alean-code.png";
import projectUnifiedbeez from "@/assets/unified-beez.png";
import projectMystartracker from "@/assets/mystar-tracker.png";
import projectSmsAbuja from "@/assets/sms-abuja.png";
import projectKabilsGrillz from "@/assets/kabilz-grillz.jpg";

export const PROJECTS: Project[] = [
  {
    year: "2026",
    title: "ID Me Naija",
    category: "API Platform",
    description:
      "Nigerian identity verification platform built with React, TypeScript and Vite. Designed for speed, clarity, and trust — the kind of product where every millisecond of perceived performance matters.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    previewAvailable: true,
    url: "https://idmenaija.vercel.app",
    screenshot: projectIdmenaija,
  },
  {
    year: "2026",
    title: "Adedeji & Co.",
    category: "Web Site",
    description:
      "Corporate law firm website with an editorial layout and TanStack Router. Typography-first design language that lets the content breathe while maintaining the gravitas the profession demands.",
    stack: ["React", "TypeScript", "Vite", "TanStack Router", "Tailwind CSS"],
    previewAvailable: true,
    url: "https://adedejiandco.vercel.app/",
    screenshot: projectAdedeji,
  },
  {
    year: "2026",
    title: "Ever Fresh",
    category: "Web Site",
    description:
      "Multi-service agency site with Framer Motion animations and a custom design system. Every interaction was choreographed — nothing moves without reason.",
    stack: ["React", "TypeScript", "TanStack Router", "Framer Motion", "Radix UI"],
    previewAvailable: true,
    url: "https://ever-fresh-risinsun.vercel.app",
    screenshot: projectEverfresh,
  },
  {
    year: "2026",
    title: "HustleTrack",
    category: "Web App",
    description:
      "Fintech expense tracker targeting Nigerian users, built with .NET 9 and DDD architecture. Clean separation of concerns on the backend, React on the front.",
    stack: [".NET 9", "C#", "CQRS", "React"],
    previewAvailable: false,
    url: "/#",
    screenshot: projectHustletrack,
  },
 {
    year: "2025",
    title: "Kabilis Grillz",
    category: "Mobile App",
    description:
      "React Native mobile app for iOS and Android featuring real-time product APIs and Google Pay integration. Contributed to app release processes including store submissions, code signing, and optimization for both App Store and Google Play. Debugged workflows and improved app stability for future releases.",
    stack: ["React Native", "JavaScript", "Google Pay API", "iOS", "Android"],
    previewAvailable: true,
    url: "https://apps.apple.com/ng/app/kabils-grillz/id6753185694",
    screenshot: projectKabilsGrillz,
  },
  {
    year: "2025",
    title: "Macosine",
    category: "Web App",
    description:
      "Built a responsive React + Tailwind frontend with Express/Node.js/MongoDB backend for form submissions. Full website deployment with domain integration and reliable hosting.",
    stack: ["React", "Tailwind CSS", "Express.js", "Node.js", "MongoDB"],
    previewAvailable: true,
    url: "https://macosine.com",
    screenshot: projectMacosine,
  },
  {
    year: "2025",
    title: "AleanCloud",
    category: "Backend Service",
    description:
      "Implemented backend form submission endpoints using Express and Node.js, providing reliable API infrastructure for cloud-based services.",
    stack: ["Express.js", "Node.js", "REST API"],
    previewAvailable: true,
    url: "https://aleancloud.com",
    screenshot: projectAleanCloud,
  },
  {
    year: "2025",
    title: "UnifiedBeez",
    category: "AI-Powered Platform",
    description:
      "Built AI-powered web apps with event-driven automation, integrating OpenAI, Google, and WhatsApp APIs. Developed reusable React & Nest.js components with automated data pipelines, improving UX responsiveness by 30%.",
    stack: ["React", "Nest.js", "OpenAI", "TypeScript", "Tailwind CSS"],
    previewAvailable: true,
    url: "https://unifiedbeez.com",
    screenshot: projectUnifiedbeez,
  },
  {
    year: "2025",
    title: "Mystartracker",
    category: "Business Logic Platform",
    description:
      "Architected business logic and reviewed object-oriented design for alignment with project blueprint. Focused on scalable architecture and maintainable code structure.",
    stack: ["Object-Oriented Design", "System Architecture", "Business Logic"],
    previewAvailable: false,
    screenshot: projectMystartracker,
  },
  {
    year: "2025",
    title: "SmsAbuja",
    category: "Web app",
    description:
      "Architected business logic and reviewed object-oriented design for SMS delivery platform. Ensured robust system architecture and efficient message routing.",
    stack: ["System Architecture", "OOP", "SMS Integration"],
    previewAvailable: false,
    screenshot: projectSmsAbuja,
  }
];