// hooks/useParallaxLabel.ts
import { useEffect, useRef } from "react";

export function useParallaxLabel() {
  const ref = useRef<HTMLSpanElement>(null);
  const lastScrollY = useRef(0);
  const isFadingOut = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const offset = (window.innerHeight - rect.top) * 0.15;
      const currentScrollY = window.scrollY;
      
      // Update parallax position
      el.style.transform = `translateY(${offset}px)`;
      
      // Handle fade based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // Scrolling down - fade out
        if (!isFadingOut.current) {
          el.style.opacity = "0";
          el.style.transition = "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
          isFadingOut.current = true;
        }
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up - fade in
        el.style.opacity = "1";
        el.style.transition = "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        isFadingOut.current = false;
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return ref;
}