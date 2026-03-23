import { CustomCursor } from "@/components/CustomCursor";
import { LeftNav } from "@/components/LeftNav";
import { MobileNav } from "@/components/MobileNav";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { WorkSection } from "@/components/WorkSection";
import { ContactSection } from "@/components/ContactSection";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useNavAnimation } from "@/hooks/useNavAnimation";
import { PROJECTS } from "@/lib/projects";
import { StackSection } from "@/components/StackSection";


export default function Index() {
  useSmoothScroll();
  useNavAnimation();

  return (
    <>
      <CustomCursor />
      <LeftNav />
      <MobileNav />

      <main className="mx-auto max-w-[820px] px-8">
        <HeroSection />
        <AboutSection />
        <WorkSection projects={PROJECTS} />
        <StackSection />
      </main>

      <ContactSection />
    </>
  );
}