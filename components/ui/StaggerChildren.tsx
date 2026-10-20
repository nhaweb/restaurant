"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import { useInViewOnce } from "@/components/ui/useInViewOnce";

type Props = {
  children: ReactNode;
  className?: string;
  /** Delay between each child (seconds) */
  stagger?: number;
  /** Initial delay before first child (seconds) */
  delayChildren?: number;
  /** As HTML element for semantics (ul/ol/div) */
  as?: "div" | "ul" | "ol";
};

type StaggerItemInjected = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  as?: "div" | "li" | "article" | "figure";
};

export function StaggerChildren({
  children,
  className = "",
  stagger = 0.07,
  delayChildren = 0.04,
  as = "div",
}: Props) {
  const { ref, ready, visible } = useInViewOnce({ amount: 0.12 });
  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={`stagger-group ${className}`.trim()}
      data-stagger-ready={ready ? "true" : "false"}
      data-stagger-visible={visible ? "true" : "false"}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;

        const delay = delayChildren + index * stagger;
        const element = child as ReactElement<StaggerItemInjected>;
        const prevStyle = element.props.style ?? {};
        const prevClass = element.props.className ?? "";

        return cloneElement(element, {
          className: `stagger-item ${prevClass}`.trim(),
          style: {
            ...prevStyle,
            ["--stagger-delay" as string]: `${delay}s`,
          },
        });
      })}
    </Tag>
  );
}

type ItemProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "li" | "article" | "figure";
};

export function StaggerItem({
  children,
  className = "",
  style,
  as = "div",
}: ItemProps) {
  const Tag = as;
  return (
    <Tag className={className} style={style}>
      {children}
    </Tag>
  );
}

/** @deprecated Kept for callers that imported the motion variants object */
export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};
