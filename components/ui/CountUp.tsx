"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type Props = {
  /** Numeric target, e.g. 420 or 30 */
  value: number;
  /** Optional suffix like "+" */
  suffix?: string;
  className?: string;
  duration?: number;
};

export function CountUp({
  value,
  suffix = "",
  className = "",
  duration = 1.15,
}: Props) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  useEffect(() => {
    if (reduceMotion || !inView || !ref.current) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = `${Math.round(latest)}${suffix}`;
        }
      },
    });

    return () => controls.stop();
  }, [duration, inView, reduceMotion, suffix, value]);

  if (reduceMotion) {
    return (
      <span className={className}>
        {value}
        {suffix}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className={className}
      aria-label={`${value}${suffix}`}
    >
      0{suffix}
    </span>
  );
}

/** Parse display strings like "420" or "30+" into count + suffix */
export function parseStatValue(raw: string): { value: number; suffix: string } {
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) return { value: 0, suffix: raw };
  return { value: Number(match[1]), suffix: match[2] ?? "" };
}
