import { useEffect, useRef } from "react";

export function useFilmRollScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Optional: Add smooth scroll behavior
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Add smooth scrolling behavior
    track.style.scrollBehavior = "smooth";
    
    return () => {
      if (track) {
        track.style.scrollBehavior = "auto";
      }
    };
  }, []);

  return { trackRef, containerRef };
}