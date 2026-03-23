// components/AboutSection.tsx
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { ScrollReveal } from "@/components/ScrollReveal";
import portrait from "@/assets/portrait.jpg";
import { EASE } from "@/types";

export function AboutSection() {
  const imageRef = useRef(null);
  const imageInView = useInView(imageRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative border-t border-ink-faint pt-20 pb-24">
      <SectionLabel text="about" />
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-[60%] space-y-5">
          <ScrollReveal delay={0}>
            <p className="font-body text-base leading-relaxed text-ink-primary text-justify">
              I work across the stack with C# / .NET, TypeScript, and JavaScript, 
              using each where it makes sense. React and Next.js for the frontend, 
              Node.js and .NET for services that need to be reliable. The goal is 
              always the same: build software that does what it's supposed to, 
              without making a mess along the way.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="font-body text-base leading-relaxed text-ink-primary text-justify">
              I've built payment systems, AI-powered applications, and mobile apps 
              shipped to both iOS and Android. What ties it together is a focus on 
              clean architecture, automated deployments with Docker and GitHub Actions, 
              and cloud infrastructure on AWS. I care about how things work under the 
              hood, not just that they work.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-body text-base leading-relaxed text-ink-primary text-justify">
              Based in Nigeria, I work with teams across time zones to deliver 
              production-ready software. Currently focused on event-driven systems 
              and serverless architecture, building applications that scale without 
              introducing unnecessary complexity.
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