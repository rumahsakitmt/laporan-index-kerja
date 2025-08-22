"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollToTopContainerProps {
  className?: string;
  threshold?: number;
  containerRef?: React.RefObject<HTMLElement>;
  targetRef?: React.RefObject<HTMLElement>;
  variant?: "default" | "floating" | "minimal" | "mobile";
}

export function ScrollToTopContainer({
  className,
  threshold = 300,
  containerRef,
  targetRef,
  variant = "default",
}: ScrollToTopContainerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const container = containerRef?.current || window;
    const target = targetRef?.current || document.documentElement;

    const toggleVisibility = () => {
      if (container === window) {
        setIsVisible(window.scrollY > threshold);
      } else {
        const scrollTop = (container as HTMLElement).scrollTop;
        setIsVisible(scrollTop > threshold);
      }
    };

    container.addEventListener("scroll", toggleVisibility);
    return () => container.removeEventListener("scroll", toggleVisibility);
  }, [threshold, containerRef, targetRef]);

  const scrollToTop = () => {
    const container = containerRef?.current || window;
    const target = targetRef?.current || document.documentElement;

    if (container === window) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      (container as HTMLElement).scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "mobile":
        return "fixed bottom-24 right-4 z-50 shadow-md  border border-border hover:bg-accent transition-all duration-200 hover:scale-105 flex items-center gap-2 text-foreground";
      case "floating":
        return "fixed bottom-6 right-6 z-50 rounded-full shadow-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-110 hover:shadow-2xl";
      case "minimal":
        return "fixed bottom-4 right-4 z-50 rounded-full shadow-md bg-background border border-border hover:bg-accent transition-all duration-200 hover:scale-105";
      default:
        return "fixed bottom-4 right-4 z-50 rounded-full shadow-lg transition-all duration-300 hover:scale-110";
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      ref={buttonRef}
      onClick={scrollToTop}
      size="sm"
      className={cn(
        "bg-background/10 backdrop-blur-xl",
        getVariantStyles(),
        "animate-in fade-in-0 slide-in-from-bottom-2 duration-300",
        className
      )}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-4 w-4" />
      <span className="text-xs">Kembali ke atas</span>
    </Button>
  );
}
