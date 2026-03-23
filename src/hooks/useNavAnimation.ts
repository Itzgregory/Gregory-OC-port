import { useEffect } from "react";
import gsap from "gsap";

export function useNavAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("nav button", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.1,
      });
    });
    return () => ctx.revert();
  }, []);
}