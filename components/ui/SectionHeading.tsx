"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useInViewOnce } from "@/components/ui/useInViewOnce";
import { assets } from "@/lib/assets";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  showLeaf?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  showLeaf = false,
}: Props) {
  const { ref, ready, visible } = useInViewOnce({ amount: 0.35 });
  const alignClass =
    align === "center" ? "items-center text-center" : "items-start text-left";
  const titleColor = light ? "text-white" : "text-gray-1";
  const descColor = light ? "text-white" : "text-gray-3";

  const itemStyle = (delay: number): CSSProperties => {
    const hide = ready && !visible;
    return {
      opacity: hide ? 0 : 1,
      transform: hide ? "translate3d(0, 12px, 0)" : "none",
      transitionProperty: "opacity, transform",
      transitionDuration: "0.4s",
      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      transitionDelay: visible ? `${delay}s` : "0s",
    };
  };

  return (
    <div
      ref={ref}
      className={`relative mb-8 flex flex-col gap-2.5 sm:mb-10 sm:gap-3 md:mb-14 ${alignClass}`}
    >
      {showLeaf && (
        <Image
          src={assets.leaf}
          alt=""
          width={80}
          height={160}
          className={`pointer-events-none absolute -top-8 left-1/2 hidden h-40 w-20 -translate-x-1/2 rotate-[37deg] md:block ${
            light ? "opacity-90 mix-blend-screen" : "mix-blend-screen opacity-90"
          }`}
        />
      )}
      {eyebrow && (
        <div className="flex items-center gap-2" style={itemStyle(0.02)}>
          <p className="font-script text-base leading-[26px] text-primary sm:text-lg">
            {eyebrow}
          </p>
          <span className="hidden h-px w-[34px] bg-primary sm:block" aria-hidden />
        </div>
      )}
      <h2
        className={`text-heading relative z-10 font-bold ${titleColor}`}
        style={itemStyle(eyebrow ? 0.1 : 0.02)}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`max-w-xl text-sm leading-6 sm:text-base ${descColor} ${
            align === "center" ? "mx-auto" : ""
          }`}
          style={itemStyle(eyebrow ? 0.18 : 0.1)}
        >
          {description}
        </p>
      )}
    </div>
  );
}
