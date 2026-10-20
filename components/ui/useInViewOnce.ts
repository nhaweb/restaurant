"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** Fraction of element visibility (0–1) */
  amount?: number;
  rootMargin?: string;
};

/**
 * Progressive reveal: content stays visible without JS.
 * After mount, elements below the fold hide briefly, then animate in once.
 */
export function useInViewOnce<T extends HTMLElement = HTMLDivElement>({
  amount = 0.15,
  rootMargin = "0px 0px -40px 0px",
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      setVisible(true);
      setReady(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    if (alreadyInView) {
      setVisible(true);
      setReady(true);
      return;
    }

    setReady(true);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        io.disconnect();
      },
      { threshold: amount, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount, rootMargin]);

  return { ref, ready, visible };
}
