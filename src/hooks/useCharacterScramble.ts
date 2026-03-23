import { useRef, useCallback } from "react";
import gsap from "gsap";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function useCharacterScramble() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = useCallback((el: HTMLElement, finalText: string, duration = 0.5) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    let iteration = 0;
    const totalIterations = Math.ceil(duration * 30); // ~30fps

    intervalRef.current = setInterval(() => {
      const progress = iteration / totalIterations;
      const revealed = Math.floor(progress * finalText.length);

      el.textContent = finalText
        .split("")
        .map((char, i) => {
          if (i < revealed) return finalText[i];
          if (char === " " || char === "@" || char === ".") return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      iteration++;
      if (iteration > totalIterations) {
        el.textContent = finalText;
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 1000 / 30);
  }, []);

  return scramble;
}
