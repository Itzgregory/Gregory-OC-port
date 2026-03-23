import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const posRef = useRef({ x: 0, y: 0 });
  const quickX = useRef<gsap.QuickToFunc | null>(null);
  const quickY = useRef<gsap.QuickToFunc | null>(null);

  // Check for touch device
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    quickX.current = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
    quickY.current = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      quickX.current?.(e.clientX);
      quickY.current?.(e.clientY);
    };

    const onEnterHoverable = (e: Event) => {
      const el = e.target as HTMLElement;
      const text = el.closest("[data-cursor-text]")?.getAttribute("data-cursor-text") || "";
      setCursorText(text);
      setIsHovering(true);
    };

    const onLeaveHoverable = () => {
      setIsHovering(false);
      setCursorText("");
    };

    window.addEventListener("mousemove", onMove);

    const setupHoverables = () => {
      const hoverables = document.querySelectorAll("a, button, [role='button'], [data-cursor-text]");
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", onEnterHoverable);
        el.addEventListener("mouseleave", onLeaveHoverable);
      });
      return hoverables;
    };

    // Setup initially and observe for DOM changes
    let hoverables = setupHoverables();

    const observer = new MutationObserver(() => {
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterHoverable);
        el.removeEventListener("mouseleave", onLeaveHoverable);
      });
      hoverables = setupHoverables();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterHoverable);
        el.removeEventListener("mouseleave", onLeaveHoverable);
      });
      observer.disconnect();
    };
  }, [isTouch]);

  if (isTouch) return null;

  const isFilled = cursorText.length > 0;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        width: isHovering ? 40 : 8,
        height: isHovering ? 40 : 8,
        marginLeft: isHovering ? -20 : -4,
        marginTop: isHovering ? -20 : -4,
        borderRadius: "50%",
        backgroundColor: isFilled ? "hsl(var(--accent))" : isHovering ? "transparent" : "hsl(var(--accent))",
        border: isHovering && !isFilled ? "1.5px solid hsl(var(--accent))" : "none",
        transition: "width 0.3s cubic-bezier(0.4,0,0.2,1), height 0.3s cubic-bezier(0.4,0,0.2,1), margin 0.3s cubic-bezier(0.4,0,0.2,1), background-color 0.3s cubic-bezier(0.4,0,0.2,1), border 0.3s cubic-bezier(0.4,0,0.2,1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {cursorText && (
        <span
          ref={textRef}
          className="font-mono text-background select-none"
          style={{ fontSize: "9px", letterSpacing: "0.05em" }}
        >
          {cursorText}
        </span>
      )}
    </div>
  );
}
