import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useHeroAnimation() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ruleRef = useRef<HTMLHRElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nameEl = nameRef.current;
      if (!nameEl) return;

      const text = nameEl.textContent || "";
      nameEl.innerHTML = "";

      const lines = text.split("\n").filter(Boolean);
      lines.forEach((line) => {
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
      });

      const chars = nameEl.querySelectorAll("span");
      gsap.set(chars, { y: 60, opacity: 0 });
      gsap.to(chars, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.04,
        ease: "power4.out",
        delay: 0.2,
      });

      const timeline = gsap.timeline({ delay: 0.6 + chars.length * 0.04 * 0.3 });
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { y: 20, opacity: 0 });
        timeline.to(subtitleRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
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

  return { nameRef, subtitleRef, ruleRef, marqueeRef };
}