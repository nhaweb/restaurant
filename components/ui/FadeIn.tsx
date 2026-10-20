"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInViewOnce } from "@/components/ui/useInViewOnce";

export type FadeDirection = "up" | "down" | "left" | "right" | "none";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: FadeDirection;
  /** Use when parent already handles viewport / stagger */
  immediate?: boolean;
};

const OFFSET = 18;

function offsetFor(direction: FadeDirection) {
  switch (direction) {
    case "up":
      return `translate3d(0, ${OFFSET}px, 0)`;
    case "down":
      return `translate3d(0, ${-OFFSET}px, 0)`;
    case "left":
      return `translate3d(${OFFSET}px, 0, 0)`;
    case "right":
      return `translate3d(${-OFFSET}px, 0, 0)`;
    case "none":
      return "none";
  }
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.45,
  direction = "up",
  immediate = false,
}: Props) {
  const { ref, ready, visible } = useInViewOnce({
    amount: immediate ? 0 : 0.18,
  });
  const show = immediate || visible;
  const hide = ready && !show;

  const style: CSSProperties = {
    opacity: hide ? 0 : 1,
    transform: hide ? offsetFor(direction) : "none",
    transitionProperty: "opacity, transform",
    transitionDuration: `${duration}s`,
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: show ? `${delay}s` : "0s",
    willChange: hide ? "opacity, transform" : "auto",
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
