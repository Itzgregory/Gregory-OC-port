import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface CursorState {
  isHovering: boolean;
  cursorText: string;
  position: { x: number; y: number };
}

interface UseCursorOptions {
  hoverableSelectors?: string[];
}

export function useCursor(options: UseCursorOptions = {}) {
  const {
    hoverableSelectors = ["a", "button", "[role='button']", "[data-cursor-text]"]
  } = options;

  const cursorRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>({
    isHovering: false,
    cursorText: "",
    position: { x: 0, y: 0 }
  });
  
  const posRef = useRef({ x: 0, y: 0 });
  const quickX = useRef<gsap.QuickToFunc | null>(null);
  const quickY = useRef<gsap.QuickToFunc | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  // Check for touch device
  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // Handle hover events
  useEffect(() => {
    if (isTouch) return;

    const handleMouseEnter = (e: Event) => {
      const el = e.target as HTMLElement;
      const text = el.closest("[data-cursor-text]")?.getAttribute("data-cursor-text") || "";
      setState(prev => ({
        ...prev,
        isHovering: true,
        cursorText: text
      }));
    };

    const handleMouseLeave = () => {
      setState(prev => ({
        ...prev,
        isHovering: false,
        cursorText: ""
      }));
    };

    const setupHoverables = () => {
      const elements = document.querySelectorAll(hoverableSelectors.join(","));
      elements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
      return elements;
    };

    let hoverables = setupHoverables();

    const observer = new MutationObserver(() => {
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      hoverables = setupHoverables();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      observer.disconnect();
    };
  }, [isTouch, hoverableSelectors]);

  // Handle cursor movement
  useEffect(() => {
    if (isTouch) return;
    
    const cursor = cursorRef.current;
    if (!cursor) return;

    quickX.current = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
    quickY.current = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      posRef.current = { x: clientX, y: clientY };
      quickX.current?.(clientX);
      quickY.current?.(clientY);
      setState(prev => ({ ...prev, position: { x: clientX, y: clientY } }));
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isTouch]);

  return {
    cursorRef,
    isTouch,
    isHovering: state.isHovering,
    cursorText: state.cursorText,
    position: state.position
  };
}