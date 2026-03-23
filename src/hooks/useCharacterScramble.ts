import { useRef, useCallback } from "react";
import gsap from "gsap";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function useCharacterScramble() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = useCallback((el: HTMLElement, finalText: string, duration = 0.5) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    const originalText = el.textContent || "";
    const textLength = finalText.length;
    let currentIndex = 0;
    
    // Calculate time per character
    const timePerChar = (duration * 1000) / textLength;

    intervalRef.current = setInterval(() => {
      if (currentIndex < textLength) {
        currentIndex++;
        
        // Build the text
        const revealedText = finalText.slice(0, currentIndex);
        const remainingLength = textLength - currentIndex;
        
        let scrambledText = "";
        for (let i = 0; i < remainingLength; i++) {
          const char = finalText[currentIndex + i];
          if (char === " " || char === "@" || char === "." || char === "/") {
            scrambledText += char;
          } else {
            scrambledText += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        
        el.textContent = revealedText + scrambledText;
        
        // Add a subtle scale effect
        gsap.to(el, {
          scale: 1.02,
          duration: 0.05,
          yoyo: true,
          repeat: 1,
        });
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, timePerChar);
  }, []);

  return scramble;
}