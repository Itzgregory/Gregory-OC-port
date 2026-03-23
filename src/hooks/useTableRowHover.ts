import { useState, useRef, useCallback, useEffect } from "react";
import gsap from "gsap";

export function useTableRowHover() {
  const [hovered, setHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const quickX = useRef<gsap.QuickToFunc | null>(null);
  const quickY = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (!imgRef.current) return;
    quickX.current = gsap.quickTo(imgRef.current, "x", {
      duration: 0.3,
      ease: "power3.out",
    });
    quickY.current = gsap.quickTo(imgRef.current, "y", {
      duration: 0.3,
      ease: "power3.out",
    });
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!rowRef.current || !hovered) return;
      const rect = rowRef.current.getBoundingClientRect();
      quickX.current?.(e.clientX - rect.left - 100);
      quickY.current?.(e.clientY - rect.top - 60);
    },
    [hovered]
  );

  return {
    hovered,
    rowRef,
    imgRef,
    handleMouseEnter: () => setHovered(true),
    handleMouseLeave: () => setHovered(false),
    handleMouseMove,
  };
}