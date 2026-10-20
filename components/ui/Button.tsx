import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";

type Variant = "solid" | "outline" | "ghost";
/** default = CTA chính; pill = action phụ, gọn */
type Shape = "square" | "pill";
type Size = "sm" | "md" | "lg";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "href"> & {
  variant?: Variant;
  /** Defaults to soft organic radius for both solid & outline */
  shape?: Shape;
  size?: Size;
  children: ReactNode;
  href?: string;
  /** Shows a sliding chevron on hover — good for primary navigation CTAs */
  withArrow?: boolean;
};

const variantStyles: Record<Variant, string> = {
  solid: "btn-primary bg-primary text-white",
  outline: "btn-secondary border backdrop-blur-[2px]",
  ghost: [
    "bg-transparent text-primary",
    "transition-[background-color,transform] duration-300 ease-out",
    "hover:bg-primary/8 active:bg-primary/12 active:scale-[0.985]",
  ].join(" "),
};

const shapeStyles: Record<Shape, string> = {
  square: "rounded-[1.15rem_0.4rem]",
  pill: "rounded-full",
};

const sizeStyles: Record<Size, Record<Shape, string>> = {
  sm: {
    square:
      "gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide sm:text-sm",
    pill: "gap-1 px-3.5 py-1.5 text-xs font-semibold tracking-wide",
  },
  md: {
    square:
      "gap-2 px-5 py-2.5 text-sm font-semibold tracking-wide sm:px-6 sm:py-3 sm:text-[0.9375rem]",
    pill: "gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide sm:text-sm",
  },
  lg: {
    square:
      "gap-2.5 px-6 py-3 text-sm font-semibold tracking-wide sm:px-8 sm:py-3.5 sm:text-base",
    pill: "gap-2 px-5 py-2.5 text-sm font-semibold tracking-wide",
  },
};

function ArrowHint() {
  return (
    <span
      className="inline-flex size-[1.1em] shrink-0 items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 motion-reduce:transition-none"
      aria-hidden
    >
      <svg viewBox="0 0 16 16" fill="none" className="size-full" aria-hidden>
        <path
          d="M3.5 8h9m0 0L9 4.5M12.5 8 9 11.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Button({
  variant = "solid",
  shape = "square",
  size = "md",
  withArrow = false,
  children,
  className = "",
  href,
  onClick,
  ...props
}: Props) {
  const classes = [
    "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    "disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant],
    variant === "solid" && shape === "square" ? "btn-primary--organic" : "",
    shapeStyles[shape],
    sizeStyles[size][shape],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <span className="btn__label relative inline-flex items-center justify-center gap-[inherit]">
      {children}
      {withArrow ? <ArrowHint /> : null}
    </span>
  );

  if (href) {
    const external =
      href.startsWith("http") ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:");
    const linkClick = onClick as MouseEventHandler<HTMLAnchorElement> | undefined;
    if (external) {
      return (
        <a href={href} className={classes} onClick={linkClick}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={linkClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick} {...props}>
      {content}
    </button>
  );
}
