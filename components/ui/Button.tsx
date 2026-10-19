import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "solid" | "outline";
/** square = CTA quan trọng; pill = action phụ, nhỏ gọn */
type Shape = "square" | "pill";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  /** Defaults: solid → square, outline → pill */
  shape?: Shape;
  children: ReactNode;
  href?: string;
};

const variantStyles: Record<Variant, string> = {
  solid: "bg-primary text-white hover:bg-[#144800] active:bg-[#123f00]",
  outline:
    "border border-primary text-primary bg-transparent hover:bg-primary/5 active:bg-primary/10",
};

const shapeStyles: Record<Shape, string> = {
  square:
    "rounded-none px-5 py-2.5 text-sm font-bold leading-5 sm:px-6 sm:py-3 sm:text-base sm:leading-6",
  pill: "rounded-full px-3.5 py-1.5 text-xs font-semibold leading-4 sm:px-4 sm:py-2 sm:text-sm sm:leading-5",
};

export function Button({
  variant = "solid",
  shape,
  children,
  className = "",
  href,
  ...props
}: Props) {
  const resolvedShape: Shape = shape ?? (variant === "solid" ? "square" : "pill");
  const classes = `inline-flex cursor-pointer items-center justify-center transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant]} ${shapeStyles[resolvedShape]} ${className}`;

  if (href) {
    const external =
      href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (external) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
