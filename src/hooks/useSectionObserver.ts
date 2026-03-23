import { NAV_LINKS } from "@/lib/navLink";
import { useState, useEffect } from "react";

export function useSectionObserver() {
  const [activeSection, setActiveSection] = useState("");

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

  return activeSection;
}