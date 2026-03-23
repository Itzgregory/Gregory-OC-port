import { useCursor } from "@/hooks/useCursor";
import { CursorStyles } from "@/lib/styles/CusorStyles";

interface CustomCursorProps {
  hoverableSelectors?: string[];
}

export function CustomCursor({ hoverableSelectors }: CustomCursorProps) {
  const { cursorRef, isTouch, isHovering, cursorText, position } = useCursor({ 
    hoverableSelectors 
  });

  if (isTouch) return null;

  const isFilled = cursorText.length > 0;
  const styles = CursorStyles.getStyles(isHovering, isFilled);

  // Debug: Log to check if component is rendering
  console.log("CustomCursor rendering", { isTouch, isHovering, cursorText });

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        ...styles.container,
        position: 'fixed',
        top: 0,
        left: 0,
        willChange: 'transform',
      }}
    >
      {cursorText && (
        <span
          className="font-mono text-background select-none"
          style={styles.text}
        >
          {cursorText}
        </span>
      )}
    </div>
  );
}